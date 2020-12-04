import { DB_FACADE, Delete, UpdateColumns, UpdateProperties, } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { OperationManager } from './processing/OperationManager';
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
    async addRepository(name, url = null, platform = PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH, context) {
        await this.ensureIocContext(context);
        let numRecordsCreated = 0;
        await transactional(async (transaction) => {
            // TODO: figure out how addRepository will work
            numRecordsCreated = await context.ioc.transactionalServer.addRepository(name, url, platform, platformConfig, distributionStrategy, null, context);
        });
        return numRecordsCreated;
    }
    async insertColumnValues(rawInsertColumnValues, context) {
        if (!rawInsertColumnValues) {
            return 0;
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        await this.ensureIocContext(context);
        let numInsertedRecords = 0;
        await transactional(async (transaction) => {
            numInsertedRecords = await this.internalInsertColumnValues(rawInsertColumnValues, transaction, context);
        });
        return numInsertedRecords;
    }
    async insertValues(rawInsertValues, context) {
        if (!rawInsertValues) {
            return 0;
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        await this.ensureIocContext(context);
        let numInsertedRecords = 0;
        await transactional(async (transaction) => {
            numInsertedRecords = await this.internalInsertValues(rawInsertValues, transaction, context);
        });
        return numInsertedRecords;
    }
    async insertColumnValuesGenerateIds(rawInsertColumnValues, context) {
        if (!rawInsertColumnValues) {
            return [];
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        await this.ensureIocContext(context);
        let recordIdentifiers;
        await transactional(async (transaction) => {
            recordIdentifiers = await this.internalInsertColumnValuesGenerateIds(rawInsertColumnValues, transaction, context);
        });
    }
    async insertValuesGenerateIds(rawInsertValues, context) {
        if (!rawInsertValues) {
            return [];
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        await this.ensureIocContext(context);
        let recordIdentifiers;
        await transactional(async (transaction) => {
            recordIdentifiers = await this.internalInsertValuesGetIds(rawInsertValues, transaction, context);
        });
        return recordIdentifiers;
    }
    async deleteWhere(rawDelete, context) {
        if (!rawDelete) {
            return 0;
        }
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        await this.ensureIocContext(context);
        let deleteWhere = new Delete(rawDelete);
        let numDeletedRecords = 0;
        await transactional(async (transaction) => {
            numDeletedRecords = await this.internalDeleteWhere(deleteWhere, transaction, context);
        });
        return numDeletedRecords;
    }
    async save(entity, context, operationName) {
        if (!entity) {
            return 0;
        }
        await this.ensureIocContext(context);
        let numSavedRecords = 0;
        await transactional(async (transaction) => {
            numSavedRecords = await this.performSave(entity, transaction, context);
        });
        return numSavedRecords;
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdate, context) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        await this.ensureIocContext(context);
        let update = new UpdateColumns(rawUpdate);
        let numUpdatedRecords = 0;
        await transactional(async (transaction) => {
            numUpdatedRecords = await this.internalUpdateColumnsWhere(update, transaction, context);
        });
        return numUpdatedRecords;
    }
    async updateWhere(rawUpdate, context) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        await this.ensureIocContext(context);
        let update = new UpdateProperties(rawUpdate);
        let numUpdatedRecords = 0;
        await transactional(async (transaction) => {
            numUpdatedRecords = await this.internalUpdateWhere(update, transaction, context);
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
    async ensureIocContext(context) {
        const operationContextLoader = await container(this)
            .get(OPERATION_CONTEXT_LOADER);
        await operationContextLoader.ensure(context);
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