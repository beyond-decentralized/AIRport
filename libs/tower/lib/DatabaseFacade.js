import { DB_FACADE, Delete, UpdateColumns, UpdateProperties, } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { OperationManager } from './OperationManager';
import { OPERATION_CONTEXT_LOADER } from './tokens';
import { transactional } from './transactional';
/**
 * Created by Papa on 5/23/2016.
 */
export class DatabaseFacade extends OperationManager {
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
    async addRepository(name, url = null, platform = PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH, ctx) {
        await this.ensureIocContext(ctx);
        let numRecordsCreated = 0;
        await transactional(async (transaction) => {
            // TODO: figure out how addRepository will work
            numRecordsCreated = await ctx.ioc.transactionalServer.addRepository(name, url, platform, platformConfig, distributionStrategy, null, ctx);
        });
        return numRecordsCreated;
    }
    async create(entity, ctx, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        await this.ensureIocContext(ctx);
        let numRecordsCreated = 0;
        await transactional(async (transaction) => {
            numRecordsCreated = await this.performCreate(entity, [], transaction, ctx);
        });
        return numRecordsCreated;
    }
    async bulkCreate(entities, ctx, checkIfProcessed = true, operationName, ensureGeneratedValues // for internal use only, needed at initial schema
    // creation
    ) {
        if (!entities || !entities.length) {
            return 0;
        }
        await this.ensureIocContext(ctx);
        ctx.checkIfProcessed = checkIfProcessed;
        let numRecordsCreated = 0;
        await transactional(async (transaction) => {
            numRecordsCreated = await this.performBulkCreate(entities, [], transaction, ctx, ensureGeneratedValues);
        });
        return numRecordsCreated;
    }
    async insertColumnValues(rawInsertColumnValues, ctx) {
        if (!rawInsertColumnValues) {
            return 0;
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        await this.ensureIocContext(ctx);
        let numInsertedRecords = 0;
        await transactional(async (transaction) => {
            numInsertedRecords = await this.internalInsertColumnValues(rawInsertColumnValues, transaction, ctx);
        });
        return numInsertedRecords;
    }
    async insertValues(rawInsertValues, ctx) {
        if (!rawInsertValues) {
            return 0;
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        await this.ensureIocContext(ctx);
        let numInsertedRecords = 0;
        await transactional(async (transaction) => {
            numInsertedRecords = await this.internalInsertValues(rawInsertValues, transaction, ctx);
        });
        return numInsertedRecords;
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues, ctx) {
        if (!rawInsertColumnValues) {
            return [];
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        await this.ensureIocContext(ctx);
        let recordIdentifiers;
        await transactional(async (transaction) => {
            recordIdentifiers = await this.internalInsertColumnValuesGenerateIds(rawInsertColumnValues, transaction, ctx);
        });
    }
    async insertValuesGenerateIds(rawInsertValues, ctx) {
        if (!rawInsertValues) {
            return [];
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        await this.ensureIocContext(ctx);
        let recordIdentifiers;
        await transactional(async (transaction) => {
            recordIdentifiers = await this.internalInsertValuesGetIds(rawInsertValues, transaction, ctx);
        });
        return recordIdentifiers;
    }
    async delete(entity, ctx) {
        if (!entity) {
            return 0;
        }
        await this.ensureIocContext(ctx);
        let numDeletedRecords = 0;
        await transactional(async (transaction) => {
            numDeletedRecords = await this.performDelete(entity, transaction, ctx);
        });
        return numDeletedRecords;
    }
    async deleteWhere(rawDelete, ctx) {
        if (!rawDelete) {
            return 0;
        }
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        await this.ensureIocContext(ctx);
        let deleteWhere = new Delete(rawDelete);
        let numDeletedRecords = 0;
        await transactional(async (transaction) => {
            numDeletedRecords = await this.internalDeleteWhere(deleteWhere, transaction, ctx);
        });
        return numDeletedRecords;
    }
    async save(entity, ctx, operationName) {
        if (!entity) {
            return 0;
        }
        if (!ctx.dbEntity.idColumns.length) {
            throw new Error(`@Id is not defined for entity: '${ctx.dbEntity.name}'.
			Cannot call save(entity) on entities with no ids.`);
        }
        await this.ensureIocContext(ctx);
        let emptyIdCount = 0;
        let nonEmptyIdCount = 0;
        for (const dbColumn of ctx.dbEntity.idColumns) {
            const [propertyNameChains, idValue] = ctx.ioc.schemaUtils.getColumnPropertyNameChainsAndValue(ctx.dbEntity, dbColumn, entity);
            ctx.ioc.schemaUtils.isIdEmpty(idValue) ? emptyIdCount++ : nonEmptyIdCount++;
        }
        let numSavedRecords = 0;
        await transactional(async (transaction) => {
            if (emptyIdCount && nonEmptyIdCount) {
                throw new Error(`Cannot call save(entity) for instance of '${ctx.dbEntity.name}' which has
			${nonEmptyIdCount} @Id values specified and ${emptyIdCount} @Id values not specified.
			Please make sure that the entity instance either has all @Id values specified (to be
			updated) or non of @Id values specified (to be created).`);
            }
            else if (emptyIdCount) {
                numSavedRecords = await this.performCreate(entity, [], transaction, ctx);
            }
            else {
                numSavedRecords = await this.performUpdate(entity, [], transaction, ctx);
            }
        });
        return numSavedRecords;
    }
    async update(entity, ctx, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        await this.ensureIocContext(ctx);
        let numUpdatedRecords = 0;
        await transactional(async (transaction) => {
            numUpdatedRecords = await this.performUpdate(entity, [], transaction, ctx);
        });
        return numUpdatedRecords;
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdate, ctx) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        await this.ensureIocContext(ctx);
        let update = new UpdateColumns(rawUpdate);
        let numUpdatedRecords = 0;
        await transactional(async (transaction) => {
            numUpdatedRecords = await this.internalUpdateColumnsWhere(update, transaction, ctx);
        });
        return numUpdatedRecords;
    }
    async updateWhere(rawUpdate, ctx) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        await this.ensureIocContext(ctx);
        let update = new UpdateProperties(rawUpdate);
        let numUpdatedRecords = 0;
        await transactional(async (transaction) => {
            numUpdatedRecords = await this.internalUpdateWhere(update, transaction, ctx);
        });
        return numUpdatedRecords;
    }
    async getOriginalRecord(dbEntity, entity, updateCache) {
        const originalRecord = updateCache.getEntityUpdateCache(entity);
        if (!originalRecord) {
            throw new Error(`Cannot update '${dbEntity.name}' - entity has no update cache.
			Did you forget to add .cache() to the query you used to retrieve the 
			original record?`);
        }
        return originalRecord;
    }
    prepare(queryFunction) {
        return new FunctionWrapper(queryFunction);
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
    ensureId(entity) {
        throw new Error(`Not Implemented`);
    }
    async ensureIocContext(ctx) {
        const operationContextLoader = await container(this)
            .get(OPERATION_CONTEXT_LOADER);
        await operationContextLoader.ensure(ctx);
    }
}
DI.set(DB_FACADE, DatabaseFacade);
export class FunctionWrapper {
    constructor(queryFunction) {
        throw new Error('Not Implemented');
    }
    find(...params) {
    }
}
//# sourceMappingURL=DatabaseFacade.js.map