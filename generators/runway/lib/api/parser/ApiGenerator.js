import tsc from 'typescript';
import { ImportManager } from '../../ddl/parser/ImportManager';
import { forEach } from '../../ParserUtils';
export const currentApplicationApi = {
    apiObjectMap: {}
};
export const currentApiFileSignatureMap = {};
const printer = tsc.createPrinter({
    newLine: tsc.NewLineKind.LineFeed,
    removeComments: true
});
export function visitApiFile(node, path) {
    let fileObject = currentApiFileSignatureMap[path];
    if (!fileObject) {
        const pathFragments = path.split('/');
        fileObject = {
            apiClasses: [],
            fileName: pathFragments[pathFragments.length - 1],
            imports: null,
            otherMemberDefinitions: []
        };
        currentApiFileSignatureMap[path] = fileObject;
    }
    switch (node.kind) {
        case tsc.SyntaxKind.ClassDeclaration:
            const classNode = node;
            const symbol = globalThis.checker.getSymbolAtLocation(classNode.name);
            if (!fileObject.imports) {
                fileObject.imports = ImportManager
                    .resolveImports(symbol.valueDeclaration.parent, path);
            }
            // This is a top level class, get its symbol
            const className = classNode.name.escapedText;
            const apiArtifacts = serializeClass(symbol, className, path);
            if (apiArtifacts) {
                currentApplicationApi.apiObjectMap[className] = apiArtifacts.apiObject;
                fileObject.apiClasses.push(apiArtifacts.apiClass);
            }
            break;
        case tsc.SyntaxKind.EnumDeclaration:
        case tsc.SyntaxKind.InterfaceDeclaration:
            fileObject.otherMemberDefinitions.push(printer.printNode(tsc.EmitHint.Unspecified, node, globalThis.currentSourceFile));
            break;
        default:
            return;
    }
}
function serializeClass(symbol, className, path) {
    const apiObject = {
        operationMap: {}
    };
    const apiClass = {
        className,
        apiSignatures: []
    };
    let numApiMethods = 0;
    forEach(symbol.members, (memberName, member) => {
        if (!member.valueDeclaration) {
            return {};
        }
        switch (member.valueDeclaration.kind) {
            case tsc.SyntaxKind.MethodDeclaration:
                let methodDescriptor = serializeMethod(symbol, className, memberName, member);
                if (methodDescriptor && methodDescriptor.isApiMethod) {
                    numApiMethods++;
                    apiObject.operationMap[memberName] = {
                        isAsync: methodDescriptor.isAsync,
                        parameters: []
                    };
                    apiClass.apiSignatures.push({
                        isAsync: methodDescriptor.isAsync,
                        name: methodDescriptor.name,
                        parameters: methodDescriptor.parameters,
                        returnType: methodDescriptor.returnType
                    });
                }
                break;
            default:
                break;
        }
    });
    return numApiMethods ? {
        apiClass,
        apiObject
    } : null;
}
function serializeMethod(symbol, className, name, member) {
    if (!member.valueDeclaration.decorators) {
        return;
    }
    let isApiMethod = false;
    let isAsync = false;
    for (let modifier of member.declarations[0].modifiers) {
        if (modifier.kind === tsc.SyntaxKind.AsyncKeyword) {
            isAsync = true;
        }
    }
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
        switch (decoratorName) {
            case 'Api':
                isApiMethod = true;
                break;
            default:
                break;
        }
    });
    if (!isApiMethod) {
        return;
    }
    // const name: string = member.escapedName as any;
    const declaration = member.valueDeclaration;
    const parameters = [];
    for (const parameter of declaration.parameters) {
        parameters.push(printer.printNode(tsc.EmitHint.Unspecified, parameter, globalThis.currentSourceFile));
    }
    const returnType = printer.printNode(tsc.EmitHint.Unspecified, declaration.type, globalThis.currentSourceFile);
    return {
        isApiMethod,
        isAsync,
        name,
        parameters,
        returnType
    };
}
//# sourceMappingURL=ApiGenerator.js.map