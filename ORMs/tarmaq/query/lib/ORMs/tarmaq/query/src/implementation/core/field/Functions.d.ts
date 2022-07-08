import { JSONBaseOperation, JSONClauseField, JSONClauseObject, JSONFunctionOperation, JSONSqlFunctionCall, JsonTreeQuery, OperationCategory, SqlOperator } from '@airport/ground-control';
import { IQUntypedField } from '../../../definition/core/field/UntypedField';
import { IQBooleanField } from '../../../definition/core/field/BooleanField';
import { IQDateField } from '../../../definition/core/field/DateField';
import { absFunction, addFunction, avgFunction, concatenateFunction, countFunction, distinctFunction, divideFunction, exceptFunction, existsFunction, formatFunction, intersectFunction, IQDistinctFunction, IQExistsFunction, lcaseFunction, lenFunction, maxFunction, midFunction, minFunction, minusFunction, modulusFunction, multiplyFunction, nowFunction, plusFunction, replaceFunction, roundFunction, subtractFunction, sumFunction, trimFunction, ucaseFunction, unionAllFunction, unionFunction } from '../../../definition/core/field/Functions';
import { IQNumberField } from '../../../definition/core/field/NumberField';
import { IQStringField } from '../../../definition/core/field/StringField';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { ITreeEntity, RawTreeQuery } from '../../../definition/query/facade/TreeQuery';
import { IAppliable } from './Appliable';
import { QOperableField } from './OperableField';
export declare const abs: absFunction;
export declare const avg: avgFunction;
export declare function getFunctionObject<T extends boolean | Date | number | string>(value: T | RawFieldQuery<any>): QOperableField<T, any, any, any>;
export declare const count: countFunction;
export declare const max: maxFunction;
export declare const min: minFunction;
export declare const sum: sumFunction;
export declare const plus: plusFunction;
export declare function coalesce(...values: (IQBooleanField | boolean | RawFieldQuery<IQBooleanField>)[]): IQBooleanField;
export declare function coalesce(...values: (IQDateField | Date | RawFieldQuery<IQDateField>)[]): IQDateField;
export declare function coalesce(...values: (IQNumberField | number | RawFieldQuery<IQNumberField>)[]): IQNumberField;
export declare function coalesce(...values: (IQStringField | string | RawFieldQuery<IQStringField>)[]): IQStringField;
export declare function coalesce(...values: (IQUntypedField | any | RawFieldQuery<IQUntypedField>)[]): IQUntypedField;
export declare const ucase: ucaseFunction;
export declare const lcase: lcaseFunction;
export declare const mid: midFunction;
export declare const len: lenFunction;
export declare const round: roundFunction;
export declare const now: nowFunction;
export declare const format: formatFunction;
export declare const replace: replaceFunction;
export declare const trim: trimFunction;
export declare abstract class StandAloneFunction {
}
export declare const distinct: distinctFunction;
export declare class QDistinctFunction<ISelect> extends StandAloneFunction implements IQDistinctFunction<ISelect>, IAppliable<JSONClauseObject, any> {
    private selectClause;
    __appliedFunctions__: JSONSqlFunctionCall[];
    constructor(selectClause: ISelect);
    static getSelect(distinct: QDistinctFunction<any>): any;
    applySqlFunction(sqlFunctionCall: JSONSqlFunctionCall): any;
    getSelectClause(): any;
    toJSON(parsedSelectClause?: any): JSONClauseField;
}
export declare const exists: existsFunction;
export declare class QExistsFunction<IME extends ITreeEntity> extends StandAloneFunction implements IQExistsFunction, IAppliable<JSONClauseObject, any>, JSONBaseOperation {
    private subQuery;
    __appliedFunctions__: JSONSqlFunctionCall[];
    operator: SqlOperator;
    o: SqlOperator;
    category: OperationCategory;
    c: OperationCategory;
    constructor(subQuery: RawTreeQuery<IME>);
    applySqlFunction(sqlFunctionCall: JSONSqlFunctionCall): any;
    getQuery(): RawTreeQuery<any>;
    toJSON(parsedQuery?: JsonTreeQuery): JSONFunctionOperation;
}
export declare const divide: divideFunction;
export declare const subtract: subtractFunction;
export declare const modulus: modulusFunction;
export declare const multiply: multiplyFunction;
export declare const add: addFunction;
export declare const concat: concatenateFunction;
/**
 * A
 * UNION
 * B
 */
export declare const union: unionFunction;
/**
 * A
 * UNION ALL
 * B
 */
export declare const unionAll: unionAllFunction;
/**
 * A
 * INTERSECT
 * B
 */
export declare const intersect: intersectFunction;
/**
 * A
 * MINUS
 * B
 */
export declare const except: exceptFunction;
/**
 * A
 * MINUS
 * B
 */
export declare const minus: minusFunction;
//# sourceMappingURL=Functions.d.ts.map