"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnMap_1 = require("../query/ColumnMap");
class SyncColumnMap extends ColumnMap_1.ColumnMap {
    constructor(tableIndex, allColumns = false) {
        super(tableIndex, allColumns);
    }
}
exports.SyncColumnMap = SyncColumnMap;
//# sourceMappingURL=SyncColumnMap.js.map