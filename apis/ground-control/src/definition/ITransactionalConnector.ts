import { ICoreLocalApiRequest, ILocalAPIResponse } from '@airport/aviation-communication'
import { IContext } from '@airport/direction-indicator'
import { Observable } from 'rxjs'
import { IAirEntity } from './core/types'
import { IAbstractQueryContext } from './query/AbstractQueryContext'
import { PortableQuery } from './query/PortableQuery'
import { ISaveResult } from './query/SaveResult'

export interface ITransactionalConnector {

	internal: boolean

	callApi(
		apiInput: ICoreLocalApiRequest
	): Promise<ILocalAPIResponse>

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray>

	findOne<E>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext,
		cachedSqlQueryId?: number,
	): Promise<E>

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray>

	searchOne<E>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext,
		cachedSqlQueryId?: number,
	): Observable<E>

	save<E extends IAirEntity, T = E | E[]>(
		entity: T,
		context?: IContext,
	): Promise<ISaveResult>

	saveToDestination<E extends IAirEntity, T = E | E[]>(
		repositoryDestination: string,
		entity: T,
		context?: IContext,
	): Promise<ISaveResult>

	insertValues(
		portableQuery: PortableQuery,
		context?: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number>

	insertValuesGetLocalIds(
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

	onMessage(callback: (
		message: any
	) => void)

}
