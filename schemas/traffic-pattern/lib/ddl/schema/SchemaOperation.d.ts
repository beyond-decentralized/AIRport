import { Operation_Id, Operation_Name, Operation_Rule, Operation_Type } from '@airport/ground-control';
import { SchemaEntity } from './SchemaEntity';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare class SchemaOperation extends VersionedSchemaObject {
    id: Operation_Id;
    type: Operation_Type;
    entity: SchemaEntity;
    name: Operation_Name;
    rule: Operation_Rule;
}
//# sourceMappingURL=SchemaOperation.d.ts.map