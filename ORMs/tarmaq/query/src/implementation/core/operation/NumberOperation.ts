import {OperationCategory} from "@airport/ground-control";
import {IQNumberField}     from "../../../definition/core/field/IQNumberField";
import {
	INumberOperation,
	RawNumberOperation
}                          from "../../../definition/core/operation/INumberOperation";
import {ValueOperation}    from "./ValueOperation";

/**
 * Created by Papa on 6/20/2016.
 */

export class NumberOperation
	extends ValueOperation<number, RawNumberOperation, IQNumberField> implements INumberOperation {

	constructor() {
		super(OperationCategory.NUMBER);
	}

}