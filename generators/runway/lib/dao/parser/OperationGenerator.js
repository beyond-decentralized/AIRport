import { OperationType } from '@airport/ground-control';
import tsc from 'typescript';
export const entityOperationMap = {};
export const entityOperationPaths = {};
// let currentFileImports
const daoFileMap = {};
const daoMap = {};
// const fileImportsMapByFilePath: { [path: string]: FileImports } = {}
export function visitDaoFile(node, path) {
    let file = daoFileMap[path];
    if (!file) {
        file = {
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
        .getSymbolAtLocation(node.name);
    if (node.kind !== tsc.SyntaxKind.ClassDeclaration) {
        return;
    }
    if (file.hasDao) {
        throw new Error(`Cannot declare more than one DAO per file
	(or have multiple class definitions per file).`);
    }
    file.hasDao = true;
    let daoName = node.name.escapedText;
    if (daoMap[daoName]) {
        throw new Error(`Cannot declare multiple DAOs with the same name.`);
    }
    daoMap[daoName] = true;
    const entityName = daoName.substr(0, daoName.length - 3);
    entityOperationMap[entityName] = serializeClass(symbol, daoName, entityName);
    entityOperationPaths[entityName] = path;
}
/** Serialize a class symbol information */
function serializeClass(symbol, daoName, entityName) {
    let daoOperations = {};
    forEach(symbol.members, (memberName, member) => {
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
function serializeMethod(symbol, daoName, entityName, memberName, member, daoOperations) {
    if (!member.valueDeclaration.decorators) {
        return;
    }
    member.valueDeclaration.decorators.forEach(decorator => {
        // decorator.expression.kind = 196 CallExpression
        // decorator.expression.expression.kind = 75 Identifier
        if (decorator.expression.expression.escapedText !== 'PreparedQuery') {
            return;
        }
        const preparedQuery = {
            type: OperationType.QUERY,
            query: undefined
        };
        daoOperations[memberName] = preparedQuery;
    });
}
function serializeProperty(symbol, daoName, entityName, memberName, member, daoOperations) {
    const expression = member.valueDeclaration.initializer;
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
        let type;
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
        const rules = decorator.expression.arguments[0];
        const operationRule = {
            type
        };
        serializeRules(rules, operationRule);
        daoOperations[memberName] = operationRule;
    });
}
function serializeRules(objectLiteralExpression, parentRule) {
    parentRule.subRules = {};
    objectLiteralExpression.properties.forEach((property, index) => {
        const rule = serializeRule(property.initializer, {});
        let name = property.name;
        parentRule.subRules[name.escapedText]
            = rule;
    });
}
function serializeRule(initializer, rule) {
    if (initializer.kind === tsc.SyntaxKind.BinaryExpression) {
        const operatorKind = initializer.operatorToken.kind;
        if (operatorKind === tsc.SyntaxKind.BarBarToken) {
            rule.operator = '|';
        }
        else {
            throw new Error('Unsupported BinaryExpression.operatorToken.kind in @Persist rule: '
                + operatorKind);
        }
        rule.subRules = {
            left: serializeRule(initializer.left, {}),
            right: serializeRule(initializer.right, {}),
        };
    }
    else if (initializer.kind === tsc.SyntaxKind.Identifier
        && initializer.escapedText === 'Y') {
        rule.anyValue = true;
    }
    else if (initializer.kind === tsc.SyntaxKind.NullKeyword) {
        rule.isNull = true;
    }
    else if (initializer.kind === tsc.SyntaxKind.NumericLiteral) {
        rule.numericValue = parseInt(initializer.text);
    }
    else if (initializer.kind === tsc.SyntaxKind.ObjectLiteralExpression) {
        serializeRules(initializer, rule);
    }
    else if (initializer.kind === tsc.SyntaxKind.ArrayLiteralExpression) {
        rule.isArray = true;
        // serializeRules(initializer, rule)
        rule.subRules = [];
        initializer.elements.forEach((subInitializer) => {
            const subRule = serializeRule(subInitializer, {});
            rule.subRules.push(subRule);
        });
    }
    else if (initializer.kind === tsc.SyntaxKind.CallExpression
        && initializer.expression.escapedText === 'ANOTHER') {
        if (initializer.arguments.length === 1) {
            rule.functionCall = {
                functionName: 'ANOTHER',
                parameters: [
                    getNumericFunctionCallArgument(initializer.arguments[0], 'ANOTHER')
                ]
            };
        }
        else if (initializer.arguments.length === 2) {
            rule.functionCall = {
                functionName: 'ANOTHER',
                parameters: [
                    getNumericFunctionCallArgument(initializer.arguments[0], 'ANOTHER'),
                    getNumericFunctionCallArgument(initializer.arguments[1], 'ANOTHER')
                ]
            };
        }
        else {
            throw new Error(`Unsupported number of arguments in ANOTHER(X, Y?) call (in @Persist rule).
			Expecting either ANOTHER(X) or ANOTHER(X, Y).
			`);
        }
    }
    else {
        throw new Error('Unsupported syntax in @Persist rule');
    }
    return rule;
}
function getNumericFunctionCallArgument(argument, functionName) {
    if (argument.kind !== tsc.SyntaxKind.NumericLiteral) {
        throw new Error(`Expecting only Numeric Literals as parameters to "${functionName}" function call.`);
    }
    return parseInt(argument.text);
}
function forEach(collection, callback) {
    if (collection instanceof Map) {
        for (let [key, value] of collection.entries()) {
            callback(key, value);
        }
    }
    else {
        for (let memberName in collection) {
            callback(memberName, collection[memberName]);
        }
    }
}
//# sourceMappingURL=OperationGenerator.js.map