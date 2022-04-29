import { JSONBaseOperation } from '@airport/ground-control';
import { IFieldColumnAliases } from '../../lingo/core/entity/Aliases';
import { IFieldUtils } from '../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../lingo/utils/QueryUtils';
import { IRelationManager } from '../core/entity/RelationManager';
export declare class QueryUtils implements IQueryUtils {
    fieldUtils: IFieldUtils;
    relationManager: IRelationManager;
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>): JSONBaseOperation;
    private convertLRValue;
}
//# sourceMappingURL=QueryUtils.d.ts.map