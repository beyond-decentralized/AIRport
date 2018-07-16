import {
	DatabaseId,
	IServer,
	ISyncRecordDao,
	RepositoryId,
	SyncRecordAddDatetime,
	SyncRecordTransactionData
} from "@airport/guideway";
import { IBlacklist } from "../clientConnection/Blacklist";
import { VerifiedClientSseMessages } from "../model/ClientInMessage";
import { ConnectionDataCallback, MILLIS_IN_DAY } from "../model/ClientOutMessage";
import { ITuningSettings } from "../model/TuningSettings";
import { IDataProcessor } from "./DataProcessor";
import { ISseLoginVerifier } from "./SseLoginVerifier";

export interface IServerSentEventsServer {

	startProcessing(
		portNumberToListenOn: number,
		setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer,
		intervalFrequencyMillis: number,
	): void;

	stopProcessing( //
	): void;

}

export class ServerSentEventsServer
	implements ServerSentEventsServer {

	minMillisSinceLastConnection: number = 600000;

	constructor(
		private ipBlacklist: IBlacklist<string>,
		private dataProcessor: IDataProcessor,
		private loginVerifier: ISseLoginVerifier,
		private server: IServer,
		private syncRecordDao: ISyncRecordDao,
		private tuningSettings: ITuningSettings,
	) {
	}

	startProcessing(
		portNumberToListenOn: number,
		setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer,
		intervalFrequencyMillis: number,
	): void {

		setInterval(() => {
			this.processBatchedConnections().then();
		}, intervalFrequencyMillis);

	}

	async processBatchedConnections( //
	): Promise<void> {
		const serverId = this.server.id;
		const verificationResults: VerifiedClientSseMessages
			= await this.loginVerifier.verifyPendingClaims(
			serverId, this.minMillisSinceLastConnection);

		const connectionDataCallbackMapByDatabaseId: Map<DatabaseId, ConnectionDataCallback> = null;

		await this.sendAllNonRealtimeChanges(verificationResults[0], verificationResults[1]);

		// Close all remaining (valid) connections
		for (const [databaseId, connectionDataCallback] of connectionDataCallbackMapByDatabaseId) {
			connectionDataCallback(databaseId, false, null);
		}
	}

	async sendAllNonRealtimeChanges(
		databaseIds: DatabaseId[],
		connectionDataCallbackMapByDatabaseId: Map<DatabaseId, ConnectionDataCallback>,
	): Promise<void> {
		const partitionLimitingFromTime = new Date().getTime() - MILLIS_IN_DAY;
		await this.syncRecordDao.getAllUnreadChanges(
			partitionLimitingFromTime, databaseIds, false,
			this.tuningSettings.recent.numSyncRecordsToReturnInCursor, (
				batchData: [DatabaseId, RepositoryId, SyncRecordAddDatetime, SyncRecordTransactionData][]
			) => {
				for (const unreadChange of batchData) {
					const databaseId = unreadChange[0];
					connectionDataCallbackMapByDatabaseId.get(databaseId)(databaseId, false, [
						unreadChange[1], unreadChange[2], unreadChange[3]
					]);
				}
			}
		)
	}


	stopProcessing( //
	): void {
	}

}