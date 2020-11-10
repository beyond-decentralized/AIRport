import { EntityDatabaseFacade } from './EntityDatabaseFacade';
/**
 * Created by Papa on 8/26/2017.
 */
export class Dao {
    constructor(dbEntityId, Q) {
        const dbEntity = Q.__dbSchema__.currentVersion.entities[dbEntityId];
        // TODO: figure out how to inject EntityDatabaseFacade and dependencies
        this.db = new EntityDatabaseFacade(dbEntity, Q);
    }
    async bulkCreate(entities, checkIfProcessed = true, ctx, operationName) {
        const result = await this.db.bulkCreate(entities, checkIfProcessed, ctx, operationName);
        return result;
    }
    async count(ctx) {
        throw new Error(`Not Implemented`);
    }
    async create(entityInfo, ctx, operationName) {
        if (entityInfo instanceof Array) {
            return await this.db.bulkCreate(entityInfo, true, ctx, operationName);
        }
        else {
            const result = await this.db.create(entityInfo, operationName);
            return result;
        }
    }
    async delete(entityIdInfo, ctx, operationName) {
        if (entityIdInfo instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            return await this.db.delete(entityIdInfo, ctx, operationName);
        }
    }
    async deleteAll(ctx) {
        throw new Error(`Not Implemented`);
    }
    exists(entityId, ctx) {
        throw new Error(`Not Implemented`);
    }
    async findAll(entityIds, ctx, cacheForUpdate = false) {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return await this.db.find.graph({
            select: {},
            from: [this.db.from],
        }, ctx);
    }
    async findAllAsTrees(entityIds, ctx, cacheForUpdate = false) {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return await this.db.find.tree({
            select: {},
            from: [this.db.from],
        }, ctx);
    }
    findById(entityId, ctx, cacheForUpdate = false) {
        throw new Error(`Not implemented`);
    }
    async save(entity, ctx, operationName) {
        if (entity instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            const result = await this.db.save(entity, ctx, operationName);
            return result;
        }
    }
    async update(entityInfo, ctx, operationName) {
        if (entityInfo instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            return await this.db.update(entityInfo, ctx, operationName);
        }
    }
}
//# sourceMappingURL=Dao.js.map