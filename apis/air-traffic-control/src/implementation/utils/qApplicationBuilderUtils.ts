import { QApp } from '@airport/aviation-communication'
import { extend } from '@airport/direction-indicator'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	DbRelation,
	DbApplication,
	EntityRelationType,
	JoinType,
	Application_Index,
	SQLDataType,
	ApplicationEntity_TableIndex
} from '@airport/ground-control'
import { IApplicationUtils, IQBooleanField, IQDateField, IQEntity, IQEntityInternal, IQNumberField, IQOperableFieldInternal, IQRelation, IQStringField, IQUntypedField, IRelationManager, QAirEntityOneToManyRelation, QAirEntityRelation, QBooleanField, QDateField, QEntity, QNumberField, QOneToManyRelation, QRelation, QStringField, QUntypedField } from '@airport/tarmaq-query'
import { QAppInternal } from '../../definition/AirportDatabase'

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
	allQApps: QApp[],
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager
): IQRelation<typeof q> {
	const relation = property.relation[0]
	switch (relation.relationType) {
		case EntityRelationType.MANY_TO_ONE:
			const relationEntity = relation.relationEntity
			const relationApplication = relationEntity.applicationVersion.application
			const qIdRelationConstructor
				= allQApps[relationApplication.index]
					.__qIdRelationConstructors__[relationEntity.index]
			return new qIdRelationConstructor(
				relation.relationEntity, relation, q, applicationUtils, relationManager)
		case EntityRelationType.ONE_TO_MANY:
			if (entity.isAirEntity) {
				return new QAirEntityOneToManyRelation(relation, q,
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
	allQApps: QApp[]
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
			this, entity, applicationUtils, relationManager,
			nextChildJoinPosition, dbRelation, joinType)

		entity.properties.forEach((
			property: DbProperty
		) => {
			let qFieldOrRelation

			if (property.relation && property.relation.length) {
				qFieldOrRelation = getQRelation(entity, property,
					this, allQApps, applicationUtils, relationManager)
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
	const childQEntityMethods = {
		/*
		yourMethodName: function() {},
		*/
	}

	extend(QEntity, ChildQEntity, childQEntityMethods)


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
		appliationUtils: IApplicationUtils,
		relationManager: IRelationManager,
	) {
		(<any>QEntityIdRelation).base.constructor.call(
			this, relation, qEntity, appliationUtils, relationManager)

		getQEntityIdFields(this, entity, qEntity, relation.property)

		// (<any>entity).__qConstructor__.__qIdRelationConstructor__ = QEntityIdRelation
	}
	const qEntityIdRelationMethods = {
		/*
		yourMethodName: function() {},
		*/
	}

	if (dbEntity.isAirEntity) {
		extend(QAirEntityRelation, QEntityIdRelation, qEntityIdRelationMethods)
	} else {
		extend(QRelation, QEntityIdRelation, qEntityIdRelationMethods)
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

export function setQAppEntities(
	application: DbApplication,
	qApplication: QAppInternal,
	allQApps: QApp[],
	appliationUtils: IApplicationUtils,
	relationManager: IRelationManager,
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
				const relatedQApp = allQApps[relatedEntity.applicationVersion.application.index]
				if (!relatedQApp) {
					throw new Error(`QApp not yet initialized for ID relation:
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

		const qConstructor = <any>getQEntityConstructor(allQApps)
		qApplication.__qConstructors__[entity.index] = qConstructor

		if (!Object.getOwnPropertyNames(qApplication)
			.filter(
				propertyName => propertyName === entity.name).length) {
			Object.defineProperty(qApplication, entity.name, {
				get: function () {
					return new this.__qConstructors__[entity.index](
						entity, appliationUtils, relationManager)
				}
			})
		}
	})
	// } while (haveMissingDependencies)

}

export interface DbApplicationWithDependencies {
	application: DbApplication
	dependencies: Set<DbApplicationDependency>
}

export interface DbApplicationDependency {
	appWithDependencies?: DbApplicationWithDependencies
	index: Application_Index
}

export function orderApplicationsInOrderOfPrecedence(
	applications: DbApplication[]
): DbApplication[] {
	const appWithDependenciesMap: Map<Application_Index, DbApplicationWithDependencies> = new Map()
	const appsWithDependencies: DbApplicationWithDependencies[] = applications.map(
		application => {
			const dependencies: Set<DbApplicationDependency> = new Set()
			for (const applicationReference of application.currentVersion[0]
				.applicationVersion.references) {
				dependencies.add({
					index: applicationReference.referencedApplicationVersion.application.index
				})
			}
			const applicationWithDependencies: DbApplicationWithDependencies = {
				application,
				dependencies
			}
			appWithDependenciesMap.set(application.index, applicationWithDependencies)

			return applicationWithDependencies
		}
	)

	for (let application of applications) {
		const appWithDependencies = appWithDependenciesMap.get(application.index)
		for (const dependency of appWithDependencies.dependencies) {
			dependency.appWithDependencies = appWithDependenciesMap.get(dependency.index)
		}
	}

	// Regular sort does not work since dependency tries can be complex and there is no way to 
	appsWithDependencies.sort((
		orderedApplication1: DbApplicationWithDependencies,
		orderedApplication2: DbApplicationWithDependencies
	) => {
		if (applicationDependsOn(
			orderedApplication1, orderedApplication2.application.index)) {
			return 1
		} else if (applicationDependsOn(
			orderedApplication2, orderedApplication1.application.index)) {
			return -1
		}

		return 0
	})

	return appsWithDependencies.map(
		applicationWithDeps => applicationWithDeps.application)
}

export function applicationDependsOn(
	dependantApplication: DbApplicationWithDependencies,
	dependsOnApplication_Index: Application_Index
) {
	for (const dependency of dependantApplication.dependencies) {
		if (dependency.index == dependsOnApplication_Index) {
			return true
		}
		if (dependency.appWithDependencies.dependencies.size) {
			if (applicationDependsOn(dependency.appWithDependencies, dependsOnApplication_Index)) {
				return true
			}
		}
	}

	return false
}

export interface DbEntityWithDependencies {
	entity: DbEntity
	dependencies: Set<ApplicationEntity_TableIndex>
}
