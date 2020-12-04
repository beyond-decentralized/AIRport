import {DI}                          from '@airport/di'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	EntityRelationType,
	SQLDataType
}                                    from '@airport/ground-control'
import {STRUCTURAL_ENTITY_VALIDATOR} from '../tokens'
import {IOperationContext}           from './OperationContext'

export interface IStructuralEntityValidator {

	validate<E, EntityCascadeGraph>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		context: IOperationContext<E, EntityCascadeGraph>,
	): void

}

export class StructuralEntityValidator {

	validate<E, EntityCascadeGraph>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		context: IOperationContext<E, EntityCascadeGraph>,
	): void {
		const dbEntity = context.dbEntity

		if (!dbEntity.idColumns.length) {
			throw new Error(
				`Cannot run 'save' for entity '${dbEntity.name}' with no @Id(s).
					Please use non-entity operations (like 'insert' or 'updateWhere') instead.`)
		}

		for (const entity of entities) {
			const [isCreate, isDelete, isParentId, isUpdate, isStub] = context.ioc.entityStateManager
				.getEntityStateTypeAsFlags(entity, dbEntity)

			if (isParentId) {
				// No processing is needed (already covered by id check
				continue
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
				 * It is possible for the @Id's of an entity to be in
				 * a @ManyToOne, so we need to check
				 */
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation    = dbProperty.relation[0]
					let relatedEntities = propertyValue
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
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
							// nothing to do
							break
						default:
							throw new Error(`Unexpected relation type ${dbRelation.relationType}
for ${dbEntity.name}.${dbProperty.name}`)
					} // switch dbRelation.relationType
					const previousDbEntity = context.dbEntity
					context.dbEntity       = dbRelation.relationEntity
					this.validate(relatedEntities, operatedOnEntityIndicator, context)
					context.dbEntity = previousDbEntity
				} // if (dbProperty.relation
				else {
					const dbColumn = dbProperty.propertyColumns[0].column
					if (dbProperty.isId) {
						const isIdColumnEmpty = context.ioc.schemaUtils.isIdEmpty(propertyValue)
						this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
					} else {
						if (isStub || isParentId || isDelete) {
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
