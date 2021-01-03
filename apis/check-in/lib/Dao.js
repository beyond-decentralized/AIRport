import { doEnsureContext, ENTITY_STATE_MANAGER, } from '@airport/air-control';
import { DI } from '@airport/di';
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
    async count(context) {
        throw new Error(`Not Implemented`);
    }
    exists(entityId, context) {
        throw new Error(`Not Implemented`);
    }
    async findAll(entityIds, context, cacheForUpdate = false) {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return await this.db.find.graph({
            select: {},
            from: [this.db.from],
        }, context);
    }
    async findAllAsTrees(entityIds, context, cacheForUpdate = false) {
        if (entityIds) {
            throw new Error(`Not implemented`);
        }
        return await this.db.find.tree({
            select: {},
            from: [this.db.from],
        }, context);
    }
    findById(entityId, context, cacheForUpdate = false) {
        throw new Error(`Not implemented`);
    }
    async save(entity, context, operationName) {
        if (entity instanceof Array) {
            throw new Error(`Not Implemented`);
        }
        else {
            const result = await this.db.save(entity, this.ensureContext(context), operationName);
            return result;
        }
    }
    markForDeletion(entityIdInfo, context) {
        const entityStateManager = DI.db().getSync(ENTITY_STATE_MANAGER);
        if (entityIdInfo instanceof Array) {
            for (const anEntity of entityIdInfo) {
                entityStateManager.markForDeletion(anEntity);
            }
        }
        else {
            entityStateManager.markForDeletion(entityIdInfo);
        }
    }
    ensureContext(context) {
        return doEnsureContext(context);
    }
}
//# sourceMappingURL=Dao.js.map