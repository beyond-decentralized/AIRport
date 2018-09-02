import {
	IQBooleanField,
	IQDateField,
	IQEntityInternal,
	IQNumberField,
	IQStringField,
	IQUntypedField,
	IUtils,
	QBooleanField,
	QDateField,
	QEntity,
	QNumberField,
	QOneToManyRelation,
	QRelation,
	QSchema,
	QSchemaInternal,
	QStringField,
	QUntypedField,
	UtilsToken
} from '@airport/air-control'
import {
	DbColumn,
	DbProperty,
	DbRelation,
	EntityRelationType,
	SQLDataType
}                                     from '@airport/ground-control'
import {
	ISchema,
	ISchemaEntity,
	ISchemaProperty
}                                     from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                                     from 'typedi'
import {QueryEntityClassCreatorToken} from './InjectionTokens'

/**
 * From:
 * http://js-bits.blogspot.com/2010/08/javascript-inheritance-done-right.html
 * Via:
 * https://stackoverflow.com/questions/6617780/how-to-call-parent-constructor
 * @param base
 * @param sub
 * @param methods
 */
export function extend(base, sub, methods) {
	sub.prototype = Object.create(base.prototype);
	sub.prototype.constructor = sub;
	sub.base = base.prototype;

	// Copy the methods passed in to the prototype
	for (var name in methods) {
		sub.prototype[name] = methods[name];
	}
	// so we can define the constructor inline
	return sub;
}

export interface IQueryEntityClassCreator {

	create(
		schema: ISchema
	): QSchema;

}

@Service(QueryEntityClassCreatorToken)
export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

	constructor(
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	create(
		schema: ISchema
	): QSchema {
		const qSchema: QSchemaInternal = {
			__constructors__: {},
			__qConstructors__: {}
		}

		schema.currentVersion.entities.forEach((
			entity: ISchemaEntity
		) => {

			qSchema.__qConstructors__[entity.index] = QConstructor
		})

		return qSchema
	}

	getQEntityQRelation(): QRelation {

	}

	getQEntity(
		entity: ISchemaEntity
	): QEntity {

		const QConstructor = function () {
			// New class name constructor code

			this(
				dbEntity: DbEntity,
				fromClausePosition: number[]                     = [],
				dbRelation                                       = null,
				joinType: JoinType                               = null,
				QDriver: { new(...args: any[]): IQEntityDriver } = QEntityDriver
			)
		}

		const qConstructorPrototype = {}

		qConstructorPrototype.prototype = QEntity;

		entity.properties.forEach((
			property: ISchemaProperty
		) => {
			let qFieldOrRelation

			if (property.relation && property.relation.length) {
				qFieldOrRelation = this.getQRelation(entity, property, this, this.utils)
			} else {
				qFieldOrRelation = this.getColumnQField(entity, property, this, this.utils)
			}
			qConstructorPrototype[property.name] = qFieldOrRelation
		})

		QConstructor.prototype = {

			__dbEntity__

			someProperty: 'someValue',

			someMethod: function (
				a,
				b
			) {
			},

			someOtherMethod: function (x) {
			}
		}
	}

	getColumnQField(
		entity: ISchemaEntity,
		property: ISchemaProperty,
		q: IQEntityInternal,
		utils: IUtils,
	): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField {
		const column: DbColumn       = <any>property.propertyColumns[0].column
		const dbProperty: DbProperty = <any>property
		switch (column.type) {
			case SQLDataType.ANY:
				return new QUntypedField(column, dbProperty, q, utils)
			case SQLDataType.BOOLEAN:
				return new QBooleanField(column, dbProperty, q, utils)
			case SQLDataType.DATE:
				return new QDateField(column, dbProperty, q, utils)
			case SQLDataType.NUMBER:
				return new QNumberField(column, dbProperty, q, utils)
			case SQLDataType.JSON:
			case SQLDataType.STRING:
				return new QStringField(column, dbProperty, q, utils)
		}
	}

	getQRelation(
		entity: ISchemaEntity,
		property: ISchemaProperty,
		q: IQEntityInternal,
		utils: IUtils,
	): QRelation<typeof q> {
		const relation: DbRelation = <any>property.relation[0]
		switch (relation.relationType) {
			case EntityRelationType.MANY_TO_ONE:
			// TODO: work here next
			case EntityRelationType.ONE_TO_MANY:
				return new QOneToManyRelation(relation, q)
		}

	}

}