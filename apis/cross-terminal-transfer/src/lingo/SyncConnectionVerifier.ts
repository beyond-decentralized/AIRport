import {
	SyncConnectionClaim,
	VerifiedMessagesFromTM
} from './message/MessageFromTM'

export interface ISyncConnectionVerifier {

	queueConnectionClaim(
		pendingConnectionClaim: SyncConnectionClaim,
	): void;

	verifyPendingClaims(
		// serverId: ServerId,
		minMillisSinceLastConnection: number
	): Promise<VerifiedMessagesFromTM>;

}
