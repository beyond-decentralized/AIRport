import {
	AIRPORT_DATABASE,
	ENTITY_STATE_MANAGER,
	FIELD_UTILS,
	IAirportDatabase,
	IEntityStateManager,
	IFieldUtils,
	IQMetadataUtils,
	IQueryFacade,
	IQueryUtils,
	IRelationManager,
	ISchemaUtils,
	IUpdateCache,
	Q_METADATA_UTILS,
	QUERY_FACADE,
	QUERY_UTILS,
	RELATION_MANAGER,
	SCHEMA_UTILS,
	UPDATE_CACHE,
}                                   from '@airport/air-control'
import {
	DI,
	IContext
}                                   from '@airport/di'
import {
	DbEntity,
	IStoreDriver,
	STORE_DRIVER
}                                   from '@airport/ground-control'
import {ITransactionalServer}       from '../core/data/ITransactionalServer'
import {
	CASCADE_GRAPH_VERIFIER,
	DEPENDENCY_GRAPH_RESOLVER,
	ENTITY_GRAPH_RECONSTRUCTOR,
	OPERATION_CONTEXT_LOADER,
	STRUCTURAL_ENTITY_VALIDATOR,
	TRANSACTIONAL_SERVER
}                                   from '../tokens'
import {ICascadeGraphVerifier}      from './CascadeGraphVerifier'
import {IDependencyGraphResolver}   from './DependencyGraphResolver'
import {IEntityGraphReconstructor}  from './EntityGraphReconstructor'
import {IStructuralEntityValidator} from './StructuralEntityValidator'

export interface IOperationContext<E, EntityCascadeGraph>
	extends IContext {
	entityCascadeGraph: EntityCascadeGraph,
	checkIfProcessed: boolean
	dbEntity: DbEntity
	ioc: IIocOperationContext
}

export interface IIocOperationContext {

	airDb: IAirportDatabase
	cascadeGraphVerifier: ICascadeGraphVerifier
	dependencyGraphResolver: IDependencyGraphResolver
	entityGraphReconstructor: IEntityGraphReconstructor
	entityStateManager: IEntityStateManager
	fieldUtils: IFieldUtils
	metadataUtils: IQMetadataUtils
	queryFacade: IQueryFacade
	queryUtils: IQueryUtils
	relationManager: IRelationManager
	schemaUtils: ISchemaUtils
	storeDriver: IStoreDriver
	structuralEntityValidator: IStructuralEntityValidator
	transactionalServer: ITransactionalServer
	updateCache: IUpdateCache

}

export class IocOperationContext
	implements IIocOperationContext {

	airDb: IAirportDatabase
	cascadeGraphVerifier: ICascadeGraphVerifier
	dependencyGraphResolver: IDependencyGraphResolver
	entityGraphReconstructor: IEntityGraphReconstructor
	entityStateManager: IEntityStateManager
	fieldUtils: IFieldUtils
	metadataUtils: IQMetadataUtils
	queryFacade: IQueryFacade
	queryUtils: IQueryUtils
	relationManager: IRelationManager
	schemaUtils: ISchemaUtils
	storeDriver: IStoreDriver
	structuralEntityValidator: IStructuralEntityValidator
	transactionalServer: ITransactionalServer
	updateCache: IUpdateCache

	static async init(
		context: IIocOperationContext
	): Promise<void> {
		const [airDb, cascadeGraphVerifier, dependencyGraphResolver, entityGraphReconstructor,
			      entityStateManager, fieldUtils, metadataUtils, queryFacade, queryUtils,
			      relationManager, schemaUtils, storeDriver, structuralEntityValidator,
			      transactionalServer, updateCache]
			                                = await DI.db()
			.get(
				AIRPORT_DATABASE, CASCADE_GRAPH_VERIFIER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, ENTITY_STATE_MANAGER,
				FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS,
				STORE_DRIVER, STRUCTURAL_ENTITY_VALIDATOR, TRANSACTIONAL_SERVER, UPDATE_CACHE
			)
		context.airDb                     = airDb
		context.cascadeGraphVerifier      = cascadeGraphVerifier
		context.dependencyGraphResolver   = dependencyGraphResolver
		context.entityGraphReconstructor  = entityGraphReconstructor
		context.entityStateManager        = entityStateManager
		context.fieldUtils                = fieldUtils
		context.metadataUtils             = metadataUtils
		context.queryFacade               = queryFacade
		context.queryUtils                = queryUtils
		context.relationManager           = relationManager
		context.schemaUtils               = schemaUtils
		context.storeDriver               = storeDriver
		context.structuralEntityValidator = structuralEntityValidator
		context.transactionalServer       = transactionalServer
		context.updateCache               = updateCache
	}

	static async ensure(
		context: IIocOperationContext
	): Promise<void> {
		if (!context.airDb || !context.cascadeGraphVerifier || !context.dependencyGraphResolver
			|| !context.entityGraphReconstructor || !context.entityStateManager || !context.fieldUtils
			|| !context.metadataUtils || !context.queryFacade || !context.queryUtils
			|| !context.relationManager || !context.schemaUtils || !context.storeDriver
			|| !context.structuralEntityValidator || !context.transactionalServer
			|| !context.updateCache) {
			await IocOperationContext.init(context)
		}
	}

}

export interface IOperationContextLoader {
	ensure(
		context: IOperationContext<any, any>
	): Promise<void>
}

export class OperationContextLoader
	implements IOperationContextLoader {

	async ensure(
		context: IOperationContext<any, any>
	): Promise<void> {
		if (!context.ioc) {
			context.ioc = new IocOperationContext()
			await IocOperationContext.init(context.ioc)
		} else {
			IocOperationContext.ensure(context.ioc)
		}
	}

}

DI.set(OPERATION_CONTEXT_LOADER, OperationContextLoader)
