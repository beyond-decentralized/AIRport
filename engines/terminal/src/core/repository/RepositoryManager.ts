import {
	and,
	DATABASE_FACADE,
	IEntityUpdateProperties,
	IQEntityInternal,
	IQOperableFieldInternal,
	MappedEntityArray,
	RawDelete,
	RawInsertValues,
	RawUpdate,
} from '@airport/air-control'
import { container, DI } from '@airport/di'
import {
	DistributionStrategy,
	PlatformType,
	StoreType,
} from '@airport/ground-control'
import {
	IActor,
	IRepository,
	IRepositoryActor,
	IRepositoryTransactionHistory,
	QRepositoryEntity,
	REPOSITORY_ACTOR_DAO,
	REPOSITORY_DAO,
	SyncPriority
} from '@airport/holding-pattern'
import {
	DeltaStoreConfig,
	JsonDeltaStoreConfig,
	REPOSITORY_FIELD,
} from '@airport/terminal-map'
import { ITerminal } from '@airport/travel-document-checkpoint'
import { v4 as uuidv4 } from "uuid";
import {
	DeltaStore,
	getSharingAdaptor,
	IDeltaStore
} from '../../data/DeltaStore'
import { REPOSITORY_MANAGER } from '../../tokens'
import { UpdateState } from '../UpdateState'

/**
 * Created by Papa on 2/12/2017.
 */

export interface RepoQueryData {
	[entityName: string]: EntityRepoQueryData;
}

export interface EntityRepoQueryData {
	qEntity: IQEntityInternal<any>,
	idProperty: string;
}

export interface IRepositoryManager {

	deltaStore: IDeltaStore;
	repositories: IRepository[];
	repositoriesById: { [repositoryId: string]: IRepository };

	initialize(): Promise<void>;

	createRepository(
		appName: string,
		// distributionStrategy: DistributionStrategy,
		// offlineStoreType: StoreType,
		// platformType: PlatformType,
		// platformConfig: any,
		actor: IActor
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

	ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal<any>>(
		repository: IRepository,
		rawInsertValues: RawInsertValues<IQE>
	): RawInsertValues<IQE>;

	ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal<any>>(
		qEntity: IQEntityInternal<any>,
		repository: IRepository,
		rawUpdate: RawUpdate<IEUP, IQE>
	): RawUpdate<IEUP, IQE>;

	getOnlyRepositoryInDatabase(): IRepository;

	ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal<any>>(
		qEntity: IQE,
		repository: IRepository,
		rawDelete: RawDelete<IQE>
	): RawDelete<IQE>;

	findReposWithDetailsByIds(...repositoryIds: number[]): Promise<MappedEntityArray<IRepository>>;
}

export class RepositoryManager
	implements IRepositoryManager {

	deltaStore: IDeltaStore
	repositories: IRepository[]
	repositoriesById: { [repositoryId: string]: IRepository } = {}
	terminal: ITerminal
	userEmail: string

	async initialize(): Promise<void> {
		await this.ensureRepositoryRecords()
		await this.ensureAndCacheRepositories()
		for (let i = 0; i < this.repositories.length; i++) {
			let repository = this.repositories[i]
			await this.addDeltaStore(repository)
		}
	}

	async findReposWithDetailsByIds(
		...repositoryIds: number[]
	): Promise<MappedEntityArray<IRepository>> {
		const repositoryDao = await container(this).get(REPOSITORY_DAO)

		return await repositoryDao.findReposWithDetailsByIds(
			repositoryIds, this.terminal.name, this.userEmail)
	}

	async createRepository(
		appName: string,
		// distributionStrategy: DistributionStrategy,
		// offlineStoreType: StoreType,
		// platformType: PlatformType,
		// platformConfig: any,
		actor: IActor,
	): Promise<IRepository> {
		let repository = await this.createRepositoryRecord(appName,
			// distributionStrategy, platformType, platformConfig
			actor
		)
		await this.addDeltaStore(repository)

		return repository
	}

	async getRepository(repositoryId: number): Promise<IRepository> {
		throw new Error(`not implemented`)
	}

	getActor(actorId: number): Promise<IActor> {
		throw new Error(`not implemented`)
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
			let deltaStore = this.deltaStore[repositoryId]
			deltaStore.updateState = updateState
		}
	}

	setUpdateState(
		repository: IRepository,
		updateState: UpdateState
	): void {
		let deltaStore = this.deltaStore[repository.id]
		deltaStore.updateState = updateState
	}

	getDeltaStore(repository: IRepository): IDeltaStore {
		return this.deltaStore[repository.id]
	}

	private async ensureRepositoryRecords(): Promise<void> {
		const repositoryDao = await container(this).get(REPOSITORY_DAO)
		// TODO: verify that we want to get ALL of the repositories
		this.repositories = await repositoryDao.db.find.tree({
			select: {}
		})

		/*
						if (!this.repositories.length) {
								let deltaStoreConfig = config.deltaStoreConfig;
								if (!deltaStoreConfig) {
										throw new Error(`Delta store is not configured`);
								}
								let repository = await this.createRepositoryRecord(config.appName,
										deltaStoreConfig.changeListConfig.distributionStrategy,
										deltaStoreConfig.offlineDeltaStore.type,
										deltaStoreConfig.setupInfo.platformType);
						}
						*/
	}

	private async addDeltaStore(repository: IRepository): Promise<IDeltaStore> {
		// TODO: revisit configuration (instead of hard-coding
		// let sharingAdaptor                             =
		// getSharingAdaptor(repository.platform)
		let sharingAdaptor = getSharingAdaptor(PlatformType.OFFLINE)
		let jsonDeltaStoreConfig: JsonDeltaStoreConfig = {
			changeList: {
				// distributionStrategy: repository.distributionStrategy
				distributionStrategy: DistributionStrategy.S3_SECURE_POLL
			},
			offlineDeltaStore: {
				// type: this.dbFacade.storeType
				type: StoreType.SQLITE
			},
			recordIdField: 'id',
			// platform: repository.platform
			platform: PlatformType.OFFLINE
		}

		// if (repository.platformConfig) {
		// 	let platformConfig = JSON.parse(repository.platformConfig)
		// 	jsonDeltaStoreConfig = <any>{ ...jsonDeltaStoreConfig, ...platformConfig }
		// }
		let deltaStoreConfig = new DeltaStoreConfig(jsonDeltaStoreConfig)
		let deltaStore = new DeltaStore(deltaStoreConfig, sharingAdaptor)

		const dbFacade = await container(this)
			.get(DATABASE_FACADE)
		deltaStore.config.changeListConfig.changeListInfo.dbId = dbFacade.name
		this.deltaStore[repository.id] = deltaStore

		return deltaStore
	}

	private async createRepositoryRecord(
		appName: string,
		actor: IActor
		// distributionStrategy: DistributionStrategy,
		// platformType: PlatformType,
		// platformConfig: any,
	): Promise<IRepository> {
		const repository: IRepository = {
			createdAt: new Date(),
			id: null,
			ownerActor: actor,
			name: appName,
			// platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
			// platformConfig: null,
			repositoryActors: [],
			repositoryTransactionHistory: [],
			syncPriority: SyncPriority.NORMAL,
			url: null,
			uuId: uuidv4(),
		}

		const repositoryActor: IRepositoryActor = {
			actor,
			id: null,
			repository
		}

		const repositoryActorDao = await container(this).get(REPOSITORY_ACTOR_DAO)

		await repositoryActorDao.save(repositoryActor)

		// const repositoryDao = await container(this).get(REPOSITORY_DAO)
		// await repositoryDao.save(repository)

		repository.repositoryActors.push(repositoryActor)

		this.repositories.push(repository)

		return repository
	}

	private async ensureAndCacheRepositories(): Promise<void> {
		const repositoryDao = await container(this).get(REPOSITORY_DAO)

		this.repositories = await repositoryDao.db.find.tree({
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
			throw new Error(
				`Do not have "Only" repository - more than one repository found.`)
		}
		return this.repositories[0]
	}

	ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal<any>>(
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
			let row = values[i].slice()
			values[i] = row
			row.push(repository.id)
		}

		return {
			insertInto: qEntity, columns: columns, values: values
		}
	}

	ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal<any>>(
		qEntity: IQEntityInternal<any>,
		repository: IRepository,
		rawUpdate: RawUpdate<IEUP, IQE>
	): RawUpdate<IEUP, IQE> {
		if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
			return
		}
		return {
			update: rawUpdate.update,
			set: rawUpdate.set,
			where: and(rawUpdate.where, (<QRepositoryEntity<any>><any>qEntity).repository.id.equals(repository.id))
		}
	}

	ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal<any>>(
		qEntity: IQE,
		repository: IRepository,
		rawDelete: RawDelete<IQE>
	): RawDelete<IQE> {
		if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
			return
		}
		return {
			deleteFrom: rawDelete.deleteFrom,
			where: and(rawDelete.where, (<QRepositoryEntity<any>><any>qEntity).repository.id.equals(repository.id))
		}
	}

}

DI.set(REPOSITORY_MANAGER, RepositoryManager)
