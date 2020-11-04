import { DI } from '@airport/di';
import { SQL_QUERY_ADAPTOR } from '@airport/fuel-hydrant-system';
import { SqLiteQueryAdaptor } from "@airport/sqlite";
/**
 * Created by Papa on 2/8/2017.
 */
export class SqlJsQueryAdaptor extends SqLiteQueryAdaptor {
    getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue) {
        return resultRow[index];
    }
}
DI.set(SQL_QUERY_ADAPTOR, SqlJsQueryAdaptor);
//# sourceMappingURL=SqlJsQueryAdaptor.js.map