
/*
FIXME: Last Ids are passed between framework and isolates for initialization,
should probably switch to tracking of applications by signature instead of an index.
*/
export interface LastIds {
    columns: number
    domains: number
    entities: number
    properties: number
    propertyColumns: number
    relationColumns: number
    relations: number
    applications: number
    applicationVersions: number
}