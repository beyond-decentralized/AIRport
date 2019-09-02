import {
	AIR_DB,
	FIELD_UTILS,
	GetSheetSelectFromSetClauseResult,
	IAirportDatabase,
	IFieldUtils,
	IQueryUtils,
	ISchemaUtils,
	QUERY_UTILS,
	SCHEMA_UTILS,
	SheetQuery
}                             from '@airport/air-control'
import {EntityDatabaseFacade} from '@airport/check-in'
import {DI}                   from '@airport/di'
import {
	ChangeType,
	DbEntity,
	ensureChildArray,
	ensureChildMap,
	InternalFragments,
	IStoreDriver,
	JsonSheetQuery,
	JsonUpdate,
	PortableQuery,
	QueryResultType,
	repositoryEntity,
	STORE_DRIVER,
}                           from '@airport/ground-control'
import {
	IActor,
	IOperationHistoryDuo,
	IRecordHistory,
	IRecordHistoryDuo,
	IRecordHistoryNewValueDuo,
	IRecordHistoryOldValueDuo,
	IRepositoryTransactionHistoryDuo,
	OPER_HISTORY_DUO,
	REC_HIST_NEW_VALUE_DUO,
	REC_HIST_OLD_VALUE_DUO,
	REC_HISTORY_DUO,
	REPO_TRANS_HISTORY_DUO,
	RepositoryEntitySystemWideOperationId
}                           from '@airport/holding-pattern'
import {
	ITransactionManager,
	TRANSACTION_MANAGER
}                           from '@airport/terminal-map'
import {IRepositoryManager} from '..'
import {
	HISTORY_MANAGER,
	OFFLINE_DELTA_STORE,
	REPOSITORY_MANAGER,
	UPDATE_MANAGER
}                           from '../diTokens'
import {IHistoryManager}    from './HistoryManager'

export interface IUpdateManager {

	updateValues(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<number>;

}

interface RecordHistoryMap {
	[repositoryId: number]: {
		[actorId: number]: {
			[actorRecordId: number]: IRecordHistory
		}
	};
}

export class UpdateManager
	implements IUpdateManager {

	async updateValues(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<number> {
		// TODO: remove unused dependencies after testing
		const [airDb,
			      fieldUtils,
			      historyManager,
			      offlineDataStore,
			      operHistoryDuo,
			      queryUtils,
			      recHistoryDuo,
			      recHistoryNewValueDuo,
			      recHistoryOldValueDuo,
			      repositoryManager,
			      repoTransHistoryDuo,
			      schemaUtils,
			      storeDriver,
			      transactionManager] = await DI.get(AIR_DB,
			FIELD_UTILS, HISTORY_MANAGER, OFFLINE_DELTA_STORE,
			OPER_HISTORY_DUO, QUERY_UTILS, REC_HISTORY_DUO,
			REC_HIST_NEW_VALUE_DUO, REC_HIST_OLD_VALUE_DUO,
			REPOSITORY_MANAGER, REPO_TRANS_HISTORY_DUO,
			SCHEMA_UTILS, STORE_DRIVER, TRANSACTION_MANAGER)

		const dbEntity = airDb.schemas[portableQuery.schemaIndex].currentVersion.entities[portableQuery.tableIndex]

		const internalFragments: InternalFragments = {
			SET: []
		}

		let valueSelect: PortableQuery
		let recordHistoryMap: RecordHistoryMap
		let getSheetSelectFromSetClauseResult: GetSheetSelectFromSetClauseResult
		let systemWideOperationId: RepositoryEntitySystemWideOperationId
		if (!dbEntity.isLocal) {
			[valueSelect, recordHistoryMap, getSheetSelectFromSetClauseResult]
				= await this.addUpdateHistory(dbEntity, portableQuery, actor,
				airDb, fieldUtils, historyManager, operHistoryDuo,
				queryUtils, recHistoryDuo, recHistoryOldValueDuo,
				repositoryManager, repoTransHistoryDuo, schemaUtils,
				storeDriver, transactionManager)

			internalFragments.SET.push({
				column: repositoryEntity.SYSTEM_WIDE_OPERATION_ID,
				value: systemWideOperationId
			})
		}

		const numUpdatedRows = await storeDriver.updateWhere(portableQuery, internalFragments)

		if (!dbEntity.isLocal) {
			await this.addNewValueHistory(
				<JsonUpdate<any>>portableQuery.jsonQuery, dbEntity,
				valueSelect, recordHistoryMap, systemWideOperationId,
				airDb, recHistoryDuo, recHistoryNewValueDuo,
				getSheetSelectFromSetClauseResult, storeDriver)
		}

		return numUpdatedRows
	}

	private async addUpdateHistory(
		dbEntity: DbEntity,
		portableQuery: PortableQuery,
		actor: IActor,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		histManager: IHistoryManager,
		operHistoryDuo: IOperationHistoryDuo,
		queryUtils: IQueryUtils,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryOldValueDuo: IRecordHistoryOldValueDuo,
		repoManager: IRepositoryManager,
		repoTransHistoryDuo: IRepositoryTransactionHistoryDuo,
		schemaUtils: ISchemaUtils,
		storeDriver: IStoreDriver,
		transManager: ITransactionManager
	): Promise<[
		PortableQuery,
		RecordHistoryMap,
		GetSheetSelectFromSetClauseResult
	]> {
		if (!dbEntity.isRepositoryEntity) {
			throw new Error(
				`Cannot add update history for a non-RepositoryEntity`)
		}

		const qEntity                           = airDb
			.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
		const jsonUpdate: JsonUpdate<any>       = <JsonUpdate<any>>portableQuery.jsonQuery
		const getSheetSelectFromSetClauseResult = schemaUtils.getSheetSelectFromSetClause(
			dbEntity, qEntity, jsonUpdate.S)

		const sheetQuery = new SheetQuery(null)

		const jsonSelectClause = sheetQuery.nonDistinctSelectClauseToJSON(
			getSheetSelectFromSetClauseResult.selectClause, queryUtils, fieldUtils)

		const jsonSelect: JsonSheetQuery    = {
			S: jsonSelectClause,
			F: [jsonUpdate.U],
			W: jsonUpdate.W,
		}
		const portableSelect: PortableQuery = {
			schemaIndex: portableQuery.schemaIndex,
			tableIndex: portableQuery.tableIndex,
			jsonQuery: jsonSelect,
			queryResultType: QueryResultType.SHEET,
			parameterMap: portableQuery.parameterMap,
			// values: portableQuery.values,
		}
		const recordsToUpdate               = await storeDriver.find<any, Array<any>>(
			portableSelect)

		const {
			      recordsByRepositoryId,
			      repositoryIdSet
		      } = this.groupRecordsByRepository(
			recordsToUpdate, getSheetSelectFromSetClauseResult)

		const repositoryIds: number[] = Array.from(repositoryIdSet)
		// const repositories: MappedEntityArray<IRepository> =
		// 	      await repoManager.findReposWithDetailsByIds(...repositoryIds)

		const recordHistoryMapByRecordId: RecordHistoryMap = {}

		for (const repositoryId of repositoryIds) {
			// const repository                         = repositories.get(repositoryId)
			const recordHistoryMapForRepository      = {}
			recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository
			const repoTransHistory                   = await histManager.getNewRepoTransHistory(
				transManager.currentTransHistory, repositoryId, actor
			)
			const operationHistory                   = repoTransHistoryDuo.startOperation(
				repoTransHistory, ChangeType.UPDATE_ROWS, dbEntity, operHistoryDuo)

			const recordsForRepositoryId = recordsByRepositoryId[repositoryId]
			for (const recordToUpdate of recordsForRepositoryId) {
				const actorId                  = recordToUpdate[
					getSheetSelectFromSetClauseResult.actorIdColumnIndex]
				const recordHistoryMapForActor =
					      ensureChildMap(recordHistoryMapForRepository, actorId)

				const actorRecordId                     = recordToUpdate[
					getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex]
				const recordHistory                     = operHistoryDuo.startRecordHistory(
					operationHistory, actorRecordId, recHistoryDuo)
				recordHistoryMapForActor[actorRecordId] = recordHistory

				for (let i = 0; i < recordToUpdate.length; i++) {
					switch (i) {
						case getSheetSelectFromSetClauseResult.actorIdColumnIndex:
						case getSheetSelectFromSetClauseResult.actorRecordIdColumnIndex:
						case getSheetSelectFromSetClauseResult.repositoryIdColumnIndex:
							break
						case getSheetSelectFromSetClauseResult.draftColumnIndex:
							if (!getSheetSelectFromSetClauseResult.draftColumnUpdated) {
								break
							}
							break
					}
					const dbColumn = getSheetSelectFromSetClauseResult
						.selectClause[i].dbColumn
					const value    = recordToUpdate[i]
					recHistoryDuo.addOldValue(recordHistory, dbColumn, value,
						recHistoryOldValueDuo)
				}
			}
		}

		return [portableSelect, recordHistoryMapByRecordId,
			getSheetSelectFromSetClauseResult]
	}

	private async addNewValueHistory(
		jsonUpdate: JsonUpdate<any>,
		dbEntity: DbEntity,
		portableSelect: PortableQuery,
		recordHistoryMapByRecordId: RecordHistoryMap,
		systemWideOperationId: RepositoryEntitySystemWideOperationId,
		airDb: IAirportDatabase,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryNewValueDuo: IRecordHistoryNewValueDuo,
		getSheetSelectFromSetClauseResult: GetSheetSelectFromSetClauseResult,
		storeDriver: IStoreDriver
	): Promise<void> {
		const qEntity = airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]

		await airDb.find.sheet({
			from: [
				qEntity
			],
			select: [

			],
			where: qEntity[repositoryEntity.systemWideOperationId]
				.equals(systemWideOperationId)
		})

		const updatedRecords = await storeDriver.find<any, Array<any>>(portableSelect)

		const {
			      recordsByRepositoryId,
			      repositoryIdSet
		      } = this.groupRecordsByRepository(
			updatedRecords, getSheetSelectFromSetClauseResult)

		for (const repositoryId of repositoryIdSet) {
			const recordsForRepositoryId = recordsByRepositoryId[repositoryId]
			for (const updatedRecord of recordsForRepositoryId) {
				const repositoryId  = updatedRecord[repositoryIdColumnIndex]
				const actorId       = updatedRecord[actorIdColumnIndex]
				const actorRecordId = updatedRecord[actorRecordIdColumnIndex]
				const recordHistory = recordHistoryMapByRecordId
					[repositoryId][actorId][actorRecordId]
				for (const columnName in jsonUpdate.S) {
					const dbColumn = dbEntity.columnMap[columnName]
					const value    = updatedRecord[dbColumn.index]
					recHistoryDuo.addNewValue(recordHistory, dbColumn, value,
						recHistoryNewValueDuo)
				}
			}

		}

	}

	private groupRecordsByRepository(
		records,
		getSheetSelectFromSetClauseResult: GetSheetSelectFromSetClauseResult
	): {
		recordsByRepositoryId: { [repositoryId: number]: any[] };
		repositoryIdSet: Set<number>;
	} {

		const recordsByRepositoryId: { [repositoryId: number]: any[] }
			                    = {}
		const repositoryIdSet = new Set<number>()
		for (const recordToUpdate of records) {
			const repositoryId = recordToUpdate[getSheetSelectFromSetClauseResult.repositoryIdColumnIndex]
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

DI.set(UPDATE_MANAGER, UpdateManager)
