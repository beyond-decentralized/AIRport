import {
	IAirportDatabase,
	DbSystemWideOperationIdUtils
} from '@airport/air-traffic-control'
import {
	IFieldUtils,
	IQueryUtils,
	IQueryRelationManager,
	RepositorySheetSelectInfo,
	SheetQuery
} from '@airport/tarmaq-query'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ChangeType,
	DbColumn_Index,
	DbColumn,
	Dictionary,
	InternalFragments,
	IRootTransaction,
	QuerySheet,
	QueryUpdate,
	PortableQuery,
	QueryResultType,
	IDatastructureUtils,
	SystemWideOperationId,
	IActor,
} from '@airport/ground-control'
import {
	IHistoryManager,
	IOperationContext,
	ITransaction,
	IUpdateManager,
	RecordHistoryMap
} from '@airport/terminal-map'
import { IQueryFacade } from '@airport/tarmaq-dao'
import {
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRepositoryTransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle' // Default import is reserved for Application use

@Injected()
export class UpdateManager
	implements IUpdateManager {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	fieldUtils: IFieldUtils

	@Inject()
	historyManager: IHistoryManager

	@Inject()
	operationHistoryDuo: IOperationHistoryDuo

	@Inject()
	queryFacade: IQueryFacade

	@Inject()
	queryRelationManager: IQueryRelationManager

	@Inject()
	queryUtils: IQueryUtils

	@Inject()
	recordHistoryDuo: IRecordHistoryDuo

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	systemWideOperationIdUtils: DbSystemWideOperationIdUtils

	async updateValues(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context: IOperationContext
	): Promise<number> {
		const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
			.currentVersion[0].applicationVersion.entities[portableQuery.entityIndex]

		const errorPrefix = `Error updating '${dbEntity.name}'
`
		const internalFragments: InternalFragments = {
			SET: []
		}

		let recordHistoryMap: RecordHistoryMap
		let repositorySheetSelectInfo: RepositorySheetSelectInfo
		let systemWideOperationId: SystemWideOperationId
		if (!dbEntity.isLocal && !transaction.isSync) {

			systemWideOperationId = await this.systemWideOperationIdUtils
				.getSysWideOpId();

			// TODO: For entity queries an additional query really shouldn't be needed
			// Specifically for entity queries, we got the new values, just record them
			// This will require an additional operation on the first update
			// where the original values of the record are saved
			// This eats up more disk space but saves on operations that need
			// to be performed (one less query)
			[recordHistoryMap, repositorySheetSelectInfo]
				= await this.addUpdateHistory(
					portableQuery, actor, systemWideOperationId, errorPrefix,
					transaction, rootTransaction, context)

			internalFragments.SET.push({
				column: repositorySheetSelectInfo.systemWideOperationIdColumn,
				value: systemWideOperationId
			})
		}

		const numUpdatedRows = await transaction
			.updateWhere(portableQuery, internalFragments, context)

		if (dbEntity.isLocal) {
			if (transaction.transactionHistory) {
				transaction.transactionHistory.allModifiedColumnsMap
					.ensureEntity(dbEntity, true)
			}
		} else if (!transaction.isSync) {
			const previousDbEntity = context.dbEntity
			context.dbEntity = dbEntity
			// TODO: Entity based updates already have all of the new values being
			// updated, detect the type of update and if entity just pull out
			// the new values from them
			await this.addNewValueHistory(
				<QueryUpdate<any>>portableQuery.query,
				recordHistoryMap, systemWideOperationId,
				repositorySheetSelectInfo, errorPrefix,
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
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context: IOperationContext
	): Promise<[
		RecordHistoryMap,
		RepositorySheetSelectInfo
	]> {
		if (!context.dbEntity.isAirEntity) {
			throw new Error(errorPrefix +
				`Cannot add update history for a non-AirEntity`)
		}

		const qEntity = this.airportDatabase
			.qApplications[context.dbEntity.applicationVersion.application.index][context.dbEntity.name]
		const queryUpdate: QueryUpdate<any> = <QueryUpdate<any>>portableQuery.query
		const getSheetSelectFromSetClauseResult = this.queryUtils.getSheetSelectFromSetClause(
			context.dbEntity, qEntity, queryUpdate.SELECT, errorPrefix)

		const sheetQuery = new SheetQuery(null)

		const querySelectClause = sheetQuery.rawToQueryNonDistinctSelectClause(
			getSheetSelectFromSetClauseResult.selectClause,
			this.queryUtils, this.fieldUtils, this.queryRelationManager)

		const querySheet: QuerySheet = {
			SELECT: querySelectClause,
			FROM: [queryUpdate.UPDATE],
			WHERE: queryUpdate.WHERE,
		}
		const portableSelect: PortableQuery = {
			applicationIndex: portableQuery.applicationIndex,
			entityIndex: portableQuery.entityIndex,
			query: querySheet,
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
			const repositoryTransactionHistory = await this.historyManager.getRepositoryTransactionHistory(
				transaction.transactionHistory, repositoryId, actor, null, context
			)
			const operationHistory = this.repositoryTransactionHistoryDuo.startOperation(
				repositoryTransactionHistory, systemWideOperationId, ChangeType.UPDATE_ROWS,
				context.dbEntity, rootTransaction)

			const recordsForRepositoryId = recordsByRepositoryId[repositoryId]
			for (const recordToUpdate of recordsForRepositoryId) {
				const actorId = recordToUpdate[
					getSheetSelectFromSetClauseResult.actorIdColumnIndex]
				const recordHistoryMapForActor =
					this.datastructureUtils.ensureChildMap(recordHistoryMapForRepository, actorId)

				const _actorRecordId = recordToUpdate[
					getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex]
				const recordHistory = this.operationHistoryDuo.startRecordHistory(
					operationHistory, actorId, _actorRecordId)
				recordHistoryMapForActor[_actorRecordId] = recordHistory

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
					this.recordHistoryDuo.addOldValue(recordHistory, dbColumn, value)
				}
			}
		}

		return [recordHistoryMapByRecordId, getSheetSelectFromSetClauseResult]
	}

	private async addNewValueHistory(
		queryUpdate: QueryUpdate<any>,
		recordHistoryMapByRecordId: RecordHistoryMap,
		systemWideOperationId: SystemWideOperationId,
		repositorySheetSelectInfo: RepositorySheetSelectInfo,
		errorPrefix: string,
		transaction: ITransaction,
		context: IOperationContext
	): Promise<void> {
		const qEntity = this.airportDatabase.qApplications
		[context.dbEntity.applicationVersion.application.index][context.dbEntity.name]

		const sheetQuery = new SheetQuery({
			FROM: [
				qEntity
			],
			SELECT: [],
			WHERE: qEntity[this.dictionary.AirEntity.properties
				.systemWideOperationId]
				.equals(systemWideOperationId)
		})

		let portableSelect = this.queryFacade.getPortableQuery(
			sheetQuery, QueryResultType.SHEET, context)

		const resultSetIndexByColumnIndex: Map<DbColumn_Index, number> = new Map()

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
				const _actorRecordId = updatedRecord[resultSetIndexByColumnIndex.get(
					repositorySheetSelectInfo.actorRecordIdColumnIndex)]
				const recordHistory = recordHistoryMapByRecordId
				[repositoryId][actorId][_actorRecordId]
				for (const columnName in queryUpdate.SELECT) {
					const dbColumn = context.dbEntity.columnMap[columnName]
					const value = updatedRecord[resultSetIndexByColumnIndex.get(dbColumn.index)]

					if (value === undefined) {
						throw new Error(errorPrefix + `Values cannot be 'undefined'.`)
					}
					if (dbColumn.notNull && value === null) {
						throw new Error(errorPrefix + `Column '${dbColumn.entity.name}'.'${dbColumn.name}' is NOT NULL
						and cannot have NULL values.`)
					}
					this.recordHistoryDuo.addNewValue(recordHistory, dbColumn, value)
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
				this.datastructureUtils.ensureChildArray(recordsByRepositoryId, repositoryId)
			recordsForRepositoryId.push(recordToUpdate)
		}

		return {
			recordsByRepositoryId,
			repositoryIdSet
		}
	}

}
