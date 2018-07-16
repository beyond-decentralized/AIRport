import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { IQUntypedField } from "../../../lingo/core/field/UntypedField";
import { IUntypedOperation, JSONRawUntypedOperation } from "../../../lingo/core/operation/UntypedOperation";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { ValueOperation } from "./Operation";

/**
 * Created by papa on 7/13/17.
 */

export class UntypedOperation extends ValueOperation<number | string, JSONRawUntypedOperation, IQUntypedField>
	implements IUntypedOperation {

	constructor() {
		super(OperationCategory.UNTYPED);
	}

	like(
		lValue: IQUntypedField,
		rValue: string | IQUntypedField | RawFieldQuery<IQUntypedField>
		// TODO: implement ReqExp
		//| RegExp
	): JSONRawUntypedOperation {
		return {
			c: this.category,
			l: lValue,
			o: SqlOperator.LIKE,
			r: rValue
		};
	}

}
