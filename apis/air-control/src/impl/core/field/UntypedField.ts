import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
}                           from "@airport/ground-control";
import {IQEntityInternal}   from "../../../lingo/core/entity/Entity";
import {IQFunction}         from "../../../lingo/core/field/Functions";
import {IQUntypedField}     from "../../../lingo/core/field/UntypedField";
import {
	IUntypedOperation,
	JSONRawUntypedOperation
}                           from "../../../lingo/core/operation/UntypedOperation";
import {RawFieldQuery}      from "../../../lingo/query/facade/FieldQuery";
import {IUtils}             from "../../../lingo/utils/Utils";
import {FieldColumnAliases} from "../entity/Aliases";
import {UntypedOperation}   from "../operation/UntypedOperation";
import {QOperableField}     from "./OperableField";

/**
 * Created by papa on 7/13/17.
 */

export interface IQUntypedEntityField
	extends IQUntypedField {
}

export class QUntypedField
	extends QOperableField<number | string, JSONRawUntypedOperation, IUntypedOperation, IQUntypedField>
	implements IQUntypedField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		utils: IUtils,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new UntypedOperation(), utils);
	}

	getInstance(qEntity: IQEntityInternal = this.q): QUntypedField {
		return this.copyFunctions(
			new QUntypedField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
	}

	like(
		value: string | IQUntypedField | RawFieldQuery<IQUntypedField> | { (...args: any[]): RawFieldQuery<IQUntypedField> }
	): JSONRawUntypedOperation {
		if (value instanceof Function) {
			value = value();
		}
		return this.operation.like(<any>this, value);
	}

}

export class QUntypedFunction
	extends QUntypedField
	implements IQFunction<number | string | RawFieldQuery<any>> {

	parameterAlias: string;

	constructor(
		public value: number | string | RawFieldQuery<any>,
		utils: IUtils,
		private isQueryParameter: boolean = false
	) {
		super(<any>{type: SQLDataType.ANY}, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QUntypedFunction {
		return this.copyFunctions(new QUntypedFunction(this.value, this.utils));
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
