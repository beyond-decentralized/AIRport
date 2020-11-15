import {
	DI,
	IContext
}                         from '@airport/di'
import {
	DbEntity,
	ITransactionalConnector,
	TRANS_CONNECTOR
}                         from '@airport/ground-control'
import {IAirportDatabase} from '../../lingo/AirportDatabase'
import {IUpdateCache}     from '../../lingo/core/data/UpdateCache'
import {IQueryFacade}     from '../../lingo/core/repository/DatabaseFacade'
import {IEntityUtils}     from '../../lingo/utils/EntityUtils'
import {IFieldUtils}      from '../../lingo/utils/FieldUtils'
import {IQueryUtils}      from '../../lingo/utils/QueryUtils'
import {ISchemaUtils}     from '../../lingo/utils/SchemaUtils'
import {
	AIR_DB,
	ENTITY_UTILS,
	FIELD_UTILS,
	QUERY_CONTEXT_LOADER,
	QUERY_FACADE,
	QUERY_UTILS,
	SCHEMA_UTILS,
	UPDATE_CACHE
}                         from '../../tokens'

export interface IQueryContext<E>
	extends IContext {
	checkIfProcessed: boolean
	dbEntity: DbEntity
	ioc: IIocQueryContext
}

export interface IIocQueryContext {

	airDb: IAirportDatabase
	entityUtils: IEntityUtils
	fieldUtils: IFieldUtils
	queryFacade: IQueryFacade
	queryUtils: IQueryUtils
	schemaUtils: ISchemaUtils
	transactionalConnector: ITransactionalConnector
	updateCache: IUpdateCache

	init(): Promise<void>

}

export class IocQueryContext
	implements IIocQueryContext {

	airDb: IAirportDatabase
	entityUtils: IEntityUtils
	fieldUtils: IFieldUtils
	queryFacade: IQueryFacade
	queryUtils: IQueryUtils
	schemaUtils: ISchemaUtils
	transactionalConnector: ITransactionalConnector
	updateCache: IUpdateCache

	async init(): Promise<void> {
		const [airDb, entityUtils, fieldUtils, queryFacade,
			      queryUtils, schemaUtils, transactionalConnector,
			      updateCache]        = await DI.db()
			.get(
				AIR_DB, ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE,
				QUERY_UTILS, SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE
			)
		this.airDb                  = airDb
		this.entityUtils            = entityUtils
		this.fieldUtils             = fieldUtils
		this.queryFacade            = queryFacade
		this.queryUtils             = queryUtils
		this.schemaUtils            = schemaUtils
		this.transactionalConnector = transactionalConnector
		this.updateCache            = updateCache
	}

}

export interface IQueryContextLoader {

	ensure<E>(
		ctx: IQueryContext<E>
	): Promise<void>

}

export class QueryContextLoader
	implements IQueryContextLoader {

	async ensure<E>(
		ctx: IQueryContext<E>
	): Promise<void> {
		if (!ctx.ioc) {
			ctx.ioc = new IocQueryContext()
			await ctx.ioc.init()
		}
	}

}

DI.set(QUERY_CONTEXT_LOADER, QueryContextLoader)
