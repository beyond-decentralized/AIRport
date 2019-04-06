import {DbSchema}                from '@airport/ground-control'
import * as ts                   from 'typescript'
import {Configuration}           from '../options/Options'
import {
	ClassDocEntry,
	Decorator,
	DocEntry,
	MethodSignatureDocEntry,
	PropertyDocEntry,
	TypeOrParamDocEntry
}                                from './DocEntry'
import {
	EntityCandidate,
	Interface
}                                from './EntityCandidate'
import {EntityCandidateRegistry} from './EntityCandidateRegistry'
import {
	EntityFile,
	FileImports
}                                from './FileImports'
import {ImportManager}           from './ImportManager'
import {
	getClassPath,
	getImplementedInterfaces,
	getParentClassImport,
	getParentClassName,
	isDecoratedAsEntity
}                                from './utils'

/**
 * Created by Papa on 3/26/2016.
 */

const enumMap: Map<string, string>                              = new Map<string, string>()
export const globalCandidateRegistry                            = new EntityCandidateRegistry(enumMap)
export const globalCandidateInheritanceMap: Map<string, string> = new Map<string, string>()

enum TsObjectType {
	OBJECT_LITERAL,
	OBJECT_LITERAL_ARRAY,
	DECORATOR,
	DECORATOR_ARRAY,
}

/** Generate documention for all classes in a set of .ts files */
export function generateEntityDefinitions(
	fileNames: string[],
	options: ts.CompilerOptions,
	configuration: Configuration,
	schemaMapByProjectName: { [projectName: string]: DbSchema }
): { [entityName: string]: EntityCandidate } {
	// Build a program using the set of root file names in fileNames
	let program = ts.createProgram(fileNames, options)

	// Get the checker, we will use it to find more about classes
	let checker                           = program.getTypeChecker()
	globalCandidateRegistry.configuration = configuration
	globalCandidateRegistry.schemaMap     = schemaMapByProjectName
	const processedCandidateRegistry      = new EntityCandidateRegistry(enumMap)

	// const output: DocEntry[] = []

	const fileImportsMapByFilePath: { [path: string]: FileImports } = {}
	const fileMap: { [classPath: string]: EntityFile }              = {}

	let currentSourceFile
	let currentFileImports

	const sourceFiles = program.getSourceFiles()

	// Visit every sourceFile in the program
	for (const sourceFile of sourceFiles) {
		currentSourceFile = sourceFile
		// Walk the tree to search for classes
		ts.forEachChild(sourceFile, visit)
	}

	// print out the doc
	// fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));

	return globalCandidateRegistry.matchVerifiedEntities(processedCandidateRegistry)

	/** visit nodes finding exported classes */
	function visit(node: ts.Node) {
		let path = getClassPath((<any>node).upstream)
		// Only top level entities are supported
		if (!path) {
			return
		}
		// Do not process libraries
		if (path.indexOf('node_modules') > -1) {
			return
		}
		// Do not process files outside of the project (possible with MS Rush setup)
		if (path.indexOf(configuration.airport.node_modulesLinks.pathToProject) == -1) {
			return
		}

		let file = fileMap[path]
		if (!file) {
			file          = {
				path,
				hasEntityCandidate: false,
				hasEnums: false,
				hasInterfaces: false
			}
			fileMap[path] = file
		}

		const onlyClassInFileError = `
		  Cannot declare entities in same files as interfaces and enums (needed for DDL hiding).
		  NOTE: Entity interface is already generated for you.`

		if (node.kind === ts.SyntaxKind.ClassDeclaration) {
			if (file.hasEntityCandidate) {
				throw `Cannot declare more than one entity per file.`
			}
			if (file.hasEnums || file.hasInterfaces) {
				throw onlyClassInFileError
			}
			file.hasEntityCandidate = true

			let fileImports = fileImportsMapByFilePath[path]
			if (!fileImports) {
				fileImports                    = ImportManager.resolveImports(node.parent, file.path)
				fileImportsMapByFilePath[path] = fileImports
			}
			currentFileImports = fileImports

			// This is a top level class, get its symbol
			let symbol          = checker.getSymbolAtLocation((<ts.ClassDeclaration>node).name)
			let serializedClass = serializeClass(symbol, node.decorators, path, fileImports, node.parent)
			// if (serializedClass) {
			// 	output.push(serializedClass)
			// }
			// No need to walk any further, class expressions/inner declarations
			// cannot be exported
		} else if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
			if (file.hasEntityCandidate) {
				throw onlyClassInFileError
			}
			file.hasInterfaces = true
			// This is a top level interface, get its symbol
			let symbol         = checker.getSymbolAtLocation((<ts.ClassDeclaration>node).name)
			registerInterface(symbol, path)
		} else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
			// This is a namespace, visit its children
			// ts.forEachChild(node, visit);
			throw `Namespaces are not supported in DDL.`
		} else if (node.kind === ts.SyntaxKind.EnumDeclaration) {
			if (file.hasEntityCandidate) {
				throw onlyClassInFileError
			}
			file.hasEnums = true
			let symbol    = checker.getSymbolAtLocation((<ts.EnumDeclaration>node).name)
			enumMap.set(symbol.name, path)
		}
	}


	/** Serialize a symbol into a json object */
	function serializeSymbol(
		symbol: ts.Symbol,
		parent = (<any>symbol).upstream
	): DocEntry {
		const declarations     = symbol.declarations
		let isGenerated        = false
		let allocationSize     = undefined
		let isId               = false
		let isMappedSuperclass = false
		let isTransient        = false
		const decorators       = []
		let declaration
		if (declarations && declarations.length === 1) {
			declaration        = symbol.declarations[0]
			const tsDecorators = declaration.decorators
			if (tsDecorators) {
				for (const tsDecorator of tsDecorators) {
					const decorator: Decorator = serializeDecorator(tsDecorator)
					switch (decorator.name) {
						case 'GeneratedValue':
							isGenerated = true
							break
						case 'SequenceGenerator':
							allocationSize = decorator.values[0].allocationSize
							break
						case 'Id':
							isId = true
							break
						case 'MappedSuperclass':
							isMappedSuperclass = true
							break
						// Skip fields marked with @Transient
						case 'Transient':
							isTransient = true
							break
					}
					decorators.push(decorator)
				}
			}
		}


// 		if (flags & 8 /* NoTruncation */) {
// if (flags & 256 /* UseFullyQualifiedType */) {
// if (flags & 4096 /* SuppressAnyReturnType */) {
// if (flags & 1 /* WriteArrayAsGenericType */) {
// if (flags & 64 /* WriteTypeArgumentsOfSignature */) {

		let type = checker.typeToString(
			checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration),
			parent,
			// 8 + 256 + 1 + 64 + 4096
		)

		if (declaration) {
			if (type === 'any' && declaration) {
				if (declaration.type
					&& declaration.type.typeName) {
					type = declaration.type.typeName.escapedText
				} else if (declaration.type
					&& declaration.type.kind === ts.SyntaxKind.AnyKeyword) {
					// Just the any keyword
				} else {
					throw `Unsupported type: ${type}`
				}
			} else if (type.match(/^\s*any\[\]\s*$/)) {
				if (declaration.type
					&& declaration.type.elementType
					&& declaration.type.elementType.typeName) {
					type = declaration.type.elementType.typeName.escapedText + '[]'
				} else {
					throw `Unsupported array type: ${type}`
				}
			} else if (type.match(/\]\s*:\s*any\s*;*\s*\}\s*$/)) {
				if (declaration.type
					&& declaration.type.members
					&& declaration.type.members[0]
					&& declaration.type.members[0].type
					&& declaration.type.members[0].type.typeName) {
					type = type.replace(/any\s*;*\s*\}\s*$/, declaration.type.members[0].type.typeName.escapedText + '}')
				} else {
					throw `Unsupported map type: ${type}`
				}
			} else if (type.match(/^\s*any\s*$/)) {
				throw `Unsupported type: ${type}`
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
		}
	}

	function serializeMethodDefinition(
		symbol: ts.Symbol
	): MethodSignatureDocEntry {
		const name                              = symbol.getName()
		const parameters: TypeOrParamDocEntry[] = []

		const signature = <ts.SignatureDeclaration>symbol.valueDeclaration
		const tsParams  = signature.parameters

		for (const tsParam of tsParams) {
			const typeInfo = getType(tsParam.type, 0)
			const name     = <string>(<ts.Identifier>tsParam.name).escapedText
			const optional = (<ts.ParameterDeclaration>tsParam).questionToken ? true : false
			parameters.push({...typeInfo, name, optional})
		}

		const typeInfo   = getType(signature.type, 0)
		const optional   = (<ts.FunctionLikeDeclarationBase>signature).questionToken ? true : false
		const returnType = {...typeInfo, name, optional}

		return {
			name,
			parameters,
			returnType,
		}
	}

	function getType(
		tsType: ts.TypeNode,
		arrayDepth: number
	): TypeOrParamDocEntry {
		let type          = 'any'
		let primitive     = null
		let genericParams = []
		const typeInfo    = {
			type,
			primitive,
			arrayDepth,
			genericParams
		}
		if (!tsType) {
			return typeInfo
		}
		switch (tsType.kind) {
			case ts.SyntaxKind.ArrayType:
				return getType((<ts.ArrayTypeNode>tsType).elementType, ++arrayDepth)
			case ts.SyntaxKind.AnyKeyword:
				return typeInfo
			case ts.SyntaxKind.BooleanKeyword:
				type = primitive = 'boolean'
				return {...typeInfo, primitive, type}
			case ts.SyntaxKind.NumberKeyword:
				type = primitive = 'number'
				return {...typeInfo, primitive, type}
			case ts.SyntaxKind.StringKeyword:
				type = primitive = 'string'
				return {...typeInfo, primitive, type}
			case ts.SyntaxKind.VoidKeyword:
				type = 'void'
				return {...typeInfo, type}
			case ts.SyntaxKind.TypeReference:
				const typeName: ts.Identifier = <ts.Identifier>(<ts.TypeReferenceNode>tsType).typeName
				const typeArguments           = (<ts.TypeReferenceNode>tsType).typeArguments
				if (typeArguments && typeArguments.length) {
					genericParams = typeArguments.map(
						genericParam => getType(genericParam, 0))
				}
				type = <string>typeName.escapedText
				return {...typeInfo, type, genericParams}
			default:
				throw `Unsupported Syntax kind for method parameter/type: ${tsType.kind}`
		}
	}

	function serializeDecorator(
		tsDecorator: ts.Decorator
	): Decorator {
		let expression: ts.CallExpression = <ts.CallExpression>tsDecorator.expression
		let decoratorName: string
		if (expression.expression) {
			decoratorName = (<ts.Identifier>expression.expression).text
		} else {
			decoratorName = (<ts.Identifier><any>expression).text
		}
		let values = []
		if (expression.arguments) {
			expression.arguments.forEach((
				argument: ts.Node
			) => {
				let value = parseObjectProperty(argument, TsObjectType.DECORATOR, decoratorName)
				if (value !== undefined) {
					values.push(value)
				}
			})
		}
		const decorator: Decorator = {
			name: decoratorName,
			values: values
		}

		return decorator
	}

	function parseObjectLiteralExpression(
		objLitExpr: ts.ObjectLiteralExpression
	): any {
		let object = {}
		if (objLitExpr.properties) {
			objLitExpr.properties.forEach((
				property: ts.PropertyAssignment
			) => {
				const propertyName   = (<ts.Identifier>property.name).text
				const initializer    = property.initializer
				const value          = parseObjectProperty(initializer, TsObjectType.OBJECT_LITERAL, propertyName)
				object[propertyName] = value
			})
		}

		return object
	}

	function parseObjectProperty(
		initializer: ts.Node,
		objectType: TsObjectType,
		objectName: string
	): any {
		let value
		switch (initializer.kind) {
			case ts.SyntaxKind.Identifier:
				let identifier = <ts.Identifier>initializer
				switch (identifier.text) {
					case 'undefined':
						value = undefined
						break
					case 'NaN':
						value = NaN
						break
					// Must be a variable declaration
					default:
						value = 'var ' + identifier.text
						break
				}
				break
			case ts.SyntaxKind.NullKeyword:
				value = null
				break
			case ts.SyntaxKind.RegularExpressionLiteral:
				let regExp = <ts.Identifier>initializer
				value      = convertRegExpStringToObject(regExp.text)
				break
			case ts.SyntaxKind.StringLiteral:
			case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
				value = (<ts.StringLiteral>initializer).text
				break
			case ts.SyntaxKind.TrueKeyword:
				value = true
				break
			case  ts.SyntaxKind.FalseKeyword:
				value = false
				break
			case ts.SyntaxKind.NumericLiteral:
				let numberText = (<any>initializer).text
				if (numberText.indexOf('.') > 0) {
					value = parseFloat(numberText)
				} else {
					value = parseInt(numberText)
				}
				break
			case ts.SyntaxKind.NewExpression:
				let newExpression = <ts.NewExpression>initializer
				let type          = (<ts.Identifier>newExpression.expression).text
				value             = 'new ' + type
				break
			case ts.SyntaxKind.ObjectLiteralExpression:
				value = parseObjectLiteralExpression(<ts.ObjectLiteralExpression>initializer)
				break
			case ts.SyntaxKind.ArrayLiteralExpression:
				value            = []
				let arrayLiteral = <ts.ArrayLiteralExpression>initializer
				arrayLiteral.elements.forEach((
					element: ts.Node
				) => {
					let arrayObjectType = objectType
					switch (objectType) {
						case TsObjectType.DECORATOR:
							arrayObjectType = TsObjectType.DECORATOR_ARRAY
							break
						case TsObjectType.OBJECT_LITERAL:
							arrayObjectType = TsObjectType.OBJECT_LITERAL_ARRAY
							break
					}
					let arrayValue = parseObjectProperty(element, arrayObjectType, objectName)
					value.push(arrayValue)
				})
				break
			case ts.SyntaxKind.PropertyAccessExpression:
				value = convertPropertyAccessExpressionToString(<ts.PropertyAccessExpression>initializer)
				break
			case ts.SyntaxKind.CallExpression:
				throw `Function calls are not allowed as parameter values.`
			case ts.SyntaxKind.BinaryExpression:
				throw `Expression are not allowed as parameter values.`
			case ts.SyntaxKind.ArrowFunction:
				if (objectType == TsObjectType.DECORATOR && objectName === 'WhereJoinTable') {
					const printer = ts.createPrinter({
						newLine: ts.NewLineKind.LineFeed,
						removeComments: true
					})
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
					const typescriptDefinition = printer.printNode(ts.EmitHint.Expression, initializer, currentSourceFile)
					const compilerOptions      = {module: ts.ModuleKind.CommonJS}
					const transpilationResult  = ts.transpileModule(typescriptDefinition, {
						compilerOptions: compilerOptions,
						moduleName: 'WhereJoinTableModule'
					})
					value                      = transpilationResult.outputText
					break
				}
			default:
				let objectTypeDescription = ''
				switch (objectType) {
					case TsObjectType.OBJECT_LITERAL:
						objectTypeDescription = 'object literal'
						break
					case TsObjectType.OBJECT_LITERAL_ARRAY:
						objectTypeDescription = 'object literal array'
						break
					case TsObjectType.DECORATOR:
						objectTypeDescription = 'decorator'
						break
					case TsObjectType.DECORATOR_ARRAY:
						objectTypeDescription = 'decorator array'
						break

				}
				throw `Unsupported property initializer.kind: ${initializer.kind} for ${objectTypeDescription}: ${objectName}`
		}

		return value
	}

	function convertPropertyAccessExpressionToString(
		propAccessExrp: ts.PropertyAccessExpression
	): string {
		let leftHandExrp = <ts.Identifier>propAccessExrp.expression
		return `${leftHandExrp.text}.${propAccessExrp.name.text}`
	}

	function convertRegExpStringToObject(
		regExpString: string
	): RegExp {
		let firstIndexOfSlash = regExpString.indexOf('/')
		if (firstIndexOfSlash < 0) {
			return new RegExp(regExpString)
		}
		let lastIndexOfSlash = regExpString.lastIndexOf('/')
		if (firstIndexOfSlash === lastIndexOfSlash) {
			return new RegExp(regExpString)
		}

		let regExpFragments = regExpString.split('/')

		return new RegExp(regExpFragments[1], regExpFragments[2])
	}

	function forEach(
		collection,
		callback: {
			(
				key: string,
				item: any
			): void
		}
	) {
		if (collection instanceof Map) {
			for (let [key, value] of collection.entries()) {
				callback(key, value)
			}
		} else {
			for (let memberName in collection) {
				callback(memberName, collection[memberName])
			}
		}
	}

	/** Serialize a class symbol information */
	function serializeClass(
		symbol: ts.Symbol,
		decorators: ts.NodeArray<ts.Decorator>,
		classPath: string,
		fileImports: FileImports,
		file
	): ClassDocEntry {
		const details: ClassDocEntry = serializeSymbol(symbol, file)
		details.fileImports          = fileImports

		let properties: PropertyDocEntry[]              = []
		let methodSignatures: MethodSignatureDocEntry[] = []
		let ids: DocEntry[]                             = []

		forEach(symbol.members, (
			memberName,
			member
		) => {
			if (member.valueDeclaration) {
				switch (member.valueDeclaration.kind) {
					case ts.SyntaxKind.PropertyDeclaration:
						console.log(`Property: ${memberName}`)
						let propertySymbolDescriptor = serializeSymbol(member, file)
						if (propertySymbolDescriptor) {
							if (propertySymbolDescriptor.isId) {
								ids.push(propertySymbolDescriptor)
							}
							properties.push(propertySymbolDescriptor)
						}
						break
					case ts.SyntaxKind.MethodDeclaration:
						console.log(`Method: ${memberName}`)
						const isPublic = !member.valueDeclaration.modifiers
							|| member.valueDeclaration.modifiers.filter(
								modifier =>
									modifier.kind === ts.SyntaxKind.PrivateKeyword
									|| modifier.kind === ts.SyntaxKind.ProtectedKeyword).length < 1
						if (isPublic) {
							methodSignatures.push(serializeMethodDefinition(member))
						}
						break
					default:
						throw `Not implemented`
				}
			} else if (member.declarations) {
				// declaration (constructor, method)
				if (member.declarations.length === 1 && member.declarations[0].kind === ts.SyntaxKind.Constructor) {
					// do not record the constructor
				} else {
					throw 'Not implemented'
				}
			} else {
				// value declaration (properity)
				throw 'Not implemented'
			}
		})
		details.properties       = properties
		details.methodSignatures = methodSignatures

		// Get the construct signatures
		let constructorType  = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
		details.constructors = constructorType.getConstructSignatures().map(serializeSignature)

		let parentClassName = getParentClassName(symbol)
		let parentClassImport: string
		if (parentClassName) {
			parentClassImport = getParentClassImport(<ts.Node><any>symbol, parentClassName)
		}

		let entityDecorator = isDecoratedAsEntity(decorators)

		let classInheritanceEntry = globalCandidateInheritanceMap[details.name]
		if (classInheritanceEntry != undefined) {
			throw `Found duplicate entity '${details.name}'. Non-unique class names are not supported`
		}

		if (entityDecorator) {
			let entityCandidate      = EntityCandidate.create(details.name, classPath, parentClassName, parentClassImport, entityDecorator.isSuperclass)
			entityCandidate.docEntry = details
			entityCandidate.ids = ids

			entityCandidate.implementedInterfaceNames = getImplementedInterfaces(symbol)

			details.properties.forEach(
				property => {
					property.ownerEntity = entityCandidate
				})

			globalCandidateRegistry.addCandidate(entityCandidate)
			processedCandidateRegistry.addCandidate(entityCandidate)

			globalCandidateInheritanceMap[details.name] = parentClassName
			if (globalCandidateInheritanceMap[parentClassName] == undefined) {
				globalCandidateInheritanceMap[parentClassName] = null
			}
		} else if (classInheritanceEntry == null) {
			globalCandidateInheritanceMap[details.name] = parentClassName
		}

		return details
	}

	function registerInterface(
		symbol: ts.Symbol,
		classPath: string
	) {
		let anInterface = new Interface(classPath, symbol.name)
		let interfaces  = globalCandidateRegistry.allInterfacesMap.get(symbol.name)
		if (!interfaces) {
			interfaces = []
			globalCandidateRegistry.allInterfacesMap.set(symbol.name, interfaces)
		}
		interfaces.push(anInterface)
	}


	/** Serialize a signature (call or construct) */
	function serializeSignature(signature: ts.Signature) {
		return {
			parameters: signature.parameters.map(serializeSymbol),
			returnType: checker.typeToString(signature.getReturnType()),
			// documentation:
			// ts.displayPartsToString(signature.getDocumentationComment(undefined))
		}
	}

	/** True if this is visible outside this file, false otherwise */
	function isNodeExported(node: ts.Node): boolean {
		return (node.flags & ts.ModifierFlags.Export) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
	}
}
