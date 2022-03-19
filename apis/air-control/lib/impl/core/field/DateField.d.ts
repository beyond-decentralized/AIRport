import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IQDateField } from '../../../lingo/core/field/DateField';
import { IQFunction } from '../../../lingo/core/field/Functions';
import { IDateOperation, JSONRawDateOperation } from '../../../lingo/core/operation/DateOperation';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { QOperableField } from './OperableField';
/**
 * Created by Papa on 8/11/2016.
 */
export interface IQDateEntityField extends IQDateField {
}
export declare class QDateField extends QOperableField<Date, JSONRawDateOperation, IDateOperation, IQDateField> implements IQDateField {
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, objectType?: JSONClauseObjectType);
    getInstance(qEntity?: IQEntityInternal): QDateField;
}
export declare class QDateFunction<T extends Date | Date[] = Date> extends QDateField implements IQFunction<T | RawFieldQuery<any>> {
    value: T | RawFieldQuery<QDateField>;
    protected isQueryParameter: boolean;
    parameterAlias: string;
    constructor(value: T | RawFieldQuery<QDateField>, isQueryParameter?: boolean);
    getInstance(): QDateFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONClauseField;
}
export declare class QDateArrayFunction extends QDateFunction<Date[]> {
    value: Date[] | RawFieldQuery<any>;
    constructor(value: Date[] | RawFieldQuery<any>, isQueryParameter?: boolean);
    getInstance(): QDateFunction<any>;
}
//# sourceMappingURL=DateField.d.ts.map