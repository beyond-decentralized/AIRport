import { ImplementationFileBuilder } from './ImplementationFileBuilder';
import { PathBuilder } from './PathBuilder';
export declare abstract class UtilityBuilder extends ImplementationFileBuilder {
    private classSuffix;
    private diSet;
    constructor(applicationFullName: string, pathBuilder: PathBuilder, classSuffix: string, needsQEntity: boolean);
    build(): string;
    protected addImports(): void;
    protected buildBaseClassDefinitions(): string;
    protected buildStaticProperties(entityName: string): string;
}
//# sourceMappingURL=UtilityBuilder.d.ts.map