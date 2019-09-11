"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 8/27/2016.
 */
class OracleQueryAdaptor {
    constructor(sqlValueProvider) {
        this.sqlValueProvider = sqlValueProvider;
    }
    getParameterReference(parameterReferences, newReference) {
        throw `Not implemented`;
    }
    dateToDbQuery(date) {
        let dateString = date.toJSON();
        dateString = dateString.replace('Z', '');
        return `trunc(to_timestamp_tz('${dateString}.GMT','YYYY-MM-DD"T"HH24:MI:SS.FF3.TZR'))`;
    }
    getResultArray(rawResponse) {
        throw `Not implemented - getResultArray`;
    }
    getResultCellValue(resultRow, columnName, index, dataType, defaultValue) {
        throw `Not implemented - getResultCellValue`;
    }
    getFunctionAdaptor() {
        throw `Not implemented getFunctionAdaptor`;
    }
    getOffsetFragment(offset) {
        throw `Not implemented`;
    }
    getLimitFragment(limit) {
        throw `Not implemented`;
    }
    getParameterValue(parameter) {
        throw `Not implemented`;
    }
    getValue(value) {
        throw `Not implemented`;
    }
}
exports.OracleQueryAdaptor = OracleQueryAdaptor;
//# sourceMappingURL=OracleQueryAdaptor.js.map