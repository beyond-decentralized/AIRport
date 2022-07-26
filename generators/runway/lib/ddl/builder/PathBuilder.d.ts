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
    prefixToFileName(sourceRelativePath: string, prefix: any): string;
    getFullPathToGeneratedSource(//
    sourcePath: string, prefix?: string): string;
    getFullPathToDdlSource(//
    sourcePath: string): string;
    setupFileForGeneration(sourcePath: string, prefix?: string): string;
    convertFileNameToLowerCase(//
    path: string): string;
    private getGenerationPathForFile;
    private getDdlPathForFile;
}
//# sourceMappingURL=PathBuilder.d.ts.map