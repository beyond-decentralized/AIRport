"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const tower_1 = require("@airport/tower");
const EntityDatabaseFacade_1 = require("./EntityDatabaseFacade");
/**
 * Created by Papa on 8/26/2017.
 */
class Dao {
    constructor(dbEntityName, Q) {
        di_1.DI.get((airportDatabase, entityManager, utils) => {
            this.airDb = airportDatabase;
            this.utils = utils;
            const dbEntity = Q.__dbSchema__.currentVersion.entityMapByName[dbEntityName];
            const entityDatabaseFacade = new EntityDatabaseFacade_1.EntityDatabaseFacade(dbEntity, Q, this.utils);
            entityDatabaseFacade.initialize(entityManager);
            this.db = entityDatabaseFacade;
        }, air_control_1.AIR_DB, tower_1.ENTITY_MANAGER, air_control_1.UTILS);
    }
    get find() {
        return this.db.find;
    }
    get findOne() {
        return this.db.findOne;
    }
    get search() {
        return this.db.search;
    }
    get searchOne() {
        return this.db.searchOne;
    }
    releaseCachedForUpdate(updateCacheType, ...entities) {
        return this.db.releaseCachedForUpdate(updateCacheType, ...entities);
    }
    async bulkCreate(entities, cascade = false, checkIfProcessed = true) {
        return await this.db.bulkCreate(entities, cascade, checkIfProcessed);
    }
    async count() {
        throw `Not Implemented`;
    }
    async create(entityInfo) {
        if (entityInfo instanceof Array) {
            return await this.bulkCreate(entityInfo);
        }
        else {
            return await this.db.create(entityInfo);
        }
    }
    async delete(entityIdInfo) {
        if (entityIdInfo instanceof Array) {
            throw `Not Implemented`;
        }
        else {
            return await this.db.delete(entityIdInfo);
        }
    }
    async deleteAll() {
        throw `Not Implemented`;
    }
    exists(entityId) {
        throw `Not Implemented`;
    }
    async findAll(entityIds, cacheForUpdate = false) {
        if (entityIds) {
            throw `Not implemented`;
        }
        return await this.db.find.graph({
            select: {},
            from: [this.db.from],
        });
    }
    async findAllAsTrees(entityIds, cacheForUpdate = false) {
        if (entityIds) {
            throw `Not implemented`;
        }
        return await this.db.find.tree({
            select: {},
            from: [this.db.from],
        });
    }
    findById(entityId, cacheForUpdate = false) {
        throw `Not implemented`;
    }
    async save(entity) {
        if (entity instanceof Array) {
            throw `Not Implemented`;
        }
        else {
            return await this.db.save(entity);
        }
    }
    async stage(entity) {
        if (entity instanceof Array) {
            throw `Not Implemented`;
        }
        else {
            throw `Not Implemented`;
        }
    }
    async update(entityInfo) {
        if (entityInfo instanceof Array) {
            throw `Not Implemented`;
        }
        else {
            return await this.db.update(entityInfo);
        }
    }
}
exports.Dao = Dao;
//# sourceMappingURL=Dao.js.map