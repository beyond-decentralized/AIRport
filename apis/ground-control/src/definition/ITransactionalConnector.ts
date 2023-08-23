import { IApiCallRequestMessage, IApiCallResponseMessage } from '@airport/aviation-communication'
import { IContext } from '@airport/direction-indicator'
import { Observable } from 'rxjs'
import { IAirEntity } from './core/types'
import { IAbstractQueryContext } from './query/IAbstractQueryContext'
import { PortableQuery } from './query/PortableQuery'
import { ISaveResult } from './query/ISaveResult'

export interface ITransactionalConnector {

	internal: boolean

	callApi(
		apiInput: IApiCallRequestMessage
	): Promise<IApiCallResponseMessage>

	callApiNoReturn(
		apiInput: IApiCallRequestMessage
	): Promise<void>

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext
	): Promise<EntityArray>

	findOne<E>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext
	): Promise<E>

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext
	): Observable<EntityArray>

	searchOne<E>(
		portableQuery: PortableQuery,
		context?: IAbstractQueryContext
	): Observable<E>

	save<E extends IAirEntity, T = E | E[]>(
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

}
