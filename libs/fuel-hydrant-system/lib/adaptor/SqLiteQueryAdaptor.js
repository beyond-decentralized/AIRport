"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const SQLQueryAdaptor_1 = require("./SQLQueryAdaptor");
/**
 * Created by Papa on 8/27/2016.
 */
class SqLiteQueryAdaptor {
    constructor(sqlValueProvider) {
        this.sqlValueProvider = sqlValueProvider;
        this.functionAdaptor = new SqlLiteFunctionAdaptor(sqlValueProvider);
    }
    getParameterReference(parameterReferences, newReference) {
        return '?';
    }
    dateToDbQuery(date) {
        let milliseconds = date.getTime();
        return '' + milliseconds;
    }
    getResultArray(rawResponse) {
        return rawResponse.res.rows;
    }
    getResultCellValue(resultRow, columnName, index, dataType, defaultValue) {
        let value = this.getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue);
        switch (dataType) {
            case ground_control_1.SQLDataType.BOOLEAN:
                if (value !== null) {
                    return !!value;
                }
            case ground_control_1.SQLDataType.DATE:
                if (value !== null) {
                    return new Date(value);
                }
        }
        return value;
    }
    getFunctionAdaptor() {
        return this.functionAdaptor;
    }
    getOffsetFragment(offset) {
        return `
OFFSET
	${offset}`;
    }
    getLimitFragment(limit) {
        return `
LIMIT
	${limit}`;
    }
    getParameterValue(parameter) {
        return this.getValue(parameter.value);
    }
    getValue(value) {
        switch (typeof value) {
            case 'boolean':
                return value ? '1' : '0';
            case 'number':
            case 'string':
                return value;
            case 'object':
                if (value instanceof Date) {
                    return value.getTime();
                }
                throw `Unexpected object as a parameter.`;
            default:
                throw `Unexpected type of parameter '${typeof value}.'`;
        }
    }
}
exports.SqLiteQueryAdaptor = SqLiteQueryAdaptor;
class SqlLiteFunctionAdaptor extends SQLQueryAdaptor_1.AbstractFunctionAdaptor {
    constructor(sqlValueProvider) {
        super(sqlValueProvider);
        this.sqlValueProvider = sqlValueProvider;
    }
    getFunctionCall(jsonFunctionCall, value, qEntityMapByAlias, airDb, schemaUtils, metadataUtils) {
        switch (jsonFunctionCall.ft) {
            case ground_control_1.SqlFunction.ABS:
                return `ABS(${value})`;
            case ground_control_1.SqlFunction.AVG:
                return `AVG(${value})`;
            case ground_control_1.SqlFunction.COUNT:
                return `COUNT(${value})`;
            case ground_control_1.SqlFunction.MAX:
                return `MAX(${value})`;
            case ground_control_1.SqlFunction.MIN:
                return `MIN(${value})`;
            case ground_control_1.SqlFunction.SUM:
                return `SUM(${value})`;
            case ground_control_1.SqlFunction.UCASE:
                return `UPPER(${value})`;
            case ground_control_1.SqlFunction.LCASE:
                return `LOWER(${value})`;
            case ground_control_1.SqlFunction.MID:
                let start = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils);
                let length = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[1], airDb, schemaUtils, metadataUtils);
                return `SUBSTR(${value}, ${start}, ${length})`;
            case ground_control_1.SqlFunction.LEN:
                return `LENGTH(${value})`;
            case ground_control_1.SqlFunction.ROUND:
                let digits = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils);
                return `ROUND(${value}, ${digits})`;
            case ground_control_1.SqlFunction.NOW:
                return `DATE('now')`;
            case ground_control_1.SqlFunction.FORMAT:
                let formatCall = `FORMAT('${value}', `;
                for (let i = 0; i < jsonFunctionCall.p.length; i++) {
                    let formatParam = jsonFunctionCall.p[i];
                    formatParam = this.sqlValueProvider.getFunctionCallValue(formatParam, airDb, schemaUtils, metadataUtils);
                    formatCall = `${formatCall}, ${formatParam}`;
                }
                formatCall += ')';
                return formatCall;
            case ground_control_1.SqlFunction.REPLACE:
                let param1 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils);
                let param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[1], airDb, schemaUtils, metadataUtils);
                return `REPLACE('${value}', ${param1}, ${param2})`;
            case ground_control_1.SqlFunction.TRIM:
                return `TRIM(${value})`;
            case ground_control_1.SqlFunction.DISTINCT:
                throw `Invalid placement of a distinct function`;
            case ground_control_1.SqlFunction.EXISTS:
                throw `Invalid placement of an exists function`;
            case ground_control_1.SqlFunction.DIVIDE:
                param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils);
                return `${value} / ${param2}`;
            case ground_control_1.SqlFunction.MINUS:
                param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils);
                return `${value} - ${param2}`;
            case ground_control_1.SqlFunction.MULTIPLY:
                param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils);
                return `${value} * ${param2}`;
            case ground_control_1.SqlFunction.PLUS:
                param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils);
                return `${value} + ${param2}`;
            case ground_control_1.SqlFunction.CONCATENATE:
                return jsonFunctionCall.p.reduce((acc, val) => {
                    let primitiveValue = this.toString(this.sqlValueProvider.getFunctionCallValue(val, airDb, schemaUtils, metadataUtils));
                    return acc + val;
                }, this.toString(value));
            default:
                throw `Unknown function type: ${jsonFunctionCall.ft}`;
        }
    }
    toString(val) {
        switch (typeof val) {
            case 'string':
                return val;
            case 'boolean':
            case 'number':
                return val.toString();
            case 'undefined':
                return 'null';
            case 'object':
                if (val === null) {
                    return 'null';
                }
                if (val instanceof Date) {
                    return val.toJSON();
                }
                throw `Unsupported value for conversion to string.`;
            default:
                throw `Unsupported value for conversion to string.`;
        }
    }
}
exports.SqlLiteFunctionAdaptor = SqlLiteFunctionAdaptor;
//# sourceMappingURL=SqLiteQueryAdaptor.js.map