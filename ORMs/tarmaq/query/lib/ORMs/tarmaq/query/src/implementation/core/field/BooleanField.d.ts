import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQBooleanField } from '../../../definition/core/field/BooleanField';
import { IQFunction } from '../../../definition/core/field/Functions';
import { IBooleanOperation, JSONRawBooleanOperation } from '../../../definition/core/operation/BooleanOperation';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { QOperableField } from './OperableField';
/**
 * Created by Papa on 8/10/2016.
 */
export interface IQBooleanEntityField extends IQBooleanField {
}
export declare class QBooleanField extends QOperableField<boolean, JSONRawBooleanOperation, IBooleanOperation, IQBooleanField> implements IQBooleanField {
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, objectType?: JSONClauseObjectType);
    getInstance(qEntity?: IQEntityInternal): QBooleanField;
}
export declare class QBooleanFunction extends QBooleanField implements IQFunction<boolean | RawFieldQuery<any>> {
    value: boolean | RawFieldQuery<QBooleanField>;
    private isQueryParameter;
    parameterAlias: string;
    constructor(value: boolean | RawFieldQuery<QBooleanField>, isQueryParameter?: boolean);
    getInstance(): QBooleanFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONClauseField;
}
//# sourceMappingURL=BooleanField.d.ts.map