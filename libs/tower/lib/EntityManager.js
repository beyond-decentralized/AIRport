"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("./diTokens");
const OperationManager_1 = require("./OperationManager");
const transactional_1 = require("./transactional");
/**
 * Created by Papa on 5/23/2016.
 */
class EntityManager extends OperationManager_1.OperationManager {
    constructor() {
        super();
        this.find = new air_control_1.NonEntityFind(this, this.utils);
        this.findOne = new air_control_1.NonEntityFindOne(this, this.utils);
        this.search = new air_control_1.NonEntitySearch(this, this.utils);
        this.searchOne = new air_control_1.NonEntitySearchOne(this, this.utils);
        this.updateCache.databaseFacade = this;
    }
    cacheForUpdate(cacheForUpdate, dbEntity, ...entities) {
        this.updateCache.addToCache(cacheForUpdate, dbEntity, ...entities);
    }
    releaseCachedForUpdate(cacheForUpdate, dbEntity, ...entities) {
        this.updateCache.dropFromCache(cacheForUpdate, dbEntity, ...entities);
    }
    dropUpdateCache() {
        this.updateCache.dropCache();
    }
    async addRepository(name, url = null, platform = terminal_map_1.PlatformType.GOOGLE_DOCS, platformConfig = null, distributionStrategy = terminal_map_1.DistributionStrategy.S3_DISTIBUTED_PUSH) {
        return await this.transactionClient.addRepository(name, url, platform, platformConfig, distributionStrategy);
    }
    async create(dbEntity, entity) {
        return await transactional_1.transactional(async () => await this.performCreate(dbEntity, entity, []));
    }
    async bulkCreate(dbEntity, entities, checkIfProcessed = true, cascade = false) {
        return await transactional_1.transactional(async () => await this.performBulkCreate(dbEntity, entities, [], checkIfProcessed, cascade));
    }
    async insertColumnValues(dbEntity, rawInsertColumnValues) {
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        let numInsertedRows = await this.internalInsertColumnValues(dbEntity, rawInsertColumnValues);
        return numInsertedRows;
    }
    async insertValues(dbEntity, rawInsertValues) {
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        return await transactional_1.transactional(async () => await this.internalInsertValues(dbEntity, rawInsertValues));
    }
    async insertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues) {
        if (rawInsertColumnValues instanceof Function) {
            rawInsertColumnValues = rawInsertColumnValues();
        }
        let ids = await this.internalInsertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues);
        return ids;
    }
    async insertValuesGenerateIds(dbEntity, rawInsertValues) {
        if (rawInsertValues instanceof Function) {
            rawInsertValues = rawInsertValues();
        }
        return await transactional_1.transactional(async () => await this.internalInsertValuesGetIds(dbEntity, rawInsertValues));
    }
    async delete(dbEntity, entity) {
        return await transactional_1.transactional(async () => await this.performDelete(dbEntity, entity));
    }
    async deleteWhere(dbEntity, rawDelete) {
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        let deleteWhere = new air_control_1.Delete(rawDelete, this.utils);
        return await transactional_1.transactional(async () => await this.internalDeleteWhere(dbEntity, deleteWhere));
    }
    async save(dbEntity, entity) {
        if (!dbEntity.idColumns.length) {
            throw `@Id is not defined for entity: '${dbEntity.name}'.
			Cannot call save(entity) on entities with no ids.`;
        }
        let emptyIdCount = 0;
        let nonEmptyIdCount = 0;
        for (const dbColumn of dbEntity.idColumns) {
            const [propertyNameChains, idValue] = this.utils.Schema.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity);
            this.utils.Schema.isIdEmpty(idValue) ? emptyIdCount++ : nonEmptyIdCount++;
        }
        return await transactional_1.transactional(async () => {
            if (emptyIdCount && nonEmptyIdCount) {
                throw `Cannot call save(entity) for instance of '${dbEntity.name}' which has
			${nonEmptyIdCount} @Id values specified and ${emptyIdCount} @Id values not specified.
			Please make sure that the entity instance either has all @Id values specified (to be
			updated) or non of @Id values specified (to be created).`;
            }
            else if (emptyIdCount) {
                return await this.create(dbEntity, entity);
            }
            else {
                return await this.update(dbEntity, entity);
            }
        });
    }
    async update(dbEntity, entity) {
        return await transactional_1.transactional(async () => await this.performUpdate(dbEntity, entity, []));
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(dbEntity, rawUpdate) {
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        let update = new air_control_1.UpdateColumns(rawUpdate, this.utils);
        return await this.internalUpdateColumnsWhere(dbEntity, update);
    }
    async updateWhere(dbEntity, rawUpdate) {
        if (rawUpdate instanceof Function) {
            rawUpdate = rawUpdate();
        }
        let update = new air_control_1.UpdateProperties(rawUpdate, this.utils);
        return await transactional_1.transactional(async () => await this.internalUpdateWhere(dbEntity, update));
    }
    ensureId(entity) {
        throw `Not Implemented`;
    }
    async getOriginalRecord(dbEntity, idKey) {
        const originalRecord = this.updateCache.getOriginalRecord(dbEntity, idKey);
        if (!originalRecord) {
            throw `Cannot update '${dbEntity.name}' with composite id '${idKey}' - not found in update cache.
			Did you forget to add .andCacheForUpdate() to the query you used to retrieve the original?`;
        }
        return originalRecord;
    }
    async getOriginalValues(entitiesToUpdate, dbEntity) {
        const qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        let rawTreeQuery = {
            select: {},
            from: [qEntity],
            where: this.getIdsWhereClause(entitiesToUpdate, qEntity)
        };
        let entityQuery = new air_control_1.EntityQuery(rawTreeQuery, this.utils);
        return await this.entity.find(dbEntity, entityQuery, ground_control_1.QueryResultType.MAPPED_ENTITY_TREE);
    }
    prepare(queryFunction) {
        return new FunctionWrapper(queryFunction);
    }
}
exports.EntityManager = EntityManager;
di_1.DI.set(diTokens_1.ENTITY_MANAGER, EntityManager);
class FunctionWrapper {
    constructor(queryFunction) {
    }
    find(...params) {
    }
}
exports.FunctionWrapper = FunctionWrapper;
//# sourceMappingURL=EntityManager.js.map