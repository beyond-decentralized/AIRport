import { QApp } from "@airport/aviation-communication"
import { DbEntity_TableIndex, Application_Index, IApplication, DbEntity, IApplicationUtils } from "@airport/ground-control"
import { IQueryRelationManager } from "@airport/tarmaq-query"
import { QAppInternal } from "../IAirportDatabase"

export interface IApplicationWithDependencies {
	application: IApplication
	dependencies: Set<IApplicationDependency>
}

export interface IApplicationDependency {
	appWithDependencies?: IApplicationWithDependencies
	index: Application_Index
}

export interface DbEntityWithDependencies {
	entity: DbEntity
	dependencies: Set<DbEntity_TableIndex>
}

export interface IQApplicationBuilderUtils {

	setQAppEntities(
		application: IApplication,
		qApplication: QAppInternal,
		allQApps: QApp[],
		appliationUtils: IApplicationUtils,
		queryRelationManager: IQueryRelationManager,
	): void

	orderApplicationsInOrderOfPrecedence(
		applications: IApplication[]
	): IApplication[]

	applicationDependsOn(
		dependantApplication: IApplicationWithDependencies,
		dependsOnApplication_Index: Application_Index
	): boolean

}
