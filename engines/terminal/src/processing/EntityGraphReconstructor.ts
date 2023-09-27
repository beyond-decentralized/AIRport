import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbProperty,
	EntityRelationType,
	IAppTrackerUtils,
	IEntityStateManager
} from '@airport/ground-control'
import {
	IEntityGraphReconstructor,
	IOperationContext
} from '@airport/terminal-map'

/**
 * Takes a serialized object tree and reconstructs a (potentially)
 * interlinked object graph.
 */
@Injected()
export class EntityGraphReconstructor
	implements IEntityGraphReconstructor {

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	entityStateManager: IEntityStateManager

	restoreEntityGraph<T>(
		root: T[],
		context: IOperationContext
	): T[] {
		const entitiesByOperationIndex = []
		const rootCopy =
			this.linkEntityGraph(root, entitiesByOperationIndex, false, context)

		for (let i = 1; i < entitiesByOperationIndex.length; i++) {
			const entity = entitiesByOperationIndex[i]
			if (!entity) {
				throw new Error(`Missing entity for
"${this.entityStateManager.getUniqueIdFieldName()}": ${i}`)
			}
		}
		context.lastOUID = entitiesByOperationIndex.length - 1

		return rootCopy
	}

	protected linkEntityGraph<T>(
		currentEntities: T[],
		entitiesByOperationIndex: any[],
		isParentEntity: boolean,
		context: IOperationContext
	): T[] {
		const dbEntity = context.dbEntity
		const results: T[] = []
		for (const entity of currentEntities) {
			if (!entity) {
				throw new Error(`Null root entities and @OneToMany arrays with null entities are not allowed`)
			}

			const operationUniqueId = this.entityStateManager.getOperationUniqueId(entity)
			if (!operationUniqueId || typeof operationUniqueId !== 'number'
				|| operationUniqueId < 1) {
				throw new Error(`Invalid entity Unique Id Field
"${this.entityStateManager.getUniqueIdFieldName()}": ${operationUniqueId}.`)
			}

			const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId]
			if (previouslyFoundEntity) {
				results.push(previouslyFoundEntity)
				continue;
			}

			/*
			 * A passed in graph has either entities to be saved or
			 * entity stubs that are needed structurally to get to
			 * other entities.
			 */
			let {
				isParentSchemaId,
				isStub
			} = this.entityStateManager
				.getEntityStateTypeAsFlags(entity, dbEntity)

			let entityCopy: any = {}
			entityCopy[this.entityStateManager.getUniqueIdFieldName()]
				= operationUniqueId
			entityCopy[this.entityStateManager.getStateFieldName()]
				= this.entityStateManager.getEntityState(entity)
			this.entityStateManager.copyEntityState(entity, entityCopy)
			entitiesByOperationIndex[operationUniqueId]
				= entityCopy

			if (isParentEntity) {
				this.entityStateManager.markAsOfParentSchema(entityCopy)
				isParentSchemaId = true
			}

			for (const dbProperty of dbEntity.properties) {
				let propertyValue: any = entity[dbProperty.name]
				if (propertyValue === undefined) {
					continue
				}
				if (dbProperty.relation && dbProperty.relation.length) {
					let relationIsFromParentSchema = false
					const dbRelation = dbProperty.relation[0]
					let relatedEntities = propertyValue
					let isManyToOne = false
					this.assertRelationValueIsAnObject(propertyValue, dbProperty)
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							isManyToOne = true
							this.assertManyToOneNotArray(propertyValue, dbProperty)
							relatedEntities = [propertyValue]
							break
						case EntityRelationType.ONE_TO_MANY:
							this.assertOneToManyIsArray(propertyValue, dbProperty)
							break
						default:
							throw new Error(`Unexpected relation type ${dbRelation.relationType}
for ${dbEntity.name}.${dbProperty.name}`)
					} // switch dbRelation.relationType
					const previousDbEntity = context.dbEntity
					const previousIApplication = previousDbEntity.applicationVersion.application
					const propertyIApplication = dbRelation.relationEntity.applicationVersion.application
					if (!this.appTrackerUtils.isInternalDomain(propertyIApplication.domain.name)
						&& previousIApplication.fullName !== propertyIApplication.fullName) {
						// If a child entity is in a different application it won't be processed
						// the calling application should call the API of the other application
						// explicitly so that the application logic may be run
						relationIsFromParentSchema = true
					}
					context.dbEntity = dbRelation.relationEntity
					let propertyCopyValue
					if (propertyValue) {
						propertyCopyValue = this.linkEntityGraph(relatedEntities,
							entitiesByOperationIndex, isParentSchemaId || relationIsFromParentSchema, context)
						if (isParentSchemaId || relationIsFromParentSchema) {
							for (const propertyCopyValueEntry of propertyCopyValue) {
								const operationUniqueId = this.entityStateManager
									.getOperationUniqueId(propertyCopyValueEntry)
								if (!entitiesByOperationIndex[operationUniqueId]) {
									this.checkPropertyParentEntityStatus(propertyCopyValueEntry)
								}
							}
						}
						if (isManyToOne) {
							propertyCopyValue = propertyCopyValue[0]
						}// if (isManyToOne
						// if !isManyToOne - nothing to do
					} // if (propertyValue
					propertyValue = propertyCopyValue
					context.dbEntity = previousDbEntity
				} // if (dbProperty.relation
				else {
					if (!dbProperty.isId) {
						if (isStub) {
							throw new Error(`Deletes and Stubs may only contain @Id properties or relations.`)
						}
					}
				} // else (dbProperty.relation
				entityCopy[dbProperty.name] = propertyValue
			} // for (const dbProperty
			results.push(entityCopy)
		} // for (const entity

		return results
	}

	private checkPropertyParentEntityStatus(
		propertyCopyValue
	) {
		if (!this.entityStateManager.isParentSchemaId(propertyCopyValue)
			&& !this.entityStateManager.isPassThrough(propertyCopyValue)) {
			throw new Error(`Parent Ids may only contain relations that are themselves Parent Ids or Pass-Though objects.`)
		}
	}

	protected assertRelationValueIsAnObject(
		relationValue: any,
		dbProperty: DbProperty,
	): void {
		if (relationValue !== null && relationValue !== undefined &&
			(typeof relationValue != 'object' || relationValue instanceof Date)
		) {
			throw new Error(
				`Unexpected value in relation property: ${dbProperty.name}, 
				of entity ${dbProperty.entity.name}`)
		}
	}

	protected assertManyToOneNotArray(
		relationValue: any,
		dbProperty: DbProperty,
	): void {
		if (relationValue instanceof Array) {
			throw new Error(`@ManyToOne relation cannot be an array. Relation property: ${dbProperty.name}, 
of entity ${dbProperty.entity.name}`)
		}
	}

	protected assertOneToManyIsArray(
		relationValue: any,
		dbProperty: DbProperty,
	): void {
		if (relationValue !== null
			&& relationValue !== undefined
			&& !(relationValue instanceof Array)
		) {
			throw new Error(`@OneToMany relation must be an array. Relation property: ${dbProperty.name}, 
of entity ${dbProperty.entity.name}\``)
		}
	}

}
