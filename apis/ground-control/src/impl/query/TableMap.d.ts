import { TableIndex } from "../../lingo/schema/Entity";
import { ColumnIndex } from "../../lingo/schema/Property";
import { SchemaVersionId } from "../../lingo/schema/Schema";
import { ColumnMap } from "./ColumnMap";
/**
 * Created by Papa on 9/10/2016.
 */
export declare const ALL_TABLE_COLUMNS = "A";
export declare class TableMap {
    schemaVersionId: SchemaVersionId;
    tableMap: {
        [tableIndex: string]: ColumnMap;
    };
    constructor(schemaVersionId: SchemaVersionId, tableMap?: {
        [tableIndex: string]: ColumnMap;
    });
    ensure(tableIndex: TableIndex, allColumns?: boolean, ColumnMapConstructor?: typeof ColumnMap): ColumnMap;
    existsByStructure(tableIndex: TableIndex, columnIndex: ColumnIndex): boolean;
}
