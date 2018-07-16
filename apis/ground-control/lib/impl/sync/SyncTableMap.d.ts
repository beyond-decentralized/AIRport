import { TableIndex } from "../../lingo/schema/Entity";
import { SchemaVersionId } from "../../lingo/schema/Schema";
import { ColumnMap } from "../query/ColumnMap";
import { TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
/**
 * Created by Papa on 10/7/2016.
 */
export declare class SyncTableMap extends TableMap {
    constructor(schemaVersionId: SchemaVersionId, tableMap: {
        [tableIndex: string]: ColumnMap;
    });
    ensureEntity(tableIndex: TableIndex, allColumns?: boolean): SyncColumnMap;
    intersects(columnMap: TableMap): boolean;
}
