import { ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-control';
import { EntityRelationType, RelationIndex } from '@airport/ground-control';
import { SchemaEntity } from './SchemaEntity';
import { SchemaProperty } from './SchemaProperty';
import { SchemaRelationColumn } from './SchemaRelationColumn';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare type SchemaRelationId = number;
export declare class SchemaRelation extends VersionedSchemaObject {
    id: SchemaRelationId;
    index: RelationIndex;
    property: SchemaProperty;
    foreignKey: ForeignKey;
    manyToOneElems: ManyToOneElements;
    oneToManyElems: OneToManyElements;
    relationType: EntityRelationType;
    isId: boolean;
    relationEntity: SchemaEntity;
    manyRelationColumns: SchemaRelationColumn[];
    oneRelationColumns: SchemaRelationColumn[];
}
