import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQDateField } from '../../../definition/core/field/DateField';
import { IQFunction } from '../../../definition/core/field/Functions';
import { IDateOperation, JSONRawDateOperation } from '../../../definition/core/operation/DateOperation';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
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
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONClauseField;
}
export declare class QDateArrayFunction extends QDateFunction<Date[]> {
    value: Date[] | RawFieldQuery<any>;
    constructor(value: Date[] | RawFieldQuery<any>, isQueryParameter?: boolean);
    getInstance(): QDateFunction<any>;
}
//# sourceMappingURL=DateField.d.ts.map