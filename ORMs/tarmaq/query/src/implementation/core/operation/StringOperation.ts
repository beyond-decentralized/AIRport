import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { IQStringField } from "../../../definition/core/field/IQStringField";
import { IStringOperation, RawStringOperation } from "../../../definition/core/operation/IStringOperation";
import { RawFieldQuery } from "../../../definition/query/facade/RawFieldQuery";
import { ValueOperation } from "./ValueOperation";

/**
 * Created by Papa on 6/20/2016.
 */

export class StringOperation
	extends ValueOperation<string, RawStringOperation, IQStringField>
	implements IStringOperation {

	constructor() {
		super(OperationCategory.STRING);
	}

	LIKE(
		lValue: IQStringField,
		rValue: string | IQStringField | RawFieldQuery<IQStringField>
		// TODO: implement ReqExp
		//| RegExp
	): RawStringOperation {
		return {
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.LIKE,
			rightSideValue: rValue
		};
	}

}
