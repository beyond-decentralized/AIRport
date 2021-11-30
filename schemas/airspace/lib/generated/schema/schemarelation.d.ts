import { IVersionedSchemaObject } from './versionedschemaobject';
import { ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-control';
import { ISchemaProperty } from './schemaproperty';
import { ISchemaEntity } from './schemaentity';
import { ISchemaRelationColumn } from './schemarelationcolumn';
export interface ISchemaRelation extends IVersionedSchemaObject {
    id: number;
    index?: number;
    foreignKey?: ForeignKey;
    manyToOneElems?: ManyToOneElements;
    oneToManyElems?: OneToManyElements;
    relationType?: string;
    isId?: boolean;
    property?: ISchemaProperty;
    entity?: ISchemaEntity;
    relationEntity?: ISchemaEntity;
    manyRelationColumns?: ISchemaRelationColumn[];
    oneRelationColumns?: ISchemaRelationColumn[];
}
//# sourceMappingURL=schemarelation.d.ts.map