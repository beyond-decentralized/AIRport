import { DbApplication, IDbApplicationBuilder, JsonApplication } from '@airport/ground-control';
export interface IApplicationLoader {
    findAllReferencedJsonApplications(): JsonApplication[];
    getReferencedApplication(projectName: string): DbApplication;
}
export declare class ApplicationLoader implements IApplicationLoader {
    allApplications: DbApplication[];
    dbApplicationBuilder: IDbApplicationBuilder;
    dictionary: {
        dbColumnRelationMapByManySide: {};
        dbColumnRelationMapByOneSide: {};
    };
    findAllReferencedJsonApplications(): JsonApplication[];
    getReferencedApplication(projectName: string): DbApplication;
    getJsonApplication(projectName: string): JsonApplication;
}
//# sourceMappingURL=ApplicationLoader.d.ts.map