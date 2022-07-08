import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQFunction } from '../../../definition/core/field/Functions';
import { IQNumberField } from '../../../definition/core/field/NumberField';
import { INumberOperation, JSONRawNumberOperation } from '../../../definition/core/operation/NumberOperation';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
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
export declare class QNumberFunction<T extends number | number[] = number> extends QNumberField implements IQFunction<T | RawFieldQuery<any>> {
    value: T | RawFieldQuery<IQNumberField>;
    protected isQueryParameter: boolean;
    parameterAlias: string;
    constructor(value: T | RawFieldQuery<IQNumberField>, isQueryParameter?: boolean);
    getInstance(): QNumberFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONClauseField;
}
export declare class QNumberArrayFunction extends QNumberFunction<number[]> {
    value: number[] | RawFieldQuery<any>;
    constructor(value: number[] | RawFieldQuery<any>, isQueryParameter?: boolean);
    getInstance(): QNumberFunction<any>;
}
//# sourceMappingURL=NumberField.d.ts.map