import { IVersionedSchemaObject } from './versionedschemaobject';
import { ISchemaEntity } from './schemaentity';
import { ISchemaPropertyColumn } from './schemapropertycolumn';
import { ISchemaRelationColumn } from './schemarelationcolumn';
export interface ISchemaColumn extends IVersionedSchemaObject {
    id: number;
    index?: number;
    idIndex?: number;
    isGenerated?: boolean;
    allocationSize?: number;
    name?: string;
    notNull?: boolean;
    precision?: number;
    scale?: number;
    type?: string;
    entity?: ISchemaEntity;
    propertyColumns?: ISchemaPropertyColumn[];
    manyRelationColumns?: ISchemaRelationColumn[];
    oneRelationColumns?: ISchemaRelationColumn[];
}
//# sourceMappingURL=schemacolumn.d.ts.map