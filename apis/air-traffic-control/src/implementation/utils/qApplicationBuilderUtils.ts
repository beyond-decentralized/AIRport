import { QApp } from '@airport/aviation-communication'
import { Inject, Injected } from '@airport/direction-indicator'
import {
	DbEntity,
	IApplication,
	Application_Index,
	IApplicationUtils
} from '@airport/ground-control'
import { IQueryRelationManager, IQEntityUtils } from '@airport/tarmaq-query'
import { QAppInternal } from '../../definition/IAirportDatabase'
import { IApplicationDependency, IApplicationWithDependencies, IQApplicationBuilderUtils } from '../../definition/utils/IQApplicationBuilderUtils'


@Injected()
export class QApplicationBuilderUtils
	implements IQApplicationBuilderUtils {

	@Inject()
	qEntityUtils: IQEntityUtils

	setQAppEntities(
		application: IApplication,
		qApplication: QAppInternal,
		allQApps: QApp[],
		appliationUtils: IApplicationUtils,
		queryRelationManager: IQueryRelationManager,
	): void {
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

			const qIdRelationConstructor = <any>this.qEntityUtils.getQEntityIdRelationConstructor(entity)
			qApplication.__qIdRelationConstructors__[entity.index] = qIdRelationConstructor

			// TODO: compute many-to-many relations

			const qConstructor = <any>this.qEntityUtils.getQEntityConstructor(allQApps)
			qApplication.__qConstructors__[entity.index] = qConstructor

			if (!Object.getOwnPropertyNames(qApplication)
				.filter(
					propertyName => propertyName === entity.name).length) {
				Object.defineProperty(qApplication, entity.name, {
					get: function () {
						return new this.__qConstructors__[entity.index](
							entity, appliationUtils, queryRelationManager)
					}
				})
			}
		})
		// } while (haveMissingDependencies)

	}

	orderApplicationsInOrderOfPrecedence(
		applications: IApplication[]
	): IApplication[] {
		const appWithDependenciesMap: Map<Application_Index, IApplicationWithDependencies> = new Map()
		const appsWithDependencies: IApplicationWithDependencies[] = applications.map(
			application => {
				const dependencies: Set<IApplicationDependency> = new Set()
				for (const applicationReference of application.currentVersion[0]
					.applicationVersion.references) {
					dependencies.add({
						index: applicationReference.referencedApplicationVersion.application.index
					})
				}
				const applicationWithDependencies: IApplicationWithDependencies = {
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
			orderedApplication1: IApplicationWithDependencies,
			orderedApplication2: IApplicationWithDependencies
		) => {
			if (this.applicationDependsOn(
				orderedApplication1, orderedApplication2.application.index)) {
				return 1
			} else if (this.applicationDependsOn(
				orderedApplication2, orderedApplication1.application.index)) {
				return -1
			}

			return 0
		})

		return appsWithDependencies.map(
			applicationWithDeps => applicationWithDeps.application)
	}

	applicationDependsOn(
		dependantApplication: IApplicationWithDependencies,
		dependsOnApplication_Index: Application_Index
	): boolean {
		for (const dependency of dependantApplication.dependencies) {
			if (dependency.index == dependsOnApplication_Index) {
				return true
			}
			if (dependency.appWithDependencies.dependencies.size) {
				if (this.applicationDependsOn(dependency.appWithDependencies, dependsOnApplication_Index)) {
					return true
				}
			}
		}

		return false
	}

}
