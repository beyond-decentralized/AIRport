var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { EntityRelationType } from '@airport/ground-control';
/**
 * Takes a serialized object tree and reconstructs a (potentially)
 * interlinked object graph.
 */
let EntityGraphReconstructor = class EntityGraphReconstructor {
    restoreEntityGraph(root, context) {
        const entitiesByOperationIndex = [];
        const processedEntitySet = new Set();
        const rootCopy = this.linkEntityGraph(root, entitiesByOperationIndex, processedEntitySet, context);
        for (let i = 1; i < entitiesByOperationIndex.length; i++) {
            const entity = entitiesByOperationIndex[i];
            if (!entity) {
                throw new Error(`Missing entity for
"${this.entityStateManager.getUniqueIdFieldName()}": ${i}`);
            }
        }
        context.lastOUID = entitiesByOperationIndex.length - 1;
        return rootCopy;
    }
    linkEntityGraph(currentEntities, entitiesByOperationIndex, processedEntitySet, context) {
        const dbEntity = context.dbEntity;
        const results = [];
        for (const entity of currentEntities) {
            if (!entity) {
                throw new Error(`Null root entities and @OneToMany arrays with null entities are not allowed`);
            }
            const operationUniqueId = this.entityStateManager.getOperationUniqueId(entity);
            if (!operationUniqueId || typeof operationUniqueId !== 'number'
                || operationUniqueId < 1) {
                throw new Error(`Invalid entity Unique Id Field
"${this.entityStateManager.getUniqueIdFieldName()}": ${operationUniqueId}.`);
            }
            const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId];
            if (processedEntitySet.has(entity)) {
                if (!previouslyFoundEntity) {
                    throw new Error(`Entity has been processed but is not found by operationUniqueId`);
                }
                results.push(previouslyFoundEntity);
                continue;
            }
            processedEntitySet.add(entity);
            /*
             * A passed in graph has either entities to be saved or
             * entity stubs that are needed structurally to get to
             * other entities.
             */
            const { isParentId, isStub } = this.entityStateManager
                .getEntityStateTypeAsFlags(entity, dbEntity);
            let entityCopy;
            if (previouslyFoundEntity) {
                if (!this.entityStateManager.isStub(previouslyFoundEntity)) {
                    if (!isStub) {
                        throw new Error(`More than 1 non-Stub object found in input
for "${this.entityStateManager.getUniqueIdFieldName()}": ${operationUniqueId}`);
                    }
                }
                else {
                    if (!isStub) {
                        this.entityStateManager.copyEntityState(entity, previouslyFoundEntity);
                    }
                }
                entityCopy = previouslyFoundEntity;
            }
            else {
                entityCopy = {};
                entityCopy[this.entityStateManager.getUniqueIdFieldName()]
                    = operationUniqueId;
                entityCopy[this.entityStateManager.getStateFieldName()]
                    = this.entityStateManager.getEntityState(entity);
                this.entityStateManager.copyEntityState(entity, entityCopy);
                entitiesByOperationIndex[operationUniqueId]
                    = entityCopy;
            }
            for (const dbProperty of dbEntity.properties) {
                let propertyValue = entity[dbProperty.name];
                if (propertyValue === undefined) {
                    continue;
                }
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    let relatedEntities = propertyValue;
                    let isManyToOne = false;
                    this.assertRelationValueIsAnObject(propertyValue, dbProperty);
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            isManyToOne = true;
                            this.assertManyToOneNotArray(propertyValue, dbProperty);
                            relatedEntities = [propertyValue];
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            this.assertOneToManyIsArray(propertyValue, dbProperty);
                            if (isParentId) {
                                throw new Error(`Parent Ids may not contain any @OneToMany relations`);
                            }
                            break;
                        default:
                            throw new Error(`Unexpected relation type ${dbRelation.relationType}
for ${dbEntity.name}.${dbProperty.name}`);
                    } // switch dbRelation.relationType
                    const previousDbEntity = context.dbEntity;
                    const previousDbApplication = previousDbEntity.applicationVersion.application;
                    const propertyDbApplication = dbRelation.relationEntity.applicationVersion.application;
                    if (propertyDbApplication.domain.name !== 'air'
                        && previousDbApplication.fullName !== propertyDbApplication.fullName) {
                        // If a child entity is in a different application it won't be processed
                        // the calling application should call the API of the other application
                        // explicitly so that the application logic may be run
                        continue;
                    }
                    context.dbEntity = dbRelation.relationEntity;
                    let propertyCopyValue;
                    if (propertyValue) {
                        propertyCopyValue = this.linkEntityGraph(relatedEntities, entitiesByOperationIndex, processedEntitySet, context);
                        if (isManyToOne) {
                            propertyCopyValue = propertyCopyValue[0];
                            if (isParentId) {
                                if (!this.entityStateManager.isParentId(propertyCopyValue)) {
                                    throw new Error(`Parent Ids may only contain @ManyToOne relations
that are themselves Parent Ids.`);
                                }
                            }
                        }
                        else {
                            if (isParentId) {
                                throw new Error(`Parent Ids may NOT contain @OneToMany colletions.`);
                            }
                        } // if (isManyToOne
                        // if !isManyToOne - nothing to do
                    } // if (propertyValue
                    propertyValue = propertyCopyValue;
                    context.dbEntity = previousDbEntity;
                } // if (dbProperty.relation
                else {
                    if ((isParentId || isStub) && !dbProperty.isId) {
                        // TODO: can a ParentId comprise of fields that are not part of it's own Id
                        // but are a part of Parent's Id?
                        throw new Error(`Deletes, ParentIds and Stubs may only contain @Id properties or relations.`);
                    }
                } // else (dbProperty.relation
                entityCopy[dbProperty.name] = propertyValue;
            } // for (const dbProperty
            results.push(entityCopy);
        } // for (const entity
        return results;
    }
    assertRelationValueIsAnObject(relationValue, dbProperty) {
        if (relationValue !== null && relationValue !== undefined &&
            (typeof relationValue != 'object' || relationValue instanceof Date)) {
            throw new Error(`Unexpected value in relation property: ${dbProperty.name}, 
				of entity ${dbProperty.entity.name}`);
        }
    }
    assertManyToOneNotArray(relationValue, dbProperty) {
        if (relationValue instanceof Array) {
            throw new Error(`@ManyToOne relation cannot be an array. Relation property: ${dbProperty.name}, 
of entity ${dbProperty.entity.name}`);
        }
    }
    assertOneToManyIsArray(relationValue, dbProperty) {
        if (relationValue !== null
            && relationValue !== undefined
            && !(relationValue instanceof Array)) {
            throw new Error(`@OneToMany relation must be an array. Relation property: ${dbProperty.name}, 
of entity ${dbProperty.entity.name}\``);
        }
    }
};
__decorate([
    Inject()
], EntityGraphReconstructor.prototype, "entityStateManager", void 0);
EntityGraphReconstructor = __decorate([
    Injected()
], EntityGraphReconstructor);
export { EntityGraphReconstructor };
//# sourceMappingURL=EntityGraphReconstructor.js.map