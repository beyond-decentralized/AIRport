import {
	DbColumn,
	DbEntity,
	DbProperty,
	DbRelation,
	DbApplication,
	EntityRelationType,
	JoinType,
	ApplicationIndex,
	SQLDataType,
	TableIndex
} from '@airport/ground-control'
import {
	QApplication,
	QApplicationInternal
} from '../../lingo/AirportDatabase'
import {
	IQEntity,
	IQEntityInternal
} from '../../lingo/core/entity/Entity'
import { IQRelation } from '../../lingo/core/entity/Relation'
import { IQBooleanField } from '../../lingo/core/field/BooleanField'
import { IQDateField } from '../../lingo/core/field/DateField'
import { IQNumberField } from '../../lingo/core/field/NumberField'
import { IQOperableFieldInternal } from '../../lingo/core/field/OperableField'
import { IQStringField } from '../../lingo/core/field/StringField'
import { IQUntypedField } from '../../lingo/core/field/UntypedField'
import { IApplicationUtils } from '../../lingo/utils/ApplicationUtils'
import { QEntity } from '../core/entity/Entity'
import { QOneToManyRelation, QRepositoryEntityOneToManyRelation } from '../core/entity/OneToManyRelation'
import { QRelation, QRepositoryEntityRelation } from '../core/entity/Relation'
import { IRelationManager } from '../core/entity/RelationManager'
import { QBooleanField } from '../core/field/BooleanField'
import { QDateField } from '../core/field/DateField'
import { QNumberField } from '../core/field/NumberField'
import { QStringField } from '../core/field/StringField'
import { QUntypedField } from '../core/field/UntypedField'

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
	sub.prototype = Object.create(base.prototype)
	sub.prototype.constructor = sub
	sub.base = base.prototype

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
		default:
			throw new Error(`Unsupported data type for property ${entity.applicationVersion.application.name}.${entity.name}.${property.name}`)
	}
}

export function getQRelation(
	entity: DbEntity,
	property: DbProperty,
	q: IQEntityInternal,
	allQApplications: QApplication[],
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager
): IQRelation<typeof q> {
	const relation = property.relation[0]
	switch (relation.relationType) {
		case EntityRelationType.MANY_TO_ONE:
			const relationEntity = relation.relationEntity
			const relationApplication = relationEntity.applicationVersion.application
			const qIdRelationConstructor
				= allQApplications[relationApplication.index]
					.__qIdRelationConstructors__[relationEntity.index]
			// return new qIdRelationConstructor(relationEntity, property, q)
			return new qIdRelationConstructor(relation.relationEntity, relation, q)
		case EntityRelationType.ONE_TO_MANY:
			if (entity.isRepositoryEntity) {
				return new QRepositoryEntityOneToManyRelation(relation, q,
					applicationUtils, relationManager)
			} else {
				return new QOneToManyRelation(relation, q,
					applicationUtils, relationManager)
			}
		default:
			throw new Error(`Unknown EntityRelationType: ${relation.relationType}.`)
	}

}

export function getQEntityConstructor(
	allQApplications: QApplication[]
): typeof QEntity {

	// ChildQEntity refers to the constructor
	var ChildQEntity = function (
		entity: DbEntity,
		applicationUtils: IApplicationUtils,
		relationManager: IRelationManager,
		nextChildJoinPosition: number[],
		dbRelation: DbRelation,
		joinType: JoinType
	) {
		(<any>ChildQEntity).base.constructor.call(
			this, entity, nextChildJoinPosition, dbRelation, joinType)

		entity.properties.forEach((
			property: DbProperty
		) => {
			let qFieldOrRelation

			if (property.relation && property.relation.length) {
				qFieldOrRelation = getQRelation(entity, property,
					this, allQApplications, applicationUtils, relationManager)
				for (const propertyColumn of property.propertyColumns) {
					addColumnQField(entity, property, this, propertyColumn.column)
				}
			} else {
				qFieldOrRelation = addColumnQField(entity, property, this,
					property.propertyColumns[0].column)
			}
			this[property.name] = qFieldOrRelation
		})
		// entity.__qConstructor__ = ChildQEntity
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

export function getQEntityIdRelationConstructor(
	dbEntity: DbEntity
): typeof QRelation {

	function QEntityIdRelation(
		entity: DbEntity,
		relation: DbRelation,
		qEntity: IQEntityInternal,
	) {
		(<any>QEntityIdRelation).base.constructor.call(this, relation, qEntity)

		getQEntityIdFields(this, entity, qEntity, relation.property)

		// (<any>entity).__qConstructor__.__qIdRelationConstructor__ = QEntityIdRelation
	}

	if (dbEntity.isRepositoryEntity) {
		extend(QRepositoryEntityRelation, QEntityIdRelation, {})
	} else {
		extend(QRelation, QEntityIdRelation, {})
	}

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
 * @param relationEntity  Entity to which the fields belong (Ex: QA, QRel1, QRel2, QOtherRel)
 * @param utils
 * @param parentProperty  The parent property from which the current property was
 *    navigated to
 * @param relationColumnMap  DbColumn map for the current path of properties
 *  (QA.rel2.otherRel), keyed by the column from the One side of the relation
 */
export function getQEntityIdFields(
	addToObject,
	relationEntity: DbEntity,
	qEntity: IQEntity,
	parentProperty: DbProperty,
	relationColumnMap?: Map<DbColumn, DbColumn>
) {
	if (!relationColumnMap) {
		const parentRelation = parentProperty.relation[0]
		const relationColumns = parentRelation.manyRelationColumns
		relationColumnMap = new Map()
		for (const relationColumn of relationColumns) {
			relationColumnMap.set(relationColumn.oneColumn,
				relationColumn.manyColumn)
		}
	}
	relationEntity.properties.forEach((
		property: DbProperty
	) => {
		if (!property.isId) {
			return
		}
		let qFieldOrRelation


		// If it's a relation property (and therefore has backing columns)
		if (property.relation && property.relation.length) {
			const relation = property.relation[0]
			const relationColumns = relation.manyRelationColumns
			for (const relationColumn of relationColumns) {
				const originalColumn = relationColumnMap.get(relationColumn.manyColumn)
				// Remove the mapping of the parent relation
				relationColumnMap.delete(relationColumn.manyColumn)
				// And replace it with the nested relation
				relationColumnMap.set(relationColumn.oneColumn,
					originalColumn)
			}

			qFieldOrRelation = getQEntityIdFields(
				{}, relation.relationEntity, qEntity,
				parentProperty, relationColumnMap)
		} else {
			const originalColumn = relationColumnMap.get(property.propertyColumns[0].column)
			qFieldOrRelation = getColumnQField(relationEntity,
				parentProperty, qEntity as IQEntityInternal, originalColumn)
		}
		addToObject[property.name] = qFieldOrRelation
	})

	return addToObject
}

export function setQApplicationEntities(
	application: DbApplication,
	qApplication: QApplicationInternal,
	allQApplications: QApplication[]
) {
	// const entities = orderEntitiesByIdDependencies(application.currentVersion[0].applicationVersion.entities,
	// application)

	qApplication.__qIdRelationConstructors__ = []
	qApplication.__qConstructors__ = {}

	// let haveMissingDependencies
	// do {
	// 	haveMissingDependencies = false
	// NOTE: only need to compute the keys of entities for Many-to-One(s)
	// Many-to-Ones must reference the table by primary key in order to
	// guarantee a single record.  Any other type of join may return multiple
	// records and is in fact a Many-to-Many
	application.currentVersion[0].applicationVersion.entities.forEach((
		// entities.forEach((
		entity: DbEntity
	) => {
		// NOTE: an @Id column is guaranteed to be present in only one property
		for (const idColumn of entity.idColumns) {
			if (idColumn.manyRelationColumns
				&& idColumn.manyRelationColumns.length) {
				const oneColumn = idColumn.manyRelationColumns[0].oneColumn
				const relatedEntity = oneColumn.entity
				const relatedQApplication = allQApplications[relatedEntity.applicationVersion.application.index]
				if (!relatedQApplication) {
					throw new Error(`QApplication not yet initialized for ID relation:
					${entity.name}.${oneColumn.name}
					`)
				}

				// const manyColumn = idColumn.manyRelationColumns[0].manyColumn

				// if (relatedEntity.id === manyColumn.entity.id
				// 	&& relatedEntity.applicationVersion.application.index
				// 	=== manyColumn.entity.applicationVersion.application.index) {
				// 	continue
				// }

				// const relatedQEntityConstructor =
				// qApplication.__qConstructors__[relatedEntity.index] if (!relatedQEntityConstructor)
				// { throw new Error(`QEntity not yet initialized for ID relation:
				// ${entity.name}.${manyColumn.name} `) haveMissingDependencies = true }
			}
		}

		const qIdRelationConstructor = <any>getQEntityIdRelationConstructor(entity)
		qApplication.__qIdRelationConstructors__[entity.index] = qIdRelationConstructor

		// TODO: compute many-to-many relations

		const qConstructor = <any>getQEntityConstructor(allQApplications)
		qApplication.__qConstructors__[entity.index] = qConstructor

		if (!Object.getOwnPropertyNames(qApplication)
			.filter(
				propertyName => propertyName === entity.name).length) {
			Object.defineProperty(qApplication, entity.name, {
				get: function () {
					return new this.__qConstructors__[entity.index](entity)
				}
			})
		}
	})
	// } while (haveMissingDependencies)

}

export interface DbApplicationWithDependencies {
	application: DbApplication
	dependencies: Set<ApplicationIndex>
}

export function orderApplicationsInOrderOfPrecedence(
	applications: DbApplication[]
): DbApplication[] {
	const applicationWithDepsMap: Map<ApplicationIndex, DbApplicationWithDependencies> = new Map()
	const applicationsWithDeps: DbApplicationWithDependencies[] = applications.map(
		application => {
			const dependencies: Set<ApplicationIndex> = new Set()
			for (const applicationReference of application.currentVersion[0]
				.applicationVersion.references) {
				dependencies.add(applicationReference.referencedApplicationVersion.application.index)
			}
			const applicationWithDependencies: DbApplicationWithDependencies = {
				application,
				dependencies
			}
			applicationWithDepsMap.set(application.index, applicationWithDependencies)

			return applicationWithDependencies
		}
	)

	applicationsWithDeps.sort((
		orderedApplication1: DbApplicationWithDependencies,
		orderedApplication2: DbApplicationWithDependencies
	) => {
		if (applicationDependsOn(
			orderedApplication1, orderedApplication2.application.index, applicationWithDepsMap)) {
			return 1
		} else if (applicationDependsOn(
			orderedApplication2, orderedApplication1.application.index, applicationWithDepsMap)) {
			return -1
		}

		return 0
	})

	return applicationsWithDeps.map(
		applicationWithDeps => applicationWithDeps.application)
}

export function applicationDependsOn(
	dependantApplication: DbApplicationWithDependencies,
	dependsOnApplicationIndex: ApplicationIndex,
	applicationWithDepsMap: Map<ApplicationIndex, DbApplicationWithDependencies>
) {
	if (dependantApplication.dependencies.has(dependsOnApplicationIndex)) {
		return true
	}

	// for(const dependencyApplicationIndex of dependantApplication.dependencies) {
	//
	// }

	return false
}

/*
export function orderEntitiesByIdDependencies(
	entities: DbEntity[],
	application: DbApplication
): DbEntity[] {
	const entityWithDepsMap: Map<TableIndex, DbEntityWithDependencies> = new Map()
	const entitiesWithDeps: DbEntityWithDependencies[]                 = entities.map(
		entity => {
			const dependencies: Set<TableIndex> = new Set()
			for (const relation of entity.relations) {
				switch (relation.relationType) {
					case EntityRelationType.MANY_TO_ONE:
						if (application.index === relation.relationEntity.applicationVersion.application.index) {
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
