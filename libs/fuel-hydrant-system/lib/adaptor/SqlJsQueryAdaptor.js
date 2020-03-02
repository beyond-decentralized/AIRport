"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SqLiteQueryAdaptor_1 = require("./SqLiteQueryAdaptor");
/**
 * Created by Papa on 2/8/2017.
 */
class SqlJsQueryAdaptor extends SqLiteQueryAdaptor_1.SqLiteQueryAdaptor {
    getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue) {
        return resultRow[index];
    }
}
exports.SqlJsQueryAdaptor = SqlJsQueryAdaptor;
//# sourceMappingURL=SqlJsQueryAdaptor.js.map