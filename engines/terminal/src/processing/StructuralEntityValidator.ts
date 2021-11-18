import { DI } from '@airport/di'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	EntityRelationType,
	SQLDataType
} from '@airport/ground-control'
import {
	IOperationContext,
	IStructuralEntityValidator
} from '@airport/terminal-map'
import { STRUCTURAL_ENTITY_VALIDATOR } from '../tokens'

export class StructuralEntityValidator
	implements IStructuralEntityValidator {

	validate<E>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		context: IOperationContext,
		fromOneToMany = false,
		parentRelationPropertyName = null,
		parentRelationEntity = null
	): void {
		const dbEntity = context.dbEntity

		if (!dbEntity.idColumns.length) {
			throw new Error(
				`Cannot run 'save' for entity '${dbEntity.name}' with no @Id(s).
					Please use non-entity operations (like 'insert' or 'updateWhere') instead.`)
		}

		for (const entity of entities) {
			const {
				isCreate,
				isParentId,
				isStub
			} = context.ioc.entityStateManager.getEntityStateTypeAsFlags(entity, dbEntity)

			if (isParentId) {
				// No processing is needed (already covered by id check
				continue
			}

			const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity)
			const entityOperatedOn = !!operatedOnEntityIndicator[operationUniqueId]
			if (entityOperatedOn) {
				continue
			}
			operatedOnEntityIndicator[operationUniqueId] = true

			for (const dbProperty of dbEntity.properties) {
				let propertyValue: any = entity[dbProperty.name]
				if (propertyValue === undefined) {
					propertyValue = null
					entity[dbProperty.name] = propertyValue
				}
				/*
				 * It is possible for the @Id's of an entity to be in
				 * a @ManyToOne, so we need to check
				 */
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation = dbProperty.relation[0]
					let relatedEntities
					let relatinIsOneToMany = false
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							// Id columns are for the parent (currently processed) entity and must be
							// checked as part of this entity
							if (dbProperty.isId) {
								context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
									dbColumn: DbColumn,
									columnValue: any,
									propertyNameChains: string[][],
								) => {
									this.validateRelationColumn(dbEntity, dbProperty, dbColumn,
										isCreate, entity, columnValue, context)
								}, false)
							}
							if (fromOneToMany) {
								// 'actor' or the 'repository' property may be automatically populated
								// in the entity by this.validateRelationColumn
								if (!propertyValue && !entity[dbProperty.name]) {
									if (!dbRelation.manyToOneElems || !dbRelation.manyToOneElems.mappedBy
										|| dbRelation.manyToOneElems.mappedBy === parentRelationPropertyName) {
										// The @ManyToOne side of the relationship is missing, add it
										entity[dbProperty.name] = parentRelationEntity
									}
								}
							}
							if (propertyValue) {
								relatedEntities = [propertyValue]
							}
							break
						case EntityRelationType.ONE_TO_MANY:
							relatinIsOneToMany = true
							relatedEntities = propertyValue
							break
						default:
							throw new Error(`Unexpected relation type ${dbRelation.relationType}
for ${dbEntity.name}.${dbProperty.name}`)
					} // switch dbRelation.relationType
					if (relatedEntities && relatedEntities.length) {
						const previousDbEntity = context.dbEntity
						context.dbEntity = dbRelation.relationEntity
						this.validate(relatedEntities, operatedOnEntityIndicator, context,
							relatinIsOneToMany, dbProperty.name, entity)
						context.dbEntity = previousDbEntity
					}
				} // if (dbProperty.relation
				else {
					const dbColumn = dbProperty.propertyColumns[0].column
					if (dbProperty.isId) {
						const isIdColumnEmpty = context.ioc.schemaUtils.isIdEmpty(propertyValue)
						this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
					} else {
						if (isStub || isParentId) {
							if (propertyValue !== undefined) {
								throw new Error(`Unexpected non-@Id value Stub|ParentId|Deleted record.
Property: ${dbEntity.name}.${dbProperty.name}, with "${context.ioc.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`)
							}
						}
					}
					this.ensureNonRelationalValue(dbProperty, dbColumn, propertyValue)
				} // else (dbProperty.relation
			} // for (const dbProperty
		} // for (const entity
	}

	protected validateRelationColumn<E>(
		dbEntity: DbEntity,
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		isCreate: boolean,
		entity: E,
		columnValue: any,
		context: IOperationContext,
	) {
		const isIdColumnEmpty = context.ioc.schemaUtils.isIdEmpty(columnValue)
		if (!dbColumn.idIndex && dbColumn.idIndex !== 0) {
			return
		}
		if (dbEntity.isRepositoryEntity) {
			if (!isIdColumnEmpty) {
				if(isCreate) {
					if(context.ioc.schemaUtils.isActorId(dbColumn.name)) {
					throw new Error(`Actor cannot be passed in for create Operations`)
				}
			}
				return
			}
			if (!isCreate) {
				throw new Error(`Ids must be populated in entities for non-Create operations`)
			}
			if (context.ioc.schemaUtils.isRepositoryId(dbColumn.name)) {
				// Repository was not provided - use context's 'newRepository'
				entity[dbProperty.name] = context.ioc.repositoryManager.getNewRepository(context)
			} else if (context.ioc.schemaUtils.isActorId(dbColumn.name)) {
				// Use context's 'actor'
				entity[dbProperty.name] = context.actor
			} else {
				throw new Error(`Unexpected @Id column '${dbColumn.name}' in a Repository Entity.`)
			}
		} else {
			this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
		}
	} 

	protected ensureIdValue(
		dbEntity: DbEntity,
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		isCreate: boolean,
		isIdColumnEmpty: boolean
	): void {
		if (dbColumn.isGenerated) {
			if (isCreate && !isIdColumnEmpty) {
				throw new Error(
					`@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name},
column:  ${dbColumn.name}
must NOT have a value for entity Insert operation.`)
			} else if (!isCreate && isIdColumnEmpty) {
				throw new Error(
					`@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name} 
column:  ${dbColumn.name}
must have a value for entity non-Insert operations.`)
			}
		} else if (isIdColumnEmpty) {
			throw new Error(
				`non-@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name},
column:  ${dbColumn.name}
must always have a value for all entity operations.`)
		}
	}

	protected ensureNonRelationalValue(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	) {
		if (value === undefined || value === null) {
			return
		}
		switch (dbColumn.type) {
			case SQLDataType.ANY:
				break
			case SQLDataType.BOOLEAN:
				if (typeof value !== 'boolean') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.DATE:
				if (typeof value !== 'object' || !(value instanceof Date)) {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.JSON:
				if (typeof value !== 'object' || value instanceof Date) {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.NUMBER:
				if (typeof value !== 'number') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.STRING:
				if (typeof value !== 'string') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
		}
	}

	protected throwUnexpectedProperty(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	) {
		throw new Error(
			`Unexpected property value '${value.toString()}' in property '${dbProperty.entity.name}.${dbProperty.name}'
		(column: '${dbColumn.name}').`)
	}

}

DI.set(STRUCTURAL_ENTITY_VALIDATOR, StructuralEntityValidator)
