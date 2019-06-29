import {
	AIR_DB,
	IAirportDatabase,
	ISchemaUtils,
	MappedEntityArray,
	SCHEMA_UTILS
}           from '@airport/air-control'
import {DI} from '@airport/di'
import {
	ChangeType,
	DbEntity,
	ensureChildArray,
	ensureChildMap,
	IStoreDriver,
	JsonSheetQuery,
	JsonUpdate,
	PortableQuery,
	QueryResultType,
	repositoryEntity,
	STORE_DRIVER,
}           from '@airport/ground-control'
import {
	IActor,
	IOperationHistoryDuo,
	IRecordHistory,
	IRecordHistoryDuo,
	IRecordHistoryNewValueDuo,
	IRecordHistoryOldValueDuo,
	IRepository,
	IRepositoryTransactionHistoryDuo,
	OPER_HISTORY_DUO,
	REC_HIST_NEW_VALUE_DUO,
	REC_HIST_OLD_VALUE_DUO,
	REC_HISTORY_DUO,
	REPO_TRANS_HISTORY_DUO
}           from '@airport/holding-pattern'
import {
	ITransactionManager,
	TRANSACTION_MANAGER
}           from '@airport/terminal-map'
import {
	IHistoryManager,
	IRepositoryManager
}           from '..'
import {
	HISTORY_MANAGER,
	OFFLINE_DELTA_STORE,
	REPOSITORY_MANAGER,
	UPDATE_MANAGER
}           from '../diTokens'

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
			      historyManager,
			      offlineDataStore,
			      operHistoryDuo,
			      recHistoryDuo,
			      recHistoryNewValueDuo,
			      recHistoryOldValueDuo,
			      repositoryManager,
			      repoTransHistoryDuo,
			      schemaUtils,
			      storeDriver,
			      transactionManager] = await DI.get(AIR_DB,
			HISTORY_MANAGER, OFFLINE_DELTA_STORE,
			OPER_HISTORY_DUO, REC_HISTORY_DUO,
			REC_HIST_NEW_VALUE_DUO, REC_HIST_OLD_VALUE_DUO,
			REPOSITORY_MANAGER, REPO_TRANS_HISTORY_DUO,
			SCHEMA_UTILS, STORE_DRIVER, TRANSACTION_MANAGER)

		const dbEntity = airDb.schemas[portableQuery.schemaIndex].currentVersion.entities[portableQuery.tableIndex]

		let valueSelect: PortableQuery
		let recordHistoryMap: RecordHistoryMap
		if (!dbEntity.isLocal) {
			[valueSelect, recordHistoryMap]
				= await this.addUpdateHistory(dbEntity, portableQuery, actor,
				airDb, historyManager, operHistoryDuo, recHistoryDuo,
				recHistoryOldValueDuo,
				repositoryManager, repoTransHistoryDuo, schemaUtils,
				storeDriver, transactionManager)
		}

		const numUpdatedRows = await storeDriver.updateWhere(portableQuery)

		if (!dbEntity.isLocal) {
			await this.addNewValueHistory(
				<JsonUpdate<any>>portableQuery.jsonQuery, dbEntity,
				valueSelect, recordHistoryMap, recHistoryDuo,
				recHistoryNewValueDuo, storeDriver)
		}

		return numUpdatedRows
	}

	private async addUpdateHistory(
		dbEntity: DbEntity,
		portableQuery: PortableQuery,
		actor: IActor,
		airDb: IAirportDatabase,
		histManager: IHistoryManager,
		operHistoryDuo: IOperationHistoryDuo,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryOldValueDuo: IRecordHistoryOldValueDuo,
		repoManager: IRepositoryManager,
		repoTransHistoryDuo: IRepositoryTransactionHistoryDuo,
		schemaUtils: ISchemaUtils,
		storeDriver: IStoreDriver,
		transManager: ITransactionManager
	): Promise<[
		PortableQuery,
		RecordHistoryMap
		]> {
		if (!dbEntity.isRepositoryEntity) {
			throw `Cannot add update history for a non-RepositoryEntity`
		}

		const qEntity                       = airDb
			.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
		const jsonUpdate: JsonUpdate<any>   = <JsonUpdate<any>>portableQuery.jsonQuery
		const selectClause                  = schemaUtils.getSheetSelectFromSetClause(
			dbEntity, qEntity, jsonUpdate.S)
		const jsonSelect: JsonSheetQuery    = {
			S: selectClause,
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
		const recordsToUpdate               = await storeDriver.find<any, Array<any>>(portableSelect)

		const {
			      repositoryIdColumnIndex,
			      actorIdColumnIndex,
			      actorRecordIdColumnIndex,
			      recordsByRepositoryId,
			      repositoryIdSet
		      } = this.groupRecordsByRepository(dbEntity, recordsToUpdate)

		const repositoryIds: number[]                      = Array.from(repositoryIdSet)
		const repositories: MappedEntityArray<IRepository> =
			      await repoManager.findReposWithDetailsByIds(...repositoryIds)

		const recordHistoryMapByRecordId: RecordHistoryMap = {}

		for (const repositoryId of repositoryIds) {
			const repository                         = repositories.get(repositoryId)
			const recordHistoryMapForRepository      = {}
			recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository
			const repoTransHistory                   = await histManager.getNewRepoTransHistory(
				transManager.currentTransHistory, repository, actor
			)
			const operationHistory                   = repoTransHistoryDuo.startOperation(
				repoTransHistory, ChangeType.UPDATE_ROWS, dbEntity, operHistoryDuo)

			const recordsForRepositoryId = recordsByRepositoryId[repositoryId]
			for (const recordToUpdate of recordsForRepositoryId) {
				const actorId                  = recordToUpdate[actorIdColumnIndex]
				const recordHistoryMapForActor =
					      ensureChildMap(recordHistoryMapForRepository, actorId)

				const actorRecordId                     = recordToUpdate[actorRecordIdColumnIndex]
				const recordHistory                     = operHistoryDuo.startRecordHistory(
					operationHistory, actorRecordId, recHistoryDuo)
				recordHistoryMapForActor[actorRecordId] = recordHistory

				for (const columnName in jsonUpdate.S) {
					const dbColumn = dbEntity.columnMap[columnName]
					const value    = recordToUpdate[dbColumn.index]
					recHistoryDuo.addOldValue(recordHistory, dbColumn, value,
						recHistoryOldValueDuo)
				}
			}

		}

		return [portableSelect, recordHistoryMapByRecordId]
	}

	private async addNewValueHistory(
		jsonUpdate: JsonUpdate<any>,
		dbEntity: DbEntity,
		portableSelect: PortableQuery,
		recordHistoryMapByRecordId: RecordHistoryMap,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryNewValueDuo: IRecordHistoryNewValueDuo,
		storeDriver: IStoreDriver
	): Promise<void> {
		const updatedRecords = await storeDriver.find<any, Array<any>>(portableSelect)

		const {
			      repositoryIdColumnIndex,
			      actorIdColumnIndex,
			      actorRecordIdColumnIndex,
			      recordsByRepositoryId,
			      repositoryIdSet
		      } = this.groupRecordsByRepository(dbEntity, updatedRecords)

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
		dbEntity: DbEntity,
		records,
	): {
		repositoryIdColumnIndex: number;
		actorIdColumnIndex: number;
		actorRecordIdColumnIndex: number;
		recordsByRepositoryId: { [repositoryId: number]: any[] };
		repositoryIdSet: Set<number>;
	} {

		const repositoryIdColumnIndex                                  = dbEntity.columnMap[repositoryEntity.REPOSITORY_ID].index
		const actorIdColumnIndex                                       = dbEntity.columnMap[repositoryEntity.ACTOR_ID].index
		const actorRecordIdColumnIndex                                 = dbEntity.columnMap[repositoryEntity.ACTOR_RECORD_ID].index
		const recordsByRepositoryId: { [repositoryId: number]: any[] } = {}
		const repositoryIdSet                                          = new Set<number>()
		for (const recordToUpdate of records) {
			const repositoryId = recordToUpdate[repositoryIdColumnIndex]
			repositoryIdSet.add(repositoryId)
			const recordsForRepositoryId =
				      ensureChildArray(recordsByRepositoryId, repositoryId)
			recordsForRepositoryId.push(recordToUpdate)
		}

		return {
			repositoryIdColumnIndex,
			actorIdColumnIndex,
			actorRecordIdColumnIndex,
			recordsByRepositoryId,
			repositoryIdSet
		}
	}

}

DI.set(UPDATE_MANAGER, UpdateManager)
