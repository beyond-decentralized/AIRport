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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var InjectionTokens_1 = require("../../../../apps/terminal/src/InjectionTokens");
var moving_walkway_1 = require("@airport/moving-walkway");
var holding_pattern_1 = require("@airport/holding-pattern");
var air_control_1 = require("@airport/air-control");
var traffic_pattern_1 = require("@airport/traffic-pattern");
var DataOrigin_1 = require("@airport/moving-walkway/lib/ddl/values/DataOrigin");
var RepositoryTransactionBlockCreator = /** @class */ (function () {
    function RepositoryTransactionBlockCreator(actorDao, repositoryDao, repositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao, schemaDao, sharingNodeRepositoryDao, utils) {
        this.actorDao = actorDao;
        this.repositoryDao = repositoryDao;
        this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
        this.repositoryTransactionHistoryUpdateStageDao = repositoryTransactionHistoryUpdateStageDao;
        this.schemaDao = schemaDao;
        this.sharingNodeRepositoryDao = sharingNodeRepositoryDao;
        this.utils = utils;
    }
    // Get new repository transaction histories not yet in RepoTransBlocks
    RepositoryTransactionBlockCreator.prototype.createNewBlocks = function (sharingNodeIds, database) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sharingNodeIdMapByRepositoryId, repoTransHistoriesToSync, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId, schemaVersionIds, schemaVersionIdSetsByRepository, repositoryTransactionHistoryIds, repositoryTransactionBlocks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.sharingNodeRepositoryDao
                            .findNewRepoTransHistoriesForSharingNodes(sharingNodeIds)];
                    case 1:
                        _a = _b.sent(), sharingNodeIdMapByRepositoryId = _a[0], repoTransHistoriesToSync = _a[1];
                        repositoryIdSet = new Set();
                        actorIdSet = new Set();
                        repositoryIdsByActorId = new Map();
                        repoTransHistoryMapByRepositoryId = new Map();
                        schemaVersionIds = new Set();
                        schemaVersionIdSetsByRepository = new Map();
                        repositoryTransactionHistoryIds = new Set();
                        this.gatherIdsForBlockCreation(repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet, repoTransHistoryMapByRepositoryId, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId);
                        return [4 /*yield*/, this.createNewBlocksAndSetRepoTransHistoryBlockIds(schemaVersionIds, schemaVersionIdSetsByRepository, database, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId)];
                    case 2:
                        repositoryTransactionBlocks = _b.sent();
                        return [2 /*return*/, this.groupRepoTransBlocksBySharingNode(repositoryTransactionBlocks, sharingNodeIdMapByRepositoryId)];
                }
            });
        });
    };
    /*    Every history record is recorded as corresponding schema version.
     * Where does schema get used?
     *    OperationHistory - records which schema and version was used for a particular
     *        operation
     *    RepositorySchema - records which schemas are used in a repository
     * Are previous versions of schemas needed?
     *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, schema
     *    upgrades generate their own (not-syncable) transaction history
     *
     * So, we need all of the versions used by transaction history records. */
    RepositoryTransactionBlockCreator.prototype.gatherIdsForBlockCreation = function (repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet, repoTransHistoryMapByRepositoryId, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId) {
        var _this = this;
        repoTransHistoriesToSync.forEach(function (repoTransHistory) {
            // serialize saveTimestamp
            repoTransHistory.saveTimestamp = repoTransHistory.saveTimestamp.getTime();
            repositoryTransactionHistoryIds.add(repoTransHistory.id);
            var repositoryId = repoTransHistory.repository.id;
            repositoryIdSet.add(repoTransHistory.repository.id);
            var repoTransHistoriesForRepositoryId = _this.utils.ensureChildArray(repoTransHistoryMapByRepositoryId, repositoryId);
            repoTransHistoriesForRepositoryId.push(repoTransHistory);
            _this.gatherHistoryIds(repoTransHistory, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId);
        });
    };
    RepositoryTransactionBlockCreator.prototype.gatherHistoryIds = function (repoTransHistory, schemaVersionIds, schemaVersionIdSetsByRepository, actorIdSet, repositoryIdsByActorId) {
        var _this = this;
        var repoTransHistoryActorId = repoTransHistory.actor.id;
        actorIdSet.add(repoTransHistoryActorId);
        var repositoryId = repoTransHistory.repository.id;
        var repositoryIdsForActorId = this.utils.ensureChildJsSet(repositoryIdsByActorId, repoTransHistoryActorId);
        repositoryIdsForActorId.add(repositoryId);
        var schemaVersionIdSetForRepo = this.utils.ensureChildJsSet(schemaVersionIdSetsByRepository, repositoryId);
        repoTransHistory.operationHistory.forEach(function (operationHistory) {
            var schemaVersionId = operationHistory.schemaVersion.id;
            schemaVersionIds.add(schemaVersionId);
            schemaVersionIdSetForRepo.add(schemaVersionId);
            operationHistory.recordHistory.forEach(function (recordHistory) {
                var recordHistoryActorId = recordHistory.actor.id;
                actorIdSet.add(recordHistoryActorId);
                repositoryIdsForActorId
                    = _this.utils.ensureChildJsSet(repositoryIdsByActorId, recordHistoryActorId);
                repositoryIdsForActorId.add(repositoryId);
                // actorIdsForRepositoryId.add(recordHistoryActorId);
            });
        });
    };
    /*    Every history record is recorded as corresponding schema version.
     * Where does schema get used?
     *    OperationHistory - records which schema and version was used for a particular
     *        operation
     *    RepositorySchema - records which schemas are used in a repository
     * Are previous versions of schemas needed?
     *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, schema
     *    upgrades generate their own (not-syncable) transaction history
     *
     * So, we need all of the versions used by transaction history records. */
    RepositoryTransactionBlockCreator.prototype.createNewBlocksAndSetRepoTransHistoryBlockIds = function (schemaVersionIds, schemaVersionIdSetsByRepository, database, repositoryIdSet, actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var schemasByRepositoryIdMap, repoTransBlockDataByRepoId, repositoryMapById, repositoryTransactionBlocks, repoTransBlocksByRepositoryId, repoTransHistoryUpdateStageValuesByBlock, repoTransHistoryUpdateStageValues, _i, repoTransHistoryMapByRepositoryId_1, _a, repositoryId, repositoryTransactionHistories;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.findSchemasByRepositoryMap(schemaVersionIds, schemaVersionIdSetsByRepository)];
                    case 1:
                        schemasByRepositoryIdMap = _b.sent();
                        repoTransBlockDataByRepoId = new Map();
                        return [4 /*yield*/, this.repositoryDao.findReposWithGlobalIds(Array.from(repositoryIdSet))];
                    case 2:
                        repositoryMapById = _b.sent();
                        repositoryTransactionBlocks = [];
                        repoTransBlocksByRepositoryId = new Map();
                        repoTransHistoryUpdateStageValuesByBlock = new Map();
                        repoTransHistoryUpdateStageValues = [];
                        for (_i = 0, repoTransHistoryMapByRepositoryId_1 = repoTransHistoryMapByRepositoryId; _i < repoTransHistoryMapByRepositoryId_1.length; _i++) {
                            _a = repoTransHistoryMapByRepositoryId_1[_i], repositoryId = _a[0], repositoryTransactionHistories = _a[1];
                            this.createRepositoryTransactionBlockAndStageData(repositoryMapById, actorIdSet, repositoryId, repositoryIdsByActorId, repositoryTransactionHistories, schemasByRepositoryIdMap, repoTransBlockDataByRepoId, database, repositoryTransactionBlocks, repoTransBlocksByRepositoryId, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock);
                        }
                        return [4 /*yield*/, this.finishPopulatingRepositoryTransactionBlockData(actorIdSet, repositoryIdsByActorId, repoTransBlockDataByRepoId, repoTransBlocksByRepositoryId, repositoryTransactionBlocks)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.setRepositoryTransactionBlockBlockIds(repoTransHistoryUpdateStageValuesByBlock, repoTransHistoryUpdateStageValues)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, repositoryTransactionBlocks];
                }
            });
        });
    };
    RepositoryTransactionBlockCreator.prototype.findSchemasByRepositoryMap = function (schemaVersionIds, schemaVersionIdSetsByRepository) {
        return __awaiter(this, void 0, void 0, function () {
            var schemasByRepositoryIdMap, schemaMapByVersionId, _i, schemaVersionIdSetsByRepository_1, _a, repositoryId, schemaVersionIdSetForRepo, schemasForRepository, _b, schemaVersionIdSetForRepo_1, schemaVersionId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        schemasByRepositoryIdMap = new Map();
                        return [4 /*yield*/, this.schemaDao
                                .findMapByVersionIds(Array.from(schemaVersionIds))];
                    case 1:
                        schemaMapByVersionId = _c.sent();
                        for (_i = 0, schemaVersionIdSetsByRepository_1 = schemaVersionIdSetsByRepository; _i < schemaVersionIdSetsByRepository_1.length; _i++) {
                            _a = schemaVersionIdSetsByRepository_1[_i], repositoryId = _a[0], schemaVersionIdSetForRepo = _a[1];
                            schemasForRepository = this.utils.ensureChildArray(schemasByRepositoryIdMap, repositoryId);
                            for (_b = 0, schemaVersionIdSetForRepo_1 = schemaVersionIdSetForRepo; _b < schemaVersionIdSetForRepo_1.length; _b++) {
                                schemaVersionId = schemaVersionIdSetForRepo_1[_b];
                                schemasForRepository.push(schemaMapByVersionId.get(schemaVersionId));
                            }
                        }
                        return [2 /*return*/, schemasByRepositoryIdMap];
                }
            });
        });
    };
    RepositoryTransactionBlockCreator.prototype.createRepositoryTransactionBlockAndStageData = function (repositoryMapById, actorIdSet, repositoryId, repositoryIdsByActorId, repositoryTransactionHistories, schemasByRepositoryIdMap, repoTransBlockDataByRepoId, database, repositoryTransactionBlocks, repoTransBlocksByRepositoryId, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock) {
        var repository = repositoryMapById.get(repositoryId);
        var repositoryOwnerActorId = repository.ownerActor.id;
        actorIdSet.add(repositoryOwnerActorId);
        var repositoryIdsForActorId = this.utils.ensureChildJsSet(repositoryIdsByActorId, repositoryOwnerActorId);
        repositoryIdsForActorId.add(repositoryId);
        var repoTransBlockData = {
            database: {
                id: database.id,
                name: database.name,
                secondId: database.secondId,
                owner: {
                    uniqueId: database.owner.uniqueId
                }
            },
            actors: [],
            repository: repositoryMapById.get(repositoryId),
            repoTransHistories: repositoryTransactionHistories,
            schemas: schemasByRepositoryIdMap.get(repositoryId),
        };
        repoTransBlockDataByRepoId.set(repositoryId, repoTransBlockData);
        var repositoryTransactionBlock = {
            source: database,
            repository: repository,
            origin: DataOrigin_1.DataOrigin.LOCAL
        };
        repositoryTransactionBlocks.push(repositoryTransactionBlock);
        repoTransBlocksByRepositoryId.set(repositoryId, repositoryTransactionBlock);
        this.createRepoTransHistoryUpdateStageValuesForBlock(repositoryTransactionHistories, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock, repositoryTransactionBlock);
        return repositoryTransactionBlock;
    };
    RepositoryTransactionBlockCreator.prototype.createRepoTransHistoryUpdateStageValuesForBlock = function (repositoryTransactionHistories, repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock, repositoryTransactionBlock) {
        var repoTransHistoryUpdateStageValuesForBlock = [];
        for (var _i = 0, repositoryTransactionHistories_1 = repositoryTransactionHistories; _i < repositoryTransactionHistories_1.length; _i++) {
            var repositoryTransactionHistory = repositoryTransactionHistories_1[_i];
            var repoTransHistoryUpdateStageRecordValues = [
                repositoryTransactionHistory.id,
                null
            ];
            repoTransHistoryUpdateStageValuesForBlock.push(repoTransHistoryUpdateStageRecordValues);
            repoTransHistoryUpdateStageValues.push(repoTransHistoryUpdateStageRecordValues);
        }
        repoTransHistoryUpdateStageValuesByBlock.set(repositoryTransactionBlock, repoTransHistoryUpdateStageValuesForBlock);
    };
    RepositoryTransactionBlockCreator.prototype.finishPopulatingRepositoryTransactionBlockData = function (actorIdSet, repositoryIdsByActorId, repoTransBlockDataByRepoId, repoTransBlocksByRepositoryId, repositoryTransactionBlocks) {
        return __awaiter(this, void 0, void 0, function () {
            var actors, _i, actors_1, actor, repositoryIdsForActorId, _a, repositoryIdsForActorId_1, repositoryId, repoTransBlockData, _b, repoTransBlocksByRepositoryId_1, _c, repositoryId, repositoryTransactionBlock, repoTransBlockData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.actorDao.findWithDetailsAndGlobalIdsByIds(Array.from(actorIdSet))];
                    case 1:
                        actors = _d.sent();
                        for (_i = 0, actors_1 = actors; _i < actors_1.length; _i++) {
                            actor = actors_1[_i];
                            repositoryIdsForActorId = repositoryIdsByActorId.get(actor.id);
                            for (_a = 0, repositoryIdsForActorId_1 = repositoryIdsForActorId; _a < repositoryIdsForActorId_1.length; _a++) {
                                repositoryId = repositoryIdsForActorId_1[_a];
                                repoTransBlockData = repoTransBlockDataByRepoId.get(repositoryId);
                                repoTransBlockData.actors.push(actor);
                            }
                        }
                        for (_b = 0, repoTransBlocksByRepositoryId_1 = repoTransBlocksByRepositoryId; _b < repoTransBlocksByRepositoryId_1.length; _b++) {
                            _c = repoTransBlocksByRepositoryId_1[_b], repositoryId = _c[0], repositoryTransactionBlock = _c[1];
                            repoTransBlockData = repoTransBlockDataByRepoId.get(repositoryId);
                            repositoryTransactionBlock.contents = JSON.stringify(repoTransBlockData);
                        }
                        return [4 /*yield*/, this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false)];
                    case 2:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RepositoryTransactionBlockCreator.prototype.setRepositoryTransactionBlockBlockIds = function (repoTransHistoryUpdateStageValuesByBlock, repoTransHistoryUpdateStageValues) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, _i, repoTransHistoryUpdateStageValuesByBlock_1, _a, repositoryTransactionBlock, repoTransHistoryUpdateStageValuesForBlock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (repositoryTransactionBlock, repoTransHistoryUpdateStageValuesForBlock) {
                            repoTransHistoryUpdateStageValuesForBlock.forEach(function (repoTransHistoryUpdateStageValuesRecord) {
                                return repoTransHistoryUpdateStageValuesRecord[1] = repositoryTransactionBlock.id;
                            });
                        };
                        for (_i = 0, repoTransHistoryUpdateStageValuesByBlock_1 = repoTransHistoryUpdateStageValuesByBlock; _i < repoTransHistoryUpdateStageValuesByBlock_1.length; _i++) {
                            _a = repoTransHistoryUpdateStageValuesByBlock_1[_i], repositoryTransactionBlock = _a[0], repoTransHistoryUpdateStageValuesForBlock = _a[1];
                            _loop_1(repositoryTransactionBlock, repoTransHistoryUpdateStageValuesForBlock);
                        }
                        return [4 /*yield*/, this.repositoryTransactionHistoryUpdateStageDao
                                .insertValues(repoTransHistoryUpdateStageValues)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.repositoryTransactionHistoryUpdateStageDao.updateRepositoryTransactionHistory()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.repositoryTransactionHistoryUpdateStageDao.delete()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RepositoryTransactionBlockCreator.prototype.groupRepoTransBlocksBySharingNode = function (repositoryTransactionBlocks, sharingNodeIdMapByRepositoryId) {
        var reposTransHistoryBlockMapBySharingNodeId = new Map();
        for (var _i = 0, repositoryTransactionBlocks_1 = repositoryTransactionBlocks; _i < repositoryTransactionBlocks_1.length; _i++) {
            var repositoryTransactionBlock = repositoryTransactionBlocks_1[_i];
            var repositoryId = repositoryTransactionBlock.repository.id;
            var sharingNodeIdSet = sharingNodeIdMapByRepositoryId.get(repositoryId);
            for (var _a = 0, sharingNodeIdSet_1 = sharingNodeIdSet; _a < sharingNodeIdSet_1.length; _a++) {
                var sharingNodeId = sharingNodeIdSet_1[_a];
                this.utils.ensureChildArray(reposTransHistoryBlockMapBySharingNodeId, sharingNodeId)
                    .push(repositoryTransactionBlock);
            }
        }
        return reposTransHistoryBlockMapBySharingNodeId;
    };
    var _a, _b, _c;
    RepositoryTransactionBlockCreator = __decorate([
        typedi_1.Service(InjectionTokens_1.RepositoryTransactionBlockCreatorToken),
        __param(0, typedi_1.Inject(holding_pattern_1.ActorDaoToken)),
        __param(1, typedi_1.Inject(holding_pattern_1.RepositoryDao)),
        __param(2, typedi_1.Inject(moving_walkway_1.RepositoryTransactionBlockDaoToken)),
        __param(3, typedi_1.Inject(moving_walkway_1.RepositoryTransactionHistoryUpdateStageDaoToken)),
        __param(4, typedi_1.Inject(traffic_pattern_1.SchemaDaoToken)),
        __param(5, typedi_1.Inject(moving_walkway_1.SharingNodeRepositoryDaoToken)),
        __param(6, typedi_1.Inject(air_control_1.UtilsToken)),
        __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof moving_walkway_1.IRepositoryTransactionBlockDao !== "undefined" && moving_walkway_1.IRepositoryTransactionBlockDao) === "function" && _a || Object, typeof (_b = typeof moving_walkway_1.IRepositoryTransactionHistoryUpdateStageDao !== "undefined" && moving_walkway_1.IRepositoryTransactionHistoryUpdateStageDao) === "function" && _b || Object, Object, typeof (_c = typeof moving_walkway_1.ISharingNodeRepositoryDao !== "undefined" && moving_walkway_1.ISharingNodeRepositoryDao) === "function" && _c || Object, Object])
    ], RepositoryTransactionBlockCreator);
    return RepositoryTransactionBlockCreator;
}());
exports.RepositoryTransactionBlockCreator = RepositoryTransactionBlockCreator;
//# sourceMappingURL=RepositoryTransactionBlockCreator.js.map