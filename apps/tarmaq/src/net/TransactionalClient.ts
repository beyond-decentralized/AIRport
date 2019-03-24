import {
	IDatabaseFacade,
	UpdateCacheType
}                                        from '@airport/air-control'
import {PortableQuery}                   from '@airport/ground-control'
import {IObservable}                     from '@airport/observe'
import {
	DistributionStrategy,
	PlatformType
}                                        from '@airport/terminal-map'
import {IInternalTransactionalConnector} from '@airport/tower'

export class TransactionalClient
	implements IInternalTransactionalConnector {

	serverUrl: string
	dbName: string

	constructor(
		private databaseFacade: IDatabaseFacade
	) {
	}

	async startTransaction(): Promise<number> {
		throw `Not implemented`
	}

	async rollbackTransaction(
		transactionIndex: number
	): Promise<void> {
		throw `Not implemented`
	}

	async commitTransaction(
		transactionIndex: number
	): Promise<void> {
		throw `Not implemented`
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		throw `Not implemented`
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<E> {
		throw `Not implemented`
	}

	async insertValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		throw `Not implemented`
	}

	async updateValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		throw `Not implemented`
	}

	deleteWhere(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		throw `Not implemented`
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cacheForUpdate: UpdateCacheType,
	): IObservable<EntityArray> {
		this.databaseFacade.cacheForUpdate(undefined, undefined)
		this.databaseFacade.releaseCachedForUpdate(undefined, undefined)
		throw `Not implemented`
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cacheForUpdate?: UpdateCacheType,
	): IObservable<E> {
		this.databaseFacade.cacheForUpdate(undefined, undefined)
		this.databaseFacade.releaseCachedForUpdate(undefined, undefined)
		throw `Not implemented`
	}

	addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
	): Promise<number> {
		throw `Not implemented`
	}

}