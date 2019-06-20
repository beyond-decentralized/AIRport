import {
	Delete,
	ENTITY_MANAGER,
	EntityQuery,
	IDatabaseFacade,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFunctionWrapper,
	IQEntity,
	IQOrderableField,
	ITreeEntity,
	MappedEntityArray,
	NonEntityFind,
	NonEntityFindOne,
	NonEntitySearch,
	NonEntitySearchOne,
	RawDelete,
	RawEntityQuery,
	RawFieldQuery,
	RawInsertColumnValues,
	RawInsertValues,
	RawSheetQuery,
	RawTreeQuery,
	RawUpdate,
	RawUpdateColumns,
	UpdateCacheType,
	UpdateColumns,
	UpdateProperties,
	UpdateRecord,
}                          from '@airport/air-control'
import {DI}                from '@airport/di'
import {
	DbEntity,
	QueryResultType
}                          from '@airport/ground-control'
import {IObservable}       from '@airport/observe'
import {
	DistributionStrategy,
	PlatformType
}                          from '@airport/terminal-map'
import {OperationManager,} from './OperationManager'
import {transactional}     from './transactional'

/**
 * Created by Papa on 5/23/2016.
 */
export class EntityManager
	extends OperationManager
	implements IDatabaseFacade {

	name: string

	find      = new NonEntityFind()
	findOne   = new NonEntityFindOne()
	search    = new NonEntitySearch()
	searchOne = new NonEntitySearchOne()

	async findAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Promise<Array<any>> {

	}

	async findAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void
	): Promise<Array<any[]>> {

	}

	async findAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<Array<ITE>> {

	}

	async findOneAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): Promise<any> {

	}

	async findOneAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void
	): Promise<any[]> {

	}

	async findOneAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): Promise<ITE> {

	}

	searchAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): IObservable<Array<any>> {

	}

	searchAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void
	): IObservable<Array<any[]>> {

	}

	searchAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): IObservable<Array<ITE>> {

	}

	searchOneAsField<IQF extends IQOrderableField<IQF>>(
		rawFieldQuery: RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<any> }
	): IObservable<any> {

	}

	searchOneAsSheet(
		rawSheetQuery: RawSheetQuery | { (...args: any[]): RawSheetQuery },
		cursorSize?: number | ((
			data: any[]
		) => void),
		callback?: (
			data: any[][]
		) => void
	): IObservable<any[]> {

	}

	searchOneAsTree<ITE extends ITreeEntity>(
		rawTreeQuery: RawTreeQuery<ITE> | { (...args: any[]): RawTreeQuery<any> }
	): IObservable<ITE> {

	}

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
		}*/

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

	async addRepository(
		name: string,
		url: string                                = null,
		platform: PlatformType                     = PlatformType.GOOGLE_DOCS,
		platformConfig: string                     = null,
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
	): Promise<number> {
		return await this.connector.addRepository(
			name, url, platform, platformConfig, distributionStrategy)
	}

	async create<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		if (!entity) {
			return 0
		}
		return await transactional(async () =>
			await this.performCreate(dbEntity, entity, [])
		)
	}

	async bulkCreate<E>(
		dbEntity: DbEntity,
		entities: E[],
		checkIfProcessed: boolean = true,
		cascade: boolean          = false
	): Promise<number> {
		if (!entities || !entities.length) {
			return 0
		}
		return await transactional(async () =>
			await this.performBulkCreate(dbEntity, entities, [],
				checkIfProcessed, cascade)
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

		let numInsertedRows = await this.internalInsertColumnValues(dbEntity, rawInsertColumnValues)

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

		return await transactional(async () =>
			await this.internalInsertValues(
				dbEntity, rawInsertValues as RawInsertValues<IQE>)
		)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}
	): Promise<number[] | string[]> {
		if (!rawInsertColumnValues) {
			return []
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}

		let ids = await this.internalInsertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues)

		return ids
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		}
	): Promise<number[] | string[]> {
		if (!rawInsertValues) {
			return []
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}

		return await transactional(async () =>
			await this.internalInsertValuesGetIds(
				dbEntity, rawInsertValues as RawInsertValues<IQE>)
		)

	}

	async delete<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		if (!entity) {
			return 0
		}
		return await transactional(async () =>
			await this.performDelete(dbEntity, entity)
		)
	}

	async deleteWhere<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawDelete: RawDelete<IQE> | { (...args: any[]): RawDelete<IQE> }
	): Promise<number> {
		if (!rawDelete) {
			return 0
		}
		if (rawDelete instanceof Function) {
			rawDelete = rawDelete()
		}

		let deleteWhere: Delete<IQE> = new Delete(rawDelete, this.utils)

		return await transactional(async () =>
			await this.internalDeleteWhere(dbEntity, deleteWhere)
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
			throw `@Id is not defined for entity: '${dbEntity.name}'.
			Cannot call save(entity) on entities with no ids.`
		}

		let emptyIdCount    = 0
		let nonEmptyIdCount = 0
		for (const dbColumn of dbEntity.idColumns) {

			const [propertyNameChains, idValue] =
				      this.utils.Schema.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity)

			this.utils.Schema.isIdEmpty(idValue) ? emptyIdCount++ : nonEmptyIdCount++
		}

		return await transactional(async () => {
			if (emptyIdCount && nonEmptyIdCount) {
				throw `Cannot call save(entity) for instance of '${dbEntity.name}' which has
			${nonEmptyIdCount} @Id values specified and ${emptyIdCount} @Id values not specified.
			Please make sure that the entity instance either has all @Id values specified (to be
			updated) or non of @Id values specified (to be created).`
			} else if (emptyIdCount) {
				return await this.create(dbEntity, entity)
			} else {
				return await this.update(dbEntity, entity)
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
		return await transactional(async () =>
			await this.performUpdate(dbEntity, entity, [])
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
			| { (...args: any[]): RawUpdateColumns<IEUC, IQE> }
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}

		let update: UpdateColumns<any, IQE>
			    = new UpdateColumns(rawUpdate, this.utils)

		return await this.internalUpdateColumnsWhere(dbEntity, update)
	}

	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawUpdate: RawUpdate<IEUP, IQE> | { (...args: any[]): RawUpdate<IEUP, IQE> }
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}

		let update: UpdateProperties<any, IQE>
			    = new UpdateProperties(rawUpdate, this.utils)

		return await transactional(async () =>
			await this.internalUpdateWhere(dbEntity, update)
		)
	}

	private ensureId<E>(entity: E) {
		throw `Not Implemented`
	}


	async getOriginalRecord(
		dbEntity: DbEntity,
		idKey: string,
	): Promise<any> {
		const originalRecord = this.updateCache.getOriginalRecord(dbEntity, idKey)

		if (!originalRecord) {
			throw `Cannot update '${dbEntity.name}' with composite id '${idKey}' - not found in update cache.
			Did you forget to add .andCacheForUpdate() to the query you used to retrieve the original?`
		}

		return originalRecord
	}

	async getOriginalValues(
		entitiesToUpdate: UpdateRecord[],
		dbEntity: DbEntity,
	): Promise<MappedEntityArray<any>> {
		const qEntity                         = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
		let rawTreeQuery: RawEntityQuery<any> = {
			select: {},
			from: [qEntity],
			where: this.getIdsWhereClause(entitiesToUpdate, qEntity)
		}
		let entityQuery: EntityQuery<any>     = new EntityQuery(rawTreeQuery, this.utils)

		return await this.entity.find<any, MappedEntityArray<any>>(
			dbEntity, entityQuery, QueryResultType.MAPPED_ENTITY_TREE)
	}

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF> {
		return <IFunctionWrapper<QF>><any>new FunctionWrapper<QF>(queryFunction)
	}

}

DI.set(ENTITY_MANAGER, EntityManager)

export class FunctionWrapper<QF extends Function>
	implements IFunctionWrapper<any> {

	constructor(queryFunction: QF) {

	}

	find(...params: any[]): any {

	}
}
