import {SqLiteQueryAdaptor} from "./SqLiteQueryAdaptor";
import {SQLDataType} from "@airport/ground-control";
/**
 * Created by Papa on 2/8/2017.
 */

export class WebSqlQueryAdaptor extends SqLiteQueryAdaptor {

	getResultCellRawValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any {
		return resultRow[columnName];
	}

}