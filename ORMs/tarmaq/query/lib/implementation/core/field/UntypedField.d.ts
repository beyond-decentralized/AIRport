import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQFunction } from '../../../definition/core/field/Functions';
import { IQUntypedField } from '../../../definition/core/field/UntypedField';
import { IUntypedOperation, JSONRawUntypedOperation } from '../../../definition/core/operation/UntypedOperation';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { QOperableField } from './OperableField';
/**
 * Created by papa on 7/13/17.
 */
export interface IQUntypedEntityField extends IQUntypedField {
}
export declare class QUntypedField extends QOperableField<number | string, JSONRawUntypedOperation, IUntypedOperation, IQUntypedField> implements IQUntypedField {
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, objectType?: JSONClauseObjectType);
    getInstance(qEntity?: IQEntityInternal): QUntypedField;
    like(value: string | IQUntypedField | RawFieldQuery<IQUntypedField> | {
        (...args: any[]): RawFieldQuery<IQUntypedField>;
    }): JSONRawUntypedOperation;
}
export declare class QUntypedFunction extends QUntypedField implements IQFunction<number | string | RawFieldQuery<any>> {
    value: number | string | RawFieldQuery<any>;
    private isQueryParameter;
    parameterAlias: string;
    constructor(value: number | string | RawFieldQuery<any>, isQueryParameter?: boolean);
    getInstance(): QUntypedFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONClauseField;
}
//# sourceMappingURL=UntypedField.d.ts.map