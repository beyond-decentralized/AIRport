import { PathBuilder } from './PathBuilder';
import { IQBuilder } from './QBuilder';
export declare class QSchemaBuilder implements IQBuilder {
    private pathBuilder;
    qSchemaFilePath: any;
    private entityNames;
    private ddlPathMapByEntityName;
    private generatedFilePaths;
    private generatedPathMapByEntityName;
    constructor(pathBuilder: PathBuilder);
    addFileNameAndPaths(entityName: string, fullDdlPath: string, fullGenerationPath: string): void;
    build(domainName: string, schemaName: string): string;
}
