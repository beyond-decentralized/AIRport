import {
    IApiObject,
    IApplicationApi
} from '@airport/check-in';
import * as ts from 'typescript';
import tsc from 'typescript';
import { FileImports } from '../../ddl/parser/FileImports';
import { ImportManager } from '../../ddl/parser/ImportManager';
import { forEach } from '../../ParserUtils';

export interface IApiSignature {
    isAsync: boolean
    name: string,
    parameters: string[]
    returnType: string
}

export interface IApiFileForGeneration {
    className: string
    apiSignatures: IApiSignature[]
    imports: FileImports,
}

export const currentApplicationApi: IApplicationApi = {
    apiObjectMap: {}
}

export const currentApiFileSignatures: IApiFileForGeneration[] = []

const printer = tsc.createPrinter({
    newLine: tsc.NewLineKind.LineFeed,
    removeComments: true
})

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

    const {
        apiObject,
        signatureObject
    } = serializeClass(symbol, className, path)

    if (apiObject) {
        currentApplicationApi.apiObjectMap['I' + className] = apiObject
        currentApiFileSignatures.push(signatureObject)
    }
}

function serializeClass(
    symbol: ts.Symbol,
    className: string,
    path: string
): {
    apiObject?: IApiObject,
    signatureObject?: IApiFileForGeneration
} {

    const apiObject: IApiObject = {
        operationMap: {}
    }

    const imports = ImportManager
        .resolveImports(symbol.valueDeclaration.parent, path)

    const signatureObject: IApiFileForGeneration = {
        className,
        imports,
        apiSignatures: []
    }

    let numApiMethods = 0

    forEach(symbol.members, (
        memberName,
        member
    ) => {
        if (!member.valueDeclaration) {
            return {}
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
                    signatureObject.apiSignatures.push({
                        isAsync: methodDescriptor.isAsync,
                        name: methodDescriptor.name,
                        parameters: methodDescriptor.parameters,
                        returnType: methodDescriptor.returnType
                    })
                }
                break;
            default:
                break;
        }
    });

    return numApiMethods ? {
        apiObject,
        signatureObject
    } : {}
}

function serializeMethod(
    symbol: ts.Symbol,
    className: string,
    name: string,
    member: ts.Symbol,
): {
    isApiMethod: boolean,
    isAsync: boolean,
    name: string,
    returnType: string,
    parameters: string[]
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
    if (!isApiMethod) {
        return
    }

    // const name: string = member.escapedName as any;
    const declaration = member.valueDeclaration as any
    const parameters: string[] = [];
    for (const parameter of declaration.parameters) {
        parameters.push(printer.printNode(
            tsc.EmitHint.Unspecified, parameter, globalThis.currentSourceFile))
    }
    const returnType = printer.printNode(
        tsc.EmitHint.Unspecified, declaration.type, globalThis.currentSourceFile)

    return {
        isApiMethod,
        isAsync,
        name,
        parameters,
        returnType
    }
}
