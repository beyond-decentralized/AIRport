import {
	absFunction,
	addFunction,
	avgFunction,
	concatenateFunction,
	countFunction,
	distinctFunction,
	divideFunction,
	existsFunction,
	formatFunction,
	intersectFunction,
	lcaseFunction,
	lenFunction,
	maxFunction,
	midFunction,
	minFunction,
	minusFunction,
	modulusFunction,
	multiplyFunction,
	nowFunction,
	replaceFunction,
	roundFunction,
	subtractFunction,
	sumFunction,
	trimFunction,
	ucaseFunction,
	unionAllFunction,
	unionFunction,
} from './field/IQFunctions';
import {
	boolFunction,
	dateFunction,
	numFunction,
	strFunction
} from './field/IQWrapperFunctions';
import {
	andOperator,
	notOperator,
	orOperator
} from './operation/ILogicalOperation';

export interface IFunctionsAndOperators {
	ABS: absFunction;
	AVG: avgFunction;
	COUNT: countFunction;
	MAX: maxFunction;
	MIN: minFunction;
	SUM: sumFunction;
	UCASE: ucaseFunction;
	LCASE: lcaseFunction;
	MID: midFunction;
	LEN: lenFunction;
	ROUND: roundFunction;
	NOW: nowFunction;
	FORMAT: formatFunction;
	REPLACE: replaceFunction;
	TRIM: trimFunction;
	DISTINCT: distinctFunction;
	EXISTS: existsFunction;
	DIVIDE: divideFunction;
	SUBTRACT: subtractFunction;
	MODULUS: modulusFunction;
	MULTIPLY: multiplyFunction;
	ADD: addFunction;
	CONCAT: concatenateFunction;
	UNION: unionFunction;
	UNION_ALL: unionAllFunction;
	INTERSECT: intersectFunction;
	MINUS: minusFunction;
	// logical operators
	AND: andOperator;
	NOT: notOperator;
	OR: orOperator;
	// wraper functions
	bool: boolFunction;
	date: dateFunction;
	num: numFunction;
	str: strFunction;
	wrapPrimitive: { (value: any): any };
}