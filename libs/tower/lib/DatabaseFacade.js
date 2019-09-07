"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
const OperationManager_1 = require("./OperationManager");
const transactional_1 = require("./transactional");
/**
 * Created by Papa on 5/23/2016.
 */
class DatabaseFacade extends OperationManager_1.OperationManager {
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
    async addRepository(name, url = null, platform = terminal_map_1.PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = terminal_map_1.DistributionStrategy.S3_DISTIBUTED_PUSH) {
        const transConnector = await di_1.DI.get(ground_control_1.TRANS_CONNECTOR);
        return await transConnector.addRepository(name, url, platform, platformConfig, distributionStrategy);
    }
    async create(dbEntity, entity, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        const [airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.FIELD_UTILS, air_control_1.Q_METADATA_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, air_control_1.UPDATE_CACHE);
        return await transactional_1.transactional(async () => await this.performCreate(dbEntity, entity, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache));
    }
    async bulkCreate(dbEntity, entities, checkIfProcessed = true, cascadeOverwrite = ground_control_1.CascadeOverwrite.DEFAULT) {
        if (!entities || !entities.length) {
            return 0;
        }
        const [airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.FIELD_UTILS, air_control_1.Q_METADATA_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, air_control_1.UPDATE_CACHE);
        return await transactional_1.transactional(async () => await this.performBulkCreate(dbEntity, entities, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, checkIfProcessed, cascadeOverwrite));
    }
    async insertColumnValues(dbEntity, rawInsertColumnValues) {
        if (!rawInsertColumnValues) {
            return 0;
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const [fieldUtils, queryUtils] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_UTILS);
        let numInsertedRows = await this.internalInsertColumnValues(dbEntity, rawInsertColumnValues, queryUtils, fieldUtils);
        return numInsertedRows;
    }
    async insertValues(dbEntity, rawInsertValues) {
        if (!rawInsertValues) {
            return 0;
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const [fieldUtils, queryUtils] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_UTILS);
        return await transactional_1.transactional(async () => await this.internalInsertValues(dbEntity, rawInsertValues, queryUtils, fieldUtils));
    }
    async insertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues) {
        if (!rawInsertColumnValues) {
            return [];
        }
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        const [fieldUtils, queryUtils] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_UTILS);
        return await this.internalInsertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues, queryUtils, fieldUtils);
    }
    async insertValuesGenerateIds(dbEntity, rawInsertValues) {
        if (!rawInsertValues) {
            return [];
        }
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        const [fieldUtils, queryFacade, queryUtils, transConnector] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, ground_control_1.TRANS_CONNECTOR);
        return await transactional_1.transactional(async () => await this.internalInsertValuesGetIds(dbEntity, rawInsertValues, fieldUtils, queryFacade, queryUtils, transConnector));
    }
    async delete(dbEntity, entity, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        const [airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.FIELD_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR);
        return await transactional_1.transactional(async () => await this.performDelete(dbEntity, entity, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector));
    }
    async deleteWhere(dbEntity, rawDelete) {
        if (!rawDelete) {
            return 0;
        }
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        let deleteWhere = new air_control_1.Delete(rawDelete);
        const [fieldUtils, queryFacade, queryUtils, transConnector] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, ground_control_1.TRANS_CONNECTOR);
        return await transactional_1.transactional(async () => await this.internalDeleteWhere(dbEntity, deleteWhere, fieldUtils, queryFacade, queryUtils, transConnector));
    }
    async save(dbEntity, entity, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        if (!dbEntity.idColumns.length) {
            throw new Error(`@Id is not defined for entity: '${dbEntity.name}'.
			Cannot call save(entity) on entities with no ids.`);
        }
        const [airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.FIELD_UTILS, air_control_1.Q_METADATA_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, air_control_1.UPDATE_CACHE);
        let emptyIdCount = 0;
        let nonEmptyIdCount = 0;
        for (const dbColumn of dbEntity.idColumns) {
            const [propertyNameChains, idValue] = schemaUtils.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity);
            schemaUtils.isIdEmpty(idValue) ? emptyIdCount++ : nonEmptyIdCount++;
        }
        return await transactional_1.transactional(async () => {
            if (emptyIdCount && nonEmptyIdCount) {
                throw new Error(`Cannot call save(entity) for instance of '${dbEntity.name}' which has
			${nonEmptyIdCount} @Id values specified and ${emptyIdCount} @Id values not specified.
			Please make sure that the entity instance either has all @Id values specified (to be
			updated) or non of @Id values specified (to be created).`);
            }
            else if (emptyIdCount) {
                return await this.performCreate(dbEntity, entity, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache);
            }
            else {
                return await this.performUpdate(dbEntity, entity, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache);
            }
        });
    }
    async update(dbEntity, entity, cascadeGraph) {
        if (!entity) {
            return 0;
        }
        const [airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.DI.get(air_control_1.AIR_DB, air_control_1.FIELD_UTILS, air_control_1.Q_METADATA_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, air_control_1.UPDATE_CACHE);
        return await transactional_1.transactional(async () => await this.performUpdate(dbEntity, entity, [], airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache));
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
        const [fieldUtils, queryFacade, queryUtils, transConnector] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, ground_control_1.TRANS_CONNECTOR);
        let update = new air_control_1.UpdateColumns(rawUpdate);
        return await this.internalUpdateColumnsWhere(dbEntity, update, fieldUtils, queryFacade, queryUtils, transConnector);
    }
    async updateWhere(dbEntity, rawUpdate) {
        if (!rawUpdate) {
            return 0;
        }
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        const [fieldUtils, queryFacade, queryUtils, transConnector] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, ground_control_1.TRANS_CONNECTOR);
        let update = new air_control_1.UpdateProperties(rawUpdate);
        return await transactional_1.transactional(async () => await this.internalUpdateWhere(dbEntity, update, fieldUtils, queryFacade, queryUtils, transConnector));
    }
    ensureId(entity) {
        throw new Error(`Not Implemented`);
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
    async getOriginalValues(entitiesToUpdate, dbEntity, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache) {
        const qEntity = airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        let rawTreeQuery = {
            select: {},
            from: [qEntity],
            where: this.getIdsWhereClause(entitiesToUpdate, qEntity)
        };
        let entityQuery = new air_control_1.EntityQuery(rawTreeQuery);
        return await queryFacade.find(dbEntity, entityQuery, ground_control_1.QueryResultType.MAPPED_ENTITY_TREE, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache);
    }
    prepare(queryFunction) {
        return new FunctionWrapper(queryFunction);
    }
}
exports.DatabaseFacade = DatabaseFacade;
di_1.DI.set(air_control_1.DB_FACADE, DatabaseFacade);
class FunctionWrapper {
    constructor(queryFunction) {
        throw new Error('Not Implemented');
    }
    find(...params) {
    }
}
exports.FunctionWrapper = FunctionWrapper;
//# sourceMappingURL=DatabaseFacade.js.map