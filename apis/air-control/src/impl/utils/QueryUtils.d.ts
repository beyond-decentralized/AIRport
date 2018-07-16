import { JSONBaseOperation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../../lingo/core/entity/Aliases";
import { IQueryUtils } from "../../lingo/utils/QueryUtils";
import { IUtils } from "../../lingo/utils/Utils";
export declare class QueryUtils implements IQueryUtils {
    private utils;
    constructor(utils: IUtils);
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>): JSONBaseOperation;
    private convertLRValue;
}
