import { SIndexedSchema } from "./SSchema";
export declare class SchemaRelationResolver {
    resolveAllRelationLinks(indexedSchema: SIndexedSchema): void;
    private getEntityRelationsOfType;
    private resolveEntityRelationLinks;
    private linkColumnTypes;
    private setType;
    private setTypeForLinkedColumns;
    private getTypeFromSQLDataType;
}
