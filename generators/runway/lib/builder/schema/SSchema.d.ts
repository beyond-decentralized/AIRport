import { DbSchema } from "@airport/ground-control";
import { SEntity, SIndexedEntity } from "./SEntity";
/**
 * A schema.
 */
export interface SSchema {
    domain: 'private' | string;
    entities: SEntity[];
    /**
     * Name of the schema.
     */
    name: string;
    referencedSchemas: SSchemaReference[];
}
export interface SSchemaReference {
    index: number;
    dbSchema: DbSchema;
}
/**
 * A schema with additional indexes (maps).
 */
export interface SIndexedSchema {
    /**
     * Entities by their repository table indexes.
     */
    entities: SIndexedEntity[];
    /**
     * Map of all entities by name.
     */
    entityMapByName: {
        [entityName: string]: SIndexedEntity;
    };
    /**
     * Schema definition.
     */
    schema: SSchema;
    referencedSchemasByName: {
        [projectName: string]: SSchemaReference;
    };
}
export declare function buildIndexedSSchema(schema: SSchema, referencedSchemasByName: {
    [projectName: string]: SSchemaReference;
}): SIndexedSchema;
