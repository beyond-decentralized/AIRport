import { IBuilder } from "../../ddl/builder/Builder";
import { FileBuilder } from "../../ddl/builder/entity/FileBuilder";
import { PathBuilder } from "../../ddl/builder/PathBuilder";
export declare class ApiIndexBuilder extends FileBuilder implements IBuilder {
    apiFilePaths: string[];
    constructor(pathBuilder: PathBuilder);
    addApiFilePath(filePath: string): void;
    addImports(): void;
    build(): string;
}
//# sourceMappingURL=ApiIndexBuilder.d.ts.map