import { IVersionedSchemaObject } from './versionedschemaobject';
import { ISchemaColumn } from './schemacolumn';
import { ISchemaProperty } from './schemaproperty';
export interface ISchemaPropertyColumn extends IVersionedSchemaObject {
    column: ISchemaColumn;
    property: ISchemaProperty;
}
//# sourceMappingURL=schemapropertycolumn.d.ts.map