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
	IQueryContext,
	QUERY_CONTEXT_LOADER,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
	APPLICATION_UTILS,
	UPDATE_CACHE_MANAGER,
	UpdateColumns,
	UpdateProperties,
} from '@airport/air-control'
import {
	container,
	DEPENDENCY_INJECTION,
	IContext
} from '@airport/direction-indicator'
import {
	IEntityStateManager,
	ISaveResult,
	ITransactionalConnector,
	PortableQuery
} from '@airport/ground-control'
import { ENTITY_COPIER } from '../tokens'

/**
 * Created by Papa on 5/23/2016.
 */
export class DatabaseFacade
	implements IDatabaseFacade {

	entityStateManager: IEntityStateManager
	transactionalConnector: ITransactionalConnector

	name: string

	async addRepository(
		// url: string = null,
		// platform: PlatformType = PlatformType.GOOGLE_DOCS,
		// platformConfig: string = null,
		// distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
		context?: IContext
	): Promise<number> {
		// TODO: figure out how addRepository will work
		return await this.transactionalConnector.addRepository(
			// url, platform, platformConfig, distributionStrategy, 
			context
		)
	}

	async insertColumnValues<IQE extends IQEntity>(
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
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = queryContext.ioc.queryFacade.getPortableQuery(
			insertColumnValues, null, queryContext)

		return await this.transactionalConnector.insertValues(portableQuery, context)
	}

	async insertValues<IQE extends IQEntity>(
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
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = queryContext.ioc.queryFacade.getPortableQuery(
			insertValues, null, queryContext)

		return await this.transactionalConnector.insertValues(portableQuery, context)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IContext
	): Promise<number[][] | string[][]> {
		if (!rawInsertColumnValues) {
			return []
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = queryContext.ioc.queryFacade.getPortableQuery(
			insertValues, null, queryContext)

		return await this.transactionalConnector.insertValuesGetIds(portableQuery, context)
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		context: IContext
	): Promise<number[][] | string[][]> {
		if (!rawInsertValues) {
			return []
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = queryContext.ioc.queryFacade.getPortableQuery(
			insertValues, null, queryContext)

		return await this.transactionalConnector.insertValuesGetIds(portableQuery, context)
	}

	async deleteWhere<IQE extends IQEntity>(
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
		const queryContext = await this.ensureQueryContext(context)
		let portableQuery: PortableQuery = queryContext.ioc.queryFacade.getPortableQuery(
			deleteWhere, null, queryContext)

		return await this.transactionalConnector.deleteWhere(portableQuery, context)
	}

	async save<E>(
		entity: E,
		context: IEntityContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}
		const entityCopy = await this.preSaveOperations(entity, context)

		const [updateCacheManager, applicationUtils] = await container(this)
			.get(UPDATE_CACHE_MANAGER, APPLICATION_UTILS)

		const saveResult = await this.transactionalConnector.save(entityCopy, context)

		updateCacheManager.afterSaveModifications(entity, context.dbEntity, saveResult,
			this.entityStateManager, applicationUtils, new Set())

		return saveResult
	}

	async saveToDestination<E>(
		repositoryDestination: string,
		entity: E,
		context: IEntityContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}
		const entityCopy = await this.preSaveOperations(entity, context)

		const [updateCacheManager, applicationUtils] = await container(this)
			.get(UPDATE_CACHE_MANAGER, APPLICATION_UTILS)

		const saveResult = await this.transactionalConnector
			.saveToDestination(repositoryDestination, entityCopy, context)

		updateCacheManager.afterSaveModifications(entity, context.dbEntity, saveResult,
			this.entityStateManager, applicationUtils, new Set())

		return saveResult
	}

	private async preSaveOperations<E>(
		entity: E,
		context: IEntityContext,
	): Promise<E> {
		if (!entity) {
			return null
		}
		const [updateCacheManager, entityCopier, applicationUtils]
			= await container(this).get(UPDATE_CACHE_MANAGER, ENTITY_COPIER,
				APPLICATION_UTILS)

		const dbEntity = context.dbEntity;
		const entityCopy = entityCopier
			.copyEntityForProcessing(entity, dbEntity, this.entityStateManager, context)
		updateCacheManager.setOperationState(
			entityCopy, dbEntity, this.entityStateManager, applicationUtils, new Set())

		return entityCopy
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
		context: IContext
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}

		let updateColumns: UpdateColumns<any, IQE> = new UpdateColumns(rawUpdate)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = queryContext.ioc.queryFacade.getPortableQuery(
			updateColumns, null, queryContext)

		return await this.transactionalConnector.updateValues(portableQuery, context)
	}

	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
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
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = queryContext.ioc.queryFacade.getPortableQuery(
			update, null, queryContext)

		return await this.transactionalConnector.updateValues(portableQuery, context)
	}

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF> {
		return <IFunctionWrapper<QF>><any>new FunctionWrapper<QF>(queryFunction)
	}

	private async ensureQueryContext<E>(
		context: IContext
	): Promise<IQueryContext> {
		const queryContext: IQueryContext = context as IQueryContext
		const queryContextLoader = await container(this).get(QUERY_CONTEXT_LOADER)
		await queryContextLoader.ensure(queryContext);

		return queryContext
	}

}
DEPENDENCY_INJECTION.set(DATABASE_FACADE, DatabaseFacade)

export class FunctionWrapper<QF extends Function>
	implements IFunctionWrapper<any> {

	constructor(queryFunction: QF) {
		throw new Error('Not Implemented')
	}

	find(...params: any[]): any {

	}
}
