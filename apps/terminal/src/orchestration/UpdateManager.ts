import {
	AirportDatabaseToken,
	DbEntity,
	IAirportDatabase,
	IUtils,
	MappedEntityArray,
	repositoryEntity,
	UtilsToken
} from "@airport/air-control";
import {
	ChangeType,
	IStoreDriver,
	JsonSheetQuery,
	JsonUpdate,
	PortableQuery,
	QueryResultType,
} from "@airport/ground-control";
import {
	IActor,
	IRecordHistory,
	IRepository,
	OperationHistoryDmo,
	OperationHistoryDmoToken,
	RecordHistoryDmo,
	RecordHistoryDmoToken,
	RepositoryTransactionHistoryDmo,
	RepositoryTransactionHistoryDmoToken,
	TransactionHistoryDmo,
	TransactionHistoryDmoToken
} from "@airport/holding-pattern";
import {Inject, Service} from "typedi";
import {IRepositoryManager} from "../core/repository/RepositoryManager";
import {IOfflineDeltaStore} from "../data/OfflineDeltaStore";
import {
	HistoryManagerToken,
	OfflineDeltaStoreToken,
	RepositoryManagerToken,
	StoreDriverToken,
	TransactionManagerToken,
	UpdateManagerToken
} from "../InjectionTokens";
import {IHistoryManager} from "./HistoryManager";
import {ITransactionManager} from "./TransactionManager";

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

@Service(UpdateManagerToken)
export class UpdateManager implements IUpdateManager {

	constructor(
		@Inject(
			_ => AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(
			_ => UtilsToken)
		private utils: IUtils,
		@Inject(
			_ => StoreDriverToken)
		private dataStore: IStoreDriver,
		@Inject(
			_ => HistoryManagerToken)
		private historyManager: IHistoryManager,
		@Inject(
			_ => OfflineDeltaStoreToken)
		private offlineDataStore: IOfflineDeltaStore,
		@Inject(
			_ => OperationHistoryDmoToken)
		private operationHistoryDmo: OperationHistoryDmo,
		@Inject(
			_ => RecordHistoryDmoToken)
		private recordHistoryDmo: RecordHistoryDmo,
		@Inject(
			_ => RepositoryManagerToken)
		private repositoryManager: IRepositoryManager,
		@Inject(
			_ => RepositoryTransactionHistoryDmoToken)
		private repositoryTransactionHistoryDmo: RepositoryTransactionHistoryDmo,
		@Inject(
			_ => TransactionHistoryDmoToken)
		private transactionHistoryDmo: TransactionHistoryDmo,
		@Inject(
			_ => TransactionManagerToken)
		private transactionManager: ITransactionManager,
	) {
	}

	async updateValues(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<number> {
		const dbEntity = this.airportDb.schemas[portableQuery.schemaIndex].entities[portableQuery.tableIndex];

		let valueSelect: PortableQuery;
		let recordHistoryMap: RecordHistoryMap;
		if (!dbEntity.isLocal) {
			[valueSelect, recordHistoryMap]
				= await this.addUpdateHistory(dbEntity, portableQuery, actor);
		}

		const numUpdatedRows = await this.dataStore.updateWhere(portableQuery);

		if (!dbEntity.isLocal) {
			await this.addNewValueHistory(
				<JsonUpdate<any>>portableQuery.jsonQuery, dbEntity,
				valueSelect, recordHistoryMap);
		}

		return numUpdatedRows;
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
			throw `Cannot add update history for a non-RepositoryEntity`;
		}

		const qEntity = this.airportDb.qSchemas[dbEntity.schema.index][dbEntity.name];
		const jsonUpdate: JsonUpdate<any> = <JsonUpdate<any>>portableQuery.jsonQuery;
		const selectClause = this.utils.Schema.getSheetSelectFromSetClause(
			dbEntity, qEntity, jsonUpdate.S);
		const jsonSelect: JsonSheetQuery = {
			S: selectClause,
			F: [jsonUpdate.U],
			W: jsonUpdate.W,
		};
		const portableSelect: PortableQuery = {
			schemaIndex: portableQuery.schemaIndex,
			tableIndex: portableQuery.tableIndex,
			jsonQuery: jsonSelect,
			queryResultType: QueryResultType.SHEET,
			parameterMap: portableQuery.parameterMap,
			values: portableQuery.values,
		};
		const recordsToUpdate = await this.dataStore.find<any, Array<any>>(portableSelect);

		const {
			repositoryIdColumnIndex,
			actorIdColumnIndex,
			actorRecordIdColumnIndex,
			recordsByRepositoryId,
			repositoryIdSet
		} = this.groupRecordsByRepository(dbEntity, recordsToUpdate);

		const repositoryIds: number[] = Array.from(repositoryIdSet);
		const repositories: MappedEntityArray<IRepository> =
			await this.repositoryManager.findReposWithDetailsByIds(...repositoryIds);

		const recordHistoryMapByRecordId: RecordHistoryMap = {};

		for (const repositoryId of repositoryIds) {
			const repository = repositories.get(repositoryId);
			const recordHistoryMapForRepository = {};
			recordHistoryMapByRecordId[repositoryId] = recordHistoryMapForRepository;
			const repoTransHistory = this.historyManager.getNewRepoTransHistory(
				this.transactionManager.currentTransHistory, repository, actor
			);
			const operationHistory = this.repositoryTransactionHistoryDmo.startOperation(
				repoTransHistory, ChangeType.UPDATE_ROWS, dbEntity);

			const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
			for (const recordToUpdate of recordsForRepositoryId) {
				const actorId = recordToUpdate[actorIdColumnIndex];
				const recordHistoryMapForActor =
					this.utils.ensureChildMap(recordHistoryMapForRepository, actorId);

				const actorRecordId = recordToUpdate[actorRecordIdColumnIndex];
				const recordHistory = this.operationHistoryDmo.startRecordHistory(
					operationHistory, actorRecordId);
				recordHistoryMapForActor[actorRecordId] = recordHistory;

				for (const columnName in jsonUpdate.S) {
					const dbColumn = dbEntity.columnMap[columnName];
					const value = recordToUpdate[dbColumn.index];
					this.recordHistoryDmo.addOldValue(recordHistory, dbColumn, value);
				}
			}

		}

		return [portableSelect, recordHistoryMapByRecordId];
	}

	private async addNewValueHistory(
		jsonUpdate: JsonUpdate<any>,
		dbEntity: DbEntity,
		portableSelect: PortableQuery,
		recordHistoryMapByRecordId: RecordHistoryMap
	) {
		const updatedRecords = await this.dataStore.find<any, Array<any>>(portableSelect);

		const {
			repositoryIdColumnIndex,
			actorIdColumnIndex,
			actorRecordIdColumnIndex,
			recordsByRepositoryId,
			repositoryIdSet
		} = this.groupRecordsByRepository(dbEntity, updatedRecords);

		for (const repositoryId of repositoryIdSet) {
			const recordsForRepositoryId = recordsByRepositoryId[repositoryId];
			for (const updatedRecord of recordsForRepositoryId) {
				const repositoryId = updatedRecord[repositoryIdColumnIndex];
				const actorId = updatedRecord[actorIdColumnIndex];
				const actorRecordId = updatedRecord[actorRecordIdColumnIndex];
				const recordHistory = recordHistoryMapByRecordId
					[repositoryId][actorId][actorRecordId];
				for (const columnName in jsonUpdate.S) {
					const dbColumn = dbEntity.columnMap[columnName];
					const value = updatedRecord[dbColumn.index];
					this.recordHistoryDmo.addNewValue(recordHistory, dbColumn, value);
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

		const repositoryIdColumnIndex = dbEntity.columnMap[repositoryEntity.REPOSITORY_ID].index;
		const actorIdColumnIndex = dbEntity.columnMap[repositoryEntity.ACTOR_ID].index;
		const actorRecordIdColumnIndex = dbEntity.columnMap[repositoryEntity.ACTOR_RECORD_ID].index;
		const recordsByRepositoryId: { [repositoryId: number]: any[] } = {};
		const repositoryIdSet = new Set<number>();
		for (const recordToUpdate of records) {
			const repositoryId = recordToUpdate[repositoryIdColumnIndex];
			repositoryIdSet.add(repositoryId);
			const recordsForRepositoryId =
				this.utils.ensureChildArray(recordsByRepositoryId, repositoryId);
			recordsForRepositoryId.push(recordToUpdate);
		}

		return {
			repositoryIdColumnIndex,
			actorIdColumnIndex,
			actorRecordIdColumnIndex,
			recordsByRepositoryId,
			repositoryIdSet
		};
	}

}