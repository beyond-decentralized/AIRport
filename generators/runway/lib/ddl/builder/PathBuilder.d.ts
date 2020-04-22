/**
 * Created by Papa on 4/28/2016.
 */
import { Configuration } from '../options/Options';
export declare class PathBuilder {
    private configuration;
    dirExistanceMap: {
        [path: string]: boolean;
    };
    generatedDirPath: string;
    fullGeneratedDirPath: string;
    ddlDirPath: string;
    workingDirPath: string;
    usePathCache: boolean;
    constructor(configuration: Configuration);
    getOutDirPrefix(fullGenerationPath: string): string;
    prefixQToFileName(sourceRelativePath: string): string;
    getFullPathToGeneratedSource(//
    sourcePath: string, prefixQ?: boolean): string;
    setupFileForGeneration(sourcePath: string, prefixQ?: boolean): string;
    convertFileNameToLowerCase(//
    path: string): string;
    private getGenerationPathForFile;
}
