import { ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-control';
import { EntityRelationType } from "@airport/ground-control";
import { ISchemaEntity } from "../../generated/schema/qschemaentity";
import { ISchemaProperty } from "../../generated/schema/qschemaproperty";
import { ISchemaRelation } from "../../generated/schema/qschemarelation";
import { ISchemaRelationColumn } from "../../generated/schema/qschemarelationcolumn";
export declare class SchemaRelation implements ISchemaRelation {
    index: number;
    property: ISchemaProperty;
    foreignKey: ForeignKey;
    manyToOneElems: ManyToOneElements;
    oneToManyElems: OneToManyElements;
    relationType: EntityRelationType;
    isId: boolean;
    relationEntity: ISchemaEntity;
    manyRelationColumns: ISchemaRelationColumn[];
    oneRelationColumns: ISchemaRelationColumn[];
}
