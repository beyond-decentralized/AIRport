import {
	BatchedMessagesToTM,
	MessageToTM,
	MessageToTMContentType,
	RepoTransBlockMessageToTM,
	RepoTransBlockSyncStatus,
	SyncNotificationMessageToTM,
	TmSharingMessageId
}                                 from '@airport/arrivals-n-departures'
import {container, DI}                       from '@airport/di'
import {CascadeOverwrite}         from '@airport/ground-control'
import {
	DataOrigin,
	ISharingMessage,
	ISharingNode,
	ISharingNodeTerminal,
	RepositoryTransactionBlockData,
	SHARING_MESSAGE_DAO,
	SharingNodeId
}                                 from '@airport/moving-walkway'
import {transactional}            from '@airport/tower'
import {parse}                    from 'zipson/lib'
import {
	SYNC_IN_CHECKER,
	SYNC_IN_MANAGER,
	SYNC_LOG_MESSAGE_PROCESSOR,
	TWO_STAGE_SYNCED_IN_DATA_PROCESSOR
}                                 from '../../tokens'
import {SyncInMessageWithContent} from './model/SyncInMessageWithContent'
import {IDataToTM}                from './SyncInUtils'

/**
 * Synchronization Log part of the Message from AGT to Terminal (TM)
 */
export interface ISyncLogToTM {
	// agtTerminalSyncLogId: AgtTerminalSyncLogId;
	outcomes: RepoTransBlockSyncStatus[];
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

// const log = GROUND_TRANSPORT_LOGGER.add('SynchronizationInManager')

/**
 * Synchronization in Manager implementation.
 */
export class SynchronizationInManager
	implements ISynchronizationInManager {

	/**
	 * ASSUMPTION: all of the messages are intended for this TM.
	 *
	 * @param {ISharingNode[]} sharingNodes   All of the sharing associated with incoming
	 *   messages
	 *      (in same order as messages)
	 * @param {MessageToTM[][]} incomingMessages    All of the incoming messages, grouped
	 *   into arrays by sharing node
	 * @returns {Promise<void>}   Return when all of the messages have been processed
	 */
	async receiveMessages(
		sharingNodes: ISharingNode[],
		incomingMessages: BatchedMessagesToTM[],
		sharingNodeTerminalMap: Map<SharingNodeId, ISharingNodeTerminal>
	): Promise<void> {
		// TODO: is syncInChecker needed (what was the reason for original injection)?
		const [sharingMessageDao, syncInChecker,
			      syncLogMessageProcessor, twoStageSyncedInDataProcessor
		      ] = await container(this).get(SHARING_MESSAGE_DAO, SYNC_IN_CHECKER,
			SYNC_LOG_MESSAGE_PROCESSOR, TWO_STAGE_SYNCED_IN_DATA_PROCESSOR)

		const syncTimestamp                      = new Date()
		const allSyncLogMessages: ISyncLogToTM[] = []
		const allDataMessages: IDataToTM[]       = []

		const messagesToContent: SyncInMessageWithContent[] = []
		const sharingMessages: ISharingMessage[]            = []

		// Split up messages by type
		for (let i = 0; i < incomingMessages.length; i++) {

			const sharingNode = sharingNodes[i]
			const sharingNodeTerminal: ISharingNodeTerminal
			                  = sharingNodeTerminalMap.get(sharingNode.id)

			const batchedMessagesToTM = incomingMessages[i]

			const isMessageForThisTerminal = batchedMessagesToTM.targetAgtTerminalIds.some(
				agtTerminalId =>
					agtTerminalId === sharingNodeTerminal.agtTerminalId)
			if (!isMessageForThisTerminal) {
				// TODO: handle messages for other terminals (?forward them?)
				continue
			}

			const sharingMessage: ISharingMessage = {
				origin: DataOrigin.REMOTE,
				agtSharingMessageId: batchedMessagesToTM.agtSharingMessageId,
				sharingNode,
				syncTimestamp
			}
			sharingMessages.push(sharingMessage)
			const messageWithContent: SyncInMessageWithContent = {
				sharingMessage,
				dataMessages: [],
				syncLogMessages: []
			}
			messagesToContent.push(messageWithContent)
			for (const incomingMessage of batchedMessagesToTM.messages) {
				switch (incomingMessage.contentType) {
					// Terminal sync log messages are responses from AGT on which messages coming
					// form this TM have been synced (or not)
					case MessageToTMContentType.SYNC_NOTIFICATION: {
						const syncNotificationMessage              = <SyncNotificationMessageToTM>incomingMessage
						const syncLogMessageToClient: ISyncLogToTM = {
							// agtTerminalSyncLogId: syncNotificationMessage.agtTerminalSyncLogId,
							outcomes: syncNotificationMessage.syncOutcomes,
							sharingNode: sharingNode,
							// syncDatetime: syncTimestamp, //
							// syncNotificationMessage.agtSyncRecordAddDatetime,
							tmSharingMessageId: syncNotificationMessage.tmSharingMessageId
						}
						// if (!this.isValidLastChangeTime(syncTimestamp,
						// 	syncLogMessageToClient.syncDatetime, incomingMessage)) {
						// 	break;
						// }
						messageWithContent.syncLogMessages.push(syncLogMessageToClient)
						allSyncLogMessages.push(syncLogMessageToClient)
						break
					}
					// Sync Record messages are synced via AGT to this TM from other TMs
					case MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
						const repoTransBlockMessage                = <RepoTransBlockMessageToTM>incomingMessage
						const serializedData                       = repoTransBlockMessage.repositoryTransactionBlock
						const data: RepositoryTransactionBlockData = parse(serializedData)

						const lastChangeTimeMillis = this.getLastChangeMillisFromRepoTransBlock(
							data)

						if (!this.isValidLastChangeTime(syncTimestamp, lastChangeTimeMillis)) {
							break
						}
						const dataMessage: IDataToTM = {
							// sourceAgtTerminalId: repoTransBlockMessage.sourceAgtTerminalId,
							// agtRepositoryId: repoTransBlockMessage.agtRepositoryId,
							// agtSyncRecordId: repoTransBlockMessage.agtSyncRecordId,
							data,
							serializedData,
							sharingMessage,
							// syncDatetime: syncTimestamp,
						}
						messageWithContent.dataMessages.push(dataMessage)
						allDataMessages.push(dataMessage)
						break
					}
					case MessageToTMContentType.ALIVE_ACK:
						throw new Error('Not Implemented')
					default:
						console.error(`Unsupported ClientInMessage type: ${(<MessageToTM>incomingMessage).contentType}`)
						break
				}
			}
		}

		await transactional(async () => {
			await sharingMessageDao.bulkCreate(
				sharingMessages, CascadeOverwrite.DEFAULT,
				false)


			// These messages are responses to already sent messages
			// no need to check for existence of repositories
			await syncLogMessageProcessor.recordSyncLogMessages(allSyncLogMessages)


			await twoStageSyncedInDataProcessor.syncDataMessages(allDataMessages)
		})
	}

	private isValidLastChangeTime(
		syncTimestamp: Date,
		lastChangeTimeMillis: LastRemoteChangeMillis,
		// messageToTM: MessageToTM
	): boolean {
		const receptionTimeMillis = syncTimestamp.getTime()
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
			console.error(`MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK
			Message reception time is less than last Change Time in received message:
				Reception Time:                 ${receptionTimeMillis}
				Last Received Change Time:      ${lastChangeTimeMillis}
			`)
			// 		break;
			// 	}
			// 	case MessageToTMContentType.ALIVE_ACK: {
			// 		// FIXME: implement
			// 		throw new Error('Not implemented');
			// 	}
			// 	default:
			// 		log.throw(`Unsupported MessageToTMContentType: {1}`,
			// (<any>messageToTM).contentType); }
			return false
		}

		return true
	}

	private getLastChangeMillisFromRepoTransBlock(
		data: RepositoryTransactionBlockData
	): LastRemoteChangeMillis {
		let lastChangeTimeMillis: LastRemoteChangeMillis
		for (const repoTransHistory of data.repoTransHistories) {
			const saveTimestampMillis: LastRemoteChangeMillis = <any>repoTransHistory.saveTimestamp

			// Deserialize save timestamp
			repoTransHistory.saveTimestamp = new Date(repoTransHistory.saveTimestamp)
			if (!lastChangeTimeMillis) {
				lastChangeTimeMillis = saveTimestampMillis
			} else if (lastChangeTimeMillis < saveTimestampMillis) {
				lastChangeTimeMillis = saveTimestampMillis
			}
		}

		return lastChangeTimeMillis
	}

}

DI.set(SYNC_IN_MANAGER, SynchronizationInManager)
