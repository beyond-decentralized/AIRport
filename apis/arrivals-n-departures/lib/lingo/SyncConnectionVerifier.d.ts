import { SyncConnectionClaim, VerifiedMessagesFromTM } from './message/MessageFromTM';
export interface ISyncConnectionVerifier {
    queueConnectionClaim(pendingConnectionClaim: SyncConnectionClaim): void;
    verifyPendingClaims(minMillisSinceLastConnection: number): Promise<VerifiedMessagesFromTM>;
}
