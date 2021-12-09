import { AIRPORT_DATABASE, IAirportDatabase } from '@airport/air-control'
import {
	getSysWideOpId,
	ISequenceGenerator,
	SEQUENCE_GENERATOR
} from '@airport/check-in'
import {
	container,
	DI,
} from '@airport/di';
import {
	ChangeType,
	DbColumn,
	DbEntity,
	JsonInsertValues,
	PortableQuery,
	repositoryEntity,
} from '@airport/ground-control'
import {
	IActor,
	IOperationHistory,
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRecordHistoryNewValueDuo,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDuo,
	OPERATION_HISTORY_DUO,
	RECORD_HISTORY_NEW_VALUE_DUO,
	RECORD_HISTORY_DUO,
	REPOSITORY_TRANSACTION_HISTORY_DUO,
	SystemWideOperationId
} from '@airport/holding-pattern'
import {
	IHistoryManager,
	IInsertManager,
	IOperationContext,
	ITransaction,
	RecordId,
} from '@airport/terminal-map'
import {
	HISTORY_MANAGER,
	INSERT_MANAGER,
} from '../tokens'

interface ColumnsToPopulate {
	actorIdColumn: DbColumn
	sysWideOperationIdColumn: DbColumn
}

export class InsertManager
	implements IInsertManager {

	async insertValues(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		context: IOperationContext,
		ensureGeneratedValues?: boolean
	): Promise<number> {
		return <number>await this.internalInsertValues(
			portableQuery, actor, transaction, context, false, ensureGeneratedValues)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		context: IOperationContext,
	): Promise<RecordId[][]> {
		return <RecordId[][]>await this.internalInsertValues(
			portableQuery, actor, transaction, context, true)
	}

	verifyNoGeneratedColumns(
		dbEntity: DbEntity,
		jsonInsertValues: JsonInsertValues,
		errorPrefix: string
	): DbColumn[] {
		for (let i = 0; i < jsonInsertValues.C.length; i++) {
			const columnIndex = jsonInsertValues.C[i]

			const dbColumn = dbEntity.columns[columnIndex]

			if (dbColumn.isGenerated) {
				throw new Error(errorPrefix +
					`You cannot explicitly insert into a @GeneratedValue column '${dbColumn.name}'`)
			}
		}

		return dbEntity.columns.filter(
			dbColumn => dbColumn.isGenerated)
	}

	private async internalInsertValues(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		context: IOperationContext,
		getIds: boolean = false,
		ensureGeneratedValues: boolean = true
	): Promise<number | RecordId[] | RecordId[][]> {
		const [
			airDb,
			sequenceGenerator,
			historyManager,
			operHistoryDuo,
			recHistoryDuo,
			recHistoryNewValueDuo,
			repoTransHistoryDuo
		] = await container(this)
			.get(AIRPORT_DATABASE,
				SEQUENCE_GENERATOR, HISTORY_MANAGER, OPERATION_HISTORY_DUO,
				RECORD_HISTORY_DUO, RECORD_HISTORY_NEW_VALUE_DUO,
				REPOSITORY_TRANSACTION_HISTORY_DUO)

		const dbEntity = airDb.applications[portableQuery.applicationIndex]
			.currentVersion[0].applicationVersion.entities[portableQuery.tableIndex]

		const errorPrefix = `Error inserting into '${dbEntity.name}'.'
`

		this.validateValueRowLength(portableQuery, errorPrefix)

		const jsonInsertValues = portableQuery.jsonQuery as JsonInsertValues

		const columnIndexSet = {}
		let inStatementIndex = 0
		for (const columnIndex of jsonInsertValues.C) {
			if (columnIndex < 0 || columnIndex >= dbEntity.columns.length) {
				throw new Error(errorPrefix +
					`Invalid column index: ${columnIndex}`)
			}
			if (columnIndexSet[columnIndex]) {
				throw new Error(errorPrefix +
					`Column ${dbEntity.name}.${dbEntity.columns[columnIndex].name} 
appears more than once in the Columns clause`)
			}
			let rowNumber = 1
			for (let row of jsonInsertValues.V) {
				if (row[inStatementIndex] === undefined) {
					throw new Error(errorPrefix +
						`
	'undefined' value in column ${dbEntity.name}.${dbEntity.columns[columnIndex].name} of row ${rowNumber}.
	All values in an insert statment must either be null or have a non-null value.`)
				}
				rowNumber++
			}
			inStatementIndex++
			columnIndexSet[columnIndex] = true
		}

		let columnsToPopulate: ColumnsToPopulate

		const insertValues = <JsonInsertValues>portableQuery.jsonQuery

		if (dbEntity.isRepositoryEntity) {
			columnsToPopulate = this.ensureRepositoryEntityIdValues(actor, dbEntity,
				insertValues, errorPrefix, transaction, context)
		}

		let generatedColumns
		if (!transaction.isSync || context.generateOnSync) {
			generatedColumns = this.verifyNoGeneratedColumns(dbEntity,
				<JsonInsertValues>portableQuery.jsonQuery, errorPrefix)
		}

		let ids

		let systemWideOperationId: SystemWideOperationId
		if (!dbEntity.isLocal) {
			systemWideOperationId = await getSysWideOpId(airDb, sequenceGenerator)
		}

		if ((!transaction.isSync || context.generateOnSync) && ensureGeneratedValues) {
			ids = await this.ensureGeneratedValues(
				dbEntity, insertValues, actor,
				columnsToPopulate, generatedColumns,
				systemWideOperationId, errorPrefix,
				sequenceGenerator)
		}

		if (!dbEntity.isLocal && !transaction.isSync) {
			await this.addInsertHistory(
				dbEntity, portableQuery, actor, systemWideOperationId,
				historyManager, operHistoryDuo, recHistoryDuo,
				recHistoryNewValueDuo, repoTransHistoryDuo, transaction, context)
		}

		const numberOfInsertedRecords = await transaction.insertValues(
			portableQuery, context)

		return getIds ? ids : numberOfInsertedRecords
	}

	private async validateValueRowLength(
		portableQuery: PortableQuery,
		errorPrefix: string
	) {
		const values = (portableQuery.jsonQuery as JsonInsertValues).V;
		if (!values.length) {
			throw new Error(errorPrefix + `no colum values provided`)
		}
		const firstValuesRow = values[0];

		if (!firstValuesRow || !firstValuesRow.length) {
			throw new Error(errorPrefix + `First row has no values`)
		}

		const numValuesInRow = firstValuesRow.length;

		for (let i = 0; i < values.length; i++) {
			const valuesRow = values[i]
			if (valuesRow.length !== numValuesInRow) {
				throw new Error(errorPrefix + `First row has ${numValuesInRow} values,
	while row ${i + 1} has ${valuesRow.length} values`)
			}
		}
	}

	private async ensureGeneratedValues(
		dbEntity: DbEntity,
		jsonInsertValues: JsonInsertValues,
		actor: IActor,
		columnsToPopulate: ColumnsToPopulate,
		generatedColumns: DbColumn[],
		systemWideOperationId: SystemWideOperationId,
		errorPrefix: string,
		sequenceGenerator: ISequenceGenerator
	): Promise<RecordId[] | RecordId[][]> {
		const values = jsonInsertValues.V
		const idColumns = dbEntity.idColumns

		const allIds: RecordId[][] = []
		for (const _entityValues of values) {
			allIds.push([])
		}

		let actorIdColumn: DbColumn
		let sysWideOperationIdColumn: DbColumn

		if (!dbEntity.isLocal) {
			actorIdColumn = columnsToPopulate.actorIdColumn
			sysWideOperationIdColumn = columnsToPopulate.sysWideOperationIdColumn
		}

		for (const idColumn of idColumns) {
			if (idColumn.isGenerated) {
				continue
			}

			let isActorIdColumn = false
			let inStatementColumnIndex: number
			const matchingColumns = jsonInsertValues.C.filter(
				(
					columnIndex,
					index
				) => {
					if (columnIndex === idColumn.index) {
						inStatementColumnIndex = index
						return true
					}
				})
			if (matchingColumns.length < 1) {
				// Actor Id cannot be in the insert statement
				if (idColumn.id === actorIdColumn.id) {
					isActorIdColumn = true
					inStatementColumnIndex = jsonInsertValues.C.length
					jsonInsertValues.C.push(actorIdColumn.index)
				} else {
					throw new Error(errorPrefix +
						`Could not find @Id column ${dbEntity.name}.${idColumn.name} in
					the insert statement.  Non-generated @Id columns must be present in the Insert
					statement (with exception of Actor ID).`)
				}
			}

			for (let i = 0; i < values.length; i++) {
				const entityValues = values[i]
				const idValues = allIds[i]
				let idValue
				if (isActorIdColumn) {
					idValue = actor.id
				} else {
					idValue = entityValues[inStatementColumnIndex]
					if (!idValue && idValue !== 0) {
						throw new Error(errorPrefix +
							`No value provided on insert for @Id '${dbEntity.name}.${idColumn.name}'.`)
					}
				}
				idValues[idColumn.index] = idValue
			}
		}

		// if (dbEntity.isRepositoryEntity) {
		// 	const repositoryColumn  = dbEntity.columnMap[repositoryEntity.FOREIGN_KEY]
		// 	const repositoryIdIndex = repositoryColumn.index
		// 	for (const entityValues of values) {
		// 		const repositoryId = entityValues[repositoryIdIndex]
		// 		if (!repositoryId && repositoryId !== 0) {
		// 			throw new Error(`@Column({ name: 'REPOSITORY_ID'}) value is not specified on
		// insert for '${dbEntity0.name}.${repositoryColumn.name}'.`) } } }

		const generatedColumnIndexes: number[] = []
		// let numAddedColumns                    = 0
		for (const generatedColumn of generatedColumns) {
			// const matchingColumns = jsonInsertValues.C.filter(
			// 	columnIndex => columnIndex === generatedColumn.index)
			// if (!matchingColumns.length) {
			// TODO: verify that it is OK to mutate the JsonInsertValues query
			const generatedIdColumnIndex = jsonInsertValues.C.length
			generatedColumnIndexes.push(jsonInsertValues.C.length)
			jsonInsertValues.C.push(generatedColumn.index)
			// numAddedColumns++
			continue
			// }
			// const generatedIdColumnIndex = matchingColumns[0]
			// generatedColumnIndexes.push(generatedIdColumnIndex)
			for (const entityValues of values) {
				const generatedValue = entityValues[generatedIdColumnIndex]
				if (generatedValue || generatedValue === 0) {
					// Allowing negative integers for temporary identification
					// within the circular dependency management lookup
					if (generatedValue >= 0) {
						throw new Error(errorPrefix +
							`Already provided value '${entityValues[generatedColumn.index]}'
					on insert for @GeneratedValue '${dbEntity.name}.${generatedColumn.name}'.
					You cannot explicitly provide values for @GeneratedValue columns'.`)
					}
				}
			}
		}

		// Populating generated values AFTER the checks
		// to not waste sequence numbers on invalid input
		// (thus reducing storage requirements in SqLite)
		const numSequencesNeeded = generatedColumns.map(
			_ => values.length)
		const generatedSequenceValues = await sequenceGenerator.generateSequenceNumbers(
			generatedColumns, numSequencesNeeded)

		generatedColumns.forEach((
			dbColumn,
			generatedColumnIndex
		) => {
			const generatedColumnSequenceValues = generatedSequenceValues[generatedColumnIndex]
			const insertColumnIndex = generatedColumnIndexes[generatedColumnIndex]
			// const columnIndex                   = dbColumn.index
			values.forEach((
				entityValues,
				index
			) => {
				const generatedValue = generatedColumnSequenceValues[index]
				entityValues[insertColumnIndex] = generatedValue
				allIds[index][dbColumn.index] = generatedValue
			})
		})

		if (!dbEntity.isLocal) {
			jsonInsertValues.C.push(sysWideOperationIdColumn.index)
			values.forEach(
				entityValues => {
					entityValues.push(systemWideOperationId)
				})
		}

		if (!idColumns.length && !generatedColumns.length) {
			return values.length as any
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

		return allIds
	}

	private ensureRepositoryEntityIdValues(
		actor: IActor,
		dbEntity: DbEntity,
		jsonInsertValues: JsonInsertValues,
		errorPrefix: string,
		transaction: ITransaction,
		context: IOperationContext
	): ColumnsToPopulate {
		const actorIdColumn = dbEntity.idColumnMap[repositoryEntity.ACTOR_ID]
		const actorRecordIdColumn = dbEntity.idColumnMap[repositoryEntity.ACTOR_RECORD_ID]
		const repositoryIdColumn = dbEntity.idColumnMap[repositoryEntity.REPOSITORY_ID]
		const sysWideOperationIdColumn = dbEntity.columnMap[repositoryEntity.SYSTEM_WIDE_OPERATION_ID]

		let repositoryIdColumnQueryIndex

		let foundActorIdColumn = false
		let foundActorRecordIdColumn = false
		let foundSystemWideOperationIdColumn = false

		for (let i = 0; i < jsonInsertValues.C.length; i++) {
			const columnIndex = jsonInsertValues.C[i]
			switch (columnIndex) {
				case actorIdColumn.index:
					foundActorIdColumn = true
					if (context.isSaveOperation) {
						// Save operations validate Actor ealier and set it on the entity objects
						break;
					}
					if (!transaction.isSync) {
						throw new Error(errorPrefix +
							`You cannot explicitly provide an ACTOR_ID value for Repository entities.`)
					}
					break
				case actorRecordIdColumn.index:
					foundActorRecordIdColumn = true
					if (!transaction.isSync) {
						throw new Error(errorPrefix +
							`You cannot explicitly provide an ACTOR_RECORD_ID value for Repository entities.`)
					}
					break
				case sysWideOperationIdColumn.index:
					foundSystemWideOperationIdColumn = true
					if (!transaction.isSync) {
						throw new Error(`Error inserting into '${dbEntity.name}'.
You cannot explicitly provide a SYSTEM_WIDE_OPERATION_ID value for Repository entities.`)
					}
					break
				case repositoryIdColumn.index:
					repositoryIdColumnQueryIndex = i
					break
			}
		}

		const missingRepositoryIdErrorMsg = errorPrefix +
			`Error inserting into '${dbEntity.name}'.
You must provide a valid REPOSITORY_ID value for Repository entities.`

		if (repositoryIdColumnQueryIndex === undefined) {
			throw new Error(missingRepositoryIdErrorMsg)
		}

		if (transaction.isSync) {
			if (!foundActorIdColumn) {
				throw new Error(errorPrefix +
					`ACTOR_ID must be provided for sync operations.`)
			}
			if (!foundActorRecordIdColumn) {
				throw new Error(errorPrefix +
					`ACTOR_RECORD_ID must be provided for sync operations.`)
			}
			if (!foundSystemWideOperationIdColumn) {
				throw new Error(errorPrefix +
					`SYSTEM_WIDE_OPERATION_ID must be provided for sync operations.`)
			}
		}

		for (const entityValues of jsonInsertValues.V) {
			if (entityValues.length !== jsonInsertValues.C.length) {
				throw new Error(errorPrefix +
					`Number of columns (${jsonInsertValues.C.length}) does not match number of values (${entityValues.length}).
				`)
			}

			let repositoryId = entityValues[repositoryIdColumnQueryIndex]
			if (typeof repositoryId !== 'number'
				|| !Number.isInteger(repositoryId)
				|| repositoryId < 1) {
				throw new Error(missingRepositoryIdErrorMsg)
			}

			for (let i = 0; i < entityValues.length; i++) {
				switch (i) {
					case repositoryIdColumnQueryIndex:
						continue
				}
				const value = entityValues[i]

				const columnIndex = jsonInsertValues.C[i]
				const dbColumn = dbEntity.columns[columnIndex]

				if (dbColumn.notNull && value === null) {
					throw new Error(errorPrefix +
						`Column '${dbColumn.name}' is NOT NULL
and cannot have NULL values.`)
				}
			}
			if (!context.isSaveOperation && !transaction.isSync) {
				// Save operation set Actor ealier (at the entity level, to be returned back to client)
				entityValues[actorIdColumn.index] = actor.id
			}
		}

		return {
			actorIdColumn,
			sysWideOperationIdColumn
		}
	}

	/**
	 *
	 * All repository records must have ids when inserted.  Currently AP doesn't support
	 * inserting from select and in the values provided id's must either be explicitly
	 * specified or already provided. For all repository entities all ids must be
	 * auto-generated.
	 *
	 * @param {DbEntity} dbEntity
	 * @param {PortableQuery} portableQuery
	 * @returns {Promise<void>}
	 */
	private async addInsertHistory(
		dbEntity: DbEntity,
		portableQuery: PortableQuery,
		actor: IActor,
		systemWideOperationId: SystemWideOperationId,
		histManager: IHistoryManager,
		operHistoryDuo: IOperationHistoryDuo,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryNewValueDuo: IRecordHistoryNewValueDuo,
		repoTransHistoryDuo: IRepositoryTransactionHistoryDuo,
		transaction: ITransaction,
		context: IOperationContext
	): Promise<void> {
		const jsonInsertValues = <JsonInsertValues>portableQuery.jsonQuery

		let operationsByRepo: IOperationHistory[] = []
		let repoTransHistories: IRepositoryTransactionHistory[] = []

		const repositoryIdIndex = dbEntity.columnMap[repositoryEntity.REPOSITORY_ID].index
		const actorIdIndex = dbEntity.columnMap[repositoryEntity.ACTOR_ID].index
		const actorRecordIdIndex = dbEntity.columnMap[repositoryEntity.ACTOR_RECORD_ID].index

		let repositoryIdColumnNumber
		let actorIdColumnNumber
		let actorRecordIdColumnNumber
		for (const columnNumber in jsonInsertValues.C) {
			const columnIndex = jsonInsertValues.C[columnNumber]
			switch (columnIndex) {
				case repositoryIdIndex:
					repositoryIdColumnNumber = columnNumber
					break
				case actorIdIndex:
					actorIdColumnNumber = columnNumber
					break
				case actorRecordIdIndex:
					actorRecordIdColumnNumber = columnNumber
					break
			}
		}

		// Rows may belong to different repositories
		for (const row of jsonInsertValues.V) {
			const repositoryId = row[repositoryIdColumnNumber]
			// const repo           = await repoManager.getRepository(repositoryId)
			let repoTransHistory = repoTransHistories[repositoryId]
			if (!repoTransHistory) {
				repoTransHistory = await histManager
					.getNewRepositoryTransactionHistory(transaction.transHistory,
						repositoryId, actor, context)
			}

			let operationHistory = operationsByRepo[repositoryId]
			if (!operationHistory) {
				operationHistory = repoTransHistoryDuo.startOperation(
					repoTransHistory, systemWideOperationId, ChangeType.INSERT_VALUES,
					dbEntity, operHistoryDuo)
				operationsByRepo[repositoryId] = operationHistory
			}

			const actorRecordId = row[actorRecordIdColumnNumber]
			const actorId = row[actorIdColumnNumber]
			const recordHistory = operHistoryDuo.startRecordHistory(
				operationHistory, actorId, actorRecordId, recHistoryDuo)

			for (const columnNumber in jsonInsertValues.C) {
				if (columnNumber === repositoryIdColumnNumber
					|| columnNumber === actorIdColumnNumber
					|| columnNumber === actorRecordIdColumnNumber) {
					continue
				}
				const columnIndex = jsonInsertValues.C[columnNumber]
				const dbColumn = dbEntity.columns[columnIndex]
				const newValue = row[columnNumber]
				recHistoryDuo.addNewValue(recordHistory, dbColumn, newValue,
					recHistoryNewValueDuo)
			}
		}

		// for (const repositoryId in operationsByRepo) {
		// 	const repoTransHistory = await
		// 		this.currentTransHistory.getRepositoryTransaction(
		// 			repositoryId, null, null, null, repoTransHistoryDuo);
		// 	repoTransHistory.endGroupMutation(operationsByRepo[repositoryId]);
		// }
	}

}

DI.set(INSERT_MANAGER, InsertManager)
