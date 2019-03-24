"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const di_1 = require("@airport/di");
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const tower_1 = require("@airport/tower");
const lib_1 = require("zipson/lib");
const diTokens_1 = require("../../diTokens");
class SyncOutSerializer {
    constructor() {
        di_1.DI.get((repoTransBlockDao, repoTransBlockRepoTransHistoryDao, sharingMessageDao, sharingMessageRepoTransBlockDao, utils) => {
            this.repoTransBlockDao = repoTransBlockDao;
            this.repoTransBlockRepoTransHistoryDao = repoTransBlockRepoTransHistoryDao;
            this.sharingMessageDao = sharingMessageDao;
            this.sharingMessageRepoTransBlockDao = sharingMessageRepoTransBlockDao;
        }, moving_walkway_1.REPO_TRANS_BLOCK_DAO, holding_pattern_1.REPO_TRANS_HISTORY_DAO, null, moving_walkway_1.SHARING_MESSAGE_DAO, moving_walkway_1.SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, air_control_1.UTILS);
    }
    async serializeMessages(sharingNodeDbMap, sharingNodeMap, repoMapBySharingNodeAndRepoIds, repoTransBlockDataByRepoId, repoTransHistoryIds, terminal) {
        const messageMap = new Map();
        const lastSyncAttemptTimestamp = new Date();
        const repositoryTransactionBlocks = [];
        const repoTransBlocksByRepositoryId = new Map();
        let allTransLogRepoTransHistories = [];
        for (const [repositoryId, messageData] of repoTransBlockDataByRepoId) {
            const repositoryTransactionBlockContents = lib_1.stringify(messageData);
            const repoTransBlockRepoTransHistories = [];
            const repositoryTransactionBlock = {
                lastSyncAttemptTimestamp,
                repository: {
                    id: repositoryId
                },
                source: {
                    name: terminal.name,
                    secondId: terminal.secondId,
                    owner: {
                        uniqueId: terminal.owner.uniqueId
                    }
                },
                contents: repositoryTransactionBlockContents,
                repoTransBlockRepoTransHistories,
            };
            this.utils.ensureChildArray(repoTransBlocksByRepositoryId, repositoryId)
                .push(repositoryTransactionBlock);
            for (const repositoryTransactionHistory of messageData.repoTransHistories) {
                repoTransBlockRepoTransHistories.push({
                    repositoryTransactionHistory,
                    repositoryTransactionBlock
                });
            }
            allTransLogRepoTransHistories
                = allTransLogRepoTransHistories.concat(repoTransBlockRepoTransHistories);
            repositoryTransactionBlocks.push(repositoryTransactionBlock);
        }
        await this.repoTransBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
        await this.repoTransBlockRepoTransHistoryDao
            .bulkCreate(allTransLogRepoTransHistories, false, false);
        const sharingMessages = [];
        const sharingMessageRepoTransBlocks = [];
        for (const [sharingNodeId, repositoryMapById] of repoMapBySharingNodeAndRepoIds) {
            const repositoryUpdateRequests = [];
            const sharingNodeDb = sharingNodeDbMap.get(sharingNodeId);
            const terminalCredentials = {
                terminalId: sharingNodeDb.agtTerminalId,
                terminalPassword: sharingNodeDb.agtTerminalPassword
            };
            // FIXME: add sync ACKS
            const message = {
                protocolVersion: 0,
                contentType: arrivals_n_departures_1.MessageFromTMContentType.DATA_TRANSFER,
                terminalCredentials,
                tmSharingMessageId: null,
                repositoryUpdateRequests,
                terminalSyncAcks: []
            };
            messageMap.set(sharingNodeId, message);
            const sharingMessage = {
                sharingNode: sharingNodeMap.get(sharingNodeId)
            };
            sharingMessages.push(sharingMessage);
            for (const [repositoryId, repositoryAndAgtRepositoryId] of repositoryMapById) {
                const repositoryTransactionBlock = repoTransBlocksByRepositoryId.get(repositoryId);
                repositoryUpdateRequests.push({
                    agtRepositoryId: repositoryAndAgtRepositoryId[1],
                    tmRepositoryTransactionBlockId: repositoryTransactionBlock.id,
                    repositoryTransactionBlockContents: repositoryTransactionBlock.contents
                });
                const sharingMessageRepoTransBlock = {
                    sharingMessage,
                    repositoryTransactionBlock,
                };
                sharingMessageRepoTransBlocks.push(sharingMessageRepoTransBlock);
            }
        }
        await this.sharingMessageDao.bulkCreate(sharingMessages, false, false);
        for (const sharingMessage of sharingMessages) {
            messageMap.get(sharingMessage.sharingNode.id)[2] = sharingMessage.id;
        }
        await this.sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
        // await this.repositoryTransactionHistoryDao.updateSyncStatusHistory(
        // 	SyncStatus.SYNCHRONIZING, Array.from(repoTransHistoryIds)
        // );
        return messageMap;
    }
}
__decorate([
    tower_1.Transactional()
], SyncOutSerializer.prototype, "serializeMessages", null);
exports.SyncOutSerializer = SyncOutSerializer;
di_1.DI.set(diTokens_1.SYNC_OUT_SERIALIZER, SyncOutSerializer);
//# sourceMappingURL=SyncOutSerializer.js.map