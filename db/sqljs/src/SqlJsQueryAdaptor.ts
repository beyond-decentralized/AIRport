import {SqLiteQueryAdaptor} from "@airport/sqlite";
import {SQLDataType}        from "@airport/ground-control";
import { Injected } from "@airport/air-control";
/**
 * Created by Papa on 2/8/2017.
 */
@Injected()
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
