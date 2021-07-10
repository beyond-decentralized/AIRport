import { IContext } from '@airport/di'
import { Observable } from 'rxjs'
import { DistributionStrategy } from './data/DistributionStrategy'
import { PlatformType } from './data/PatformType'
import { PortableQuery } from './query/PortableQuery'

export interface ITransactionalConnector {

	init(): Promise<void>

	addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		context: IContext,
	): Promise<number>

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray>

	findOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<E>

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<Observable<EntityArray>>

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<Observable<E>>

	save<E, T = E | E[]>(
		entity: T,
		context: IContext,
	): Promise<number>

	insertValues(
		portableQuery: PortableQuery,
		context: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number>

	insertValuesGetIds(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number[] | string[] | number[][] | string[][]>

	updateValues(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number>

	deleteWhere(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number>
}
