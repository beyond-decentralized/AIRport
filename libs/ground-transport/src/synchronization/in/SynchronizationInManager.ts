import {
	AgtSyncRecordAddDatetime,
	BatchedMessagesToTM,
	MessageToTM,
	MessageToTMContentType,
	RepoTransBlockMessageToTM,
	RepoTransBlockSyncOutcome,
	SyncNotificationMessageToTM,
	TmSharingMessageId
}                                       from "@airport/arrivals-n-departures";
import {
	ISharingMessage,
	ISharingNode,
	RepositoryTransactionBlockData
}                                       from "@airport/moving-walkway";
import {Transactional}                  from "@airport/tower";
import {Inject}                         from "typedi/decorators/Inject";
import {Service}                        from "typedi/decorators/Service";
import {parse}                          from "zipson/lib";
import {
	SynchronizationInManagerToken,
	SyncInCheckerToken,
	SyncLogMessageProcessorToken,
	TerminalLogger,
	TwoStageSyncedInDataProcessorToken
}                                       from "../../InjectionTokens";
import {ISyncInChecker}                 from "./checker/SyncInChecker";
import {SyncInMessageWithContent}       from "./model/SyncInMessageWithContent";
import {IDataToTM}                      from "./SyncInUtils";
import {ISyncLogMessageProcessor}       from "./SyncLogMessageProcessor";
import {ITwoStageSyncedInDataProcessor} from "./TwoStageSyncedInDataProcessor";

/**
 * Synchronization Log part of the Message from AGT to Terminal (TM)
 */
export interface ISyncLogToTM {
	// agtDatabaseSyncLogId: AgtDatabaseSyncLogId;
	outcomes: RepoTransBlockSyncOutcome[];
	sharingNode: ISharingNode;
	syncDatetime: AgtSyncRecordAddDatetime;
	tmSharingMessageId: TmSharingMessageId;
}

/**
 * The manager for synchronizing data coming in the AGT-to-Terminal (TM) direction
 */
export interface ISynchronizationInManager {

	receiveMessages(
		sharingNodes: ISharingNode[],
		incomingMessages: BatchedMessagesToTM[]
	): Promise<void>;

}

export interface ISharingMessageWithData {
	sharingMessage: ISharingMessage;
	dataMessage: IDataToTM;
}

export type LastRemoteChangeMillis = number;

const log = TerminalLogger.add('SynchronizationInManager');

/**
 * Synchronization in Manager implementation.
 */
@Service(SynchronizationInManagerToken)
export class SynchronizationInManager
	implements ISynchronizationInManager {

	constructor(
		@Inject(SyncInCheckerToken)
		private syncInChecker: ISyncInChecker,
		@Inject(SyncLogMessageProcessorToken)
		private syncLogMessageProcessor: ISyncLogMessageProcessor,
		@Inject(TwoStageSyncedInDataProcessorToken)
		private twoStageSyncedInDataProcessor: ITwoStageSyncedInDataProcessor,
	) {
	}

	/**
	 * ASSUMPTION: all of the messages are intended for this TM.
	 *
	 * @param {ISharingNode[]} sharingNodes   All of the sharing associated with incoming messages
	 *      (in same order as messages)
	 * @param {MessageToTM[][]} incomingMessages    All of the incoming messages, grouped into
	 *      arrays by sharing node
	 * @returns {Promise<void>}   Return when all of the messages have been processed
	 */
	@Transactional()
	async receiveMessages(
		sharingNodes: ISharingNode[],
		incomingMessages: BatchedMessagesToTM[]
	): Promise<void> {
		const receptionTimeMillis = new Date().getTime();
		const allSyncLogMessages: ISyncLogToTM[] = [];
		const allDataMessages: IDataToTM[] = [];

		const messagesToContent: SyncInMessageWithContent[] = [];

		// Split up messages by type
		for (let i = 0; i < incomingMessages.length; i++) {
			const syncLogMessages: ISyncLogToTM[] = [];
			const dataMessages: IDataToTM[] = [];
			const messagesToContent
		.
			push({
				sharingMessage:
			})
			const sharingNode = sharingNodes[i];
			const messagesFromSharingNode = incomingMessages[i];
			for (const incomingMessage of messagesFromSharingNode) {
				switch (incomingMessage.contentType) {
					// Database sync log messages are responses from AGT on which messages coming form this
					// TM have been synced (or not)
					case MessageToTMContentType.SYNC_NOTIFICATION: {
						const syncNotificationMessage = <SyncNotificationMessageToTM>incomingMessage;
						const syncLogMessageToClient: ISyncLogToTM = {
							// agtDatabaseSyncLogId: syncNotificationMessage.agtDatabaseSyncLogId,
							outcomes: syncNotificationMessage.syncOutcomes,
							sharingNode: sharingNode,
							syncDatetime: receptionTimeMillis, // syncNotificationMessage.agtSyncRecordAddDatetime,
							tmSharingMessageId: syncNotificationMessage.tmSharingMessageId
						};
						if (!this.isValidLastChangeTime(receptionTimeMillis,
							syncLogMessageToClient.syncDatetime, incomingMessage)) {
							break;
						}
						allSyncLogMessages.push(syncLogMessageToClient);
						break;
					}
					// Sync Record messages are synced via AGT to this TM from other TMs
					case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
						const repoTransBlockMessage = <RepoTransBlockMessageToTM>incomingMessage;
						const serializedData = repoTransBlockMessage.repositoryTransactionBlock;
						const data: RepositoryTransactionBlockData = parse(serializedData);

						const lastChangeTimeMillis = this.getLastChangeMillisFromRepoTransBlock(
							data);

						if (!this.isValidLastChangeTime(receptionTimeMillis, lastChangeTimeMillis,
							incomingMessage)) {
							break;
						}
						allDataMessages.push({
							// sourceAgtDatabaseId: repoTransBlockMessage.sourceAgtDatabaseId,
							// agtRepositoryId: repoTransBlockMessage.agtRepositoryId,
							// agtSyncRecordId: repoTransBlockMessage.agtSyncRecordId,
							data,
							serializedData,
							sharingNode: sharingNode,
							syncDatetime: receptionTimeMillis,
						});
						break;
					}
					case MessageToTMContentType.ALIVE_ACK:
						throw new Error('Not Implemented');
					default:
						log.error(`Unsupported ClientInMessage type: {1}`, (<MessageToTM>incomingMessage).contentType);
						break;
				}
			}
		}


		// These messages are responses to already sent messages
		// no need to check for existence of repositories
		await this.syncLogMessageProcessor.recordSyncLogMessages(allSyncLogMessages);

		const {consistentMessages, sharingNodeRepositoryMap}
			= await this.syncInChecker.repositoryChecker.ensureRepositories(allDataMessages);

		await this.twoStageSyncedInDataProcessor.syncDataMessages(
			consistentMessages, sharingNodeRepositoryMap);

	}

	private isValidLastChangeTime(
		receptionTimeMillis: number,
		lastChangeTimeMillis: LastRemoteChangeMillis,
		messageToTM: MessageToTM
	): boolean {
		if (receptionTimeMillis < lastChangeTimeMillis) {
			switch (messageToTM.contentType) {
				case MessageToTMContentType.SYNC_NOTIFICATION: {
					log.error(`MessageToTMContentType.SYNC_NOTIFICATION
			Message reception time is less than last Change Time in received message:
				Reception Time:            {1}
				Last Received Change Time: {2}
				TmSharingMessageId:        {3}
				AgtSyncRecordAddDatetime:  {4}
			`, receptionTimeMillis,
						lastChangeTimeMillis,
						(<SyncNotificationMessageToTM>messageToTM).tmSharingMessageId,
						(<SyncNotificationMessageToTM>messageToTM).agtSyncRecordAddDatetime);
					// AgtDatabaseSyncLogId:      {4}
					// (<SyncNotificationMessageToTM>messageToTM).agtDatabaseSyncLogId,
					break;
				}
				case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
					// SourceAgtDatabaseId:            {3}
					// AgtRepositoryId:                {4}
					// TmRepositoryTransactionBlockId: {5}
					log.error(`MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK
			Message reception time is less than last Change Time in received message:
				Reception Time:                 {1}
				Last Received Change Time:      {2}
			`, receptionTimeMillis,
						lastChangeTimeMillis);
					break;
				}
				case MessageToTMContentType.ALIVE_ACK: {
					// FIXME: implement
					throw new Error('Not implemented');
				}
				default:
					log.throw(`Unsupported MessageToTMContentType: {1}`, (<any>messageToTM).contentType);
			}
			return false;
		}

		return true;
	}

	private getLastChangeMillisFromRepoTransBlock(
		data: RepositoryTransactionBlockData
	): LastRemoteChangeMillis {
		let lastChangeTimeMillis: LastRemoteChangeMillis;
		for (const repoTransHistory of data.repoTransHistories) {
			const saveTimestampMillis: LastRemoteChangeMillis = <any>repoTransHistory.saveTimestamp;

			// Deserialize save timestamp
			repoTransHistory.saveTimestamp = new Date(repoTransHistory.saveTimestamp);
			if (!lastChangeTimeMillis) {
				lastChangeTimeMillis = saveTimestampMillis;
			} else if (lastChangeTimeMillis < saveTimestampMillis) {
				lastChangeTimeMillis = saveTimestampMillis;
			}
		}

		return lastChangeTimeMillis;
	}

}
