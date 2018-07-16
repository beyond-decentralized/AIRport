import { DatabaseHash, DatabaseId, IDatabase, IDatabaseDao } from "@airport/guideway";
import { IBlacklist } from "../clientConnection/Blacklist";
import { VerifiedClientSseMessages } from "../model/ClientInMessage";
import { ConnectionDataCallback } from "../model/ClientOutMessage";

export interface ISseLoginVerifier {

	blacklist: IBlacklist<string>;

	queueLoginClaim(
		pendingLoginClaim: DatabaseHash,
	): void;

	verifyPendingClaims(
		serverId: number,
		minMillisSinceLastConnection: number
	): Promise<VerifiedClientSseMessages>;

}

export class SseLoginVerifier
	implements ISseLoginVerifier {

	pendingLoginClaims: DatabaseHash[] = [];

	constructor(
		public blacklist: IBlacklist<string>,
		private databaseDao: IDatabaseDao,
	) {
	}

	queueLoginClaim(
		pendingLoginClaim: DatabaseHash,
	): void {
		this.pendingLoginClaims.push(pendingLoginClaim);
	}

	async verifyPendingClaims(
		serverId: number,
		minMillisSinceLastConnection: number
	): Promise<VerifiedClientSseMessages> {
		const databaseIds: DatabaseId[] = [],
			connectionDataCallbackMapByDatabaseId: Map<DatabaseId, ConnectionDataCallback> = new Map();

		const currentLoginClaims = this.pendingLoginClaims;
		this.pendingLoginClaims = [];

		const pendingLoginClaimsMap: Map<DatabaseHash, DatabaseId> = new Map();

		const loginVerificationRecords: Map<DatabaseHash, IDatabase> =
			await this.databaseDao.findSseLoginVerificationRecords(currentLoginClaims);

		const verifiedDatabaseIds: DatabaseId[] = [];

		const earliestAllowedLastConnectionDatetime = new Date().getTime() - minMillisSinceLastConnection;
		for (const [databaseHash, database] of loginVerificationRecords) {
			const pendingLoginClaim = pendingLoginClaimsMap.get(databaseHash);
			const connectionDataCallback = pendingLoginClaim[1];
			if (database.lastSseConnectionDatetime > earliestAllowedLastConnectionDatetime) {
				connectionDataCallback(null, false, null);
				continue;
			}
			pendingLoginClaimsMap.delete(databaseHash);
			const databaseId = database.id;
			verifiedDatabaseIds.push(databaseId);

			databaseIds.push(databaseId);
			connectionDataCallbackMapByDatabaseId.set(databaseId, connectionDataCallback);

			connectionDataCallback(databaseId, true, null);
		}
		for (const [databaseHash, pendingLoginClaim] of pendingLoginClaimsMap) {
			pendingLoginClaim[1](null, false, null);
		}
		// Let update run in background, nothing depends on it being finished
		this.databaseDao.updateLastSseConnectionDatetime(verifiedDatabaseIds).then();

		return [databaseIds, connectionDataCallbackMapByDatabaseId];
	}
}