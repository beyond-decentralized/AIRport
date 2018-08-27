import { SchemaColumn } from './SchemaColumn';
import { SchemaRelation } from './SchemaRelation';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare class SchemaRelationColumn extends VersionedSchemaObject {
    manyColumn: SchemaColumn;
    oneColumn: SchemaColumn;
    manyRelation: SchemaRelation;
    oneRelation: SchemaRelation;
}
