"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Extracted from http://www.w3schools.com/sql/sql_functions.asp
 */
var SqlFunction;
(function (SqlFunction) {
    // SQL Aggregate Functions
    // SQL aggregate functions return a single value, calculated from values in a column.
    // Useful Aggregate functions:
    SqlFunction[SqlFunction["ABS"] = 0] = "ABS";
    SqlFunction[SqlFunction["AVG"] = 1] = "AVG";
    SqlFunction[SqlFunction["COUNT"] = 2] = "COUNT";
    //FIRST, // not in SqLite: Returns the first value
    //LAST, // not in SqLite: Returns the last value
    SqlFunction[SqlFunction["MAX"] = 3] = "MAX";
    SqlFunction[SqlFunction["MIN"] = 4] = "MIN";
    SqlFunction[SqlFunction["SUM"] = 5] = "SUM";
    //SQL Scalar functions
    //SQL scalar functions return a single value, based on the input value.
    // Useful scalar functions:
    SqlFunction[SqlFunction["UCASE"] = 6] = "UCASE";
    SqlFunction[SqlFunction["LCASE"] = 7] = "LCASE";
    SqlFunction[SqlFunction["MID"] = 8] = "MID";
    SqlFunction[SqlFunction["LEN"] = 9] = "LEN";
    SqlFunction[SqlFunction["ROUND"] = 10] = "ROUND";
    SqlFunction[SqlFunction["NOW"] = 11] = "NOW";
    SqlFunction[SqlFunction["FORMAT"] = 12] = "FORMAT";
    // Added
    SqlFunction[SqlFunction["REPLACE"] = 13] = "REPLACE";
    SqlFunction[SqlFunction["TRIM"] = 14] = "TRIM";
    // Other
    SqlFunction[SqlFunction["DISTINCT"] = 15] = "DISTINCT";
    SqlFunction[SqlFunction["EXISTS"] = 16] = "EXISTS";
    // Algebra Operators
    SqlFunction[SqlFunction["DIVIDE"] = 17] = "DIVIDE";
    SqlFunction[SqlFunction["MINUS"] = 18] = "MINUS";
    SqlFunction[SqlFunction["MODULUS"] = 19] = "MODULUS";
    SqlFunction[SqlFunction["MULTIPLY"] = 20] = "MULTIPLY";
    SqlFunction[SqlFunction["PLUS"] = 21] = "PLUS";
    // Concatenate '||' functions
    SqlFunction[SqlFunction["CONCATENATE"] = 22] = "CONCATENATE";
    // Other functions
    SqlFunction[SqlFunction["COALESCE"] = 23] = "COALESCE";
})(SqlFunction = exports.SqlFunction || (exports.SqlFunction = {}));
//# sourceMappingURL=Functions.js.map