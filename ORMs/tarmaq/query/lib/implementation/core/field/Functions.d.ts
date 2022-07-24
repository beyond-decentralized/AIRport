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
export declare const ABS: absFunction;
export declare const AVG: avgFunction;
export declare function getFunctionObject<T extends boolean | Date | number | string>(value: T | RawFieldQuery<any>): QOperableField<T, any, any, any>;
export declare const COUNT: countFunction;
export declare const MAX: maxFunction;
export declare const MIN: minFunction;
export declare const SUM: sumFunction;
export declare const PLUS: plusFunction;
export declare function COALESCE(...values: (IQBooleanField | boolean | RawFieldQuery<IQBooleanField>)[]): IQBooleanField;
export declare function COALESCE(...values: (IQDateField | Date | RawFieldQuery<IQDateField>)[]): IQDateField;
export declare function COALESCE(...values: (IQNumberField | number | RawFieldQuery<IQNumberField>)[]): IQNumberField;
export declare function COALESCE(...values: (IQStringField | string | RawFieldQuery<IQStringField>)[]): IQStringField;
export declare function COALESCE(...values: (IQUntypedField | any | RawFieldQuery<IQUntypedField>)[]): IQUntypedField;
export declare const UCASE: ucaseFunction;
export declare const LCASE: lcaseFunction;
export declare const MID: midFunction;
export declare const LEN: lenFunction;
export declare const ROUND: roundFunction;
export declare const NOW: nowFunction;
export declare const FORMAT: formatFunction;
export declare const REPLACE: replaceFunction;
export declare const TRIM: trimFunction;
export declare abstract class StandAloneFunction {
}
export declare const DISTINCT: distinctFunction;
export declare class QDistinctFunction<ISelect> extends StandAloneFunction implements IQDistinctFunction<ISelect>, IAppliable<JSONClauseObject, any> {
    private selectClause;
    __appliedFunctions__: JSONSqlFunctionCall[];
    constructor(selectClause: ISelect);
    static getSelect(distinct: QDistinctFunction<any>): any;
    applySqlFunction(sqlFunctionCall: JSONSqlFunctionCall): any;
    getSelectClause(): any;
    toJSON(parsedSelectClause?: any): JSONClauseField;
}
export declare const EXISTS: existsFunction;
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
export declare const DIVIDE: divideFunction;
export declare const SUBTRACT: subtractFunction;
export declare const MODULUS: modulusFunction;
export declare const MULTIPLY: multiplyFunction;
export declare const ADD: addFunction;
export declare const CONCAT: concatenateFunction;
/**
 * A
 * UNION
 * B
 */
export declare const UNION: unionFunction;
/**
 * A
 * UNION ALL
 * B
 */
export declare const UNION_ALL: unionAllFunction;
/**
 * A
 * INTERSECT
 * B
 */
export declare const INTERSECT: intersectFunction;
/**
 * A
 * MINUS
 * B
 */
export declare const EXCEPT: exceptFunction;
/**
 * A
 * MINUS
 * B
 */
export declare const MINUS: minusFunction;
//# sourceMappingURL=Functions.d.ts.map