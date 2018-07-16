import { FileImports } from "./FileImports";
export declare class ImportManager {
    static resolveImports(sourceFile: any, filePath: string): FileImports;
    static isLocalReference(path: string): boolean;
}
