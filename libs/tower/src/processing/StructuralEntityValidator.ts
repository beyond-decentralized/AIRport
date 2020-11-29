import {EntityState}                 from '@airport/air-control'
import {DI}                          from '@airport/di'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	EntityRelationType,
	SQLDataType
}                                    from '@airport/ground-control'
import {IOperationContext}           from './OperationContext'
import {STRUCTURAL_ENTITY_VALIDATOR} from '../tokens'

export interface IStructuralEntityValidator {

	validate<E, EntityCascadeGraph>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		context: IOperationContext<E, EntityCascadeGraph>,
	): Promise<void>

}

export class StructuralEntityValidator {

	async validate<E, EntityCascadeGraph>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		context: IOperationContext<E, EntityCascadeGraph>,
	): Promise<void> {
		const dbEntity = context.dbEntity

		if (!dbEntity.idColumns.length) {
			throw new Error(
				`Cannot run 'save' for entity '${dbEntity.name}' with no @Id(s).
					Please use non-entity operations (like 'insert' or 'updateWhere') instead.`)
		}

		let isCreate, isDelete, isUpdate, isStub
		for (const entity of entities) {
			const entityState = context.ioc.entityStateManager.getEntityState(entity)
			switch (entityState) {
				case EntityState.CREATE:
					isCreate = true
					break
				case EntityState.DELETE:
					isDelete = true
					break
				case EntityState.UPDATE:
					isUpdate = true
					break
				case EntityState.STUB:
					isStub = true
				default:
					throw new Error(`Unexpected entity state for ${dbEntity.name}: ${entityState}`)
			}

			const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity)
			const entityOperatedOn  = !!operatedOnEntityIndicator[operationUniqueId]
			if (entityOperatedOn) {
				continue
			}
			operatedOnEntityIndicator[operationUniqueId] = true

			for (const dbProperty of dbEntity.properties) {
				let propertyValue: any = entity[dbProperty.name]
				if (propertyValue === undefined) {
					propertyValue           = null
					entity[dbProperty.name] = propertyValue
				}
				/*
				 * A passed in graph has either entities to be saved or
				 * entity stubs that are needed structurally to get to
				 * other entities.
				 *
				 * It is possible for the @Id's of an entity to be in
				 * a @ManyToOne, so we need to check
				 */
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation = dbProperty.relation[0]
					let relatedEntities = propertyValue
					this.assertRelationValueIsAnObject(propertyValue, dbProperty)
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							this.assertManyToOneNotArray(propertyValue, dbProperty)
							relatedEntities = [propertyValue]
							// Id columns are for the parent (currently processed) entity and must be
							// checked as part of this entity
							if (dbProperty.isId) {
								context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
									dbColumn: DbColumn,
									columnValue: any,
									propertyNameChains: string[][],
								) => {
									const isIdColumnEmpty = context.ioc.schemaUtils.isIdEmpty(columnValue)
									if (dbColumn.idIndex || dbColumn.idIndex === 0) {
										this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
										if (context.ioc.schemaUtils.isRepositoryId(dbColumn.name)) {
											if (context.ioc.schemaUtils.isEmpty(columnValue)) {
												throw new Error(`Repository Id must be specified on an insert for
							 ${dbEntity.name}.${dbProperty.name},
											column:  ${dbColumn.name}`)
											}
										}
									}
								}, false)
							}
							break
						case EntityRelationType.ONE_TO_MANY:
							this.assertOneToManyIsArray(propertyValue, dbProperty)
							break
						default:
							throw new Error(`Unexpected relation type ${dbRelation.relationType}
for ${dbEntity.name}.${dbProperty.name}`)
					} // switch dbRelation.relationType
					const previousDbEntity = context.dbEntity
					context.dbEntity       = dbRelation.relationEntity
					this.validate(relatedEntities , operatedOnEntityIndicator, context)
					context.dbEntity = previousDbEntity
				} // if (dbProperty.relation
				else {
					const dbColumn = dbProperty.propertyColumns[0].column
					if (dbProperty.isId) {
						const isIdColumnEmpty = context.ioc.schemaUtils.isIdEmpty(propertyValue)
						this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
					}
					this.ensureNonRelationalValue(dbProperty, dbColumn, propertyValue)
				} // else (dbProperty.relation
			} // for (const dbProperty
		} // for (const entity
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
			&& !(relationValue instanceof Array)) {
			throw new Error(`@OneToMany relation must be an array. Relation property: ${dbProperty.name}, 
of entity ${dbProperty.entity.name}\``)
		}
	}

}

DI.set(STRUCTURAL_ENTITY_VALIDATOR, StructuralEntityValidator)
