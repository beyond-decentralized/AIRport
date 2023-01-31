import {OperationCategory,} from "@airport/ground-control";
import {IQBooleanField}     from "../../../definition/core/field/IQBooleanField";
import {
	IBooleanOperation,
	RawBooleanOperation
}                           from "../../../definition/core/operation/IBooleanOperation";
import {ValueOperation}     from "./ValueOperation";

/**
 * Created by Papa on 6/20/2016.
 */

export class BooleanOperation
	extends ValueOperation<boolean, RawBooleanOperation, IQBooleanField> implements IBooleanOperation {

	constructor() {
		super(OperationCategory.BOOLEAN);
	}

}