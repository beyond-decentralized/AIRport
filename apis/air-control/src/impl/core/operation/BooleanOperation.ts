import {OperationCategory,} from "@airport/ground-control";
import {IQBooleanField}     from "../../../lingo/core/field/BooleanField";
import {
	IBooleanOperation,
	JSONRawBooleanOperation
}                           from "../../../lingo/core/operation/BooleanOperation";
import {ValueOperation}     from "./Operation";

/**
 * Created by Papa on 6/20/2016.
 */

export class BooleanOperation
	extends ValueOperation<boolean, JSONRawBooleanOperation, IQBooleanField> implements IBooleanOperation {

	constructor() {
		super(OperationCategory.BOOLEAN);
	}

}