"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInsertValues_1 = require("./AbstractInsertValues");
/**
 * Created by Papa on 11/17/2016.
 */
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
class InsertValues extends AbstractInsertValues_1.AbstractInsertValues {
    toJSON() {
        const insertInto = this.rawInsertValues.insertInto
            .__driver__.getRelationJson(this.columnAliases);
        const dbColumns = [];
        const columnIndexes = this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map(column => {
            const dbColumn = column.dbColumn;
            dbColumns.push(dbColumn);
            return dbColumn.index;
        });
        return {
            II: insertInto,
            C: columnIndexes,
            V: this.valuesToJSON(this.rawInsertValues.values, dbColumns)
        };
    }
}
exports.InsertValues = InsertValues;
//# sourceMappingURL=InsertValues.js.map