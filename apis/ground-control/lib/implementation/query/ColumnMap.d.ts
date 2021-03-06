import { ApplicationEntity_TableIndex } from "../../definition/application/Entity";
import { ApplicationColumn_Index } from "../../definition/application/Property";
export declare class ColumnMap {
    tableIndex: ApplicationEntity_TableIndex;
    columnMap: {
        [columnIndex: string]: boolean;
    };
    constructor(tableIndex: ApplicationEntity_TableIndex, allColumns?: boolean);
    ensure(columnIndex: ApplicationColumn_Index): void;
}
//# sourceMappingURL=ColumnMap.d.ts.map