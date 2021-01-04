import { Configuration } from '../options/Options';
import { PathBuilder } from './PathBuilder';
import { IBuilder } from './Builder';
export declare class QSchemaBuilder implements IBuilder {
    private pathBuilder;
    private configuration;
    qSchemaFilePath: any;
    private entityNames;
    private ddlPathMapByEntityName;
    private generatedFilePaths;
    private generatedPathMapByEntityName;
    private mappedSuperclassSet;
    constructor(pathBuilder: PathBuilder, configuration: Configuration);
    addFileNameAndPaths(entityName: string, fullDdlPath: string, fullGenerationPath: string, isMappedSuperclass: boolean): void;
    build(domainName: string, schemaName: string): string;
}
//# sourceMappingURL=QSchemaBuilder.d.ts.map