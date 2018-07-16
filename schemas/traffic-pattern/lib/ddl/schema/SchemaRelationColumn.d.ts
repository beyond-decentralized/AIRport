import { ISchemaRelationColumn } from "../../generated/schema/qschemarelationcolumn";
import { ISchemaColumn } from "../../generated/schema/qschemacolumn";
import { ISchemaRelation } from "../../generated/schema/qschemarelation";
export declare class SchemaRelationColumn implements ISchemaRelationColumn {
    manyColumn: ISchemaColumn;
    oneColumn: ISchemaColumn;
    manyRelation: ISchemaRelation;
    oneRelation: ISchemaRelation;
}
