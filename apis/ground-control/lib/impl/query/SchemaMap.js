import { TableMap } from "./TableMap";
export class SchemaMap {
    constructor(schemaMap = {}) {
        this.schemaMap = schemaMap;
    }
    ensureEntity(entity, allColumns = false, TableMapConstructor = TableMap) {
        return this.ensure(entity.schemaVersion.id, entity.index, allColumns, TableMapConstructor);
    }
    ensure(schemaVersionId, tableIndex, allColumns = false, TableMapConstructor = TableMap) {
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
//# sourceMappingURL=SchemaMap.js.map