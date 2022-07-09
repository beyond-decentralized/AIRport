export interface IUtils {
    strsToNums(strings: string[]): number[];
    objectExists(object: any): boolean;
    valuesEqual(value1: any, value2: any, checkChildObjects?: boolean): boolean;
    compareNumbers(number1: number, number2: number): -1 | 0 | 1;
}
//# sourceMappingURL=Utils.d.ts.map