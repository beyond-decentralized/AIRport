import {IBlacklist} from "./Blacklist";
import {
	SyncConnectionClaim,
	VerifiedMessagesFromTM
}                   from "./message/MessageFromTM";

export interface ISyncConnectionVerifier {

	blacklist: IBlacklist<string>;

	queueConnectionClaim(
		pendingConnectionClaim: SyncConnectionClaim,
	): void;

	verifyPendingClaims(
		// serverId: ServerId,
		minMillisSinceLastConnection: number
	): Promise<VerifiedMessagesFromTM>;

}