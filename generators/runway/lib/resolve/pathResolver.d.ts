import { FileBuilder } from '../ddl/builder/entity/FileBuilder';
import { EntityCandidate } from '../ddl/parser/EntityCandidate';
/**
 * Created by Papa on 4/27/2016.
 */
export declare function resolveRelativeEntityPath(from: EntityCandidate, //
to: EntityCandidate): string;
/**
 * Gets the full path to the import in a given file.
 *
 * @param {string} relativePath  ../../e/f/importedFileName
 * @param {string} relativeToPath  /a/b/c/sourceFileName
 * @returns {string}
 */
export declare function getFullPathFromRelativePath(relativePath: string, //
relativeToPath: string): string;
export declare function resolveRelativePath(fromPath: string, //
toPath: string): string;
export declare function addImportForType(entity: EntityCandidate, type: string, fileBuilder: FileBuilder): void;
export declare function getRelativePath(filePath: string): string;
export declare function normalizePath(path: string): string;
export declare function canBeInterface(type: string): boolean;
export declare function getImplNameFromInterfaceName(interfaceName: string): string;
//# sourceMappingURL=pathResolver.d.ts.map