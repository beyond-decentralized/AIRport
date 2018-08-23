import { PropertyName } from '@airport/ground-control';
import { ISchemaEntity } from "../../generated/schema/qschemaentity";
import { ISchemaProperty } from "../../generated/schema/qschemaproperty";
import { ISchemaPropertyColumn } from "../../generated/schema/qschemapropertycolumn";
import { ISchemaRelation } from "../../generated/schema/qschemarelation";
export declare class SchemaProperty implements ISchemaProperty {
    index: number;
    entity: ISchemaEntity;
    name: PropertyName;
    isId: boolean;
    propertyColumns: ISchemaPropertyColumn[];
    relation: ISchemaRelation[];
}
