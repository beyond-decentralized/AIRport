"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
const typedi_1 = require("typedi");
const decorators_1 = require("./decorators");
const InjectionTokens_1 = require("./InjectionTokens");
const OperationManager_1 = require("./OperationManager");
/**
 * Created by Papa on 5/23/2016.
 */
let EntityManager = class EntityManager extends OperationManager_1.OperationManager {
    constructor(airportDb, entity, coreUtils, transactionClient, updateCache) {
        super(airportDb, coreUtils, entity, transactionClient, updateCache);
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
        return await this.performCreate(dbEntity, entity, []);
    }
    async bulkCreate(dbEntity, entities, checkIfProcessed = true, cascade = false) {
        return await this.performBulkCreate(dbEntity, entities, [], checkIfProcessed, cascade);
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
        let numInsertedRows = await this.internalInsertValues(dbEntity, rawInsertValues);
        return numInsertedRows;
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
        let ids = await this.internalInsertValuesGetIds(dbEntity, rawInsertValues);
        return ids;
    }
    async delete(dbEntity, entity) {
        return await this.performDelete(dbEntity, entity);
    }
    async deleteWhere(dbEntity, rawDelete) {
        if (rawDelete instanceof Function) {
            rawDelete = rawDelete();
        }
        let deleteWhere = new air_control_1.Delete(rawDelete, this.utils);
        return await this.internalDeleteWhere(dbEntity, deleteWhere);
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
    }
    async update(dbEntity, entity) {
        return await this.performUpdate(dbEntity, entity, []);
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
        return await this.internalUpdateWhere(dbEntity, update);
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
        const qEntity = this.airportDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
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
};
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "create", null);
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "bulkCreate", null);
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "insertValues", null);
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "insertValuesGenerateIds", null);
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "delete", null);
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "deleteWhere", null);
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "save", null);
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "update", null);
__decorate([
    decorators_1.Transactional()
], EntityManager.prototype, "updateWhere", null);
EntityManager = __decorate([
    typedi_1.Service(InjectionTokens_1.EntityManagerToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(2, typedi_1.Inject(air_control_1.UtilsToken)),
    __param(3, typedi_1.Inject(ground_control_1.TransactionalConnectorToken)),
    __param(4, typedi_1.Inject(InjectionTokens_1.UpdateCacheToken))
], EntityManager);
exports.EntityManager = EntityManager;
class FunctionWrapper {
    constructor(queryFunction) {
    }
    find(...params) {
    }
}
exports.FunctionWrapper = FunctionWrapper;
//# sourceMappingURL=EntityManager.js.map