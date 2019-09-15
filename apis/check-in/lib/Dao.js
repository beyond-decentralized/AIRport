"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const EntityDatabaseFacade_1 = require("./EntityDatabaseFacade");
/**
 * Created by Papa on 8/26/2017.
 */
class Dao {
    constructor(dbEntityId, Q) {
        this.staged = new Set();
        const dbEntity = Q.__dbSchema__.currentVersion.entities[dbEntityId];
        // TODO: figure out how to inject EntityDatabaseFacade and dependencies
        this.db = new EntityDatabaseFacade_1.EntityDatabaseFacade(dbEntity, Q);
    }
    async bulkCreate(entities, cascadeOverwrite = ground_control_1.CascadeOverwrite.DEFAULT, checkIfProcessed = true) {
        const result = await this.db.bulkCreate(entities, cascadeOverwrite, checkIfProcessed);
        for (const entity of entities) {
            this.staged.delete(entity);
        }
        return result;
    }
    async count() {
        throw new Error(`Not Implemented`);
    }
    async create(entityInfo, cascadeGraph = ground_control_1.CascadeOverwrite.DEFAULT) {
        if (entityInfo instanceof Array) {
            return await this.db.bulkCreate(entityInfo, ground_control_1.CascadeOverwrite.DEFAULT, true);
        }
        else {
            const result = await this.db.create(entityInfo, cascadeGraph);
            this.staged.delete(entityInfo);
            return result;
        }
    }
    async delete(entityIdInfo, cascadeGraph = ground_control_1.CascadeOverwrite.DEFAULT) {
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
    async save(entity, cascadeGraph = ground_control_1.CascadeOverwrite.DEFAULT) {
        if (entity instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            const result = await this.db.save(entity, cascadeGraph);
            this.staged.delete(entity);
            return result;
        }
    }
    async stage(entity) {
        if (entity instanceof Array) {
            for (const anEntity of entity) {
                this.staged.add(anEntity);
            }
        }
        else {
            this.staged.add(entity);
        }
    }
    async update(entityInfo, cascadeGraph = ground_control_1.CascadeOverwrite.DEFAULT) {
        if (entityInfo instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            return await this.db.update(entityInfo, cascadeGraph);
        }
    }
}
exports.Dao = Dao;
//# sourceMappingURL=Dao.js.map