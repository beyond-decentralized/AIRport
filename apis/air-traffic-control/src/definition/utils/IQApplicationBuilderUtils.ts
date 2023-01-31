import { QApp } from "@airport/aviation-communication"
import { DbEntity_TableIndex, DbApplication_Index, DbApplication, DbEntity, IApplicationUtils } from "@airport/ground-control"
import { IQueryRelationManager } from "@airport/tarmaq-query"
import { QAppInternal } from "../IAirportDatabase"

export interface DbApplicationWithDependencies {
	application: DbApplication
	dependencies: Set<DbApplicationDependency>
}

export interface DbApplicationDependency {
	appWithDependencies?: DbApplicationWithDependencies
	index: DbApplication_Index
}

export interface DbEntityWithDependencies {
	entity: DbEntity
	dependencies: Set<DbEntity_TableIndex>
}

export interface IQApplicationBuilderUtils {

	setQAppEntities(
		application: DbApplication,
		qApplication: QAppInternal,
		allQApps: QApp[],
		appliationUtils: IApplicationUtils,
		relationManager: IQueryRelationManager,
	): void

	orderApplicationsInOrderOfPrecedence(
		applications: DbApplication[]
	): DbApplication[]

	applicationDependsOn(
		dependantApplication: DbApplicationWithDependencies,
		dependsOnDbApplication_Index: DbApplication_Index
	): boolean

}
