import {
	AIR_DB,
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
	TRANS_SERVER
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

	init(): Promise<void>

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

	async init(): Promise<void> {
		const [airDb, cascadeGraphVerifier, dependencyGraphResolver, entityGraphReconstructor,
			      entityStateManager, fieldUtils, metadataUtils, queryFacade, queryUtils,
			      relationManager, schemaUtils, storeDriver, structuralEntityValidator,
			      transactionalServer, updateCache]
			                             = await DI.db()
			.get(
				AIR_DB, CASCADE_GRAPH_VERIFIER, DEPENDENCY_GRAPH_RESOLVER, ENTITY_GRAPH_RECONSTRUCTOR, ENTITY_STATE_MANAGER,
				FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS,
				STORE_DRIVER, STRUCTURAL_ENTITY_VALIDATOR, TRANS_SERVER, UPDATE_CACHE
			)
		this.airDb                     = airDb
		this.cascadeGraphVerifier      = cascadeGraphVerifier
		this.dependencyGraphResolver   = dependencyGraphResolver
		this.entityGraphReconstructor  = entityGraphReconstructor
		this.entityStateManager        = entityStateManager
		this.fieldUtils                = fieldUtils
		this.metadataUtils             = metadataUtils
		this.queryFacade               = queryFacade
		this.queryUtils                = queryUtils
		this.relationManager           = relationManager
		this.schemaUtils               = schemaUtils
		this.storeDriver               = storeDriver
		this.structuralEntityValidator = structuralEntityValidator
		this.transactionalServer       = transactionalServer
		this.updateCache               = updateCache
	}

}

export interface IOperationContextLoader {
	ensure(
		ctx: IOperationContext<any, any>
	): Promise<void>
}

export class OperationContextLoader
	implements IOperationContextLoader {

	async ensure(
		ctx: IOperationContext<any, any>
	): Promise<void> {
		if (!ctx.ioc) {
			ctx.ioc = new IocOperationContext()
			await ctx.ioc.init()
		}
	}

}

DI.set(OPERATION_CONTEXT_LOADER, OperationContextLoader)
