import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
}                           from "@airport/ground-control";
import {IQEntityInternal}   from "../../../lingo/core/entity/Entity";
import {IQBooleanField}     from "../../../lingo/core/field/BooleanField";
import {IQFunction}         from "../../../lingo/core/field/Functions";
import {
	IBooleanOperation,
	JSONRawBooleanOperation
}                           from "../../../lingo/core/operation/BooleanOperation";
import {RawFieldQuery}      from "../../../lingo/query/facade/FieldQuery";
import {IUtils}             from "../../../lingo/utils/Utils";
import {FieldColumnAliases} from "../entity/Aliases";
import {BooleanOperation}   from "../operation/BooleanOperation";
import {QOperableField}     from "./OperableField";

/**
 * Created by Papa on 8/10/2016.
 */

export interface IQBooleanEntityField extends IQBooleanField {
}

export class QBooleanField
	extends QOperableField<boolean, JSONRawBooleanOperation, IBooleanOperation, IQBooleanField>
	implements IQBooleanField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		utils: IUtils,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new BooleanOperation(), utils);
	}

	getInstance(
		qEntity: IQEntityInternal = this.q
	): QBooleanField {
		return this.copyFunctions(
			new QBooleanField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
	}

}

export class QBooleanFunction
	extends QBooleanField
	implements IQFunction<boolean | RawFieldQuery<any>> {

	parameterAlias: string;

	constructor(
		public value: boolean | RawFieldQuery<QBooleanField>,
		utils: IUtils,
		private isQueryParameter: boolean = false
	) {
		super(<any>{type: SQLDataType.BOOLEAN}, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QBooleanFunction {
		return this.copyFunctions(new QBooleanFunction(this.value, this.utils));
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
