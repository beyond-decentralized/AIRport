"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInsertValues_1 = require("./AbstractInsertValues");
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
class InsertColumnValues extends AbstractInsertValues_1.AbstractInsertValues {
    toJSON(queryUtils, fieldUtils) {
        const entityDriver = this.rawInsertValues.insertInto.__driver__;
        const insertInto = entityDriver.getRelationJson(this.columnAliases, queryUtils, fieldUtils);
        const columnMap = entityDriver.dbEntity.columnMap;
        const dbColumns = [];
        const columnIndexes = this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map((columnName) => {
            const dbColumn = columnMap[columnName];
            this.validateColumn(dbColumn, entityDriver.dbEntity, columnName);
            dbColumns.push(dbColumn);
            return dbColumn.index;
        });
        return {
            II: insertInto,
            C: columnIndexes,
            V: this.valuesToJSON(this.rawInsertValues.values, dbColumns, queryUtils, fieldUtils)
        };
    }
}
exports.InsertColumnValues = InsertColumnValues;
//# sourceMappingURL=InsertColumnValues.js.map