"use strict";
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
var diTokens_1 = require("./diTokens");
var OperationManager = /** @class */ (function () {
    function OperationManager() {
        var _this = this;
        this.higherOrderOpsYieldLength = 100;
        this.transactionInProgress = false;
        di_1.DI.get(function (airportDatabase, queryFacade, transConnector, updateCache, utils) {
            _this.airDb = airportDatabase;
            _this.entity = queryFacade;
            _this.transactionClient = transConnector;
            _this.updateCache = updateCache;
            _this.utils = utils;
        }, air_control_1.AIR_DB, diTokens_1.QUERY_FACADE, ground_control_1.TRANS_CONNECTOR, diTokens_1.UPDATE_CACHE, air_control_1.UTILS);
    }
    OperationManager.prototype.throwUnexpectedProperty = function (dbProperty, dbColumn, value) {
        throw "Unexpected property value '" + value.toString() + "' in property '" + dbProperty.entity.name + "." + dbProperty.name + "'\n\t\t(column: '" + dbColumn.name + "').";
    };
    OperationManager.prototype.warn = function (message) {
        console.log(message);
    };
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    OperationManager.prototype.performCreate = function (dbEntity, entity, createdEntityMap, idData, cascadeAlways) {
        if (cascadeAlways === void 0) { cascadeAlways = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalCreate(dbEntity, [entity], createdEntityMap, !idData, cascadeAlways)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.cascadeOnPersist(result.cascadeRecords, dbEntity, createdEntityMap, cascadeAlways)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result.numberOfAffectedRecords];
                }
            });
        });
    };
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    OperationManager.prototype.performBulkCreate = function (dbEntity, entities, createdEntityMap, checkIfProcessed, cascadeAlways) {
        if (checkIfProcessed === void 0) { checkIfProcessed = true; }
        if (cascadeAlways === void 0) { cascadeAlways = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalCreate(dbEntity, entities, createdEntityMap, checkIfProcessed, cascadeAlways)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.cascadeOnPersist(result.cascadeRecords, dbEntity, createdEntityMap, cascadeAlways)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result.numberOfAffectedRecords];
                }
            });
        });
    };
    OperationManager.prototype.internalCreate = function (dbEntity, entities, createdEntityMap, checkIfProcessed, cascadeAlways) {
        if (cascadeAlways === void 0) { cascadeAlways = false; }
        return __awaiter(this, void 0, void 0, function () {
            var qEntity, rawInsert, cascadeRecords, _loop_1, this_1, _i, entities_1, entity, state_1, numberOfAffectedRecords, generatedProperty, generatedIds, i, entity;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
                        rawInsert = {
                            insertInto: qEntity,
                            columns: this.utils.Medatada.getAllColumns(qEntity),
                            values: []
                        };
                        cascadeRecords = [];
                        _loop_1 = function (entity) {
                            if (checkIfProcessed && this_1.isProcessed(entity, createdEntityMap, dbEntity)[0] === true) {
                                return { value: void 0 };
                            }
                            var foundValues = [];
                            var valuesFragment = [];
                            var _loop_2 = function (dbProperty) {
                                var newValue = entity[dbProperty.name];
                                if (dbProperty.relation.length) {
                                    var dbRelation = dbProperty.relation[0];
                                    this_1.assertRelationValueIsAnObject(newValue, dbProperty);
                                    switch (dbRelation.relationType) {
                                        case ground_control_1.EntityRelationType.MANY_TO_ONE:
                                            this_1.assertManyToOneNotArray(newValue);
                                            this_1.utils.Schema.forEachColumnOfRelation(dbRelation, entity, function (dbColumn, columnValue, propertyNameChains) {
                                                if (dbProperty.isId) {
                                                    if (_this.utils.Schema.isIdEmpty(columnValue)) {
                                                        throw "non-@GeneratedValue() @Id() " + dbEntity.name + "." + dbProperty.name + " must have a value for 'create' operations.";
                                                    }
                                                }
                                                if (_this.utils.Schema.isRepositoryId(dbColumn.name)) {
                                                    if (_this.utils.Schema.isEmpty(columnValue)) {
                                                        throw "Repository Id must be specified on an insert";
                                                    }
                                                }
                                                _this.columnProcessed(dbProperty, foundValues, dbColumn, columnValue);
                                                valuesFragment[dbColumn.index] = columnValue;
                                            }, false);
                                            return "continue";
                                        case ground_control_1.EntityRelationType.ONE_TO_MANY:
                                            this_1.assertOneToManyIsArray(newValue);
                                            if (!cascadeAlways && !this_1.utils.Schema.doCascade(dbRelation, ground_control_1.CRUDOperation.CREATE)) {
                                                return "continue";
                                            }
                                            cascadeRecords.push({
                                                relation: dbRelation,
                                                manyEntities: newValue,
                                            });
                                            break;
                                    }
                                }
                                else {
                                    var column = dbProperty.propertyColumns[0].column;
                                    this_1.ensureNonRelationalValue(dbProperty, column, newValue);
                                    if (this_1.utils.Schema.isRepositoryId(column.name)
                                        && this_1.utils.Schema.isEmpty(newValue)) {
                                        throw "Repository Id must be specified on an insert";
                                    }
                                    if (column.isGenerated && (newValue !== undefined && newValue !== null)) {
                                        throw "@GeneratedValue() \"" + dbEntity.name + "." + dbProperty.name + "\" cannot have a value for 'create' operations.";
                                    }
                                    if (dbProperty.isId) {
                                        if (!column.isGenerated && this_1.utils.Schema.isIdEmpty(newValue)) {
                                            throw "non-@GeneratedValue() @Id() \"" + dbEntity.name + "." + dbProperty.name + "\" must have a value for 'create' operations.";
                                        }
                                    }
                                    this_1.columnProcessed(dbProperty, foundValues, column, newValue);
                                    valuesFragment[column.index] = newValue;
                                }
                            };
                            for (var _i = 0, _a = dbEntity.properties; _i < _a.length; _i++) {
                                var dbProperty = _a[_i];
                                _loop_2(dbProperty);
                            }
                            rawInsert.values.push(valuesFragment);
                        };
                        this_1 = this;
                        for (_i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
                            entity = entities_1[_i];
                            state_1 = _loop_1(entity);
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                        }
                        numberOfAffectedRecords = 0;
                        if (!rawInsert.values.length) return [3 /*break*/, 4];
                        generatedProperty = this.getGeneratedProperty(dbEntity);
                        if (!generatedProperty) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.internalInsertValuesGetIds(dbEntity, rawInsert)];
                    case 1:
                        generatedIds = _a.sent();
                        for (i = 0; i < entities.length; i++) {
                            entity = entities[i];
                            entity[generatedProperty.name] = generatedIds[i];
                            numberOfAffectedRecords = generatedIds.length;
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.internalInsertValues(dbEntity, rawInsert)];
                    case 3:
                        numberOfAffectedRecords = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            cascadeRecords: cascadeRecords,
                            numberOfAffectedRecords: numberOfAffectedRecords,
                        }];
                }
            });
        });
    };
    OperationManager.prototype.getGeneratedProperty = function (dbEntity) {
        var generatedColumns = dbEntity.idColumns.filter(function (dbColumn) { return dbColumn.isGenerated; });
        switch (generatedColumns.length) {
            case 0:
                return null;
            case 1:
                return generatedColumns[0].propertyColumns[0].property;
            default:
                throw "Multiple @GeneratedValue() columns are not supported,\n\t\t\t\tentity: " + dbEntity.schemaVersion.schema.name + "." + dbEntity.name + "\n\t\t\t\t(schema version: " + dbEntity.schemaVersion.versionString;
        }
    };
    /*
     Values for the same column could be repeated in different places in the object graph.
     For example, if the same column is mapped to two different @ManyToOne relations.
     In this case, when persisting an entity we need to make sure that all values for the
     entity in question are being persisted.
     */
    OperationManager.prototype.columnProcessed = function (dbProperty, foundValues, dbColumn, value) {
        // if (value === undefined) {
        // 	throw `Values cannot be undefined, please use null.`;
        // }
        if (foundValues[dbColumn.index] === undefined) {
            foundValues[dbColumn.index] = value;
            return false;
        }
        if (!this.utils.valuesEqual(foundValues[dbColumn.index], value)) {
            throw "Found value mismatch in '" + dbProperty.entity.name + "." + dbProperty.name + "'\n\t\t\t(column: '" + dbColumn.name + "'): " + foundValues[dbColumn.index] + " !== " + value;
        }
        return true;
    };
    OperationManager.prototype.internalInsertColumnValues = function (dbEntity, rawInsertColumnValues) {
        return __awaiter(this, void 0, void 0, function () {
            var insertColumnValues, portableQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insertColumnValues = new air_control_1.InsertColumnValues(rawInsertColumnValues);
                        portableQuery = this.entity.getPortableQuery(dbEntity, insertColumnValues, null);
                        return [4 /*yield*/, this.transactionClient.insertValues(portableQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OperationManager.prototype.internalInsertValues = function (dbEntity, rawInsertValues) {
        return __awaiter(this, void 0, void 0, function () {
            var insertValues, portableQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insertValues = new air_control_1.InsertValues(rawInsertValues);
                        portableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null);
                        return [4 /*yield*/, this.transactionClient.insertValues(portableQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OperationManager.prototype.internalInsertColumnValuesGenerateIds = function (dbEntity, rawInsertColumnValues) {
        return __awaiter(this, void 0, void 0, function () {
            var insertValues, portableQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insertValues = new air_control_1.InsertColumnValues(rawInsertColumnValues);
                        portableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null);
                        return [4 /*yield*/, this.transactionClient.insertValuesGetIds(portableQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OperationManager.prototype.internalInsertValuesGetIds = function (dbEntity, rawInsertValues) {
        return __awaiter(this, void 0, void 0, function () {
            var insertValues, portableQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insertValues = new air_control_1.InsertValues(rawInsertValues);
                        portableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null);
                        return [4 /*yield*/, this.transactionClient.insertValuesGetIds(portableQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    OperationManager.prototype.performUpdate = function (dbEntity, entity, updatedEntityMap, originalValue, cascadeAlways) {
        if (cascadeAlways === void 0) { cascadeAlways = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, isProcessed, entityIdData, originalValue_1, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!originalValue) return [3 /*break*/, 2];
                        _a = this.isProcessed(entity, updatedEntityMap, dbEntity), isProcessed = _a[0], entityIdData = _a[1];
                        if (isProcessed === true) {
                            return [2 /*return*/, 0];
                        }
                        if (!entityIdData.idKey) {
                            throw "Cannot update " + dbEntity.name + ", not all @Id(s) are set.";
                        }
                        return [4 /*yield*/, this.getOriginalRecord(dbEntity, entityIdData.idKey)];
                    case 1:
                        originalValue_1 = _b.sent();
                        if (!originalValue_1) {
                            throw "Cannot update " + dbEntity.name + ", entity not found.";
                        }
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.internalUpdate(dbEntity, entity, originalValue, cascadeAlways)];
                    case 3:
                        result = _b.sent();
                        return [4 /*yield*/, this.cascadeOnPersist(result.cascadeRecords, dbEntity, updatedEntityMap, cascadeAlways)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, result.numberOfAffectedRecords];
                }
            });
        });
    };
    OperationManager.prototype.cascadeOnPersist = function (cascadeRecords, parentDbEntity, alreadyModifiedEntityMap, cascadeAlways) {
        if (cascadeAlways === void 0) { cascadeAlways = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _i, cascadeRecords_1, cascadeRecord, entitiesWithIds, entitiesWithIdMap, entitiesWithoutIds, dbEntity, _a, _b, manyEntity, _c, isProcessed, entityIdData, record, originalValues, idKey, i, entityToUpdate, i, entityToCreate;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!cascadeRecords.length) {
                            return [2 /*return*/];
                        }
                        _i = 0, cascadeRecords_1 = cascadeRecords;
                        _d.label = 1;
                    case 1:
                        if (!(_i < cascadeRecords_1.length)) return [3 /*break*/, 13];
                        cascadeRecord = cascadeRecords_1[_i];
                        if (!cascadeRecord.relation.oneToManyElems) {
                            return [3 /*break*/, 12];
                        }
                        switch (cascadeRecord.relation.oneToManyElems.cascade) {
                            case ground_control_1.CascadeType.ALL:
                            case ground_control_1.CascadeType.PERSIST:
                                break;
                            // Do not cascade if its for REMOVE only
                            default:
                                return [3 /*break*/, 12];
                        }
                        entitiesWithIds = [];
                        entitiesWithIdMap = {};
                        entitiesWithoutIds = [];
                        dbEntity = cascadeRecord.relation.relationEntity;
                        for (_a = 0, _b = cascadeRecord.manyEntities; _a < _b.length; _a++) {
                            manyEntity = _b[_a];
                            _c = this.isProcessed(manyEntity, alreadyModifiedEntityMap, dbEntity), isProcessed = _c[0], entityIdData = _c[1];
                            if (isProcessed === true) {
                                return [2 /*return*/];
                            }
                            record = {
                                newValue: manyEntity,
                                originalValue: null,
                                idData: entityIdData
                            };
                            if (entityIdData.idKey) {
                                entitiesWithIds.push(record);
                                entitiesWithIdMap[entityIdData.idKey] = record;
                            }
                            else {
                                entitiesWithoutIds.push(record);
                            }
                        }
                        if (!entitiesWithIds.length) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getOriginalValues(entitiesWithIds, dbEntity)];
                    case 2:
                        originalValues = _d.sent();
                        for (idKey in originalValues.dataMap) {
                            entitiesWithIdMap[idKey].originalValue = originalValues.dataMap[idKey];
                        }
                        i = 0;
                        _d.label = 3;
                    case 3:
                        if (!(i < entitiesWithIds.length)) return [3 /*break*/, 8];
                        entityToUpdate = entitiesWithIds[i];
                        if (!!entityToUpdate.originalValue) return [3 /*break*/, 5];
                        if (entityToUpdate.idData.idColumnValueData.length == 1) {
                            // Entity with a single Id always has the @Id generated
                            // hence, it must have since been deleted, skip it
                            return [2 /*return*/];
                        }
                        // Don't know if the entity has been deleted or is a brand new one, create it
                        // TODO: figure out if the entity has been deleted and if it has, throw an
                        // exception?
                        return [4 /*yield*/, this.performCreate(dbEntity, entityToUpdate.newValue, alreadyModifiedEntityMap, entityToUpdate.idData, cascadeAlways)];
                    case 4:
                        // Don't know if the entity has been deleted or is a brand new one, create it
                        // TODO: figure out if the entity has been deleted and if it has, throw an
                        // exception?
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.performUpdate(dbEntity, entityToUpdate.newValue, alreadyModifiedEntityMap, entityToUpdate.originalValue, cascadeAlways)];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 3];
                    case 8:
                        i = 0;
                        _d.label = 9;
                    case 9:
                        if (!(i < entitiesWithoutIds.length)) return [3 /*break*/, 12];
                        entityToCreate = entitiesWithoutIds[i];
                        return [4 /*yield*/, this.performCreate(dbEntity, entityToCreate, alreadyModifiedEntityMap, entityToCreate.idData, cascadeAlways)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 9];
                    case 12:
                        _i++;
                        return [3 /*break*/, 1];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    OperationManager.prototype.getIdsWhereClause = function (entitiesToUpdate, qEntity) {
        var idsWhereClause;
        if (entitiesToUpdate[0].idData.idColumnValueData.length > 1) {
            var idsWhereClauseFragments = entitiesToUpdate.map(function (entityToUpdate) {
                var singleIdWhereClauseFragments = entityToUpdate.idData.idColumnValueData.map(function (referencedData) {
                    var currentQObject = qEntity;
                    for (var _i = 0, _a = referencedData.propertyNameChains[0]; _i < _a.length; _i++) {
                        var propertyName = _a[_i];
                        currentQObject = currentQObject[propertyName];
                    }
                    return currentQObject.equals(referencedData.idValue);
                });
                return air_control_1.and.apply(void 0, singleIdWhereClauseFragments);
            });
            if (entitiesToUpdate.length > 1) {
                idsWhereClause = air_control_1.or.apply(void 0, idsWhereClauseFragments);
            }
            else {
                return idsWhereClauseFragments[0];
            }
        }
        else {
            var idsWhereClauseFragments = entitiesToUpdate.map(function (entityToUpdate) {
                return entityToUpdate.idData.idColumnValueData[0].idValue;
            });
            var currentQObject = qEntity;
            for (var _i = 0, _a = entitiesToUpdate[0].idData.idColumnValueData[0].propertyNameChains[0]; _i < _a.length; _i++) {
                var propertyName = _a[_i];
                currentQObject = currentQObject[propertyName];
            }
            if (entitiesToUpdate.length > 1) {
                idsWhereClause = currentQObject.in.apply(currentQObject, idsWhereClauseFragments);
            }
            else {
                idsWhereClause = currentQObject.equals(idsWhereClauseFragments[0]);
            }
        }
        return idsWhereClause;
    };
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    OperationManager.prototype.internalUpdate = function (dbEntity, entity, originalEntity, cascadeAlways) {
        if (cascadeAlways === void 0) { cascadeAlways = false; }
        return __awaiter(this, void 0, void 0, function () {
            var qEntity, cascadeRecords, setFragment, idWhereFragments, numUpdates, valuesMapByColumn, _loop_3, this_2, _i, _a, dbProperty, numberOfAffectedRecords, whereFragment, rawUpdate, update;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
                        cascadeRecords = [];
                        setFragment = {};
                        idWhereFragments = [];
                        numUpdates = 0;
                        valuesMapByColumn = [];
                        _loop_3 = function (dbProperty) {
                            var updatedValue = entity[dbProperty.name];
                            if (!dbProperty.relation || !dbProperty.relation.length) {
                                var dbColumn = dbProperty.propertyColumns[0].column;
                                this_2.ensureNonRelationalValue(dbProperty, dbColumn, updatedValue);
                                if (this_2.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, updatedValue)) {
                                    return "continue";
                                }
                                var originalValue = originalEntity[dbColumn.name];
                                if (dbProperty.isId) {
                                    // For an id property, the value is guaranteed to be the same (and not empty) -
                                    // cannot entity-update id fields
                                    idWhereFragments.push(qEntity[dbProperty.name].equals(updatedValue));
                                }
                                else if (!this_2.utils.valuesEqual(originalValue, updatedValue)) {
                                    setFragment[dbColumn.name] = updatedValue;
                                    numUpdates++;
                                }
                                return "continue";
                            }
                            // It's a relation property
                            this_2.assertRelationValueIsAnObject(updatedValue, dbProperty);
                            var dbRelation = dbProperty.relation[0];
                            switch (dbRelation.relationType) {
                                case ground_control_1.EntityRelationType.MANY_TO_ONE:
                                    this_2.assertManyToOneNotArray(updatedValue);
                                    this_2.utils.Schema.forEachColumnOfRelation(dbRelation, entity, function (dbColumn, value, propertyNameChains) {
                                        if (_this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, value)) {
                                            return;
                                        }
                                        var originalValue = originalEntity[dbColumn.name];
                                        if (dbProperty.isId) {
                                            var idQProperty = qEntity;
                                            for (var _i = 0, _a = propertyNameChains[0]; _i < _a.length; _i++) {
                                                var propertyNameLink = _a[_i];
                                                idQProperty = idQProperty[propertyNameLink];
                                            }
                                            // For an id property, the value is guaranteed to be the same (and not
                                            // empty) - cannot entity-update id fields
                                            idWhereFragments.push(idQProperty.equals(value));
                                        }
                                        else if (!_this.utils.valuesEqual(originalValue, value)) {
                                            setFragment[dbColumn.name] = value;
                                            numUpdates++;
                                        }
                                    }, dbProperty.isId);
                                    return "continue";
                                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                                    this_2.assertOneToManyIsArray(updatedValue);
                                    if (!cascadeAlways && !this_2.utils.Schema.doCascade(dbRelation, ground_control_1.CRUDOperation.UPDATE)) {
                                        return "continue";
                                    }
                                    cascadeRecords.push({
                                        relation: dbRelation,
                                        manyEntities: updatedValue,
                                    });
                                    break;
                            }
                        };
                        this_2 = this;
                        for (_i = 0, _a = dbEntity.properties; _i < _a.length; _i++) {
                            dbProperty = _a[_i];
                            _loop_3(dbProperty);
                        }
                        numberOfAffectedRecords = 0;
                        if (!numUpdates) return [3 /*break*/, 2];
                        whereFragment = void 0;
                        if (idWhereFragments.length > 1) {
                            whereFragment = air_control_1.and.apply(void 0, idWhereFragments);
                        }
                        else {
                            whereFragment = idWhereFragments[0];
                        }
                        rawUpdate = {
                            update: qEntity,
                            set: setFragment,
                            where: whereFragment
                        };
                        update = new air_control_1.UpdateProperties(rawUpdate, this.utils);
                        return [4 /*yield*/, this.internalUpdateWhere(dbEntity, update)];
                    case 1:
                        numberOfAffectedRecords = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, {
                            recordChanged: !!numUpdates,
                            numberOfAffectedRecords: numberOfAffectedRecords,
                            cascadeRecords: cascadeRecords
                        }];
                }
            });
        });
    };
    OperationManager.prototype.ensureNonRelationalValue = function (dbProperty, dbColumn, value) {
        if (value === undefined || value === null) {
            return;
        }
        switch (dbColumn.type) {
            case ground_control_1.SQLDataType.ANY:
                break;
            case ground_control_1.SQLDataType.BOOLEAN:
                if (typeof value !== 'boolean') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case ground_control_1.SQLDataType.DATE:
                if (typeof value !== 'object' || !(value instanceof Date)) {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case ground_control_1.SQLDataType.JSON:
                if (typeof value !== 'object' || value instanceof Date) {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case ground_control_1.SQLDataType.NUMBER:
                if (typeof value !== 'number') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case ground_control_1.SQLDataType.STRING:
                if (typeof value !== 'string') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
        }
    };
    OperationManager.prototype.assertRelationValueIsAnObject = function (relationValue, dbProperty) {
        if (relationValue !== null && relationValue !== undefined &&
            (typeof relationValue != 'object' || relationValue instanceof Date)) {
            throw "Unexpected value in relation property: " + dbProperty.name + ", of entity " + dbProperty.entity.name;
        }
    };
    OperationManager.prototype.assertManyToOneNotArray = function (relationValue) {
        if (relationValue instanceof Array) {
            throw "@ManyToOne relation cannot be an array";
        }
    };
    OperationManager.prototype.assertOneToManyIsArray = function (relationValue) {
        if (!(relationValue instanceof Array)) {
            throw "@OneToMany relation must be an array";
        }
    };
    OperationManager.prototype.internalUpdateColumnsWhere = function (dbEntity, updateColumns) {
        return __awaiter(this, void 0, void 0, function () {
            var portableQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        portableQuery = this.entity.getPortableQuery(dbEntity, updateColumns, null);
                        return [4 /*yield*/, this.transactionClient.updateValues(portableQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OperationManager.prototype.internalUpdateWhere = function (dbEntity, update) {
        return __awaiter(this, void 0, void 0, function () {
            var portableQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        portableQuery = this.entity.getPortableQuery(dbEntity, update, null);
                        return [4 /*yield*/, this.transactionClient.updateValues(portableQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Transactional context must have been started by the time this method is called.
     * @param qEntity
     * @param entity
     */
    OperationManager.prototype.performDelete = function (dbEntity, entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalDelete(dbEntity, entity)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OperationManager.prototype.isProcessed = function (entity, 
    // This is a per-operation map (for a single update or create or delete with cascades)
    operatedOnEntityMap, dbEntity) {
        if (air_control_1.markAsStub(entity)) {
            return [true, null];
        }
        if (!dbEntity.idColumns.length) {
            throw "Cannot run 'create'|'bulkCreate'|'update' for entity '" + dbEntity.name + "' with no @Id(s).\n\t\t\tPlease use 'insert'|'updateWhere' instead.";
        }
        var entityIdData = {
            idColumnValueData: [],
            idKey: null
        };
        // Attempt to get the id, allowing for non-ided entities,
        // fail if (part of) an id is empty.
        var idKey = this.utils.Schema.getIdKey(entity, dbEntity, false, function (idColumn, idValue, propertyNameChains) {
            entityIdData.idColumnValueData.push({
                idColumn: idColumn,
                idValue: idValue,
                propertyNameChains: propertyNameChains,
            });
        });
        entityIdData.idKey = idKey;
        if (!idKey) {
            return [false, entityIdData];
        }
        var mapForSchema = this.utils.ensureChildArray(operatedOnEntityMap, dbEntity.schemaVersion.schema.index);
        var mapForEntityType = this.utils.ensureChildMap(mapForSchema, dbEntity.index);
        var alreadyOperatedOnEntity = mapForEntityType[idKey];
        if (!alreadyOperatedOnEntity) {
            mapForEntityType[idKey] = entity;
            return [false, entityIdData];
        }
        if (alreadyOperatedOnEntity === entity) {
            // The Update operation for this entity was already recorded, nothing to do
            return [true, null];
        }
        // If it's new entity, not in cache
        var hasNonIdProperties = false;
        for (var propertyName in entity) {
            if (!dbEntity.idColumnMap[propertyName]
                && entity.hasOwnProperty(propertyName)) {
                hasNonIdProperties = true;
                break;
            }
        }
        // If there is at least one non-id property set, then it's not an id-stub
        if (hasNonIdProperties) {
            throw "More than one non-id-stub instance of '" + dbEntity.name + "' with @Id(s) value '" + entityIdData.idKey + "' during mutation operation";
        }
        // The Update operation for this entity was already recorded, nothing to do
        return [true, null];
    };
    OperationManager.prototype.internalDeleteWhere = function (dbEntity, aDelete) {
        return __awaiter(this, void 0, void 0, function () {
            var portableQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        portableQuery = this.entity.getPortableQuery(dbEntity, aDelete, null);
                        return [4 /*yield*/, this.transactionClient.deleteWhere(portableQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OperationManager.prototype.internalDelete = function (dbEntity, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var qEntity, idWhereFragments, valuesMapByColumn, _loop_4, this_3, propertyName, idWhereClause, rawDelete, deleteWhere;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
                        idWhereFragments = [];
                        valuesMapByColumn = [];
                        _loop_4 = function (propertyName) {
                            if (!entity.hasOwnProperty(propertyName)) {
                                return "continue";
                            }
                            var dbProperty = dbEntity.propertyMap[propertyName];
                            // Skip transient fields
                            if (!dbProperty) {
                                return "continue";
                            }
                            var deletedValue = entity[propertyName];
                            var dbRelation = void 0;
                            if (dbProperty.relation && dbProperty.relation.length) {
                                dbRelation = dbProperty.relation[0];
                            }
                            if (!dbRelation) {
                                // If the property is not a transient field and not a relation
                                var dbColumn = dbProperty.propertyColumns[0].column;
                                this_3.ensureNonRelationalValue(dbProperty, dbColumn, deletedValue);
                                if (this_3.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, deletedValue)) {
                                    return "continue";
                                }
                                if (dbProperty.isId) {
                                    // For an id property, the value is guaranteed to be the same (and not empty) -
                                    // cannot entity-update id fields
                                    idWhereFragments.push(qEntity[propertyName].equals(deletedValue));
                                }
                                return "continue";
                            }
                            this_3.assertRelationValueIsAnObject(deletedValue, dbProperty);
                            switch (dbRelation.relationType) {
                                case ground_control_1.EntityRelationType.MANY_TO_ONE:
                                    this_3.assertManyToOneNotArray(deletedValue);
                                    this_3.utils.Schema.forEachColumnOfRelation(dbRelation, dbEntity, function (dbColumn, value, propertyNameChains) {
                                        if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
                                            if (_this.utils.Schema.isIdEmpty(value)) {
                                                throw "Required Id value is missing in:\n\t\t\t\t\t\t\t\t'" + dbEntity.name + "." + propertyNameChains.join('.') + "'";
                                            }
                                            var idQProperty = qEntity;
                                            for (var _i = 0, _a = propertyNameChains[0]; _i < _a.length; _i++) {
                                                var propertyNameLink = _a[_i];
                                                idQProperty = idQProperty[propertyNameLink];
                                            }
                                            // For an id property, the value is guaranteed to be the same (and not
                                            // empty) - cannot entity-update id fields
                                            idWhereFragments.push(idQProperty.equals(value));
                                        }
                                        _this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, value);
                                    }, false);
                                    // Cascading on manyToOne is not currently implemented, nothing else needs to
                                    // be done
                                    break;
                                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                                    // One-to-Manys do not contain values for the object being deleted
                                    break;
                                default:
                                    throw "Unknown relationType '" + dbRelation.relationType + "' for '" + dbEntity.name + "." + dbProperty.name + "'.";
                            }
                        };
                        this_3 = this;
                        for (propertyName in entity) {
                            _loop_4(propertyName);
                        }
                        if (idWhereFragments.length > 1) {
                            idWhereClause = air_control_1.and.apply(void 0, idWhereFragments);
                        }
                        else {
                            idWhereClause = idWhereFragments[0];
                        }
                        rawDelete = {
                            deleteFrom: qEntity,
                            where: idWhereClause
                        };
                        deleteWhere = new air_control_1.Delete(rawDelete, this.utils);
                        return [4 /*yield*/, this.internalDeleteWhere(dbEntity, deleteWhere)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return OperationManager;
}());
exports.OperationManager = OperationManager;
