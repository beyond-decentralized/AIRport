import { ApplicationEntity_TableIndex } from "../../definition/application/Entity";
import { Application_Index } from "../../definition/application/Application";
import { ColumnMap } from "../query/ColumnMap";
import { TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
/**
 * Created by Papa on 10/7/2016.
 */
export declare class SyncTableMap extends TableMap {
    constructor(applicationIndex: Application_Index, tableMap: {
        [tableIndex: string]: ColumnMap;
    });
    ensureEntity(tableIndex: ApplicationEntity_TableIndex, allColumns?: boolean): SyncColumnMap;
    intersects(columnMap: TableMap): boolean;
}
//# sourceMappingURL=SyncTableMap.d.ts.map