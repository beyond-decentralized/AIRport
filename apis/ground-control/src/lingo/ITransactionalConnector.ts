import { ICoreLocalApiRequest, ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication'
import { IContext } from '@airport/di'
import { Observable } from 'rxjs'
import { IAbstractQueryContext } from './query/AbstractQueryContext'
import { PortableQuery } from './query/PortableQuery'
import { ISaveResult } from './query/SaveResult'

export const INTERNAL_APP = '@airport/terminal'
export const INTERNAL_DOMAIN = 'internal://domain'

export interface ITransactionalConnector {

	callApi<Request, Response>(
		apiInput: ICoreLocalApiRequest
	): Promise<ILocalAPIResponse>

	addRepository(
		// url: string,
		// platform: PlatformType,
		// platformConfig: string,
		// distributionStrategy: DistributionStrategy,
		context?: IContext,
	): Promise<number>

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext<any>,
		cachedSqlQueryId?: number,
	): Promise<EntityArray>

	findOne<E>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext<any>,
		cachedSqlQueryId?: number,
	): Promise<E>

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext<any>,
		cachedSqlQueryId?: number,
	): Observable<EntityArray>

	searchOne<E>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext<any>,
		cachedSqlQueryId?: number,
	): Observable<E>

	save<E, T = E | E[]>(
		entity: T,
		context?: IContext,
	): Promise<ISaveResult>

	saveToDestination<E, T = E | E[]>(
		repositoryDestination: string,
		entity: T,
		context?: IContext,
	): Promise<ISaveResult>

	insertValues(
		portableQuery: PortableQuery,
		context?: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number>

	insertValuesGetIds(
		portableQuery: PortableQuery,
		context?: IContext,
	): Promise<number[][] | string[][]>

	updateValues(
		portableQuery: PortableQuery,
		context?: IContext,
	): Promise<number>

	deleteWhere(
		portableQuery: PortableQuery,
		context?: IContext,
	): Promise<number>

	startTransaction(
		context: IContext
	): Promise<boolean>

	commit(
		context: IContext
	): Promise<boolean>

	rollback(
		context: IContext
	): Promise<boolean>

	onMessage(callback: (
		message: any
	) => void)

}
