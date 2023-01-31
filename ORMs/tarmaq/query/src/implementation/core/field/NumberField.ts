import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	Repository_GUID,
	Repository_LocalId,
	SQLDataType
} from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQFunction } from '../../../definition/core/field/Functions';
import { IQNumberField } from '../../../definition/core/field/NumberField';
import {
	INumberOperation,
	JSONRawNumberOperation
} from '../../../definition/core/operation/NumberOperation';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { NumberOperation } from '../operation/NumberOperation';
import { QOperableField } from './OperableField';

/**
 * Created by Papa on 8/11/2016.
 */

export interface IQNumberEntityField
	extends IQNumberField {
}

export class QNumberField
	extends QOperableField<number, JSONRawNumberOperation, INumberOperation, IQNumberField>
	implements IQNumberField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new NumberOperation());
	}

	getInstance(qEntity: IQEntityInternal = this.q): QNumberField {
		return this.copyFunctions(
			new QNumberField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
	}

}

export class QNumberFunction<T extends number | number[] = number>
	extends QNumberField
	implements IQFunction<T | RawFieldQuery<any>> {

	parameterAlias: string;

	constructor(
		public value: T | RawFieldQuery<IQNumberField>,
		protected isQueryParameter: boolean = false
	) {
		super(<any>{ type: SQLDataType.NUMBER }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QNumberFunction {
		return this.copyFunctions(new QNumberFunction(this.value as number, this.isQueryParameter));
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONClauseField {
		let json = this.operableFunctionToJson(
			this, columnAliases, forSelectClause,
			trackedRepoGUIDSet, trackedRepoLocalIdSet,
			queryUtils, fieldUtils, relationManager);

		if (this.isQueryParameter) {
			this.parameterAlias = <string>json.v;
		}

		return json;
	}
}

export class QNumberArrayFunction
	extends QNumberFunction<number[]> {

	constructor(
		public value: number[] | RawFieldQuery<any>,
		isQueryParameter?: boolean
	) {
		super(value, isQueryParameter);
	}

	getInstance(): QNumberFunction<any> {
		return this.copyFunctions(new QNumberArrayFunction(this.value as number[],
			this.isQueryParameter));
	}

}
