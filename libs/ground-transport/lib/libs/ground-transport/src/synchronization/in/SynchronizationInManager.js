"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const moving_walkway_1 = require("@airport/moving-walkway");
const tower_1 = require("@airport/tower");
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const lib_1 = require("zipson/lib");
const InjectionTokens_1 = require("../../InjectionTokens");
const log = InjectionTokens_1.TerminalLogger.add('SynchronizationInManager');
/**
 * Synchronization in Manager implementation.
 */
let SynchronizationInManager = class SynchronizationInManager {
    constructor(sharingMessageDao, syncInChecker, syncLogMessageProcessor, twoStageSyncedInDataProcessor) {
        this.sharingMessageDao = sharingMessageDao;
        this.syncInChecker = syncInChecker;
        this.syncLogMessageProcessor = syncLogMessageProcessor;
        this.twoStageSyncedInDataProcessor = twoStageSyncedInDataProcessor;
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
                    // Terminal sync log messages are responses from AGT on which messages coming form this
                    // TM have been synced (or not)
                    case arrivals_n_departures_1.MessageToTMContentType.SYNC_NOTIFICATION: {
                        const syncNotificationMessage = incomingMessage;
                        const syncLogMessageToClient = {
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
                            sharingNode,
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
        const { consistentMessages, sharingNodeRepositoryMap } = await this.syncInChecker.repositoryChecker.ensureRepositories(allDataMessages);
        await this.twoStageSyncedInDataProcessor.syncDataMessages(consistentMessages, sharingNodeRepositoryMap);
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
            // 		log.throw(`Unsupported MessageToTMContentType: {1}`, (<any>messageToTM).contentType);
            // }
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
};
__decorate([
    tower_1.Transactional(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Array, Map]),
    __metadata("design:returntype", Promise)
], SynchronizationInManager.prototype, "receiveMessages", null);
SynchronizationInManager = __decorate([
    Service_1.Service(InjectionTokens_1.SynchronizationInManagerToken),
    __param(0, Inject_1.Inject(moving_walkway_1.SharingMessageDaoToken)),
    __param(1, Inject_1.Inject(InjectionTokens_1.SyncInCheckerToken)),
    __param(2, Inject_1.Inject(InjectionTokens_1.SyncLogMessageProcessorToken)),
    __param(3, Inject_1.Inject(InjectionTokens_1.TwoStageSyncedInDataProcessorToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SynchronizationInManager);
exports.SynchronizationInManager = SynchronizationInManager;
//# sourceMappingURL=SynchronizationInManager.js.map