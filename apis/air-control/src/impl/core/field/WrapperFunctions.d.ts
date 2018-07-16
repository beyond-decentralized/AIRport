import { boolFunction, dateFunction, numFunction, strFunction } from "../../../lingo/core/field/WrapperFunctions";
import { IUtils } from "../../../lingo/utils/Utils";
export declare function setUtilsForWrapperFunctions(utilsForFunctions: IUtils): void;
export declare const bool: boolFunction;
export declare const date: dateFunction;
export declare const num: numFunction;
export declare const str: strFunction;
export declare function wrapPrimitive(value: any): any;
export declare function getPrimitiveValue(value: any, datesToNumbers?: boolean): any;
