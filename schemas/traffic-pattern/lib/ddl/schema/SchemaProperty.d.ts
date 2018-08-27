import { PropertyIndex, PropertyIsId, PropertyName } from '@airport/ground-control';
import { SchemaEntity } from './SchemaEntity';
import { SchemaPropertyColumn } from './SchemaPropertyColumn';
import { SchemaRelation } from './SchemaRelation';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare type SchemaPropertyId = number;
export declare class SchemaProperty extends VersionedSchemaObject {
    id: SchemaPropertyId;
    index: PropertyIndex;
    entity: SchemaEntity;
    name: PropertyName;
    isId: PropertyIsId;
    propertyColumns: SchemaPropertyColumn[];
    relation: SchemaRelation[];
}
