import { SqLiteQueryAdaptor } from "./SqLiteQueryAdaptor";
/**
 * Created by Papa on 2/8/2017.
 */
export class WebSqlQueryAdaptor extends SqLiteQueryAdaptor {
    getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue) {
        return resultRow[columnName];
    }
}
//# sourceMappingURL=WebSqlQueryAdaptor.js.map