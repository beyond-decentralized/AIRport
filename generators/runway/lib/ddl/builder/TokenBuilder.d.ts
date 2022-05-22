import { IBuilder } from "./Builder";
import { FileBuilder } from "./entity/FileBuilder";
import { PathBuilder } from "./PathBuilder";
export declare class TokenBuilder extends FileBuilder implements IBuilder {
    static getTokenNameFromClassName(className: string): string;
    constructor(fileName: string, pathBuilder: PathBuilder);
    addImports(): void;
    build(): string;
}
//# sourceMappingURL=TokenBuilder.d.ts.map