import {
	QueryBaseClause,
	QueryFunctionOperation,
	QueryFunctionCall
}                         from "@airport/ground-control";
import {IQOrderableField} from "./IQFieldInternal";

/**
 * Created by Papa on 1/6/2017.
 */

/**
 * A field (or part of a query) to which SQL functions can be applied to.
 */
export interface IAppliable<JCO extends QueryBaseClause, IQF extends IQOrderableField<IQF>> {
	// Functions applied to the field (in order of application)
	__appliedFunctions__: QueryFunctionCall[];

	// API for applying a SQL function
	applySqlFunction(sqlFunctionCall: QueryFunctionCall): IQF;

	// API for serializing the field with the applied function
	toQueryFragment(...args: any[]): JCO | QueryFunctionOperation;
}