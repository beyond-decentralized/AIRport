import {
	IAirportDatabase,
	DbSystemWideOperationIdUtils
} from '@airport/air-traffic-control'
import {
	IFieldUtils,
	IQueryUtils,
	IQueryRelationManager,
	RepositorySheetSelectInfo,
	SheetQuery,
	IQFieldInternal,
	IQEntityInternal
} from '@airport/tarmaq-query'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ChangeType,
	DbColumn_Index,
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
	CurrentValueMappingDao,
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
	currentValueMappingDao: CurrentValueMappingDao

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
		if (!dbEntity.isLocal && !transaction.isRepositorySync) {

			systemWideOperationId = await this.systemWideOperationIdUtils
				.getSysWideOpId();

			// TODO: For entity queries an additional query really shouldn't be needed
			// Specifically for entity queries, we got the new values, just record them
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
		} else if (!transaction.isRepositorySync) {
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
			context.dbEntity, qEntity, queryUpdate.SET, errorPrefix)

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
			recordsByRepositoryLid,
			repositoryLidSet
		} = this.groupRecordsByRepository(
			recordsToUpdate, getSheetSelectFromSetClauseResult)

		const repositoryLids: number[] = Array.from(repositoryLidSet)

		const recordHistoryMapByRepositoryLid: RecordHistoryMap = {}

		for (const repositoryLid of repositoryLids) {
			// const repository                         = repositories.get(repositoryLid)
			const recordHistoryMapForRepository = {}
			recordHistoryMapByRepositoryLid[repositoryLid] = recordHistoryMapForRepository
			const repositoryTransactionHistory = await this.historyManager.getRepositoryTransactionHistory(
				transaction.transactionHistory, repositoryLid, context
			)
			const operationHistory = this.repositoryTransactionHistoryDuo.startOperation(
				repositoryTransactionHistory, systemWideOperationId, ChangeType.UPDATE_ROWS,
				context.dbEntity, actor, rootTransaction)

			const recordsForRepositoryLid = recordsByRepositoryLid[repositoryLid]
			for (const recordToUpdate of recordsForRepositoryLid) {
				const actorLid = recordToUpdate[
					getSheetSelectFromSetClauseResult.actorLidColumnIndex]
				const recordHistoryMapForActor =
					this.datastructureUtils.ensureChildMap(recordHistoryMapForRepository, actorLid)

				const _actorRecordId = recordToUpdate[
					getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex]
				const recordHistory = this.operationHistoryDuo.startRecordHistory(
					operationHistory, actorLid, _actorRecordId)
				recordHistoryMapForActor[_actorRecordId] = recordHistory

				for (let i = 0; i < recordToUpdate.length; i++) {
					switch (i) {
						case getSheetSelectFromSetClauseResult.actorLidColumnIndex:
						case getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex:
						case getSheetSelectFromSetClauseResult.repositoryLidColumnIndex:
							continue
					}
					const dbColumn = getSheetSelectFromSetClauseResult
						.selectClause[i].dbColumn
					const value = recordToUpdate[i]
					this.recordHistoryDuo.addOldValue(recordHistory, dbColumn, value)
				}
			}
		}

		return [recordHistoryMapByRepositoryLid, getSheetSelectFromSetClauseResult]
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
		const qEntity: IQEntityInternal = this.airportDatabase.qApplications
		[context.dbEntity.applicationVersion.application.index][context.dbEntity.name]
		const resultSetIndexByColumnIndex: Map<DbColumn_Index, number> = new Map()
		const SELECT: IQFieldInternal<any>[] = []
		for (let i = 0; i < repositorySheetSelectInfo.selectClause.length; i++) {
			const dbColumn = repositorySheetSelectInfo.selectClause[i].dbColumn
			SELECT.push(qEntity.__driver__.allColumns[dbColumn.index])
			resultSetIndexByColumnIndex.set(dbColumn.index, i)
		}

		const sheetQuery = new SheetQuery({
			FROM: [
				qEntity
			],
			SELECT,
			WHERE: qEntity[this.dictionary.AirEntityFields.properties
				.systemWideOperationId]
				.equals(systemWideOperationId)
		})

		let portableSelect = this.queryFacade.getPortableQuery(
			sheetQuery, QueryResultType.SHEET, context)

		const updatedRecords = await transaction.find<any, Array<any>>(
			portableSelect, {}, context)

		const {
			recordsByRepositoryLid,
			repositoryLidSet
		} = this.groupRecordsByRepository(
			updatedRecords, repositorySheetSelectInfo)

		for (const repositoryLid of repositoryLidSet) {
			const recordsForRepositoryLid = recordsByRepositoryLid[repositoryLid]
			for (const updatedRecord of recordsForRepositoryLid) {
				const repositoryLid = updatedRecord[resultSetIndexByColumnIndex.get(
					repositorySheetSelectInfo.repositoryLidColumnIndex)]
				const actorLid = updatedRecord[resultSetIndexByColumnIndex.get(
					repositorySheetSelectInfo.actorLidColumnIndex)]
				const _actorRecordId = updatedRecord[resultSetIndexByColumnIndex.get(
					repositorySheetSelectInfo.actorRecordIdColumnIndex)]
				const recordHistory = recordHistoryMapByRecordId
				[repositoryLid][actorLid][_actorRecordId]
				for (const columnName in queryUpdate.SET) {
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
		recordsByRepositoryLid: {
			[repositoryLid: number]: any[]
		}
		repositoryLidSet: Set<number>
	} {

		const recordsByRepositoryLid: { [repositoryLid: number]: any[] }
			= {}
		const repositoryLidSet = new Set<number>()
		for (const recordToUpdate of records) {
			const repositoryLid = recordToUpdate[repositorySheetSelectInfo.repositoryLidColumnIndex]
			repositoryLidSet.add(repositoryLid)
			const recordsForRepositoryLid =
				this.datastructureUtils.ensureChildArray(recordsByRepositoryLid, repositoryLid)
			recordsForRepositoryLid.push(recordToUpdate)
		}

		return {
			recordsByRepositoryLid,
			repositoryLidSet
		}
	}

}
