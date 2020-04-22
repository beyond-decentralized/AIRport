import {
	JsonOperation,
	JsonOperationRule,
	OperationType
}                from '@airport/ground-control'
import * as ts   from 'typescript'
import {DaoFile} from '../../ddl/parser/FileImports'

export const entityOperationMap: {
	[entityName: string]: {
		[operationName: string]: JsonOperation
	}
} = {}

// let currentFileImports
const daoFileMap: { [classPath: string]: DaoFile } = {}
const daoMap: { [name: string]: boolean }          = {}

// const fileImportsMapByFilePath: { [path: string]: FileImports } = {}

export function visitDaoFile(
	node: ts.Node,
	path: string
) {
	let file = daoFileMap[path]
	if (!file) {
		file             = {
			path,
			hasDao: false
		}
		daoFileMap[path] = file
	}

	// let fileImports = fileImportsMapByFilePath[path]
	// if (!fileImports) {
	// 	fileImports                    = ImportManager.resolveImports(node.parent, file.path)
	// 	fileImportsMapByFilePath[path] = fileImports
	// }
	// currentFileImports = fileImports

	// This is a top level class, get its symbol
	let symbol = globalThis.checker
		.getSymbolAtLocation((<ts.ClassDeclaration>node).name)

	if (node.kind !== ts.SyntaxKind.ClassDeclaration) {
		return
	}

	if (file.hasDao) {
		throw new Error(`Cannot declare more than one DAO per file
	(or have multiple class definitions per file).`)
	}
	file.hasDao = true

	let daoName = (<ts.ClassDeclaration>node).name.escapedText as string

	if (daoMap[daoName]) {
		throw new Error(`Cannot declare multiple DAOs with the same name.`)
	}
	daoMap[daoName] = true

	const entityName = daoName.substr(0, daoName.length - 3)

	entityOperationMap[entityName] = serializeClass(symbol, daoName)
}

/** Serialize a class symbol information */
function serializeClass(
	symbol: ts.Symbol,
	daoName: string
): { [operationName: string]: JsonOperation } {
	let daoOperations = {}

	forEach(symbol.members, (
		memberName,
		member
	) => {
		if (!member.valueDeclaration) {
			return
		}
		switch (member.valueDeclaration.kind) {
			case ts.SyntaxKind.PropertyDeclaration:
				console.log(`Property: ${memberName}`)
				break
			default:
				return
		}

		const expression: ts.PropertyAccessExpression = member.valueDeclaration.initializer
		if (expression.kind !== ts.SyntaxKind.PropertyAccessExpression) {
			return
		}
		if (expression.expression.kind !== ts.SyntaxKind.ThisKeyword) {
			return
		}

		let type: OperationType

		switch (expression.name.escapedText) {
			case 'create':
				type = OperationType.CREATE
				break
			case 'delete':
				type = OperationType.DELETE
				break
			case 'save':
				type = OperationType.SAVE
				break
			case 'update':
				type = OperationType.UPDATE
				break
			default:
				throw new Error(`Unsupported operation in "${daoName}": "this.${expression.name.escapedText}".
							Expecting one of the following:
							
							${memberName} = this.create
							${memberName} = this.delete
							${memberName} = this.save
							${memberName} = this.update
							`)
		}

		member.valueDeclaration.decorators.forEach(decorator => {
			// decorator.expression.kind = 196 CallExpression
			// decorator.expression.expression.kind = 75 Identifier
			if (decorator.expression.expression.escapedText === 'Operation') {
				// decorator.expression.arguments[0].kind = 193 ObjectLiteralExpression
				const rules: ts.ObjectLiteralExpression = decorator.expression.arguments[0]
				const operationRule: JsonOperation      = {
					type
				}
				serializeRules(rules, operationRule)

				daoOperations[memberName] = operationRule
			}
		})
	})

	return daoOperations
}

function serializeRules(
	objectLiteralExpression: ts.ObjectLiteralExpression,
	parentRule: JsonOperationRule
) {
	parentRule.subRules = {}
	objectLiteralExpression.properties.forEach((
		property: ts.PropertyAssignment,
		index
	) => {
		const rule = serializeRule(property.initializer as any, {})
		let name   = property.name as ts.Identifier
		parentRule.subRules[name.escapedText as string]
		           = rule
	})
}

function serializeRule(
	initializer: ts.BinaryExpression | ts.Identifier
		| ts.NullLiteral | ts.NumericLiteral
		| ts.ObjectLiteralExpression,
	rule: JsonOperationRule
): JsonOperationRule {
	if (initializer.kind === ts.SyntaxKind.BinaryExpression) {
		const operatorKind = initializer.operatorToken.kind
		if (operatorKind === ts.SyntaxKind.BarBarToken) {
			rule.operator = '|'
		} else if (operatorKind === ts.SyntaxKind.AmpersandAmpersandToken) {
			rule.operator = '&'
		} else {
			throw new Error('Unsupported BinaryExpression.operatorToken.kind in save/update rules: '
				+ operatorKind)
		}
		rule.subRules = {
			left: serializeRule(initializer.left as any, {}),
			right: serializeRule(initializer.right as any, {}),
		}
	} else if (initializer.kind === ts.SyntaxKind.Identifier
		&& initializer.escapedText === 'Y') {
		rule.anyValue = true
	} else if (initializer.kind === ts.SyntaxKind.NullKeyword) {
		rule.isNull = true
	} else if (initializer.kind === ts.SyntaxKind.NumericLiteral) {
		rule.numericValue = parseInt(initializer.text)
	} else if (initializer.kind === ts.SyntaxKind.ObjectLiteralExpression) {
		serializeRules(initializer, rule)
	}

	return rule
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
			callback(key, value)
		}
	} else {
		for (let memberName in collection) {
			callback(memberName, collection[memberName])
		}
	}
}
