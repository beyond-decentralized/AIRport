import { IDependencyInjectionToken, InversionOfControl } from "@airport/direction-indicator";
import { Dictionary, OperationCategory, Repository_GUID, Repository_LocalId, SqlOperator } from "@airport/ground-control";
import { IQOperableField } from "../../../definition/core/field/IQOperableField";
import {
	IOperation,
	IValueOperation,
	RawValueOperation
} from "../../../definition/core/operation/IValueOperation";
import { RawFieldQuery } from "../../../definition/query/facade/RawFieldQuery";

/**
 * Created by Papa on 4/21/2016.
 */

export abstract class Operation implements IOperation {

	constructor(
		public category: OperationCategory
	) {
	}

}

