import {
	DATABASE_FACADE,
	Delete,
	IDatabaseFacade,
	IEntityContext,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFunctionWrapper,
	InsertColumnValues,
	InsertValues,
	IQEntity,
	IUpdateCache,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
	UpdateColumns,
	UpdateProperties,
} from '@airport/air-control'
import {
	container,
	DI,
	IContext
} from '@airport/di'
import { DbEntity, PortableQuery, TRANSACTIONAL_CONNECTOR, } from '@airport/ground-control'
import {
	DistributionStrategy,
	PlatformType
} from '@airport/terminal-map'

/**
 * Created by Papa on 5/23/2016.
 */
export class DatabaseFacade
	implements IDatabaseFacade {

	name: string

	/*constructor() {
		super();
		(<any>this.updateCache).databaseFacade = this
	}*/

	/*
		cacheForUpdate(
			updateCache: IUpdateCache,
			cacheForUpdate: UpdateCacheType,
			dbEntity: DbEntity,
			...entities: any[]
		): void {
			if (!entities) {
				return
			}
			updateCache.addToCache(cacheForUpdate, dbEntity, ...entities)
		}

	releaseCachedForUpdate(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void {
		if (!entities) {
			return
		}
		this.updateCache.dropFromCache(cacheForUpdate, dbEntity, ...entities)
	}

	dropUpdateCache(): void {
		this.updateCache.dropCache()
	}
	 */

	async addRepository(
		name: string,
		url: string = null,
		platform: PlatformType = PlatformType.GOOGLE_DOCS,
		platformConfig: string = null,
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
		context: IContext
	): Promise<number> {
		// TODO: figure out how addRepository will work
		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.addRepository(
			name, url, platform, platformConfig, distributionStrategy, context)
	}

	async insertColumnValues<IQE extends IQEntity<any>>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IContext
	): Promise<number> {
		if (!rawInsertColumnValues) {
			return 0
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const insertColumnValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertColumnValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValues(portableQuery, context)
	}

	async insertValues<IQE extends IQEntity<any>>(
		rawInsertValues: RawInsertValues<IQE> | { (...args: any[]): RawInsertValues<IQE> },
		context: IContext
	): Promise<number> {
		if (!rawInsertValues) {
			return 0
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValues(portableQuery, context)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity<any>>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertColumnValues) {
			return []
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValuesGetIds(portableQuery, context)
	}

	async insertValuesGenerateIds<IQE extends IQEntity<any>>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		context: IContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertValues) {
			return []
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValuesGetIds(portableQuery, context)
	}

	async deleteWhere<IQE extends IQEntity<any>>(
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
		context: IContext
	): Promise<number> {
		if (!rawDelete) {
			return 0
		}
		if (rawDelete instanceof Function) {
			rawDelete = rawDelete()
		}
		let deleteWhere: Delete<IQE> = new Delete(rawDelete)

		let portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			deleteWhere, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.deleteWhere(portableQuery, context)
	}

	async save<E>(
		entity: E,
		context: IEntityContext,
	): Promise<number> {
		if (!entity) {
			return 0
		}
		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.save(entity, context)
	}

	/**
	 * Updates an entity with a where clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity<any>>(
		rawUpdate: RawUpdateColumns<IEUC, IQE>
			| {
				(...args: any[]): RawUpdateColumns<IEUC, IQE>
			},
		context: IContext
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}

		let updateColumns: UpdateColumns<any, IQE> = new UpdateColumns(rawUpdate)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			updateColumns, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.updateValues(portableQuery, context)
	}

	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity<any>>(
			rawUpdate: RawUpdate<IEUP, IQE> | {
				(...args: any[]): RawUpdate<IEUP, IQE>
			},
			context: IContext
		): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}
		let update: UpdateProperties<any, IQE> = new UpdateProperties(rawUpdate)
		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			update, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.updateValues(portableQuery, context)
	}

	async getOriginalRecord<T>(
		dbEntity: DbEntity,
		entity: T,
		updateCache: IUpdateCache
	): Promise<any> {
		const originalRecord = updateCache.getEntityUpdateCache(entity)

		if (!originalRecord) {
			throw new Error(`Cannot update '${dbEntity.name}' - entity has no update cache.
			Did you forget to add .cache() to the query you used to retrieve the 
			original record?`)
		}

		return originalRecord
	}

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF> {
		return <IFunctionWrapper<QF>><any>new FunctionWrapper<QF>(queryFunction)
	}

	/*
	async getOriginalValues(
		entitiesToUpdate: UpdateRecord[],
		dbEntity: DbEntity,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transactionalServer: ITransactionalServer,
		updateCache: IUpdateCache
	): Promise<MappedEntityArray<any>> {
		const qEntity                         = airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
		let rawTreeQuery: RawEntityQuery<any> = {
			select: {},
			from: [qEntity],
			where: this.getIdsWhereClause(entitiesToUpdate, qEntity)
		}
		let entityQuery: EntityQuery<any>     = new EntityQuery(rawTreeQuery)

		return await queryFacade.find<any, MappedEntityArray<any>>(
			dbEntity, entityQuery, QueryResultType.MAPPED_ENTITY_TREE,
			fieldUtils, queryUtils, schemaUtils, transactionalServer, updateCache)
	}
*/

}

DI.set(DATABASE_FACADE, DatabaseFacade)

export class FunctionWrapper<QF extends Function>
	implements IFunctionWrapper<any> {

	constructor(queryFunction: QF) {
		throw new Error('Not Implemented')
	}

	find(...params: any[]): any {

	}
}
