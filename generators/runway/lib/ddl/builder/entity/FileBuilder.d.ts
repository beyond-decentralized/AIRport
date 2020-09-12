import { Configuration } from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { PathBuilder } from '../PathBuilder';
export declare abstract class FileBuilder {
    protected entity: EntityCandidate;
    fullGenerationPath: string;
    protected pathBuilder: PathBuilder;
    configuration: Configuration;
    importMap: {
        [fileName: string]: {
            [asName: string]: string;
        };
    };
    constructor(entity: EntityCandidate, fullGenerationPath: string, pathBuilder: PathBuilder, configuration: Configuration);
    addImport(classNames: (string | {
        asName: string;
        sourceName: string;
    })[], filePath: string, toLowerCase?: boolean): void;
    protected buildImports(): string;
    protected abstract addImports(): void;
}
//# sourceMappingURL=FileBuilder.d.ts.map