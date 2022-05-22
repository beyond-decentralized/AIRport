import { IBuilder } from "./Builder";
import { FileBuilder } from "./entity/FileBuilder";
import { PathBuilder } from "./PathBuilder";
export declare class ApiIndexBuilder extends FileBuilder implements IBuilder {
    apiFilePaths: string[];
    constructor(pathBuilder: PathBuilder);
    addApiFilePath(filePath: string): void;
    addImports(): void;
    build(): string;
}
//# sourceMappingURL=ApiIndexBuilder.d.ts.map