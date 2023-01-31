import { OperationCategory } from "@airport/ground-control";
import { IQDateField } from "../../../definition/core/field/IQDateField";
import { IDateOperation, RawDateOperation } from "../../../definition/core/operation/IDateOperation";
import { ValueOperation } from "./ValueOperation";

/**
 * Created by Papa on 6/20/2016.
 */

export class DateOperation
	extends ValueOperation<Date, RawDateOperation, IQDateField> implements IDateOperation {

	constructor() {
		super(OperationCategory.DATE);
	}

}