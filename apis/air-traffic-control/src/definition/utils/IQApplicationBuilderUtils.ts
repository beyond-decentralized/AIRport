import { QApp } from "@airport/aviation-communication"
import { ApplicationEntity_TableIndex, Application_Index, DbApplication, DbEntity } from "@airport/ground-control"
import { IApplicationUtils, IRelationManager } from "@airport/tarmaq-query"
import { QAppInternal } from "../AirportDatabase"

export interface DbApplicationWithDependencies {
	application: DbApplication
	dependencies: Set<DbApplicationDependency>
}

export interface DbApplicationDependency {
	appWithDependencies?: DbApplicationWithDependencies
	index: Application_Index
}

export interface DbEntityWithDependencies {
	entity: DbEntity
	dependencies: Set<ApplicationEntity_TableIndex>
}

export interface IQApplicationBuilderUtils {

	setQAppEntities(
		application: DbApplication,
		qApplication: QAppInternal,
		allQApps: QApp[],
		appliationUtils: IApplicationUtils,
		relationManager: IRelationManager,
	): void

	orderApplicationsInOrderOfPrecedence(
		applications: DbApplication[]
	): DbApplication[]

	applicationDependsOn(
		dependantApplication: DbApplicationWithDependencies,
		dependsOnApplication_Index: Application_Index
	): boolean

}
