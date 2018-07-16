import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
}                           from "@airport/ground-control";
import {IQEntityInternal}   from "../../../lingo/core/entity/Entity";
import {IQFunction}         from "../../../lingo/core/field/Functions";
import {IQNumberField}      from "../../../lingo/core/field/NumberField";
import {
	INumberOperation,
	JSONRawNumberOperation
}                           from "../../../lingo/core/operation/NumberOperation";
import {RawFieldQuery}      from "../../../lingo/query/facade/FieldQuery";
import {IUtils}             from "../../../lingo/utils/Utils";
import {FieldColumnAliases} from "../entity/Aliases";
import {NumberOperation}    from "../operation/NumberOperation";
import {QOperableField}     from "./OperableField";

/**
 * Created by Papa on 8/11/2016.
 */

export interface IQNumberEntityField extends IQNumberField {
}

export class QNumberField
	extends QOperableField<number, JSONRawNumberOperation, INumberOperation, IQNumberField>
	implements IQNumberField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		utils: IUtils,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new NumberOperation(), utils);
	}

	getInstance(qEntity: IQEntityInternal = this.q): QNumberField {
		return this.copyFunctions(
			new QNumberField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
	}

}

export class QNumberFunction
	extends QNumberField
	implements IQFunction<number | RawFieldQuery<any>> {

	parameterAlias: string;

	constructor(
		public value: number | RawFieldQuery<IQNumberField>,
		utils: IUtils,
		private isQueryParameter: boolean = false
	) {
		super(<any>{type: SQLDataType.NUMBER}, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QNumberFunction {
		return this.copyFunctions(new QNumberFunction(this.value, this.utils));
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