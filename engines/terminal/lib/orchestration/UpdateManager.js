import { QUERY_FACADE, SheetQuery } from '@airport/air-control';
import { getSysWideOpId, SEQUENCE_GENERATOR } from '@airport/check-in';
import { container, DI } from '@airport/di';
import { ChangeType, ensureChildArray, ensureChildMap, QueryResultType, repositoryEntity, } from '@airport/ground-control';
import { OPER_HISTORY_DUO, REC_HIST_NEW_VALUE_DUO, REC_HIST_OLD_VALUE_DUO, REC_HISTORY_DUO, REPO_TRANS_HISTORY_DUO } from '@airport/holding-pattern';
import { HISTORY_MANAGER, REPOSITORY_MANAGER, UPDATE_MANAGER } from '../tokens';
export class UpdateManager {
    async updateValues(portableQuery, actor, transaction, context) {
        // TODO: remove unused dependencies after testing
        const [historyManager, operHistoryDuo, recHistoryDuo, recHistoryNewValueDuo, recHistoryOldValueDuo, repositoryManager, repoTransHistoryDuo, sequenceGenerator] = await container(this)
            .get(HISTORY_MANAGER, OPER_HISTORY_DUO, REC_HISTORY_DUO, REC_HIST_NEW_VALUE_DUO, REC_HIST_OLD_VALUE_DUO, REPOSITORY_MANAGER, REPO_TRANS_HISTORY_DUO, SEQUENCE_GENERATOR);
        const dbEntity = context.ioc.airDb.schemas[portableQuery.schemaIndex]
            .currentVersion[0].schemaVersion.entities[portableQuery.tableIndex];
        const errorPrefix = `Error updating '${dbEntity.name}'
`;
        const internalFragments = {
            SET: []
        };
        let recordHistoryMap;
        let repositorySheetSelectInfo;
        let systemWideOperationId;
        if (!dbEntity.isLocal) {
            systemWideOperationId = await getSysWideOpId(context.ioc.airDb, sequenceGenerator);
            // TODO: For entity queries an additional query really shouldn't be needed
            // Specifically for entity queries, we got the new values, just record them
            // This will require an additional operation on the first update
            // where the original values of the record are saved
            // This eats up more disk space but saves on operations that need
            // to be performed (one less query)
            [recordHistoryMap, repositorySheetSelectInfo]
                = await this.addUpdateHistory(portableQuery, actor, systemWideOperationId, errorPrefix, historyManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repositoryManager, repoTransHistoryDuo, transaction, context);
            internalFragments.SET.push({
                column: repositorySheetSelectInfo.systemWideOperationIdColumn,
                value: systemWideOperationId
            });
        }
        const numUpdatedRows = await transaction
            .updateWhere(portableQuery, internalFragments, context);
        if (!dbEntity.isLocal) {
            const previousDbEntity = context.dbEntity;
            context.dbEntity = dbEntity;
            // TODO: Entity based updates already have all of the new values being
            // updated, detect the type of update and if entity just pull out
            // the new values from them
            await this.addNewValueHistory(portableQuery.jsonQuery, recordHistoryMap, systemWideOperationId, repositorySheetSelectInfo, errorPrefix, recHistoryDuo, recHistoryNewValueDuo, transaction, context);
            context.dbEntity = previousDbEntity;
        }
        return numUpdatedRows;
    }
    async addUpdateHistory(portableQuery, actor, systemWideOperationId, errorPrefix, histManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo, repoManager, repoTransHistoryDuo, transaction, context) {
        if (!context.dbEntity.isRepositoryEntity) {
            throw new Error(errorPrefix +
                `Cannot add update history for a non-RepositoryEntity`);
        }
        const qEntity = context.ioc.airDb
            .qSchemas[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name];
        const jsonUpdate = portableQuery.jsonQuery;
        const getSheetSelectFromSetClauseResult = context.ioc.schemaUtils.getSheetSelectFromSetClause(context.dbEntity, qEntity, jsonUpdate.S, errorPrefix);
        const sheetQuery = new SheetQuery(null);
        const jsonSelectClause = sheetQuery.nonDistinctSelectClauseToJSON(getSheetSelectFromSetClauseResult.selectClause, context.ioc.queryUtils, context.ioc.fieldUtils);
        const jsonSelect = {
            S: jsonSelectClause,
            F: [jsonUpdate.U],
            W: jsonUpdate.W,
        };
        const portableSelect = {
            schemaIndex: portableQuery.schemaIndex,
            tableIndex: portableQuery.tableIndex,
            jsonQuery: jsonSelect,
            queryResultType: QueryResultType.SHEET,
            parameterMap: portableQuery.parameterMap,
            // values: portableQuery.values,
        };
        const recordsToUpdate = await transaction.find(portableSelect, {}, context);
        const { recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(recordsToUpdate, getSheetSelectFromSetClauseResult);
        const repositoryIds = Array.from(repositoryIdSet);
        // const repositories: MappedEntityArray<IRepository> =
        // 	      await repoManager.findReposWithDetailsByIds(...repositoryIds)
        const recordHistoryMapByRecordId = {};
        for (const repositoryId of repositoryIds) {
            // const repository                         = repositories.get(repositoryId)
            const recordHistoryMapForRepository = {};
            recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository;
            const repoTransHistory = await histManager.getNewRepoTransHistory(transaction.transHistory, repositoryId, actor);
            const operationHistory = repoTransHistoryDuo.startOperation(repoTransHistory, systemWideOperationId, ChangeType.UPDATE_ROWS, context.dbEntity, operHistoryDuo);
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const recordToUpdate of recordsForRepositoryId) {
                const actorId = recordToUpdate[getSheetSelectFromSetClauseResult.actorIdColumnIndex];
                const recordHistoryMapForActor = ensureChildMap(recordHistoryMapForRepository, actorId);
                const actorRecordId = recordToUpdate[getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex];
                const recordHistory = operHistoryDuo.startRecordHistory(operationHistory, actorRecordId, recHistoryDuo);
                recordHistoryMapForActor[actorRecordId] = recordHistory;
                for (let i = 0; i < recordToUpdate.length; i++) {
                    switch (i) {
                        case getSheetSelectFromSetClauseResult.actorIdColumnIndex:
                        case getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex:
                        case getSheetSelectFromSetClauseResult.repositoryIdColumnIndex:
                            continue;
                        case getSheetSelectFromSetClauseResult.draftColumnIndex:
                            if (!getSheetSelectFromSetClauseResult.draftColumnUpdated) {
                                continue;
                            }
                            break;
                    }
                    const dbColumn = getSheetSelectFromSetClauseResult
                        .selectClause[i].dbColumn;
                    const value = recordToUpdate[i];
                    recHistoryDuo.addOldValue(recordHistory, dbColumn, value, recHistoryOldValueDuo);
                }
            }
        }
        return [recordHistoryMapByRecordId, getSheetSelectFromSetClauseResult];
    }
    async addNewValueHistory(jsonUpdate, recordHistoryMapByRecordId, systemWideOperationId, repositorySheetSelectInfo, errorPrefix, recHistoryDuo, recHistoryNewValueDuo, transaction, context) {
        const qEntity = context.ioc.airDb.qSchemas[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name];
        const sheetQuery = new SheetQuery({
            from: [
                qEntity
            ],
            select: [],
            where: qEntity[repositoryEntity.systemWideOperationId]
                .equals(systemWideOperationId)
        });
        const queryFacade = await container(this)
            .get(QUERY_FACADE);
        let portableSelect = queryFacade.getPortableQuery(sheetQuery, QueryResultType.SHEET, context);
        const internalFragments = {
            SELECT: repositorySheetSelectInfo.selectClause.map(field => field.dbColumn)
        };
        const updatedRecords = await transaction.find(portableSelect, internalFragments, context);
        const { recordsByRepositoryId, repositoryIdSet } = this.groupRecordsByRepository(updatedRecords, repositorySheetSelectInfo);
        for (const repositoryId of repositoryIdSet) {
            const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
            for (const updatedRecord of recordsForRepositoryId) {
                const repositoryId = updatedRecord[repositorySheetSelectInfo.repositoryIdColumnIndex];
                const actorId = updatedRecord[repositorySheetSelectInfo.actorIdColumnIndex];
                const actorRecordId = updatedRecord[repositorySheetSelectInfo.actorRecordIdColumnIndex];
                const isDraft = updatedRecord[repositorySheetSelectInfo.draftColumnIndex];
                if (repositorySheetSelectInfo.draftColumnUpdated
                    && isDraft) {
                    throw new Error(errorPrefix + `Records cannot be updated to be draft. A record
may only be created as a draft record.`);
                }
                const recordHistory = recordHistoryMapByRecordId[repositoryId][actorId][actorRecordId];
                for (const columnName in jsonUpdate.S) {
                    const dbColumn = context.dbEntity.columnMap[columnName];
                    const value = updatedRecord[dbColumn.index];
                    if (value === undefined) {
                        throw new Error(errorPrefix + `Values cannot be 'undefined'.`);
                    }
                    if (dbColumn.notNull && value === null && !isDraft) {
                        throw new Error(errorPrefix + `Column '${dbColumn.entity.name}'.'${dbColumn.name}' is NOT NULL
						and cannot have NULL values for non-draft records.`);
                    }
                    recHistoryDuo.addNewValue(recordHistory, dbColumn, value, recHistoryNewValueDuo);
                }
            }
        }
    }
    groupRecordsByRepository(records, repositorySheetSelectInfo) {
        const recordsByRepositoryId = {};
        const repositoryIdSet = new Set();
        for (const recordToUpdate of records) {
            const repositoryId = recordToUpdate[repositorySheetSelectInfo.repositoryIdColumnIndex];
            repositoryIdSet.add(repositoryId);
            const recordsForRepositoryId = ensureChildArray(recordsByRepositoryId, repositoryId);
            recordsForRepositoryId.push(recordToUpdate);
        }
        return {
            recordsByRepositoryId,
            repositoryIdSet
        };
    }
}
DI.set(UPDATE_MANAGER, UpdateManager);
//# sourceMappingURL=UpdateManager.js.map