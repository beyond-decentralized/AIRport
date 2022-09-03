import { Configuration } from '../options/Options';
import { PathBuilder } from './PathBuilder';
import { IBuilder } from './Builder';
export declare class QApplicationBuilder implements IBuilder {
    private applicationFullName;
    private pathBuilder;
    private configuration;
    qApplicationFilePath: any;
    private entityNames;
    private ddlPathMapByEntityName;
    private generatedFilePaths;
    private generatedPathMapByEntityName;
    private mappedSuperclassSet;
    constructor(applicationFullName: string, pathBuilder: PathBuilder, configuration: Configuration);
    addFileNameAndPaths(entityName: string, fullDdlPath: string, fullGenerationPath: string, isMappedSuperclass: boolean): void;
    build(domainName: string, applicationName: string): string;
}
//# sourceMappingURL=QApplicationBuilder.d.ts.map