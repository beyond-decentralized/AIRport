import {
	JSONBaseOperation,
	OperationCategory,
	SqlOperator
} from "@airport/ground-control";
import {
	andOperator,
	ILogicalOperation,
	JSONLogicalOperation,
	notOperator,
	orOperator
} from "../../../definition/core/operation/LogicalOperation";
import {IOperation} from "../../../definition/core/operation/Operation";
import {Operation} from "./Operation";

/**
 * Created by Papa on 4/21/2016.
 */

export const AND: andOperator = function (
	...ops: JSONBaseOperation[]
): JSONLogicalOperation {
	return new LogicalOperation().AND(ops);
};

export const OR: orOperator = function (
	...ops: JSONBaseOperation[]
): JSONLogicalOperation {
	return new LogicalOperation().OR(ops);
};

export const NOT: notOperator = function (
	op: JSONBaseOperation
): JSONLogicalOperation {
	return new LogicalOperation().NOT(op);
};

export class LogicalOperation extends Operation implements ILogicalOperation {

	constructor() {
		super(null);
	}

	static verifyChildOps(
		ops: IOperation[]
	): void {
		if (!ops || !ops.length) {
			throw new Error(`No child operations provided`)
		}
	}

	AND(
		ops: JSONBaseOperation[]
	): JSONLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.AND,
			v: ops
		};
	}

	OR(
		ops: JSONBaseOperation[]
	): JSONLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.OR,
			v: ops
		};
	}

	NOT(
		op: JSONBaseOperation
	): JSONLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.NOT,
			v: op
		};
	}

}
