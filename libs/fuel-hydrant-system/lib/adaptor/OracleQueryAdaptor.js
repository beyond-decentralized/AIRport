/**
 * Created by Papa on 8/27/2016.
 */
export class OracleQueryAdaptor {
    constructor(sqlValueProvider) {
        this.sqlValueProvider = sqlValueProvider;
    }
    getParameterReference(parameterReferences, newReference) {
        throw new Error(`Not implemented`);
    }
    dateToDbQuery(date) {
        let dateString = date.toJSON();
        dateString = dateString.replace('Z', '');
        return `trunc(to_timestamp_tz('${dateString}.GMT','YYYY-MM-DD"T"HH24:MI:SS.FF3.TZR'))`;
    }
    getResultArray(rawResponse) {
        throw new Error(`Not implemented - getResultArray`);
    }
    getResultCellValue(resultRow, columnName, index, dataType, defaultValue) {
        throw new Error(`Not implemented - getResultCellValue`);
    }
    getFunctionAdaptor() {
        throw new Error(`Not implemented getFunctionAdaptor`);
    }
    getOffsetFragment(offset) {
        throw new Error(`Not implemented`);
    }
    getLimitFragment(limit) {
        throw new Error(`Not implemented`);
    }
    getParameterValue(parameter) {
        throw new Error(`Not implemented`);
    }
    getValue(value) {
        throw new Error(`Not implemented`);
    }
}
//# sourceMappingURL=OracleQueryAdaptor.js.map