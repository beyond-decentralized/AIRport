import { JSONClauseField } from '@airport/ground-control';
import { IQFunction } from '../../../lingo/core/field/Functions';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { QField } from './Field';
/**
 * Created by Papa on 11/29/2016.
 */
export declare class QNullFunction extends QField<QNullFunction> implements IQFunction<boolean | RawFieldQuery<any>> {
    parameterAlias: string;
    value: any;
    constructor();
    getInstance(): QNullFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONClauseField;
}
//# sourceMappingURL=NullFunction.d.ts.map