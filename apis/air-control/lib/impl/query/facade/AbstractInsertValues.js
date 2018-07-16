import { QField } from "../../core/field/Field";
import { getPrimitiveValue } from "../../core/field/WrapperFunctions";
import { AbstractQuery } from "./AbstractQuery";
/**
 * Created by Papa on 11/17/2016.
 */
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class AbstractInsertValues extends AbstractQuery {
    constructor(rawInsertValues, columnIndexes) {
        super();
        this.rawInsertValues = rawInsertValues;
        this.columnIndexes = columnIndexes;
    }
    valuesToJSON(valueSets) {
        let currentValueIndex = -1;
        this.values = [];
        return valueSets.map((valueSet) => {
            return valueSet.map((value) => {
                if (value === undefined) {
                    throw `Cannot use 'undefined' in VALUES clause.`;
                }
                if (!(value instanceof QField)) {
                    this.values.push(getPrimitiveValue(value));
                    return ++currentValueIndex;
                }
                else {
                    return value.toJSON(this.columnAliases, false);
                }
            });
        });
    }
}
//# sourceMappingURL=AbstractInsertValues.js.map