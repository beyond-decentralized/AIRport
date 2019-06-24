"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const EntityCandidate_1 = require("./EntityCandidate");
const EntityCandidateRegistry_1 = require("./EntityCandidateRegistry");
const ImportManager_1 = require("./ImportManager");
const utils_1 = require("./utils");
/**
 * Created by Papa on 3/26/2016.
 */
const enumMap = new Map();
exports.globalCandidateRegistry = new EntityCandidateRegistry_1.EntityCandidateRegistry(enumMap);
exports.globalCandidateInheritanceMap = new Map();
var TsObjectType;
(function (TsObjectType) {
    TsObjectType[TsObjectType["OBJECT_LITERAL"] = 0] = "OBJECT_LITERAL";
    TsObjectType[TsObjectType["OBJECT_LITERAL_ARRAY"] = 1] = "OBJECT_LITERAL_ARRAY";
    TsObjectType[TsObjectType["DECORATOR"] = 2] = "DECORATOR";
    TsObjectType[TsObjectType["DECORATOR_ARRAY"] = 3] = "DECORATOR_ARRAY";
})(TsObjectType || (TsObjectType = {}));
/** Generate documention for all classes in a set of .ts files */
function generateEntityDefinitions(fileNames, options, configuration, schemaMapByProjectName) {
    // Build a program using the set of root file names in fileNames
    let program = ts.createProgram(fileNames, options);
    // Get the checker, we will use it to find more about classes
    let checker = program.getTypeChecker();
    exports.globalCandidateRegistry.configuration = configuration;
    exports.globalCandidateRegistry.schemaMap = schemaMapByProjectName;
    const processedCandidateRegistry = new EntityCandidateRegistry_1.EntityCandidateRegistry(enumMap);
    // const output: DocEntry[] = []
    const fileImportsMapByFilePath = {};
    const fileMap = {};
    let currentSourceFile;
    let currentFileImports;
    const sourceFiles = program.getSourceFiles();
    // Visit every sourceFile in the program
    for (const sourceFile of sourceFiles) {
        currentSourceFile = sourceFile;
        // Walk the tree to searchOne for classes
        ts.forEachChild(sourceFile, visit);
    }
    // print out the doc
    // fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));
    return exports.globalCandidateRegistry.matchVerifiedEntities(processedCandidateRegistry);
    /** visit nodes finding exported classes */
    function visit(node) {
        let path = utils_1.getClassPath(node.parent);
        // Only top level entities are supported
        if (!path) {
            return;
        }
        // Do not process libraries
        if (path.indexOf('node_modules') > -1) {
            return;
        }
        // Do not process files outside of the project (possible with MS Rush setup)
        if (path.indexOf(configuration.airport.node_modulesLinks.pathToProject) == -1) {
            return;
        }
        let file = fileMap[path];
        if (!file) {
            file = {
                path,
                hasEntityCandidate: false,
                hasEnums: false,
                hasInterfaces: false
            };
            fileMap[path] = file;
        }
        const onlyClassInFileError = `
		  Cannot declare entities in same files as interfaces and enums (needed for DDL hiding).
		  NOTE: Entity interface is already generated for you.`;
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            if (file.hasEntityCandidate) {
                throw `Cannot declare more than one entity per file.`;
            }
            if (file.hasEnums || file.hasInterfaces) {
                throw onlyClassInFileError;
            }
            file.hasEntityCandidate = true;
            let fileImports = fileImportsMapByFilePath[path];
            if (!fileImports) {
                fileImports = ImportManager_1.ImportManager.resolveImports(node.parent, file.path);
                fileImportsMapByFilePath[path] = fileImports;
            }
            currentFileImports = fileImports;
            // This is a top level class, get its symbol
            let symbol = checker.getSymbolAtLocation(node.name);
            let serializedClass = serializeClass(symbol, node.decorators, path, fileImports, node.parent);
            // if (serializedClass) {
            // 	output.push(serializedClass)
            // }
            // No need to walk any further, class expressions/inner declarations
            // cannot be exported
        }
        else if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
            if (file.hasEntityCandidate) {
                throw onlyClassInFileError;
            }
            file.hasInterfaces = true;
            // This is a top level interface, get its symbol
            let symbol = checker.getSymbolAtLocation(node.name);
            registerInterface(symbol, path);
        }
        else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            // ts.forEachChild(node, visit);
            throw `Namespaces are not supported in DDL.`;
        }
        else if (node.kind === ts.SyntaxKind.EnumDeclaration) {
            if (file.hasEntityCandidate) {
                throw onlyClassInFileError;
            }
            file.hasEnums = true;
            let symbol = checker.getSymbolAtLocation(node.name);
            enumMap.set(symbol.name, path);
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
        let type = checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration), parent);
        if (declaration) {
            if (type === 'any' && declaration) {
                if (declaration.type
                    && declaration.type.typeName) {
                    type = declaration.type.typeName.escapedText;
                }
                else if (declaration.type
                    && declaration.type.kind === ts.SyntaxKind.AnyKeyword) {
                    // Just the any keyword
                }
                else {
                    throw `Unsupported type: ${type}`;
                }
            }
            else if (type.match(/^\s*any\[\]\s*$/)) {
                if (declaration.type
                    && declaration.type.elementType
                    && declaration.type.elementType.typeName) {
                    type = declaration.type.elementType.typeName.escapedText + '[]';
                }
                else {
                    throw `Unsupported array type: ${type}`;
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
                    throw `Unsupported map type: ${type}`;
                }
            }
            else if (type.match(/^\s*any\s*$/)) {
                throw `Unsupported type: ${type}`;
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
            // ts.displayPartsToString(symbol.getDocumentationComment(undefined)),
            type
        };
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
            case ts.SyntaxKind.ArrayType:
                return getType(tsType.elementType, ++arrayDepth);
            case ts.SyntaxKind.AnyKeyword:
                return typeInfo;
            case ts.SyntaxKind.BooleanKeyword:
                type = primitive = 'boolean';
                return { ...typeInfo, primitive, type };
            case ts.SyntaxKind.NumberKeyword:
                type = primitive = 'number';
                return { ...typeInfo, primitive, type };
            case ts.SyntaxKind.StringKeyword:
                type = primitive = 'string';
                return { ...typeInfo, primitive, type };
            case ts.SyntaxKind.VoidKeyword:
                type = 'void';
                return { ...typeInfo, type };
            case ts.SyntaxKind.TypeReference:
                const typeName = tsType.typeName;
                const typeArguments = tsType.typeArguments;
                if (typeArguments && typeArguments.length) {
                    genericParams = typeArguments.map(genericParam => getType(genericParam, 0));
                }
                type = typeName.escapedText;
                return { ...typeInfo, type, genericParams };
            default:
                throw `Unsupported Syntax kind for method parameter/type: ${tsType.kind}`;
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
            case ts.SyntaxKind.Identifier:
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
            case ts.SyntaxKind.NullKeyword:
                value = null;
                break;
            case ts.SyntaxKind.RegularExpressionLiteral:
                let regExp = initializer;
                value = convertRegExpStringToObject(regExp.text);
                break;
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                value = initializer.text;
                break;
            case ts.SyntaxKind.TrueKeyword:
                value = true;
                break;
            case ts.SyntaxKind.FalseKeyword:
                value = false;
                break;
            case ts.SyntaxKind.NumericLiteral:
                let numberText = initializer.text;
                if (numberText.indexOf('.') > 0) {
                    value = parseFloat(numberText);
                }
                else {
                    value = parseInt(numberText);
                }
                break;
            case ts.SyntaxKind.NewExpression:
                let newExpression = initializer;
                let type = newExpression.expression.text;
                value = 'new ' + type;
                break;
            case ts.SyntaxKind.ObjectLiteralExpression:
                value = parseObjectLiteralExpression(initializer);
                break;
            case ts.SyntaxKind.ArrayLiteralExpression:
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
            case ts.SyntaxKind.PropertyAccessExpression:
                value = convertPropertyAccessExpressionToString(initializer);
                break;
            case ts.SyntaxKind.CallExpression:
                throw `Function calls are not allowed as parameter values.`;
            case ts.SyntaxKind.BinaryExpression:
                throw `Expression are not allowed as parameter values.`;
            case ts.SyntaxKind.ArrowFunction:
                if (objectType == TsObjectType.DECORATOR && objectName === 'WhereJoinTable') {
                    const printer = ts.createPrinter({
                        newLine: ts.NewLineKind.LineFeed,
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
                    const transpilationResult = ts.transpileModule(tempFile, {
                        compilerOptions: compilerOptions,
                        moduleName: "WhereJoinTableModule"
                    });
                    value = transpilationResult.outputText;
                    */
                    // For now allow only and, or & not functions and everything from
                    // airport reference (and nothing else)
                    const typescriptDefinition = printer.printNode(ts.EmitHint.Expression, initializer, currentSourceFile);
                    const compilerOptions = { module: ts.ModuleKind.CommonJS };
                    const transpilationResult = ts.transpileModule(typescriptDefinition, {
                        compilerOptions: compilerOptions,
                        moduleName: 'WhereJoinTableModule'
                    });
                    value = transpilationResult.outputText;
                    break;
                }
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
                throw `Unsupported property initializer.kind: ${initializer.kind} for ${objectTypeDescription}: ${objectName}`;
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
                    case ts.SyntaxKind.PropertyDeclaration:
                        console.log(`Property: ${memberName}`);
                        let propertySymbolDescriptor = serializeSymbol(member, file);
                        if (propertySymbolDescriptor) {
                            if (propertySymbolDescriptor.isId) {
                                ids.push(propertySymbolDescriptor);
                            }
                            properties.push(propertySymbolDescriptor);
                        }
                        break;
                    case ts.SyntaxKind.MethodDeclaration:
                        console.log(`Method: ${memberName}`);
                        const isPublic = !member.valueDeclaration.modifiers
                            || member.valueDeclaration.modifiers.filter(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword
                                || modifier.kind === ts.SyntaxKind.ProtectedKeyword).length < 1;
                        if (isPublic) {
                            methodSignatures.push(serializeMethodDefinition(member));
                        }
                        break;
                    default:
                        throw `Not implemented`;
                }
            }
            else if (member.declarations) {
                // declaration (constructor, method)
                if (member.declarations.length === 1 && member.declarations[0].kind === ts.SyntaxKind.Constructor) {
                    // do not record the constructor
                }
                else {
                    throw 'Not implemented';
                }
            }
            else {
                // value declaration (properity)
                throw 'Not implemented';
            }
        });
        details.properties = properties;
        details.methodSignatures = methodSignatures;
        // Get the construct signatures
        let constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
        details.constructors = constructorType.getConstructSignatures().map(serializeSignature);
        let parentClassName = utils_1.getParentClassName(symbol);
        let parentClassImport;
        if (parentClassName) {
            parentClassImport = utils_1.getParentClassImport(symbol, parentClassName);
        }
        let entityDecorator = utils_1.isDecoratedAsEntity(decorators);
        let classInheritanceEntry = exports.globalCandidateInheritanceMap[details.name];
        if (classInheritanceEntry != undefined) {
            throw `Found duplicate entity '${details.name}'. Non-unique class names are not supported`;
        }
        if (entityDecorator) {
            let entityCandidate = EntityCandidate_1.EntityCandidate.create(details.name, classPath, parentClassName, parentClassImport, entityDecorator.isSuperclass);
            entityCandidate.docEntry = details;
            entityCandidate.ids = ids;
            entityCandidate.implementedInterfaceNames = utils_1.getImplementedInterfaces(symbol);
            details.properties.forEach(property => {
                property.ownerEntity = entityCandidate;
            });
            exports.globalCandidateRegistry.addCandidate(entityCandidate);
            processedCandidateRegistry.addCandidate(entityCandidate);
            exports.globalCandidateInheritanceMap[details.name] = parentClassName;
            if (exports.globalCandidateInheritanceMap[parentClassName] == undefined) {
                exports.globalCandidateInheritanceMap[parentClassName] = null;
            }
        }
        else if (classInheritanceEntry == null) {
            exports.globalCandidateInheritanceMap[details.name] = parentClassName;
        }
        return details;
    }
    function registerInterface(symbol, classPath) {
        let anInterface = new EntityCandidate_1.Interface(classPath, symbol.name);
        let interfaces = exports.globalCandidateRegistry.allInterfacesMap.get(symbol.name);
        if (!interfaces) {
            interfaces = [];
            exports.globalCandidateRegistry.allInterfacesMap.set(symbol.name, interfaces);
        }
        interfaces.push(anInterface);
    }
    /** Serialize a signature (call or construct) */
    function serializeSignature(signature) {
        return {
            parameters: signature.parameters.map(serializeSymbol),
            returnType: checker.typeToString(signature.getReturnType()),
        };
    }
    /** True if this is visible outside this file, false otherwise */
    function isNodeExported(node) {
        return (node.flags & ts.ModifierFlags.Export) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    }
}
exports.generateEntityDefinitions = generateEntityDefinitions;
//# sourceMappingURL=EntityDefinitionGenerator.js.map