import {OperationCategory, SqlOperator} from "@airport/ground-control";
import {IQOperableField} from "../../../definition/core/field/OperableField";
import {
	IOperation,
	IValueOperation,
	JSONRawValueOperation
} from "../../../definition/core/operation/Operation";
import {RawFieldQuery} from "../../../definition/query/facade/FieldQuery";

/**
 * Created by Papa on 4/21/2016.
 */

export abstract class Operation implements IOperation {

	constructor(
		public category: OperationCategory
	) {
	}

}

export abstract class ValueOperation<T extends boolean | string | number | Date,
	JRO extends JSONRawValueOperation<IQF>,
	IQF extends IQOperableField<any, any, any, any>>
	extends Operation
	implements IValueOperation<T, JRO, IQF> {

	constructor(
		public category: OperationCategory
	) {
		super(category);
	}

	equals(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO> {
			c: this.category,
			l: lValue,
			o: SqlOperator.EQUALS,
			r: rValue
		};
	}

	greaterThan(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.GREATER_THAN,
			r: rValue
		};
	}

	greaterThanOrEquals(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.GREATER_THAN_OR_EQUALS,
			r: rValue
		};
	}

	IS_NOT_NULL(lValue: IQF): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.IS_NOT_NULL
		};
	}

	IS_NULL(
		lValue: IQF
	): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.IS_NULL
		};
	}

	IN(
		lValue: IQF,
		rValue: T[] | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.IN,
			r: rValue
		};
	}

	lessThan(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.LESS_THAN,
			r: rValue
		};
	}

	lessThanOrEquals(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.LESS_THAN_OR_EQUALS,
			r: rValue
		};
	}

	notEquals(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.NOT_EQUALS,
			r: lValue
		};
	}

	NOT_IN(
		lValue: IQF,
		rValue: (T | IQF | RawFieldQuery<IQF>)[]
	): JRO {
		return <JRO>{
			c: this.category,
			l: lValue,
			o: SqlOperator.NOT_IN,
			r: rValue
		};
	}

}