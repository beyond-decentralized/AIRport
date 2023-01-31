import {
	DbColumn,
	DbProperty,
	QueryFieldClause,
	QueryClauseObjectType,
	Repository_GUID,
	Repository_LocalId,
	SQLDataType
} from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver';
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager';
import { IQFunction } from '../../../definition/core/field/IQFunctions';
import { IQStringField } from '../../../definition/core/field/IQStringField';
import {
	IStringOperation,
	RawStringOperation
} from '../../../definition/core/operation/IStringOperation';
import { RawFieldQuery } from '../../../definition/query/facade/RawFieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { StringOperation } from '../operation/StringOperation';
import { QOperableField } from './OperableField';

/**
 * Created by Papa on 8/11/2016.
 */

export interface IQStringEntityField
	extends IQStringField {
}

export class QStringField
	extends QOperableField<string, RawStringOperation, IStringOperation, IQStringField>
	implements IQStringField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		objectType: QueryClauseObjectType = QueryClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new StringOperation());
	}

	getInstance(qEntity: IQEntityInternal = this.q): QStringField {
		return this.copyFunctions(
			new QStringField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
	}

	LIKE(
		value: string | IQStringField | RawFieldQuery<IQStringField> | { (...args: any[]): RawFieldQuery<IQStringField> }
	): RawStringOperation {
		if (value instanceof Function) {
			value = value();
		}
		return this.operation.LIKE(<any>this, value);
	}

}

export class QStringFunction<T extends string | string[] = string>
	extends QStringField
	implements IQFunction<T | RawFieldQuery<any>> {

	parameterAlias: string;

	constructor(
		public value: T | RawFieldQuery<any>,
		protected isQueryParameter: boolean = false
	) {
		super(<any>{ type: SQLDataType.STRING }, null, null, QueryClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QStringFunction {
		return this.copyFunctions(new QStringFunction(this.value as string, this.isQueryParameter));
	}

	toQueryFragment(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryFieldClause {
		let queryFieldClause = this.rawToQueryOperableFunction(
			this, columnAliases, forSelectClause,
			trackedRepoGUIDSet, trackedRepoLocalIdSet,
			queryUtils, fieldUtils, relationManager);

		if (this.isQueryParameter) {
			this.parameterAlias = <string>queryFieldClause.v;
		}

		return queryFieldClause;
	}
}

export class QStringArrayFunction
	extends QStringFunction<string[]> {

	constructor(
		public value: string[] | RawFieldQuery<any>,
		isQueryParameter?: boolean
	) {
		super(value, isQueryParameter);
	}

	getInstance(): QStringFunction<any> {
		return this.copyFunctions(new QStringArrayFunction(this.value as string[],
			this.isQueryParameter));
	}

}
