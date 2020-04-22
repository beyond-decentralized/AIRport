"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityDatabaseFacade_1 = require("./EntityDatabaseFacade");
/**
 * Created by Papa on 8/26/2017.
 */
class Dao {
    constructor(dbEntityId, Q) {
        const dbEntity = Q.__dbSchema__.currentVersion.entities[dbEntityId];
        // TODO: figure out how to inject EntityDatabaseFacade and dependencies
        this.db = new EntityDatabaseFacade_1.EntityDatabaseFacade(dbEntity, Q);
    }
    async bulkCreate(entities, checkIfProcessed = true, operationName) {
        const result = await this.db.bulkCreate(entities, checkIfProcessed, operationName);
        return result;
    }
    async count() {
        throw new Error(`Not Implemented`);
    }
    async create(entityInfo, operationName) {
        if (entityInfo instanceof Array) {
            return await this.db.bulkCreate(entityInfo, true, operationName);
        }
        else {
            const result = await this.db.create(entityInfo, operationName);
            return result;
        }
    }
    async delete(entityIdInfo, operationName) {
        if (entityIdInfo instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            return await this.db.delete(entityIdInfo, operationName);
        }
    }
    async deleteAll() {
        throw new Error(`Not Implemented`);
    }
    exists(entityId) {
        throw new Error(`Not Implemented`);
    }
    async findAll(entityIds, cacheForUpdate = false) {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return await this.db.find.graph({
            select: {},
            from: [this.db.from],
        });
    }
    async findAllAsTrees(entityIds, cacheForUpdate = false) {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return await this.db.find.tree({
            select: {},
            from: [this.db.from],
        });
    }
    findById(entityId, cacheForUpdate = false) {
        throw new Error(`Not implemented`);
    }
    async save(entity, operationName) {
        if (entity instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            const result = await this.db.save(entity, operationName);
            return result;
        }
    }
    async update(entityInfo, operationName) {
        if (entityInfo instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            return await this.db.update(entityInfo, operationName);
        }
    }
}
exports.Dao = Dao;
//# sourceMappingURL=Dao.js.map