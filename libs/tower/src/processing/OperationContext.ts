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
}                             from '@airport/air-control'
import {
	DI,
	IContext
}                             from '@airport/di'
import {
	DbEntity,
	IStoreDriver,
	STORE_DRIVER
}                             from '@airport/ground-control'
import {ITransactionalServer} from '../core/data/ITransactionalServer'
import {
	OPERATION_CONTEXT_LOADER,
	TRANS_SERVER
}                             from '../tokens'

export interface IOperationContext<E, EntityCascadeGraph>
	extends IContext {
	entityCascadeGraph: EntityCascadeGraph,
	checkIfProcessed: boolean
	dbEntity: DbEntity
	ioc: IIocOperationContext
}

export interface IIocOperationContext {

	airDb: IAirportDatabase
	entityStateManager: IEntityStateManager
	fieldUtils: IFieldUtils
	metadataUtils: IQMetadataUtils
	queryFacade: IQueryFacade
	queryUtils: IQueryUtils
	relationManager: IRelationManager
	schemaUtils: ISchemaUtils
	storeDriver: IStoreDriver
	transactionalServer: ITransactionalServer
	updateCache: IUpdateCache

	init(): Promise<void>

}

export class IocOperationContext
	implements IIocOperationContext {

	airDb: IAirportDatabase
	entityStateManager: IEntityStateManager
	fieldUtils: IFieldUtils
	metadataUtils: IQMetadataUtils
	queryFacade: IQueryFacade
	queryUtils: IQueryUtils
	relationManager: IRelationManager
	schemaUtils: ISchemaUtils
	storeDriver: IStoreDriver
	transactionalServer: ITransactionalServer
	updateCache: IUpdateCache

	async init(): Promise<void> {
		const [airDb, entityStateManager, fieldUtils, metadataUtils, queryFacade,
			      queryUtils, relationManager, schemaUtils, storeDriver, transactionalServer,
			      updateCache]     = await DI.db()
			.get(
				AIR_DB, ENTITY_STATE_MANAGER, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE,
				QUERY_UTILS, RELATION_MANAGER, SCHEMA_UTILS, STORE_DRIVER, TRANS_SERVER, UPDATE_CACHE
			)
		this.airDb               = airDb
		this.entityStateManager  = entityStateManager
		this.fieldUtils          = fieldUtils
		this.metadataUtils       = metadataUtils
		this.queryFacade         = queryFacade
		this.queryUtils          = queryUtils
		this.relationManager     = relationManager
		this.schemaUtils         = schemaUtils
		this.storeDriver         = storeDriver
		this.transactionalServer = transactionalServer
		this.updateCache         = updateCache
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
