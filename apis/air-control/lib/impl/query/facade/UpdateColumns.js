"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WrapperFunctions_1 = require("../../core/field/WrapperFunctions");
const AbstractUpdate_1 = require("./AbstractUpdate");
class UpdateColumns extends AbstractUpdate_1.AbstractUpdate {
    constructor(rawUpdate) {
        super(rawUpdate);
    }
    setToJSON(set, queryUtils, fieldUtils) {
        const setClause = {};
        const dbEntity = this.rawUpdate.update.__driver__.dbEntity;
        const dbColumnMap = dbEntity.columnMap;
        const idDbColumnMap = dbEntity.idColumnMap;
        for (const columnName in set) {
            let value = set[columnName];
            if (value === undefined) {
                delete set[columnName];
                continue;
            }
            if (!dbColumnMap[columnName]) {
                throw new Error(`
	Unknown column: '${columnName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            if (idDbColumnMap[columnName]) {
                throw new Error(`
	Cannot update @Id columns:
	Column: '${columnName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            value = WrapperFunctions_1.wrapPrimitive(value);
            if (!value.toJSON) {
                throw `Unexpected value ${JSON.stringify(value)} for property ${columnName} of entity ${this.rawUpdate.update.__driver__.dbEntity.name}`;
            }
            setClause[columnName] = value.toJSON(this.columnAliases, false, queryUtils, fieldUtils);
        }
        return setClause;
    }
}
exports.UpdateColumns = UpdateColumns;
//# sourceMappingURL=UpdateColumns.js.map