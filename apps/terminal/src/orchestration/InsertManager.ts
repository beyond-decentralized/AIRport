import {
	AirportDatabaseToken,
	DbEntity,
	IAirportDatabase,
	repositoryEntity
}                                      from "@airport/air-control";
import {
	ChangeType,
	IStoreDriver,
	JsonInsertValues,
	PortableQuery
}                                      from "@airport/ground-control";
import {
	IActor,
	IOperationHistory,
	IRepositoryTransactionHistory,
	ITransactionHistory,
	OperationHistoryDmo,
	OperationHistoryDmoToken,
	RecordHistoryDmo,
	RecordHistoryDmoToken,
	RepositoryTransactionHistoryDmo,
	RepositoryTransactionHistoryDmoToken,
	TransactionHistoryDmo,
	TransactionHistoryDmoToken
}                                      from "@airport/holding-pattern";
import {RepositoryEntityActorRecordId} from "@airport/holding-pattern/lib/ddl/repository/AbstractRepositoryEntity";
import {
	DistributionStrategy,
	PlatformType
}                                      from "@airport/terminal-map";
import {
	Inject,
	Service
}                                      from "typedi";
import {IRepositoryManager}            from "../core/repository/RepositoryManager";
import {IOfflineDeltaStore}            from "../data/OfflineDeltaStore";
import {
	HistoryManagerToken,
	IdGeneratorToken,
	InsertManagerToken,
	OfflineDeltaStoreToken,
	RepositoryManagerToken,
	StoreDriverToken,
	TransactionManagerToken
}                                      from "../InjectionTokens";
import {IdGenerator}                   from "../store/IdGenerator";
import {IHistoryManager}               from "./HistoryManager";
import {ITransactionManager}           from "./TransactionManager";

export type RecordId = number;

export interface IInsertManager {

	insertValues(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<number>;

	insertValuesGetIds(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<RecordId[]>;

	addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
	): Promise<number>;

}

@Service(InsertManagerToken)
export class InsertManager implements IInsertManager {

	constructor(
		@Inject(
			_ => AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(
			_ => StoreDriverToken)
		private dataStore: IStoreDriver,
		@Inject(
			_ => IdGeneratorToken)
		private idGenerator: IdGenerator,
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

	get currentTransHistory(): ITransactionHistory {
		return this.transactionManager.currentTransHistory;
	}

	async insertValues(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<number> {
		return <number><any>this.internalInsertValues(portableQuery, actor, false);
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<RecordId[]> {
		return <RecordId[]><any>this.internalInsertValues(
			portableQuery, actor, true);
	}

	private async internalInsertValues(
		portableQuery: PortableQuery,
		actor: IActor,
		getIds: boolean = false
	): Promise<number | RecordId[]> {
		const dbEntity = this.airportDb.schemas[portableQuery.schemaIndex].entities[portableQuery.tableIndex];


		let ids: number[];
		if (!dbEntity.isLocal) {
			ids = await this.ensureRepositoryEntityIdValues(actor, dbEntity, <JsonInsertValues>portableQuery.jsonQuery);
			await this.addInsertHistory(dbEntity, portableQuery, actor);
		} else {
			ids = await this.ensureIdValues(dbEntity, <JsonInsertValues>portableQuery.jsonQuery);
		}

		const numberOfInsertedRecords = await this.dataStore.insertValues(portableQuery);

		return getIds ? ids : numberOfInsertedRecords;
	}

	async addRepository(
		name: string,
		url: string = null,
		platform: PlatformType = PlatformType.GOOGLE_DOCS,
		platformConfig: string = null,
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
	): Promise<number> {
		const repository = await this.repositoryManager.createRepository(
			name, distributionStrategy, this.transactionManager.storeType,
			platform, platformConfig, 'id');

		return repository.id;
	}

	private async ensureIdValues(
		dbEntity: DbEntity,
		jsonInsertValues: JsonInsertValues
	): Promise<number[]> {
		const idColumns = dbEntity.idColumns;
		if (!idColumns.length) {
			return null;
		}

		const values = jsonInsertValues.V;
		if (idColumns.length > 1
			|| !idColumns[0].isGenerated) {
			for (const idColumn of idColumns) {
				for (const entityValues of values) {
					if (!entityValues[idColumn.index]) {
						throw `No value provided on insert for @Id '${dbEntity.name}.${idColumn.name}'.`;
					}
				}
			}
			return null;
		}

		const idColumn = dbEntity.idColumns[0];
		const ids: number[] = [];

		for (const entityValues of values) {
			if (entityValues[idColumn.index] || entityValues[idColumn.index] === 0) {
				throw `Already provided value '${entityValues[idColumn.index]}' on insert for @Id @GeneratedValue '${dbEntity.name}.${idColumn.name}'.\nYou cannot explicitly provide values for generated ids'.`;
			}
			let repositoryId = null;
			if (dbEntity.isRepositoryEntity) {
				repositoryId = dbEntity.columnMap[repositoryEntity.FOREIGN_KEY].index;
				if (!repositoryId && repositoryId !== 0) {
					throw `@Column({ name: 'REPOSITORY_ID'}) value is not specified on insert for '${dbEntity.name}.${idColumn.name}'.`;
				}
			}
			const id = this.idGenerator.generateEntityId(dbEntity);
			ids.push(id);
			entityValues[idColumn.index] = id;
		}

		return ids;
	}

	private async ensureRepositoryEntityIdValues(
		actor: IActor,
		dbEntity: DbEntity,
		jsonInsertValues: JsonInsertValues
	): Promise<RepositoryEntityActorRecordId[]> {
		const actorRecordIds: RepositoryEntityActorRecordId[] = [];
		const actorIdColumn = dbEntity.idColumnMap['ACTOR_ID'];
		const actorRecordIdColumn = dbEntity.idColumnMap['ACTOR_RECORD_ID'];
		const repositoryIdColumn = dbEntity.idColumnMap['REPOSITORY_ID'];

		for (const entityValues of jsonInsertValues.V) {
			if (entityValues[actorIdColumn.index] || entityValues[actorIdColumn.index] === 0) {
				throw `Already provided value '${entityValues[actorIdColumn.index]}'
				on insert for @Id '${dbEntity.name}.${actorIdColumn.name}'.
				You cannot explicitly provide a value for ACTOR_ID on Repository row inserts.`;
			}
			if (entityValues[actorRecordIdColumn.index] || entityValues[actorRecordIdColumn.index] === 0) {
				throw `Already provided value '${entityValues[actorRecordIdColumn.index]}' 
				on insert for @Id @GeneratedValue '${dbEntity.name}.${actorRecordIdColumn.name}'.
				You cannot explicitly provide values for generated ids.`;
			}
			if (!entityValues[repositoryIdColumn.index]) {
				throw `Did not provide a positive integer value 
				(instead provided '${entityValues[repositoryIdColumn.index]}')
				 on insert for @Id '${dbEntity.name}.${repositoryIdColumn.name}'.
				 You must explicitly provide a value for REPOSITORY_ID on Repository row inserts.`;
			}

			entityValues[actorIdColumn.index] = actor.id;
			const actorRecordId = this.idGenerator.generateEntityId(dbEntity);
			actorRecordIds.push(actorRecordId);
			entityValues[actorRecordIdColumn.index] = actorRecordId;
		}

		return actorRecordIds;
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
	) {
		const jsonInsertValues = <JsonInsertValues> portableQuery.jsonQuery;

		let operationsByRepo: IOperationHistory[] = [];
		let repoTransHistories: IRepositoryTransactionHistory[] = [];

		const repositoryIdIndex = dbEntity.columnMap[repositoryEntity.REPOSITORY_ID].index;
		const actorIdIndex = dbEntity.columnMap[repositoryEntity.ACTOR_ID].index;
		const actorRecordIdIndex = dbEntity.columnMap[repositoryEntity.ACTOR_RECORD_ID].index;

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
			const repo = await this.repositoryManager.getRepository(repositoryId);
			let repoTransHistory = repoTransHistories[repositoryId];
			if (!repoTransHistory) {
				repoTransHistory = this.historyManager
					.getNewRepoTransHistory(this.currentTransHistory, repo, actor);
			}

			let operationHistory = operationsByRepo[repositoryId];
			if (!operationHistory) {
				operationHistory = this.repositoryTransactionHistoryDmo.startOperation(
					repoTransHistory, ChangeType.INSERT_VALUES, dbEntity);
				operationsByRepo[repositoryId] = operationHistory;
			}

			const actorRecordId = row[actorRecordIdColumnNumber];
			const recordHistory = this.operationHistoryDmo.startRecordHistory(
				operationHistory, actorRecordId);

			for (const columnNumber in jsonInsertValues.C) {
				if (columnNumber === repositoryIdColumnNumber
					|| columnNumber === actorIdColumnNumber
					|| columnNumber === actorRecordIdColumnNumber) {
					continue;
				}
				const columnIndex = jsonInsertValues.C[columnNumber];
				const dbColumn = dbEntity.columns[columnIndex];
				const newValue = row[columnNumber];
				this.recordHistoryDmo.addNewValue(recordHistory, dbColumn, newValue);
			}
		}

		// for (const repositoryId in operationsByRepo) {
		// 	const repoTransHistory = await
		// 		this.currentTransHistory.getRepositoryTransaction(
		// 			repositoryId, null, null, null);
		// 	repoTransHistory.endGroupMutation(operationsByRepo[repositoryId]);
		// }
	}

}