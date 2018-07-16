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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../../apps/terminal/src/InjectionTokens");
const holding_pattern_1 = require("@airport/holding-pattern");
const tower_1 = require("@airport/tower");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
let SyncOutSerializer = class SyncOutSerializer {
    serializeMessages(sharingNodeDbMap, sharingNodeMap, repoMapBySharingNodeAndRepoIds, repoTransBlockDataByRepoId, repoTransHistoryIds, database) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageMap = new Map();
            const lastSyncAttemptTimestamp = new Date();
            const repositoryTransactionBlocks = [];
            const repoTransBlocksByRepositoryId = new Map();
            let allTransLogRepoTransHistories = [];
            for (const [repositoryId, messageData] of repoTransBlockDataByRepoId) {
                const repositoryTransactionBlockContents = stringify(messageData);
                const repoTransBlockRepoTransHistories = [];
                const repositoryTransactionBlock = {
                    lastSyncAttemptTimestamp,
                    repository: {
                        id: repositoryId
                    },
                    source: {
                        name: database.name,
                        secondId: database.secondId,
                        owner: {
                            uniqueId: database.owner.uniqueId
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
            yield this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
            yield this.repoTransBlockRepoTransHistoryDao
                .bulkCreate(allTransLogRepoTransHistories, false, false);
            const sharingMessages = [];
            const sharingMessageRepoTransBlocks = [];
            for (const [sharingNodeId, repositoryMapById] of repoMapBySharingNodeAndRepoIds) {
                const repositoryUpdateRequests = [];
                const sharingNodeDb = sharingNodeDbMap.get(sharingNodeId);
                const databaseInfo = [sharingNodeDb.agtDatabaseId, sharingNodeDb.agtDatabaseHash];
                // FIXME: add sync ACKS
                const message = [
                    ground_control_1.MessageFromClientOperation.ADD_DATA, databaseInfo, null, repositoryUpdateRequests, null
                ];
                messageMap.set(sharingNodeId, message);
                const sharingMessage = {
                    syncStatus: terminal_map_1.SyncStatus.SYNC_PENDING,
                    transmissionRetryCount: 0,
                    sharingNode: sharingNodeMap.get(sharingNodeId)
                };
                sharingMessages.push(sharingMessage);
                for (const [repositoryId, repositoryAndAgtRepositoryId] of repositoryMapById) {
                    const repositoryTransactionBlock = repoTransBlocksByRepositoryId.get(repositoryId);
                    repositoryUpdateRequests.push([repositoryAndAgtRepositoryId[1],
                        repositoryTransactionBlock.id, repositoryTransactionBlock.repositoryTransactionBlockContents]);
                    const sharingMessageRepoTransBlock = {
                        sharingMessage,
                        repositoryTransactionBlock,
                    };
                    sharingMessageRepoTransBlocks.push(sharingMessageRepoTransBlock);
                }
            }
            yield this.sharingMessageDao.bulkCreate(sharingMessages, false, false);
            for (const sharingMessage of sharingMessages) {
                messageMap.get(sharingMessage.sharingNode.id)[2] = sharingMessage.id;
            }
            yield this.sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
            // await this.repositoryTransactionHistoryDao.updateSyncStatusHistory(
            // 	SyncStatus.SYNCHRONIZING, Array.from(repoTransHistoryIds)
            // );
            return messageMap;
        });
    }
};
__decorate([
    tower_1.Transactional(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Map,
        Map,
        Map,
        Map,
        Set, typeof (_a = typeof holding_pattern_1.IDatabase !== "undefined" && holding_pattern_1.IDatabase) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], SyncOutSerializer.prototype, "serializeMessages", null);
SyncOutSerializer = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncOutSerializerToken)
], SyncOutSerializer);
exports.SyncOutSerializer = SyncOutSerializer;
//# sourceMappingURL=SyncOutSerializer.js.map