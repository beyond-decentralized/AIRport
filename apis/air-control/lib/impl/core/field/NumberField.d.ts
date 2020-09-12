import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IQFunction } from '../../../lingo/core/field/Functions';
import { IQNumberField } from '../../../lingo/core/field/NumberField';
import { INumberOperation, JSONRawNumberOperation } from '../../../lingo/core/operation/NumberOperation';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { QOperableField } from './OperableField';
/**
 * Created by Papa on 8/11/2016.
 */
export interface IQNumberEntityField extends IQNumberField {
}
export declare class QNumberField extends QOperableField<number, JSONRawNumberOperation, INumberOperation, IQNumberField> implements IQNumberField {
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, objectType?: JSONClauseObjectType);
    getInstance(qEntity?: IQEntityInternal): QNumberField;
}
export declare class QNumberFunction extends QNumberField implements IQFunction<number | RawFieldQuery<any>> {
    value: number | RawFieldQuery<IQNumberField>;
    private isQueryParameter;
    parameterAlias: string;
    constructor(value: number | RawFieldQuery<IQNumberField>, isQueryParameter?: boolean);
    getInstance(): QNumberFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONClauseField;
}
//# sourceMappingURL=NumberField.d.ts.map