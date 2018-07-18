"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInsertValues_1 = require("./AbstractInsertValues");
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
class InsertColumnValues extends AbstractInsertValues_1.AbstractInsertValues {
    toJSON() {
        const entityDriver = this.rawInsertValues.insertInto.__driver__;
        const insertInto = entityDriver.getRelationJson(this.columnAliases);
        const columnMap = entityDriver.dbEntity.columnMap;
        return {
            II: insertInto,
            C: this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map((columnName) => {
                const dbColumn = columnMap[columnName];
                if (!dbColumn) {
                    throw new Error(`
		Could not find column ${columnName} in entity: ${entityDriver.dbEntity.name}
				(table: ${entityDriver.dbEntity.tableConfig.name})
						`);
                }
                return dbColumn.index;
            }),
            V: this.valuesToJSON(this.rawInsertValues.values)
        };
    }
}
exports.InsertColumnValues = InsertColumnValues;
//# sourceMappingURL=InsertColumnValues.js.map