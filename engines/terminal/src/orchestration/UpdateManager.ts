import {
	IQueryFacade,
	RepositorySheetSelectInfo,
	SheetQuery
} from '@airport/air-control'
import {
	getSysWideOpId,
	ISequenceGenerator
} from '@airport/check-in'
import {
	container,
	DEPENDENCY_INJECTION
} from '@airport/direction-indicator'
import {
	ChangeType,
	ColumnIndex,
	DbColumn,
	ensureChildArray,
	ensureChildMap,
	InternalFragments,
	IRootTransaction,
	JsonSheetQuery,
	JsonUpdate,
	PortableQuery,
	QueryResultType,
	repositoryEntity,
} from '@airport/ground-control'
import {
	IActor,
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRecordHistoryNewValueDuo,
	IRecordHistoryOldValueDuo,
	IRepositoryTransactionHistoryDuo,
	OPERATION_HISTORY_DUO,
	RECORD_HISTORY_NEW_VALUE_DUO,
	RECORD_HISTORY_OLD_VALUE_DUO,
	RECORD_HISTORY_DUO,
	REPOSITORY_TRANSACTION_HISTORY_DUO,
	RepositoryEntity_SystemWideOperationId,
	SystemWideOperationId
} from '@airport/holding-pattern'
import {
	IHistoryManager,
	IOperationContext,
	ITransaction,
	IUpdateManager,
	RecordHistoryMap
} from '@airport/terminal-map'
import {
	HISTORY_MANAGER,
	UPDATE_MANAGER
} from '../tokens'

export class UpdateManager
	implements IUpdateManager {

	queryFacade: IQueryFacade
	sequenceGenerator: ISequenceGenerator

	async updateValues(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context: IOperationContext
	): Promise<number> {
		const [
			historyManager,
			operHistoryDuo,
			recHistoryDuo,
			recHistoryNewValueDuo,
			recHistoryOldValueDuo,
			repoTransHistoryDuo] = await container(this)
				.get(HISTORY_MANAGER,
					OPERATION_HISTORY_DUO, RECORD_HISTORY_DUO,
					RECORD_HISTORY_NEW_VALUE_DUO, RECORD_HISTORY_OLD_VALUE_DUO,
					REPOSITORY_TRANSACTION_HISTORY_DUO)

		const dbEntity = context.ioc.airDb.applications[portableQuery.applicationIndex]
			.currentVersion[0].applicationVersion.entities[portableQuery.tableIndex]

		const errorPrefix = `Error updating '${dbEntity.name}'
`

		const internalFragments: InternalFragments = {
			SET: []
		}

		let recordHistoryMap: RecordHistoryMap
		let repositorySheetSelectInfo: RepositorySheetSelectInfo
		let systemWideOperationId: SystemWideOperationId
		if (!dbEntity.isLocal && !transaction.isSync) {

			systemWideOperationId = await getSysWideOpId(
				context.ioc.airDb, this.sequenceGenerator);

			// TODO: For entity queries an additional query really shouldn't be needed
			// Specifically for entity queries, we got the new values, just record them
			// This will require an additional operation on the first update
			// where the original values of the record are saved
			// This eats up more disk space but saves on operations that need
			// to be performed (one less query)
			[recordHistoryMap, repositorySheetSelectInfo]
				= await this.addUpdateHistory(
					portableQuery, actor, systemWideOperationId, errorPrefix,
					historyManager, operHistoryDuo, recHistoryDuo, recHistoryOldValueDuo,
					repoTransHistoryDuo, transaction, rootTransaction, context)

			internalFragments.SET.push({
				column: repositorySheetSelectInfo.systemWideOperationIdColumn,
				value: systemWideOperationId
			})
		}

		const numUpdatedRows = await transaction
			.updateWhere(portableQuery, internalFragments, context)

		if (!dbEntity.isLocal && !transaction.isSync) {
			const previousDbEntity = context.dbEntity
			context.dbEntity = dbEntity
			// TODO: Entity based updates already have all of the new values being
			// updated, detect the type of update and if entity just pull out
			// the new values from them
			await this.addNewValueHistory(
				<JsonUpdate<any>>portableQuery.jsonQuery,
				recordHistoryMap, systemWideOperationId,
				repositorySheetSelectInfo, errorPrefix,
				recHistoryDuo, recHistoryNewValueDuo,
				transaction, context)
			context.dbEntity = previousDbEntity
		}

		return numUpdatedRows
	}

	private async addUpdateHistory(
		portableQuery: PortableQuery,
		actor: IActor,
		systemWideOperationId: SystemWideOperationId,
		errorPrefix: string,
		historyManager: IHistoryManager,
		operHistoryDuo: IOperationHistoryDuo,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryOldValueDuo: IRecordHistoryOldValueDuo,
		repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context: IOperationContext
	): Promise<[
		RecordHistoryMap,
		RepositorySheetSelectInfo
	]> {
		if (!context.dbEntity.isRepositoryEntity) {
			throw new Error(errorPrefix +
				`Cannot add update history for a non-RepositoryEntity`)
		}

		const qEntity = context.ioc.airDb
			.qApplications[context.dbEntity.applicationVersion.application.index][context.dbEntity.name]
		const jsonUpdate: JsonUpdate<any> = <JsonUpdate<any>>portableQuery.jsonQuery
		const getSheetSelectFromSetClauseResult = context.ioc.applicationUtils.getSheetSelectFromSetClause(
			context.dbEntity, qEntity, jsonUpdate.S, errorPrefix)

		const sheetQuery = new SheetQuery(null)

		const jsonSelectClause = sheetQuery.nonDistinctSelectClauseToJSON(
			getSheetSelectFromSetClauseResult.selectClause, context.ioc.queryUtils,
			context.ioc.fieldUtils)

		const jsonSelect: JsonSheetQuery = {
			S: jsonSelectClause,
			F: [jsonUpdate.U],
			W: jsonUpdate.W,
		}
		const portableSelect: PortableQuery = {
			applicationIndex: portableQuery.applicationIndex,
			tableIndex: portableQuery.tableIndex,
			jsonQuery: jsonSelect,
			queryResultType: QueryResultType.SHEET,
			parameterMap: portableQuery.parameterMap,
			// values: portableQuery.values,
		}
		const recordsToUpdate = await transaction.find<any, Array<any>>(
			portableSelect, {}, context)

		const {
			recordsByRepositoryId,
			repositoryIdSet
		} = this.groupRecordsByRepository(
			recordsToUpdate, getSheetSelectFromSetClauseResult)

		const repositoryIds: number[] = Array.from(repositoryIdSet)

		const recordHistoryMapByRecordId: RecordHistoryMap = {}

		for (const repositoryId of repositoryIds) {
			// const repository                         = repositories.get(repositoryId)
			const recordHistoryMapForRepository = {}
			recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository
			const repositoryTransactionHistory = await historyManager.getNewRepositoryTransactionHistory(
				transaction.transactionHistory, repositoryId, context
			)
			const operationHistory = repositoryTransactionHistoryDuo.startOperation(
				repositoryTransactionHistory, systemWideOperationId, ChangeType.UPDATE_ROWS,
				context.dbEntity, actor, operHistoryDuo, rootTransaction)

			const recordsForRepositoryId = recordsByRepositoryId[repositoryId]
			for (const recordToUpdate of recordsForRepositoryId) {
				const actorId = recordToUpdate[
					getSheetSelectFromSetClauseResult.actorIdColumnIndex]
				const recordHistoryMapForActor =
					ensureChildMap(recordHistoryMapForRepository, actorId)

				const actorRecordId = recordToUpdate[
					getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex]
				const recordHistory = operHistoryDuo.startRecordHistory(
					operationHistory, actorId, actorRecordId, recHistoryDuo)
				recordHistoryMapForActor[actorRecordId] = recordHistory

				for (let i = 0; i < recordToUpdate.length; i++) {
					switch (i) {
						case getSheetSelectFromSetClauseResult.actorIdColumnIndex:
						case getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex:
						case getSheetSelectFromSetClauseResult.repositoryIdColumnIndex:
							continue
					}
					const dbColumn = getSheetSelectFromSetClauseResult
						.selectClause[i].dbColumn
					const value = recordToUpdate[i]
					recHistoryDuo.addOldValue(recordHistory, dbColumn, value,
						recHistoryOldValueDuo)
				}
			}
		}

		return [recordHistoryMapByRecordId, getSheetSelectFromSetClauseResult]
	}

	private async addNewValueHistory(
		jsonUpdate: JsonUpdate<any>,
		recordHistoryMapByRecordId: RecordHistoryMap,
		systemWideOperationId: RepositoryEntity_SystemWideOperationId,
		repositorySheetSelectInfo: RepositorySheetSelectInfo,
		errorPrefix: string,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryNewValueDuo: IRecordHistoryNewValueDuo,
		transaction: ITransaction,
		context: IOperationContext
	): Promise<void> {
		const qEntity = context.ioc.airDb.qApplications
		[context.dbEntity.applicationVersion.application.index][context.dbEntity.name]

		const sheetQuery = new SheetQuery({
			from: [
				qEntity
			],
			select: [],
			where: qEntity[repositoryEntity.systemWideOperationId]
				.equals(systemWideOperationId)
		})

		let portableSelect = this.queryFacade.getPortableQuery(
			sheetQuery, QueryResultType.SHEET, context)

		const resultSetIndexByColumnIndex: Map<ColumnIndex, number> = new Map()

		const selectDbColumns: DbColumn[] = []
		let i = 0
		for (const qField of repositorySheetSelectInfo.selectClause) {
			const dbColumn = qField.dbColumn
			selectDbColumns.push(dbColumn)
			resultSetIndexByColumnIndex.set(dbColumn.index, i)
			i++
		}

		const internalFragments: InternalFragments = {
			SELECT: selectDbColumns
		}

		const updatedRecords = await transaction.find<any, Array<any>>(
			portableSelect, internalFragments, context)

		const {
			recordsByRepositoryId,
			repositoryIdSet
		} = this.groupRecordsByRepository(
			updatedRecords, repositorySheetSelectInfo)

		for (const repositoryId of repositoryIdSet) {
			const recordsForRepositoryId = recordsByRepositoryId[repositoryId]
			for (const updatedRecord of recordsForRepositoryId) {
				const repositoryId = updatedRecord[resultSetIndexByColumnIndex.get(
					repositorySheetSelectInfo.repositoryIdColumnIndex)]
				const actorId = updatedRecord[resultSetIndexByColumnIndex.get(
					repositorySheetSelectInfo.actorIdColumnIndex)]
				const actorRecordId = updatedRecord[resultSetIndexByColumnIndex.get(
					repositorySheetSelectInfo.actorRecordIdColumnIndex)]
				const recordHistory = recordHistoryMapByRecordId
				[repositoryId][actorId][actorRecordId]
				for (const columnName in jsonUpdate.S) {
					const dbColumn = context.dbEntity.columnMap[columnName]
					const value = updatedRecord[resultSetIndexByColumnIndex.get(dbColumn.index)]

					if (value === undefined) {
						throw new Error(errorPrefix + `Values cannot be 'undefined'.`)
					}
					if (dbColumn.notNull && value === null) {
						throw new Error(errorPrefix + `Column '${dbColumn.entity.name}'.'${dbColumn.name}' is NOT NULL
						and cannot have NULL values.`)
					}
					recHistoryDuo.addNewValue(recordHistory, dbColumn, value,
						recHistoryNewValueDuo)
				}
			}
		}
	}

	private groupRecordsByRepository(
		records,
		repositorySheetSelectInfo: RepositorySheetSelectInfo
	): {
		recordsByRepositoryId: {
			[repositoryId
				:
				number
			]:
			any[]
		}
		repositoryIdSet: Set<number>
	} {

		const recordsByRepositoryId: { [repositoryId: number]: any[] }
			= {}
		const repositoryIdSet = new Set<number>()
		for (const recordToUpdate of records) {
			const repositoryId = recordToUpdate[repositorySheetSelectInfo.repositoryIdColumnIndex]
			repositoryIdSet.add(repositoryId)
			const recordsForRepositoryId =
				ensureChildArray(recordsByRepositoryId, repositoryId)
			recordsForRepositoryId.push(recordToUpdate)
		}

		return {
			recordsByRepositoryId,
			repositoryIdSet
		}
	}

}

DEPENDENCY_INJECTION.set(UPDATE_MANAGER, UpdateManager)
