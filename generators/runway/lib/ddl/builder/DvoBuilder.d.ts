import { ImplementationFileBuilder } from './ImplementationFileBuilder';
import { PathBuilder } from './PathBuilder';
export declare class DvoBuilder extends ImplementationFileBuilder {
    private classSuffix;
    private diSet;
    constructor(applicationFullName: string, pathBuilder: PathBuilder);
    build(): string;
    protected addImports(): void;
    protected buildBaseClassDefinitions(): string;
    protected buildStaticProperties(entityName: string): string;
}
//# sourceMappingURL=DvoBuilder.d.ts.map