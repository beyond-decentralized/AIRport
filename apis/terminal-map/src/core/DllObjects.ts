import { AppApiClass, AppApiOperation, AppApiParameter, AppApiReturnType, DbApplication, DbApplicationReference, DbApplicationVersion, DbColumn, DbDomain, DbEntity, DbProperty, DbPropertyColumn, DbRelation, DbRelationColumn } from "@airport/ground-control"

export interface AllDdlObjects {
    all: DdlObjects
    allApplicationVersionsByIds: DbApplicationVersion[]
    added: DdlObjects
}

export interface DdlObjects {
    apiClasses: AppApiClass[],
    apiOperations: AppApiOperation[],
    apiParameters: AppApiParameter[],
    apiReturnTypes: AppApiReturnType[],
    columns: DbColumn[]
    domains: DbDomain[]
    entities: DbEntity[]
    latestApplicationVersions: DbApplicationVersion[]
    properties: DbProperty[]
    propertyColumns: DbPropertyColumn[]
    relationColumns: DbRelationColumn[]
    relations: DbRelation[]
    applications: DbApplication[]
    applicationReferences: DbApplicationReference[]
    applicationVersions: DbApplicationVersion[]

}