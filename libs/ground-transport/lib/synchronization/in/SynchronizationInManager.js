"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const di_1 = require("@airport/di");
const moving_walkway_1 = require("@airport/moving-walkway");
const tower_1 = require("@airport/tower");
const lib_1 = require("zipson/lib");
const Constants_1 = require("../../Constants");
const diTokens_1 = require("../../diTokens");
const log = Constants_1.GROUND_TRANSPORT_LOGGER.add('SynchronizationInManager');
/**
 * Synchronization in Manager implementation.
 */
class SynchronizationInManager {
    constructor() {
        di_1.DI.get((sharingMessageDao, syncInChecker, syncLogMessageProcessor, twoStageSyncedInDataProcessor) => {
            this.sharingMessageDao = sharingMessageDao;
            this.syncInChecker = syncInChecker;
            this.syncLogMessageProcessor = syncLogMessageProcessor;
            this.twoStageSyncedInDataProcessor = twoStageSyncedInDataProcessor;
        }, moving_walkway_1.SHARING_MESSAGE_DAO, diTokens_1.SYNC_IN_CHECKER, diTokens_1.SYNC_LOG_MESSAGE_PROCESSOR, diTokens_1.TWO_STAGE_SYNCED_IN_DATA_PROCESSOR);
    }
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
    async receiveMessages(sharingNodes, incomingMessages, sharingNodeTerminalMap) {
        const syncTimestamp = new Date();
        const allSyncLogMessages = [];
        const allDataMessages = [];
        const messagesToContent = [];
        const sharingMessages = [];
        // Split up messages by type
        for (let i = 0; i < incomingMessages.length; i++) {
            const sharingNode = sharingNodes[i];
            const sharingNodeTerminal = sharingNodeTerminalMap.get(sharingNode.id);
            const batchedMessagesToTM = incomingMessages[i];
            const isMessageForThisTerminal = batchedMessagesToTM.targetAgtTerminalIds.some(agtTerminalId => agtTerminalId === sharingNodeTerminal.agtTerminalId);
            if (!isMessageForThisTerminal) {
                // TODO: handle messages for other terminals (?forward them?)
                continue;
            }
            const sharingMessage = {
                origin: moving_walkway_1.DataOrigin.REMOTE,
                agtSharingMessageId: batchedMessagesToTM.agtSharingMessageId,
                sharingNode,
                syncTimestamp
            };
            sharingMessages.push(sharingMessage);
            const messageWithContent = {
                sharingMessage,
                dataMessages: [],
                syncLogMessages: []
            };
            messagesToContent.push(messageWithContent);
            for (const incomingMessage of batchedMessagesToTM.messages) {
                switch (incomingMessage.contentType) {
                    // Terminal sync log messages are responses from AGT on which messages coming
                    // form this TM have been synced (or not)
                    case arrivals_n_departures_1.MessageToTMContentType.SYNC_NOTIFICATION: {
                        const syncNotificationMessage = incomingMessage;
                        const syncLogMessageToClient = {
                            // agtTerminalSyncLogId: syncNotificationMessage.agtTerminalSyncLogId,
                            outcomes: syncNotificationMessage.syncOutcomes,
                            sharingNode: sharingNode,
                            // syncDatetime: syncTimestamp, //
                            // syncNotificationMessage.agtSyncRecordAddDatetime,
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
                    case arrivals_n_departures_1.MessageToTMContentType.REPOSITORY_TRANSACTION_BLOCK: {
                        const repoTransBlockMessage = incomingMessage;
                        const serializedData = repoTransBlockMessage.repositoryTransactionBlock;
                        const data = lib_1.parse(serializedData);
                        const lastChangeTimeMillis = this.getLastChangeMillisFromRepoTransBlock(data);
                        if (!this.isValidLastChangeTime(syncTimestamp, lastChangeTimeMillis)) {
                            break;
                        }
                        const dataMessage = {
                            // sourceAgtTerminalId: repoTransBlockMessage.sourceAgtTerminalId,
                            // agtRepositoryId: repoTransBlockMessage.agtRepositoryId,
                            // agtSyncRecordId: repoTransBlockMessage.agtSyncRecordId,
                            data,
                            serializedData,
                            sharingMessage,
                        };
                        messageWithContent.dataMessages.push(dataMessage);
                        allDataMessages.push(dataMessage);
                        break;
                    }
                    case arrivals_n_departures_1.MessageToTMContentType.ALIVE_ACK:
                        throw new Error('Not Implemented');
                    default:
                        log.error(`Unsupported ClientInMessage type: {1}`, incomingMessage.contentType);
                        break;
                }
            }
        }
        await this.sharingMessageDao.bulkCreate(sharingMessages, false, false);
        // These messages are responses to already sent messages
        // no need to check for existence of repositories
        await this.syncLogMessageProcessor.recordSyncLogMessages(allSyncLogMessages);
        await this.twoStageSyncedInDataProcessor.syncDataMessages(allDataMessages);
    }
    isValidLastChangeTime(syncTimestamp, lastChangeTimeMillis) {
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
			`, receptionTimeMillis, lastChangeTimeMillis);
            // 		break;
            // 	}
            // 	case MessageToTMContentType.ALIVE_ACK: {
            // 		// FIXME: implement
            // 		throw new Error('Not implemented');
            // 	}
            // 	default:
            // 		log.throw(`Unsupported MessageToTMContentType: {1}`,
            // (<any>messageToTM).contentType); }
            return false;
        }
        return true;
    }
    getLastChangeMillisFromRepoTransBlock(data) {
        let lastChangeTimeMillis;
        for (const repoTransHistory of data.repoTransHistories) {
            const saveTimestampMillis = repoTransHistory.saveTimestamp;
            // Deserialize save timestamp
            repoTransHistory.saveTimestamp = new Date(repoTransHistory.saveTimestamp);
            if (!lastChangeTimeMillis) {
                lastChangeTimeMillis = saveTimestampMillis;
            }
            else if (lastChangeTimeMillis < saveTimestampMillis) {
                lastChangeTimeMillis = saveTimestampMillis;
            }
        }
        return lastChangeTimeMillis;
    }
}
__decorate([
    tower_1.Transactional()
], SynchronizationInManager.prototype, "receiveMessages", null);
exports.SynchronizationInManager = SynchronizationInManager;
di_1.DI.set(diTokens_1.SYNC_IN_MANAGER, SynchronizationInManager);
//# sourceMappingURL=SynchronizationInManager.js.map