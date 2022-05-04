import {
	JSONClauseObject,
	JSONFunctionOperation,
	JSONSqlFunctionCall
}                         from "@airport/ground-control";
import {IQOrderableField} from "../../../lingo/core/field/Field";

/**
 * Created by Papa on 1/6/2017.
 */

/**
 * A field (or part of a query) to which SQL functions can be applied to.
 */
export interface IAppliable<JCO extends JSONClauseObject, IQF extends IQOrderableField<IQF>> {
	// Functions applied to the field (in order of application)
	__appliedFunctions__: JSONSqlFunctionCall[];

	// API for applying a SQL function
	applySqlFunction(sqlFunctionCall: JSONSqlFunctionCall): IQF;

	// API for serializing the field with the applied function
	toJSON(...args: any[]): JCO | JSONFunctionOperation;
}