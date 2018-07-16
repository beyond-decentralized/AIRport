import { SQLDataType } from "@airport/ground-control";
import { ISchemaColumn } from "../../generated/schema/qschemacolumn";
import { ISchemaRelationColumn } from "../../generated/schema/qschemarelationcolumn";
import { ISchemaPropertyColumn } from "../../generated/schema/qschemapropertycolumn";
export declare class SchemaColumn implements ISchemaColumn {
    /**
     * Overall column index (within the entity).
     */
    index: number;
    tableIndex: number;
    schemaVersionId: number;
    propertyColumns: ISchemaPropertyColumn[];
    /**
     * Index of the ID (within the entity)
     */
    idIndex: number;
    isGenerated: boolean;
    name: string;
    manyRelationColumns: ISchemaRelationColumn[];
    oneRelationColumns: ISchemaRelationColumn[];
    type: SQLDataType;
}
