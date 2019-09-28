import { ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-control';
import { EntityRelationType, RelationId, RelationIndex } from '@airport/ground-control';
import { SchemaEntity } from './SchemaEntity';
import { SchemaProperty } from './SchemaProperty';
import { SchemaRelationColumn } from './SchemaRelationColumn';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare class SchemaRelation extends VersionedSchemaObject {
    id: RelationId;
    index: RelationIndex;
    property: SchemaProperty;
    foreignKey: ForeignKey;
    manyToOneElems: ManyToOneElements;
    oneToManyElems: OneToManyElements;
    relationType: EntityRelationType;
    isId: boolean;
    entity: SchemaEntity;
    relationEntity: SchemaEntity;
    manyRelationColumns: SchemaRelationColumn[];
    oneRelationColumns?: SchemaRelationColumn[];
}
