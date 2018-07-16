import { IBlacklist } from "./Blacklist";
import { SyncConnectionClaim, VerifiedMessagesFromTM } from "./message/MessageFromTM";
export interface ISyncConnectionVerifier {
    blacklist: IBlacklist<string>;
    queueConnectionClaim(pendingConnectionClaim: SyncConnectionClaim): void;
    verifyPendingClaims(minMillisSinceLastConnection: number): Promise<VerifiedMessagesFromTM>;
}
