import {
	AIR_DB,
	DB_FACADE,
	Delete,
	EntityQuery,
	FIELD_UTILS,
	IAirportDatabase,
	IDatabaseFacade,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFieldUtils,
	IFunctionWrapper,
	IQEntity,
	IQueryFacade,
	IQueryUtils,
	ISchemaUtils,
	IUpdateCache,
	MappedEntityArray,
	Q_METADATA_UTILS,
	QUERY_FACADE,
	QUERY_UTILS,
	RawDelete,
	RawEntityQuery,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
	SCHEMA_UTILS,
	UPDATE_CACHE,
	UpdateColumns,
	UpdateProperties,
	UpdateRecord,
}                          from '@airport/air-control'
import {DI}                from '@airport/di'
import {
	CascadeOverwrite,
	DbEntity,
	ITransactionalConnector,
	QueryResultType,
	TRANS_CONNECTOR
}                          from '@airport/ground-control'
import {
	DistributionStrategy,
	PlatformType
}                          from '@airport/terminal-map'
import {OperationManager,} from './OperationManager'
import {transactional}     from './transactional'

/**
 * Created by Papa on 5/23/2016.
 */
export class DatabaseFacade
	extends OperationManager
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
		url: string                                = null,
		platform: PlatformType                     = PlatformType.GOOGLE_DOCS,
		platformConfig: string                     = null,
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
	): Promise<number> {
		const transConnector = await DI.get(TRANS_CONNECTOR)

		return await transConnector.addRepository(
			name, url, platform, platformConfig, distributionStrategy)
	}

	async create<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		if (!entity) {
			return 0
		}
		const [airDb, fieldUtils, metadataUtils, queryFacade,
			      queryUtils, schemaUtils, transConnector,
			      updateCache] = await DI.get(
			AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE,
			QUERY_UTILS, SCHEMA_UTILS, TRANS_CONNECTOR,
			UPDATE_CACHE
		)

		return await transactional(async () =>
			await this.performCreate(dbEntity, entity, [],
				airDb, fieldUtils, metadataUtils, queryFacade,
				queryUtils, schemaUtils, transConnector, updateCache)
		)
	}

	async bulkCreate<E>(
		dbEntity: DbEntity,
		entities: E[],
		checkIfProcessed: boolean          = true,
		cascadeOverwrite: CascadeOverwrite = CascadeOverwrite.DEFAULT
	): Promise<number> {
		if (!entities || !entities.length) {
			return 0
		}
		const [airDb, fieldUtils, metadataUtils, queryFacade,
			      queryUtils, schemaUtils, transConnector,
			      updateCache] = await DI.get(
			AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE,
			QUERY_UTILS, SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE
		)

		return await transactional(async () =>
			await this.performBulkCreate(dbEntity, entities, [],
				airDb, fieldUtils, metadataUtils,
				queryFacade, queryUtils, schemaUtils, transConnector,
				updateCache, checkIfProcessed, cascadeOverwrite)
		)
	}

	async insertColumnValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}
	): Promise<number> {
		if (!rawInsertColumnValues) {
			return 0
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const [fieldUtils, queryUtils] = await DI.get(
			FIELD_UTILS, QUERY_UTILS
		)

		let numInsertedRows = await this.internalInsertColumnValues(
			dbEntity, rawInsertColumnValues, queryUtils, fieldUtils)

		return numInsertedRows
	}

	async insertValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | { (...args: any[]): RawInsertValues<IQE> }
	): Promise<number> {
		if (!rawInsertValues) {
			return 0
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const [fieldUtils, queryUtils] = await DI.get(
			FIELD_UTILS, QUERY_UTILS
		)

		return await transactional(async () =>
			await this.internalInsertValues(
				dbEntity, rawInsertValues as RawInsertValues<IQE>,
				queryUtils, fieldUtils)
		)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertColumnValues) {
			return []
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const [fieldUtils, queryUtils] = await DI.get(
			FIELD_UTILS, QUERY_UTILS
		)

		return await this.internalInsertColumnValuesGenerateIds(
			dbEntity, rawInsertColumnValues, queryUtils, fieldUtils)
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		}
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertValues) {
			return []
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const [fieldUtils, queryFacade, queryUtils, transConnector
		      ] = await DI.get(
			FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, TRANS_CONNECTOR
		)

		return await transactional(async () =>
			await this.internalInsertValuesGetIds(
				dbEntity, rawInsertValues as RawInsertValues<IQE>,
				fieldUtils, queryFacade, queryUtils, transConnector)
		)

	}

	async delete<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		if (!entity) {
			return 0
		}
		const [airDb, fieldUtils, queryFacade, queryUtils,
			      schemaUtils, transConnector] = await DI.get(
			AIR_DB, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS,
			SCHEMA_UTILS, TRANS_CONNECTOR)

		return await transactional(async () =>
			await this.performDelete(dbEntity, entity,
				airDb, fieldUtils, queryFacade, queryUtils,
				schemaUtils, transConnector)
		)
	}

	async deleteWhere<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		}
	): Promise<number> {
		if (!rawDelete) {
			return 0
		}
		if (rawDelete instanceof Function) {
			rawDelete = rawDelete()
		}

		let deleteWhere: Delete<IQE> = new Delete(rawDelete)

		const [fieldUtils, queryFacade, queryUtils,
			      transConnector] = await DI.get(
			FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, TRANS_CONNECTOR)

		return await transactional(async () =>
			await this.internalDeleteWhere(dbEntity, deleteWhere,
				fieldUtils, queryFacade, queryUtils, transConnector)
		)
	}

	async save<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		if (!entity) {
			return 0
		}
		if (!dbEntity.idColumns.length) {
			throw new Error(`@Id is not defined for entity: '${dbEntity.name}'.
			Cannot call save(entity) on entities with no ids.`)
		}
		const [airDb, fieldUtils, metadataUtils, queryFacade,
			      queryUtils, schemaUtils, transConnector,
			      updateCache] = await DI.get(
			AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE,
			QUERY_UTILS, SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE
		)

		let emptyIdCount    = 0
		let nonEmptyIdCount = 0
		for (const dbColumn of dbEntity.idColumns) {

			const [propertyNameChains, idValue] =
				      schemaUtils.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity)

			schemaUtils.isIdEmpty(idValue) ? emptyIdCount++ : nonEmptyIdCount++
		}

		return await transactional(async () => {
			if (emptyIdCount && nonEmptyIdCount) {
				throw new Error(`Cannot call save(entity) for instance of '${dbEntity.name}' which has
			${nonEmptyIdCount} @Id values specified and ${emptyIdCount} @Id values not specified.
			Please make sure that the entity instance either has all @Id values specified (to be
			updated) or non of @Id values specified (to be created).`)
			} else if (emptyIdCount) {
				return await this.performCreate(dbEntity, entity, [],
					airDb, fieldUtils, metadataUtils, queryFacade,
					queryUtils, schemaUtils, transConnector, updateCache)
			} else {
				return await this.performUpdate(dbEntity, entity, [],
					airDb, fieldUtils, metadataUtils, queryFacade,
					queryUtils, schemaUtils, transConnector, updateCache)
			}
		})
	}

	async update<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		if (!entity) {
			return 0
		}
		const [airDb, fieldUtils, metadataUtils, queryFacade,
			      queryUtils, schemaUtils, transConnector,
			      updateCache] = await DI.get(
			AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE,
			QUERY_UTILS, SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE
		)

		return await transactional(async () =>
			await this.performUpdate(dbEntity, entity, [],
				airDb, fieldUtils, metadataUtils, queryFacade,
				queryUtils, schemaUtils, transConnector, updateCache)
		)
	}

	/**
	 * Updates an entity with a where clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawUpdate: RawUpdateColumns<IEUC, IQE>
			| {
			(...args: any[]): RawUpdateColumns<IEUC, IQE>
		}
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}
		const [fieldUtils, queryFacade, queryUtils,
			      transConnector] = await DI.get(
			FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, TRANS_CONNECTOR)

		let update: UpdateColumns<any, IQE> = new UpdateColumns(rawUpdate)

		return await this.internalUpdateColumnsWhere(dbEntity, update,
			fieldUtils, queryFacade, queryUtils, transConnector)
	}

	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawUpdate: RawUpdate<IEUP, IQE> | {
			(...args: any[]): RawUpdate<IEUP, IQE>
		}
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}
		const [fieldUtils, queryFacade, queryUtils,
			      transConnector] = await DI.get(
			FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, TRANS_CONNECTOR)

		let update: UpdateProperties<any, IQE> = new UpdateProperties(rawUpdate)

		return await transactional(async () =>
			await this.internalUpdateWhere(dbEntity, update,
				fieldUtils, queryFacade, queryUtils, transConnector)
		)
	}

	private ensureId<E>(entity: E) {
		throw new Error(`Not Implemented`)
	}


	async getOriginalRecord(
		dbEntity: DbEntity,
		entity: any,
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

	async getOriginalValues(
		entitiesToUpdate: UpdateRecord[],
		dbEntity: DbEntity,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
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
			fieldUtils, queryUtils, schemaUtils, transConnector, updateCache)
	}

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF> {
		return <IFunctionWrapper<QF>><any>new FunctionWrapper<QF>(queryFunction)
	}

}

DI.set(DB_FACADE, DatabaseFacade)

export class FunctionWrapper<QF extends Function>
	implements IFunctionWrapper<any> {

	constructor(queryFunction: QF) {
		throw new Error('Not Implemented')
	}

	find(...params: any[]): any {

	}
}
