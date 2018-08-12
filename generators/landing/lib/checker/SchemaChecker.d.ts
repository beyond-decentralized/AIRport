import { JsonSchema } from '@airport/ground-control';
export interface ISchemaChecker {
    check(jsonSchema: JsonSchema): Promise<void>;
}
export declare class SchemaChecker {
    check(jsonSchema: JsonSchema): Promise<void>;
    checkDomain(jsonSchema: JsonSchema): Promise<void>;
}
