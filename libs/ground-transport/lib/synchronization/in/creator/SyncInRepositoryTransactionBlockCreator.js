"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../InjectionTokens");
let SyncInRepositoryTransactionBlockCreator = class SyncInRepositoryTransactionBlockCreator {
    recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessages, actorMapById) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoTransHistoryMapByRepositoryId = yield this.getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);
            const repositoryTransactionBlocks = [];
            const sharingMessageRepoTransBlocks = [];
            const repoTransBlockRepoTransHistories = [];
            const transactionHistory = this.transactionManager.currentTransHistory;
            transactionHistory.transactionType = terminal_map_1.TransactionType.REMOTE_SYNC;
            // split messages by repository and record actor information
            for (let i = 0; i < dataMessages.length; i++) {
                const sharingMessage = sharingMessages[i];
                const dataMessage = dataMessages[i];
                const data = dataMessage.data;
                const repositoryTransactionBlock = {
                    repository: data.repository,
                    syncOutcomeType: ground_control_1.RepoTransBlockSyncOutcomeType.SYNC_SUCCESSFUL
                };
                repositoryTransactionBlocks.push(repositoryTransactionBlock);
                sharingMessageRepoTransBlocks.push({
                    sharingMessage,
                    repositoryTransactionBlock
                });
                transactionHistory.repositoryTransactionHistories
                    = transactionHistory.repositoryTransactionHistories.concat(data.repoTransHistories);
                data.repoTransHistories.forEach((repositoryTransactionHistory) => {
                    repositoryTransactionHistory.repositoryTransactionType = holding_pattern_1.RepositoryTransactionType.REMOTE;
                    repoTransBlockRepoTransHistories.push({
                        repositoryTransactionHistory,
                        repositoryTransactionBlock
                    });
                    transactionHistory.allOperationHistory = transactionHistory
                        .allOperationHistory.concat(repositoryTransactionHistory.operationHistory);
                    repositoryTransactionHistory.operationHistory.forEach((operationHistory) => {
                        transactionHistory.allRecordHistory = transactionHistory
                            .allRecordHistory.concat(operationHistory.recordHistory);
                        operationHistory.recordHistory.forEach((recordHistory) => {
                            transactionHistory.allRecordHistoryNewValues = transactionHistory
                                .allRecordHistoryNewValues.concat(recordHistory.newValues);
                            transactionHistory.allRecordHistoryOldValues = transactionHistory
                                .allRecordHistoryOldValues.concat(recordHistory.oldValues);
                        });
                    });
                });
            }
            yield this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
            yield this.sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
            yield this.repoTransBlockRepoTransHistoryDao.bulkCreate(repoTransBlockRepoTransHistories, false, false);
            return repoTransHistoryMapByRepositoryId;
        });
    }
};
SyncInRepositoryTransactionBlockCreator = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInRepositoryTransactionBlockCreatorToken)
], SyncInRepositoryTransactionBlockCreator);
exports.SyncInRepositoryTransactionBlockCreator = SyncInRepositoryTransactionBlockCreator;
//# sourceMappingURL=SyncInRepositoryTransactionBlockCreator.js.map