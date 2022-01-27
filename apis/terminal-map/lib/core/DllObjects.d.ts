import { IApplication, IApplicationColumn, IApplicationEntity, IApplicationProperty, IApplicationPropertyColumn, IApplicationReference, IApplicationRelation, IApplicationRelationColumn, IApplicationVersion, IDomain } from "@airport/airspace";
export interface AllDdlObjects {
    all: DdlObjects;
    allApplicationVersionsByIds: IApplicationVersion[];
    added: DdlObjects;
}
export interface DdlObjects {
    columns: IApplicationColumn[];
    domains: IDomain[];
    entities: IApplicationEntity[];
    latestApplicationVersions: IApplicationVersion[];
    properties: IApplicationProperty[];
    propertyColumns: IApplicationPropertyColumn[];
    relationColumns: IApplicationRelationColumn[];
    relations: IApplicationRelation[];
    applications: IApplication[];
    applicationReferences: IApplicationReference[];
    applicationVersions: IApplicationVersion[];
}
//# sourceMappingURL=DllObjects.d.ts.map