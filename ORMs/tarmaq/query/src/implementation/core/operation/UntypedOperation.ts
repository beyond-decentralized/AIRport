import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { IQUntypedField } from "../../../definition/core/field/IQUntypedField";
import { IUntypedOperation, RawUntypedOperation } from "../../../definition/core/operation/IUntypedOperation";
import { RawFieldQuery } from "../../../definition/query/facade/RawFieldQuery";
import { ValueOperation } from "./ValueOperation";

/**
 * Created by papa on 7/13/17.
 */

export class UntypedOperation extends ValueOperation<number | string, RawUntypedOperation, IQUntypedField>
	implements IUntypedOperation {

	constructor() {
		super(OperationCategory.UNTYPED);
	}

	LIKE(
		lValue: IQUntypedField,
		rValue: string | IQUntypedField | RawFieldQuery<IQUntypedField>
		// TODO: implement ReqExp
		//| RegExp
	): RawUntypedOperation {
		return {
			c: this.category,
			l: lValue,
			o: SqlOperator.LIKE,
			r: rValue
		};
	}

}
