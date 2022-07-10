/**
 * Extracted from http://www.w3schools.com/sql/sql_functions.asp
 */
export var SqlFunction;
(function (SqlFunction) {
    // SQL Aggregate Functions
    // SQL aggregate functions return a single value, calculated from values in a column.
    // Useful Aggregate functions:
    SqlFunction["ABS"] = "ABS";
    SqlFunction["AVG"] = "AVG";
    SqlFunction["COUNT"] = "COUNT";
    //FIRST, // not in SqLite: Returns the first value
    //LAST, // not in SqLite: Returns the last value
    SqlFunction["MAX"] = "MAX";
    SqlFunction["MIN"] = "MIN";
    SqlFunction["SUM"] = "SUM";
    //SQL Scalar functions
    //SQL scalar functions return a single value, based on the input value.
    // Useful scalar functions:
    SqlFunction["UCASE"] = "UCASE";
    SqlFunction["LCASE"] = "LCASE";
    SqlFunction["MID"] = "MID";
    SqlFunction["LEN"] = "LEN";
    SqlFunction["ROUND"] = "ROUND";
    SqlFunction["NOW"] = "NOW";
    SqlFunction["FORMAT"] = "FORMAT";
    // Added
    SqlFunction["REPLACE"] = "REPLACE";
    SqlFunction["TRIM"] = "TRIM";
    // Other
    SqlFunction["DISTINCT"] = "DISTINCT";
    SqlFunction["EXISTS"] = "EXISTS";
    // Algebra Operators
    SqlFunction["DIVIDE"] = "DIVIDE";
    SqlFunction["MINUS"] = "MINUS";
    SqlFunction["MODULUS"] = "MODULUS";
    SqlFunction["MULTIPLY"] = "MULTIPLY";
    SqlFunction["PLUS"] = "PLUS";
    // Concatenate '||' functions
    SqlFunction["CONCATENATE"] = "CONCATENATE";
    // Other functions
    SqlFunction["COALESCE"] = "COALESCE";
})(SqlFunction || (SqlFunction = {}));
//# sourceMappingURL=Functions.js.map