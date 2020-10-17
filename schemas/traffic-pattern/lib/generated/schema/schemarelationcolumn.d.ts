import { IVersionedSchemaObject } from './versionedschemaobject';
import { ISchemaColumn } from './schemacolumn';
import { ISchemaRelation } from './schemarelation';
export interface ISchemaRelationColumn extends IVersionedSchemaObject {
    id: number;
    manyColumn?: ISchemaColumn;
    oneColumn?: ISchemaColumn;
    manyRelation?: ISchemaRelation;
    oneRelation?: ISchemaRelation;
    parentRelation?: ISchemaRelation;
}
//# sourceMappingURL=schemarelationcolumn.d.ts.map