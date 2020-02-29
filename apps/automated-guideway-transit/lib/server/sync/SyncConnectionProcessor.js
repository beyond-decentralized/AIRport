import { MessageToTMContentType, RepoTransBlockSyncOutcomeType } from '@airport/arrivals-n-departures';
import { container, DI } from '@airport/di';
import { ensureChildArray, ensureChildJsMap } from '@airport/ground-control';
import { AGT_REPO_TRANS_BLOCK_DAO, AGT_SHARING_MESSAGE_DAO, AgtSharingMessageAcknowledged, ArchivingStatus, SYNC_LOG_DAO, TERMINAL_DAO, TERMINAL_REPOSITORY_DAO, UserRepositoryPermission } from '@airport/guideway';
import { transactional } from '@airport/tower';
import { AGTLogger, ERROR_LOGGER, SYNC_CONNECTION_PROCESSOR } from '../../tokens';
const log = AGTLogger.add('SyncConnectionProcessor');
export class SyncConnectionProcessor {
    async processConnections(verifiedMessagesFromTM) {
        // TODO: remove unused dependencies once tested
        const [terminalDao, terminalRepositoryDao, agtSharingMessageDao, errorLogger, syncLogDao, agtRepositoryTransactionBlockDao] = await container(this).get(TERMINAL_DAO, TERMINAL_REPOSITORY_DAO, AGT_SHARING_MESSAGE_DAO, ERROR_LOGGER, SYNC_LOG_DAO, AGT_REPO_TRANS_BLOCK_DAO);
        const verifiedTerminalIds = Array.from(verifiedMessagesFromTM.terminalIds);
        // Start writing data back to valid connections
        for (const [terminalId, verifiedLoginClaim] of verifiedMessagesFromTM.syncConnectionClaimsByTmId) {
            verifiedLoginClaim.connectionDataCallback(terminalId, true, null);
        }
        // Update last login time asynchronously - no further processing depends on that
        this.updateLastSyncConnectionDatetime(verifiedTerminalIds, terminalDao).then();
        // Wait for both
        await Promise.all([
            // Waiting for incoming records to make it to other terminal syncs
            // and to be marked as already synced for terminals from which they come
            this.insertRepositoryTransactionBlocks(verifiedTerminalIds, verifiedMessagesFromTM.repositoryIds, verifiedMessagesFromTM.syncConnectionClaimsByTmId, agtRepositoryTransactionBlockDao, agtSharingMessageDao, syncLogDao, terminalRepositoryDao),
            // Waiting for incoming sync ACKS to be recorded so that the synced repositories
            // won't be sent out again
            this.updateAgtSharingMessages(verifiedMessagesFromTM.agtSharingMessageIds, verifiedMessagesFromTM.syncConnectionClaimsByTmId, agtSharingMessageDao)
        ]);
        await this.sendRecentChangesToVerifiedConnections(verifiedTerminalIds, verifiedMessagesFromTM.syncConnectionClaimsByTmId, agtRepositoryTransactionBlockDao, agtSharingMessageDao, syncLogDao);
    }
    async updateLastSyncConnectionDatetime(verifiedTerminalIds, terminalDao) {
        // TODO: see if manual retry logic should be applied
        await terminalDao.updateLastPollConnectionDatetime(verifiedTerminalIds, new Date().getTime());
    }
    async insertRepositoryTransactionBlocks(verifiedTerminalIds, repositoryIdSet, verifiedConnectionClaimMap, agtRepoTransBlockDao, agtSharingMessageDao, syncLogDao, terminalRepositoryDao) {
        // TODO: see if manual retry logic should be applied
        await this.tryToInsertAgtRepositoryTransactionBlocks(verifiedTerminalIds, repositoryIdSet, verifiedConnectionClaimMap, agtRepoTransBlockDao, agtSharingMessageDao, syncLogDao, terminalRepositoryDao);
    }
    async tryToInsertAgtRepositoryTransactionBlocks(verifiedTerminalIds, repositoryIdSet, verifiedConnectionClaimMap, agtRepoTransBlockDao, agtSharingMessageDao, syncLogDao, terminalRepositoryDao) {
        await transactional(async () => {
            // Query TerminalRepositories to verify that the incoming repository change records
            // exist and get the permissions a given terminal has in a particular repository
            const terminalRepositoryMapByTerminalId = await terminalRepositoryDao.findByTerminalIdInAndRepositoryIdIn(verifiedTerminalIds, Array.from(repositoryIdSet));
            const repoTransBlockSyncOutcomeMap = new Map();
            const { terminalIds, tmRepositoryTransactionBlockIds } = this.ensureRepositoryPermissions(terminalRepositoryMapByTerminalId, verifiedConnectionClaimMap, repoTransBlockSyncOutcomeMap);
            const agtRepositoryTransactionBlockInserts = [];
            // Keep track of successfully synced incoming transactions
            const successTransSyncOutcomes = [];
            const alreadySyncedInMessageTerminalIds = new Set();
            const alreadySyncedInMessageTmSharingMessageIds = new Set();
            const alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId = new Map();
            await this.addRepositoryTransactionBlocks(terminalIds, tmRepositoryTransactionBlockIds, terminalRepositoryMapByTerminalId, verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoTransBlockSyncOutcomeMap, successTransSyncOutcomes, agtRepositoryTransactionBlockInserts, agtRepoTransBlockDao);
            await this.respondToAlreadySyncedMessages(alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, verifiedConnectionClaimMap, agtSharingMessageDao);
            const agtSharingMessageIdMapByTerminalId = await this.persistRepositoryTransactionBlocks(verifiedTerminalIds, verifiedConnectionClaimMap, agtRepositoryTransactionBlockInserts, successTransSyncOutcomes, agtRepoTransBlockDao, agtSharingMessageDao, syncLogDao);
            // Send back all remaining RepoTransBlockSyncOutcomes
            for (const [terminalId, syncOutcomes] of repoTransBlockSyncOutcomeMap) {
                const verifiedLoginClaim = verifiedConnectionClaimMap.get(terminalId);
                const messageFromTM = verifiedLoginClaim.messageFromTM;
                verifiedLoginClaim.connectionDataCallback(terminalId, false, {
                    contentType: MessageToTMContentType.SYNC_NOTIFICATION,
                    tmSharingMessageId: messageFromTM.tmSharingMessageId,
                    // agtAgtSharingMessageId: agtSharingMessageIdMapByTerminalId.get(terminalId),
                    // addDatetime: verifiedLoginClaim.loginClaimReceptionTime,
                    syncOutcomes
                });
            }
        });
    }
    declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes, syncOutcomeType) {
        log.warn(`Sync denied:
		RepoTransBlockSyncOutcomeType:  {1}
		TerminalId:                  {2}
		AgtRepositoryId:                {3}
		`, syncOutcomeType, terminalId, repoUpdateRequest.agtRepositoryId);
        // TmRepositoryTransactionBlockId: {4}
        declinedTransSyncLogOutcomes.push({
            tmRepositoryTransactionBlockId: repoUpdateRequest.tmRepositoryTransactionBlockId,
            // agtRepositoryTransactionBlockId: 0,
            syncOutcomeType
            // TODO: evaluate if for securing reasons the actual code should be obscured
            // : RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_NO_WRITE_PERMISSION
        });
    }
    /**
     * It is possible for a valid terminal to attempt to sync records to a repository
     * to which it is (no longer) associated to.
     *
     * Up to this point the association of terminal to repository has not been
     * checked.  Hence it is possible for a terminal that is valid and is allowed
     * to sync to try and sync against the repositories that it may not have. Hence
     * if an association between a terminal and a repository is not found we
     * need to send back an error message.
     *
     * FIXME: figure out what to do in the inverse case, repository can in theory have
     * been added to a given terminal (TM) but AGT may not be aware of that fact.
     *
     * Simply receiving messages from TMs that have not been verified to have a repo
     * is not acceptable.  We need to figure this out before P2P and multi AGT setups
     * are possible.
     *
     * @type {Map<TerminalId, SyncConnectionClaim>}
     */
    ensureRepositoryPermissions(permissionMapByTerminalAndRepositoryIds, verifiedConnectionClaimMap, repoTransBlockSyncOutcomeMap) {
        const notFoundConnectionClaimMap = new Map(verifiedConnectionClaimMap);
        const terminalIds = new Set();
        const tmRepositoryTransactionBlockIds = new Set();
        // For every found terminal repository map, make sure that the client terminal
        // still has the write permissions to all repositories it is trying to write to
        for (const [terminalId, permissionByRepositoryId] of permissionMapByTerminalAndRepositoryIds) {
            terminalIds.add(terminalId);
            const verifiedLoginClaim = verifiedConnectionClaimMap.get(terminalId);
            notFoundConnectionClaimMap.delete(terminalId);
            const repoUpdateRequests = verifiedLoginClaim.messageFromTM
                .repositoryUpdateRequests;
            // For every repository update request coming from a given client
            for (const repoUpdateRequest of repoUpdateRequests) {
                const repoPermission = permissionByRepositoryId.get(repoUpdateRequest.agtRepositoryId);
                if (!repoPermission) {
                    const declinedTransSyncLogOutcomes = ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId);
                    this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes, RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_REPOSITORY_NOT_FOUND);
                    continue;
                }
                if (repoPermission >= UserRepositoryPermission.WRITE) {
                    tmRepositoryTransactionBlockIds.add(repoUpdateRequest.tmRepositoryTransactionBlockId);
                }
                else {
                    const declinedTransSyncLogOutcomes = ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId);
                    this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes, RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_NO_WRITE_PERMISSION);
                }
            }
            return {
                terminalIds,
                tmRepositoryTransactionBlockIds
            };
        }
        // For every sync connection that had no found repositories
        for (const [terminalId, recentConnectionClaim] of notFoundConnectionClaimMap) {
            const repoUpdateRequests = recentConnectionClaim[0][3];
            const declinedTransSyncLogOutcomes = [];
            // For every repository that that was requested to be updated
            for (const repoUpdateRequest of repoUpdateRequests) {
                this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes, RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_DATABASE_NOT_FOUND);
            }
            // [MessageFromTMOperation, TerminalCredentials, TmSharingMessageId,
            // RepositoryUpdateRequest[], AgtSharingMessageId[]]
            const messageFromTM = recentConnectionClaim.messageFromTM;
            const tmSharingMessageId = messageFromTM.tmSharingMessageId;
            // Reply back with a Sync Denied message
            log.debug(`Connection denied - Terminal not found:
		TerminalId:         {1}
		TmSharingMessageId: {2}`, terminalId, tmSharingMessageId);
            recentConnectionClaim.connectionDataCallback(terminalId, false, {
                contentType: MessageToTMContentType.SYNC_NOTIFICATION,
                tmSharingMessageId,
                // agtSharingMessageId: 0,
                // addDatetime: 0,
                syncOutcomes: declinedTransSyncLogOutcomes
            });
        }
    }
    async addRepositoryTransactionBlocks(terminalIds, tmRepositoryTransactionBlockIds, permissionMapByTerminalAndRepositoryIds, verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoTransBlockSyncOutcomeMap, successTransSyncOutcomes, agtRepositoryTransactionBlockInserts, agtRepoTransBlockDao) {
        const existingAgtRepoTransBlockInfoMap = await agtRepoTransBlockDao
            .findExistingDataIdMap(terminalIds, tmRepositoryTransactionBlockIds);
        // For every found terminal repository map, make sure that the sent record
        // hasn't already been received
        for (const [terminalId, permissionMapForTerminal] of permissionMapByTerminalAndRepositoryIds) {
            const verifiedLoginClaim = verifiedConnectionClaimMap.get(terminalId);
            const messageFromTM = verifiedLoginClaim.messageFromTM;
            const transSyncLogOutcomes = ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId);
            for (const repoUpdateRequest of messageFromTM.repositoryUpdateRequests) {
                const repositoryId = repoUpdateRequest.agtRepositoryId;
                const tmRepositoryTransactionBlockId = repoUpdateRequest.tmRepositoryTransactionBlockId;
                const repoPermission = permissionMapForTerminal.get(repositoryId);
                if (repoPermission < UserRepositoryPermission.WRITE) {
                    continue;
                }
                if (this.messageAlreadySynced(existingAgtRepoTransBlockInfoMap, terminalId, tmRepositoryTransactionBlockId, verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoUpdateRequest)) {
                    continue;
                }
                const transSyncLogOutcome = {
                    tmRepositoryTransactionBlockId,
                    // agtRepositoryTransactionBlockId: null,
                    syncOutcomeType: RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_SUCCESSFUL
                };
                transSyncLogOutcomes.push(transSyncLogOutcome);
                successTransSyncOutcomes.push(transSyncLogOutcome);
                agtRepositoryTransactionBlockInserts.push([repositoryId, terminalId,
                    ArchivingStatus.NOT_ARCHIVING, verifiedLoginClaim.loginClaimReceptionTime,
                    true, tmRepositoryTransactionBlockId, repoUpdateRequest.repositoryTransactionBlockContents]);
            }
        }
    }
    messageAlreadySynced(existingDataIdMap, terminalId, tmRepositoryTransactionBlockId, verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoUpdateRequest) {
        const existingTmRepoTransBlockIdMap = existingDataIdMap.get(terminalId);
        // If the terminal has no synced messages for matching RepoTrans Blocks
        if (!existingTmRepoTransBlockIdMap) {
            return false;
        }
        const repositoryTransactionBlockInfo = existingTmRepoTransBlockIdMap.get(tmRepositoryTransactionBlockId);
        // If the RepoTrans Block has not been processed
        if (!repositoryTransactionBlockInfo) {
            return false;
        }
        const recentConnectionClaim = verifiedConnectionClaimMap.get(terminalId);
        const messageFromTM = recentConnectionClaim.messageFromTM;
        alreadySyncedInMessageTerminalIds.add(terminalId);
        const tmSharingMessageId = messageFromTM.tmSharingMessageId;
        alreadySyncedInMessageTmSharingMessageIds.add(tmSharingMessageId);
        const alreadySyncedMessagesForTerminalId = ensureChildJsMap(alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, terminalId);
        let alreadySyncedMessage = alreadySyncedMessagesForTerminalId.get(tmSharingMessageId);
        if (!alreadySyncedMessage) {
            alreadySyncedMessage = {
                contentType: MessageToTMContentType.SYNC_NOTIFICATION,
                tmSharingMessageId,
                // agtAgtSharingMessageId: null,
                // addDatetime: repoTransBlockInfo[1],
                syncOutcomes: []
            };
            alreadySyncedMessagesForTerminalId.set(tmSharingMessageId, alreadySyncedMessage);
        }
        const agtRepositoryTransactionBlockId = repositoryTransactionBlockInfo[0];
        const repositoryId = repoUpdateRequest.agtRepositoryId;
        log.debug(`TmSharingMessage already synced:
		TerminalId:                  {1}
		AgtRepositoryId:                {2}
		AgtRepositoryTransactionBlockId:                {3}
		TmSharingMessageId:             {4}`, terminalId, repositoryId, agtRepositoryTransactionBlockId, tmSharingMessageId);
        alreadySyncedMessage.syncOutcomes.push({
            tmRepositoryTransactionBlockId,
            // agtRepositoryTransactionBlockId,
            syncOutcomeType: RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_ALREADY_SYNCED
        });
        return true;
    }
    async respondToAlreadySyncedMessages(alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, verifiedConnectionClaimMap, agtSharingMessageDao) {
        // Find AgtSharingMessageIds for all already synced messages
        const agtAgtSharingMessageIdMapByTerminalIdAndTmSharingMessageId = await agtSharingMessageDao.findIdMapByTerminalIdAndTmSharingMessageId(Array.from(alreadySyncedInMessageTerminalIds), Array.from(alreadySyncedInMessageTmSharingMessageIds));
        // Respond for all already synced messages
        for (const [terminalId, alreadySyncMessageMapForTerminalId] of alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId) {
            const agtAgtSharingMessageIdMapForTerminalId = agtAgtSharingMessageIdMapByTerminalIdAndTmSharingMessageId.get(terminalId);
            const verifiedLoginClaim = verifiedConnectionClaimMap.get(terminalId);
            for (const [tmSharingMessageId, alreadySyncedMessage] of alreadySyncMessageMapForTerminalId) {
                const agtAgtSharingMessageId = agtAgtSharingMessageIdMapForTerminalId
                    .get(tmSharingMessageId);
                // alreadySyncedMessage.agtAgtSharingMessageId = agtAgtSharingMessageId;
                log.debug(`Message already synced:
		TerminalId:        {1}
		AgtSharingMessageId: {2}
		TmSharingMessageId:   {3}`, terminalId, agtAgtSharingMessageId, tmSharingMessageId);
                verifiedLoginClaim.connectionDataCallback(terminalId, false, alreadySyncedMessage);
            }
        }
    }
    async persistRepositoryTransactionBlocks(verifiedTerminalIds, verifiedConnectionClaimMap, agtRepositoryTransactionBlockInserts, successTransSyncOutcomes, agtRepoTransBlockDao, agtSharingMessageDao, syncLogDao) {
        // Mark the terminals from which the sync records came as already having received
        // those records
        const agtSharingMessageInserts = verifiedTerminalIds.map(verifiedTerminalId => [
            verifiedTerminalId,
            verifiedConnectionClaimMap.get(verifiedTerminalId)
                .messageFromTM.tmSharingMessageId,
            AgtSharingMessageAcknowledged.ACKNOWLEDGED,
        ]);
        const [agtSharingMessageIdMapByTerminalId, agtRepositoryTransactionBlockIds] = await Promise.all([
            agtSharingMessageDao.insertValues(agtSharingMessageInserts),
            agtRepoTransBlockDao.insertValues(agtRepositoryTransactionBlockInserts)
        ]);
        const syncLogInserts = [];
        for (let i = 0; i < agtRepositoryTransactionBlockIds.length; i++) {
            // Populate AgtRepositoryTransactionBlockId in outgoing TransLogSyncOutcome
            const agtRepositoryTransactionBlockId = agtRepositoryTransactionBlockIds[i];
            // successTransSyncOutcomes[i].agtRepositoryTransactionBlockId =
            // agtRepositoryTransactionBlockId; Add AgtSharingMessageId to new SyncLog insert
            // record
            const terminalId = agtRepositoryTransactionBlockInserts[i][1];
            const agtSharingMessageId = agtSharingMessageIdMapByTerminalId[terminalId];
            syncLogInserts.push([
                agtRepositoryTransactionBlockId,
                // addDateTime,
                agtSharingMessageId,
            ]);
        }
        await syncLogDao.insertValues(syncLogInserts);
        return agtSharingMessageIdMapByTerminalId;
    }
    async updateAgtSharingMessages(// TODO: see if manual retry logic should be applied
    agtSharingMessageIdSet, verifiedConnectionClaimMap, agtSharingMessageDao) {
        await this.tryToUpdateAgtSharingMessages(agtSharingMessageIdSet, verifiedConnectionClaimMap, agtSharingMessageDao);
    }
    async tryToUpdateAgtSharingMessages(agtSharingMessageIdSet, verifiedConnectionClaimMap, agtSharingMessageDao) {
        await transactional(async () => {
            const sharingMessageMapByTerminalId = await agtSharingMessageDao.findNotSyncedByIdIn(Array.from(agtSharingMessageIdSet));
            const verifiedAgtSharingMessageIdSet = new Set();
            // For every found terminal sync log map, make sure that the client terminal
            // is trying to update its own terminal sync log records
            for (const [terminalId, sharingMessagesForTerminal] of sharingMessageMapByTerminalId) {
                const verifiedLoginClaim = verifiedConnectionClaimMap.get(terminalId);
                const agtSharingMessageIds = verifiedLoginClaim.messageFromTM.terminalSyncAcks;
                for (const agtSharingMessageId of agtSharingMessageIds) {
                    if (sharingMessagesForTerminal.has(agtSharingMessageId)) {
                        verifiedAgtSharingMessageIdSet.add(agtSharingMessageId);
                    }
                }
            }
            await agtSharingMessageDao.updateToAcked(Array.from(verifiedAgtSharingMessageIdSet));
        });
    }
    async sendRecentChangesToVerifiedConnections(verifiedTerminalIds, verifiedConnectionClaimMap, agtRepoTransBlockDao, agtSharingMessageDao, syncLogDao) {
        // TODO: see if manual retry logic should be applied
        await this.tryToSendRecentChangesToVerifiedConnections(verifiedTerminalIds, verifiedConnectionClaimMap, new Date().getTime(), agtRepoTransBlockDao, agtSharingMessageDao, syncLogDao);
    }
    async tryToSendRecentChangesToVerifiedConnections(verifiedTerminalIds, verifiedConnectionClaimMap, addDateTime, agtRepoTransBlockDao, agtSharingMessageDao, syncLogDao) {
        const repoTransBlocksToSendByTerminalId = await agtRepoTransBlockDao.getAllAgtRepositoryTransactionBlocksToSend(verifiedTerminalIds);
        // Sync Logs to insert for the sent records
        const syncLogsByTerminalIdMap = new Map();
        // Agt Sharing Messages to insert for the sent records
        const agtSharingMessagesToInsert = [];
        // For every terminal's set of RepositoryTransactionBlocks to send (not yet
        // acknowledged by the terminal as having been received).
        for (const [terminalId, repoTransBlocksToSend] of repoTransBlocksToSendByTerminalId) {
            const connectionClaim = verifiedConnectionClaimMap.get(terminalId);
            const tmSharingMessageId = connectionClaim.messageFromTM
                .tmSharingMessageId;
            agtSharingMessagesToInsert.push([
                terminalId, tmSharingMessageId, AgtSharingMessageAcknowledged.NOT_ACKNOWLEDGED
            ]);
            const syncLogsForTerminalId = [];
            syncLogsByTerminalIdMap.set(terminalId, syncLogsForTerminalId);
            // For every RepositoryTransactionBlock
            for (const repoTransBlockToSend of repoTransBlocksToSend) {
                syncLogsForTerminalId.push([repoTransBlockToSend.agtRepositoryTransactionBlockId]);
                const connectionClaim = verifiedConnectionClaimMap.get(terminalId);
                connectionClaim.connectionDataCallback(terminalId, false, repoTransBlockToSend);
            }
        }
        const agtSharingMessageIdMapByTerminalId = await agtSharingMessageDao.insertValues(agtSharingMessagesToInsert);
        // For every AgtSharingMessage record created (and hence for every terminal
        // from which we have received a message in this processing loop)
        let syncLogInserts = [];
        for (const [terminalId, agtSharingMessageId] of agtSharingMessageIdMapByTerminalId) {
            // Add sync
            const syncLogsForTerminalId = syncLogsByTerminalIdMap.get(terminalId);
            syncLogsForTerminalId.forEach(insertSyncLog => {
                insertSyncLog.push(agtSharingMessageId);
            });
            syncLogInserts = syncLogInserts.concat(syncLogsForTerminalId);
            //
            // const connectionClaim = verifiedConnectionClaimMap.get(terminalId);
            // /*
            // 			RepoTransBlockSyncOutcome = [
            // 				TmRepositoryTransactionBlockId,
            // 				RepoTransBlockSyncOutcomeType
            // 			]
            // 			*/
            //
            // // Agt Sharing Message id
            //
            // const tmSharingMessageId: TmSharingMessageId       = connectionClaim[0][2];
            // const agtRepoTransBlockAddDatetime: AgtRepositoryTransactionBlockAddDatetime
            //  = null; const transactionLogSyncOutcomes: RepoTransBlockSyncOutcome[] = [ null,
            // agtSharingMessageId, null];  /*RepoTransBlockSyncOutcome = [
            // TmRepositoryTransactionBlockId, AgtSharingMessageId,
            // RepoTransBlockSyncOutcomeType ];*/  const createdTerminalRepoTransBlockMessage:
            // SyncLogNotification = [ OutClientMessageType.DATABASE_SYNC_LOG,
            // tmSharingMessageId, addDatetime, transactionLogSyncOutcomes ]; const callback
            //                                       = connectionClaim[1]; // Also send back a
            // Agt Sharing Message notification for the corresponding data // that was received
            // from this connection callback(terminalId, false,
            // createdTerminalRepoTransBlockMessage);
        }
        await syncLogDao.insertValues(syncLogInserts);
    }
}
DI.set(SYNC_CONNECTION_PROCESSOR, SyncConnectionProcessor);
//# sourceMappingURL=SyncConnectionProcessor.js.map