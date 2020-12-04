import { DI } from '@airport/di';
import { EntityRelationType } from '@airport/ground-control';
import { ENTITY_GRAPH_RECONSTRUCTOR } from '../tokens';
/**
 * Takes a serialized object tree and reconstructs a (potentially)
 * interlinked object graph.
 */
export class EntityGraphReconstructor {
    restoreEntityGraph(root, context) {
        const entitiesByOperationIndex = [];
        const rootCopy = this.linkEntityGraph(root, entitiesByOperationIndex, context);
        for (let i = 1; i < entitiesByOperationIndex.length; i++) {
            const entity = entitiesByOperationIndex[i];
            if (!entity) {
                throw new Error(`Missing entity for
"${context.ioc.entityStateManager.getUniqueIdFieldName()}": ${i}`);
            }
        }
        return rootCopy;
    }
    linkEntityGraph(currentEntities, entitiesByOperationIndex, context) {
        const dbEntity = context.dbEntity;
        const results = [];
        for (const entity of currentEntities) {
            if (!entity) {
                throw `Null root entities @OneToMany arrays with null entities are not allowed`;
            }
            const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity);
            if (!operationUniqueId || typeof operationUniqueId !== 'number'
                || operationUniqueId < 1) {
                throw `Invalid entity Unique Id Field
"${context.ioc.entityStateManager.getUniqueIdFieldName()}": ${operationUniqueId}.`;
            }
            /*
             * A passed in graph has either entities to be saved or
             * entity stubs that are needed structurally to get to
             * other entities.
             */
            const [isCreate, isDelete, isParentId, isUpdate, isStub] = context.ioc.entityStateManager
                .getEntityStateTypeAsFlags(entity, dbEntity);
            const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId];
            let entityCopy;
            if (previouslyFoundEntity) {
                if (!context.ioc.entityStateManager.isStub(previouslyFoundEntity)) {
                    if (!isStub) {
                        throw new Error(`More than 1 non-Stub object found in input
for "${context.ioc.entityStateManager.getUniqueIdFieldName()}": ${operationUniqueId}`);
                    }
                }
                else {
                    if (!isStub) {
                        context.ioc.entityStateManager.copyEntityState(entity, previouslyFoundEntity);
                    }
                }
                entityCopy = previouslyFoundEntity;
            }
            else {
                entityCopy = {};
                entityCopy[context.ioc.entityStateManager.getUniqueIdFieldName()]
                    = operationUniqueId;
                entityCopy[context.ioc.entityStateManager.getStateFieldName()]
                    = context.ioc.entityStateManager.getEntityState(entity);
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
                    context.dbEntity = dbRelation.relationEntity;
                    let propertyCopyValue;
                    if (propertyValue) {
                        propertyCopyValue = this.linkEntityGraph(relatedEntities, entitiesByOperationIndex, context);
                        if (isManyToOne) {
                            propertyCopyValue = propertyCopyValue[0];
                            if (isParentId) {
                                if (!context.ioc.entityStateManager.isParentId(propertyCopyValue)) {
                                    throw new Error(`Parent Ids may only contain @ManyToOne relations
that are themselves Parent Ids.`);
                                }
                            }
                        } // if (isManyToOne
                        else {
                            if (propertyValue) {
                                propertyCopyValue = propertyValue.concat(propertyCopyValue);
                            }
                        }
                    } // if (propertyValue
                    propertyValue = propertyCopyValue;
                    context.dbEntity = previousDbEntity;
                } // if (dbProperty.relation
                else {
                    if ((isDelete || isParentId || isStub) && !dbProperty.isId) {
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
}
DI.set(ENTITY_GRAPH_RECONSTRUCTOR, EntityGraphReconstructor);
//# sourceMappingURL=EntityGraphReconstructor.js.map