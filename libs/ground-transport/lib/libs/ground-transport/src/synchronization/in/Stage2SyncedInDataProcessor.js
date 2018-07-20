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
var _a;
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../../apps/terminal/src/InjectionTokens");
const air_control_1 = require("@airport/air-control");
const Inject_1 = require("typedi/decorators/Inject");
const moving_walkway_1 = require("@airport/moving-walkway");
let Stage2SyncedInDataProcessor = class Stage2SyncedInDataProcessor {
    constructor(airportDb, recordUpdateStageDao, utils) {
        this.airportDb = airportDb;
        this.recordUpdateStageDao = recordUpdateStageDao;
        this.utils = utils;
    }
    async applyChangesToDb(stage1Result) {
        await this.performCreates(stage1Result.recordCreations);
        await this.performUpdates(stage1Result.recordUpdates);
        await this.performDeletes(stage1Result.recordDeletions);
    }
    async performCreates(recordCreations) {
        for (const [schemaIndex, creationInSchemaMap] of recordCreations) {
            for (const [tableIndex, creationInTableMap] of creationInSchemaMap) {
                const dbEntity = this.airportDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
                const qEntity = this.airportDb.qSchemas[schemaIndex][dbEntity.name];
                const columns = [
                    qEntity.repository.id,
                    qEntity.actor.id,
                    qEntity.actorRecordId
                ];
                let creatingColumns = true;
                let numInserts = 0;
                const values = [];
                for (const [repositoryId, creationForRepositoryMap] of creationInTableMap) {
                    for (const [actorId, creationForActorMap] of creationForRepositoryMap) {
                        for (const [actorRecordId, creationOfRowMap] of creationForActorMap) {
                            const rowValues = [
                                repositoryId,
                                actorId,
                                actorRecordId
                            ];
                            const columnIndexedValues = [];
                            for (const [columnIndex, columnValue] of creationOfRowMap) {
                                columnIndexedValues.push([columnIndex, columnValue]);
                            }
                            if (columnIndexedValues.length) {
                                numInserts++;
                            }
                            columnIndexedValues.sort((col1IndexAndValue, col2IndexAndValue) => {
                                return this.utils.compareNumbers(col1IndexAndValue[0], col2IndexAndValue[0]);
                            });
                            for (const [columnIndex, columnValue] of columnIndexedValues) {
                                if (creatingColumns) {
                                    columns.push(qEntity.__driver__.allColumns[columnIndex]);
                                }
                                rowValues.push(columnValue);
                            }
                            if (columnIndexedValues.length) {
                                values.push(rowValues);
                            }
                            creatingColumns = false;
                        }
                    }
                }
                if (numInserts) {
                    await this.airportDb.db.insertValues(dbEntity, {
                        insertInto: qEntity,
                        columns,
                        values
                    });
                }
            }
        }
    }
    async performUpdates(recordUpdates) {
        const finalUpdateMap = new Map();
        const recordUpdateStage = [];
        // Build the final update data structure
        for (const [schemaIndex, schemaUpdateMap] of recordUpdates) {
            const finalSchemaUpdateMap = this.utils.ensureChildJsMap(finalUpdateMap, schemaIndex);
            for (const [tableIndex, tableUpdateMap] of schemaUpdateMap) {
                const finalTableUpdateMap = this.utils.ensureChildJsMap(finalSchemaUpdateMap, tableIndex);
                for (const [repositoryId, repositoryUpdateMap] of tableUpdateMap) {
                    for (const [actorId, actorUpdates] of repositoryUpdateMap) {
                        for (const [actorRecordId, recordUpdateMap] of actorUpdates) {
                            const recordKeyMap = this.getRecordKeyMap(recordUpdateMap, finalTableUpdateMap);
                            this.utils.ensureChildJsSet(this.utils.ensureChildJsMap(recordKeyMap, repositoryId), actorId)
                                .add(actorRecordId);
                            for (const [columnIndex, columnUpdate] of recordUpdateMap) {
                                recordUpdateStage.push([
                                    schemaIndex,
                                    tableIndex,
                                    repositoryId,
                                    actorId,
                                    actorRecordId,
                                    columnIndex,
                                    columnUpdate.newValue
                                ]);
                            }
                        }
                    }
                }
            }
        }
        await this.recordUpdateStageDao.insertValues(recordUpdateStage);
        // Perform the updates
        for (const [schemaIndex, updateMapForSchema] of finalUpdateMap) {
            for (const [tableIndex, updateMapForTable] of updateMapForSchema) {
                await this.runUpdatesForTable(schemaIndex, tableIndex, updateMapForTable);
            }
        }
        await this.recordUpdateStageDao.delete();
    }
    /**
     * Get the record key map (RecordKeyMap = RepositoryId -> ActorId
     * -> RepositoryEntityActorRecordId) for the recordUpdateMap (the specified combination of
     * columns/values being updated)
     * @param {Map<ColumnIndex, RecordUpdate>} recordUpdateMap
     * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
     * @returns {RecordKeyMap}
     */
    getRecordKeyMap(recordUpdateMap, // combination of columns/values being updated
    finalTableUpdateMap) {
        const updatedColumns = [];
        for (const columnIndex of recordUpdateMap.keys()) {
            updatedColumns.push(columnIndex);
        }
        // Sort the updated columns by column index, to ensure that all records with the
        // same combination of updated columns are grouped
        updatedColumns.sort(this.utils.compareNumbers);
        // Navigate down the table UpdateKeyMap to find the matching combination of
        // columns being updated
        let columnValueUpdate;
        let updateKeyMap = finalTableUpdateMap;
        for (const columnIndex of updatedColumns) {
            columnValueUpdate = updateKeyMap.get(columnIndex);
            // If no update statements with the specified combination of columns exist yet
            if (!columnValueUpdate) {
                columnValueUpdate = {
                    childColumnUpdateKeyMap: new Map(),
                    recordKeyMap: new Map(),
                    updatedColumns: null,
                };
                updateKeyMap.set(columnIndex, columnValueUpdate);
            }
            // Navigate down
            updateKeyMap = columnValueUpdate.childColumnUpdateKeyMap;
        }
        columnValueUpdate.updatedColumns = updatedColumns;
        // Return the map of the records for the update statement of the specified combination
        // of columns/values
        return columnValueUpdate.recordKeyMap;
    }
    /**
     * Run all updates for a particular table.  One update per updated column combination is run.
     *
     * @param {SchemaIndex} schemaIndex
     * @param {TableIndex} tableIndex
     * @param {ColumnUpdateKeyMap} updateKeyMap
     * @returns {Promise<void>}
     */
    async runUpdatesForTable(schemaIndex, tableIndex, updateKeyMap) {
        for (const columnValueUpdate of updateKeyMap.values()) {
            const updatedColumns = columnValueUpdate.updatedColumns;
            if (updatedColumns) {
                await this.recordUpdateStageDao.updateEntityWhereIds(schemaIndex, tableIndex, columnValueUpdate.recordKeyMap, updatedColumns);
            }
            // Traverse down into nested column update combinations
            await this.runUpdatesForTable(schemaIndex, tableIndex, columnValueUpdate.childColumnUpdateKeyMap);
        }
    }
    async performDeletes(recordDeletions) {
        for (const [schemaIndex, deletionInSchemaMap] of recordDeletions) {
            for (const [tableIndex, deletionInTableMap] of deletionInSchemaMap) {
                const dbEntity = this.airportDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
                const qEntity = this.airportDb.qSchemas[schemaIndex][dbEntity.name];
                let numClauses = 0;
                let repositoryWhereFragments = [];
                for (const [repositoryId, deletionForRepositoryMap] of deletionInTableMap) {
                    let actorWhereFragments = [];
                    for (const [actorId, actorRecordIdSet] of deletionForRepositoryMap) {
                        numClauses++;
                        actorWhereFragments.push(air_control_1.and(qEntity.actorRecordId.in(Array.from(actorRecordIdSet)), qEntity.actor.id.equals(actorId)));
                    }
                    repositoryWhereFragments.push(air_control_1.and(qEntity.repository.id.equals(repositoryId), air_control_1.or(...actorWhereFragments)));
                }
                if (numClauses) {
                    await this.airportDb.db.deleteWhere(dbEntity, {
                        deleteFrom: qEntity,
                        where: air_control_1.or(...repositoryWhereFragments)
                    });
                }
            }
        }
    }
};
Stage2SyncedInDataProcessor = __decorate([
    typedi_1.Service(InjectionTokens_1.Stage2SyncedInDataProcessorToken),
    __param(0, Inject_1.Inject(air_control_1.AirportTerminalToken)),
    __param(1, Inject_1.Inject(moving_walkway_1.RecordUpdateStageDaoToken)),
    __param(2, Inject_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof air_control_1.IAirportTerminal !== "undefined" && air_control_1.IAirportTerminal) === "function" && _a || Object, Object, Object])
], Stage2SyncedInDataProcessor);
exports.Stage2SyncedInDataProcessor = Stage2SyncedInDataProcessor;
//# sourceMappingURL=Stage2SyncedInDataProcessor.js.map