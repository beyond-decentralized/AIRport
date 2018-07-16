import { JSONClauseField } from "@airport/ground-control";
import { IQFunction } from "../../../lingo/core/field/Functions";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { IUtils } from "../../../lingo/utils/Utils";
import { FieldColumnAliases } from "../entity/Aliases";
import { QField } from "./Field";
/**
 * Created by Papa on 11/29/2016.
 */
export declare class QNullFunction extends QField<QNullFunction> implements IQFunction<boolean | RawFieldQuery<any>> {
    parameterAlias: string;
    value: any;
    constructor(utils: IUtils);
    getInstance(): QNullFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean): JSONClauseField;
}
