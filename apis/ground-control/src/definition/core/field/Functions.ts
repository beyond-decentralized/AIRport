/*
 * Serialized representation of a SQL function call.
 */
export interface QueryFunctionCall {
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
	ABS = 'ABS', // Returns absolute value of a number
	AVG = 'AVG', // Returns the average value
	COUNT = 'COUNT', // Returns the number of rows
		//FIRST, // not in SqLite: Returns the first value
		//LAST, // not in SqLite: Returns the last value
	MAX = 'MAX', // Returns the largest value
	MIN = 'MIN', // Returns the smallest value
	SUM = 'SUM', // Returns the sum

		//SQL Scalar functions
		//SQL scalar functions return a single value, based on the input value.
		// Useful scalar functions:
	UCASE = 'UCASE', // Converts a field to upper case
	LCASE = 'LCASE', // Converts a field to lower case
	MID = 'MID', // Extract characters from a text field
	LEN = 'LEN', // Returns the length of a text field
	ROUND = 'ROUND', // Rounds a numeric field to the number of decimals specified
	NOW = 'NOW', // Returns the current system date and time
	FORMAT = 'FORMAT', // Formats how a field is to be displayed
		// Added
	REPLACE = 'REPLACE', // REPLACE(X, Y, Z) in string X, replace Y with Z
	TRIM = 'TRIM', // Trims a string
		// Other
	DISTINCT = 'DISTINCT', // Used for SELECT clauses
	EXISTS = 'EXISTS', // used in WHERE clauses

		// Algebra Operators
	DIVIDE = 'DIVIDE', // A / B
	MINUS = 'MINUS', // A - B
	MODULUS = 'MODULUS', // A % B
	MULTIPLY = 'MULTIPLY', // A * B
	PLUS = 'PLUS', // A + B

		// Concatenate '||' functions
	CONCATENATE = 'CONCATENATE',

		// Other functions
	COALESCE = 'COALESCE'
}
