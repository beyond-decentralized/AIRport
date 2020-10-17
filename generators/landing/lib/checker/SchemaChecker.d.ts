import { JsonSchema, SchemaName } from '@airport/ground-control';
import { ISchema } from '@airport/traffic-pattern';
export interface CoreDomainAndSchemaNames {
    domain: string;
    schema: string;
}
export interface ExistingSchemaInfo {
    coreDomainAndSchemaNamesBySchemaName: Map<SchemaName, CoreDomainAndSchemaNames>;
    existingSchemaMapByName: Map<SchemaName, ISchema>;
}
export interface SchemaReferenceCheckResults {
    schemasWithValidDependencies: JsonSchema[];
    schemasInNeedOfAdditionalDependencies: JsonSchema[];
    neededDependencies: JsonSchema[];
}
export interface ISchemaChecker {
    check(jsonSchema: JsonSchema): Promise<void>;
    checkDependencies(jsonSchemas: JsonSchema[]): Promise<SchemaReferenceCheckResults>;
}
export declare class SchemaChecker implements ISchemaChecker {
    check(jsonSchema: JsonSchema): Promise<void>;
    checkDomain(jsonSchema: JsonSchema): Promise<void>;
    checkDependencies(jsonSchemas: JsonSchema[]): Promise<SchemaReferenceCheckResults>;
    private pruneInGroupReferences;
    private pruneReferencesToExistingSchemas;
    private findExistingSchemas;
    private hasReferences;
}
//# sourceMappingURL=SchemaChecker.d.ts.map