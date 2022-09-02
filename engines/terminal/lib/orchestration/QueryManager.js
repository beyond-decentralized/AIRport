var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ACTOR_PROPERTY_NAME, REPOSITORY_PROPERTY_NAME, USER_ACCOUNT_PROPERTY_NAME } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { ensureChildArray, EntityRelationType, QueryResultType } from '@airport/ground-control';
;
let QueryManager = class QueryManager {
    async find(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        const entityArray = await this.storeDriver.find(portableQuery, {}, context, cachedSqlQueryId);
        await this.populateEntityGuidEntitiesAndUserAccounts(portableQuery, entityArray);
        return entityArray;
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        const entity = await this.storeDriver.findOne(portableQuery, {}, context, cachedSqlQueryId);
        await this.populateEntityGuidEntitiesAndUserAccounts(portableQuery, [entity]);
        return entity;
    }
    search(portableQuery, context, cachedSqlQueryId) {
        return this.observableQueryAdapter.wrapInObservable(portableQuery, () => {
            return this.storeDriver.find(portableQuery, {}, context)
                .then((result) => {
                return this.populateEntityGuidEntitiesAndUserAccounts(portableQuery, result);
            });
        });
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        return this.observableQueryAdapter.wrapInObservable(portableQuery, () => {
            return this.storeDriver.findOne(portableQuery, {}, context)
                .then((result) => {
                return this.populateEntityGuidEntitiesAndUserAccounts(portableQuery, [result])[0];
            });
        });
    }
    async ensureRepositoryPresenceAndCurrentState(context) {
        if (context.repository && context.repository.source && context.repository.GUID) {
            await this.repositoryLoader.loadRepository(context.repository.source, context.repository.GUID, context);
        }
    }
    async populateEntityGuidEntitiesAndUserAccounts(portableQuery, entities) {
        if (!entities.length) {
            return;
        }
        if (portableQuery.queryResultType !== QueryResultType.ENTITY_GRAPH
            && portableQuery.queryResultType !== QueryResultType.ENTITY_TREE) {
            return;
        }
        const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
            .currentVersion[0].applicationVersion.entities[portableQuery.tableIndex];
        const entityMapByRepositoryLocalId = new Map();
        const entityMapByActorRecordId = new Map();
        const actorsToRetrieveUserAccountForByLocalId = new Map();
        this.markEntities(entities, new Set(), entityMapByRepositoryLocalId, entityMapByActorRecordId, actorsToRetrieveUserAccountForByLocalId, dbEntity);
        await this.populateActorsAndUserAccounts(entityMapByActorRecordId, actorsToRetrieveUserAccountForByLocalId);
        await this.populateRepositories(entityMapByRepositoryLocalId);
        return entities;
    }
    markEntities(currentEntities, processedEntitySet, entityMapByRepositoryLocalId, entityMapByActorRecordId, actorsToRetrieveUserAccountForByLocalId, dbEntity) {
        for (const entity of currentEntities) {
            // const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId]
            if (processedEntitySet.has(entity)) {
                continue;
            }
            processedEntitySet.add(entity);
            for (const dbProperty of dbEntity.properties) {
                let propertyValue = entity[dbProperty.name];
                if (!propertyValue) {
                    continue;
                }
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    let relatedEntities = propertyValue;
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            if (this.processRepositoryOrActor(dbProperty, propertyValue, entityMapByRepositoryLocalId, entityMapByActorRecordId, actorsToRetrieveUserAccountForByLocalId)) {
                                continue;
                            }
                            relatedEntities = [propertyValue];
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                    }
                    this.markEntities(relatedEntities, processedEntitySet, entityMapByRepositoryLocalId, entityMapByActorRecordId, actorsToRetrieveUserAccountForByLocalId, dbRelation.relationEntity);
                }
            }
        }
    }
    processRepositoryOrActor(dbProperty, propertyValue, entityMapByRepositoryLocalId, entityMapByActorLocalId, actorsToRetrieveUserAccountForByLocalId) {
        let isActor = true;
        switch (dbProperty.name) {
            case ACTOR_PROPERTY_NAME:
                break;
            case REPOSITORY_PROPERTY_NAME:
                isActor = false;
                break;
            default:
                return false;
        }
        if (!propertyValue._localId) {
            throw new Error(`Actor entity does not have a _localId`);
        }
        if (propertyValue.GUID) {
            if (!isActor) {
                return true;
            }
            if (!propertyValue[USER_ACCOUNT_PROPERTY_NAME]) {
                actorsToRetrieveUserAccountForByLocalId.set(propertyValue._localId, propertyValue);
            }
            return true;
        }
        if (isActor) {
            ensureChildArray(entityMapByActorLocalId, propertyValue._localId)
                .push(propertyValue);
        }
        else {
            ensureChildArray(entityMapByRepositoryLocalId, propertyValue._localId)
                .push(propertyValue);
        }
        return true;
    }
    async populateActorsAndUserAccounts(entityMapByActorRecordId, actorsToRetrieveUserAccountForByLocalId) {
        const actorIdSet = new Set();
        for (const actorLocalId of entityMapByActorRecordId.keys()) {
            actorIdSet.add(actorLocalId);
        }
        for (const actorLocalId of actorsToRetrieveUserAccountForByLocalId.keys()) {
            actorIdSet.add(actorLocalId);
        }
        const actorLocalIds = Array.from(actorIdSet);
        const actors = await this.actorDao.findWithUserAccountBy_LocalIdIn(actorLocalIds);
        for (const actor of actors) {
            const entitiesWithoutActorObject = entityMapByActorRecordId.get(actor._localId);
            if (entitiesWithoutActorObject) {
                for (const entity of entitiesWithoutActorObject) {
                    entity.actor = actor;
                }
            }
            const actorWithoutUserAccountObject = actorsToRetrieveUserAccountForByLocalId.get(actor._localId);
            if (actorWithoutUserAccountObject) {
                actorWithoutUserAccountObject.userAccount = actor.userAccount;
            }
        }
    }
    async populateRepositories(entityMapByRepositoryLocalId) {
        const repositoryLocalIds = Array.from(entityMapByRepositoryLocalId.keys());
        const repositories = await this.repositoryDao
            .findWithOwnerBy_LocalIdIn(repositoryLocalIds);
        for (const repository of repositories) {
            const entiesWithoutRepositoryObject = entityMapByRepositoryLocalId.get(repository._localId);
            for (const entity of entiesWithoutRepositoryObject) {
                entity.repository = repository;
            }
        }
    }
};
__decorate([
    Inject()
], QueryManager.prototype, "actorDao", void 0);
__decorate([
    Inject()
], QueryManager.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], QueryManager.prototype, "observableQueryAdapter", void 0);
__decorate([
    Inject()
], QueryManager.prototype, "repositoryDao", void 0);
__decorate([
    Inject()
], QueryManager.prototype, "repositoryLoader", void 0);
__decorate([
    Inject()
], QueryManager.prototype, "storeDriver", void 0);
QueryManager = __decorate([
    Injected()
], QueryManager);
export { QueryManager };
//# sourceMappingURL=QueryManager.js.map