"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const guideway_1 = require("@airport/guideway");
const tower_1 = require("@airport/tower");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
const log = InjectionTokens_1.AGTLogger.add('SyncConnectionProcessor');
let SyncConnectionProcessor = class SyncConnectionProcessor {
    constructor(terminalDao, terminalRepositoryDao, agtSharingMessageDao, 
    // private tunningParameters: TuningParameters,
    errorLogger, syncLogDao, agtRepositoryTransactionBlockDao, utils) {
        this.terminalDao = terminalDao;
        this.terminalRepositoryDao = terminalRepositoryDao;
        this.agtSharingMessageDao = agtSharingMessageDao;
        this.errorLogger = errorLogger;
        this.syncLogDao = syncLogDao;
        this.agtRepositoryTransactionBlockDao = agtRepositoryTransactionBlockDao;
        this.utils = utils;
    }
    async processConnections(verifiedMessagesFromTM) {
        const verifiedTerminalIds = Array.from(verifiedMessagesFromTM.terminalIds);
        // Start writing data back to valid connections
        for (const [terminalId, verifiedLoginClaim] of verifiedMessagesFromTM.syncConnectionClaimsByTmId) {
            verifiedLoginClaim.connectionDataCallback(terminalId, true, null);
        }
        // Update last login time asynchronously - no further processing depends on that
        this.updateLastSyncConnectionDatetime(verifiedTerminalIds).then();
        // Wait for both
        await Promise.all([
            // Waiting for incoming records to make it to other terminal syncs
            // and to be marked as already synced for terminals from which they come
            this.insertRepositoryTransactionBlocks(verifiedTerminalIds, verifiedMessagesFromTM.repositoryIds, verifiedMessagesFromTM.syncConnectionClaimsByTmId),
            // Waiting for incoming sync ACKS to be recorded so that the synced repositories
            // won't be sent out again
            this.updateAgtSharingMessages(verifiedMessagesFromTM.agtSharingMessageIds, verifiedMessagesFromTM.syncConnectionClaimsByTmId)
        ]);
        await this.sendRecentChangesToVerifiedConnections(verifiedTerminalIds, verifiedMessagesFromTM.syncConnectionClaimsByTmId);
    }
    async updateLastSyncConnectionDatetime(verifiedTerminalIds) {
        // TODO: see if manual retry logic should be applied
        await this.terminalDao.updateLastPollConnectionDatetime(verifiedTerminalIds, new Date().getTime());
    }
    async insertRepositoryTransactionBlocks(verifiedTerminalIds, repositoryIdSet, verifiedConnectionClaimMap) {
        // TODO: see if manual retry logic should be applied
        await this.tryToInsertAgtRepositoryTransactionBlocks(verifiedTerminalIds, repositoryIdSet, verifiedConnectionClaimMap);
    }
    async tryToInsertAgtRepositoryTransactionBlocks(verifiedTerminalIds, repositoryIdSet, verifiedConnectionClaimMap) {
        // Query TerminalRepositories to verify that the incoming repository change records exist
        // and get the permissions a given terminal has in a particular repository
        const terminalRepositoryMapByTerminalId = await this.terminalRepositoryDao.findByTerminalIdInAndRepositoryIdIn(verifiedTerminalIds, Array.from(repositoryIdSet));
        const repoTransBlockSyncOutcomeMap = new Map();
        const { terminalIds, tmRepositoryTransactionBlockIds } = this.ensureRepositoryPermissions(terminalRepositoryMapByTerminalId, verifiedConnectionClaimMap, repoTransBlockSyncOutcomeMap);
        const agtRepositoryTransactionBlockInserts = [];
        // Keep track of successfully synced incoming transactions
        const successTransSyncOutcomes = [];
        const alreadySyncedInMessageTerminalIds = new Set();
        const alreadySyncedInMessageTmSharingMessageIds = new Set();
        const alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId = new Map();
        await this.addRepositoryTransactionBlocks(terminalIds, tmRepositoryTransactionBlockIds, terminalRepositoryMapByTerminalId, verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoTransBlockSyncOutcomeMap, successTransSyncOutcomes, agtRepositoryTransactionBlockInserts);
        await this.respondToAlreadySyncedMessages(alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, verifiedConnectionClaimMap);
        const agtSharingMessageIdMapByTerminalId = await this.persistRepositoryTransactionBlocks(verifiedTerminalIds, verifiedConnectionClaimMap, agtRepositoryTransactionBlockInserts, successTransSyncOutcomes);
        // Send back all remaining RepoTransBlockSyncOutcomes
        for (const [terminalId, syncOutcomes] of repoTransBlockSyncOutcomeMap) {
            const verifiedLoginClaim = verifiedConnectionClaimMap.get(terminalId);
            const messageFromTM = verifiedLoginClaim.messageFromTM;
            verifiedLoginClaim.connectionDataCallback(terminalId, false, {
                contentType: arrivals_n_departures_1.MessageToTMContentType.SYNC_NOTIFICATION,
                tmSharingMessageId: messageFromTM.tmSharingMessageId,
                // agtAgtSharingMessageId: agtSharingMessageIdMapByTerminalId.get(terminalId),
                // addDatetime: verifiedLoginClaim.loginClaimReceptionTime,
                syncOutcomes
            });
        }
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
                    const declinedTransSyncLogOutcomes = this.utils.ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId);
                    this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_REPOSITORY_NOT_FOUND);
                    continue;
                }
                if (repoPermission >= guideway_1.UserRepositoryPermission.WRITE) {
                    tmRepositoryTransactionBlockIds.add(repoUpdateRequest.tmRepositoryTransactionBlockId);
                }
                else {
                    const declinedTransSyncLogOutcomes = this.utils.ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId);
                    this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_NO_WRITE_PERMISSION);
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
                this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_DATABASE_NOT_FOUND);
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
                contentType: arrivals_n_departures_1.MessageToTMContentType.SYNC_NOTIFICATION,
                tmSharingMessageId,
                // agtSharingMessageId: 0,
                // addDatetime: 0,
                syncOutcomes: declinedTransSyncLogOutcomes
            });
        }
    }
    async addRepositoryTransactionBlocks(terminalIds, tmRepositoryTransactionBlockIds, permissionMapByTerminalAndRepositoryIds, verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoTransBlockSyncOutcomeMap, successTransSyncOutcomes, agtRepositoryTransactionBlockInserts) {
        const existingAgtRepoTransBlockInfoMap = await this.agtRepositoryTransactionBlockDao
            .findExistingDataIdMap(terminalIds, tmRepositoryTransactionBlockIds);
        // For every found terminal repository map, make sure that the sent record
        // hasn't already been received
        for (const [terminalId, permissionMapForTerminal] of permissionMapByTerminalAndRepositoryIds) {
            const verifiedLoginClaim = verifiedConnectionClaimMap.get(terminalId);
            const messageFromTM = verifiedLoginClaim.messageFromTM;
            const transSyncLogOutcomes = this.utils.ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId);
            for (const repoUpdateRequest of messageFromTM.repositoryUpdateRequests) {
                const repositoryId = repoUpdateRequest.agtRepositoryId;
                const tmRepositoryTransactionBlockId = repoUpdateRequest.tmRepositoryTransactionBlockId;
                const repoPermission = permissionMapForTerminal.get(repositoryId);
                if (repoPermission < guideway_1.UserRepositoryPermission.WRITE) {
                    continue;
                }
                if (this.messageAlreadySynced(existingAgtRepoTransBlockInfoMap, terminalId, tmRepositoryTransactionBlockId, verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoUpdateRequest)) {
                    continue;
                }
                const transSyncLogOutcome = {
                    tmRepositoryTransactionBlockId,
                    // agtRepositoryTransactionBlockId: null,
                    syncOutcomeType: arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_SUCCESSFUL
                };
                transSyncLogOutcomes.push(transSyncLogOutcome);
                successTransSyncOutcomes.push(transSyncLogOutcome);
                agtRepositoryTransactionBlockInserts.push([repositoryId, terminalId,
                    guideway_1.ArchivingStatus.NOT_ARCHIVING, verifiedLoginClaim.loginClaimReceptionTime,
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
        const alreadySyncedMessagesForTerminalId = this.utils.ensureChildJsMap(alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, terminalId);
        let alreadySyncedMessage = alreadySyncedMessagesForTerminalId.get(tmSharingMessageId);
        if (!alreadySyncedMessage) {
            alreadySyncedMessage = {
                contentType: arrivals_n_departures_1.MessageToTMContentType.SYNC_NOTIFICATION,
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
            syncOutcomeType: arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_ALREADY_SYNCED
        });
        return true;
    }
    async respondToAlreadySyncedMessages(alreadySyncedInMessageTerminalIds, alreadySyncedInMessageTmSharingMessageIds, alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, verifiedConnectionClaimMap) {
        // Find AgtSharingMessageIds for all already synced messages
        const agtAgtSharingMessageIdMapByTerminalIdAndTmSharingMessageId = await this.agtSharingMessageDao.findIdMapByTerminalIdAndTmSharingMessageId(Array.from(alreadySyncedInMessageTerminalIds), Array.from(alreadySyncedInMessageTmSharingMessageIds));
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
    async persistRepositoryTransactionBlocks(verifiedTerminalIds, verifiedConnectionClaimMap, agtRepositoryTransactionBlockInserts, successTransSyncOutcomes) {
        // Mark the terminals from which the sync records came as already having received
        // those records
        const agtSharingMessageInserts = verifiedTerminalIds.map(verifiedTerminalId => [
            verifiedTerminalId,
            verifiedConnectionClaimMap.get(verifiedTerminalId)
                .messageFromTM.tmSharingMessageId,
            guideway_1.AgtSharingMessageAcknowledged.ACKNOWLEDGED,
        ]);
        const [agtSharingMessageIdMapByTerminalId, agtRepositoryTransactionBlockIds] = await Promise.all([
            this.agtSharingMessageDao.insertValues(agtSharingMessageInserts),
            this.agtRepositoryTransactionBlockDao.insertValues(agtRepositoryTransactionBlockInserts)
        ]);
        const syncLogInserts = [];
        for (let i = 0; i < agtRepositoryTransactionBlockIds.length; i++) {
            // Populate AgtRepositoryTransactionBlockId in outgoing TransLogSyncOutcome
            const agtRepositoryTransactionBlockId = agtRepositoryTransactionBlockIds[i];
            // successTransSyncOutcomes[i].agtRepositoryTransactionBlockId = agtRepositoryTransactionBlockId;
            // Add AgtSharingMessageId to new SyncLog insert record
            const terminalId = agtRepositoryTransactionBlockInserts[i][1];
            const agtSharingMessageId = agtSharingMessageIdMapByTerminalId[terminalId];
            syncLogInserts.push([
                agtRepositoryTransactionBlockId,
                // addDateTime,
                agtSharingMessageId,
            ]);
        }
        await this.syncLogDao.insertValues(syncLogInserts);
        return agtSharingMessageIdMapByTerminalId;
    }
    async updateAgtSharingMessages(// TODO: see if manual retry logic should be applied
    agtSharingMessageIdSet, verifiedConnectionClaimMap) {
        await this.tryToUpdateAgtSharingMessages(agtSharingMessageIdSet, verifiedConnectionClaimMap);
    }
    async tryToUpdateAgtSharingMessages(agtSharingMessageIdSet, verifiedConnectionClaimMap) {
        const sharingMessageMapByTerminalId = await this.agtSharingMessageDao.findNotSyncedByIdIn(Array.from(agtSharingMessageIdSet));
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
        await this.agtSharingMessageDao.updateToAcked(Array.from(verifiedAgtSharingMessageIdSet));
    }
    async sendRecentChangesToVerifiedConnections(verifiedTerminalIds, verifiedConnectionClaimMap) {
        // TODO: see if manual retry logic should be applied
        await this.tryToSendRecentChangesToVerifiedConnections(verifiedTerminalIds, verifiedConnectionClaimMap, new Date().getTime());
    }
    async tryToSendRecentChangesToVerifiedConnections(verifiedTerminalIds, verifiedConnectionClaimMap, addDateTime) {
        const repoTransBlocksToSendByTerminalId = await this.agtRepositoryTransactionBlockDao.getAllAgtRepositoryTransactionBlocksToSend(verifiedTerminalIds);
        // Sync Logs to insert for the sent records
        const syncLogsByTerminalIdMap = new Map();
        // Agt Sharing Messages to insert for the sent records
        const agtSharingMessagesToInsert = [];
        // For every terminal's set of RepositoryTransactionBlocks to send (not yet acknowledged by the
        // terminal as having been received).
        for (const [terminalId, repoTransBlocksToSend] of repoTransBlocksToSendByTerminalId) {
            const connectionClaim = verifiedConnectionClaimMap.get(terminalId);
            const tmSharingMessageId = connectionClaim.messageFromTM
                .tmSharingMessageId;
            agtSharingMessagesToInsert.push([
                terminalId, tmSharingMessageId, guideway_1.AgtSharingMessageAcknowledged.NOT_ACKNOWLEDGED
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
        const agtSharingMessageIdMapByTerminalId = await this.agtSharingMessageDao.insertValues(agtSharingMessagesToInsert);
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
            // const agtRepoTransBlockAddDatetime: AgtRepositoryTransactionBlockAddDatetime      = null;
            // const transactionLogSyncOutcomes: RepoTransBlockSyncOutcome[] = [
            // 	null, agtSharingMessageId, null];
            //
            // /*RepoTransBlockSyncOutcome = [
            // 	TmRepositoryTransactionBlockId,
            // 	AgtSharingMessageId,
            // 	RepoTransBlockSyncOutcomeType
            // ];*/
            //
            // const createdTerminalRepoTransBlockMessage: SyncLogNotification = [
            // 	OutClientMessageType.DATABASE_SYNC_LOG,
            // 	tmSharingMessageId,
            // 	addDatetime,
            // 	transactionLogSyncOutcomes
            // ];
            // const callback                                          = connectionClaim[1];
            // // Also send back a Agt Sharing Message notification for the corresponding data
            // // that was received from this connection
            // callback(terminalId, false, createdTerminalRepoTransBlockMessage);
        }
        await this.syncLogDao.insertValues(syncLogInserts);
    }
};
__decorate([
    tower_1.Transactional(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Set,
        Map]),
    __metadata("design:returntype", Promise)
], SyncConnectionProcessor.prototype, "tryToInsertAgtRepositoryTransactionBlocks", null);
__decorate([
    tower_1.Transactional(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Set,
        Map]),
    __metadata("design:returntype", Promise)
], SyncConnectionProcessor.prototype, "tryToUpdateAgtSharingMessages", null);
SyncConnectionProcessor = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncConnectionProcessorToken),
    __param(0, typedi_1.Inject(guideway_1.TerminalDaoToken)),
    __param(1, typedi_1.Inject(guideway_1.TerminalRepositoryDaoToken)),
    __param(2, typedi_1.Inject(guideway_1.AgtSharingMessageDaoToken)),
    __param(3, typedi_1.Inject(InjectionTokens_1.ErrorLoggerToken)),
    __param(4, typedi_1.Inject(guideway_1.SyncLogDaoToken)),
    __param(5, typedi_1.Inject(guideway_1.AgtRepositoryTransactionBlockDaoToken)),
    __param(6, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], SyncConnectionProcessor);
exports.SyncConnectionProcessor = SyncConnectionProcessor;
//# sourceMappingURL=SyncConnectionProcessor.js.map