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
        return {
            II: insertInto,
            C: this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map(column => column.dbColumn.index),
            V: this.valuesToJSON(this.rawInsertValues.values)
        };
    }
}
exports.InsertValues = InsertValues;
//# sourceMappingURL=InsertValues.js.map