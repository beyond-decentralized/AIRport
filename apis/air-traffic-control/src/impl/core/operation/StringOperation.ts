import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { IQStringField } from "../../../lingo/core/field/StringField";
import { IStringOperation, JSONRawStringOperation } from "../../../lingo/core/operation/StringOperation";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { ValueOperation } from "./Operation";

/**
 * Created by Papa on 6/20/2016.
 */

export class StringOperation
	extends ValueOperation<string, JSONRawStringOperation, IQStringField>
	implements IStringOperation {

	constructor() {
		super(OperationCategory.STRING);
	}

	like(
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
