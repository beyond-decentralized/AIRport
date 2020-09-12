import { PathBuilder } from './PathBuilder';
import { IBuilder } from './Builder';
export declare class GeneratedFileListingBuilder implements IBuilder {
    private pathBuilder;
    private fileName;
    generatedListingFilePath: any;
    private generatedFilePaths;
    constructor(pathBuilder: PathBuilder, fileName: string);
    addFileNameAndPaths(entityName: string, fullDdlPath: string, fullGenerationPath: string): void;
    build(): string;
}
//# sourceMappingURL=GeneratedFileListingBuilder.d.ts.map