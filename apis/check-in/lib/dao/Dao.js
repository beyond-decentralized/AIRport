var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { and, doEnsureContext, Y } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { EntityDatabaseFacade } from '../EntityDatabaseFacade';
import { DaoStub } from './DaoStub';
/**
 * Created by Papa on 8/26/2017.
 */
let Dao = class Dao {
    constructor(dbEntityId, Q, internal = false) {
        this.internal = internal;
        this.stub = new DaoStub();
        const dbEntity = Q.__dbApplication__.currentVersion[0]
            .applicationVersion.entities[dbEntityId];
        // TODO: figure out how to inject EntityDatabaseFacade and dependencies
        this.db = new EntityDatabaseFacade(dbEntity, Q, this);
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
    async findById(repositoryEntityId, context, cacheForUpdate = false) {
        if (!this.db.dbEntity.isRepositoryEntity) {
            throw new Error(`Dao.findById can only be called for Repository Entities.`);
        }
        if (!repositoryEntityId.repository
            || !repositoryEntityId.repository.id
            || typeof repositoryEntityId.repository.id !== 'number'
            || !repositoryEntityId.actor
            || !repositoryEntityId.actor.id
            || typeof repositoryEntityId.actor.id !== 'number'
            || !repositoryEntityId.actorRecordId
            || typeof repositoryEntityId.actorRecordId !== 'number') {
            throw new Error(`Invalid Repository Entity Id.  Expecting:
				interface RepositoryEntityId {
					repository: {
						id: number
					},
					actor: {
						id: number
					},
					actorRecordId: number
				}
				`);
        }
        let q;
        return await this.db.findOne.graph({
            select: {},
            from: [q = this.db.from],
            where: and(q.repository.id.equals(repositoryEntityId.repository.id), q.actor.id.equals(repositoryEntityId.actor.id), q.actorRecordId.equals(repositoryEntityId.actorRecordId))
        }, context);
    }
    async save(entity, context) {
        return await this.db.save(entity, this.ensureContext(context));
    }
    markForDeletion(entityIdInfo, context) {
        if (entityIdInfo instanceof Array) {
            for (const anEntity of entityIdInfo) {
                this.entityStateManager.markForDeletion(anEntity);
            }
        }
        else {
            this.entityStateManager.markForDeletion(entityIdInfo);
        }
    }
    ensureContext(context) {
        return doEnsureContext(context);
    }
};
__decorate([
    Inject()
], Dao.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], Dao.prototype, "databaseFacade", void 0);
__decorate([
    Inject()
], Dao.prototype, "entityStateManager", void 0);
__decorate([
    Inject()
], Dao.prototype, "lookup", void 0);
__decorate([
    Inject()
], Dao.prototype, "updateCacheManager", void 0);
Dao = __decorate([
    Injected()
], Dao);
export { Dao };
//# sourceMappingURL=Dao.js.map