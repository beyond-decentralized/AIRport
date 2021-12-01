import { DbEntity, TableIndex } from "../../lingo/application/Entity";
import { ColumnIndex } from "../../lingo/application/Property";
import { ApplicationIndex } from "../../lingo/application/Application";
import { ColumnMap } from "./ColumnMap";
import { TableMap } from "./TableMap";
export declare class ApplicationMap {
    applicationMap: {
        [applicationVersionId: string]: TableMap;
    };
    constructor(applicationMap?: {
        [applicationVersionId: string]: TableMap;
    });
    ensureEntity(entity: DbEntity, allColumns?: boolean, TableMapConstructor?: typeof TableMap): ColumnMap;
    ensure(applicationIndex: ApplicationIndex, tableIndex: TableIndex, allColumns?: boolean, TableMapConstructor?: typeof TableMap): ColumnMap;
    existsByStructure(applicationIndex: ApplicationIndex, tableIndex: TableIndex, columnIndex: ColumnIndex): boolean;
}
//# sourceMappingURL=ApplicationMap.d.ts.map