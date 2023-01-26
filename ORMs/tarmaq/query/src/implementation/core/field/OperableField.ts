import { IOC } from "@airport/direction-indicator";
import {
	DbColumn,
	DbProperty,
	JSONClauseObjectType
} from "@airport/ground-control";
import { IQEntityInternal } from "../../../definition/core/entity/Entity";
import { IQOperableField, IQOperableFieldInternal } from "../../../definition/core/field/OperableField";
import {
	IValueOperation,
	JSONRawValueOperation
} from "../../../definition/core/operation/Operation";
import { RawFieldQuery } from "../../../definition/query/facade/FieldQuery";
import { QField } from "./Field";

/**
 * Created by Papa on 10/25/2016.
 */

export abstract class QOperableField<T,
	JO extends JSONRawValueOperation<IQF>,
	IO extends IValueOperation<T, JO, IQF>,
	IQF extends IQOperableField<T, JO, IO, IQF>>
	extends QField<IQF>
	implements IQOperableFieldInternal<T, JO, IO, IQF> {

	private dictionaryToken =
		globalThis.AIRPORT_DOMAIN
			.app('ground-control').token('Dictionary')

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		objectType: JSONClauseObjectType,
		public operation: IO,
	) {
		super(dbColumn, dbProperty, q, objectType);
	}

	equals(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO {
		if (value instanceof Function) {
			value = value();
		}
		let trackedRepoGUID = undefined
		if (typeof value === 'string') {
			if (globalThis.IOC.getSync(this.dictionaryToken).isRepositoryGUIDProperty(
				this.dbProperty)) {
				trackedRepoGUID = value
			}
		}
		return this.operation.equals(<any>this, value, trackedRepoGUID);
	}

	greaterThan(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO {
		if (value instanceof Function) {
			value = value();
		}
		return this.operation.greaterThan(<any>this, value);
	}

	greaterThanOrEquals(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO {
		if (value instanceof Function) {
			value = value();
		}
		return this.operation.greaterThanOrEquals(<any>this, value);
	}

	IS_NOT_NULL(): JO {
		return this.operation.IS_NOT_NULL(<any>this);
	}

	IS_NULL(): JO {
		return this.operation.IS_NULL(<any>this);
	}

	IN(
		value: T[] | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO {
		if (value instanceof Function) {
			value = value();
		}
		let trackedRepoGUIDs = undefined
		if (value instanceof Array
			&& value.length
			&& !value.filter(aValue => typeof aValue !== 'string').length) {
			if (globalThis.IOC.getSync(this.dictionaryToken).isRepositoryGUIDProperty(
				this.dbProperty)) {
				trackedRepoGUIDs = value
			}
		}
		return this.operation.IN(<any>this, <any>value, trackedRepoGUIDs);
	}

	lessThan(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO {
		if (value instanceof Function) {
			value = value();
		}
		return this.operation.lessThan(<any>this, value);
	}

	lessThanOrEquals(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO {
		if (value instanceof Function) {
			value = value();
		}
		return this.operation.lessThanOrEquals(<any>this, value);
	}

	notEquals(
		value: T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> }
	): JO {
		if (value instanceof Function) {
			value = value();
		}
		return this.operation.notEquals(<any>this, value);
	}

	NOT_IN(
		values: (T | IQF | RawFieldQuery<IQF> | { (...args: any[]): RawFieldQuery<IQF> })[]
	): JO {
		values = values.map((value) => {
			if (value instanceof Function) {
				return value();
			}
			return value;
		});
		return this.operation.NOT_IN(<any>this, <any>values);
	}

}
