import { IApiFileForGeneration } from "../parser/ApiGenerator";
import { IBuilder } from "../../ddl/builder/Builder";
import { FileBuilder } from "../../ddl/builder/entity/FileBuilder";
import { PathBuilder } from "../../ddl/builder/PathBuilder";
export declare class ApiBuilder extends FileBuilder implements IBuilder {
    private apiFile;
    private tokenName;
    constructor(pathBuilder: PathBuilder, apiFile: IApiFileForGeneration);
    addImports(): void;
    build(): string;
    private buildApiMethodStubFragment;
    private buildApiMethodStub;
}
//# sourceMappingURL=ApiBuilder.d.ts.map