import { SchemaColumn } from './SchemaColumn';
import { SchemaRelation } from './SchemaRelation';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare type SchemaRelationColumnId = number;
export declare class SchemaRelationColumn extends VersionedSchemaObject {
    id: SchemaRelationColumnId;
    manyColumn: SchemaColumn;
    oneColumn: SchemaColumn;
    manyRelation?: SchemaRelation;
    oneRelation?: SchemaRelation;
    parentRelation: SchemaRelation;
}
//# sourceMappingURL=SchemaRelationColumn.d.ts.map