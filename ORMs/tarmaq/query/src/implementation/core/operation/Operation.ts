import { OperationCategory } from "@airport/ground-control";
import {
	IOperation
} from "../../../definition/core/operation/IValueOperation";

/**
 * Created by Papa on 4/21/2016.
 */

export abstract class Operation implements IOperation {

	constructor(
		public category: OperationCategory
	) {
	}

}

