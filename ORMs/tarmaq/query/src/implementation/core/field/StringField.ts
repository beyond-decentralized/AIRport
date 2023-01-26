import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	Repository_GUID,
	SQLDataType
} from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQFunction } from '../../../definition/core/field/Functions';
import { IQStringField } from '../../../definition/core/field/StringField';
import {
	IStringOperation,
	JSONRawStringOperation
} from '../../../definition/core/operation/StringOperation';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
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
	extends QOperableField<string, JSONRawStringOperation, IStringOperation, IQStringField>
	implements IQStringField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new StringOperation());
	}

	getInstance(qEntity: IQEntityInternal = this.q): QStringField {
		return this.copyFunctions(
			new QStringField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
	}

	LIKE(
		value: string | IQStringField | RawFieldQuery<IQStringField> | { (...args: any[]): RawFieldQuery<IQStringField> }
	): JSONRawStringOperation {
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
		super(<any>{ type: SQLDataType.STRING }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QStringFunction {
		return this.copyFunctions(new QStringFunction(this.value as string, this.isQueryParameter));
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONClauseField {
		let json = this.operableFunctionToJson(
			this, columnAliases, forSelectClause,
			trackedRepoGUIDSet,
			queryUtils, fieldUtils, relationManager);

		if (this.isQueryParameter) {
			this.parameterAlias = <string>json.v;
		}

		return json;
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
