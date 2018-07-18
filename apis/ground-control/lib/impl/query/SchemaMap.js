"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableMap_1 = require("./TableMap");
class SchemaMap {
    constructor(schemaMap = {}) {
        this.schemaMap = schemaMap;
    }
    ensureEntity(entity, allColumns = false, TableMapConstructor = TableMap_1.TableMap) {
        return this.ensure(entity.schemaVersion.id, entity.index, allColumns, TableMapConstructor);
    }
    ensure(schemaVersionId, tableIndex, allColumns = false, TableMapConstructor = TableMap_1.TableMap) {
        let tableMap = this.schemaMap[schemaVersionId];
        if (!tableMap) {
            tableMap = new TableMapConstructor(schemaVersionId);
            this.schemaMap[schemaVersionId] = tableMap;
        }
        return tableMap.ensure(tableIndex, allColumns);
    }
    existsByStructure(schemaVersionId, tableIndex, columnIndex) {
        let tableMap = this.schemaMap[schemaVersionId];
        if (!tableMap) {
            return false;
        }
        return tableMap.existsByStructure(tableIndex, columnIndex);
    }
}
exports.SchemaMap = SchemaMap;
//# sourceMappingURL=SchemaMap.js.map