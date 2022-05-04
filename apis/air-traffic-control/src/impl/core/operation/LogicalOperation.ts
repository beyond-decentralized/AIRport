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
} from "../../../lingo/core/operation/LogicalOperation";
import {IOperation} from "../../../lingo/core/operation/Operation";
import {Operation} from "./Operation";

/**
 * Created by Papa on 4/21/2016.
 */

export const and: andOperator = function (
	...ops: JSONBaseOperation[]
): JSONLogicalOperation {
	return new LogicalOperation().and(ops);
};

export const or: orOperator = function (
	...ops: JSONBaseOperation[]
): JSONLogicalOperation {
	return new LogicalOperation().or(ops);
};

export const not: notOperator = function (
	op: JSONBaseOperation
): JSONLogicalOperation {
	return new LogicalOperation().not(op);
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

	and(
		ops: JSONBaseOperation[]
	): JSONLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.AND,
			v: ops
		};
	}

	or(
		ops: JSONBaseOperation[]
	): JSONLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.OR,
			v: ops
		};
	}

	not(
		op: JSONBaseOperation
	): JSONLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.NOT,
			v: op
		};
	}

}
