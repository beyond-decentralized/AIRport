import {
	AIR_DB,
	IAirportDatabase,
	IUtils,
	MappedEntityArray,
	UTILS
}                           from '@airport/air-control'
import {
	DI
}                           from '@airport/di'
import {
	ChangeType,
	DbEntity,
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
	IRepository,
	IRepositoryTransactionHistoryDuo,
	ITransactionHistoryDuo,
	OPER_HISTORY_DUO,
	REC_HISTORY_DUO,
	REPO_TRANS_HISTORY_DUO,
	TRANS_HISTORY_DUO
}                           from '@airport/holding-pattern'
import {
	ITransactionManager,
	TRANSACTION_MANAGER
}                           from '@airport/terminal-map'
import {IRepositoryManager} from '../core/repository/RepositoryManager'
import {IOfflineDeltaStore} from '../data/OfflineDeltaStore'
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

	private airDb: IAirportDatabase
	private dataStore: IStoreDriver
	private histManager: IHistoryManager
	private offlineDataStore: IOfflineDeltaStore
	private operHistoryDuo: Promise<IOperationHistoryDuo>
	private recHistoryDuo: Promise<IRecordHistoryDuo>
	private repoManager: IRepositoryManager
	private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>
	// private transHistoryDuo: Promise<ITransactionHistoryDuo>
	private transManager: ITransactionManager
	private utils: IUtils

	constructor() {

		DI.get((
			airportDb,
			dataStore,
			historyManager,
			offlineDataStore,
			repositoryManager,
			transactionManager,
			utils
			) => {
				this.airDb            = airportDb
				this.dataStore        = dataStore
				this.histManager      = historyManager
				this.offlineDataStore = offlineDataStore
				this.repoManager      = repositoryManager
				this.transManager     = transactionManager
				this.utils            = utils
			}, AIR_DB, STORE_DRIVER,
			HISTORY_MANAGER, OFFLINE_DELTA_STORE,
			REPOSITORY_MANAGER, TRANSACTION_MANAGER,
			UTILS)
		this.operHistoryDuo      = DI.getP(OPER_HISTORY_DUO)
		this.recHistoryDuo       = DI.getP(REC_HISTORY_DUO)
		this.repoTransHistoryDuo = DI.getP(REPO_TRANS_HISTORY_DUO)
		// this.transHistoryDuo     = DI.getP(TRANS_HISTORY_DUO)
	}

	async updateValues( 
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<number> {
		const dbEntity = this.airDb.schemas[portableQuery.schemaIndex].currentVersion.entities[portableQuery.tableIndex]

		let valueSelect: PortableQuery
		let recordHistoryMap: RecordHistoryMap
		if (!dbEntity.isLocal) {
			[valueSelect, recordHistoryMap]
				= await this.addUpdateHistory(dbEntity, portableQuery, actor)
		}

		const numUpdatedRows = await this.dataStore.updateWhere(portableQuery)

		if (!dbEntity.isLocal) {
			await this.addNewValueHistory(
				<JsonUpdate<any>>portableQuery.jsonQuery, dbEntity,
				valueSelect, recordHistoryMap)
		}

		return numUpdatedRows
	}

	private async addUpdateHistory(
		dbEntity: DbEntity,
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<[
		PortableQuery,
		RecordHistoryMap
		]> {
		if (!dbEntity.isRepositoryEntity) {
			throw `Cannot add update history for a non-RepositoryEntity`
		}

		const qEntity                       = this.airDb
			.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
		const jsonUpdate: JsonUpdate<any>   = <JsonUpdate<any>>portableQuery.jsonQuery
		const selectClause                  = this.utils.Schema.getSheetSelectFromSetClause(
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
			values: portableQuery.values,
		}
		const recordsToUpdate               = await this.dataStore.find<any, Array<any>>(portableSelect)

		const {
			      repositoryIdColumnIndex,
			      actorIdColumnIndex,
			      actorRecordIdColumnIndex,
			      recordsByRepositoryId,
			      repositoryIdSet
		      } = this.groupRecordsByRepository(dbEntity, recordsToUpdate)

		const repositoryIds: number[]                      = Array.from(repositoryIdSet)
		const repositories: MappedEntityArray<IRepository> =
			      await this.repoManager.findReposWithDetailsByIds(...repositoryIds)

		const recordHistoryMapByRecordId: RecordHistoryMap = {}

		const repoTransHistoryDuo = await this.repoTransHistoryDuo
		const operHistoryDuo = await this.operHistoryDuo
		const recHistoryDuo = await this.recHistoryDuo

		for (const repositoryId of repositoryIds) {
			const repository                         = repositories.get(repositoryId)
			const recordHistoryMapForRepository      = {}
			recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository
			const repoTransHistory                   = await this.histManager.getNewRepoTransHistory(
				this.transManager.currentTransHistory, repository, actor
			)
			const operationHistory                   = repoTransHistoryDuo.startOperation(
				repoTransHistory, ChangeType.UPDATE_ROWS, dbEntity)

			const recordsForRepositoryId = recordsByRepositoryId[repositoryId]
			for (const recordToUpdate of recordsForRepositoryId) {
				const actorId                  = recordToUpdate[actorIdColumnIndex]
				const recordHistoryMapForActor =
					      this.utils.ensureChildMap(recordHistoryMapForRepository, actorId)

				const actorRecordId                     = recordToUpdate[actorRecordIdColumnIndex]
				const recordHistory                     = operHistoryDuo.startRecordHistory(
					operationHistory, actorRecordId)
				recordHistoryMapForActor[actorRecordId] = recordHistory

				for (const columnName in jsonUpdate.S) {
					const dbColumn = dbEntity.columnMap[columnName]
					const value    = recordToUpdate[dbColumn.index]
					recHistoryDuo.addOldValue(recordHistory, dbColumn, value)
				}
			}

		}

		return [portableSelect, recordHistoryMapByRecordId]
	}

	private async addNewValueHistory(
		jsonUpdate: JsonUpdate<any>,
		dbEntity: DbEntity,
		portableSelect: PortableQuery,
		recordHistoryMapByRecordId: RecordHistoryMap
	) {
		const updatedRecords = await this.dataStore.find<any, Array<any>>(portableSelect)

		const {
			      repositoryIdColumnIndex,
			      actorIdColumnIndex,
			      actorRecordIdColumnIndex,
			      recordsByRepositoryId,
			      repositoryIdSet
		      } = this.groupRecordsByRepository(dbEntity, updatedRecords)

		const recHistoryDuo = await this.recHistoryDuo

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
					recHistoryDuo.addNewValue(recordHistory, dbColumn, value)
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
				      this.utils.ensureChildArray(recordsByRepositoryId, repositoryId)
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
