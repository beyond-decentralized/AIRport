import {DI}           from '@airport/di'
import {
	DistributionStrategy,
	ITransactionalConnector,
	PlatformType,
	PortableQuery,
	TRANS_CONNECTOR
}                     from '@airport/ground-control'
import {IObservable}  from '@airport/observe'
import {TRANS_SERVER} from '@airport/tower'

export class TransactionalConnector
	implements ITransactionalConnector {

	dbName: string
	serverUrl: string

	async init(): Promise<void> {
		const transServer = await DI.get(TRANS_SERVER)

		await transServer.init()
	}

	addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy
	): Promise<number> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.addRepository(
					name,
					url,
					platform,
					platformConfig,
					distributionStrategy, {
						domainAndPort: 'test'
					})
		)
	}

	transact(): Promise<void> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.transact({
					domainAndPort: 'test'
				})
		)
	}

	rollback(): Promise<void> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.rollback({
					domainAndPort: 'test'
				})
		)
	}

	commit(): Promise<void> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.commit({
					domainAndPort: 'test'
				})
		)
	}

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.find(
					portableQuery,
					{
						domainAndPort: 'test'
					},
					cachedSqlQueryId
				)
		)
	}

	findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<E> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.findOne(
					portableQuery,
					{
						domainAndPort: 'test'
					},
					cachedSqlQueryId
				)
		)
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<IObservable<EntityArray>> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.search(
					portableQuery,
					{
						domainAndPort: 'test'
					},
					cachedSqlQueryId
				)
		)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<IObservable<E>> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.searchOne(
					portableQuery,
					{
						domainAndPort: 'test'
					},
					cachedSqlQueryId
				)
		)
	}

	insertValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.insertValues(
					portableQuery,
					{
						domainAndPort: 'test'
					},
					transactionIndex,
					ensureGeneratedValues
				)
		)
	}

	insertValuesGetIds(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number[] | string[]> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.insertValuesGetIds(
					portableQuery,
					{
						domainAndPort: 'test'
					},
					transactionIndex
				)
		)
	}

	updateValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.updateValues(
					portableQuery,
					{
						domainAndPort: 'test'
					},
					transactionIndex
				)
		)
	}

	deleteWhere(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		return DI.get(TRANS_SERVER).then(
			transServer =>
				transServer.updateValues(
					portableQuery,
					{
						domainAndPort: 'test'
					},
					transactionIndex
				)
		)
	}

}

DI.set(TRANS_CONNECTOR, TransactionalConnector)
