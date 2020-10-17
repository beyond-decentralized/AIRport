import { SchemaMap } from "../query/SchemaMap";
import { SyncTableMap } from "./SyncTableMap";
export class SyncSchemaMap extends SchemaMap {
    constructor(schemaMap) {
        super(schemaMap);
    }
    ensureEntity(entity, allColumns = false) {
        return super.ensureEntity(entity, allColumns, SyncTableMap);
    }
    intersects(schemaMap) {
        for (const schemaIndex in this.schemaMap) {
            if (schemaMap.schemaMap[schemaIndex]) {
                const syncTableMap = new SyncTableMap(parseInt(schemaIndex), this.schemaMap[schemaIndex].tableMap);
                if (syncTableMap.intersects(schemaMap.schemaMap[schemaIndex])) {
                    return true;
                }
            }
        }
        return false;
    }
}
//# sourceMappingURL=SyncSchemaMap.js.map