import * as ts from 'typescript';
import tsc from 'typescript';
import { getExpectedPropertyIndexesFormatMessage } from '../../ParserUtils';
import { EntityCandidate, Interface } from './EntityCandidate';
import { EntityCandidateRegistry } from './EntityCandidateRegistry';
import { ImportManager } from './ImportManager';
import { getImplementedInterfaces, getParentClassImport, getParentClassName, isDecoratedAsEntity } from './utils';
/**
 * Created by Papa on 3/26/2016.
 */
export const globalCandidateRegistry = new EntityCandidateRegistry(globalThis.enumMap);
export const globalCandidateInheritanceMap = new Map();
var TsObjectType;
(function (TsObjectType) {
    TsObjectType["OBJECT_LITERAL"] = "OBJECT_LITERAL";
    TsObjectType["OBJECT_LITERAL_ARRAY"] = "OBJECT_LITERAL_ARRAY";
    TsObjectType["DECORATOR"] = "DECORATOR";
    TsObjectType["DECORATOR_ARRAY"] = "DECORATOR_ARRAY";
})(TsObjectType || (TsObjectType = {}));
let currentFileImports;
const entityFileMap = {};
const fileImportsMapByFilePath = {};
export function visitEntityFile(node, path) {
    let file = entityFileMap[path];
    if (!file) {
        file = {
            path,
            hasEntityCandidate: false,
            hasEnums: false,
            hasInterfaces: false
        };
        entityFileMap[path] = file;
    }
    const onlyClassInFileError = `
		  Cannot declare entities in same files as interfaces and enums (needed for DDL hiding).
		  NOTE: Entity interface is already generated for you.`;
    if (node.kind === tsc.SyntaxKind.ClassDeclaration) {
        if (file.hasEntityCandidate) {
            throw new Error(`Cannot declare more than one entity per file.`);
        }
        if (file.hasEnums || file.hasInterfaces) {
            throw new Error(onlyClassInFileError);
        }
        file.hasEntityCandidate = true;
        let fileImports = fileImportsMapByFilePath[path];
        if (!fileImports) {
            fileImports = ImportManager.resolveImports(node.parent, file.path);
            fileImportsMapByFilePath[path] = fileImports;
        }
        currentFileImports = fileImports;
        // This is a top level class, get its symbol
        let symbol = globalThis.checker
            .getSymbolAtLocation(node.name);
        let serializedClass = serializeClass(symbol, node.decorators, path, fileImports, node.parent);
        // if (serializedClass) {
        // 	 output.push(serializedClass)
        // }
        // No need to walk any further, class expressions/inner declarations
        // cannot be exported
    }
    else if (node.kind === tsc.SyntaxKind.InterfaceDeclaration) {
        if (file.hasEntityCandidate) {
            throw new Error(onlyClassInFileError);
        }
        file.hasInterfaces = true;
        // This is a top level interface, get its symbol
        let symbol = globalThis.checker
            .getSymbolAtLocation(node.name);
        registerInterface(symbol, path);
    }
    else if (node.kind === tsc.SyntaxKind.ModuleDeclaration) {
        // This is a namespace, visit its children
        // tsc.forEachChild(node, visit);
        throw new Error(`Namespaces are not supported in DDL.`);
    }
    else if (node.kind === tsc.SyntaxKind.EnumDeclaration) {
        if (file.hasEntityCandidate) {
            throw new Error(onlyClassInFileError);
        }
        file.hasEnums = true;
        let symbol = globalThis.checker
            .getSymbolAtLocation(node.name);
        globalThis.enumMap.set(symbol.name, path);
    }
}
/** Serialize a symbol into a json object */
function serializeSymbol(symbol, parent = symbol.parent) {
    const declarations = symbol.declarations;
    let isGenerated = false;
    let allocationSize = undefined;
    let isId = false;
    let isMappedSuperclass = false;
    let isTransient = false;
    const decorators = [];
    let declaration;
    if (declarations && declarations.length === 1) {
        declaration = symbol.declarations[0];
        const tsDecorators = declaration.decorators;
        if (tsDecorators) {
            for (const tsDecorator of tsDecorators) {
                const decorator = serializeDecorator(tsDecorator);
                switch (decorator.name) {
                    case 'GeneratedValue':
                        isGenerated = true;
                        break;
                    case 'SequenceGenerator':
                        allocationSize = decorator.values[0].allocationSize;
                        break;
                    case 'Id':
                        isId = true;
                        break;
                    case 'MappedSuperclass':
                        isMappedSuperclass = true;
                        break;
                    // Skip fields marked with @Transient
                    case 'Transient':
                        isTransient = true;
                        break;
                }
                decorators.push(decorator);
            }
        }
    }
    // 		if (flags & 8 /* NoTruncation */) {
    // if (flags & 256 /* UseFullyQualifiedType */) {
    // if (flags & 4096 /* SuppressAnyReturnType */) {
    // if (flags & 1 /* WriteArrayAsGenericType */) {
    // if (flags & 64 /* WriteTypeArgumentsOfSignature */) {
    let type = globalThis.checker.typeToString(globalThis.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration), parent);
    if (declaration) {
        if (type === 'any' && declaration) {
            if (declaration.type
                && declaration.type.typeName) {
                type = declaration.type.typeName.escapedText;
            }
            else if (declaration.type
                && declaration.type.kind === tsc.SyntaxKind.AnyKeyword) {
                // Just the any keyword
            }
            else {
                throw new Error(`Unsupported type for ''${getSymbolLocationString(symbol, parent)}': ${type} (implicit if 'any')`);
            }
        }
        else if (type.match(/^\s*any\[\]\s*$/)) {
            if (declaration.type
                && declaration.type.elementType
                && declaration.type.elementType.typeName) {
                type = declaration.type.elementType.typeName.escapedText + '[]';
            }
            else {
                throw new Error(`Unsupported array type for '${getSymbolLocationString(symbol, parent)}': ${type}`);
            }
        }
        else if (type.match(/\]\s*:\s*any\s*;*\s*\}\s*$/)) {
            if (declaration.type
                && declaration.type.members
                && declaration.type.members[0]
                && declaration.type.members[0].type
                && declaration.type.members[0].type.typeName) {
                type = type.replace(/any\s*;*\s*\}\s*$/, declaration.type.members[0].type.typeName.escapedText + '}');
            }
            else {
                throw new Error(`Unsupported map type for '${getSymbolLocationString(symbol, parent)}': ${type}`);
            }
        }
        else if (type.match(/^\s*any\s*$/)) {
            throw new Error(`Unsupported type for '${getSymbolLocationString(symbol, parent)}': ${type}`);
        }
    }
    return {
        allocationSize,
        decorators,
        isGenerated,
        isId,
        isMappedSuperclass,
        isTransient,
        name: symbol.getName(),
        // documentation:
        // tsc.displayPartsToString(symbol.getDocumentationComment(undefined)),
        type
    };
}
function getSymbolLocationString(symbol, parent) {
    let parentPrefix = 'unknown';
    if (parent.fileName) {
        parentPrefix = parent.fileName;
    }
    else if (parent.getName) {
        parentPrefix = parent.getName();
    }
    return `${parentPrefix} -> ${symbol.getName()}`;
}
function serializeMethodDefinition(symbol) {
    const name = symbol.getName();
    const parameters = [];
    const signature = symbol.valueDeclaration;
    const tsParams = signature.parameters;
    for (const tsParam of tsParams) {
        const typeInfo = getType(tsParam.type, 0);
        const name = tsParam.name.escapedText;
        const optional = tsParam.questionToken ? true : false;
        parameters.push({ ...typeInfo, name, optional });
    }
    const typeInfo = getType(signature.type, 0);
    const optional = signature.questionToken ? true : false;
    const returnType = { ...typeInfo, name, optional };
    return {
        name,
        parameters,
        returnType,
    };
}
function getType(tsType, arrayDepth) {
    let type = 'any';
    let primitive = null;
    let genericParams = [];
    const typeInfo = {
        type,
        primitive,
        arrayDepth,
        genericParams
    };
    if (!tsType) {
        return typeInfo;
    }
    switch (tsType.kind) {
        case tsc.SyntaxKind.ArrayType:
            return getType(tsType.elementType, ++arrayDepth);
        case tsc.SyntaxKind.AnyKeyword:
            return typeInfo;
        case tsc.SyntaxKind.BooleanKeyword:
            type = primitive = 'boolean';
            return { ...typeInfo, primitive, type };
        case tsc.SyntaxKind.NumberKeyword:
            type = primitive = 'number';
            return { ...typeInfo, primitive, type };
        case tsc.SyntaxKind.StringKeyword:
            type = primitive = 'string';
            return { ...typeInfo, primitive, type };
        case tsc.SyntaxKind.VoidKeyword:
            type = 'void';
            return { ...typeInfo, type };
        case tsc.SyntaxKind.TypeReference:
            const typeName = tsType.typeName;
            const typeArguments = tsType.typeArguments;
            if (typeArguments && typeArguments.length) {
                genericParams = typeArguments.map(genericParam => getType(genericParam, 0));
            }
            type = typeName.escapedText;
            return { ...typeInfo, type, genericParams };
        default:
            throw new Error(`Unsupported Syntax kind for method parameter/type: ${tsType.kind}`);
    }
}
function serializeDecorator(tsDecorator) {
    let expression = tsDecorator.expression;
    let decoratorName;
    if (expression.expression) {
        decoratorName = expression.expression.text;
    }
    else {
        decoratorName = expression.text;
    }
    let values = [];
    if (expression.arguments) {
        expression.arguments.forEach((argument) => {
            let value = parseObjectProperty(argument, TsObjectType.DECORATOR, decoratorName);
            if (value !== undefined) {
                values.push(value);
            }
        });
    }
    const decorator = {
        name: decoratorName,
        values: values
    };
    return decorator;
}
function parseObjectLiteralExpression(objLitExpr) {
    let object = {};
    if (objLitExpr.properties) {
        objLitExpr.properties.forEach((property) => {
            const propertyName = property.name.text;
            const initializer = property.initializer;
            const value = parseObjectProperty(initializer, TsObjectType.OBJECT_LITERAL, propertyName);
            object[propertyName] = value;
        });
    }
    return object;
}
function parseObjectProperty(initializer, objectType, objectName) {
    let value;
    switch (initializer.kind) {
        case tsc.SyntaxKind.Identifier:
            let identifier = initializer;
            switch (identifier.text) {
                case 'undefined':
                    value = undefined;
                    break;
                case 'NaN':
                    value = NaN;
                    break;
                // Must be a variable declaration
                default:
                    value = 'var ' + identifier.text;
                    break;
            }
            break;
        case tsc.SyntaxKind.NullKeyword:
            value = null;
            break;
        case tsc.SyntaxKind.RegularExpressionLiteral:
            let regExp = initializer;
            value = convertRegExpStringToObject(regExp.text);
            break;
        case tsc.SyntaxKind.StringLiteral:
        case tsc.SyntaxKind.NoSubstitutionTemplateLiteral:
            value = initializer.text;
            break;
        case tsc.SyntaxKind.TrueKeyword:
            value = true;
            break;
        case tsc.SyntaxKind.FalseKeyword:
            value = false;
            break;
        case tsc.SyntaxKind.NumericLiteral:
            let numberText = initializer.text;
            if (numberText.indexOf('.') > 0) {
                value = parseFloat(numberText);
            }
            else {
                value = parseInt(numberText);
            }
            break;
        case tsc.SyntaxKind.NewExpression:
            let newExpression = initializer;
            let type = newExpression.expression.text;
            value = 'new ' + type;
            break;
        case tsc.SyntaxKind.ObjectLiteralExpression:
            value = parseObjectLiteralExpression(initializer);
            break;
        case tsc.SyntaxKind.ArrayLiteralExpression:
            value = [];
            let arrayLiteral = initializer;
            arrayLiteral.elements.forEach((element) => {
                let arrayObjectType = objectType;
                switch (objectType) {
                    case TsObjectType.DECORATOR:
                        arrayObjectType = TsObjectType.DECORATOR_ARRAY;
                        break;
                    case TsObjectType.OBJECT_LITERAL:
                        arrayObjectType = TsObjectType.OBJECT_LITERAL_ARRAY;
                        break;
                }
                let arrayValue = parseObjectProperty(element, arrayObjectType, objectName);
                value.push(arrayValue);
            });
            break;
        case tsc.SyntaxKind.PropertyAccessExpression:
            value = convertPropertyAccessExpressionToString(initializer);
            break;
        case tsc.SyntaxKind.CallExpression:
            throw new Error(`Function calls are not allowed as parameter values.`);
        case tsc.SyntaxKind.BinaryExpression:
            throw new Error(`Expression are not allowed as parameter values.`);
        case tsc.SyntaxKind.ArrowFunction:
            const arrowFunction = initializer;
            for (const parameter of arrowFunction.parameters) {
                if (!parameter.name || !parameter.type) {
                    throw new Error(`Uxpected @Table property indexes:${getExpectedPropertyIndexesFormatMessage()}`);
                }
            }
            const parameters = arrowFunction.parameters.map(parameter => ({
                name: parameter.name.escapedText,
                type: parameter.type.typeName.escapedText
            }));
            let body;
            try {
                body = parseObjectProperty(arrowFunction.body, TsObjectType.OBJECT_LITERAL, null);
            }
            catch (e) {
                throw new Error(`Uxpected @Table property indexes:${getExpectedPropertyIndexesFormatMessage()}`);
            }
            value = {
                body,
                parameters
            };
            if (objectType == TsObjectType.DECORATOR && objectName === 'WhereJoinTable') {
                const printer = tsc.createPrinter({
                    newLine: tsc.NewLineKind.LineFeed,
                    removeComments: true
                });
                /*
                TODO: rethink how we can import @WhereJoinTable code
                const fileImports = [];
                for (let filePath in currentFileImports.importMapByModulePath) {
                    const moduleImport = currentFileImports.importMapByModulePath[filePath];
                    if (moduleImport.isLocal) {
                        continue;
                    }
                    let importsFromFile = [];
                    for (let asName in moduleImport.objectMapByAsName) {
                        const importedObject = moduleImport.objectMapByAsName[asName];
                        if (importedObject.asName === importedObject.sourceName) {
                            importsFromFile.push(importedObject.asName);
                        } else {
                            importsFromFile.push(`${importedObject.sourceName} as ${importedObject.asName}`);
                        }
                    }
                    const importsFragment = importsFromFile.join(', ');
                    const importStatement = `import { ${importsFragment} } from '${moduleImport.path}';`;
                    fileImports.push(importStatement);
                }
                const globalImports = fileImports.join('\r\n');

                const typescriptDefinition = printer.printNode(ts.EmitHint.Expression, initializer, currentSourceFile);
                const whereJoinTableFunction =
                    `const WhereJoinTableFunction = (${typescriptDefinition});`;

                const tempFile = `${globalImports}

${whereJoinTableFunction}
export default WhereJoinTableFunction`;

                const compilerOptions = {module: ts.ModuleKind.CommonJS};
                const transpilationResult = tsc.transpileModule(tempFile, {
                    compilerOptions: compilerOptions,
                    moduleName: "WhereJoinTableModule"
                });
                value = transpilationResult.outputText;
                */
                // For now allow only and, or & not functions and everything from
                // airport reference (and nothing else)
                const typescriptDefinition = printer.printNode(tsc.EmitHint.Expression, initializer, globalThis.currentSourceFile);
                const compilerOptions = { module: ts.ModuleKind.CommonJS };
                const transpilationResult = tsc.transpileModule(typescriptDefinition, {
                    compilerOptions: compilerOptions,
                    moduleName: 'WhereJoinTableModule'
                });
                value = transpilationResult.outputText;
            }
            break;
        default:
            let objectTypeDescription = '';
            switch (objectType) {
                case TsObjectType.OBJECT_LITERAL:
                    objectTypeDescription = 'object literal';
                    break;
                case TsObjectType.OBJECT_LITERAL_ARRAY:
                    objectTypeDescription = 'object literal array';
                    break;
                case TsObjectType.DECORATOR:
                    objectTypeDescription = 'decorator';
                    break;
                case TsObjectType.DECORATOR_ARRAY:
                    objectTypeDescription = 'decorator array';
                    break;
            }
            throw new Error(`Unsupported property initializer.kind: ${initializer.kind}
				 for ${objectTypeDescription}: ${objectName}`);
    }
    return value;
}
function convertPropertyAccessExpressionToString(propAccessExrp) {
    let leftHandExrp = propAccessExrp.expression;
    return `${leftHandExrp.text}.${propAccessExrp.name.text}`;
}
function convertRegExpStringToObject(regExpString) {
    let firstIndexOfSlash = regExpString.indexOf('/');
    if (firstIndexOfSlash < 0) {
        return new RegExp(regExpString);
    }
    let lastIndexOfSlash = regExpString.lastIndexOf('/');
    if (firstIndexOfSlash === lastIndexOfSlash) {
        return new RegExp(regExpString);
    }
    let regExpFragments = regExpString.split('/');
    return new RegExp(regExpFragments[1], regExpFragments[2]);
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
/** Serialize a class symbol information */
function serializeClass(symbol, decorators, classPath, fileImports, file) {
    const details = serializeSymbol(symbol, file);
    details.fileImports = fileImports;
    let properties = [];
    let methodSignatures = [];
    let ids = [];
    forEach(symbol.members, (memberName, member) => {
        if (member.valueDeclaration) {
            switch (member.valueDeclaration.kind) {
                case tsc.SyntaxKind.PropertyDeclaration:
                    console.log(`Property: ${memberName}`);
                    let propertySymbolDescriptor = serializeSymbol(member, file);
                    if (propertySymbolDescriptor) {
                        if (propertySymbolDescriptor.isId) {
                            ids.push(propertySymbolDescriptor);
                        }
                        properties.push(propertySymbolDescriptor);
                    }
                    break;
                case tsc.SyntaxKind.MethodDeclaration:
                    console.log(`Method: ${memberName}`);
                    const isPublic = !member.valueDeclaration.modifiers
                        || member.valueDeclaration.modifiers.filter(modifier => modifier.kind === tsc.SyntaxKind.PrivateKeyword
                            || modifier.kind === tsc.SyntaxKind.ProtectedKeyword).length < 1;
                    if (isPublic) {
                        methodSignatures.push(serializeMethodDefinition(member));
                    }
                    break;
                default:
                    throw new Error(`Not implemented`);
            }
        }
        else if (member.declarations) {
            // declaration (constructor, method)
            if (member.declarations.length === 1 && member.declarations[0].kind === tsc.SyntaxKind.Constructor) {
                // do not record the constructor
            }
            else {
                throw new Error('Not implemented');
            }
        }
        else {
            // value declaration (properity)
            throw new Error('Not implemented');
        }
    });
    details.properties = properties;
    details.methodSignatures = methodSignatures;
    // Get the construct signatures
    let constructorType = globalThis.checker
        .getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
    details.constructors = constructorType.getConstructSignatures().map(serializeSignature);
    let parentClassName = getParentClassName(symbol);
    let parentClassImport;
    if (parentClassName) {
        parentClassImport = getParentClassImport(symbol, parentClassName);
    }
    let entityDecorator = isDecoratedAsEntity(decorators);
    let classInheritanceEntry = globalCandidateInheritanceMap[details.name];
    if (classInheritanceEntry != undefined) {
        throw new Error(`Found duplicate entity '${details.name}'. 
			Non-unique class names are not supported`);
    }
    if (entityDecorator) {
        let entityCandidate = EntityCandidate.create(details.name, classPath, parentClassName, parentClassImport, entityDecorator.isSuperclass);
        entityCandidate.docEntry = details;
        entityCandidate.ids = ids;
        entityCandidate.implementedInterfaceNames = getImplementedInterfaces(symbol);
        details.properties.forEach(property => {
            property.ownerEntity = entityCandidate;
        });
        globalCandidateRegistry.addCandidate(entityCandidate);
        globalThis.processedCandidateRegistry.addCandidate(entityCandidate);
        globalCandidateInheritanceMap[details.name] = parentClassName;
        if (globalCandidateInheritanceMap[parentClassName] == undefined) {
            globalCandidateInheritanceMap[parentClassName] = null;
        }
    }
    else if (classInheritanceEntry == null) {
        globalCandidateInheritanceMap[details.name] = parentClassName;
    }
    return details;
}
function registerInterface(symbol, classPath) {
    let anInterface = new Interface(classPath, symbol.name);
    let interfaces = globalCandidateRegistry.allInterfacesMap.get(symbol.name);
    if (!interfaces) {
        interfaces = [];
        globalCandidateRegistry.allInterfacesMap.set(symbol.name, interfaces);
    }
    interfaces.push(anInterface);
}
/** Serialize a signature (call or construct) */
function serializeSignature(signature) {
    return {
        parameters: signature.parameters.map(serializeSymbol),
        returnType: globalThis.checker.typeToString(signature.getReturnType()),
        // documentation:
        // tsc.displayPartsToString(signature.getDocumentationComment(undefined))
    };
}
/** True if this is visible outside this file, false otherwise */
function isNodeExported(node) {
    return (node.flags & ts.ModifierFlags.Export) !== 0 || (node.parent && node.parent.kind === tsc.SyntaxKind.SourceFile);
}
//# sourceMappingURL=EntityDefinitionGenerator.js.map