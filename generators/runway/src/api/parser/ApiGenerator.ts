import {
    IApiObject,
    IApplicationApi
} from '@airport/check-in';
import { stringify } from 'querystring';
import * as ts from 'typescript';
import tsc from 'typescript';
import { FileImports } from '../../ddl/parser/FileImports';
import { ImportManager } from '../../ddl/parser/ImportManager';
import { forEach } from '../../ParserUtils';
import { normalizePath } from '../../resolve/pathResolver';

export interface IApiSignature {
    isAsync: boolean
    name: string,
    parameters: string[]
    returnType: string
}

export interface IApiClass {
    className: string
    apiSignatures: IApiSignature[]
}

export interface IApiFileForGeneration {
    apiClasses: IApiClass[]
    fileName: string
    imports: FileImports,
    otherMemberDefinitions: string[]
}

export const currentApplicationApi: IApplicationApi = {
    apiObjectMap: {}
}

export const currentApiFileSignatureMap: {
    [filePath: string]: IApiFileForGeneration
} = {}

const printer = tsc.createPrinter({
    newLine: tsc.NewLineKind.LineFeed,
    removeComments: true
})

export function visitApiFile(
    node: ts.Node,
    path: string
): IApiObject {

    let fileObject = currentApiFileSignatureMap[path]

    if (!fileObject) {
        const pathFragments = normalizePath(path).split('/')
        fileObject = {
            apiClasses: [],
            fileName: pathFragments[pathFragments.length - 1],
            imports: null,
            otherMemberDefinitions: []
        }
        currentApiFileSignatureMap[path] = fileObject
    }

    switch (node.kind) {
        case tsc.SyntaxKind.ClassDeclaration:
            const classNode = <ts.ClassDeclaration>node
            const symbol = globalThis.checker.getSymbolAtLocation(classNode.name)
            if (!fileObject.imports) {
                fileObject.imports = ImportManager
                    .resolveImports(symbol.valueDeclaration.parent, path)
            }
            // This is a top level class, get its symbol
            const className = classNode.name.escapedText as string
            const apiArtifacts = serializeClass(symbol, className, path)
            if (apiArtifacts) {
                currentApplicationApi.apiObjectMap[className] = apiArtifacts.apiObject
                fileObject.apiClasses.push(apiArtifacts.apiClass)
            }
            break;
        case tsc.SyntaxKind.EnumDeclaration:
        case tsc.SyntaxKind.InterfaceDeclaration:
            fileObject.otherMemberDefinitions.push(printer.printNode(
                tsc.EmitHint.Unspecified, node, globalThis.currentSourceFile))
            break
        default:
            return
    }
}

function serializeClass(
    symbol: ts.Symbol,
    className: string,
    path: string
): {
    apiClass: IApiClass
    apiObject: IApiObject
} {

    const apiObject: IApiObject = {
        operationMap: {}
    }

    const apiClass: IApiClass = {
        className,
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
                    apiClass.apiSignatures.push({
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
        apiClass,
        apiObject
    } : null
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
