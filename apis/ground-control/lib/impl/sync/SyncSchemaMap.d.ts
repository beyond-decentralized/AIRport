import { DbEntity } from "../../lingo/schema/Entity";
import { SchemaMap } from "../query/SchemaMap";
import { TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
export declare class SyncSchemaMap extends SchemaMap {
    constructor(schemaMap?: {
        [schemaIndex: string]: TableMap;
    });
    ensureEntity(entity: DbEntity, allColumns?: boolean): SyncColumnMap;
    intersects(schemaMap: SchemaMap): boolean;
}
//# sourceMappingURL=SyncSchemaMap.d.ts.map