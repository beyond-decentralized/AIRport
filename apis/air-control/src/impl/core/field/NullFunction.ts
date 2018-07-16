import {
	JSONClauseField,
	JSONClauseObjectType
}                           from "@airport/ground-control";
import {IQFunction}         from "../../../lingo/core/field/Functions";
import {RawFieldQuery}      from "../../../lingo/query/facade/FieldQuery";
import {IUtils}             from "../../../lingo/utils/Utils";
import {FieldColumnAliases} from "../entity/Aliases";
import {QField}             from "./Field";

/**
 * Created by Papa on 11/29/2016.
 */

export class QNullFunction extends QField<QNullFunction> implements IQFunction<boolean | RawFieldQuery<any>> {

	parameterAlias: string;
	value = null;

	constructor(
		utils: IUtils
	) {
		super(null, null, null, JSONClauseObjectType.FIELD_FUNCTION, utils);
	}

	getInstance(): QNullFunction {
		return this.copyFunctions(new QNullFunction(this.utils));
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean
	): JSONClauseField {
		return this.operableFunctionToJson(this, columnAliases, forSelectClause);
	}

}

