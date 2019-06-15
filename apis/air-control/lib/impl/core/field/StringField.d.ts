import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IQFunction } from '../../../lingo/core/field/Functions';
import { IQStringField } from '../../../lingo/core/field/StringField';
import { IStringOperation, JSONRawStringOperation } from '../../../lingo/core/operation/StringOperation';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { QOperableField } from './OperableField';
/**
 * Created by Papa on 8/11/2016.
 */
export interface IQStringEntityField extends IQStringField {
}
export declare class QStringField extends QOperableField<string, JSONRawStringOperation, IStringOperation, IQStringField> implements IQStringField {
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, objectType?: JSONClauseObjectType);
    getInstance(qEntity?: IQEntityInternal): QStringField;
    like(value: string | IQStringField | RawFieldQuery<IQStringField> | {
        (...args: any[]): RawFieldQuery<IQStringField>;
    }): JSONRawStringOperation;
}
export declare class QStringFunction extends QStringField implements IQFunction<string | RawFieldQuery<any>> {
    value: string | RawFieldQuery<any>;
    private isQueryParameter;
    parameterAlias: string;
    constructor(value: string | RawFieldQuery<any>, isQueryParameter?: boolean);
    getInstance(): QStringFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONClauseField;
}
