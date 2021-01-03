import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IQBooleanField } from '../../../lingo/core/field/BooleanField';
import { IQFunction } from '../../../lingo/core/field/Functions';
import { IBooleanOperation, JSONRawBooleanOperation } from '../../../lingo/core/operation/BooleanOperation';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { QOperableField } from './OperableField';
/**
 * Created by Papa on 8/10/2016.
 */
export interface IQBooleanEntityField extends IQBooleanField {
}
export declare class QBooleanField extends QOperableField<boolean, JSONRawBooleanOperation, IBooleanOperation, IQBooleanField> implements IQBooleanField {
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal<any>, objectType?: JSONClauseObjectType);
    getInstance(qEntity?: IQEntityInternal<any>): QBooleanField;
}
export declare class QBooleanFunction extends QBooleanField implements IQFunction<boolean | RawFieldQuery<any>> {
    value: boolean | RawFieldQuery<QBooleanField>;
    private isQueryParameter;
    parameterAlias: string;
    constructor(value: boolean | RawFieldQuery<QBooleanField>, isQueryParameter?: boolean);
    getInstance(): QBooleanFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONClauseField;
}
//# sourceMappingURL=BooleanField.d.ts.map