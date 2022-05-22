import { IApiFileForGeneration } from "../../api/parser/ApiGenerator";
import { IBuilder } from "./Builder";
import { FileBuilder } from "./entity/FileBuilder";
import { PathBuilder } from "./PathBuilder";
export declare class ApiBuilder extends FileBuilder implements IBuilder {
    private apiFile;
    constructor(pathBuilder: PathBuilder, apiFile: IApiFileForGeneration);
    addImports(): void;
    build(): string;
    private buildApiMethodStubFragment;
    private buildApiMethodStub;
}
//# sourceMappingURL=ApiBuilder.d.ts.map