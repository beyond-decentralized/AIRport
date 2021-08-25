import { IApiObject } from '@airport/security-check';
import * as ts from 'typescript';
import tsc from 'typescript';
import { forEach } from '../../ParserUtils';

export function visitApiFile(
    node: ts.Node,
    path: string
): IApiObject {
    if (node.kind !== tsc.SyntaxKind.ClassDeclaration) {
        return;
    }

    const classNode = <ts.ClassDeclaration>node;
    // This is a top level class, get its symbol
    let symbol = globalThis.checker.getSymbolAtLocation(classNode.name);
    let className = classNode.name.escapedText as string;

    serializeClass(symbol, className);
}

function serializeClass(
    symbol: ts.Symbol,
    className: string
): IApiObject {

    forEach(symbol.members, (
        memberName,
        member
    ) => {
        switch (member.valueDeclaration.kind) {
            case tsc.SyntaxKind.MethodDeclaration:
                let methodDescriptor = serializeMethod(
                    symbol, className, memberName, member);
                break;
            default:
                break;
        }
    });

    return {
        operationMap: {
            'methodName': {
                isAsync: true,
                parameters: []
            }
        }
    }
}

function serializeMethod(
    symbol: ts.Symbol,
    className: string,
    memberName: string,
    member
): {
    isApiMethod: boolean
} {
    if (!member.valueDeclaration.decorators) {
        return
    }
    let isApiMethod = false
    member.valueDeclaration.decorators.forEach(decorator => {
        // decorator.expression.kind = 196 CallExpression
        // decorator.expression.expression.kind = 75 Identifier
        let decoratorNameExpression = decorator.expression.expression
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
            case 'API':
                isApiMethod = true
                break;
            default:
                break;
        }
    });

    return {
        isApiMethod
    }
}
