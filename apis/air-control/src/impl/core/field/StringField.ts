import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
}                           from "@airport/ground-control";
import {IQEntityInternal}   from "../../../lingo/core/entity/Entity";
import {IQFunction}         from "../../../lingo/core/field/Functions";
import {IQStringField}      from "../../../lingo/core/field/StringField";
import {
	IStringOperation,
	JSONRawStringOperation
}                           from "../../../lingo/core/operation/StringOperation";
import {RawFieldQuery}      from "../../../lingo/query/facade/FieldQuery";
import {IUtils}             from "../../../lingo/utils/Utils";
import {FieldColumnAliases} from "../entity/Aliases";
import {StringOperation}    from "../operation/StringOperation";
import {QOperableField}     from "./OperableField";

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
		utils: IUtils,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new StringOperation(), utils);
	}

	getInstance(qEntity: IQEntityInternal = this.q): QStringField {
		return this.copyFunctions(
			new QStringField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
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

export class QStringFunction
	extends QStringField
	implements IQFunction<string | RawFieldQuery<any>> {

	parameterAlias: string;

	constructor(
		public value: string | RawFieldQuery<any>,
		utils: IUtils,
		private isQueryParameter: boolean = false
	) {
		super(<any>{type: SQLDataType.STRING}, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QStringFunction {
		return this.copyFunctions(new QStringFunction(this.value, this.utils));
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean
	): JSONClauseField {
		let json = this.operableFunctionToJson(this, columnAliases, forSelectClause);

		if (this.isQueryParameter) {
			this.parameterAlias = <string>json.v;
		}

		return json;
	}
}
