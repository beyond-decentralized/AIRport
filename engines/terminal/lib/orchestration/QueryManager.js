var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ACTOR_PROPERTY_NAME, REPOSITORY_PROPERTY_NAME, USER_PROPERTY_NAME } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { ensureChildArray, EntityRelationType, QueryResultType } from '@airport/ground-control';
let QueryManager = class QueryManager {
    async find(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        const entityArray = await this.storeDriver.find(portableQuery, {}, context, cachedSqlQueryId);
        await this.populateEntityGuidEntitiesAndUsers(portableQuery, entityArray);
        return entityArray;
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        const entity = await this.storeDriver.findOne(portableQuery, {}, context, cachedSqlQueryId);
        await this.populateEntityGuidEntitiesAndUsers(portableQuery, [entity]);
        return entity;
    }
    search(portableQuery, context, cachedSqlQueryId) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        return this.storeDriver.search(portableQuery, {}, context, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        return this.storeDriver.searchOne(portableQuery, {}, context, cachedSqlQueryId);
    }
    async ensureRepositoryPresenceAndCurrentState(context) {
        if (context.repository && context.repository.source && context.repository.GUID) {
            await this.repositoryLoader.loadRepository(context.repository.source, context.repository.GUID, context);
        }
    }
    // TODO: if needed use the Entity structure of the incoming portable query
    // to definitively process the results
    async populateEntityGuidEntitiesAndUsers(portableQuery, entities) {
        switch (portableQuery.queryResultType) {
            case QueryResultType.ENTITY_GRAPH:
            case QueryResultType.ENTITY_TREE:
                break;
            default:
                return;
        }
        const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
            .currentVersion[0].applicationVersion.entities[portableQuery.tableIndex];
        const entityMapByRepositoryLocalId = new Map();
        const entityMapByActorRecordId = new Map();
        const actorsToRetrieveUserForByLocalId = new Map();
        this.markEntities(entities, new Set(), entityMapByRepositoryLocalId, entityMapByActorRecordId, actorsToRetrieveUserForByLocalId, dbEntity);
        const actorIdSet = new Set();
        for (const actorLocalId of entityMapByActorRecordId.keys()) {
            actorIdSet.add(actorLocalId);
        }
        for (const actorLocalId of actorsToRetrieveUserForByLocalId.keys()) {
            actorIdSet.add(actorLocalId);
        }
        const actorLocalIds = Array.from(actorIdSet);
        const actors = await this.actorDao.findWithUsersAndTheirLocationBy_LocalIds(actorLocalIds);
        for (const actor of actors) {
            const entitiesWithoutActorObject = entityMapByActorRecordId.get(actor._localId);
            if (entitiesWithoutActorObject) {
                for (const entity of entitiesWithoutActorObject) {
                    entity.actor = actor;
                }
            }
            const actorWithoutUserObject = actorsToRetrieveUserForByLocalId.get(actor._localId);
            if (actorWithoutUserObject) {
                actorWithoutUserObject.user = actor.user;
            }
        }
        const repositoryLocalIds = Array.from(entityMapByRepositoryLocalId.keys());
        const repositories = await this.repositoryDao
            .findWithOwnerAndTheirLocationBy_LocalIds(repositoryLocalIds);
        for (const repository of repositories) {
            const entiesWithoutRepositoryObject = entityMapByRepositoryLocalId.get(repository._localId);
            for (const entity of entiesWithoutRepositoryObject) {
                entity.repository = repository;
            }
        }
    }
    markEntities(currentEntities, processedEntitySet, entityMapByRepositoryLocalId, entityMapByActorRecordId, actorsToRetrieveUserForByLocalId, dbEntity) {
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
                            if (this.processRepositoryOrActor(dbProperty, propertyValue, entityMapByRepositoryLocalId, entityMapByActorRecordId, actorsToRetrieveUserForByLocalId)) {
                                continue;
                            }
                            relatedEntities = [propertyValue];
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                    }
                    this.markEntities(relatedEntities, processedEntitySet, entityMapByRepositoryLocalId, entityMapByActorRecordId, actorsToRetrieveUserForByLocalId, dbRelation.relationEntity);
                }
            }
        }
    }
    processRepositoryOrActor(dbProperty, propertyValue, entityMapByRepositoryLocalId, entityMapByActorLocalId, actorsToRetrieveUserForByLocalId) {
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
            if (!propertyValue[USER_PROPERTY_NAME]) {
                actorsToRetrieveUserForByLocalId.set(propertyValue._localId, propertyValue);
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
};
__decorate([
    Inject()
], QueryManager.prototype, "actorDao", void 0);
__decorate([
    Inject()
], QueryManager.prototype, "airportDatabase", void 0);
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