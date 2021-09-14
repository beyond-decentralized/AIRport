import { IEntityCascadeGraph } from '@airport/air-control'
import { DI } from '@airport/di'
import {
	ensureChildArray,
	EntityRelationType
} from '@airport/ground-control'
import {
	IDependencyGraphNode,
	IDependencyGraphResolver,
	IOperationContext,
	IOperationsForEntity,
	IOperationNode
} from '@airport/terminal-map'
import { DEPENDENCY_GRAPH_RESOLVER } from '../tokens'

/*
 * Takes a (potentially) interconnected entity graph and returns
 * an array of entities to be operated on, in a order that is valid
 * for insertion (with all needed new ids being inserted in an order
 * that will work).
 */
export class DependencyGraphResolver
	implements IDependencyGraphResolver {

	getOperationsInOrder<E>(
		entities: E[],
		context: IOperationContext,
	): IOperationNode<E>[] {
		const unorderedDependencies = this.getEntitiesToPersist(
			entities, [], context)
		const orderedDependencies = this.orderEntitiesToPersist(
			unorderedDependencies, context)

		const operationNodes = this.optimizePersistOperations<E>(orderedDependencies, context)

		return this.ensureUpdatesAreGroupedCorrectly(operationNodes, context)
	}

	protected getEntitiesToPersist<E>(
		entities: E[],
		operatedOnEntities: IDependencyGraphNode<any>[],
		context: IOperationContext,
		dependsOn?: IDependencyGraphNode<any>,
		dependency?: IDependencyGraphNode<any>,
		deleteByCascade = false,
	): IDependencyGraphNode<any>[] {
		let allProcessedNodes: IDependencyGraphNode<any>[] = []
		const dbEntity = context.dbEntity

		for (const entity of entities) {
			/*
			 * A passed in graph has either entities to be saved or
			 * entity stubs that are needed structurally to get to
			 * other entities (or parentIds in case part of an id
			 * actually resides in a nested object that that object
			 * has no associated operations or child entities of
			 * it's own).
			 */
			const {
				isCreate,
				isDelete,
				isParentId,
				isStub
			} = context.ioc.entityStateManager
				.getEntityStateTypeAsFlags(entity, dbEntity)

			if (isStub) {
				// No processing is needed
				continue
			}

			const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity)
			if (deleteByCascade && (!isDelete || !isParentId)) {
				throw new Error(`Cannot do a Create or Update operation on an entity that will be
deleted by cascading rules.  Entity: ${dbEntity.name}.
Entity "${context.ioc.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`)
			}

			let dependencyGraphNode: IDependencyGraphNode<E> = operatedOnEntities[operationUniqueId]
			let isExistingNode = false
			if (dependencyGraphNode) {
				isExistingNode = true
			} else if (!isParentId && !deleteByCascade) {
				dependencyGraphNode = {
					dbEntity,
					dependsOnByOUID: [],
					dependsOn: [],
					entity,
					isCreate,
					isDelete
				}
				allProcessedNodes.push(dependencyGraphNode)
				operatedOnEntities[operationUniqueId] = dependencyGraphNode
			}
			if (!isDelete) {
				if (dependsOn && !isDelete) {
					const dependsOnOUID = context.ioc.entityStateManager.getOperationUniqueId(dependsOn.entity)
					if (!dependencyGraphNode.dependsOnByOUID[dependsOnOUID]) {
						dependencyGraphNode.dependsOnByOUID[dependsOnOUID] = dependsOn
						dependencyGraphNode.dependsOn.push(dependsOn)
					}
				}
				if (dependency) {
					if (!dependencyGraphNode.dependsOnByOUID[operationUniqueId]) {
						dependency.dependsOnByOUID[operationUniqueId] = dependencyGraphNode
						dependency.dependsOn.push(dependencyGraphNode)
					}
				}
			}
			if (isExistingNode) {
				continue
			}

			for (const dbProperty of context.dbEntity.properties) {
				let childEntities
				let propertyValue: any = entity[dbProperty.name]
				if (!propertyValue || typeof propertyValue !== 'object'
					|| !(dbProperty.relation && dbProperty.relation.length)) {
					continue
				}
				let fromDependencyForChild: IDependencyGraphNode<E> = null
				let childIsDependency = false
				let childDeleteByCascade = deleteByCascade || isDelete
				const dbRelation = dbProperty.relation[0]
				switch (dbRelation.relationType) {
					// Relation is an entity that this entity depends on
					case EntityRelationType.MANY_TO_ONE:
						childDeleteByCascade = false
						const childState = context.ioc.entityStateManager
							.getEntityStateTypeAsFlags(entity, dbEntity)
						if (childState.isParentId) {
							continue
						}
						if (childState.isDelete) {
							if (!isDelete) {
								throw new Error(`Cannot delete an entity without removing all references to it.
								Found a reference in ${dbEntity.name}.${dbProperty.name}.
								Entity "${context.ioc.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`)
							} else {
								// Prune this entry
								if (!deleteByCascade) {
									if (dependency) {
										dependency.dependsOn.pop()
									}
									allProcessedNodes.pop()
								}
								deleteByCascade = true
							}
						}
						if (childState.isCreate) {
							childIsDependency = true
						}
						childEntities = [propertyValue]
						break
					// Relation is an array of entities that depend in this entity
					case EntityRelationType.ONE_TO_MANY:
						if (isCreate) {
							fromDependencyForChild = dependencyGraphNode
						}
						// Nested deletions wil be automatically pruned in recursive calls
						childEntities = propertyValue
						break
				}
				if (childEntities) {
					const dbEntity = dbRelation.relationEntity
					const previousDbEntity = context.dbEntity
					context.dbEntity = dbEntity
					const childDependencyLinkedNodes = this.getEntitiesToPersist(
						childEntities, operatedOnEntities, context, fromDependencyForChild,
						!isParentId && !isDelete && childIsDependency ? dependencyGraphNode : null,
						childDeleteByCascade)
					allProcessedNodes = allProcessedNodes.concat(childDependencyLinkedNodes)
					context.dbEntity = previousDbEntity
				}
			} // for properties
		} // for entities

		return allProcessedNodes
	}

	protected orderEntitiesToPersist<E>(
		unorderedDependencies: IDependencyGraphNode<any>[],
		context: IOperationContext,
	): IDependencyGraphNode<any>[] {
		let orderedNodes: IDependencyGraphNode<any>[] = []
		let processedNodes: IDependencyGraphNode<any>[] = []
		while (orderedNodes.length < unorderedDependencies.length) {
			for (const node of unorderedDependencies) {
				const entityUid = context.ioc.entityStateManager
					.getOperationUniqueId(node.entity)
				if (processedNodes[entityUid]) {
					continue;
				}
				let nodeProcessed = true;
				for (const dependency of node.dependsOn) {
					const dependencyUid = context.ioc.entityStateManager
						.getOperationUniqueId(dependency.entity)
					// If a dependency is not yet processed (and is possibly has
					// other dependencies of it's own)
					if (!processedNodes[dependencyUid]) {
						nodeProcessed = false;
						break;
					}
				}
				if (nodeProcessed) {
					processedNodes[entityUid] = node
					orderedNodes.push(node)
				}
			}
		}
		return orderedNodes
	}

	// Group alike operations together, where possible
	protected optimizePersistOperations<E>(
		orderedDependencies: IDependencyGraphNode<any>[],
		context: IOperationContext,
	): IOperationNode<E>[] {
		let operationNodes: IOperationNode<any>[] = []
		let processedNodes: IDependencyGraphNode<any>[] = []
		let operationsBySchemaIndex: IOperationsForEntity[][] = []

		for (const node of orderedDependencies) {
			const dbEntity = node.dbEntity
			const schemaOperationNodes = ensureChildArray(operationsBySchemaIndex,
				dbEntity.schemaVersion.schema.index)

			let entityOperations = schemaOperationNodes[dbEntity.index]
			if (!entityOperations) {
				entityOperations = {
					create: [],
					delete: [],
					update: []
				}
				schemaOperationNodes[dbEntity.index] = entityOperations
			}
			let operations: IOperationNode<any>[] = []
			if (node.isCreate) {
				operations = entityOperations.create
			} else if (node.isDelete) {
				operations = entityOperations.delete
			} else {
				operations = entityOperations.update
			}
			let operation: IOperationNode<any>
			if (!operations.length) {
				operation = {
					dbEntity,
					entities: [],
					isCreate: node.isCreate,
					isDelete: node.isDelete,
				}
				operations.push(operation)
				operationNodes.push(operation)
			} else {
				operation = operations[operations.length - 1]
			}

			// For each node traverse its dependencies
			// if it has dependencies that haven't been processed yet
			// then it can't be combined with an earlier alike operation
			// on the same entity
			let canBeCombined = true
			for (const dependency of node.dependsOn) {
				const dependencyUid = context.ioc.entityStateManager
					.getOperationUniqueId(dependency.entity)
				const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(dependency.entity)
				if (!processedNodes[dependencyUid]) {
					canBeCombined = false
					break
				}
			}
			if (!canBeCombined && operation.entities.length) {
				operation = {
					dbEntity,
					entities: [],
					isCreate: node.isCreate,
					isDelete: node.isDelete,
				}
				operations.push(operation)
				operationNodes.push(operation)
			}
			operation.entities.push(node.entity)
		}

		return operationNodes
	}

	/**
	 *
	 * @param operationNodes
	 * @param context
	 */
	ensureUpdatesAreGroupedCorrectly<E>(
		operationNodes: IOperationNode<E>[],
		context: IOperationContext
	): IOperationNode<E>[] {
		// TODO: group related updates ONLY if all updates field values are
		// the same
		// throw new Error('Not Implemented.')
		return operationNodes
	}
}

DI.set(DEPENDENCY_GRAPH_RESOLVER, DependencyGraphResolver)
