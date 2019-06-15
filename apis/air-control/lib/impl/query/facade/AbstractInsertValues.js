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