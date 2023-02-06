import { IDependencyInjectionToken, InversionOfControl } from "@airport/direction-indicator";
import { Dictionary, OperationCategory, Repository_GUID, Repository_LocalId, SqlOperator } from "@airport/ground-control";
import { IQOperableField } from "../../../definition/core/field/IQOperableField";
import { IValueOperation, RawValueOperation } from "../../../definition/core/operation/IValueOperation";
import { RawFieldQuery } from "../../../definition/query/facade/RawFieldQuery";
import { Operation } from "./Operation";

export abstract class ValueOperation<T extends boolean | string | number | Date,
	JRO extends RawValueOperation<IQF>,
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
		const rawValueOperation = <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.EQUALS,
			rightSideValue: rValue
		};

		this.addTrackedRepoIDs(
			lValue,
			rValue,
			rawValueOperation
		)

		return rawValueOperation
	}

	private addTrackedRepoIDs(
		lValue: IQF,
		rValue: T | T[] | IQF | RawFieldQuery<IQF>,
		rawValueOperation: JRO
	): void {
		const dictionary = (globalThis.IOC as InversionOfControl)
			.getSync(globalThis.DICTIONARY as IDependencyInjectionToken<Dictionary>)

		if (dictionary.isRepositoryGUIDProperty(lValue.dbProperty)) {
			let trackedRepoGUIDs: Repository_GUID[]
			if (typeof rValue === 'string') {
				trackedRepoGUIDs = [rValue]
			} else if (rValue instanceof Array) {
				trackedRepoGUIDs = rValue as string[]
			}
			rawValueOperation.trackedRepoGUIDs = trackedRepoGUIDs
		} else if (dictionary.isRepositoryLIDColumn(lValue.dbProperty, lValue.dbColumn)) {
			let trackedRepoLIDs: Repository_LocalId[]
			if (typeof rValue === 'number') {
				trackedRepoLIDs = [rValue]
			} else if (rValue instanceof Array) {
				trackedRepoLIDs = rValue as number[]
			}
			rawValueOperation.trackedRepoLocalIds = trackedRepoLIDs
		}
	}

	greaterThan(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.GREATER_THAN,
			rightSideValue: rValue
		};
	}

	greaterThanOrEquals(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.GREATER_THAN_OR_EQUALS,
			rightSideValue: rValue
		};
	}

	IS_NOT_NULL(lValue: IQF): JRO {
		return <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.IS_NOT_NULL
		};
	}

	IS_NULL(
		lValue: IQF
	): JRO {
		return <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.IS_NULL
		};
	}

	IN(
		lValue: IQF,
		rValue: T[] | IQF | RawFieldQuery<IQF>
	): JRO {
		const rawValueOperation = <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.IN,
			rightSideValue: rValue
		};

		this.addTrackedRepoIDs(
			lValue,
			rValue,
			rawValueOperation
		)

		return rawValueOperation
	}

	lessThan(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.LESS_THAN,
			rightSideValue: rValue
		};
	}

	lessThanOrEquals(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.LESS_THAN_OR_EQUALS,
			rightSideValue: rValue
		};
	}

	notEquals(
		lValue: IQF,
		rValue: T | IQF | RawFieldQuery<IQF>
	): JRO {
		return <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.NOT_EQUALS,
			rightSideValue: lValue
		};
	}

	NOT_IN(
		lValue: IQF,
		rValue: (T | IQF | RawFieldQuery<IQF>)[]
	): JRO {
		return <JRO>{
			operationCategory: this.category,
			leftSideValue: lValue,
			operator: SqlOperator.NOT_IN,
			rightSideValue: rValue
		};
	}

}
