import { TableIndex } from "../../lingo/application/Entity";
import { ColumnIndex } from "../../lingo/application/Property";
import { ApplicationVersionId } from "../../lingo/application/Application";
import { ColumnMap } from "./ColumnMap";
/**
 * Created by Papa on 9/10/2016.
 */
export declare const ALL_TABLE_COLUMNS = "A";
export declare class TableMap {
    applicationVersionId: ApplicationVersionId;
    tableMap: {
        [tableIndex: string]: ColumnMap;
    };
    constructor(applicationVersionId: ApplicationVersionId, tableMap?: {
        [tableIndex: string]: ColumnMap;
    });
    ensure(tableIndex: TableIndex, allColumns?: boolean, ColumnMapConstructor?: typeof ColumnMap): ColumnMap;
    existsByStructure(tableIndex: TableIndex, columnIndex: ColumnIndex): boolean;
}
//# sourceMappingURL=TableMap.d.ts.map