import { DI } from '@airport/di';
import { ensureChildArray, EntityRelationType } from '@airport/ground-control';
import { DEPENDENCY_GRAPH_RESOLVER } from '../tokens';
/*
 * Takes a (potentially) interconnected entity graph and returns
 * an array of entities to be operated on, in a order that is valid
 * for insertion (with all needed new ids being inserted in an order
 * that will work).
 */
export class DependencyGraphResolver {
    getOperationsInOrder(entities, context) {
        const unorderedDependencies = this.getEntitiesToPersist(entities, [], context);
        this.resolveCircularDependencies(unorderedDependencies, context);
        const orderedDependencies = this.orderEntitiesToPersist(unorderedDependencies, context);
        const operationNodes = this.optimizePersistOperations(orderedDependencies, context);
        return this.ensureUpdatesAreGroupedCorrectly(operationNodes, context);
    }
    getEntitiesToPersist(entities, operatedOnEntities, context, dependsOn, dependency, deleteByCascade = false) {
        let allProcessedNodes = [];
        const dbEntity = context.dbEntity;
        for (const entity of entities) {
            /*
             * A passed in graph has either entities to be saved or
             * entity stubs that are needed structurally to get to
             * other entities (or parentIds in case part of an id
             * actually resides in a nested object that that object
             * has no associated operations or child entities of
             * it's own).
             */
            const { isCreate, isDelete, isParentId, isStub } = context.ioc.entityStateManager
                .getEntityStateTypeAsFlags(entity, dbEntity);
            if (isStub) {
                // No processing is needed
                continue;
            }
            const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity);
            if (deleteByCascade && (!isDelete || !isParentId)) {
                throw new Error(`Cannot do a Create or Update operation on an entity that will be
deleted by cascading rules.  Entity: ${dbEntity.name}.
Entity "${context.ioc.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`);
            }
            let dependencyGraphNode = operatedOnEntities[operationUniqueId];
            let isExistingNode = false;
            if (dependencyGraphNode) {
                isExistingNode = true;
            }
            else if (!isParentId && !deleteByCascade) {
                dependencyGraphNode = {
                    circleTraversedFor: {},
                    dbEntity,
                    dependsOnByOUID: [],
                    dependsOn: [],
                    entity,
                    isCreate,
                    isDelete
                };
                allProcessedNodes.push(dependencyGraphNode);
                operatedOnEntities[operationUniqueId] = dependencyGraphNode;
            }
            if (!isParentId && !isDelete) {
                if (dependsOn && !isDelete) {
                    const dependsOnOUID = context.ioc.entityStateManager.getOperationUniqueId(dependsOn.entity);
                    if (!dependencyGraphNode.dependsOnByOUID[dependsOnOUID]) {
                        dependencyGraphNode.dependsOnByOUID[dependsOnOUID] = dependsOn;
                        dependencyGraphNode.dependsOn.push(dependsOn);
                    }
                }
                if (dependency) {
                    if (!dependencyGraphNode.dependsOnByOUID[operationUniqueId]) {
                        dependency.dependsOnByOUID[operationUniqueId] = dependencyGraphNode;
                        dependency.dependsOn.push(dependencyGraphNode);
                    }
                }
            }
            if (isExistingNode) {
                continue;
            }
            for (const dbProperty of context.dbEntity.properties) {
                let childEntities;
                let propertyValue = entity[dbProperty.name];
                if (!propertyValue || typeof propertyValue !== 'object'
                    || !(dbProperty.relation && dbProperty.relation.length)) {
                    continue;
                }
                let fromDependencyForChild = null;
                let childIsDependency = false;
                let childDeleteByCascade = deleteByCascade || isDelete;
                const dbRelation = dbProperty.relation[0];
                switch (dbRelation.relationType) {
                    // Relation is an entity that this entity depends on
                    case EntityRelationType.MANY_TO_ONE:
                        childDeleteByCascade = false;
                        const childState = context.ioc.entityStateManager
                            .getEntityStateTypeAsFlags(entity, dbEntity);
                        if (childState.isParentId) {
                            continue;
                        }
                        if (childState.isDelete) {
                            if (!isDelete) {
                                throw new Error(`Cannot delete an entity without removing all references to it.
								Found a reference in ${dbEntity.name}.${dbProperty.name}.
								Entity "${context.ioc.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`);
                            }
                            else {
                                // Prune this entry
                                if (!deleteByCascade) {
                                    if (dependency) {
                                        dependency.dependsOn.pop();
                                    }
                                    allProcessedNodes.pop();
                                }
                                deleteByCascade = true;
                            }
                        }
                        if (childState.isCreate) {
                            childIsDependency = true;
                        }
                        childEntities = [propertyValue];
                        break;
                    // Relation is an array of entities that depend in this entity
                    case EntityRelationType.ONE_TO_MANY:
                        if (isCreate) {
                            fromDependencyForChild = dependencyGraphNode;
                        }
                        // Nested deletions wil be automatically pruned in recursive calls
                        childEntities = propertyValue;
                        break;
                }
                if (childEntities) {
                    const dbEntity = dbRelation.relationEntity;
                    const previousDbEntity = context.dbEntity;
                    context.dbEntity = dbEntity;
                    const childDependencyLinkedNodes = this.getEntitiesToPersist(childEntities, operatedOnEntities, context, fromDependencyForChild, !isParentId && !isDelete && childIsDependency ? dependencyGraphNode : null, childDeleteByCascade);
                    allProcessedNodes = allProcessedNodes.concat(childDependencyLinkedNodes);
                    context.dbEntity = previousDbEntity;
                }
            } // for properties
        } // for entities
        return allProcessedNodes;
    }
    resolveCircularDependencies(unorderedDependencies, context) {
        for (const node of unorderedDependencies) {
            const nodeOUID = context.ioc.entityStateManager.getOperationUniqueId(node.entity);
            this.resolveCircularDependenciesForNode(node, nodeOUID, node, context);
        }
    }
    resolveCircularDependenciesForNode(node, nodeOUID, currentlyTraversedNode, context, nodePath = []) {
        if (!currentlyTraversedNode.dependsOn
            || currentlyTraversedNode.circleTraversedFor[nodeOUID]) {
            return;
        }
        currentlyTraversedNode.circleTraversedFor[nodeOUID] = true;
        for (let i = currentlyTraversedNode.dependsOn.length - 1; i >= 0; i--) {
            const dependency = currentlyTraversedNode.dependsOn[i];
            const dependencyOUID = context.ioc.entityStateManager
                .getOperationUniqueId(dependency.entity);
            if (dependencyOUID === nodeOUID) {
                let entityPath = [];
                for (let pathNode of nodePath) {
                    let entityLongName = pathNode.dbEntity.schemaVersion.schema.name + ':' + pathNode.dbEntity.name;
                    entityPath.push(entityLongName);
                }
                let entityLongName = dependency.dbEntity.schemaVersion.schema.name + ':' + dependency.dbEntity.name;
                entityPath.push(entityLongName);
                entityLongName = nodePath[0].dbEntity.schemaVersion.schema.name + ':' + nodePath[0].dbEntity.name;
                throw new Error(`Found a circular dependency in
					${entityPath.join(' -> ')}
					`);
            }
            nodePath.push(dependency);
            this.resolveCircularDependenciesForNode(node, nodeOUID, dependency, context, nodePath);
            nodePath.pop();
        }
    }
    orderEntitiesToPersist(unorderedDependencies, context) {
        let orderedNodes = [];
        let processedNodes = [];
        while (orderedNodes.length < unorderedDependencies.length) {
            for (const node of unorderedDependencies) {
                const entityUid = context.ioc.entityStateManager
                    .getOperationUniqueId(node.entity);
                if (processedNodes[entityUid]) {
                    continue;
                }
                let nodeProcessed = true;
                for (const dependency of node.dependsOn) {
                    const dependencyUid = context.ioc.entityStateManager
                        .getOperationUniqueId(dependency.entity);
                    // If a dependency is not yet processed (and is possibly has
                    // other dependencies of it's own)
                    if (!processedNodes[dependencyUid]) {
                        nodeProcessed = false;
                        break;
                    }
                }
                if (nodeProcessed) {
                    processedNodes[entityUid] = node;
                    orderedNodes.push(node);
                }
            }
        }
        return orderedNodes;
    }
    // Group alike operations together, where possible
    optimizePersistOperations(orderedDependencies, context) {
        let operationNodes = [];
        let processedNodes = [];
        let operationsBySchemaIndex = [];
        for (const node of orderedDependencies) {
            const dbEntity = node.dbEntity;
            const schemaOperationNodes = ensureChildArray(operationsBySchemaIndex, dbEntity.schemaVersion.schema.index);
            let entityOperations = schemaOperationNodes[dbEntity.index];
            if (!entityOperations) {
                entityOperations = {
                    create: [],
                    delete: [],
                    update: []
                };
                schemaOperationNodes[dbEntity.index] = entityOperations;
            }
            let operations = [];
            if (node.isCreate) {
                operations = entityOperations.create;
            }
            else if (node.isDelete) {
                operations = entityOperations.delete;
            }
            else {
                operations = entityOperations.update;
            }
            let operation;
            if (!operations.length) {
                operation = {
                    dbEntity,
                    entities: [],
                    isCreate: node.isCreate,
                    isDelete: node.isDelete,
                };
                operations.push(operation);
                operationNodes.push(operation);
            }
            else {
                operation = operations[operations.length - 1];
            }
            // For each node traverse its dependencies
            // if it has dependencies that haven't been processed yet
            // then it can't be combined with an earlier alike operation
            // on the same entity
            let canBeCombined = true;
            for (const dependency of node.dependsOn) {
                const dependencyUid = context.ioc.entityStateManager
                    .getOperationUniqueId(dependency.entity);
                const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(dependency.entity);
                if (!processedNodes[dependencyUid]) {
                    canBeCombined = false;
                    break;
                }
            }
            if (!canBeCombined && operation.entities.length) {
                operation = {
                    dbEntity,
                    entities: [],
                    isCreate: node.isCreate,
                    isDelete: node.isDelete,
                };
                operations.push(operation);
                operationNodes.push(operation);
            }
            operation.entities.push(node.entity);
        }
        return operationNodes;
    }
    /**
     *
     * @param operationNodes
     * @param context
     */
    ensureUpdatesAreGroupedCorrectly(operationNodes, context) {
        // TODO: group related updates ONLY if all updates field values are
        // the same
        // throw new Error('Not Implemented.')
        return operationNodes;
    }
}
DI.set(DEPENDENCY_GRAPH_RESOLVER, DependencyGraphResolver);
//# sourceMappingURL=DependencyGraphResolver.js.map