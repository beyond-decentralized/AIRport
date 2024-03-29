import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IEntityStateManager,
	ISaveResult,
	ITransactionalConnector,
	IUpdateCacheManager,
	PortableQuery,
	Repository_GUID
} from '@airport/ground-control'
import { IDatabaseFacade, IFunctionWrapper, IQueryFacade } from '@airport/tarmaq-dao'
import { IEntityContext } from '@airport/tarmaq-entity'
import {
	Delete,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	InsertColumnValues,
	InsertValues,
	IQEntity,
	IQueryContext,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
	UpdateColumns,
	UpdateProperties,
} from '@airport/tarmaq-query'
import { IEntityCopier } from '../core/data/EntityCopier'

/**
 * Created by Papa on 5/23/2016.
 */
@Injected()
export class DatabaseFacade
	implements IDatabaseFacade {

	@Inject()
	entityCopier: IEntityCopier

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	queryFacade: IQueryFacade

	@Inject()
	transactionalConnector: ITransactionalConnector

	@Inject()
	updateCacheManager: IUpdateCacheManager

	name: string

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
		const insertColumnValues: InsertColumnValues<IQE> = new InsertColumnValues(
			rawInsertColumnValues, null)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
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
		const insertValues: InsertValues<IQE> = new InsertValues(
			rawInsertValues, null)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
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
		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(
			rawInsertColumnValues, null)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
			insertValues, null, queryContext)

		return await this.transactionalConnector.insertValuesGetLocalIds(portableQuery, context)
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
		const insertValues: InsertValues<IQE> = new InsertValues(
			rawInsertValues, null)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
			insertValues, null, queryContext)

		return await this.transactionalConnector.insertValuesGetLocalIds(portableQuery, context)
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
		let portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
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
		const entityCopy = await this.preSaveOperations(entity, context, this.transactionalConnector.internal)

		const saveResult = await this.transactionalConnector.save(entityCopy, context)

		this.updateCacheManager.afterSaveModifications(
			entity, context.dbEntity, saveResult, new Set())

		return saveResult
	}

	private async preSaveOperations<E>(
		entity: E,
		context: IEntityContext,
		checkGeneratedIds: boolean
	): Promise<E> {
		if (!entity) {
			return null
		}

		const dbEntity = context.dbEntity;
		const entityCopy = this.entityCopier
			.copyEntityForProcessing(entity, dbEntity, this.entityStateManager, context)
		this.updateCacheManager.setOperationState(entityCopy, dbEntity, new Set(), checkGeneratedIds)

		return entityCopy
	}

	/**
	 * Updates an entity with a WHERE clause, using a column based set clause
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

		let updateColumns: UpdateColumns<any, IQE> = new UpdateColumns(
			rawUpdate)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
			updateColumns, null, queryContext)

		return await this.transactionalConnector.updateValues(portableQuery, context)
	}

	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
			rawUpdate: RawUpdate<IEUP, IQE> | {
				(...args: any[]): RawUpdate<IEUP, IQE>
			},
			context: IContext,
			trackedRepoGUIDSet?: Set<Repository_GUID>
		): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}
		let update: UpdateProperties<any, IQE> = new UpdateProperties(
			rawUpdate, trackedRepoGUIDSet)
		const queryContext = await this.ensureQueryContext(context)
		const portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
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

		return queryContext
	}

}

export class FunctionWrapper<QF extends Function>
	implements IFunctionWrapper<any> {

	constructor(queryFunction: QF) {
		throw new Error('Not Implemented')
	}

	find(...params: any[]): any {

	}
}
