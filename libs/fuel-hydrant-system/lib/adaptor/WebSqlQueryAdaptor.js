"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SqLiteQueryAdaptor_1 = require("./SqLiteQueryAdaptor");
/**
 * Created by Papa on 2/8/2017.
 */
class WebSqlQueryAdaptor extends SqLiteQueryAdaptor_1.SqLiteQueryAdaptor {
    getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue) {
        return resultRow[columnName];
    }
}
exports.WebSqlQueryAdaptor = WebSqlQueryAdaptor;
//# sourceMappingURL=WebSqlQueryAdaptor.js.map