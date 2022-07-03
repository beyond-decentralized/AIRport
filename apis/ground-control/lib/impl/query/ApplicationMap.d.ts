import { DbEntity, ApplicationEntity_TableIndex } from "../../lingo/application/Entity";
import { ApplicationColumn_Index } from "../../lingo/application/Property";
import { Application_Index } from "../../lingo/application/Application";
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
    ensure(applicationIndex: Application_Index, tableIndex: ApplicationEntity_TableIndex, allColumns?: boolean, TableMapConstructor?: typeof TableMap): ColumnMap;
    existsByStructure(applicationIndex: Application_Index, tableIndex: ApplicationEntity_TableIndex, columnIndex: ApplicationColumn_Index): boolean;
}
//# sourceMappingURL=ApplicationMap.d.ts.map