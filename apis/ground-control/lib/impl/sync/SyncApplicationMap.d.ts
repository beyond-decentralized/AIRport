import { DbEntity } from "../../lingo/application/Entity";
import { ApplicationMap } from "../query/ApplicationMap";
import { TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
export declare class SyncApplicationMap extends ApplicationMap {
    constructor(applicationMap?: {
        [applicationIndex: string]: TableMap;
    });
    ensureEntity(entity: DbEntity, allColumns?: boolean): SyncColumnMap;
    intersects(applicationMap: ApplicationMap): boolean;
}
//# sourceMappingURL=SyncApplicationMap.d.ts.map