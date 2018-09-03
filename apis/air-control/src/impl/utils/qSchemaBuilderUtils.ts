import {
	DbEntity,
	DbProperty,
	DbSchema,
	EntityRelationType,
	SchemaIndex,
	SQLDataType
}                           from '@airport/ground-control'
import {QSchema}            from '../../lingo/AirportDatabase'
import {IQEntityInternal}   from '../../lingo/core/entity/Entity'
import {IQBooleanField}     from '../../lingo/core/field/BooleanField'
import {IQDateField}        from '../../lingo/core/field/DateField'
import {IQNumberField}      from '../../lingo/core/field/NumberField'
import {IQStringField}      from '../../lingo/core/field/StringField'
import {IQUntypedField}     from '../../lingo/core/field/UntypedField'
import {IUtils}             from '../../lingo/utils/Utils'
import {QEntity}            from '../core/entity/Entity'
import {QOneToManyRelation} from '../core/entity/OneToManyRelation'
import {QRelation}          from '../core/entity/Relation'
import {QBooleanField}      from '../core/field/BooleanField'
import {QDateField}         from '../core/field/DateField'
import {QNumberField}       from '../core/field/NumberField'
import {QStringField}       from '../core/field/StringField'
import {QUntypedField}      from '../core/field/UntypedField'

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
	utils: IUtils,
): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField {
	const column = property.propertyColumns[0].column
	switch (column.type) {
		case SQLDataType.ANY:
			return new QUntypedField(column, property, q, utils)
		case SQLDataType.BOOLEAN:
			return new QBooleanField(column, property, q, utils)
		case SQLDataType.DATE:
			return new QDateField(column, property, q, utils)
		case SQLDataType.NUMBER:
			return new QNumberField(column, property, q, utils)
		case SQLDataType.JSON:
		case SQLDataType.STRING:
			return new QStringField(column, property, q, utils)
	}
}

export function getQRelation(
	entity: DbEntity,
	property: DbProperty,
	q: IQEntityInternal,
	utils: IUtils,
): QRelation<typeof q> {
	const relation = property.relation[0]
	switch (relation.relationType) {
		case EntityRelationType.MANY_TO_ONE:
		// TODO: work here next
		case EntityRelationType.ONE_TO_MANY:
			return new QOneToManyRelation(relation, q)
	}

}

export function getQEntityConstructor(): typeof QEntity {

	function ChildQEntity(
		entity
	) {
		(<any>ChildQEntity).base.constructor.call(this, entity)

		entity.properties.forEach((
			property: DbProperty
		) => {
			let qFieldOrRelation

			if (property.relation && property.relation.length) {
				qFieldOrRelation = getQRelation(entity, property, this, this.utils)
			} else {
				qFieldOrRelation = getColumnQField(entity, property, this, this.utils)
			}
			entity[property.name] = qFieldOrRelation
		})

	}

	extend(QEntity, ChildQEntity, {})


	return <any>ChildQEntity
+-}

export function setQSchemaEntities(
	schema: DbSchema,
	qSchema: QSchema
) {
	schema.currentVersion.entities.forEach((
		entity: DbEntity
	) => {
		qSchema.__qConstructors__[entity.index] = <any>getQEntityConstructor()
		Object.defineProperty(qSchema, entity.name, {
			get: function () {
				return new this.__qConstructors__[entity.name](entity)
			}
		})
	})
}

export function setQSchemaEntityIds(
	schema: DbSchema,
	qSchema: QSchema
) {
	// order schema entities by their
}

export interface DbSchemaWithDependencies {
	schema: DbSchema
	dependencies: Set<SchemaIndex>
}

export function orderSchemasInOrderOfPrecedence(
	schemas: DbSchema[]
): DbSchema[] {
	const schemaWithDepsMap: Map<SchemaIndex, DbSchemaWithDependencies> = new Map()
	const schemasWithDeps: DbSchemaWithDependencies[] = schemas.map(
		schema => {
			const dependencies: Set<SchemaIndex> = new Set()
			for(const schemaReference of schema.currentVersion.references) {
				dependencies.add(schemaReference.referencedSchemaVersion.schema.index)
			}
			const schemaWithDependencies: DbSchemaWithDependencies = {
				schema,
				dependencies
			}
			schemaWithDepsMap.set(schema.index, schemaWithDependencies)

			return schemaWithDependencies;
		}
	)

	schemasWithDeps.sort((
		orderedSchema1: DbSchemaWithDependencies,
		orderedSchema2: DbSchemaWithDependencies
	) => {
		if(firstSchemaDependendsOnSecond(
			orderedSchema1, orderedSchema2, schemaWithDepsMap)) {
			return 1
		} else if (firstSchemaDependendsOnSecond(
			orderedSchema2, orderedSchema1, schemaWithDepsMap)) {
			return -1
		}

		return 0
	})

	return schemasWithDeps.map(schemaWithDeps => schemaWithDeps.schema)
}

export function firstSchemaDependendsOnSecond(
	firstSchema: DbSchemaWithDependencies,
	secondSchema: DbSchemaWithDependencies,
	schemaWithDepsMap: Map<SchemaIndex, DbSchemaWithDependencies>
) {
	const secondSchemaIndex = secondSchema.schema.index

}

export function orderEntitiesByIdDependencies(
	entities: DbEntity[]
): DbEntity[] {

}