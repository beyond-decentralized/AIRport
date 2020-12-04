import {
	DB_FACADE,
	Delete,
	IDatabaseFacade,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFunctionWrapper,
	IQEntity,
	IUpdateCache,
	OperationName,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
	UpdateColumns,
	UpdateProperties,
}                                 from '@airport/air-control'
import {
	container,
	DI
}                                 from '@airport/di'
import {DbEntity,}                from '@airport/ground-control'
import {
	DistributionStrategy,
	PlatformType
}                                 from '@airport/terminal-map'
import {ITransaction}             from './ITransaction'
import {IOperationContext}        from './processing/OperationContext'
import {OperationManager}         from './processing/OperationManager'
import {OPERATION_CONTEXT_LOADER} from './tokens'
import {transactional}            from './transactional'

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
		context: IOperationContext<any, any>
	): Promise<number> {
		await this.ensureIocContext(context)
		let numRecordsCreated = 0

		await transactional(async (
			transaction: ITransaction
		) => {
			// TODO: figure out how addRepository will work
			numRecordsCreated = await context.ioc.transactionalServer.addRepository(
				name, url, platform, platformConfig, distributionStrategy, null, context)
		})

		return numRecordsCreated
	}

	async insertColumnValues<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IOperationContext<any, any>
	): Promise<number> {
		if (!rawInsertColumnValues) {
			return 0
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		await this.ensureIocContext(context)
		let numInsertedRecords = 0
		await transactional(async (
			transaction: ITransaction
		) => {
			numInsertedRecords = await this.internalInsertColumnValues(
				<RawInsertColumnValues<IQE>>rawInsertColumnValues,
				transaction, context)
		})

		return numInsertedRecords
	}

	async insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | { (...args: any[]): RawInsertValues<IQE> },
		context: IOperationContext<any, any>
	): Promise<number> {
		if (!rawInsertValues) {
			return 0
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		await this.ensureIocContext(context)
		let numInsertedRecords = 0
		await transactional(async (
			transaction: ITransaction
		) => {
			numInsertedRecords = await this.internalInsertValues(
				rawInsertValues as RawInsertValues<IQE>,
				transaction, context)
		})

		return numInsertedRecords
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IOperationContext<any, any>
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertColumnValues) {
			return []
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		await this.ensureIocContext(context)
		let recordIdentifiers
		await transactional(async (
			transaction: ITransaction
		) => {
			recordIdentifiers = await this.internalInsertColumnValuesGenerateIds(
				rawInsertColumnValues as RawInsertColumnValues<IQE>, transaction, context)
		})
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		context: IOperationContext<any, any>
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertValues) {
			return []
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		await this.ensureIocContext(context)
		let recordIdentifiers
		await transactional(async (
			transaction: ITransaction
		) => {
			recordIdentifiers = await this.internalInsertValuesGetIds(
				rawInsertValues as RawInsertValues<IQE>, transaction, context)
		})

		return recordIdentifiers
	}

	async deleteWhere<IQE extends IQEntity>(
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
		context: IOperationContext<any, any>
	): Promise<number> {
		if (!rawDelete) {
			return 0
		}
		if (rawDelete instanceof Function) {
			rawDelete = rawDelete()
		}
		await this.ensureIocContext(context)
		let deleteWhere: Delete<IQE> = new Delete(rawDelete)
		let numDeletedRecords        = 0
		await transactional(async (
			transaction: ITransaction
		) => {
			numDeletedRecords = await this.internalDeleteWhere(deleteWhere,
				transaction, context)
		})
		return numDeletedRecords
	}

	async save<E, EntityCascadeGraph>(
		entity: E,
		context: IOperationContext<any, any>,
		operationName?: OperationName
	): Promise<number> {
		if (!entity) {
			return 0
		}
		await this.ensureIocContext(context)

		let numSavedRecords = 0
		await transactional(async (
			transaction: ITransaction
		) => {
			numSavedRecords = await this.performSave(
				entity, transaction, context)
		})

		return numSavedRecords
	}

	/**
	 * Updates an entity with a where clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(
		rawUpdate: RawUpdateColumns<IEUC, IQE>
			| {
			(...args: any[]): RawUpdateColumns<IEUC, IQE>
		},
		context: IOperationContext<any, any>
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}
		await this.ensureIocContext(context)

		let update: UpdateColumns<any, IQE> = new UpdateColumns(rawUpdate)
		let numUpdatedRecords               = 0
		await transactional(async (
			transaction: ITransaction
		) => {
			numUpdatedRecords = await this.internalUpdateColumnsWhere(
				update, transaction, context)
		})
		return numUpdatedRecords
	}

	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
		rawUpdate: RawUpdate<IEUP, IQE> | {
			(...args: any[]): RawUpdate<IEUP, IQE>
		},
		context: IOperationContext<any, any>
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}
		await this.ensureIocContext(context)
		let update: UpdateProperties<any, IQE> = new UpdateProperties(rawUpdate)
		let numUpdatedRecords                  = 0
		await transactional(async (
			transaction: ITransaction
		) => {
			numUpdatedRecords = await this.internalUpdateWhere(
				update, transaction, context)
		})
		return numUpdatedRecords
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

	private ensureId<E>(entity: E) {
		throw new Error(`Not Implemented`)
	}

	private async ensureIocContext(
		context: IOperationContext<any, any>
	): Promise<void> {
		const operationContextLoader = await container(this)
			.get(OPERATION_CONTEXT_LOADER)
		await operationContextLoader.ensure(context)
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
