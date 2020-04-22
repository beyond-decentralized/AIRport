import { PathBuilder } from './PathBuilder';
import { IBuilder } from './Builder';
export declare class QSchemaBuilder implements IBuilder {
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
