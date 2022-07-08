import {OperationCategory} from "@airport/ground-control";
import {IQNumberField}     from "../../../definition/core/field/NumberField";
import {
	INumberOperation,
	JSONRawNumberOperation
}                          from "../../../definition/core/operation/NumberOperation";
import {ValueOperation}    from "./Operation";

/**
 * Created by Papa on 6/20/2016.
 */

export class NumberOperation
	extends ValueOperation<number, JSONRawNumberOperation, IQNumberField> implements INumberOperation {

	constructor() {
		super(OperationCategory.NUMBER);
	}

}