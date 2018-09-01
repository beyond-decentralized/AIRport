import { PathBuilder } from './PathBuilder';
import { IQBuilder } from './QBuilder';
export declare class GeneratedSummaryBuilder implements IQBuilder {
    private pathBuilder;
    generatedListingFilePath: any;
    private generatedFilePaths;
    constructor(pathBuilder: PathBuilder);
    addFileNameAndPaths(entityName: string, fullDdlPath: string, fullGenerationPath: string): void;
    build(): string;
}
