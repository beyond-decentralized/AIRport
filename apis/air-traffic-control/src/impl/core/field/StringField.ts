import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
} from '@airport/ground-control';
import { IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IQFunction } from '../../../lingo/core/field/Functions';
import { IQStringField } from '../../../lingo/core/field/StringField';
import {
	IStringOperation,
	JSONRawStringOperation
} from '../../../lingo/core/operation/StringOperation';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { IRelationManager } from '../entity/RelationManager';
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

	like(
		value: string | IQStringField | RawFieldQuery<IQStringField> | { (...args: any[]): RawFieldQuery<IQStringField> }
	): JSONRawStringOperation {
		if (value instanceof Function) {
			value = value();
		}
		return this.operation.like(<any>this, value);
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
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONClauseField {
		let json = this.operableFunctionToJson(
			this, columnAliases, forSelectClause,
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