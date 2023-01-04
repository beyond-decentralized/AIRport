import { ICoreLocalApiRequest, InternalUserAccount, ILocalAPIResponse } from '@airport/aviation-communication'
import { IContext } from '@airport/direction-indicator'
import { Observable } from 'rxjs'
import { IAbstractQueryContext } from './query/AbstractQueryContext'
import { PortableQuery } from './query/PortableQuery'
import { ISaveResult } from './query/SaveResult'

export const INTERNAL_APP = '@airport/terminal'
export const INTERNAL_DOMAIN = 'internal://domain'
export const INTERNAL_APP_DOMAIN = 'airport'
export const INTERNAL_BRIDGE_DOMAIN = 'airbridge'

export const INTERNAL_DOMAINS = [
	INTERNAL_DOMAIN, INTERNAL_APP_DOMAIN, INTERNAL_BRIDGE_DOMAIN
]

export interface IRootTransaction {
	numberOfOperations: number
	// Only one new repository can be created at at time
	newRepository?: IRepository
}

export interface IActor {

	// Id Properties
	_localId?: number;

	// Id Relations

	// Non-Id Properties
	GUID?: string;

	// Non-Id Relations
	userAccount?: InternalUserAccount;

	// Transient Properties

	// Public Methods

}

export interface IRepository {

	// Id Properties
	_localId: number;

	// Id Relations

	// Non-Id Properties
	ageSuitability?: number;
	createdAt?: Date;
	fullApplicationName?: string;
	GUID?: string;
	immutable?: boolean;
	name?: string;
	source?: string;
	uiEntryUri?: string;

	// Non-Id Relations
	owner?: InternalUserAccount;

	// Transient Properties

	// Public Methods

}

export interface IAirEntity {
	// Id Properties
	_actorRecordId?: number;

	// Id Relations
	repository?: IRepository;
	actor?: IActor;

	// Non-Id Properties
	ageSuitability?: number;
	createdAt?: Date;
	systemWideOperationId?: number;
	sourceActorRecordId?: number;

	// Non-Id Relations
	sourceRepository?: IRepository;
	sourceActor?: IActor;

	// Transient Properties
	id?: string

	// Public Methods
}

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
