import {
	AIR_DB,
	FIELD_UTILS,
	IAirportDatabase,
	IFieldUtils,
	IQMetadataUtils,
	IQueryFacade,
	IQueryUtils,
	ISchemaUtils,
	IUpdateCache,
	Q_METADATA_UTILS,
	QUERY_FACADE,
	QUERY_UTILS,
	SCHEMA_UTILS,
	UPDATE_CACHE,
}                             from '@airport/air-control'
import {
	DI,
	IContext
}                             from '@airport/di'
import {
	CascadeOverwrite,
	DbEntity,
	ITransactionalConnector
} from '@airport/ground-control'
import {ITransactionalServer} from './core/data/ITransactionalServer'
import {TRANS_SERVER}         from './tokens'

export interface IOperationContext<E, EntityCascadeGraph>
	extends IContext {
	cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph,
	checkIfProcessed: boolean
	dbEntity: DbEntity
	ioc: IIocOperationContext
}

export interface IIocOperationContext {

	airDb: IAirportDatabase
	fieldUtils: IFieldUtils
	metadataUtils: IQMetadataUtils
	queryFacade: IQueryFacade
	queryUtils: IQueryUtils
	schemaUtils: ISchemaUtils
	transactionalServer: ITransactionalServer
	updateCache: IUpdateCache

	init(): Promise<void>

}

export class IocContext
	implements IIocOperationContext {

	airDb: IAirportDatabase
	fieldUtils: IFieldUtils
	metadataUtils: IQMetadataUtils
	queryFacade: IQueryFacade
	queryUtils: IQueryUtils
	schemaUtils: ISchemaUtils
	transactionalServer: ITransactionalServer
	updateCache: IUpdateCache

	async init(): Promise<void> {
		const [airDb, fieldUtils, metadataUtils, queryFacade,
			      queryUtils, schemaUtils, transactionalServer,
			      updateCache]     = await DI.db()
			.get(
				AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE,
				QUERY_UTILS, SCHEMA_UTILS, TRANS_SERVER, UPDATE_CACHE
			)
		this.airDb               = airDb
		this.fieldUtils          = fieldUtils
		this.metadataUtils       = metadataUtils
		this.queryFacade         = queryFacade
		this.queryUtils          = queryUtils
		this.schemaUtils         = schemaUtils
		this.transactionalServer = transactionalServer
		this.updateCache         = updateCache
	}

}
