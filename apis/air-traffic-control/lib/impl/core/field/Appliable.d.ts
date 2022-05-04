import { JSONClauseObject, JSONFunctionOperation, JSONSqlFunctionCall } from "@airport/ground-control";
import { IQOrderableField } from "../../../lingo/core/field/Field";
/**
 * Created by Papa on 1/6/2017.
 */
/**
 * A field (or part of a query) to which SQL functions can be applied to.
 */
export interface IAppliable<JCO extends JSONClauseObject, IQF extends IQOrderableField<IQF>> {
    __appliedFunctions__: JSONSqlFunctionCall[];
    applySqlFunction(sqlFunctionCall: JSONSqlFunctionCall): IQF;
    toJSON(...args: any[]): JCO | JSONFunctionOperation;
}
//# sourceMappingURL=Appliable.d.ts.map