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
            // case tsc.SyntaxKind.MethodDeclaration:
            // 	serializeMethod(symbol, daoName, entityName, memberName, member, daoOperations);
            // 	break;
            case tsc.SyntaxKind.PropertyDeclaration:
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
    });
}
function serializeProperty(symbol, daoName, entityName, memberName, member, daoOperations) {
    // Property assignment does not appear to be needed by the Typescript
    // compiler in order for the class to adhere to the interface
    // const expression: ts.PropertyAccessExpression = member.valueDeclaration.initializer;
    // if (expression.kind !== tsc.SyntaxKind.PropertyAccessExpression) {
    // 	return;
    // }
    // if (expression.expression.kind !== tsc.SyntaxKind.ThisKeyword) {
    // 	return;
    // }
    let operationFound = null;
    member.valueDeclaration.decorators.forEach(decorator => {
        // decorator.expression.kind = 196 CallExpression
        // decorator.expression.expression.kind = 75 Identifier
        let decoratorNameExpression = decorator.expression.expression;
        const decoratorNameParts = [];
        while (decoratorNameExpression) {
            if (decoratorNameExpression.escapedText) {
                decoratorNameParts.unshift(decoratorNameExpression.escapedText);
            }
            else if (decoratorNameExpression.name) {
                decoratorNameParts.unshift(decoratorNameExpression.name.escapedText);
            }
            decoratorNameExpression = decoratorNameExpression.expression;
        }
        const decoratorName = decoratorNameParts.join('.');
        if (decoratorNameParts.length !== 2 && decoratorNameParts.length !== 3) {
            throwUnsupportedDecorator(daoName, decoratorName);
        }
        if (decoratorNameParts[0] !== daoName) {
            throwUnsupportedDecorator(daoName, decoratorName);
        }
        switch (decoratorNameParts[1]) {
            case 'Delete':
            case 'Save':
                if (decoratorNameParts.length !== 2) {
                    throwUnsupportedDecorator(daoName, decoratorName);
                }
                if (operationFound) {
                    throwMultipleOperationDecorators(daoName, operationFound, decoratorName);
                }
                operationFound = decoratorName;
                break;
            case 'Find':
            case 'FindOne':
            case 'Search':
            case 'SearchOne':
                if (decoratorNameParts.length !== 3) {
                    throwUnsupportedDecorator(daoName, decoratorName);
                }
                switch (decoratorNameParts[2]) {
                    case 'Graph':
                    case 'Tree':
                        break;
                    default:
                        throwUnsupportedDecorator(daoName, decoratorName);
                }
                if (operationFound) {
                    throwMultipleOperationDecorators(daoName, operationFound, decoratorName);
                }
                operationFound = decoratorName;
                break;
            default:
        }
        switch (decoratorNameParts[1]) {
            case 'Delete':
                serializeDelete(daoName, daoOperations, decorator, entityName, memberName);
                break;
            case 'Save':
                serializeSave(daoName, daoOperations, decorator, entityName, memberName);
                break;
            case 'Find':
                switch (decoratorNameParts[2]) {
                    case 'Graph':
                        serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, OperationType.FIND_GRAPH);
                        break;
                    case 'Tree':
                        serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, OperationType.FIND_TREE);
                        break;
                }
                break;
            case 'FindOne':
                switch (decoratorNameParts[2]) {
                    case 'Graph':
                        serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, OperationType.FIND_ONE_GRAPH);
                        break;
                    case 'Tree':
                        serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, OperationType.FIND_ONE_TREE);
                        break;
                }
                break;
            case 'Search':
                switch (decoratorNameParts[2]) {
                    case 'Graph':
                        serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, OperationType.SEARCH_GRAPH);
                        break;
                    case 'Tree':
                        serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, OperationType.SEARCH_TREE);
                        break;
                }
                break;
            case 'SearchOne':
                switch (decoratorNameParts[2]) {
                    case 'Graph':
                        serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, OperationType.SEARCH_ONE_GRAPH);
                        break;
                    case 'Tree':
                        serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, OperationType.SEARCH_ONE_TREE);
                        break;
                }
                break;
        }
    });
}
function throwUnsupportedDecorator(daoName, decoratorName) {
    throw new Error(`In ${daoName}:
Unexpected decorator:
  @${decoratorName}
Following decorators are currently supported for ${daoName}:
  @${daoName}.Delete
  @${daoName}.Find.Graph
  @${daoName}.Find.Tree
  @${daoName}.FindOne.Graph
  @${daoName}.FindOne.Tree
  @${daoName}.Save
  @${daoName}.Search.Graph
  @${daoName}.Search.Tree
  @${daoName}.SearchOne.Graph
  @${daoName}.SearchOne.Tree
`);
}
function throwMultipleOperationDecorators(daoName, decoratorName1, decoratorName2) {
    throw new Error(`In ${daoName}:
More than one operation decorator found on the same property:
  @${decoratorName1}
  @${decoratorName2}
Only one operation is supported per property.
`);
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
function serializeSave(daoName, daoOperations, decorator, entityName, memberName) {
    const typeArguments = decorator.expression.typeArguments;
    // if (!typeArguments || typeArguments[0].typeName.escapedText !== `${entityName}Graph`) {
    // 	throw new Error(`@Persist decorator in "${daoName}" must be passed a generic parameter "${entityName}Graph":
    // 			@Persist<${entityName}Graph>({
    // 				...
    // 			})
    // 			${memberName} = ...
    // 			`);
    // }
    // decorator.expression.arguments[0].kind = 193 ObjectLiteralExpression
    const rules = decorator.expression.arguments[0];
    const operationRule = {
        type: OperationType.SAVE
    };
    serializeRules(rules, operationRule);
    daoOperations[memberName] = operationRule;
}
function serializeQuery(daoName, daoOperations, decorator, decoratorName, entityName, memberName, type) {
    const typeArguments = decorator.expression.typeArguments;
    const expression = decorator.expression.arguments[0];
    if (!expression) {
        throw new Error(`In ${daoName}:
No callback provided for:
  @${decoratorName}(...)
  ${memberName}
A callback must be provided in the following format:
  @${decoratorName}((
    paramA: boolean,
    paramB: Date,
    paramC: number,
    paramD: string,
    ...
    Q: QLocalSchema,
    alias1: QEntity1,
    alias2: QEntity1,
    ...
  ) => ({
    select: {
      propertyA: Y,
      ...
      relationA: {
        ...
      },
      ...
    },
    from: [
      alias1 = Q.Entity1,
      alias2 = alias1.relationA.innerJoin()
      ...
    ],
    where?: and(
      alias1.propertyA.equals(paramA),
      alias1.propertyB.notEquals(paramB),
      alias1.propertyC.greaterThan(paramC),
      alias1.propertyD.like(paramD),
      ...
      ),
    orderBy?: [alias.propertyA, ...],
    limit?: 123,
    offset?: 456
      
  }))
  ${memberName}
  
Where: 
  paramA-N  are any number of parameters of types (boolean, Date, number, string)
  Q         is the reference to the schema's QLocalSchema object (in generated folder)
  alias1-N  are any number of entity aliases for QObjects (in generated folder or in other schemas)

The body of the function should only contain the query definition and no other
statements.
`);
    }
    const callbackParameters = expression.locals;
    const operationRule = {
        expression,
        query: null,
        type
    };
    daoOperations[memberName] = operationRule;
}
function serializeDelete(daoName, daoOperations, decorator, entityName, memberName) {
    // const typeArguments = decorator.expression.typeArguments;
    // decorator.expression.arguments[0].kind = 193 ObjectLiteralExpression
    const rules = decorator.expression.arguments[0];
    const operationRule = {
        type: OperationType.DELETE
    };
    serializeRules(rules, operationRule);
    daoOperations[memberName] = operationRule;
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