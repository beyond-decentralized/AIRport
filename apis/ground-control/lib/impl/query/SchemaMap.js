import { TableMap } from "./TableMap";
export class SchemaMap {
    constructor(schemaMap = {}) {
        this.schemaMap = schemaMap;
    }
    ensureEntity(entity, allColumns = false, TableMapConstructor = TableMap) {
        return this.ensure(entity.schemaVersion.id, entity.index, allColumns, TableMapConstructor);
    }
    ensure(schemaIndex, tableIndex, allColumns = false, TableMapConstructor = TableMap) {
        let tableMap = this.schemaMap[schemaIndex];
        if (!tableMap) {
            tableMap = new TableMapConstructor(schemaIndex);
            this.schemaMap[schemaIndex] = tableMap;
        }
        return tableMap.ensure(tableIndex, allColumns);
    }
    existsByStructure(schemaIndex, tableIndex, columnIndex) {
        let tableMap = this.schemaMap[schemaIndex];
        if (!tableMap) {
            return false;
        }
        return tableMap.existsByStructure(tableIndex, columnIndex);
    }
}
//# sourceMappingURL=SchemaMap.js.map