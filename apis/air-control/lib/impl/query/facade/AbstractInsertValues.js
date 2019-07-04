"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../../core/field/Field");
const WrapperFunctions_1 = require("../../core/field/WrapperFunctions");
const AbstractQuery_1 = require("./AbstractQuery");
/**
 * Created by Papa on 11/17/2016.
 */
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
class AbstractInsertValues extends AbstractQuery_1.AbstractQuery {
    constructor(rawInsertValues, columnIndexes) {
        super();
        this.rawInsertValues = rawInsertValues;
        this.columnIndexes = columnIndexes;
    }
    validateColumn(dbColumn, dbEntity, columnName) {
        if (!dbColumn) {
            throw new Error(`
		Could not find column ${columnName} in entity: ${dbEntity.name}
				(table: ${dbEntity.tableConfig.name})
						`);
        }
        if (dbColumn.entity.schemaVersion.schema.index !==
            dbEntity.schemaVersion.schema.index
            || dbColumn.entity.index !== dbEntity.index) {
            const columnSchema = dbColumn.entity.schemaVersion.schema;
            const entitySchema = dbEntity.schemaVersion.schema;
            throw new Error(`Unexpected entity for column ${dbColumn.name}.
			Expecting:
				Domain: ${entitySchema.domain.name}
				Schema: ${entitySchema.name}
				Entity: ${dbEntity.name}
			Found:
				Domain: ${columnSchema.domain.name}
				Schema: ${columnSchema.name}
				Entity: ${dbColumn.entity.name}`);
        }
    }
    valuesToJSON(valueSets, dbColumns, queryUtils, fieldUtils) {
        // let currentValueIndex = -1;
        // this.values           = [];
        return valueSets.map((valueSet, rowIndex) => {
            return valueSet.map((value, columnIndex) => {
                if (value === undefined) {
                    throw `Cannot use 'undefined' in VALUES clause.`;
                }
                if (!(value instanceof Field_1.QField)) {
                    return WrapperFunctions_1.getPrimitiveValue(value, dbColumns[columnIndex], rowIndex);
                    // this.values.push(getPrimitiveValue(value));
                    // return ++currentValueIndex;
                }
                else {
                    return value.toJSON(this.columnAliases, false, queryUtils, fieldUtils);
                }
            });
        });
    }
}
exports.AbstractInsertValues = AbstractInsertValues;
//# sourceMappingURL=AbstractInsertValues.js.map