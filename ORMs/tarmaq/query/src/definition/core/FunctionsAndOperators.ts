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
} from './field/Functions';
import {
	boolFunction,
	dateFunction,
	numFunction,
	strFunction
} from './field/WrapperFunctions';
import {
	andOperator,
	notOperator,
	orOperator
} from './operation/LogicalOperation';

export interface FunctionsAndOperators {
	abs: absFunction;
	avg: avgFunction;
	count: countFunction;
	max: maxFunction;
	min: minFunction;
	sum: sumFunction;
	ucase: ucaseFunction;
	lcase: lcaseFunction;
	mid: midFunction;
	len: lenFunction;
	round: roundFunction;
	now: nowFunction;
	format: formatFunction;
	replace: replaceFunction;
	trim: trimFunction;
	distinct: distinctFunction;
	exists: existsFunction;
	divide: divideFunction;
	subtract: subtractFunction;
	modulus: modulusFunction;
	multiply: multiplyFunction;
	add: addFunction;
	concat: concatenateFunction;
	union: unionFunction;
	unionAll: unionAllFunction;
	intersect: intersectFunction;
	minus: minusFunction;
	// logical operators
	and: andOperator;
	not: notOperator;
	or: orOperator;
	// wraper functions
	bool: boolFunction;
	date: dateFunction;
	num: numFunction;
	str: strFunction;
	wrapPrimitive: { (value: any): any };
}