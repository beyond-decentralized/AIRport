import { PathBuilder } from './PathBuilder';
import { UtilityBuilder } from './UtilityBuilder';
export declare class DaoBuilder extends UtilityBuilder {
    constructor(applicationFullName: string, pathBuilder: PathBuilder);
    protected addImports(): void;
    protected buildStaticProperties(entityName: string): string;
}
//# sourceMappingURL=DaoBuilder.d.ts.map