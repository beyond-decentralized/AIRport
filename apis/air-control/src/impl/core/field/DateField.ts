import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
}                           from "@airport/ground-control";
import {IQEntityInternal}   from "../../../lingo/core/entity/Entity";
import {IQDateField}        from "../../../lingo/core/field/DateField";
import {IQFunction}         from "../../../lingo/core/field/Functions";
import {
	IDateOperation,
	JSONRawDateOperation
}                           from "../../../lingo/core/operation/DateOperation";
import {RawFieldQuery}      from "../../../lingo/query/facade/FieldQuery";
import {IUtils}             from "../../../lingo/utils/Utils";
import {FieldColumnAliases} from "../entity/Aliases";
import {DateOperation}      from "../operation/DateOperation";
import {QOperableField}     from "./OperableField";

/**
 * Created by Papa on 8/11/2016.
 */

export interface IQDateEntityField extends IQDateField {
}

export class QDateField
	extends QOperableField<Date, JSONRawDateOperation, IDateOperation, IQDateField>
	implements IQDateField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		utils: IUtils,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new DateOperation(), utils);
	}

	getInstance(qEntity: IQEntityInternal = this.q): QDateField {
		return this.copyFunctions(
			new QDateField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
	}

}

export class QDateFunction
	extends QDateField
	implements IQFunction<Date | RawFieldQuery<any>> {

	parameterAlias: string;

	constructor(
		public value: Date | RawFieldQuery<QDateField>,
		utils: IUtils,
		private isQueryParameter: boolean = false
	) {
		super(<any>{type: SQLDataType.DATE}, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QDateFunction {
		return this.copyFunctions(new QDateFunction(this.value, this.utils));
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