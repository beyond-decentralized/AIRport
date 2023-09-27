import { AppApiClass, AppApiOperation, AppApiParameter, AppApiReturnType, IApplication, IApplicationReference, IApplicationVersion, DbColumn, IDomain, DbEntity, DbProperty, DbPropertyColumn, DbRelation, DbRelationColumn } from "@airport/ground-control"

export interface AllDdlObjects {
    all: DdlObjects
    allApplicationVersionsByIds: IApplicationVersion[]
    added: DdlObjects
}

export interface DdlObjects {
    apiClasses: AppApiClass[],
    apiOperations: AppApiOperation[],
    apiParameters: AppApiParameter[],
    apiReturnTypes: AppApiReturnType[],
    columns: DbColumn[]
    domains: IDomain[]
    entities: DbEntity[]
    latestApplicationVersions: IApplicationVersion[]
    properties: DbProperty[]
    propertyColumns: DbPropertyColumn[]
    relationColumns: DbRelationColumn[]
    relations: DbRelation[]
    applications: IApplication[]
    applicationReferences: IApplicationReference[]
    applicationVersions: IApplicationVersion[]

}