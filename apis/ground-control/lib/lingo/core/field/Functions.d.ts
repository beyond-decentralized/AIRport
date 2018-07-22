export interface JSONSqlFunctionCall {
    ft: SqlFunction;
    p: any[];
}
/**
 * Extracted from http://www.w3schools.com/sql/sql_functions.asp
 */
export declare enum SqlFunction {
    ABS = 0,
    AVG = 1,
    COUNT = 2,
    MAX = 3,
    MIN = 4,
    SUM = 5,
    UCASE = 6,
    LCASE = 7,
    MID = 8,
    LEN = 9,
    ROUND = 10,
    NOW = 11,
    FORMAT = 12,
    REPLACE = 13,
    TRIM = 14,
    DISTINCT = 15,
    EXISTS = 16,
    DIVIDE = 17,
    MINUS = 18,
    MODULUS = 19,
    MULTIPLY = 20,
    PLUS = 21,
    CONCATENATE = 22,
}
