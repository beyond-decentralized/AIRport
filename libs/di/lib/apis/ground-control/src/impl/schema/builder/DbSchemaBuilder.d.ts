import { IDbSchemaBuilder } from '../../../lingo/schema/builder/DbSchemaBuilder';
import { ILinkingDictionary } from '../../../lingo/schema/builder/LinkingDictionary';
import { DbSchema, JsonSchema } from '../../../lingo/schema/Schema';
export declare class DbSchemaBuilder implements IDbSchemaBuilder {
    buildDbSchemaWithoutReferences(jsonSchema: JsonSchema, allSchemas: DbSchema[], dictionary: ILinkingDictionary): DbSchema;
    /**
     *
     * @param {{[p: string]: DbSchema}} schemaMap
     * @param {{[p: string]: JsonSchema}} jsonSchemaMap
     * @param {ILinkingDictionary} dictionary
     */
    linkDbSchemasByReferences(schemaMap: {
        [domain: string]: {
            [name: string]: DbSchema;
        };
    }, jsonSchemaMap: {
        [domain: string]: {
            [name: string]: JsonSchema;
        };
    }, dictionary: ILinkingDictionary, failOnMissingMappings?: boolean): void;
    private buildDbEntity;
    private buildDbRelation;
    /**
     * Schema loading process at runtime:
     *
     * First the build-in schema's run:
     *
     * 1) Traffic Pattern
     * 2) Holding Pattern
     *
     * Then the schema for the application being loaded is run, in order of the dependency
     * graph:
     *
     * 3) App schema grand-dependency
     * 4) App schema dependency
     * 5) Application schema
     *
     * Load provided schemas
     */
    private buildDbColumn;
}
//# sourceMappingURL=DbSchemaBuilder.d.ts.map