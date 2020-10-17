import { SqLiteQueryAdaptor } from "./SqLiteQueryAdaptor";
/**
 * Created by Papa on 2/8/2017.
 */
export class SqlJsQueryAdaptor extends SqLiteQueryAdaptor {
    getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue) {
        return resultRow[index];
    }
}
//# sourceMappingURL=SqlJsQueryAdaptor.js.map