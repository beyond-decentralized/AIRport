import {
	and,
	IDatabaseFacade,
	IEntityUpdateProperties,
	IQEntityInternal,
	IQOperableFieldInternal,
	IUtils,
	MappedEntityArray,
	RawDelete,
	RawInsertValues,
	RawUpdate,
	UTILS,
}                           from '@airport/air-control'
import {
	DI
}                           from '@airport/di'
import {StoreType}          from '@airport/ground-control'
import {
	IActor,
	IRepository,
	IRepositoryDao,
	IRepositoryTransactionHistory,
	QRepositoryEntity,
	REPOSITORY_DAO
}                           from '@airport/holding-pattern'
import {
	DeltaStoreConfig,
	DistributionStrategy,
	JsonDeltaStoreConfig,
	PlatformType,
	REPOSITORY_FIELD,
}                           from '@airport/terminal-map'
import {ENTITY_MANAGER}     from '@airport/tower'
import {ITerminal}          from '@airport/travel-document-checkpoint'
import {
	DeltaStore,
	getSharingAdaptor,
	IDeltaStore
}                           from '../../data/DeltaStore'
import {REPOSITORY_MANAGER} from '../../diTokens'
import {UpdateState}        from '../UpdateState'

/**
 * Created by Papa on 2/12/2017.
 */

export interface RepoQueryData {
	[entityName: string]: EntityRepoQueryData;
}

export interface EntityRepoQueryData {
	qEntity: IQEntityInternal,
	idProperty: string;
}

export interface IRepositoryManager {

	deltaStore: IDeltaStore;
	repositories: IRepository[];
	repositoriesById: { [repositoryId: string]: IRepository };

	initialize(): Promise<void>;

	createRepository(
		appName: string,
		distributionStrategy: DistributionStrategy,
		offlineStoreType: StoreType,
		platformType: PlatformType,
		platformConfig: any,
		recordIdField: string
	): Promise<IRepository>;

	getRepository(repositoryId: number): Promise<IRepository>;

	getActor(actorId: number): Promise<IActor>;

	goOffline(): void;

	getUpdateState(repository: IRepository): UpdateState;

	setUpdateStateForAll(updateState: UpdateState): void;

	setUpdateState(
		repository: IRepository,
		updateState: UpdateState
	): void;

	getDeltaStore(repository: IRepository): IDeltaStore;

	ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal>(
		repository: IRepository,
		rawInsertValues: RawInsertValues<IQE>
	): RawInsertValues<IQE>;

	ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal>(
		qEntity: IQEntityInternal,
		repository: IRepository,
		rawUpdate: RawUpdate<IEUP, IQE>
	): RawUpdate<IEUP, IQE>;

	getOnlyRepositoryInDatabase(): IRepository;

	ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal>(
		qEntity: IQE,
		repository: IRepository,
		rawDelete: RawDelete<IQE>
	): RawDelete<IQE>;

	findReposWithDetailsByIds(...repositoryIds: number[]): Promise<MappedEntityArray<IRepository>>;
}

export class RepositoryManager
	implements IRepositoryManager {

	private dbFacade: IDatabaseFacade
	deltaStore: IDeltaStore
	repositories: IRepository[]
	repositoriesById: { [repositoryId: string]: IRepository } = {}
	private repositoryDao: Promise<IRepositoryDao>
	terminal: ITerminal
	userEmail: string
	private utils: IUtils

	constructor() {
		DI.get((
			databaseFacade,
			repositoryDao,
			utils
		) => {
			this.dbFacade = databaseFacade
			this.utils    = utils
		}, ENTITY_MANAGER, UTILS)

		this.repositoryDao = DI.getP(REPOSITORY_DAO)
	}

	async initialize(): Promise<void> {
		await this.ensureRepositoryRecords()
		await this.ensureAndCacheRepositories()
		for (let i = 0; i < this.repositories.length; i++) {
			let repository = this.repositories[i]
			this.addDeltaStore(repository)
		}
	}

	async findReposWithDetailsByIds(...repositoryIds: number[]): Promise<MappedEntityArray<IRepository>> {
		return await (await this.repositoryDao).findReposWithDetailsByIds(repositoryIds, this.terminal.name, this.userEmail)
	}

	async createRepository(
		appName: string,
		distributionStrategy: DistributionStrategy,
		offlineStoreType: StoreType,
		platformType: PlatformType,
		platformConfig: any,
		recordIdField: string
	): Promise<IRepository> {
		let repository = await this.createRepositoryRecord(appName, distributionStrategy, platformType, platformConfig)
		this.addDeltaStore(repository)

		return repository
	}

	async getRepository(repositoryId: number): Promise<IRepository> {
		throw `not implemented`
	}

	getActor(actorId: number): Promise<IActor> {
		throw `not implemented`
	}

	goOffline(): void {
		for (let repositoryId in this.deltaStore) {
			let deltaStore = this.deltaStore[repositoryId]
			deltaStore.goOffline()
		}
	}

	getUpdateState(repository: IRepository): UpdateState {
		return this.deltaStore[repository.id].updateState
	}

	setUpdateStateForAll(updateState: UpdateState): void {
		for (let repositoryId in this.deltaStore) {
			let deltaStore         = this.deltaStore[repositoryId]
			deltaStore.updateState = updateState
		}
	}

	setUpdateState(
		repository: IRepository,
		updateState: UpdateState
	): void {
		let deltaStore         = this.deltaStore[repository.id]
		deltaStore.updateState = updateState
	}

	getDeltaStore(repository: IRepository): IDeltaStore {
		return this.deltaStore[repository.id]
	}

	private async ensureRepositoryRecords(): Promise<void> {
		this.repositories = await (await this.repositoryDao).find.tree({
			select: {}
		})
		/*
						if (!this.repositories.length) {
								let deltaStoreConfig = config.deltaStoreConfig;
								if (!deltaStoreConfig) {
										throw `Delta store is not configured`;
								}
								let repository = await this.createRepositoryRecord(config.appName,
										deltaStoreConfig.changeListConfig.distributionStrategy,
										deltaStoreConfig.offlineDeltaStore.type,
										deltaStoreConfig.setupInfo.platformType);
						}
						*/
	}

	private addDeltaStore(repository: IRepository): IDeltaStore {
		// TODO: revisit configuration (instead of hard-coding
		// let sharingAdaptor                             =
		// getSharingAdaptor(repository.platform)
		let sharingAdaptor                             = getSharingAdaptor(PlatformType.OFFLINE)
		let jsonDeltaStoreConfig: JsonDeltaStoreConfig = {
			changeList: {
				// distributionStrategy: repository.distributionStrategy
				distributionStrategy: DistributionStrategy.S3_SECURE_POLL
			},
			offlineDeltaStore: {
				// type: this.dbFacade.storeType
				type: StoreType.SQLITE_CORDOVA
			},
			recordIdField: 'id',
			// platform: repository.platform
			platform: PlatformType.OFFLINE
		}

		if (repository.platformConfig) {
			let platformConfig   = JSON.parse(repository.platformConfig)
			jsonDeltaStoreConfig = <any>{...jsonDeltaStoreConfig, ...platformConfig}
		}
		let deltaStoreConfig                                   = new DeltaStoreConfig(jsonDeltaStoreConfig)
		let deltaStore                                         = new DeltaStore(deltaStoreConfig, sharingAdaptor)
		deltaStore.config.changeListConfig.changeListInfo.dbId = this.dbFacade.name
		this.deltaStore[repository.id]                         = deltaStore

		return deltaStore
	}

	private async createRepositoryRecord(
		appName: string,
		distributionStrategy: DistributionStrategy,
		platformType: PlatformType,
		platformConfig: any,
	): Promise<IRepository> {
		const repository = {
			distributionStrategy: distributionStrategy,
			id: null,
			lastSyncedTransaction: null,
			localDatabase: null,
			name: appName,
			platform: platformType,
			platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
			repositoryDatabases: null,
			repositoryUsers: null,
			transactionHistory: null,
			url: null,
		}
		await (await this.repositoryDao).create(repository)
		this.repositories.push(repository)

		return repository
	}

	private async ensureAndCacheRepositories(): Promise<void> {
		this.repositories = await (await this.repositoryDao).find.tree({
			select: {}
		})
		this.repositories.forEach((repository) => {
			this.repositoriesById[repository.id] = repository
		})
	}

	startEnsureGraphInSingleRepository(transaction: IRepositoryTransactionHistory): void {
		// TODO: add to transaction for remote execution
		// (EntityChangeType.QUERY_UNIQUE_RECORD) transaction.addNewFindOneVerify();
	}

	getOnlyRepositoryInDatabase(): IRepository {
		if (this.repositories.length !== 1) {
			throw `Do not have "Only" repository - more than one repository found.`
		}
		return this.repositories[0]
	}

	ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal>(
		repository: IRepository,
		rawInsertValues: RawInsertValues<IQE>
	): RawInsertValues<IQE> {
		let qEntity = rawInsertValues.insertInto
		if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
			return rawInsertValues
		}

		let columns = rawInsertValues.columns.slice()
		if (columns.some((
			column: IQOperableFieldInternal<any, any, any, any>,
			index
		) => {
			// return column.fieldName === REPOSITORY_FIELD
			return column.dbProperty.name === REPOSITORY_FIELD
		})) {
			return rawInsertValues
		}
		columns.push(qEntity[REPOSITORY_FIELD])

		let values = rawInsertValues.values.slice()
		for (let i = 0; i < values.length; i++) {
			let row   = values[i].slice()
			values[i] = row
			row.push(repository.id)
		}

		return {
			insertInto: qEntity, columns: columns, values: values
		}
	}

	ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal>(
		qEntity: IQEntityInternal,
		repository: IRepository,
		rawUpdate: RawUpdate<IEUP, IQE>
	): RawUpdate<IEUP, IQE> {
		if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
			return
		}
		return {
			update: rawUpdate.update,
			set: rawUpdate.set,
			where: and(rawUpdate.where, (<QRepositoryEntity><any>qEntity).repository.id.equals(repository.id))
		}
	}

	ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal>(
		qEntity: IQE,
		repository: IRepository,
		rawDelete: RawDelete<IQE>
	): RawDelete<IQE> {
		if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
			return
		}
		return {
			deleteFrom: rawDelete.deleteFrom,
			where: and(rawDelete.where, (<QRepositoryEntity><any>qEntity).repository.id.equals(repository.id))
		}
	}

}

DI.set(REPOSITORY_MANAGER, RepositoryManager)
