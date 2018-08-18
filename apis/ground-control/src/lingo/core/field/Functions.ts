/*
 * Serialized representation of a SQL function call.
 */
export interface JSONSqlFunctionCall {
	// Function Type
	// Type of SQL function
	ft: SqlFunction,
	// Parameters
	// Function parameters
	p: any[];
}

/**
 * Extracted from http://www.w3schools.com/sql/sql_functions.asp
 */
export enum SqlFunction {
	// SQL Aggregate Functions
	// SQL aggregate functions return a single value, calculated from values in a column.
	// Useful Aggregate functions:
	ABS, // Returns absolute value of a number
	AVG, // Returns the average value
	COUNT, // Returns the number of rows
		//FIRST, // not in SqLite: Returns the first value
		//LAST, // not in SqLite: Returns the last value
	MAX, // Returns the largest value
	MIN, // Returns the smallest value
	SUM, // Returns the sum

		//SQL Scalar functions
		//SQL scalar functions return a single value, based on the input value.
		// Useful scalar functions:
	UCASE, // Converts a field to upper case
	LCASE, // Converts a field to lower case
	MID, // Extract characters from a text field
	LEN, // Returns the length of a text field
	ROUND, // Rounds a numeric field to the number of decimals specified
	NOW, // Returns the current system date and time
	FORMAT, // Formats how a field is to be displayed
		// Added
	REPLACE, // REPLACE(X, Y, Z) in string X, replace Y with Z
	TRIM, // Trims a string
		// Other
	DISTINCT, // Used for select clauses
	EXISTS, // used in where clauses

		// Algebra Operators
	DIVIDE, // A / B
	MINUS, // A - B
	MODULUS, // A % B
	MULTIPLY, // A * B
	PLUS, // A + B

		// Concatenate '||' functions
	CONCATENATE,

		// Other functions
	COALESCE
}
