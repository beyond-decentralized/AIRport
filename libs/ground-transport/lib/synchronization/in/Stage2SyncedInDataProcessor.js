var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { ensureChildJsMap, ensureChildJsSet, airEntity } from '@airport/ground-control';
import { AND, OR } from '@airport/tarmaq-query';
let Stage2SyncedInDataProcessor = class Stage2SyncedInDataProcessor {
    async applyChangesToDb(stage1Result, applicationsByApplicationVersion_LocalIdMap) {
        const context = {};
        await this.performCreates(stage1Result.recordCreations, applicationsByApplicationVersion_LocalIdMap, context);
        await this.performUpdates(stage1Result.recordUpdates, applicationsByApplicationVersion_LocalIdMap, context);
        await this.performDeletes(stage1Result.recordDeletions, applicationsByApplicationVersion_LocalIdMap, context);
    }
    /**
     * Remote changes come in with ApplicationVersion_LocalIds not Application_Indexes, so it makes
     * sense to keep this structure.  NOTE: only one version of a given application is
     * processed at one time:
     *
     *  Changes for a application version below the one in this Terminal must first be upgraded.
     *  Terminal itself must first be upgraded to newer application versions, before changes
     *  for that application version are processed.
     *
     *  To tie in a given ApplicationVersion_LocalId to its Application_Index an additional mapping data
     *  structure is passed in.
     */
    async performCreates(recordCreations, applicationsByApplicationVersion_LocalIdMap, context) {
        for (const [applicationVersionId, creationInApplicationMap] of recordCreations) {
            for (const [tableIndex, creationInTableMap] of creationInApplicationMap) {
                const applicationIndex = applicationsByApplicationVersion_LocalIdMap
                    .get(applicationVersionId).index;
                const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
                    .applicationVersion.entities[tableIndex];
                const qEntity = this.airportDatabase.qApplications[applicationIndex][dbEntity.name];
                const columns = [
                    qEntity.repository._localId,
                    qEntity.actor._localId,
                    qEntity._actorRecordId
                ];
                const nonIdColumns = this.getNonIdColumnsInIndexOrder(dbEntity);
                let creatingColumns = true;
                let numInserts = 0;
                const VALUES = [];
                for (const [repositoryId, creationForRepositoryMap] of creationInTableMap) {
                    for (const [actorId, creationForActorMap] of creationForRepositoryMap) {
                        for (const [_actorRecordId, creationOfRowMap] of creationForActorMap) {
                            const rowValues = [
                                repositoryId,
                                actorId,
                                _actorRecordId
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
                            let currentNonIdColumnArrayIndex = 0;
                            for (const [columnIndex, columnValue] of columnIndexedValues) {
                                let nonIdColumn = nonIdColumns[currentNonIdColumnArrayIndex];
                                while (nonIdColumn.index < columnIndex) {
                                    if (creatingColumns) {
                                        columns.push(qEntity.__driver__.allColumns[nonIdColumn.index]);
                                    }
                                    rowValues.push(null);
                                    currentNonIdColumnArrayIndex++;
                                    nonIdColumn = nonIdColumns[currentNonIdColumnArrayIndex];
                                }
                                if (creatingColumns) {
                                    columns.push(qEntity.__driver__.allColumns[columnIndex]);
                                }
                                rowValues.push(columnValue);
                                currentNonIdColumnArrayIndex++;
                            }
                            if (columnIndexedValues.length) {
                                VALUES.push(rowValues);
                            }
                            creatingColumns = false;
                        }
                    }
                }
                if (numInserts) {
                    const previousDbEntity = context.dbEntity;
                    context.dbEntity = qEntity
                        .__driver__.dbEntity;
                    try {
                        await this.databaseFacade.insertValues({
                            INSERT_INTO: qEntity,
                            columns,
                            VALUES
                        }, context);
                    }
                    finally {
                        context.dbEntity = previousDbEntity;
                    }
                }
            }
        }
    }
    getNonIdColumnsInIndexOrder(dbEntity) {
        const nonIdColumns = [];
        for (const column of dbEntity.columns) {
            switch (column.name) {
                case airEntity.ACTOR_LID:
                case airEntity.ACTOR_RECORD_ID:
                case airEntity.REPOSITORY_LID:
                    continue;
            }
            nonIdColumns.push(column);
        }
        nonIdColumns.sort((column1, column2) => {
            return this.utils.compareNumbers(column1.index, column2.index);
        });
        return nonIdColumns;
    }
    async performUpdates(recordUpdates, applicationsByApplicationVersion_LocalIdMap, context) {
        const finalUpdateMap = new Map();
        const recordUpdateStage = [];
        // Build the final update data structure
        for (const [applicationVersionId, applicationUpdateMap] of recordUpdates) {
            const finalApplicationUpdateMap = ensureChildJsMap(finalUpdateMap, applicationVersionId);
            for (const [tableIndex, tableUpdateMap] of applicationUpdateMap) {
                const finalTableUpdateMap = ensureChildJsMap(finalApplicationUpdateMap, tableIndex);
                for (const [repositoryId, repositoryUpdateMap] of tableUpdateMap) {
                    for (const [actorId, actorUpdates] of repositoryUpdateMap) {
                        for (const [_actorRecordId, recordUpdateMap] of actorUpdates) {
                            const recordKeyMap = this.getRecordKeyMap(recordUpdateMap, finalTableUpdateMap);
                            ensureChildJsSet(ensureChildJsMap(recordKeyMap, repositoryId), actorId)
                                .add(_actorRecordId);
                            for (const [columnIndex, columnUpdate] of recordUpdateMap) {
                                recordUpdateStage.push([
                                    applicationVersionId,
                                    tableIndex,
                                    repositoryId,
                                    actorId,
                                    _actorRecordId,
                                    columnIndex,
                                    columnUpdate.newValue
                                ]);
                            }
                        }
                    }
                }
            }
        }
        if (!recordUpdateStage.length) {
            return;
        }
        await this.recordUpdateStageDao.insertValues(recordUpdateStage);
        // Perform the updates
        for (const [applicationVersionId, updateMapForApplication] of finalUpdateMap) {
            const application = applicationsByApplicationVersion_LocalIdMap.get(applicationVersionId);
            for (const [tableIndex, updateMapForTable] of updateMapForApplication) {
                await this.runUpdatesForTable(application.index, applicationVersionId, tableIndex, updateMapForTable);
            }
        }
        await this.recordUpdateStageDao.delete();
    }
    async performDeletes(recordDeletions, applicationsByApplicationVersion_LocalIdMap, context) {
        for (const [applicationVersionId, deletionInApplicationMap] of recordDeletions) {
            const application = applicationsByApplicationVersion_LocalIdMap.get(applicationVersionId);
            for (const [tableIndex, deletionInTableMap] of deletionInApplicationMap) {
                const dbEntity = this.airportDatabase.applications[application.index].currentVersion[0]
                    .applicationVersion.entities[tableIndex];
                const qEntity = this.airportDatabase.qApplications[application.index][dbEntity.name];
                let numClauses = 0;
                let repositoryWhereFragments = [];
                for (const [repositoryId, deletionForRepositoryMap] of deletionInTableMap) {
                    let actorWhereFragments = [];
                    for (const [actorId, actorRecordIdSet] of deletionForRepositoryMap) {
                        numClauses++;
                        actorWhereFragments.push(AND(qEntity._actorRecordId.IN(Array.from(actorRecordIdSet)), qEntity.actor._localId.equals(actorId)));
                    }
                    repositoryWhereFragments.push(AND(qEntity.repository._localId.equals(repositoryId), OR(...actorWhereFragments)));
                }
                if (numClauses) {
                    const previousDbEntity = context.dbEntity;
                    context.dbEntity = qEntity
                        .__driver__.dbEntity;
                    try {
                        await this.databaseFacade.deleteWhere({
                            DELETE_FROM: qEntity,
                            WHERE: OR(...repositoryWhereFragments)
                        }, context);
                    }
                    finally {
                        context.dbEntity = previousDbEntity;
                    }
                }
            }
        }
    }
    /**
     * Get the record key map (RecordKeyMap = RepositoryId -> Actor_LocalId
     * -> AirEntity_ActorRecordId) for the recordUpdateMap (the specified combination
     * of columns/values being updated)
     * @param {Map<ApplicationColumn_Index, RecordUpdate>} recordUpdateMap
     * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
     * @returns {RecordKeyMap}
     */
    getRecordKeyMap(recordUpdateMap, // combination of columns/values
    // being updated
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
     * Run all updates for a particular table.  One update per updated column combination
     * is run.
     *
     * @param {Application_Index} applicationIndex
     * @param {ApplicationEntity_TableIndex} tableIndex
     * @param {ColumnUpdateKeyMap} updateKeyMap
     * @returns {Promise<void>}
     */
    async runUpdatesForTable(applicationIndex, applicationVersionId, tableIndex, updateKeyMap) {
        for (const columnValueUpdate of updateKeyMap.values()) {
            const updatedColumns = columnValueUpdate.updatedColumns;
            if (updatedColumns) {
                await this.recordUpdateStageDao.updateEntityWhereIds(applicationIndex, applicationVersionId, tableIndex, columnValueUpdate.recordKeyMap, updatedColumns);
            }
            // Traverse down into nested column update combinations
            await this.runUpdatesForTable(applicationIndex, applicationVersionId, tableIndex, columnValueUpdate.childColumnUpdateKeyMap);
        }
    }
};
__decorate([
    Inject()
], Stage2SyncedInDataProcessor.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], Stage2SyncedInDataProcessor.prototype, "databaseFacade", void 0);
__decorate([
    Inject()
], Stage2SyncedInDataProcessor.prototype, "recordUpdateStageDao", void 0);
__decorate([
    Inject()
], Stage2SyncedInDataProcessor.prototype, "utils", void 0);
Stage2SyncedInDataProcessor = __decorate([
    Injected()
], Stage2SyncedInDataProcessor);
export { Stage2SyncedInDataProcessor };
//# sourceMappingURL=Stage2SyncedInDataProcessor.js.map