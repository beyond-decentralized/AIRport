var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { Y } from '@airport/tarmaq-query';
import { EntityDatabaseFacade } from './EntityDatabaseFacade';
import { doEnsureContext } from './query/Lookup';
/**
 * Created by Papa on 8/26/2017.
 */
let Dao = class Dao {
    constructor(dbEntityId, Q, internal = false) {
        this.internal = internal;
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
    mapById(entities) {
        const map = new Map();
        for (const entity of entities) {
            map.set(entity.id, entity);
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
    async findOne(AirEntityId, forUpdate = false, context) {
        if (!this.db.dbEntity.isAirEntity) {
            throw new Error(`Dao.findOne can only be called for Repository Entities.`);
        }
        const idObject = AirEntityId;
        let q;
        return await this.db.findOne.graph({
            select: {
                '*': Y
            },
            from: [
                q = this.db.from
            ],
            where: q.equals(idObject),
            forUpdate
        }, context);
    }
    async findIn(airEntityIds, forUpdate, context) {
        if (!this.db.dbEntity.isAirEntity) {
            throw new Error(`Dao.findIn can only be called for Repository Entities.`);
        }
        let q;
        return await this.db.find.graph({
            select: {
                '*': Y
            },
            from: [
                q = this.db.from
            ],
            where: q.in(airEntityIds),
            forUpdate
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
                _localId: Y
            },
            _actorRecordId: Y,
            ageSuitability: Y,
            repository: {
                _localId: Y
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