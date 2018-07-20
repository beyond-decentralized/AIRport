import {
	AirportDatabaseToken,
	Delete,
	EntityQuery,
	IAirportDatabase,
	IDatabaseFacade,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFunctionWrapper,
	IQEntity,
	IQueryFacade,
	IUtils,
	MappedEntityArray,
	NonEntityFind,
	NonEntityFindOne,
	NonEntitySearch,
	NonEntitySearchOne,
	RawDelete,
	RawEntityQuery,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
	UpdateCacheType,
	UpdateColumns,
	UpdateProperties,
	UpdateRecord,
	UtilsToken
}                                        from "@airport/air-control";
import {
	DbEntity,
	QueryResultType,
	TransactionalConnectorToken
}                                        from "@airport/ground-control";
import {
	DistributionStrategy,
	PlatformType
}                                        from "@airport/terminal-map";
import {
	Inject,
	Service
}                                        from "typedi";
import {IInternalTransactionalConnector} from "./core/data/IInternalTransactionalConnector";
import {IUpdateCache}                    from "./core/data/UpdateCache";
import {Transactional}                   from "./decorators";
import {
	EntityManagerToken,
	UpdateCacheToken
}                                        from "./InjectionTokens";
import {OperationManager,}               from "./OperationManager";

/**
 * Created by Papa on 5/23/2016.
 */
@Service(EntityManagerToken)
export class EntityManager
	extends OperationManager
	implements IDatabaseFacade {

	name: string;

	find = new NonEntityFind(this, this.utils);
	findOne = new NonEntityFindOne(this, this.utils);
	search = new NonEntitySearch(this, this.utils);
	searchOne = new NonEntitySearchOne(this, this.utils);


	constructor(
		@Inject(AirportDatabaseToken) airportDb: IAirportDatabase,
		entity: IQueryFacade,
		@Inject(UtilsToken)
			coreUtils: IUtils,
		@Inject(TransactionalConnectorToken)
			transactionClient: IInternalTransactionalConnector,
		@Inject(UpdateCacheToken)
			updateCache: IUpdateCache,
	) {
		super(airportDb, coreUtils, entity, transactionClient, updateCache);
		(<any>this.updateCache).databaseFacade = this;
	}

	cacheForUpdate(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void {
		this.updateCache.addToCache(cacheForUpdate, dbEntity, ...entities);
	}

	releaseCachedForUpdate(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void {
		this.updateCache.dropFromCache(cacheForUpdate, dbEntity, ...entities);
	}

	dropUpdateCache(): void {
		this.updateCache.dropCache();
	}

	async addRepository(
		name: string,
		url: string = null,
		platform: PlatformType = PlatformType.GOOGLE_DOCS,
		platformConfig: string = null,
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
	): Promise<number> {
		return await this.transactionClient.addRepository(
			name, url, platform, platformConfig, distributionStrategy);
	}

	@Transactional()
	async create<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		return await this.performCreate(dbEntity, entity, []);
	}

	@Transactional()
	async bulkCreate<E>(
		dbEntity: DbEntity,
		entities: E[],
		checkIfProcessed: boolean = true,
		cascade: boolean = false
	): Promise<number> {
		return await this.performBulkCreate(dbEntity, entities, [],
			checkIfProcessed, cascade);
	}

	async insertColumnValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}
	): Promise<number> {
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues();
		}

		let numInsertedRows = await this.internalInsertColumnValues(dbEntity, rawInsertColumnValues);

		return numInsertedRows;
	}

	@Transactional()
	async insertValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | { (...args: any[]): RawInsertValues<IQE> }
	): Promise<number> {
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues();
		}

		let numInsertedRows = await this.internalInsertValues(dbEntity, rawInsertValues);

		return numInsertedRows;
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}
	): Promise<number[] | string[]> {
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues();
		}

		let ids = await this.internalInsertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues);

		return ids;
	}

	@Transactional()
	async insertValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		}
	): Promise<number[] | string[]> {
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues();
		}

		let ids = await this.internalInsertValuesGetIds(dbEntity, rawInsertValues);

		return ids;

	}

	@Transactional()
	async delete<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		return await this.performDelete(dbEntity, entity);
	}

	@Transactional()
	async deleteWhere<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawDelete: RawDelete<IQE> | { (...args: any[]): RawDelete<IQE> }
	): Promise<number> {
		if (rawDelete instanceof Function) {
			rawDelete = rawDelete();
		}

		let deleteWhere: Delete<IQE> = new Delete(rawDelete, this.utils);

		return await this.internalDeleteWhere(dbEntity, deleteWhere);
	}

	@Transactional()
	async save<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		if (!dbEntity.idColumns.length) {
			throw `@Id is not defined for entity: '${dbEntity.name}'.
			Cannot call save(entity) on entities with no ids.`;
		}

		let emptyIdCount = 0;
		let nonEmptyIdCount = 0;
		for (const dbColumn of dbEntity.idColumns) {

			const [propertyNameChains, idValue] =
				this.utils.Schema.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity);

			this.utils.Schema.isIdEmpty(idValue) ? emptyIdCount++ : nonEmptyIdCount++;
		}
		if (emptyIdCount && nonEmptyIdCount) {
			throw `Cannot call save(entity) for instance of '${dbEntity.name}' which has
			${nonEmptyIdCount} @Id values specified and ${emptyIdCount} @Id values not specified.
			Please make sure that the entity instance either has all @Id values specified (to be
			updated) or non of @Id values specified (to be created).`;
		} else if (emptyIdCount) {
			return await this.create(dbEntity, entity);
		} else {
			return await this.update(dbEntity, entity);
		}
	}

	@Transactional()
	async update<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number> {
		return await this.performUpdate(dbEntity, entity, []);
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
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate();
		}

		let update: UpdateColumns<any, IQE>
			= new UpdateColumns(rawUpdate, this.utils);

		return await this.internalUpdateColumnsWhere(dbEntity, update);
	}

	@Transactional()
	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawUpdate: RawUpdate<IEUP, IQE> | { (...args: any[]): RawUpdate<IEUP, IQE> }
	): Promise<number> {
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate();
		}

		let update: UpdateProperties<any, IQE>
			= new UpdateProperties(rawUpdate, this.utils);

		return await this.internalUpdateWhere(dbEntity, update);
	}

	private ensureId<E>(entity: E) {
		throw `Not Implemented`;
	}


	async getOriginalRecord(
		dbEntity: DbEntity,
		idKey: string,
	): Promise<any> {
		const originalRecord = this.updateCache.getOriginalRecord(dbEntity, idKey);

		if (!originalRecord) {
			throw `Cannot update '${dbEntity.name}' with composite id '${idKey}' - not found in update cache.
			Did you forget to add .andCacheForUpdate() to the query you used to retrieve the original?`;
		}

		return originalRecord;
	}

	async getOriginalValues(
		entitiesToUpdate: UpdateRecord[],
		dbEntity: DbEntity,
	): Promise<MappedEntityArray<any>> {
		const qEntity = this.airportDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
		let rawTreeQuery: RawEntityQuery<any> = {
			select: {},
			from: [qEntity],
			where: this.getIdsWhereClause(entitiesToUpdate, qEntity)
		};
		let entityQuery: EntityQuery<any> = new EntityQuery(rawTreeQuery, this.utils);

		return await this.entity.find<any, MappedEntityArray<any>>(
			dbEntity, entityQuery, QueryResultType.MAPPED_ENTITY_TREE);
	}

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF> {
		return <IFunctionWrapper<QF>><any>new FunctionWrapper<QF>(queryFunction);
	}

}

export class FunctionWrapper<QF extends Function>
	implements IFunctionWrapper<any> {

	constructor(queryFunction: QF) {

	}

	find(...params: any[]): any {

	}
}