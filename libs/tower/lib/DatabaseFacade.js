import { AIR_DB, DB_FACADE, Delete, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, UPDATE_CACHE, UpdateColumns, UpdateProperties, } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { CascadeOverwrite, } from '@airport/ground-control';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { IocContext } from './Context';
import { OperationManager } from './OperationManager';
import { TRANS_SERVER } from './tokens';
import { transactional } from './transactional';
// import {transactional}     from './transactional'
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
    async addRepository(name, url = null, platform = PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH) {
        const transactionalServer = await container(this)
            .get(TRANS_SERVER);
        let numRecordsCreated = 0;
        await transactional(async (transaction) => {
            // TODO: figure out how addRepository will work
            numRecordsCreated = await transactionalServer.addRepository(name, url, platform, platformConfig, distributionStrategy, null);
        });
        return numRecordsCreated;
    }
    async create(dbEntity, entity, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        const [airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transactionalServer, updateCache] = await container(this)
            .get(AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, TRANS_SERVER, UPDATE_CACHE);
        let numRecordsCreated = 0;
        await transactional(async (transaction) => {
            numRecordsCreated = await this.performCreate(dbEntity, entity, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transaction, transactionalServer, updateCache, null, cascadeGraph);
        });
        return numRecordsCreated;
    }
    async bulkCreate(dbEntity, entities, checkIfProcessed = true, cascadeOverwrite = CascadeOverwrite.DEFAULT) {
        if (!entities || !entities.length) {
            return 0;
        }
        const ctx = {
            checkIfProcessed,
            cascadeOverwrite,
            dbEntity,
            entities,
            ioc: new IocContext()
        };
        await ctx.ioc.init();
        let numRecordsCreated = 0;
        await transactional(async (transaction) => {
            numRecordsCreated = await this.performBulkCreate([], transaction, ctx);
        });
        return numRecordsCreated;
    }
    async insertColumnValues(dbEntity, rawInsertColumnValues) {
        if (!rawInsertColumnValues) {
            return 0;
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const [fieldUtils, queryUtils] = await container(this)
            .get(FIELD_UTILS, QUERY_UTILS);
        let numInsertedRecords = 0;
        await transactional(async (transaction) => {
            numInsertedRecords = await this.internalInsertColumnValues(dbEntity, rawInsertColumnValues, queryUtils, fieldUtils, transaction);
        });
        return numInsertedRecords;
    }
    async insertValues(dbEntity, rawInsertValues) {
        if (!rawInsertValues) {
            return 0;
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const [fieldUtils, queryUtils] = await container(this)
            .get(FIELD_UTILS, QUERY_UTILS);
        let numInsertedRecords = 0;
        await transactional(async (transaction) => {
            numInsertedRecords = await this.internalInsertValues(dbEntity, rawInsertValues, queryUtils, fieldUtils, transaction);
        });
        return numInsertedRecords;
    }
    async insertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues) {
        if (!rawInsertColumnValues) {
            return [];
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const [fieldUtils, queryUtils] = await container(this)
            .get(FIELD_UTILS, QUERY_UTILS);
        let recordIdentifiers;
        await transactional(async (transaction) => {
            recordIdentifiers = await this.internalInsertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues, queryUtils, fieldUtils, transaction);
        });
    }
    async insertValuesGenerateIds(dbEntity, rawInsertValues) {
        if (!rawInsertValues) {
            return [];
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const [fieldUtils, queryFacade, queryUtils, transactionalServer] = await container(this)
            .get(FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, TRANS_SERVER);
        let recordIdentifiers;
        await transactional(async (transaction) => {
            recordIdentifiers = await this.internalInsertValuesGetIds(dbEntity, rawInsertValues, fieldUtils, queryFacade, queryUtils, transaction, transactionalServer);
        });
        return recordIdentifiers;
    }
    async delete(dbEntity, entity) {
        if (!entity) {
            return 0;
        }
        const [airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transactionalServer] = await container(this)
            .get(AIR_DB, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, TRANS_SERVER);
        let numDeletedRecords = 0;
        await transactional(async (transaction) => {
            numDeletedRecords = await this.performDelete(dbEntity, entity, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transaction, transactionalServer);
        });
        return numDeletedRecords;
    }
    async deleteWhere(dbEntity, rawDelete) {
        if (!rawDelete) {
            return 0;
        }
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        let deleteWhere = new Delete(rawDelete);
        const [fieldUtils, queryFacade, queryUtils, transactionalServer] = await container(this)
            .get(FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, TRANS_SERVER);
        let numDeletedRecords = 0;
        await transactional(async (transaction) => {
            numDeletedRecords = await this.internalDeleteWhere(dbEntity, deleteWhere, fieldUtils, queryFacade, queryUtils, transaction, transactionalServer);
        });
        return numDeletedRecords;
    }
    async save(dbEntity, entity, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        if (!dbEntity.idColumns.length) {
            throw new Error(`@Id is not defined for entity: '${dbEntity.name}'.
			Cannot call save(entity) on entities with no ids.`);
        }
        const [airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transactionalServer, updateCache] = await container(this)
            .get(AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, TRANS_SERVER, UPDATE_CACHE);
        let emptyIdCount = 0;
        let nonEmptyIdCount = 0;
        for (const dbColumn of dbEntity.idColumns) {
            const [propertyNameChains, idValue] = schemaUtils.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity);
            schemaUtils.isIdEmpty(idValue) ? emptyIdCount++ : nonEmptyIdCount++;
        }
        let numSavedRecords = 0;
        await transactional(async (transaction) => {
            if (emptyIdCount && nonEmptyIdCount) {
                throw new Error(`Cannot call save(entity) for instance of '${dbEntity.name}' which has
			${nonEmptyIdCount} @Id values specified and ${emptyIdCount} @Id values not specified.
			Please make sure that the entity instance either has all @Id values specified (to be
			updated) or non of @Id values specified (to be created).`);
            }
            else if (emptyIdCount) {
                numSavedRecords = await this.performCreate(dbEntity, entity, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transaction, transactionalServer, updateCache);
            }
            else {
                numSavedRecords = await this.performUpdate(dbEntity, entity, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transaction, transactionalServer, updateCache);
            }
        });
        return numSavedRecords;
    }
    async update(dbEntity, entity, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        const [airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transactionalServer, updateCache] = await container(this)
            .get(AIR_DB, FIELD_UTILS, Q_METADATA_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, TRANS_SERVER, UPDATE_CACHE);
        let numUpdatedRecords = 0;
        await transactional(async (transaction) => {
            numUpdatedRecords = await this.performUpdate(dbEntity, entity, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transaction, transactionalServer, updateCache);
        });
        return numUpdatedRecords;
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(dbEntity, rawUpdate) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        const [fieldUtils, queryFacade, queryUtils, transactionalServer] = await container(this)
            .get(FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, TRANS_SERVER);
        let update = new UpdateColumns(rawUpdate);
        let numUpdatedRecords = 0;
        await transactional(async (transaction) => {
            numUpdatedRecords = await this.internalUpdateColumnsWhere(dbEntity, update, fieldUtils, queryFacade, queryUtils, transaction, transactionalServer);
        });
        return numUpdatedRecords;
    }
    async updateWhere(dbEntity, rawUpdate) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        const [fieldUtils, queryFacade, queryUtils, transactionalServer] = await container(this)
            .get(FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, TRANS_SERVER);
        let update = new UpdateProperties(rawUpdate);
        let numUpdatedRecords = 0;
        await transactional(async (transaction) => {
            numUpdatedRecords = await this.internalUpdateWhere(dbEntity, update, fieldUtils, queryFacade, queryUtils, transaction, transactionalServer);
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