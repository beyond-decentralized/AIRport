import { AgtRepositoryId, SyncConnectionClaim, TerminalId, VerifiedMessagesFromTM } from '@airport/arrivals-n-departures';
import { IAgtRepositoryTransactionBlockDao, IAgtSharingMessageDao, ISyncLogDao, ITerminalDao, ITerminalRepositoryDao } from '@airport/guideway';
export interface ISyncConnectionProcessor {
    processConnections(verifiedMessagesFromTM: VerifiedMessagesFromTM): Promise<void>;
}
export declare class SyncConnectionProcessor implements ISyncConnectionProcessor {
    processConnections(verifiedMessagesFromTM: VerifiedMessagesFromTM): Promise<void>;
    updateLastSyncConnectionDatetime(verifiedTerminalIds: TerminalId[], terminalDao: ITerminalDao): Promise<void>;
    private insertRepositoryTransactionBlocks;
    tryToInsertAgtRepositoryTransactionBlocks(verifiedTerminalIds: TerminalId[], repositoryIdSet: Set<AgtRepositoryId>, verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>, agtRepoTransBlockDao: IAgtRepositoryTransactionBlockDao, agtSharingMessageDao: IAgtSharingMessageDao, syncLogDao: ISyncLogDao, terminalRepositoryDao: ITerminalRepositoryDao): Promise<void>;
    private declineTransSyncLog;
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
    private ensureRepositoryPermissions;
    private addRepositoryTransactionBlocks;
    private messageAlreadySynced;
    private respondToAlreadySyncedMessages;
    private persistRepositoryTransactionBlocks;
    private updateAgtSharingMessages;
    private tryToUpdateAgtSharingMessages;
    private sendRecentChangesToVerifiedConnections;
    private tryToSendRecentChangesToVerifiedConnections;
}
//# sourceMappingURL=SyncConnectionProcessor.d.ts.map