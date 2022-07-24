import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQFunction } from '../../../definition/core/field/Functions';
import { IQStringField } from '../../../definition/core/field/StringField';
import { IStringOperation, JSONRawStringOperation } from '../../../definition/core/operation/StringOperation';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
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
    LIKE(value: string | IQStringField | RawFieldQuery<IQStringField> | {
        (...args: any[]): RawFieldQuery<IQStringField>;
    }): JSONRawStringOperation;
}
export declare class QStringFunction<T extends string | string[] = string> extends QStringField implements IQFunction<T | RawFieldQuery<any>> {
    value: T | RawFieldQuery<any>;
    protected isQueryParameter: boolean;
    parameterAlias: string;
    constructor(value: T | RawFieldQuery<any>, isQueryParameter?: boolean);
    getInstance(): QStringFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONClauseField;
}
export declare class QStringArrayFunction extends QStringFunction<string[]> {
    value: string[] | RawFieldQuery<any>;
    constructor(value: string[] | RawFieldQuery<any>, isQueryParameter?: boolean);
    getInstance(): QStringFunction<any>;
}
//# sourceMappingURL=StringField.d.ts.map