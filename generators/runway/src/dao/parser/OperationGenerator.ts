import {
	JsonOperation,
	JsonOperationRule,
	JsonPersistRule,
	JsonPreparedQuery,
	OperationType
}                  from '@airport/ground-control';
import * as ts     from 'typescript';
import tsc         from 'typescript';
import { DaoFile } from '../../ddl/parser/FileImports';

export const entityOperationMap: {
	[entityName: string]: {
		[operationName: string]: JsonOperation
	}
} = {};
export const entityOperationPaths: {
	[entityName: string]: string
} = {};

// let currentFileImports
const daoFileMap: { [classPath: string]: DaoFile } = {};
const daoMap: { [name: string]: boolean }          = {};

// const fileImportsMapByFilePath: { [path: string]: FileImports } = {}

export function visitDaoFile(
	node: ts.Node,
	path: string
) {
	let file = daoFileMap[path];
	if (!file) {
		file             = {
			path,
			hasDao: false
		};
		daoFileMap[path] = file;
	}

	// let fileImports = fileImportsMapByFilePath[path]
	// if (!fileImports) {
	// 	fileImports                    = ImportManager.resolveImports(node.parent, file.path)
	// 	fileImportsMapByFilePath[path] = fileImports
	// }
	// currentFileImports = fileImports

	// This is a top level class, get its symbol
	let symbol = globalThis.checker
		.getSymbolAtLocation((<ts.ClassDeclaration>node).name);

	if (node.kind !== tsc.SyntaxKind.ClassDeclaration) {
		return;
	}

	if (file.hasDao) {
		throw new Error(`Cannot declare more than one DAO per file
	(or have multiple class definitions per file).`);
	}
	file.hasDao = true;

	let daoName = (<ts.ClassDeclaration>node).name.escapedText as string;

	if (daoMap[daoName]) {
		throw new Error(`Cannot declare multiple DAOs with the same name.`);
	}
	daoMap[daoName] = true;

	const entityName = daoName.substr(0, daoName.length - 3);

	entityOperationMap[entityName]   = serializeClass(symbol, daoName, entityName);
	entityOperationPaths[entityName] = path;
}

/** Serialize a class symbol information */
function serializeClass(
	symbol: ts.Symbol,
	daoName: string,
	entityName: string
): { [operationName: string]: JsonOperation } {
	let daoOperations = {};

	forEach(symbol.members, (
		memberName,
		member
	) => {
		if (!member.valueDeclaration) {
			return;
		}
		switch (member.valueDeclaration.kind) {
			case tsc.SyntaxKind.MethodDeclaration:
				console.log(`Method: ${memberName}`);
				serializeMethod(symbol, daoName, entityName, memberName, member, daoOperations);
				break;
			case tsc.SyntaxKind.PropertyDeclaration:
				console.log(`Property: ${memberName}`);
				serializeProperty(symbol, daoName, entityName, memberName, member, daoOperations);
				break;
			default:
				break;
		}
	});

	return daoOperations;
}

function serializeMethod(
	symbol: ts.Symbol,
	daoName: string,
	entityName: string,
	memberName: string,
	member,
	daoOperations: { [operationName: string]: JsonOperation }
) {
	member.valueDeclaration.decorators.forEach(decorator => {
		// decorator.expression.kind = 196 CallExpression
		// decorator.expression.expression.kind = 75 Identifier
		if (decorator.expression.expression.escapedText !== 'PreparedQuery') {
			return;
		}
		const preparedQuery: JsonPreparedQuery = {
			type: OperationType.QUERY,
			query: undefined
		};
		daoOperations[memberName]              = preparedQuery;
	});
}

function serializeProperty(
	symbol: ts.Symbol,
	daoName: string,
	entityName: string,
	memberName: string,
	member,
	daoOperations: { [operationName: string]: JsonOperation }
) {

	const expression: ts.PropertyAccessExpression = member.valueDeclaration.initializer;
	if (expression.kind !== tsc.SyntaxKind.PropertyAccessExpression) {
		return;
	}
	if (expression.expression.kind !== tsc.SyntaxKind.ThisKeyword) {
		return;
	}

	member.valueDeclaration.decorators.forEach(decorator => {
		// decorator.expression.kind = 196 CallExpression
		// decorator.expression.expression.kind = 75 Identifier
		if (decorator.expression.expression.escapedText !== 'Persist') {
			return;
		}

		const typeArguments = decorator.expression.typeArguments;

		if (!typeArguments || typeArguments[0].typeName.escapedText !== `${entityName}Graph`) {
			throw new Error(`@Persist decorator in "${daoName}" must be passed a generic parameter "${entityName}Graph":
				@Persist<${entityName}Graph>({
					...
				})
				${memberName} = ...
				`);
		}

		let type: OperationType;
		switch (expression.name.escapedText) {
			case 'delete':
				type = OperationType.DELETE;
				break;
			case 'save':
				type = OperationType.SAVE;
				break;
			default:
				throw new Error(`Unsupported operation in "${daoName}": "this.${expression.name.escapedText}".
							Expecting one of the following:
							
							${memberName} = this.delete
							${memberName} = this.save
							`);
		}

		// decorator.expression.arguments[0].kind = 193 ObjectLiteralExpression
		const rules: ts.ObjectLiteralExpression = decorator.expression.arguments[0];
		const operationRule: JsonPersistRule    = {
			type
		};
		serializeRules(rules, operationRule);

		daoOperations[memberName] = operationRule;
	});
}

function serializeRules(
	objectLiteralExpression: ts.ObjectLiteralExpression,
	parentRule: JsonPersistRule
) {
	parentRule.subRules = {};
	objectLiteralExpression.properties.forEach((
		property: ts.PropertyAssignment,
		index
	) => {
		const rule = serializeRule(property.initializer as any, {});
		let name   = property.name as ts.Identifier;
		parentRule.subRules[name.escapedText as string]
		           = rule;
	});
}

function serializeRule(
	initializer: ts.ArrayLiteralExpression | ts.BinaryExpression
		| ts.CallExpression | ts.Identifier | ts.NullLiteral
		| ts.NumericLiteral | ts.ObjectLiteralExpression,
	rule: JsonOperationRule
): JsonOperationRule {
	if (initializer.kind === tsc.SyntaxKind.BinaryExpression) {
		const operatorKind = initializer.operatorToken.kind;
		if (operatorKind === tsc.SyntaxKind.BarBarToken) {
			rule.operator = '|';
		} else {
			throw new Error('Unsupported BinaryExpression.operatorToken.kind in @Persist rule: '
				+ operatorKind);
		}
		rule.subRules = {
			left: serializeRule(initializer.left as any, {}),
			right: serializeRule(initializer.right as any, {}),
		};
	} else if (initializer.kind === tsc.SyntaxKind.Identifier
		&& initializer.escapedText === 'Y') {
		rule.anyValue = true;
	} else if (initializer.kind === tsc.SyntaxKind.NullKeyword) {
		rule.isNull = true;
	} else if (initializer.kind === tsc.SyntaxKind.NumericLiteral) {
		rule.numericValue = parseInt(initializer.text);
	} else if (initializer.kind === tsc.SyntaxKind.ObjectLiteralExpression) {
		serializeRules(initializer, rule);
	} else if (initializer.kind === tsc.SyntaxKind.ArrayLiteralExpression) {
		rule.isArray  = true;
		// serializeRules(initializer, rule)
		rule.subRules = [];
		initializer.elements.forEach((
			subInitializer
		) => {
			const subRule = serializeRule(subInitializer as any, {});
			(rule.subRules as JsonOperationRule[]).push(subRule);
		});
	} else if (initializer.kind === tsc.SyntaxKind.CallExpression
		&& (initializer.expression as ts.Identifier).escapedText === 'ANOTHER') {
		if (initializer.arguments.length === 1) {
			rule.functionCall = {
				functionName: 'ANOTHER',
				parameters: [
					getNumericFunctionCallArgument(initializer.arguments[0], 'ANOTHER')
				]
			};
		} else if (initializer.arguments.length === 2) {
			rule.functionCall = {
				functionName: 'ANOTHER',
				parameters: [
					getNumericFunctionCallArgument(initializer.arguments[0], 'ANOTHER'),
					getNumericFunctionCallArgument(initializer.arguments[1], 'ANOTHER')
				]
			};
		} else {
			throw new Error(`Unsupported number of arguments in ANOTHER(X, Y?) call (in @Persist rule).
			Expecting either ANOTHER(X) or ANOTHER(X, Y).
			`);
		}
	} else {
		throw new Error('Unsupported syntax in @Persist rule');
	}

	return rule;
}

function getNumericFunctionCallArgument(
	argument,
	functionName: string
) {
	if (argument.kind !== tsc.SyntaxKind.NumericLiteral) {
		throw new Error(`Expecting only Numeric Literals as parameters to "${functionName}" function call.`);
	}
	return parseInt(argument.text);
}

function forEach(
	collection,
	callback: {
		(
			key: string,
			item: any
		): void
	}
) {
	if (collection instanceof Map) {
		for (let [key, value] of collection.entries()) {
			callback(key, value);
		}
	} else {
		for (let memberName in collection) {
			callback(memberName, collection[memberName]);
		}
	}
}
