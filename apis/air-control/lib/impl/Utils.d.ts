import { DatastructureUtils } from '@airport/ground-control';
import { IUtils } from '../lingo/utils/Utils';
export declare class Utils extends DatastructureUtils implements IUtils {
    strsToNums(strings: string[]): number[];
    objectExists(object: any): boolean;
    valuesEqual(value1: any, value2: any, checkChildObjects?: boolean): boolean;
    compareNumbers(number1: number, number2: number): -1 | 0 | 1;
}
