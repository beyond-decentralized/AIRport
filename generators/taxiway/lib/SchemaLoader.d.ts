import { DbSchema, IDbSchemaBuilder, JsonSchema } from '@airport/ground-control';
export interface ISchemaLoader {
    findAllReferencedJsonSchemas(): JsonSchema[];
    getReferencedSchema(projectName: string): DbSchema;
}
export declare class SchemaLoader implements ISchemaLoader {
    allSchemas: DbSchema[];
    dbSchemaBuilder: IDbSchemaBuilder;
    dictionary: {
        dbColumnRelationMapByManySide: {};
        dbColumnRelationMapByOneSide: {};
    };
    findAllReferencedJsonSchemas(): JsonSchema[];
    getReferencedSchema(projectName: string): DbSchema;
    getJsonSchema(projectName: string): JsonSchema;
}
//# sourceMappingURL=SchemaLoader.d.ts.map