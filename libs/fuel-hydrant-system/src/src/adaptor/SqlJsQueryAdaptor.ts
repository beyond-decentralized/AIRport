import {SqLiteQueryAdaptor} from "./SqLiteQueryAdaptor";
import {SQLDataType}        from "../../../../apis/ground-control/lib/index";
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