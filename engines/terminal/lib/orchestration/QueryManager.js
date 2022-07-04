var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ACTOR_PROPERTY_NAME, REPOSITORY_PROPERTY_NAME } from '@airport/air-traffic-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { EntityRelationType, QueryResultType } from '@airport/ground-control';
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
        let isGraph = false;
        switch (portableQuery.queryResultType) {
            case QueryResultType.ENTITY_GRAPH:
                isGraph = true;
                break;
            case QueryResultType.ENTITY_TREE:
                break;
            default:
                return;
        }
    }
    markEntityGraph(currentEntities, 
    // entitiesByOperationIndex: any[],
    processedEntitySet, entityMapByRepositoryId, entityMapByActorId, operationUniqueIdContainer, dbEntity) {
        for (const entity of currentEntities) {
            // const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId]
            if (processedEntitySet.has(entity)) {
                continue;
            }
            entity[this.entityStateManager.getUniqueIdFieldName()]
                = ++operationUniqueIdContainer.operationUniqueId;
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
                            switch (dbProperty.name) {
                                case ACTOR_PROPERTY_NAME:
                                    if (!propertyValue._localId) {
                                        throw new Error(`Actor entity does not have a _localId`);
                                    }
                                    continue;
                                case REPOSITORY_PROPERTY_NAME:
                                    continue;
                            }
                            relatedEntities = [propertyValue];
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                    }
                    this.markEntityGraph(relatedEntities, 
                    // entitiesByOperationIndex: any[],
                    processedEntitySet, entityMapByRepositoryId, entityMapByActorId, operationUniqueIdContainer, dbRelation.relationEntity);
                }
            }
        }
    }
    isRepositoryOrActor() {
    }
};
__decorate([
    Inject()
], QueryManager.prototype, "entityStateManager", void 0);
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