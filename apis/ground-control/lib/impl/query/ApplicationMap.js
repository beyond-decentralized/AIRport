import { TableMap } from "./TableMap";
export class ApplicationMap {
    constructor(applicationMap = {}) {
        this.applicationMap = applicationMap;
    }
    ensureEntity(entity, allColumns = false, TableMapConstructor = TableMap) {
        return this.ensure(entity.applicationVersion.id, entity.index, allColumns, TableMapConstructor);
    }
    ensure(applicationIndex, tableIndex, allColumns = false, TableMapConstructor = TableMap) {
        let tableMap = this.applicationMap[applicationIndex];
        if (!tableMap) {
            tableMap = new TableMapConstructor(applicationIndex);
            this.applicationMap[applicationIndex] = tableMap;
        }
        return tableMap.ensure(tableIndex, allColumns);
    }
    existsByStructure(applicationIndex, tableIndex, columnIndex) {
        let tableMap = this.applicationMap[applicationIndex];
        if (!tableMap) {
            return false;
        }
        return tableMap.existsByStructure(tableIndex, columnIndex);
    }
}
//# sourceMappingURL=ApplicationMap.js.map