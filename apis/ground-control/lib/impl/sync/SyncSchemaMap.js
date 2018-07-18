"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaMap_1 = require("../query/SchemaMap");
const SyncTableMap_1 = require("./SyncTableMap");
class SyncSchemaMap extends SchemaMap_1.SchemaMap {
    constructor(schemaMap) {
        super(schemaMap);
    }
    ensureEntity(entity, allColumns = false) {
        return super.ensureEntity(entity, allColumns, SyncTableMap_1.SyncTableMap);
    }
    intersects(schemaMap) {
        for (const schemaIndex in this.schemaMap) {
            if (schemaMap.schemaMap[schemaIndex]) {
                const syncTableMap = new SyncTableMap_1.SyncTableMap(parseInt(schemaIndex), this.schemaMap[schemaIndex].tableMap);
                if (syncTableMap.intersects(schemaMap.schemaMap[schemaIndex])) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.SyncSchemaMap = SyncSchemaMap;
//# sourceMappingURL=SyncSchemaMap.js.map