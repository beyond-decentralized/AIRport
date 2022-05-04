import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IFieldUtils, IQueryUtils } from '../../..';
import { IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IQFunction } from '../../../lingo/core/field/Functions';
import { IQUntypedField } from '../../../lingo/core/field/UntypedField';
import { IUntypedOperation, JSONRawUntypedOperation } from '../../../lingo/core/operation/UntypedOperation';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { FieldColumnAliases } from '../entity/Aliases';
import { IRelationManager } from '../entity/RelationManager';
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