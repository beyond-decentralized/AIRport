"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
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
    async bulkCreate(entities, cascadeOverwrite = ground_control_1.CascadeOverwrite.DEFAULT, checkIfProcessed = true) {
        return await this.db.bulkCreate(entities, cascadeOverwrite, checkIfProcessed);
    }
    async count() {
        throw new Error(`Not Implemented`);
    }
    async create(entityInfo) {
        if (entityInfo instanceof Array) {
            return await this.db.bulkCreate(entityInfo, ground_control_1.CascadeOverwrite.DEFAULT, true);
        }
        else {
            return await this.db.create(entityInfo);
        }
    }
    async delete(entityIdInfo) {
        if (entityIdInfo instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            return await this.db.delete(entityIdInfo);
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
    async save(entity) {
        if (entity instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            return await this.db.save(entity);
        }
    }
    async stage(entity) {
        if (entity instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            throw new Error(`Not Implemented`);
        }
    }
    async update(entityInfo) {
        if (entityInfo instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            return await this.db.update(entityInfo);
        }
    }
}
exports.Dao = Dao;
//# sourceMappingURL=Dao.js.map