import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	Dictionary,
	EntityRelationType,
	IAirEntity,
	IDatastructureUtils,
	IEntityStateManager
} from '@airport/ground-control'
import {
	IDependencyGraphNode,
	IDependencyGraphResolver,
	IOperationContext,
	IOperationsForEntity,
	IOperationNode
} from '@airport/terminal-map'

/*
 * Takes a (potentially) interconnected entity graph and returns
 * an array of entities to be operated on, in a order that is valid
 * for insertion (with all needed new _localIds being inserted in an order
 * that will work).
 */
@Injected()
export class DependencyGraphResolver
	implements IDependencyGraphResolver {

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	entityStateManager: IEntityStateManager

	getOperationsInOrder<E extends IAirEntity>(
		entities: E[],
		context: IOperationContext,
	): IOperationNode<E>[] {
		const unorderedDependencies = this.getEntitiesToPersist(
			entities, [], [], context)
		this.resolveCircularDependencies(
			unorderedDependencies, context
		)
		const orderedDependencies = this.orderEntitiesToPersist(
			unorderedDependencies, context)

		const operationNodes = this.optimizePersistOperations<E>(orderedDependencies, context)

		return this.ensureUpdatesAreGroupedCorrectly(operationNodes, context)
	}

	protected getEntitiesToPersist<E extends IAirEntity>(
		entities: E[],
		operatedOnEntities: IDependencyGraphNode<any>[],
		operatedOnPassThroughs: boolean[],
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
				isFromAnotherApp,
				isPassThrough,
				isStub,
				isUpdate
			} = this.entityStateManager
				.getEntityStateTypeAsFlags(entity, dbEntity)

			if (isStub) {
				// No processing is needed
				continue
			}

			const operationUniqueId = this.entityStateManager.getOperationUniqueId(entity)
			if (deleteByCascade && (isCreate || isUpdate)) {
				throw new Error(`Cannot do a Create or Update operation on an entity that will be
deleted by cascading rules.  Entity: ${dbEntity.name}.
Entity "${this.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`)
			}

			let dependencyGraphNode: IDependencyGraphNode<E>
			if (isPassThrough) {
				if (operatedOnPassThroughs[operationUniqueId]) {
					continue
				} else {
					operatedOnPassThroughs[operationUniqueId] = true
				}
			} else {
				dependencyGraphNode = operatedOnEntities[operationUniqueId]
				let isExistingNode = false
				if (dependencyGraphNode) {
					isExistingNode = true
				} else if (!isFromAnotherApp && !deleteByCascade) {
					dependencyGraphNode = {
						circleTraversedFor: {},
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
				if (!isFromAnotherApp && !isDelete) {
					if (dependsOn && !isDelete) {
						const dependsOnOUID = this.entityStateManager.getOperationUniqueId(dependsOn.entity)
						if (!dependencyGraphNode.dependsOnByOUID[dependsOnOUID]
							&& this.entityStateManager
								.getOperationUniqueId(dependencyGraphNode.entity) !== dependsOnOUID) {
							dependencyGraphNode.dependsOnByOUID[dependsOnOUID] = dependsOn
							dependencyGraphNode.dependsOn.push(dependsOn)
						}
					}
					if (dependency) {
						if (!dependencyGraphNode.dependsOnByOUID[operationUniqueId]
							&& this.entityStateManager
								.getOperationUniqueId(dependency.entity) !== operationUniqueId) {
							dependency.dependsOnByOUID[operationUniqueId] = dependencyGraphNode
							dependency.dependsOn.push(dependencyGraphNode)
						}
					}
				}
				if (isExistingNode) {
					continue
				}
			}

			for (const dbProperty of context.dbEntity.properties) {
				let relatedEntities
				let propertyValue: any = entity[dbProperty.name]
				if (!propertyValue || typeof propertyValue !== 'object'
					|| !(dbProperty.relation && dbProperty.relation.length)) {
					continue
				}
				let fromDependencyForChild: IDependencyGraphNode<E> = null
				let isDependency = false
				let childDeleteByCascade = deleteByCascade || isDelete
				const dbRelation = dbProperty.relation[0]
				switch (dbRelation.relationType) {
					// Relation is an entity that this entity depends on
					case EntityRelationType.MANY_TO_ONE:
						childDeleteByCascade = false

						// TODO: see if there is a cleaner way to escape nested Actor and Repository records
						if (dbEntity.isAirEntity && (
							this.dictionary.isActor(dbRelation.relationEntity)
							|| this.dictionary.isRepository(dbRelation.relationEntity))
							&& !propertyValue[this.entityStateManager.getStateFieldName()]) {
							continue
						}

						const parentState = this.entityStateManager
							.getEntityStateTypeAsFlags(propertyValue, dbRelation.relationEntity)
						if (parentState.isFromAnotherApp) {
							continue
						}
						if (parentState.isDelete) {
							if (isPassThrough) {
								// Automatically delete all contained records
								this.entityStateManager.markForDeletion(entity)
							} else if (!isDelete) {
								throw new Error(`Cannot delete an entity without removing all references to it.
								Found a reference in ${dbEntity.name}.${dbProperty.name}.
								Entity "${this.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`)
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
						if (parentState.isCreate) {
							isDependency = true
						}
						// Do not persist actor or repository, they
						// are created separately
						relatedEntities = [propertyValue]
						break
					// Relation is an array of entities that depend in this entity
					case EntityRelationType.ONE_TO_MANY:
						if (isCreate) {
							fromDependencyForChild = dependencyGraphNode
						}
						// Nested deletions wil be automatically pruned in recursive calls
						relatedEntities = propertyValue
						break
				}
				if (relatedEntities) {
					const dbEntity = dbRelation.relationEntity
					const previousDbEntity = context.dbEntity
					context.dbEntity = dbEntity
					const childDependencyLinkedNodes = this.getEntitiesToPersist(
						relatedEntities, operatedOnEntities, operatedOnPassThroughs,
						context, fromDependencyForChild,
						!isFromAnotherApp && !isDelete && isDependency ? dependencyGraphNode : null,
						childDeleteByCascade)
					allProcessedNodes = allProcessedNodes.concat(childDependencyLinkedNodes)
					context.dbEntity = previousDbEntity
				}
			} // for properties
		} // for entities

		return allProcessedNodes
	}

	protected resolveCircularDependencies<E>(
		unorderedDependencies: IDependencyGraphNode<any>[],
		context: IOperationContext,
	): void {
		for (const node of unorderedDependencies) {
			const nodeOUID = this.entityStateManager.getOperationUniqueId(node.entity)
			this.resolveCircularDependenciesForNode(node, nodeOUID, node, context)
		}
	}

	protected resolveCircularDependenciesForNode<E>(
		node: IDependencyGraphNode<any>,
		nodeOUID: number,
		currentlyTraversedNode: IDependencyGraphNode<any>,
		context: IOperationContext,
		nodePath: IDependencyGraphNode<any>[] = []
	): void {
		if (!currentlyTraversedNode.dependsOn
			|| currentlyTraversedNode.circleTraversedFor[nodeOUID]) {
			return
		}
		currentlyTraversedNode.circleTraversedFor[nodeOUID] = true
		for (let i = currentlyTraversedNode.dependsOn.length - 1; i >= 0; i--) {
			const dependency = currentlyTraversedNode.dependsOn[i]
			const dependencyOUID = this.entityStateManager
				.getOperationUniqueId(dependency.entity)
			if (dependencyOUID === nodeOUID) {
				let entityPath = []
				for (let pathNode of nodePath) {
					let entityLongName = pathNode.dbEntity.applicationVersion.application.name + ':' + pathNode.dbEntity.name
					entityPath.push(entityLongName)
				}
				let entityLongName = dependency.dbEntity.applicationVersion.application.name + ':' + dependency.dbEntity.name
				entityPath.push(entityLongName)
				entityLongName = nodePath[0].dbEntity.applicationVersion.application.name + ':' + nodePath[0].dbEntity.name
				throw new Error(
					`Found a circular dependency in
					${entityPath.join(' -> ')}
					`
				)
			}
			nodePath.push(dependency)
			this.resolveCircularDependenciesForNode(node, nodeOUID, dependency, context, nodePath)
			nodePath.pop()
		}
	}

	protected orderEntitiesToPersist<E>(
		unorderedDependencies: IDependencyGraphNode<any>[],
		context: IOperationContext,
	): IDependencyGraphNode<any>[] {
		let orderedNodes: IDependencyGraphNode<any>[] = []
		let processedNodes: IDependencyGraphNode<any>[] = []
		while (orderedNodes.length < unorderedDependencies.length) {
			for (const node of unorderedDependencies) {
				const entityUid = this.entityStateManager
					.getOperationUniqueId(node.entity)
				if (processedNodes[entityUid]) {
					continue;
				}
				let nodeProcessed = true;
				for (const dependency of node.dependsOn) {
					const dependencyUid = this.entityStateManager
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
	protected optimizePersistOperations<E extends IAirEntity>(
		orderedDependencies: IDependencyGraphNode<any>[],
		context: IOperationContext,
	): IOperationNode<E>[] {
		let operationNodes: IOperationNode<any>[] = []
		let processedNodes: IDependencyGraphNode<any>[] = []
		let operationsByApplication_Index: IOperationsForEntity[][] = []

		for (const node of orderedDependencies) {
			const dbEntity = node.dbEntity
			const applicationOperationNodes = this.datastructureUtils.ensureChildArray(
				operationsByApplication_Index, dbEntity.applicationVersion.application.index)

			let entityOperations = applicationOperationNodes[dbEntity.index]
			if (!entityOperations) {
				entityOperations = {
					create: [],
					delete: [],
					update: []
				}
				applicationOperationNodes[dbEntity.index] = entityOperations
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
				const dependencyUid = this.entityStateManager
					.getOperationUniqueId(dependency.entity)
				const operationUniqueId = this.entityStateManager.getOperationUniqueId(dependency.entity)
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
	ensureUpdatesAreGroupedCorrectly<E extends IAirEntity>(
		operationNodes: IOperationNode<E>[],
		context: IOperationContext
	): IOperationNode<E>[] {
		// TODO: group related updates ONLY if all updates field values are
		// the same
		// throw new Error('Not Implemented.')
		return operationNodes
	}
}
