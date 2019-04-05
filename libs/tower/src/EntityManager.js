"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var air_control_1 = require("@airport/air-control");
var di_1 = require("@airport/di");
var ground_control_1 = require("@airport/ground-control");
var terminal_map_1 = require("@airport/terminal-map");
var diTokens_1 = require("./diTokens");
var OperationManager_1 = require("./OperationManager");
var transactional_1 = require("./transactional");
/**
 * Created by Papa on 5/23/2016.
 */
var EntityManager = /** @class */ (function (_super) {
    __extends(EntityManager, _super);
    function EntityManager() {
        var _this = _super.call(this) || this;
        _this.find = new air_control_1.NonEntityFind(_this, _this.utils);
        _this.findOne = new air_control_1.NonEntityFindOne(_this, _this.utils);
        _this.search = new air_control_1.NonEntitySearch(_this, _this.utils);
        _this.searchOne = new air_control_1.NonEntitySearchOne(_this, _this.utils);
        _this.updateCache.databaseFacade = _this;
        return _this;
    }
    EntityManager.prototype.cacheForUpdate = function (cacheForUpdate, dbEntity) {
        var _a;
        var entities = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            entities[_i - 2] = arguments[_i];
        }
        (_a = this.updateCache).addToCache.apply(_a, [cacheForUpdate, dbEntity].concat(entities));
    };
    EntityManager.prototype.releaseCachedForUpdate = function (cacheForUpdate, dbEntity) {
        var _a;
        var entities = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            entities[_i - 2] = arguments[_i];
        }
        (_a = this.updateCache).dropFromCache.apply(_a, [cacheForUpdate, dbEntity].concat(entities));
    };
    EntityManager.prototype.dropUpdateCache = function () {
        this.updateCache.dropCache();
    };
    EntityManager.prototype.addRepository = function (name, url, platform, platformConfig, distributionStrategy) {
        if (url === void 0) { url = null; }
        if (platform === void 0) { platform = terminal_map_1.PlatformType.GOOGLE_DOCS; }
        if (platformConfig === void 0) { platformConfig = null; }
        if (distributionStrategy === void 0) { distributionStrategy = terminal_map_1.DistributionStrategy.S3_DISTIBUTED_PUSH; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionClient.addRepository(name, url, platform, platformConfig, distributionStrategy)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.create = function (dbEntity, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.performCreate(dbEntity, entity, [])];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.bulkCreate = function (dbEntity, entities, checkIfProcessed, cascade) {
        if (checkIfProcessed === void 0) { checkIfProcessed = true; }
        if (cascade === void 0) { cascade = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.performBulkCreate(dbEntity, entities, [], checkIfProcessed, cascade)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.insertColumnValues = function (dbEntity, rawInsertColumnValues) {
        return __awaiter(this, void 0, void 0, function () {
            var numInsertedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (rawInsertColumnValues instanceof Function) {
                            rawInsertColumnValues = rawInsertColumnValues();
                        }
                        return [4 /*yield*/, this.internalInsertColumnValues(dbEntity, rawInsertColumnValues)];
                    case 1:
                        numInsertedRows = _a.sent();
                        return [2 /*return*/, numInsertedRows];
                }
            });
        });
    };
    EntityManager.prototype.insertValues = function (dbEntity, rawInsertValues) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (rawInsertValues instanceof Function) {
                            rawInsertValues = rawInsertValues();
                        }
                        return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.internalInsertValues(dbEntity, rawInsertValues)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.insertColumnValuesGenerateIds = function (dbEntity, rawInsertColumnValues) {
        return __awaiter(this, void 0, void 0, function () {
            var ids;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (rawInsertColumnValues instanceof Function) {
                            rawInsertColumnValues = rawInsertColumnValues();
                        }
                        return [4 /*yield*/, this.internalInsertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues)];
                    case 1:
                        ids = _a.sent();
                        return [2 /*return*/, ids];
                }
            });
        });
    };
    EntityManager.prototype.insertValuesGenerateIds = function (dbEntity, rawInsertValues) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (rawInsertValues instanceof Function) {
                            rawInsertValues = rawInsertValues();
                        }
                        return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.internalInsertValuesGetIds(dbEntity, rawInsertValues)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.delete = function (dbEntity, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.performDelete(dbEntity, entity)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.deleteWhere = function (dbEntity, rawDelete) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteWhere;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (rawDelete instanceof Function) {
                            rawDelete = rawDelete();
                        }
                        deleteWhere = new air_control_1.Delete(rawDelete, this.utils);
                        return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.internalDeleteWhere(dbEntity, deleteWhere)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.save = function (dbEntity, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var emptyIdCount, nonEmptyIdCount, _i, _a, dbColumn, _b, propertyNameChains, idValue;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!dbEntity.idColumns.length) {
                            throw "@Id is not defined for entity: '" + dbEntity.name + "'.\n\t\t\tCannot call save(entity) on entities with no ids.";
                        }
                        emptyIdCount = 0;
                        nonEmptyIdCount = 0;
                        for (_i = 0, _a = dbEntity.idColumns; _i < _a.length; _i++) {
                            dbColumn = _a[_i];
                            _b = this.utils.Schema.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity), propertyNameChains = _b[0], idValue = _b[1];
                            this.utils.Schema.isIdEmpty(idValue) ? emptyIdCount++ : nonEmptyIdCount++;
                        }
                        return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(emptyIdCount && nonEmptyIdCount)) return [3 /*break*/, 1];
                                            throw "Cannot call save(entity) for instance of '" + dbEntity.name + "' which has\n\t\t\t" + nonEmptyIdCount + " @Id values specified and " + emptyIdCount + " @Id values not specified.\n\t\t\tPlease make sure that the entity instance either has all @Id values specified (to be\n\t\t\tupdated) or non of @Id values specified (to be created).";
                                        case 1:
                                            if (!emptyIdCount) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.create(dbEntity, entity)];
                                        case 2: return [2 /*return*/, _a.sent()];
                                        case 3: return [4 /*yield*/, this.update(dbEntity, entity)];
                                        case 4: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    EntityManager.prototype.update = function (dbEntity, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.performUpdate(dbEntity, entity, [])];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    EntityManager.prototype.updateColumnsWhere = function (dbEntity, rawUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (rawUpdate instanceof Function) {
                            rawUpdate = rawUpdate();
                        }
                        update = new air_control_1.UpdateColumns(rawUpdate, this.utils);
                        return [4 /*yield*/, this.internalUpdateColumnsWhere(dbEntity, update)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.updateWhere = function (dbEntity, rawUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var update;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (rawUpdate instanceof Function) {
                            rawUpdate = rawUpdate();
                        }
                        update = new air_control_1.UpdateProperties(rawUpdate, this.utils);
                        return [4 /*yield*/, transactional_1.transactional(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.internalUpdateWhere(dbEntity, update)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.ensureId = function (entity) {
        throw "Not Implemented";
    };
    EntityManager.prototype.getOriginalRecord = function (dbEntity, idKey) {
        return __awaiter(this, void 0, void 0, function () {
            var originalRecord;
            return __generator(this, function (_a) {
                originalRecord = this.updateCache.getOriginalRecord(dbEntity, idKey);
                if (!originalRecord) {
                    throw "Cannot update '" + dbEntity.name + "' with composite id '" + idKey + "' - not found in update cache.\n\t\t\tDid you forget to add .andCacheForUpdate() to the query you used to retrieve the original?";
                }
                return [2 /*return*/, originalRecord];
            });
        });
    };
    EntityManager.prototype.getOriginalValues = function (entitiesToUpdate, dbEntity) {
        return __awaiter(this, void 0, void 0, function () {
            var qEntity, rawTreeQuery, entityQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
                        rawTreeQuery = {
                            select: {},
                            from: [qEntity],
                            where: this.getIdsWhereClause(entitiesToUpdate, qEntity)
                        };
                        entityQuery = new air_control_1.EntityQuery(rawTreeQuery, this.utils);
                        return [4 /*yield*/, this.entity.find(dbEntity, entityQuery, ground_control_1.QueryResultType.MAPPED_ENTITY_TREE)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EntityManager.prototype.prepare = function (queryFunction) {
        return new FunctionWrapper(queryFunction);
    };
    return EntityManager;
}(OperationManager_1.OperationManager));
exports.EntityManager = EntityManager;
di_1.DI.set(diTokens_1.ENTITY_MANAGER, EntityManager);
var FunctionWrapper = /** @class */ (function () {
    function FunctionWrapper(queryFunction) {
    }
    FunctionWrapper.prototype.find = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    return FunctionWrapper;
}());
exports.FunctionWrapper = FunctionWrapper;
