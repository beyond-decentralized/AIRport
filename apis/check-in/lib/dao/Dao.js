var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { and, doEnsureContext, Y } from '@airport/air-traffic-control';
import { REPOSITORY_ENTITY_UTILS } from '@airport/aviation-communication';
import { Inject, Injected, IOC } from '@airport/direction-indicator';
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
    mapByUuId(entities) {
        const map = new Map();
        for (const entity of entities) {
            map.set(entity.uuId, entity);
        }
        return map;
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
    async findById(repositoryEntityId, context, cacheForUpdate = false) {
        if (typeof repositoryEntityId === 'string') {
            repositoryEntityId = IOC.getSync(REPOSITORY_ENTITY_UTILS)
                .parseId(repositoryEntityId);
        }
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
    async findByUuId(repositoryEntityUuId, context) {
        if (typeof repositoryEntityUuId === 'string') {
            repositoryEntityUuId = IOC.getSync(REPOSITORY_ENTITY_UTILS)
                .parseUuId(repositoryEntityUuId);
        }
        if (!this.db.dbEntity.isRepositoryEntity) {
            throw new Error(`Dao.findByUuId can only be called for Repository Entities.`);
        }
        const idObject = repositoryEntityUuId;
        if (!idObject.repository
            || !idObject.repository.uuId
            || typeof idObject.repository.uuId !== 'string'
            || !idObject.actor
            || !idObject.actor.uuId
            || typeof idObject.actor.uuId !== 'number'
            || !idObject.actorRecordId
            || typeof idObject.actorRecordId !== 'number') {
            throw new Error(`Invalid Repository Entity Id.  Expecting:
				interface RepositoryEntityId {
					repository: {
						uuId: string
					},
					actor: {
						uuId: string
					},
					actorRecordId: number
				}
				`);
        }
        let q, r, a;
        return await this.db.findOne.graph({
            select: {},
            from: [
                q = this.db.from,
                r = q.repository.leftJoin(),
                a = q.actor.leftJoin()
            ],
            where: and(r.uuId.equals(idObject.repository.uuId), a.uuId.equals(idObject.actor.uuId), q.actorRecordId.equals(idObject.actorRecordId))
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
    _repositoryId() {
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
    /**
     * The Promise based API for all Entity 'find' (find many) queries.
     */
    async _find(rawGraphQuery, ctx) {
        return await this.db.find.graph(rawGraphQuery, ctx);
    }
    /**
     * The Promise based API for all Entity 'findOne' that also
     * ensures that the record is unique.  If multiple records
     * are found the ones with older createdAt values are deleted.
     */
    async _findUnique(rawGraphQuery, ctx) {
        const records = await this.db.find.graph(rawGraphQuery, ctx);
        if (!records.length) {
            return null;
        }
        if (records.length > 1) {
            // Remove older agreement records
            records.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            for (let i = 1; i < records.length; i++) {
                this.markForDeletion(records[i]);
            }
            await this.save(records);
        }
        return records[0];
    }
    /**
     * The Promise based API for all Entity 'findOne' queries.
     */
    async _findOne(rawGraphQuery, ctx) {
        return await this.db.findOne.graph(rawGraphQuery, ctx);
    }
    /**
     * The Observable based API for all Entity 'searchOne' (searchOne many) queries.
     */
    _search(rawGraphQuery, ctx) {
        throw new Error('Not implemented');
    }
    /**
     * The Observable based API for all Entity 'searchOne' queries.
     */
    _searchOne(rawGraphQuery, ctx) {
        throw new Error('Not implemented');
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