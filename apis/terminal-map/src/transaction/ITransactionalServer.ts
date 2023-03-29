import { IContext } from '@airport/direction-indicator'
import {
	IAirEntity,
	ISaveResult,
	PortableQuery
} from '@airport/ground-control'
import { IEntityContext } from '@airport/tarmaq-entity'
import { Observable } from 'rxjs'
import {
	ICredentials,
	IApiCredentials
} from '../ICredentials'
import { IQueryOperationContext } from '../processing/IOperationContext'

export interface ITransactionalServer {

	init(
		context?: IContext,
	): Promise<void>

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IQueryOperationContext
	): Promise<EntityArray>

	findOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IQueryOperationContext
	): Promise<E>

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IQueryOperationContext
	): Observable<EntityArray>

	searchOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IQueryOperationContext
	): Observable<E>

	startTransaction(
		credentials: IApiCredentials,
		context: IContext
	): Promise<boolean>

	commit(
		credentials: IApiCredentials,
		context: IContext
	): Promise<boolean>

	rollback(
		credentials: IApiCredentials,
		context: IContext
	): Promise<boolean>

	save<E extends IAirEntity, T = E | E[]>(
		entity: T,
		credentials: ICredentials,
		context: IEntityContext,
	): Promise<ISaveResult>

	insertValues(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number>

	insertValuesGetLocalIds(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext
	): Promise<number[][]>

	updateValues(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext
	): Promise<number>

	deleteWhere(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext
	): Promise<number>

}
