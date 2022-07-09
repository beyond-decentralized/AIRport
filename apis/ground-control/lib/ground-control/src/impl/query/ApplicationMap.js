import { TableMap } from "./TableMap";
export class ApplicationMap {
    constructor(applicationMap = {}) {
        this.applicationMap = applicationMap;
    }
    ensureEntity(entity, allColumns = false, TableMapConstructor = TableMap) {
        return this.ensure(entity.applicationVersion._localId, entity.index, allColumns, TableMapConstructor);
    }
    ensure(applicationVersionLocalId, tableIndex, allColumns = false, TableMapConstructor = TableMap) {
        let tableMap = this.applicationMap[applicationVersionLocalId];
        if (!tableMap) {
            tableMap = new TableMapConstructor(applicationVersionLocalId);
            this.applicationMap[applicationVersionLocalId] = tableMap;
        }
        return tableMap.ensure(tableIndex, allColumns);
    }
    existsByStructure(applicationVersionLocalId, tableIndex, columnIndex) {
        let tableMap = this.applicationMap[applicationVersionLocalId];
        if (!tableMap) {
            return false;
        }
        return tableMap.existsByStructure(tableIndex, columnIndex);
    }
}
//# sourceMappingURL=ApplicationMap.js.map