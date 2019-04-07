import { PathBuilder } from './PathBuilder';
import { IQBuilder } from './QBuilder';
export declare class DuoBuilder implements IQBuilder {
    private pathBuilder;
    daoListingFilePath: any;
    private entityNames;
    private ddlPathMapByEntityName;
    private generatedPathMapByEntityName;
    constructor(pathBuilder: PathBuilder);
    addFileNameAndPaths(entityName: string, fullDdlPath: string, fullGenerationPath: string): void;
    build(): string;
}
