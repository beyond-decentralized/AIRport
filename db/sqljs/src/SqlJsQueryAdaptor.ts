import {DEPENDENCY_INJECTION}                 from '@airport/direction-indicator'
import {SQL_QUERY_ADAPTOR}  from '@airport/fuel-hydrant-system'
import {SqLiteQueryAdaptor} from "@airport/sqlite";
import {SQLDataType}        from "@airport/ground-control";
/**
 * Created by Papa on 2/8/2017.
 */

export class SqlJsQueryAdaptor extends SqLiteQueryAdaptor {

	getResultCellRawValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any {
		return resultRow[index];
	}
}
DEPENDENCY_INJECTION.set(SQL_QUERY_ADAPTOR, SqlJsQueryAdaptor)
