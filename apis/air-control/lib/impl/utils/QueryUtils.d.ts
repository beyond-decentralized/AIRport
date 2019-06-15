import { JSONBaseOperation } from '@airport/ground-control';
import { IFieldColumnAliases } from '../../lingo/core/entity/Aliases';
import { IFieldUtils } from '../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../lingo/utils/QueryUtils';
export declare class QueryUtils implements IQueryUtils {
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>, fieldUtils: IFieldUtils): JSONBaseOperation;
    private convertLRValue;
}
