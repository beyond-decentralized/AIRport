import { ICoreLocalApiRequest, ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication'
import { IContext } from '@airport/direction-indicator'
import { Observable } from 'rxjs'
import { IAbstractQueryContext } from './query/AbstractQueryContext'
import { PortableQuery } from './query/PortableQuery'
import { ISaveResult } from './query/SaveResult'

export const INTERNAL_APP = '@airport/terminal'
export const INTERNAL_DOMAIN = 'internal://domain'

export interface IRootTransaction {
	numberOfOperations: number
}

export interface IUser {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	email?: string;
	passwordHash?: string;
	username?: string;
	GUID?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}

export interface IActor {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	GUID?: string;

	// Non-Id Relations
	user?: IUser;

	// Transient Properties

	// Public Methods
	
}

export interface IRepository {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	ageSuitability?: number;
	createdAt?: Date;
	immutable?: boolean;
	source?: string;
	GUID?: string;

	// Non-Id Relations
	owner?: IUser;

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
	originalActorRecordId?: number;

	// Non-Id Relations
	originalRepository?: IRepository;
	originalActor?: IActor;

	// Transient Properties
	uuId?: string

	// Public Methods
}

export interface ITransactionalConnector {

	callApi(
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

	onMessage(callback: (
		message: any
	) => void)

}
