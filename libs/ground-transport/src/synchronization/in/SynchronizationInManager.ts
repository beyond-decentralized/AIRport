import {
	BatchedMessagesToTM,
	MessageToTM,
	MessageToTMContentType,
	RepoTransBlockMessageToTM,
	RepoTransBlockSyncOutcome,
	SyncNotificationMessageToTM,
	TmSharingMessageId
}                                       from "@airport/arrivals-n-departures";
import {
	DataOrigin,
	ISharingMessage,
	ISharingMessageDao,
	ISharingNode,
	ISharingNodeTerminal,
	RepositoryTransactionBlockData,
	SharingMessageDaoToken,
	SharingNodeId
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
	// agtTerminalSyncLogId: AgtTerminalSyncLogId;
	outcomes: RepoTransBlockSyncOutcome[];
	sharingNode: ISharingNode;
	// syncDatetime: AgtSyncRecordAddDatetime;
	tmSharingMessageId: TmSharingMessageId;
}

/**
 * The manager for synchronizing data coming in the AGT-to-Terminal (TM) direction
 */
export interface ISynchronizationInManager {

	receiveMessages(
		sharingNodes: ISharingNode[],
		incomingMessages: BatchedMessagesToTM[],
		sharingNodeTerminalMap: Map<SharingNodeId, ISharingNodeTerminal>
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
		@Inject(SharingMessageDaoToken)
		private sharingMessageDao: ISharingMessageDao,
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
		incomingMessages: BatchedMessagesToTM[],
		sharingNodeTerminalMap: Map<SharingNodeId, ISharingNodeTerminal>
	): Promise<void> {
		const syncTimestamp = new Date();
		const allSyncLogMessages: ISyncLogToTM[] = [];
		const allDataMessages: IDataToTM[] = [];

		const messagesToContent: SyncInMessageWithContent[] = [];
		const sharingMessages: ISharingMessage[] = [];

		// Split up messages by type
		for (let i = 0; i < incomingMessages.length; i++) {

			const sharingNode = sharingNodes[i];
			const sharingNodeTerminal: ISharingNodeTerminal
				= sharingNodeTerminalMap.get(sharingNode.id);

			const batchedMessagesToTM = incomingMessages[i];

			const isMessageForThisTerminal = batchedMessagesToTM.targetAgtTerminalIds.some(
				agtTerminalId =>
					agtTerminalId === sharingNodeTerminal.agtTerminalId);
			if (!isMessageForThisTerminal) {
				// TODO: handle messages for other terminals (?forward them?)
				continue;
			}

			const sharingMessage: ISharingMessage = {
				origin: DataOrigin.REMOTE,
				agtSharingMessageId: batchedMessagesToTM.agtSharingMessageId,
				sharingNode,
				syncTimestamp
			};
			sharingMessages.push(sharingMessage);
			const messageWithContent: SyncInMessageWithContent = {
				sharingMessage,
				dataMessages: [],
				syncLogMessages: []
			};
			messagesToContent.push(messageWithContent);
			for (const incomingMessage of batchedMessagesToTM.messages) {
				switch (incomingMessage.contentType) {
					// Terminal sync log messages are responses from AGT on which messages coming form this
					// TM have been synced (or not)
					case MessageToTMContentType.SYNC_NOTIFICATION: {
						const syncNotificationMessage = <SyncNotificationMessageToTM>incomingMessage;
						const syncLogMessageToClient: ISyncLogToTM = {
							// agtTerminalSyncLogId: syncNotificationMessage.agtTerminalSyncLogId,
							outcomes: syncNotificationMessage.syncOutcomes,
							sharingNode: sharingNode,
							// syncDatetime: syncTimestamp, // syncNotificationMessage.agtSyncRecordAddDatetime,
							tmSharingMessageId: syncNotificationMessage.tmSharingMessageId
						};
						// if (!this.isValidLastChangeTime(syncTimestamp,
						// 	syncLogMessageToClient.syncDatetime, incomingMessage)) {
						// 	break;
						// }
						messageWithContent.syncLogMessages.push(syncLogMessageToClient);
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

						if (!this.isValidLastChangeTime(syncTimestamp, lastChangeTimeMillis)) {
							break;
						}
						const dataMessage: IDataToTM = {
							// sourceAgtTerminalId: repoTransBlockMessage.sourceAgtTerminalId,
							// agtRepositoryId: repoTransBlockMessage.agtRepositoryId,
							// agtSyncRecordId: repoTransBlockMessage.agtSyncRecordId,
							data,
							serializedData,
							sharingMessage,
							// syncDatetime: syncTimestamp,
						};
						messageWithContent.dataMessages.push(dataMessage);
						allDataMessages.push(dataMessage);
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

		await this.sharingMessageDao.bulkCreate(
			sharingMessages, false, false);


		// These messages are responses to already sent messages
		// no need to check for existence of repositories
		await this.syncLogMessageProcessor.recordSyncLogMessages(allSyncLogMessages);

		const {consistentMessages, sharingNodeRepositoryMap}
			= await this.syncInChecker.repositoryChecker.ensureRepositories(allDataMessages);

		await this.twoStageSyncedInDataProcessor.syncDataMessages(
			consistentMessages, sharingNodeRepositoryMap);

	}

	private isValidLastChangeTime(
		syncTimestamp: Date,
		lastChangeTimeMillis: LastRemoteChangeMillis,
		// messageToTM: MessageToTM
	): boolean {
		const receptionTimeMillis = syncTimestamp.getTime();
		if (receptionTimeMillis < lastChangeTimeMillis) {
			// switch (messageToTM.contentType) {
			// 	case MessageToTMContentType.SYNC_NOTIFICATION: {
			// 		log.error(`MessageToTMContentType.SYNC_NOTIFICATION
			// Message reception time is less than last Change Time in received message:
			// 	Reception Time:            {1}
			// 	Last Received Change Time: {2}
			// 	TmSharingMessageId:        {3}
			// 	AgtSyncRecordAddDatetime:  {4}
			// `, receptionTimeMillis,
			// 			lastChangeTimeMillis,
			// 			(<SyncNotificationMessageToTM>messageToTM).tmSharingMessageId,
			// 			(<SyncNotificationMessageToTM>messageToTM).agtSyncRecordAddDatetime);
			// 		// AgtTerminalSyncLogId:      {4}
			// 		// (<SyncNotificationMessageToTM>messageToTM).agtTerminalSyncLogId,
			// 		break;
			// 	}
			// 	case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
			// SourceAgtTerminalId:            {3}
			// AgtRepositoryId:                {4}
			// TmRepositoryTransactionBlockId: {5}
			log.error(`MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK
			Message reception time is less than last Change Time in received message:
				Reception Time:                 {1}
				Last Received Change Time:      {2}
			`, receptionTimeMillis,
				lastChangeTimeMillis);
			// 		break;
			// 	}
			// 	case MessageToTMContentType.ALIVE_ACK: {
			// 		// FIXME: implement
			// 		throw new Error('Not implemented');
			// 	}
			// 	default:
			// 		log.throw(`Unsupported MessageToTMContentType: {1}`, (<any>messageToTM).contentType);
			// }
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
