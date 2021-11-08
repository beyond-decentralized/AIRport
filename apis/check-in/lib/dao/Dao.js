import { doEnsureContext, Y } from '@airport/air-control';
import { DI } from '@airport/di';
import { ENTITY_STATE_MANAGER } from '@airport/ground-control';
import { EntityDatabaseFacade } from '../EntityDatabaseFacade';
import { DaoStub } from './DaoStub';
/**
 * Created by Papa on 8/26/2017.
 */
export class Dao {
    constructor(dbEntityId, Q, internal = false) {
        this.internal = internal;
        this.stub = new DaoStub();
        const dbEntity = Q.__dbSchema__.currentVersion[0]
            .schemaVersion.entities[dbEntityId];
        // TODO: figure out how to inject EntityDatabaseFacade and dependencies
        this.db = new EntityDatabaseFacade(dbEntity, Q);
    }
    static BaseSave(config) {
        return function (target, propertyKey) {
            // No runtime logic required.
        };
    }
    async count(context) {
        throw new Error(`Not Implemented`);
    }
    exists(entityId, context) {
        throw new Error(`Not Implemented`);
    }
    repositoryId() {
        return {
            actor: {
                id: Y,
                uuId: Y
            },
            actorRecordId: Y,
            ageSuitability: Y,
            repository: {
                id: Y,
                uuId: Y
            }
        };
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
    async save(entity, context) {
        return await this.db.save(entity, this.ensureContext(context));
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