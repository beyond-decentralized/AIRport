import { IVersionedSchemaObject } from './versionedschemaobject';
import { ISchemaEntity } from './schemaentity';
import { ISchemaPropertyColumn } from './schemapropertycolumn';
import { ISchemaRelation } from './schemarelation';
export interface ISchemaProperty extends IVersionedSchemaObject {
    id: number;
    index?: number;
    name?: string;
    isId?: boolean;
    entity?: ISchemaEntity;
    propertyColumns?: ISchemaPropertyColumn[];
    relation?: ISchemaRelation[];
}
//# sourceMappingURL=schemaproperty.d.ts.map