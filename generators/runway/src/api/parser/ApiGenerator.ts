import {
    IApiObject,
    ISchemaApi
} from '@airport/check-in';
import * as ts from 'typescript';
import tsc from 'typescript';
import { forEach } from '../../ParserUtils';

export const currentSchemaApi: ISchemaApi = {
    apiObjectMap: {}
}

export function visitApiFile(
    node: ts.Node,
    path: string
): IApiObject {
    if (node.kind !== tsc.SyntaxKind.ClassDeclaration) {
        return
    }

    const classNode = <ts.ClassDeclaration>node
    // This is a top level class, get its symbol
    const symbol = globalThis.checker.getSymbolAtLocation(classNode.name)
    const className = classNode.name.escapedText as string

    const apiObject = serializeClass(symbol, className)

    if (apiObject) {
        currentSchemaApi.apiObjectMap['I' + className] = apiObject
    }
}

function serializeClass(
    symbol: ts.Symbol,
    className: string
): IApiObject {

    const apiObject: IApiObject = {
        operationMap: {}
    }
    let numApiMethods = 0

    forEach(symbol.members, (
        memberName,
        member
    ) => {
        if(!member.valueDeclaration) {
            return
        }
        switch (member.valueDeclaration.kind) {
            case tsc.SyntaxKind.MethodDeclaration:
                let methodDescriptor = serializeMethod(
                    symbol, className, memberName, member);
                if (methodDescriptor && methodDescriptor.isApiMethod) {
                    numApiMethods++
                    apiObject.operationMap[memberName] = {
                        isAsync: methodDescriptor.isAsync,
                        parameters: []
                    }
                }
                break;
            default:
                break;
        }
    });

    return numApiMethods ? apiObject : null
}

function serializeMethod(
    symbol: ts.Symbol,
    className: string,
    memberName: string,
    member: ts.Symbol,
): {
    isApiMethod: boolean,
    isAsync: boolean
} {
    if (!member.valueDeclaration.decorators) {
        return
    }
    let isApiMethod = false
    let isAsync = false
    for (let modifier of member.declarations[0].modifiers) {
        if (modifier.kind === tsc.SyntaxKind.AsyncKeyword) {
            isAsync = true
        }
    }
    member.valueDeclaration.decorators.forEach(decorator => {
        // decorator.expression.kind = 196 CallExpression
        // decorator.expression.expression.kind = 75 Identifier
        let decoratorNameExpression = (decorator.expression as any).expression
        const decoratorNameParts = []
        while (decoratorNameExpression) {
            if (decoratorNameExpression.escapedText) {
                decoratorNameParts.unshift(decoratorNameExpression.escapedText)
            } else if (decoratorNameExpression.name) {
                decoratorNameParts.unshift(decoratorNameExpression.name.escapedText)
            }
            decoratorNameExpression = decoratorNameExpression.expression
        }
        const decoratorName = decoratorNameParts.join('.')

        switch (decoratorName) {
            case 'Api':
                isApiMethod = true
                break;
            default:
                break;
        }
    });

    return {
        isApiMethod,
        isAsync
    }
}
