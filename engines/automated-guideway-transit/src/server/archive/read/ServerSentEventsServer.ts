/*
import {
	TerminalId,
	AgtRepositoryId,
	AgtRepositoryTransactionBlockAddDatetime,
	RepositoryTransactionBlockContents,
	ConnectionDataCallback,
	IBlacklist,
	VerifiedClientSseMessages
}                          from "@airport/ground-control";
import {
	IServer,
	IAgtRepositoryTransactionBlockDao
}                          from "@airport/guideway";
import {MILLIS_IN_DAY}     from "../../../model/Constaints";
import {ITuningSettings}   from "../../../model/TuningSettings";
import {IDataProcessor}    from "./DataProcessor";
import {ISseLoginVerifier} from "./SseLoginVerifier";

export interface IServerSentEventsServer {

	startProcessing(
		portNumberToListenOn: number,
		setInterval: (
			callback: (...args: any[]) => void,
			ms: number
		) => NodeJS.Timer,
		intervalFrequencyMillis: number,
	): void;

	stopProcessing( //
	): void;

}

export class ServerSentEventsServer
	implements IServerSentEventsServer {

	minMillisSinceLastConnection: number = 600000;

	constructor(
		private ipBlacklist: IBlacklist<string>,
		private dataProcessor: IDataProcessor,
		private loginVerifier: ISseLoginVerifier,
		private server: IServer,
		private agtRepositoryTransactionBlockDao: IAgtRepositoryTransactionBlockDao,
		private tuningSettings: ITuningSettings,
	) {
	}

	startProcessing(
		portNumberToListenOn: number,
		setInterval: (
			callback: (...args: any[]) => void,
			ms: number
		) => NodeJS.Timer,
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

		const connectionDataCallbackMapByTerminalId: Map<TerminalId, ConnectionDataCallback> = null;

		await this.sendAllNonRealtimeChanges(verificationResults[0], verificationResults[1]);

		// Close all remaining (valid) connections
		for (const [terminalId, connectionDataCallback] of connectionDataCallbackMapByTerminalId) {
			connectionDataCallback(terminalId, false, null);
		}
	}

	async sendAllNonRealtimeChanges(
		terminalIds: TerminalId[],
		connectionDataCallbackMapByTerminalId: Map<TerminalId, ConnectionDataCallback>,
	): Promise<void> {
		const partitionLimitingFromTime = new Date().getTime() - MILLIS_IN_DAY;
		await this.agtRepositoryTransactionBlockDao.getAllUnreadChanges(
			partitionLimitingFromTime, terminalIds, false,
			this.tuningSettings.daily.numRepoTransBlocksToReturnInCursor, (
				batchData: [TerminalId, AgtRepositoryId, AgtRepositoryTransactionBlockAddDatetime, RepositoryTransactionBlockContents][]
			) => {
				for (const unreadChange of batchData) {
					const terminalId = unreadChange[0];
					connectionDataCallbackMapByTerminalId.get(terminalId)(terminalId, false, [
						unreadChange[1], unreadChange[2], unreadChange[3]
					]);
				}
			}
		)
	}


	stopProcessing( //
	): void {
	}

}*/
