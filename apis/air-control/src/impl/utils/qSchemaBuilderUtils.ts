import {
	DbColumn,
	DbEntity,
	DbProperty,
	DbRelation,
	DbSchema,
	EntityRelationType,
	SchemaIndex,
	SQLDataType,
	TableIndex
}                                from '@airport/ground-control'
import {
	QSchema,
	QSchemaInternal
}                                from '../../lingo/AirportDatabase'
import {IQEntityInternal}        from '../../lingo/core/entity/Entity'
import {IQRelation}              from '../../lingo/core/entity/Relation'
import {IQBooleanField}          from '../../lingo/core/field/BooleanField'
import {IQDateField}             from '../../lingo/core/field/DateField'
import {IQNumberField}           from '../../lingo/core/field/NumberField'
import {IQOperableFieldInternal} from '../../lingo/core/field/OperableField'
import {IQStringField}           from '../../lingo/core/field/StringField'
import {IQUntypedField}          from '../../lingo/core/field/UntypedField'
import {QEntity}                 from '../core/entity/Entity'
import {QOneToManyRelation}      from '../core/entity/OneToManyRelation'
import {QRelation}               from '../core/entity/Relation'
import {QBooleanField}           from '../core/field/BooleanField'
import {QDateField}              from '../core/field/DateField'
import {QNumberField}            from '../core/field/NumberField'
import {QStringField}            from '../core/field/StringField'
import {QUntypedField}           from '../core/field/UntypedField'

/**
 * From:
 * http://js-bits.blogspot.com/2010/08/javascript-inheritance-done-right.html
 * Via:
 * https://stackoverflow.com/questions/6617780/how-to-call-parent-constructor
 */
export function extend(
	base,
	sub,
	methods
) {
	sub.prototype             = Object.create(base.prototype)
	sub.prototype.constructor = sub
	sub.base                  = base.prototype

	// Copy the methods passed in to the prototype
	for (const name in methods) {
		sub.prototype[name] = methods[name]
	}
	// so we can define the constructor inline
	return sub
}

export function getColumnQField(
	entity: DbEntity,
	property: DbProperty,
	q: IQEntityInternal,
	column: DbColumn
): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField {
	switch (column.type) {
		case SQLDataType.ANY:
			return new QUntypedField(column, property, q)
		case SQLDataType.BOOLEAN:
			return new QBooleanField(column, property, q)
		case SQLDataType.DATE:
			return new QDateField(column, property, q)
		case SQLDataType.NUMBER:
			return new QNumberField(column, property, q)
		case SQLDataType.JSON:
		case SQLDataType.STRING:
			return new QStringField(column, property, q)
	}
}

export function getQRelation(
	entity: DbEntity,
	property: DbProperty,
	q: IQEntityInternal,
	allQSchemas: QSchema[]
): IQRelation<typeof q> {
	const relation = property.relation[0]
	switch (relation.relationType) {
		case EntityRelationType.MANY_TO_ONE:
			const relationEntity = relation.relationEntity
			const relationSchema = relationEntity.schemaVersion.schema
			const qIdRelationConstructor
			                     = allQSchemas[relationSchema.index]
				.__qIdRelationConstructors__[relationEntity.index]
			// return new qIdRelationConstructor(relationEntity, property, q)
			return new qIdRelationConstructor(relation, q)
		case EntityRelationType.ONE_TO_MANY:
			return new QOneToManyRelation(relation, q)
		default:
			throw new Error(`Unknown EntityRelationType: ${relation.relationType}.`)
	}

}

export function getQEntityConstructor(
	allQSchemas: QSchema[]
): typeof QEntity {

	// ChildQEntity refers to the constructor
	var ChildQEntity = function (
		entity
	) {
		(<any>ChildQEntity).base.constructor.call(this, entity)

		entity.properties.forEach((
			property: DbProperty
		) => {
			let qFieldOrRelation

			if (property.relation && property.relation.length) {
				qFieldOrRelation = getQRelation(entity, property, this, allQSchemas)
				for (const propertyColumn of property.propertyColumns) {
					addColumnQField(entity, property, this, propertyColumn.column)
				}
			} else {
				qFieldOrRelation = addColumnQField(entity, property, this,
					property.propertyColumns[0].column)
			}
			this[property.name] = qFieldOrRelation
		})
		entity.__qConstructor__ = ChildQEntity
	}

	extend(QEntity, ChildQEntity, {})


	return <any>ChildQEntity
}

export function addColumnQField(
	entity: DbEntity,
	property: DbProperty,
	q: IQEntityInternal,
	column: DbColumn
): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField {
	const qFieldOrRelation = getColumnQField(entity, property, q, column)
	q.__driver__.allColumns[column.index]
	                       = qFieldOrRelation as IQOperableFieldInternal<any, any, any, any>
	if (column.idIndex || column.idIndex === 0) {
		q.__driver__.idColumns[column.idIndex]
			= qFieldOrRelation as IQOperableFieldInternal<any, any, any, any>
	}

	return qFieldOrRelation
}

export function getQEntityIdRelationConstructor(): typeof QRelation {

	function QEntityIdRelation(
		entity: DbEntity,
		relation: DbRelation,
		qEntity: IQEntityInternal
	) {
		(<any>QEntityIdRelation).base.constructor.call(this, relation, qEntity)

		getQEntityIdFields(this, entity)

		// (<any>entity).__qConstructor__.__qIdRelationConstructor__ = QEntityIdRelation
	}

	extend(QRelation, QEntityIdRelation, {})

	return <any>QEntityIdRelation
}

/**
 * Set all fields behind an id relation.  For example
 *
 * QA.id
 *
 * or
 *
 * QA.rel1.id
 *
 * or
 *
 * QA.rel2.otherRel.id
 * QA.rel2.id
 *
 * @param addToObject  Object to add to (Ex: QA | QA.rel1 | QA.rel2.otherRel
 * @param entity  Entity to which the fields belong (Ex: QA, QRel1, QRel2, QOtherRel)
 * @param utils
 * @param parentProperty  The parent property from which the current property was
 *    navigated to
 * @param relationColumnMap  DbColumn map for the current path of properties
 *  (QA.rel2.otherRel), keyed by the column from the One side of the relation
 */
export function getQEntityIdFields(
	addToObject,
	entity: DbEntity,
	parentProperty?: DbProperty,
	relationColumnMap?: Map<DbColumn, DbColumn>
) {
	entity.properties.forEach((
		property: DbProperty
	) => {
		if (!property.isId) {
			return
		}
		let qFieldOrRelation

		const currentProperty = parentProperty ? parentProperty : property

		// If it's a relation property (and therefore has backing columns)
		if (property.relation && property.relation.length) {
			const parentRelation  = currentProperty.relation[0]
			const relationColumns = parentRelation.manyRelationColumns
			if (!parentProperty) {
				relationColumnMap = new Map()
				for (const relationColumn of relationColumns) {
					relationColumnMap.set(relationColumn.oneColumn,
						relationColumn.manyColumn)
				}
			}
			// If it's a nested relation
			else {
				for (const relationColumn of relationColumns) {
					const originalColumn = relationColumnMap.get(relationColumn.manyColumn)
					// Remove the mapping of the parent relation
					relationColumnMap.delete(relationColumn.manyColumn)
					// And replace it with the nested relation
					relationColumnMap.set(relationColumn.oneColumn,
						originalColumn)
				}
			}
			qFieldOrRelation = getQEntityIdFields(
				{}, parentRelation.relationEntity,
				currentProperty, relationColumnMap)
		} else {
			let originalColumn = property.propertyColumns[0].column
			if (relationColumnMap) {
				originalColumn = relationColumnMap.get(originalColumn)
			}
			qFieldOrRelation = getColumnQField(entity,
				currentProperty, this, originalColumn)
		}
		addToObject[property.name] = qFieldOrRelation
	})

	return addToObject
}

export function setQSchemaEntities(
	schema: DbSchema,
	qSchema: QSchemaInternal,
	allQSchemas: QSchema[]
) {
	// const entities = orderEntitiesByIdDependencies(schema.currentVersion.entities,
	// schema)

	qSchema.__qIdRelationConstructors__ = []
	qSchema.__qConstructors__           = {}

	// let haveMissingDependencies
	// do {
	// 	haveMissingDependencies = false
	// NOTE: only need to compute the keys of entities for Many-to-One(s)
	// Many-to-Ones must reference the table by primary key in order to
	// guarantee a single record.  Any other type of join may return multiple
	// records and is in fact a Many-to-Many
	schema.currentVersion.entities.forEach((
		// entities.forEach((
		entity: DbEntity
	) => {
		// NOTE: an @Id column is guaranteed to be present in only one property
		for (const idColumn of entity.idColumns) {
			if (idColumn.manyRelationColumns
				&& idColumn.manyRelationColumns.length) {
				const oneColumn      = idColumn.manyRelationColumns[0].oneColumn
				const relatedEntity  = oneColumn.entity
				const relatedQSchema = allQSchemas[relatedEntity.schemaVersion.schema.index]
				if (!relatedQSchema) {
					throw new Error(`QSchema not yet initialized for ID relation:
					${entity.name}.${oneColumn.name}
					`)
				}

				const manyColumn = idColumn.manyRelationColumns[0].manyColumn

				// if (relatedEntity.id === manyColumn.entity.id
				// 	&& relatedEntity.schemaVersion.schema.index
				// 	=== manyColumn.entity.schemaVersion.schema.index) {
				// 	continue
				// }

				// const relatedQEntityConstructor =
				// qSchema.__qConstructors__[relatedEntity.index] if (!relatedQEntityConstructor)
				// { throw new Error(`QEntity not yet initialized for ID relation:
				// ${entity.name}.${manyColumn.name} `) haveMissingDependencies = true }
			}
		}

		const qIdRelationConstructor                      = <any>getQEntityIdRelationConstructor()
		qSchema.__qIdRelationConstructors__[entity.index] = qIdRelationConstructor

		// TODO: compute many-to-many relations

		const qConstructor                      = <any>getQEntityConstructor(allQSchemas)
		qSchema.__qConstructors__[entity.index] = qConstructor
		Object.defineProperty(qSchema, entity.name, {
			get: function () {
				return new this.__qConstructors__[entity.index](entity)
			}
		})
	})
	// } while (haveMissingDependencies)

}

export interface DbSchemaWithDependencies {
	schema: DbSchema
	dependencies: Set<SchemaIndex>
}

export function orderSchemasInOrderOfPrecedence(
	schemas: DbSchema[]
): DbSchema[] {
	const schemaWithDepsMap: Map<SchemaIndex, DbSchemaWithDependencies> = new Map()
	const schemasWithDeps: DbSchemaWithDependencies[]                   = schemas.map(
		schema => {
			const dependencies: Set<SchemaIndex> = new Set()
			for (const schemaReference of schema.currentVersion.references) {
				dependencies.add(schemaReference.referencedSchemaVersion.schema.index)
			}
			const schemaWithDependencies: DbSchemaWithDependencies = {
				schema,
				dependencies
			}
			schemaWithDepsMap.set(schema.index, schemaWithDependencies)

			return schemaWithDependencies
		}
	)

	schemasWithDeps.sort((
		orderedSchema1: DbSchemaWithDependencies,
		orderedSchema2: DbSchemaWithDependencies
	) => {
		if (schemaDependsOn(
			orderedSchema1, orderedSchema2.schema.index, schemaWithDepsMap)) {
			return 1
		} else if (schemaDependsOn(
			orderedSchema2, orderedSchema1.schema.index, schemaWithDepsMap)) {
			return -1
		}

		return 0
	})

	return schemasWithDeps.map(
		schemaWithDeps => schemaWithDeps.schema)
}

export function schemaDependsOn(
	dependantSchema: DbSchemaWithDependencies,
	dependsOnSchemaIndex: SchemaIndex,
	schemaWithDepsMap: Map<SchemaIndex, DbSchemaWithDependencies>
) {
	if (dependantSchema.dependencies.has(dependsOnSchemaIndex)) {
		return true
	}

	// for(const dependencySchemaIndex of dependantSchema.dependencies) {
	//
	// }

	return false
}

/*
export function orderEntitiesByIdDependencies(
	entities: DbEntity[],
	schema: DbSchema
): DbEntity[] {
	const entityWithDepsMap: Map<TableIndex, DbEntityWithDependencies> = new Map()
	const entitiesWithDeps: DbEntityWithDependencies[]                 = entities.map(
		entity => {
			const dependencies: Set<TableIndex> = new Set()
			for (const relation of entity.relations) {
				switch (relation.relationType) {
					case EntityRelationType.MANY_TO_ONE:
						if (schema.index === relation.relationEntity.schemaVersion.schema.index) {
							dependencies.add(relation.relationEntity.index)
						}
						break
					case EntityRelationType.ONE_TO_MANY:
						continue
					default:
						throw new Error(`Unsupported relation type: ${relation.relationType}`)
				}
			}
			const entityWithDependencies: DbEntityWithDependencies = {
				entity,
				dependencies
			}
			entityWithDepsMap.set(entity.index, entityWithDependencies)

			return entityWithDependencies
		}
	)

	while (!areEntitiesOrdered(entitiesWithDeps)) {
		sortEntities(entitiesWithDeps)
	}

	return entitiesWithDeps.map(
		entityWithDeps => entityWithDeps.entity)
}

export function areEntitiesOrdered(
	entitiesWithDeps: DbEntityWithDependencies[]
) {
	const entityIndexSet: Set<number> = new Set()

	return !entitiesWithDeps.some((
		entityWithDeps
	) => {
		entityIndexSet.add(entityWithDeps.entity.index)
		for (const entityIndex of entityWithDeps.dependencies.values()) {
			if (!entityIndexSet.has(entityIndex)) {
				return true
			}
		}
	})
}

export function sortEntities(
	entitiesWithDeps: DbEntityWithDependencies[]
): void {
	for (let i = 0; i < entitiesWithDeps.length; i++) {
		let entityWithDeps = entitiesWithDeps[i]
		for (let j = i + 1; j < entitiesWithDeps.length; j++) {
			let entityWithDeps2 = entitiesWithDeps[j]
			if (entityDependsOn(
				entityWithDeps, entityWithDeps2.entity.index)) {
				entitiesWithDeps[i] = entityWithDeps2
				entitiesWithDeps[j] = entityWithDeps
				return
			}
		}
	}
}

export function entityDependsOn(
	dependantEntity: DbEntityWithDependencies,
	dependsOnEntityIndex: TableIndex,
	// entityWithDepsMap: Map<TableIndex, DbEntityWithDependencies>
) {
	if (dependantEntity.dependencies.has(dependsOnEntityIndex)) {
		return true
	}

	// for(const dependencyEntityIndex of dependantEntity.dependencies) {
	//
	// }

	return false
}
*/

export interface DbEntityWithDependencies {
	entity: DbEntity
	dependencies: Set<TableIndex>
}
