import {
	IAirportDatabase,
	DbSystemWideOperationIdUtils,
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ChangeType,
	DbColumn,
	DbEntity,
	Dictionary,
	IRootTransaction,
	QueryInsertValues,
	PortableQuery,
	ISequenceGenerator,
	SystemWideOperationId,
	IActor,
	IOperationHistory,
	IRepositoryTransactionHistory,
} from '@airport/ground-control'
import {
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRepositoryTransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle'
import {
	IHistoryManager,
	IInsertManager,
	IOperationContext,
	ITransaction,
	Record_LocalId,
} from '@airport/terminal-map'

interface ColumnsToPopulate {
	actorIdColumn: DbColumn
	sysWideOperationIdColumn: DbColumn
}

@Injected()
export class InsertManager
	implements IInsertManager {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	dictionary: Dictionary

	@Inject()
	historyManager: IHistoryManager

	@Inject()
	operationHistoryDuo: IOperationHistoryDuo

	@Inject()
	recordHistoryDuo: IRecordHistoryDuo

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	systemWideOperationIdUtils: DbSystemWideOperationIdUtils

	@Inject()
	sequenceGenerator: ISequenceGenerator

	async insertValues(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context: IOperationContext,
		ensureGeneratedValues?: boolean
	): Promise<number> {
		return <number>await this.internalInsertValues(
			portableQuery, actor, transaction, rootTransaction,
			context, false, ensureGeneratedValues)
	}

	async insertValuesGetLocalIds(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context: IOperationContext,
	): Promise<Record_LocalId[][]> {
		return <Record_LocalId[][]>await this.internalInsertValues(
			portableQuery, actor, transaction,
			rootTransaction, context, true)
	}

	verifyNoGeneratedColumns(
		dbEntity: DbEntity,
		queryInsertValues: QueryInsertValues,
		errorPrefix: string
	): DbColumn[] {
		for (let i = 0; i < queryInsertValues.COLUMNS.length; i++) {
			const columnIndex = queryInsertValues.COLUMNS[i]

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
		rootTransaction: IRootTransaction,
		context: IOperationContext,
		getIds: boolean = false,
		ensureGeneratedValues: boolean = true
	): Promise<number | Record_LocalId[] | Record_LocalId[][]> {
		const values = (portableQuery.query as QueryInsertValues).VALUES
		if (!values || !values.length) {
			return getIds ? [] : 0
		}

		const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
			.currentVersion[0].applicationVersion.entities[portableQuery.entityIndex]

		const errorPrefix = `Error inserting into '${dbEntity.name}'.'
`

		this.validateValueRowLength(portableQuery, errorPrefix)

		const queryInsertValues = portableQuery.query as QueryInsertValues

		const columnIndexSet = {}
		let inStatementIndex = 0
		for (const columnIndex of queryInsertValues.COLUMNS) {
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
			for (let row of queryInsertValues.VALUES) {
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

		const insertValues = <QueryInsertValues>portableQuery.query

		if (dbEntity.isAirEntity) {
			columnsToPopulate = this.ensureAirEntityIdValues(actor, dbEntity,
				insertValues, errorPrefix, transaction, context)
		}

		let generatedColumns
		if (!transaction.isRepositorySync || context.generateOnSync) {
			generatedColumns = this.verifyNoGeneratedColumns(dbEntity,
				<QueryInsertValues>portableQuery.query, errorPrefix)
		}

		let _localIds

		let systemWideOperationId: SystemWideOperationId
		if (!dbEntity.isLocal) {
			systemWideOperationId = await this.systemWideOperationIdUtils
				.getSysWideOpId()
		}

		if ((!transaction.isRepositorySync || context.generateOnSync) && ensureGeneratedValues) {
			_localIds = await this.ensureGeneratedValues(
				dbEntity, insertValues, actor,
				columnsToPopulate, generatedColumns,
				systemWideOperationId, errorPrefix)
		}

		if (dbEntity.isLocal) {
			if (transaction.transactionHistory) {
				transaction.transactionHistory.allModifiedColumnsMap
					.ensureEntity(dbEntity, true)
			}
		} else if (!transaction.isRepositorySync) {
			await this.addInsertHistory(
				dbEntity, portableQuery, actor, systemWideOperationId,
				transaction, rootTransaction, context)
		}

		const numberOfInsertedRecords = await transaction.insertValues(
			portableQuery, context)

		return getIds ? _localIds : numberOfInsertedRecords
	}

	private async validateValueRowLength(
		portableQuery: PortableQuery,
		errorPrefix: string
	) {
		const values = (portableQuery.query as QueryInsertValues).VALUES;
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
		queryInsertValues: QueryInsertValues,
		actor: IActor,
		columnsToPopulate: ColumnsToPopulate,
		generatedColumns: DbColumn[],
		systemWideOperationId: SystemWideOperationId,
		errorPrefix: string
	): Promise<Record_LocalId[] | Record_LocalId[][]> {
		const values = queryInsertValues.VALUES
		const idColumns = dbEntity.idColumns

		const allIds: Record_LocalId[][] = []
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
			const matchingColumns = queryInsertValues.COLUMNS.filter(
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
				if (idColumn._localId === actorIdColumn._localId) {
					isActorIdColumn = true
					inStatementColumnIndex = queryInsertValues.COLUMNS.length
					queryInsertValues.COLUMNS.push(actorIdColumn.index)
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
					idValue = actor._localId
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

		// if (dbEntity.isAirEntity) {
		// 	const repositoryColumn  = dbEntity.columnMap[airEntity.FOREIGN_KEY]
		// 	const repositoryIdIndex = repositoryColumn.index
		// 	for (const entityValues of values) {
		// 		const repositoryId = entityValues[repositoryIdIndex]
		// 		if (!repositoryId && repositoryId !== 0) {
		// 			throw new Error(`@Column({ name: 'REPOSITORY_LID'}) value is not specified on
		// insert for '${dbEntity0.name}.${repositoryColumn.name}'.`) } } }

		const generatedColumnIndexes: number[] = []
		// let numAddedColumns                    = 0
		for (const generatedColumn of generatedColumns) {
			// const matchingColumns = queryInsertValues.COLUMNS.filter(
			// 	columnIndex => columnIndex === generatedColumn.index)
			// if (!matchingColumns.length) {
			// TODO: verify that it is OK to mutate the QueryInsertValues query
			const generatedIdColumnIndex = queryInsertValues.COLUMNS.length
			generatedColumnIndexes.push(queryInsertValues.COLUMNS.length)
			queryInsertValues.COLUMNS.push(generatedColumn.index)
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
		const generatedSequenceValues = await this.sequenceGenerator.generateSequenceNumbers(
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
			queryInsertValues.COLUMNS.push(sysWideOperationIdColumn.index)
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

	private ensureAirEntityIdValues(
		actor: IActor,
		dbEntity: DbEntity,
		queryInsertValues: QueryInsertValues,
		errorPrefix: string,
		transaction: ITransaction,
		context: IOperationContext
	): ColumnsToPopulate {
		const airEntityColumns = this.dictionary.AirEntity.columns
		const actorIdColumn = dbEntity.idColumnMap[airEntityColumns.ACTOR_LID]
		const actorRecordIdColumn = dbEntity.idColumnMap[airEntityColumns.ACTOR_RECORD_ID]
		const repositoryIdColumn = dbEntity.idColumnMap[airEntityColumns.REPOSITORY_LID]
		const sysWideOperationIdColumn = dbEntity.columnMap[airEntityColumns.SYSTEM_WIDE_OPERATION_LID]

		let repositoryIdColumnQueryIndex

		let foundActorIdColumn = false
		let foundActorRecordIdColumn = false
		let foundSystemWideOperationIdColumn = false

		for (let i = 0; i < queryInsertValues.COLUMNS.length; i++) {
			const columnIndex = queryInsertValues.COLUMNS[i]
			switch (columnIndex) {
				case actorIdColumn.index:
					foundActorIdColumn = true
					if (context.isSaveOperation) {
						// Save operations validate Actor ealier and set it on the entity objects
						break;
					}
					if (!transaction.isRepositorySync) {
						throw new Error(errorPrefix +
							`You cannot explicitly provide an ACTOR_LID value for Repository entities.`)
					}
					break
				case actorRecordIdColumn.index:
					foundActorRecordIdColumn = true
					if (!transaction.isRepositorySync) {
						throw new Error(errorPrefix +
							`You cannot explicitly provide an ACTOR_RECORD_ID value for Repository entities.`)
					}
					break
				case sysWideOperationIdColumn.index:
					foundSystemWideOperationIdColumn = true
					if (!transaction.isRepositorySync) {
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
You must provide a valid REPOSITORY_LID value for Repository entities.`

		if (repositoryIdColumnQueryIndex === undefined) {
			throw new Error(missingRepositoryIdErrorMsg)
		}

		if (transaction.isRepositorySync) {
			if (!foundActorIdColumn) {
				throw new Error(errorPrefix +
					`ACTOR_LID must be provided for sync operations.`)
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

		for (const entityValues of queryInsertValues.VALUES) {
			if (entityValues.length !== queryInsertValues.COLUMNS.length) {
				throw new Error(errorPrefix +
					`Number of columns (${queryInsertValues.COLUMNS.length}) does not match number of values (${entityValues.length}).
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

				const columnIndex = queryInsertValues.COLUMNS[i]
				const dbColumn = dbEntity.columns[columnIndex]

				if (dbColumn.notNull && value === null) {
					throw new Error(errorPrefix +
						`Column '${dbColumn.name}' is NOT NULL
and cannot have NULL values.`)
				}
			}
			if (!context.isSaveOperation && !transaction.isRepositorySync) {
				// Save operation set Actor ealier (at the entity level, to be returned back to client)
				entityValues[actorIdColumn.index] = actor._localId
			}
		}

		return {
			actorIdColumn,
			sysWideOperationIdColumn
		}
	}

	/**
	 *
	 * All repository records must have _localIds when inserted.  Currently AP doesn't support
	 * inserting from SELECT and in the values provided id's must either be explicitly
	 * specified or already provided. For all repository entities all _localIds must be
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
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context: IOperationContext
	): Promise<void> {
		const queryInsertValues = <QueryInsertValues>portableQuery.query

		let operationsByRepo: IOperationHistory[] = []
		let repoTransHistories: IRepositoryTransactionHistory[] = []

		const airEntityColumns = this.dictionary.AirEntity.columns
		const repositoryIdIndex = dbEntity.columnMap[airEntityColumns.REPOSITORY_LID].index
		const actorIdIndex = dbEntity.columnMap[airEntityColumns.ACTOR_LID].index
		const actorRecordIdIndex = dbEntity.columnMap[airEntityColumns.ACTOR_RECORD_ID].index

		let repositoryIdColumnNumber
		let actorIdColumnNumber
		let actorRecordIdColumnNumber
		for (const columnNumber in queryInsertValues.COLUMNS) {
			const columnIndex = queryInsertValues.COLUMNS[columnNumber]
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
		for (const row of queryInsertValues.VALUES) {
			const repositoryId = row[repositoryIdColumnNumber]
			// const repo           = await repoManager.getRepository(repositoryId)
			let repositoryTransactionHistory = repoTransHistories[repositoryId]
			if (!repositoryTransactionHistory) {
				repositoryTransactionHistory = await this.historyManager
					.getRepositoryTransactionHistory(transaction.transactionHistory,
						repositoryId, actor, null, context)
			}

			let operationHistory = operationsByRepo[repositoryId]
			if (!operationHistory) {
				operationHistory = this.repositoryTransactionHistoryDuo.startOperation(
					repositoryTransactionHistory, systemWideOperationId, ChangeType.INSERT_VALUES,
					dbEntity, rootTransaction)
				operationsByRepo[repositoryId] = operationHistory
			}

			const _actorRecordId = row[actorRecordIdColumnNumber]
			const actorId = row[actorIdColumnNumber]
			const recordHistory = this.operationHistoryDuo.startRecordHistory(
				operationHistory, actorId, _actorRecordId)

			for (const columnNumber in queryInsertValues.COLUMNS) {
				if (columnNumber === repositoryIdColumnNumber
					|| columnNumber === actorIdColumnNumber
					|| columnNumber === actorRecordIdColumnNumber) {
					continue
				}
				const columnIndex = queryInsertValues.COLUMNS[columnNumber]
				const dbColumn = dbEntity.columns[columnIndex]
				const newValue = row[columnNumber]
				this.recordHistoryDuo.addNewValue(recordHistory, dbColumn, newValue)
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
