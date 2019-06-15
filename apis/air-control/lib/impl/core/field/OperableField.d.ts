import { DbColumn, DbProperty, JSONClauseObjectType } from "@airport/ground-control";
import { IQEntityInternal, IQOperableFieldInternal } from "../../../";
import { IQOperableField } from "../../../lingo/core/field/OperableField";
import { IValueOperation, JSONRawValueOperation } from "../../../lingo/core/operation/Operation";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { QField } from "./Field";
/**
 * Created by Papa on 10/25/2016.
 */
export declare abstract class QOperableField<T, JO extends JSONRawValueOperation<IQF>, IO extends IValueOperation<T, JO, IQF>, IQF extends IQOperableField<T, JO, IO, IQF>> extends QField<IQF> implements IQOperableFieldInternal<T, JO, IO, IQF> {
    operation: IO;
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, objectType: JSONClauseObjectType, operation: IO);
    equals(value: T | IQF | RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<IQF>;
    }): JO;
    greaterThan(value: T | IQF | RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<IQF>;
    }): JO;
    greaterThanOrEquals(value: T | IQF | RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<IQF>;
    }): JO;
    isNotNull(): JO;
    isNull(): JO;
    in(value: T[] | IQF | RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<IQF>;
    }): JO;
    lessThan(value: T | IQF | RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<IQF>;
    }): JO;
    lessThanOrEquals(value: T | IQF | RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<IQF>;
    }): JO;
    notEquals(value: T | IQF | RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<IQF>;
    }): JO;
    notIn(values: (T | IQF | RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<IQF>;
    })[]): JO;
}
