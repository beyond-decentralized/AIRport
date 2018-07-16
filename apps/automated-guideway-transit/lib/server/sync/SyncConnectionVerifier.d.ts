import { IBlacklist, ISyncConnectionVerifier, SyncConnectionClaim, VerifiedMessagesFromTM } from '@airport/arrivals-n-departures';
import { ITerminalDao, ITerminalRepositoryDao, IAgtSharingMessageDao } from "@airport/guideway";
import { IErrorLogger } from "../common/ErrorLogger";
export declare class SyncConnectionVerifier implements ISyncConnectionVerifier {
    blacklist: IBlacklist<string>;
    private terminalDao;
    private terminalRepositoryDao;
    private agtSharingMessageDao;
    private errorLogger;
    pendingConnectionClaims: SyncConnectionClaim[];
    constructor(blacklist: IBlacklist<string>, terminalDao: ITerminalDao, terminalRepositoryDao: ITerminalRepositoryDao, agtSharingMessageDao: IAgtSharingMessageDao, errorLogger: IErrorLogger);
    queueConnectionClaim(pendingConnectionClaim: SyncConnectionClaim): void;
    /**
     * Verify pending connection claims.
     *
     * Concerns:
     *
     * 1) How to handle valid user connections when a DDOS attack is randomly using their Terminal
     * Original Shard Id and Terminal Id:
     *
     * a) When multiple Connection requests for the same Terminal credentials are detected, deny the
     * request before it is recorded into the Terminal Repository staging table.
     *
     * b) Then find the correct terminal request via the provided hash and disallow the remaining
     * ones.
     *
     * Implementing the second option, since a the priority is to have the server still syncing (in
     * the presence of a DDOS attack).
     *
     *
     * @param {number} serverId
     * @param {number} minMillisSinceLastConnection
     * @returns {Promise<VerifiedClientPollMessages>}
     */
    verifyPendingClaims(minMillisSinceLastConnection: number): Promise<VerifiedMessagesFromTM>;
    private verifyTerminalsAndGetResourceIds;
    private verifyTerminalInfo;
    private finishTerminalVerification;
    private filterDuplicateRequestsPerTerminal;
}
