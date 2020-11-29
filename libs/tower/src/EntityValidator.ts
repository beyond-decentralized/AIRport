import {DI}                from '@airport/di'
import {
	DbColumn,
	DbProperty,
	EntityRelationType,
	OperationType
}                          from '@airport/ground-control'
import {IOperationContext} from './OperationContext'
import {ENTITY_VALIDATOR}  from './tokens'

export interface IEntityValidator {

	validate<E, EntityCascadeGraph>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		operationType: OperationType,
		context: IOperationContext<E, EntityCascadeGraph>,
	): Promise<void>

}

export class EntityValidator {

	async validate<E, EntityCascadeGraph>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		operationType: OperationType,
		context: IOperationContext<E, EntityCascadeGraph>,
	): Promise<void> {
		const dbEntity = context.dbEntity

		for (const entity of entities) {
			const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity)
			const entityOperatedOn  = !!operatedOnEntityIndicator[operationUniqueId]
			if (entityOperatedOn) {
				continue
			}
			operatedOnEntityIndicator[operationUniqueId] = true

			if (!dbEntity.idColumns.length) {
				throw new Error(
					`Cannot run 'save' for entity '${dbEntity.name}' with no @Id(s).
					Please use 'insert'|'updateWhere' instead.`)
			}

			for (const idColumn of dbEntity.idColumns) {
				idColumn.propertyColumns
			}

			for (const dbProperty of dbEntity.properties) {
				let propertyValue: any = entity[dbProperty.name]
				if (propertyValue === undefined) {
					propertyValue = null
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
					this.assertRelationValueIsAnObject(propertyValue, dbProperty)
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							this.assertManyToOneNotArray(propertyValue, dbProperty)
							context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
								dbColumn: DbColumn,
								columnValue: any,
								propertyNameChains: string[][],
							) => {
								if (dbColumn.idIndex || dbColumn.idIndex === 0) {
									if (dbColumn.isGenerated) {
										if (context.ioc.schemaUtils.isIdEmpty(columnValue)) {
											throw new Error(
												`non-@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name} 
											must have a value for 'create' operations.`)
										}
									} else if (!context.ioc.schemaUtils.isIdEmpty(columnValue)) {
										throw new Error(
											`@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name},
											column:  ${dbColumn.name}
											must NOT have a value for 'create' operations.`)
									}
								}
								if (context.ioc.schemaUtils.isRepositoryId(dbColumn.name)) {
									if (context.ioc.schemaUtils.isEmpty(columnValue)) {
										throw new Error(`Repository Id must be specified on an insert`)
									}
								}
								if (dbColumn.isGenerated && dbProperty.isId && columnValue < 0) {
									// Do not insert negative integers for temporary identification
									// within the circular dependency management lookup
									return
								}
							}, false)
							break
						case EntityRelationType.ONE_TO_MANY:
							this.assertOneToManyIsArray(propertyValue, dbProperty)
							break

					}
				}

			}

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
			&& !(relationValue instanceof Array)) {
			throw new Error(`@OneToMany relation must be an array. Relation property: ${dbProperty.name}, 
of entity ${dbProperty.entity.name}\``)
		}
	}

}

DI.set(ENTITY_VALIDATOR, EntityValidator)
