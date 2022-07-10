import { ApplicationEntity_TableIndex } from "../../definition/application/Entity";
import { ApplicationColumn_Index } from "../../definition/application/Property";
import { ApplicationVersion_LocalId } from "../../definition/application/Application";
import { ColumnMap } from "./ColumnMap";
/**
 * Created by Papa on 9/10/2016.
 */
export declare const ALL_TABLE_COLUMNS = "A";
export declare class TableMap {
    applicationVersionId: ApplicationVersion_LocalId;
    tableMap: {
        [tableIndex: string]: ColumnMap;
    };
    constructor(applicationVersionId: ApplicationVersion_LocalId, tableMap?: {
        [tableIndex: string]: ColumnMap;
    });
    ensure(tableIndex: ApplicationEntity_TableIndex, allColumns?: boolean, ColumnMapConstructor?: typeof ColumnMap): ColumnMap;
    existsByStructure(tableIndex: ApplicationEntity_TableIndex, columnIndex: ApplicationColumn_Index): boolean;
}
//# sourceMappingURL=TableMap.d.ts.map