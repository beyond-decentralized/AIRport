import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { IQStringField } from "../../../definition/core/field/StringField";
import { IStringOperation, JSONRawStringOperation } from "../../../definition/core/operation/StringOperation";
import { RawFieldQuery } from "../../../definition/query/facade/FieldQuery";
import { ValueOperation } from "./ValueOperation";

/**
 * Created by Papa on 6/20/2016.
 */

export class StringOperation
	extends ValueOperation<string, JSONRawStringOperation, IQStringField>
	implements IStringOperation {

	constructor() {
		super(OperationCategory.STRING);
	}

	LIKE(
		lValue: IQStringField,
		rValue: string | IQStringField | RawFieldQuery<IQStringField>
		// TODO: implement ReqExp
		//| RegExp
	): JSONRawStringOperation {
		return {
			c: this.category,
			l: lValue,
			o: SqlOperator.LIKE,
			r: rValue
		};
	}

}
