import { IUtils } from '@airport/air-control';
import { JsonSchema } from '@airport/ground-control';
export interface SchemaReferenceCheckResults {
    schemasWithValidDependencies: JsonSchema[];
    schemasInNeedOfAdditionalDependencies: JsonSchema[];
    neededDependencies: JsonSchema[];
}
export interface ISchemaChecker {
    check(jsonSchema: JsonSchema): Promise<void>;
}
export declare class SchemaChecker {
    private utils;
    constructor(utils: IUtils);
    check(jsonSchema: JsonSchema): Promise<void>;
    checkDomain(jsonSchema: JsonSchema): Promise<void>;
    checkDependencies(jsonSchemas: JsonSchema[]): Promise<SchemaReferenceCheckResults>;
}
