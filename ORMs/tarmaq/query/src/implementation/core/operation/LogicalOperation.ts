import {
	QueryBaseOperation,
	OperationCategory,
	SqlOperator
} from "@airport/ground-control";
import {
	andOperator,
	ILogicalOperation,
	QueryLogicalOperation,
	notOperator,
	orOperator
} from "../../../definition/core/operation/ILogicalOperation";
import {IOperation} from "../../../definition/core/operation/IValueOperation";
import {Operation} from "./Operation";

/**
 * Created by Papa on 4/21/2016.
 */

export const AND: andOperator = function (
	...ops: QueryBaseOperation[]
): QueryLogicalOperation {
	return new LogicalOperation().AND(ops);
};

export const OR: orOperator = function (
	...ops: QueryBaseOperation[]
): QueryLogicalOperation {
	return new LogicalOperation().OR(ops);
};

export const NOT: notOperator = function (
	op: QueryBaseOperation
): QueryLogicalOperation {
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
		ops: QueryBaseOperation[]
	): QueryLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.AND,
			v: ops
		};
	}

	OR(
		ops: QueryBaseOperation[]
	): QueryLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.OR,
			v: ops
		};
	}

	NOT(
		op: QueryBaseOperation
	): QueryLogicalOperation {
		return {
			c: OperationCategory.LOGICAL,
			o: SqlOperator.NOT,
			v: op
		};
	}

}
