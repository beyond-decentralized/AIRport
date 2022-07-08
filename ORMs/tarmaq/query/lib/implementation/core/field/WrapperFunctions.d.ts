import { DbColumn } from '@airport/ground-control';
import { boolFunction, dateFunction, numFunction, strFunction } from '../../../definition/core/field/WrapperFunctions';
/**
 * Created by Papa on 12/31/2016.
 */
export declare const bool: boolFunction;
export declare const date: dateFunction;
export declare const num: numFunction;
export declare const str: strFunction;
export declare function wrapPrimitive(value: any): any;
export declare function getPrimitiveValue(value: any, dbColumn: DbColumn, rowIndex: number, datesToNumbers?: boolean): any;
//# sourceMappingURL=WrapperFunctions.d.ts.map