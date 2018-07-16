import { IQBuilder } from "./QBuilder";
import { PathBuilder } from "./PathBuilder";
export declare class DmoBuilder implements IQBuilder {
    private pathBuilder;
    daoListingFilePath: any;
    private entityNames;
    private ddlPathMapByEntityName;
    private generatedPathMapByEntityName;
    constructor(pathBuilder: PathBuilder);
    addFileNameAndPaths(entityName: string, fullDdlPath: string, fullGenerationPath: string): void;
    build(): string;
}
