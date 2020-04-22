"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const ts = require("typescript");
exports.entityOperationMap = {};
// let currentFileImports
const daoFileMap = {};
const daoMap = {};
// const fileImportsMapByFilePath: { [path: string]: FileImports } = {}
function visitDaoFile(node, path) {
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
    if (node.kind !== ts.SyntaxKind.ClassDeclaration) {
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
    exports.entityOperationMap[entityName] = serializeClass(symbol, daoName);
}
exports.visitDaoFile = visitDaoFile;
/** Serialize a class symbol information */
function serializeClass(symbol, daoName) {
    let daoOperations = {};
    forEach(symbol.members, (memberName, member) => {
        if (!member.valueDeclaration) {
            return;
        }
        switch (member.valueDeclaration.kind) {
            case ts.SyntaxKind.PropertyDeclaration:
                console.log(`Property: ${memberName}`);
                break;
            default:
                return;
        }
        const expression = member.valueDeclaration.initializer;
        if (expression.kind !== ts.SyntaxKind.PropertyAccessExpression) {
            return;
        }
        if (expression.expression.kind !== ts.SyntaxKind.ThisKeyword) {
            return;
        }
        member.valueDeclaration.decorators.forEach(decorator => {
            // decorator.expression.kind = 196 CallExpression
            // decorator.expression.expression.kind = 75 Identifier
            if (decorator.expression.expression.escapedText !== 'Persist') {
                return;
            }
            let type;
            switch (expression.name.escapedText) {
                case 'create':
                    type = ground_control_1.OperationType.CREATE;
                    break;
                case 'delete':
                    type = ground_control_1.OperationType.DELETE;
                    break;
                case 'save':
                    type = ground_control_1.OperationType.SAVE;
                    break;
                case 'update':
                    type = ground_control_1.OperationType.UPDATE;
                    break;
                default:
                    throw new Error(`Unsupported operation in "${daoName}": "this.${expression.name.escapedText}".
							Expecting one of the following:
							
							${memberName} = this.create
							${memberName} = this.delete
							${memberName} = this.save
							${memberName} = this.update
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
    });
    return daoOperations;
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
    if (initializer.kind === ts.SyntaxKind.BinaryExpression) {
        const operatorKind = initializer.operatorToken.kind;
        if (operatorKind === ts.SyntaxKind.BarBarToken) {
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
    else if (initializer.kind === ts.SyntaxKind.Identifier
        && initializer.escapedText === 'Y') {
        rule.anyValue = true;
    }
    else if (initializer.kind === ts.SyntaxKind.NullKeyword) {
        rule.isNull = true;
    }
    else if (initializer.kind === ts.SyntaxKind.NumericLiteral) {
        rule.numericValue = parseInt(initializer.text);
    }
    else if (initializer.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        serializeRules(initializer, rule);
    }
    else if (initializer.kind === ts.SyntaxKind.ArrayLiteralExpression) {
        rule.isArray = true;
        // serializeRules(initializer, rule)
        rule.subRules = [];
        initializer.elements.forEach((subInitializer) => {
            const subRule = serializeRule(subInitializer, {});
            rule.subRules.push(subRule);
        });
    }
    else if (initializer.kind === ts.SyntaxKind.CallExpression
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
    if (argument.kind !== ts.SyntaxKind.NumericLiteral) {
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