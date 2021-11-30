import { PropertyId, PropertyIndex, PropertyIsId, PropertyName } from '@airport/ground-control';
import { SchemaEntity } from './SchemaEntity';
import { SchemaPropertyColumn } from './SchemaPropertyColumn';
import { SchemaRelation } from './SchemaRelation';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare class SchemaProperty extends VersionedSchemaObject {
    id: PropertyId;
    index: PropertyIndex;
    name: PropertyName;
    isId: PropertyIsId;
    entity: SchemaEntity;
    propertyColumns: SchemaPropertyColumn[];
    relation: SchemaRelation[];
}
//# sourceMappingURL=SchemaProperty.d.ts.map