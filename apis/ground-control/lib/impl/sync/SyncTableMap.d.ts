import { TableIndex } from "../../lingo/application/Entity";
import { ApplicationIndex } from "../../lingo/application/Application";
import { ColumnMap } from "../query/ColumnMap";
import { TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
/**
 * Created by Papa on 10/7/2016.
 */
export declare class SyncTableMap extends TableMap {
    constructor(applicationIndex: ApplicationIndex, tableMap: {
        [tableIndex: string]: ColumnMap;
    });
    ensureEntity(tableIndex: TableIndex, allColumns?: boolean): SyncColumnMap;
    intersects(columnMap: TableMap): boolean;
}
//# sourceMappingURL=SyncTableMap.d.ts.map