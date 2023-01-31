import { OperationCategory } from "@airport/ground-control";
import { IQDateField } from "../../../definition/core/field/DateField";
import { IDateOperation, JSONRawDateOperation } from "../../../definition/core/operation/DateOperation";
import { ValueOperation } from "./ValueOperation";

/**
 * Created by Papa on 6/20/2016.
 */

export class DateOperation
	extends ValueOperation<Date, JSONRawDateOperation, IQDateField> implements IDateOperation {

	constructor() {
		super(OperationCategory.DATE);
	}

}