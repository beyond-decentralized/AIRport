var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { getSysWideOpId } from '@airport/check-in';
import { ChangeType, airEntity, } from '@airport/ground-control';
let InsertManager = class InsertManager {
    async insertValues(portableQuery, actor, transaction, rootTransaction, context, ensureGeneratedValues) {
        return await this.internalInsertValues(portableQuery, actor, transaction, rootTransaction, context, false, ensureGeneratedValues);
    }
    async insertValuesGetLocalIds(portableQuery, actor, transaction, rootTransaction, context) {
        return await this.internalInsertValues(portableQuery, actor, transaction, rootTransaction, context, true);
    }
    verifyNoGeneratedColumns(dbEntity, jsonInsertValues, errorPrefix) {
        for (let i = 0; i < jsonInsertValues.C.length; i++) {
            const columnIndex = jsonInsertValues.C[i];
            const dbColumn = dbEntity.columns[columnIndex];
            if (dbColumn.isGenerated) {
                throw new Error(errorPrefix +
                    `You cannot explicitly insert into a @GeneratedValue column '${dbColumn.name}'`);
            }
        }
        return dbEntity.columns.filter(dbColumn => dbColumn.isGenerated);
    }
    async internalInsertValues(portableQuery, actor, transaction, rootTransaction, context, getIds = false, ensureGeneratedValues = true) {
        const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
            .currentVersion[0].applicationVersion.entities[portableQuery.tableIndex];
        const errorPrefix = `Error inserting into '${dbEntity.name}'.'
`;
        this.validateValueRowLength(portableQuery, errorPrefix);
        const jsonInsertValues = portableQuery.jsonQuery;
        const columnIndexSet = {};
        let inStatementIndex = 0;
        for (const columnIndex of jsonInsertValues.C) {
            if (columnIndex < 0 || columnIndex >= dbEntity.columns.length) {
                throw new Error(errorPrefix +
                    `Invalid column index: ${columnIndex}`);
            }
            if (columnIndexSet[columnIndex]) {
                throw new Error(errorPrefix +
                    `Column ${dbEntity.name}.${dbEntity.columns[columnIndex].name} 
appears more than once in the Columns clause`);
            }
            let rowNumber = 1;
            for (let row of jsonInsertValues.V) {
                if (row[inStatementIndex] === undefined) {
                    throw new Error(errorPrefix +
                        `
	'undefined' value in column ${dbEntity.name}.${dbEntity.columns[columnIndex].name} of row ${rowNumber}.
	All values in an insert statment must either be null or have a non-null value.`);
                }
                rowNumber++;
            }
            inStatementIndex++;
            columnIndexSet[columnIndex] = true;
        }
        let columnsToPopulate;
        const insertValues = portableQuery.jsonQuery;
        if (dbEntity.isAirEntity) {
            columnsToPopulate = this.ensureAirEntityIdValues(actor, dbEntity, insertValues, errorPrefix, transaction, context);
        }
        let generatedColumns;
        if (!transaction.isSync || context.generateOnSync) {
            generatedColumns = this.verifyNoGeneratedColumns(dbEntity, portableQuery.jsonQuery, errorPrefix);
        }
        let _localIds;
        let systemWideOperationId;
        if (!dbEntity.isLocal) {
            systemWideOperationId = await getSysWideOpId(this.airportDatabase, this.sequenceGenerator);
        }
        if ((!transaction.isSync || context.generateOnSync) && ensureGeneratedValues) {
            _localIds = await this.ensureGeneratedValues(dbEntity, insertValues, actor, columnsToPopulate, generatedColumns, systemWideOperationId, errorPrefix, this.sequenceGenerator);
        }
        if (!dbEntity.isLocal && !transaction.isSync) {
            await this.addInsertHistory(dbEntity, portableQuery, actor, systemWideOperationId, transaction, rootTransaction, context);
        }
        const numberOfInsertedRecords = await transaction.insertValues(portableQuery, context);
        return getIds ? _localIds : numberOfInsertedRecords;
    }
    async validateValueRowLength(portableQuery, errorPrefix) {
        const values = portableQuery.jsonQuery.V;
        if (!values.length) {
            throw new Error(errorPrefix + `no colum values provided`);
        }
        const firstValuesRow = values[0];
        if (!firstValuesRow || !firstValuesRow.length) {
            throw new Error(errorPrefix + `First row has no values`);
        }
        const numValuesInRow = firstValuesRow.length;
        for (let i = 0; i < values.length; i++) {
            const valuesRow = values[i];
            if (valuesRow.length !== numValuesInRow) {
                throw new Error(errorPrefix + `First row has ${numValuesInRow} values,
	while row ${i + 1} has ${valuesRow.length} values`);
            }
        }
    }
    async ensureGeneratedValues(dbEntity, jsonInsertValues, actor, columnsToPopulate, generatedColumns, systemWideOperationId, errorPrefix, sequenceGenerator) {
        const values = jsonInsertValues.V;
        const idColumns = dbEntity.idColumns;
        const allIds = [];
        for (const _entityValues of values) {
            allIds.push([]);
        }
        let actorIdColumn;
        let sysWideOperationIdColumn;
        if (!dbEntity.isLocal) {
            actorIdColumn = columnsToPopulate.actorIdColumn;
            sysWideOperationIdColumn = columnsToPopulate.sysWideOperationIdColumn;
        }
        for (const idColumn of idColumns) {
            if (idColumn.isGenerated) {
                continue;
            }
            let isActorIdColumn = false;
            let inStatementColumnIndex;
            const matchingColumns = jsonInsertValues.C.filter((columnIndex, index) => {
                if (columnIndex === idColumn.index) {
                    inStatementColumnIndex = index;
                    return true;
                }
            });
            if (matchingColumns.length < 1) {
                // Actor Id cannot be in the insert statement
                if (idColumn._localId === actorIdColumn._localId) {
                    isActorIdColumn = true;
                    inStatementColumnIndex = jsonInsertValues.C.length;
                    jsonInsertValues.C.push(actorIdColumn.index);
                }
                else {
                    throw new Error(errorPrefix +
                        `Could not find @Id column ${dbEntity.name}.${idColumn.name} in
					the insert statement.  Non-generated @Id columns must be present in the Insert
					statement (with exception of Actor ID).`);
                }
            }
            for (let i = 0; i < values.length; i++) {
                const entityValues = values[i];
                const idValues = allIds[i];
                let idValue;
                if (isActorIdColumn) {
                    idValue = actor._localId;
                }
                else {
                    idValue = entityValues[inStatementColumnIndex];
                    if (!idValue && idValue !== 0) {
                        throw new Error(errorPrefix +
                            `No value provided on insert for @Id '${dbEntity.name}.${idColumn.name}'.`);
                    }
                }
                idValues[idColumn.index] = idValue;
            }
        }
        // if (dbEntity.isAirEntity) {
        // 	const repositoryColumn  = dbEntity.columnMap[airEntity.FOREIGN_KEY]
        // 	const repositoryIdIndex = repositoryColumn.index
        // 	for (const entityValues of values) {
        // 		const repositoryId = entityValues[repositoryIdIndex]
        // 		if (!repositoryId && repositoryId !== 0) {
        // 			throw new Error(`@Column({ name: 'REPOSITORY_LID'}) value is not specified on
        // insert for '${dbEntity0.name}.${repositoryColumn.name}'.`) } } }
        const generatedColumnIndexes = [];
        // let numAddedColumns                    = 0
        for (const generatedColumn of generatedColumns) {
            // const matchingColumns = jsonInsertValues.C.filter(
            // 	columnIndex => columnIndex === generatedColumn.index)
            // if (!matchingColumns.length) {
            // TODO: verify that it is OK to mutate the JsonInsertValues query
            const generatedIdColumnIndex = jsonInsertValues.C.length;
            generatedColumnIndexes.push(jsonInsertValues.C.length);
            jsonInsertValues.C.push(generatedColumn.index);
            // numAddedColumns++
            continue;
            // }
            // const generatedIdColumnIndex = matchingColumns[0]
            // generatedColumnIndexes.push(generatedIdColumnIndex)
            for (const entityValues of values) {
                const generatedValue = entityValues[generatedIdColumnIndex];
                if (generatedValue || generatedValue === 0) {
                    // Allowing negative integers for temporary identification
                    // within the circular dependency management lookup
                    if (generatedValue >= 0) {
                        throw new Error(errorPrefix +
                            `Already provided value '${entityValues[generatedColumn.index]}'
					on insert for @GeneratedValue '${dbEntity.name}.${generatedColumn.name}'.
					You cannot explicitly provide values for @GeneratedValue columns'.`);
                    }
                }
            }
        }
        // Populating generated values AFTER the checks
        // to not waste sequence numbers on invalid input
        // (thus reducing storage requirements in SqLite)
        const numSequencesNeeded = generatedColumns.map(_ => values.length);
        const generatedSequenceValues = await sequenceGenerator.generateSequenceNumbers(generatedColumns, numSequencesNeeded);
        generatedColumns.forEach((dbColumn, generatedColumnIndex) => {
            const generatedColumnSequenceValues = generatedSequenceValues[generatedColumnIndex];
            const insertColumnIndex = generatedColumnIndexes[generatedColumnIndex];
            // const columnIndex                   = dbColumn.index
            values.forEach((entityValues, index) => {
                const generatedValue = generatedColumnSequenceValues[index];
                entityValues[insertColumnIndex] = generatedValue;
                allIds[index][dbColumn.index] = generatedValue;
            });
        });
        if (!dbEntity.isLocal) {
            jsonInsertValues.C.push(sysWideOperationIdColumn.index);
            values.forEach(entityValues => {
                entityValues.push(systemWideOperationId);
            });
        }
        if (!idColumns.length && !generatedColumns.length) {
            return values.length;
        }
        // switch (idColumns.length) {
        // 	case 0: {
        // 		// If there is just one @Generated column and no @Id columns
        // 		if (generatedColumns.length == 1) {
        // 			const columnIndex = generatedColumns[0].index
        // 			return allIds.map(
        // 				rowIds => rowIds[columnIndex])
        // 		}
        // 		break
        // 	}
        // 	case 1: {
        // 		// If there is exactly 1 @Id column and no @Generated columns
        // 		// or it is the @Generated column
        // 		if (!generatedColumns.length
        // 			|| (generatedColumns.length === 1
        // 				&& idColumns[0].index === generatedColumns[0].index)) {
        // 			const columnIndex = idColumns[0].index
        // 			return allIds.map(
        // 				rowIds => rowIds[columnIndex])
        // 		}
        // 		break
        // 	}
        // }
        return allIds;
    }
    ensureAirEntityIdValues(actor, dbEntity, jsonInsertValues, errorPrefix, transaction, context) {
        const actorIdColumn = dbEntity.idColumnMap[airEntity.ACTOR_LID];
        const actorRecordIdColumn = dbEntity.idColumnMap[airEntity.ACTOR_RECORD_ID];
        const repositoryIdColumn = dbEntity.idColumnMap[airEntity.REPOSITORY_LID];
        const sysWideOperationIdColumn = dbEntity.columnMap[airEntity.SYSTEM_WIDE_OPERATION_ID];
        let repositoryIdColumnQueryIndex;
        let foundActorIdColumn = false;
        let foundActorRecordIdColumn = false;
        let foundSystemWideOperationIdColumn = false;
        for (let i = 0; i < jsonInsertValues.C.length; i++) {
            const columnIndex = jsonInsertValues.C[i];
            switch (columnIndex) {
                case actorIdColumn.index:
                    foundActorIdColumn = true;
                    if (context.isSaveOperation) {
                        // Save operations validate Actor ealier and set it on the entity objects
                        break;
                    }
                    if (!transaction.isSync) {
                        throw new Error(errorPrefix +
                            `You cannot explicitly provide an ACTOR_LID value for Repository entities.`);
                    }
                    break;
                case actorRecordIdColumn.index:
                    foundActorRecordIdColumn = true;
                    if (!transaction.isSync) {
                        throw new Error(errorPrefix +
                            `You cannot explicitly provide an ACTOR_RECORD_ID value for Repository entities.`);
                    }
                    break;
                case sysWideOperationIdColumn.index:
                    foundSystemWideOperationIdColumn = true;
                    if (!transaction.isSync) {
                        throw new Error(`Error inserting into '${dbEntity.name}'.
You cannot explicitly provide a SYSTEM_WIDE_OPERATION_ID value for Repository entities.`);
                    }
                    break;
                case repositoryIdColumn.index:
                    repositoryIdColumnQueryIndex = i;
                    break;
            }
        }
        const missingRepositoryIdErrorMsg = errorPrefix +
            `Error inserting into '${dbEntity.name}'.
You must provide a valid REPOSITORY_LID value for Repository entities.`;
        if (repositoryIdColumnQueryIndex === undefined) {
            throw new Error(missingRepositoryIdErrorMsg);
        }
        if (transaction.isSync) {
            if (!foundActorIdColumn) {
                throw new Error(errorPrefix +
                    `ACTOR_LID must be provided for sync operations.`);
            }
            if (!foundActorRecordIdColumn) {
                throw new Error(errorPrefix +
                    `ACTOR_RECORD_ID must be provided for sync operations.`);
            }
            if (!foundSystemWideOperationIdColumn) {
                throw new Error(errorPrefix +
                    `SYSTEM_WIDE_OPERATION_ID must be provided for sync operations.`);
            }
        }
        for (const entityValues of jsonInsertValues.V) {
            if (entityValues.length !== jsonInsertValues.C.length) {
                throw new Error(errorPrefix +
                    `Number of columns (${jsonInsertValues.C.length}) does not match number of values (${entityValues.length}).
				`);
            }
            let repositoryId = entityValues[repositoryIdColumnQueryIndex];
            if (typeof repositoryId !== 'number'
                || !Number.isInteger(repositoryId)
                || repositoryId < 1) {
                throw new Error(missingRepositoryIdErrorMsg);
            }
            for (let i = 0; i < entityValues.length; i++) {
                switch (i) {
                    case repositoryIdColumnQueryIndex:
                        continue;
                }
                const value = entityValues[i];
                const columnIndex = jsonInsertValues.C[i];
                const dbColumn = dbEntity.columns[columnIndex];
                if (dbColumn.notNull && value === null) {
                    throw new Error(errorPrefix +
                        `Column '${dbColumn.name}' is NOT NULL
and cannot have NULL values.`);
                }
            }
            if (!context.isSaveOperation && !transaction.isSync) {
                // Save operation set Actor ealier (at the entity level, to be returned back to client)
                entityValues[actorIdColumn.index] = actor._localId;
            }
        }
        return {
            actorIdColumn,
            sysWideOperationIdColumn
        };
    }
    /**
     *
     * All repository records must have _localIds when inserted.  Currently AP doesn't support
     * inserting from select and in the values provided id's must either be explicitly
     * specified or already provided. For all repository entities all _localIds must be
     * auto-generated.
     *
     * @param {DbEntity} dbEntity
     * @param {PortableQuery} portableQuery
     * @returns {Promise<void>}
     */
    async addInsertHistory(dbEntity, portableQuery, actor, systemWideOperationId, transaction, rootTransaction, context) {
        const jsonInsertValues = portableQuery.jsonQuery;
        let operationsByRepo = [];
        let repoTransHistories = [];
        const repositoryIdIndex = dbEntity.columnMap[airEntity.REPOSITORY_LID].index;
        const actorIdIndex = dbEntity.columnMap[airEntity.ACTOR_LID].index;
        const actorRecordIdIndex = dbEntity.columnMap[airEntity.ACTOR_RECORD_ID].index;
        let repositoryIdColumnNumber;
        let actorIdColumnNumber;
        let actorRecordIdColumnNumber;
        for (const columnNumber in jsonInsertValues.C) {
            const columnIndex = jsonInsertValues.C[columnNumber];
            switch (columnIndex) {
                case repositoryIdIndex:
                    repositoryIdColumnNumber = columnNumber;
                    break;
                case actorIdIndex:
                    actorIdColumnNumber = columnNumber;
                    break;
                case actorRecordIdIndex:
                    actorRecordIdColumnNumber = columnNumber;
                    break;
            }
        }
        // Rows may belong to different repositories
        for (const row of jsonInsertValues.V) {
            const repositoryId = row[repositoryIdColumnNumber];
            // const repo           = await repoManager.getRepository(repositoryId)
            let repositoryTransactionHistory = repoTransHistories[repositoryId];
            if (!repositoryTransactionHistory) {
                repositoryTransactionHistory = await this.historyManager
                    .getNewRepositoryTransactionHistory(transaction.transactionHistory, repositoryId, context);
            }
            let operationHistory = operationsByRepo[repositoryId];
            if (!operationHistory) {
                operationHistory = this.repositoryTransactionHistoryDuo.startOperation(repositoryTransactionHistory, systemWideOperationId, ChangeType.INSERT_VALUES, dbEntity, actor, rootTransaction);
                operationsByRepo[repositoryId] = operationHistory;
            }
            const _actorRecordId = row[actorRecordIdColumnNumber];
            const actorId = row[actorIdColumnNumber];
            const recordHistory = this.operationHistoryDuo.startRecordHistory(operationHistory, actorId, _actorRecordId);
            for (const columnNumber in jsonInsertValues.C) {
                if (columnNumber === repositoryIdColumnNumber
                    || columnNumber === actorIdColumnNumber
                    || columnNumber === actorRecordIdColumnNumber) {
                    continue;
                }
                const columnIndex = jsonInsertValues.C[columnNumber];
                const dbColumn = dbEntity.columns[columnIndex];
                const newValue = row[columnNumber];
                this.recordHistoryDuo.addNewValue(recordHistory, dbColumn, newValue);
            }
        }
        // for (const repositoryId in operationsByRepo) {
        // 	const repoTransHistory = await
        // 		this.currentTransHistory.getRepositoryTransaction(
        // 			repositoryId, null, null, null, repoTransHistoryDuo);
        // 	repoTransHistory.endGroupMutation(operationsByRepo[repositoryId]);
        // }
    }
};
__decorate([
    Inject()
], InsertManager.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], InsertManager.prototype, "historyManager", void 0);
__decorate([
    Inject()
], InsertManager.prototype, "operationHistoryDuo", void 0);
__decorate([
    Inject()
], InsertManager.prototype, "recordHistoryDuo", void 0);
__decorate([
    Inject()
], InsertManager.prototype, "repositoryTransactionHistoryDuo", void 0);
__decorate([
    Inject()
], InsertManager.prototype, "sequenceGenerator", void 0);
InsertManager = __decorate([
    Injected()
], InsertManager);
export { InsertManager };
//# sourceMappingURL=InsertManager.js.map