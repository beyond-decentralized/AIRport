import * as ts from 'typescript'
import tsc from 'typescript'
import { getExpectedPropertyIndexesFormatMessage } from '../../ParserUtils'
import {
	ClassDocEntry,
	Decorator,
	DocEntry,
	MethodSignatureDocEntry,
	PropertyDocEntry,
	TypeOrParamDocEntry
} from './DocEntry'
import {
	EntityCandidate,
	Interface
} from './EntityCandidate'
import { EntityCandidateRegistry } from './EntityCandidateRegistry'
import {
	EntityFile,
	FileImports
} from './FileImports'
import { ImportManager } from './ImportManager'
import {
	getImplementedInterfaces,
	getParentClassImport,
	getParentClassName,
	isDecoratedAsEntity
} from './utils'

/**
 * Created by Papa on 3/26/2016.
 */

export class GlobalCandidates {

	_registry: EntityCandidateRegistry
	inheritanceMap: Map<string, string> = new Map<string, string>()

	get registry(): EntityCandidateRegistry {
		if (!this._registry) {
			this._registry = new EntityCandidateRegistry()
		}

		return this._registry
	}

}

export const GLOBAL_CANDIDATES = new GlobalCandidates()

enum TsObjectType {
	OBJECT_LITERAL = 'OBJECT_LITERAL',
	OBJECT_LITERAL_ARRAY = 'OBJECT_LITERAL_ARRAY',
	DECORATOR = 'DECORATOR',
	DECORATOR_ARRAY = 'DECORATOR_ARRAY',
}

let currentFileImports
const entityFileMap: { [classPath: string]: EntityFile } = {}
const fileImportsMapByFilePath: { [path: string]: FileImports } = {}


export function visitEntityFile(
	node: ts.Node,
	path: string
) {
	let file = entityFileMap[path]
	if (!file) {
		file = {
			path,
			hasEntityCandidate: false,
			hasEnums: false,
			hasInterfaces: false
		}
		entityFileMap[path] = file
	}

	const onlyClassInFileError = `
	Error in file:
${path}
	Cannot declare entities in same files as interfaces and enums (needed for DDL hiding).
	NOTE: Entity interface is already generated for you. If you need addition interfaces
	please put them into src/types.ts file.`

	if (node.kind === tsc.SyntaxKind.ClassDeclaration) {
		if (file.hasEntityCandidate) {
			throw new Error(`Cannot declare more than one entity per file.`)
		}
		if (file.hasEnums || file.hasInterfaces) {
			throw new Error(onlyClassInFileError)
		}
		file.hasEntityCandidate = true

		let fileImports = fileImportsMapByFilePath[path]
		if (!fileImports) {
			fileImports = ImportManager.resolveImports(node.parent, file.path)
			fileImportsMapByFilePath[path] = fileImports
		}
		currentFileImports = fileImports

		// This is a top level class, get its symbol
		let symbol = globalThis.checker
			.getSymbolAtLocation((<ts.ClassDeclaration>node).name)
		const decorators = tsc.getDecorators(node as any)
		let serializedClass = serializeClass(symbol, decorators, path, fileImports, node.parent)
		// if (serializedClass) {
		// 	 output.push(serializedClass)
		// }
		// No need to walk any further, class expressions/inner declarations
		// cannot be exported
	} else if (node.kind === tsc.SyntaxKind.InterfaceDeclaration) {
		if (file.hasEntityCandidate) {
			throw new Error(onlyClassInFileError)
		}
		file.hasInterfaces = true
		// This is a top level interface, get its symbol
		let symbol = globalThis.checker
			.getSymbolAtLocation((<ts.ClassDeclaration>node).name)
		registerInterface(symbol, path)
	} else if (node.kind === tsc.SyntaxKind.ModuleDeclaration) {
		// This is a namespace, visit its children
		// tsc.forEachChild(node, visit);
		throw new Error(`Namespaces are not supported in DDL.`)
	} else if (node.kind === tsc.SyntaxKind.EnumDeclaration) {
		if (file.hasEntityCandidate) {
			throw new Error(onlyClassInFileError)
		}
		file.hasEnums = true
		let symbol = globalThis.checker
			.getSymbolAtLocation((<ts.EnumDeclaration>node).name)
		GLOBAL_CANDIDATES.registry.enumMap.set(symbol.name, path)
	}
}


/** Serialize a symbol into a json object */
function serializeSymbol(
	symbol: ts.Symbol,
	parent = (<any>symbol).parent
): DocEntry {
	const declarations = symbol.declarations
	let isGenerated = false
	let allocationSize = undefined
	let isId = false
	let isMappedSuperclass = false
	let isTransient = false
	const decorators = []
	let declaration
	let optional
	if (declarations && declarations.length === 1) {
		declaration = symbol.declarations[0]
		const tsDecorators = tsc.getDecorators(declaration)
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

	let type = globalThis.checker.typeToString(
		globalThis.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration),
		parent,
		// 8 + 256 + 1 + 64 + 4096
	)

	if (declaration) {
		optional = !!declaration.questionToken
		if (type === 'any' && declaration) {
			if (declaration.type
				&& declaration.type.typeName) {
				type = declaration.type.typeName.escapedText
			} else if (declaration.type
				&& declaration.type.kind === tsc.SyntaxKind.AnyKeyword) {
				// Just the any keyword
			} else {
				throw new Error(`Unsupported type for ''${getSymbolLocationString(symbol, parent)}': ${type} (implicit if 'any')`)
			}
		} else if (type.match(/^\s*any\[\]\s*$/)) {
			if (declaration.type
				&& declaration.type.elementType
				&& declaration.type.elementType.typeName) {
				type = declaration.type.elementType.typeName.escapedText + '[]'
			} else {
				throw new Error(`Unsupported array type for '${getSymbolLocationString(symbol, parent)}': ${type}`)
			}
		} else if (type.match(/\]\s*:\s*any\s*;*\s*\}\s*$/)) {
			if (declaration.type
				&& declaration.type.members
				&& declaration.type.members[0]
				&& declaration.type.members[0].type
				&& declaration.type.members[0].type.typeName) {
				type = type.replace(/any\s*;*\s*\}\s*$/, declaration.type.members[0].type.typeName.escapedText + '}')
			} else {
				throw new Error(`Unsupported map type for '${getSymbolLocationString(symbol, parent)}': ${type}`)
			}
		} else if (type.match(/^\s*any\s*$/)) {
			throw new Error(`Unsupported type for '${getSymbolLocationString(symbol, parent)}': ${type}`)
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
		optional,
		// documentation:
		// tsc.displayPartsToString(symbol.getDocumentationComment(undefined)),
		type
	}
}

function getSymbolLocationString(
	symbol: ts.Symbol,
	parent
) {
	let parentPrefix = 'unknown'
	if (parent.fileName) {
		parentPrefix = parent.fileName
	} else if (parent.getName) {
		parentPrefix = parent.getName()
	}
	return `${parentPrefix} -> ${symbol.getName()}`
}

function serializeMethodDefinition(
	symbol: ts.Symbol
): MethodSignatureDocEntry {
	const name = symbol.getName()
	const parameters: TypeOrParamDocEntry[] = []

	const signature = <ts.SignatureDeclaration>symbol.valueDeclaration
	const tsParams = signature.parameters

	for (const tsParam of tsParams) {
		const typeInfo = getType(tsParam.type, 0)
		const name = <string>(<ts.Identifier>tsParam.name).escapedText
		const optional = (<ts.ParameterDeclaration>tsParam).questionToken ? true : false
		parameters.push({ ...typeInfo, name, optional })
	}

	const typeInfo = getType(signature.type, 0)
	const optional = (<ts.FunctionLikeDeclarationBase>signature).questionToken ? true : false
	const returnType = { ...typeInfo, name, optional }

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
	let type = 'any'
	let primitive = null
	let genericParams = []
	const typeInfo = {
		type,
		primitive,
		arrayDepth,
		genericParams
	}
	if (!tsType) {
		return typeInfo
	}
	switch (tsType.kind) {
		case tsc.SyntaxKind.ArrayType:
			return getType((<ts.ArrayTypeNode>tsType).elementType, ++arrayDepth)
		case tsc.SyntaxKind.AnyKeyword:
			return typeInfo
		case tsc.SyntaxKind.BooleanKeyword:
			type = primitive = 'boolean'
			return { ...typeInfo, primitive, type }
		case tsc.SyntaxKind.NumberKeyword:
			type = primitive = 'number'
			return { ...typeInfo, primitive, type }
		case tsc.SyntaxKind.StringKeyword:
			type = primitive = 'string'
			return { ...typeInfo, primitive, type }
		case tsc.SyntaxKind.VoidKeyword:
			type = 'void'
			return { ...typeInfo, type }
		case tsc.SyntaxKind.TypeReference:
			const typeName: ts.Identifier = <ts.Identifier>(<ts.TypeReferenceNode>tsType).typeName
			const typeArguments = (<ts.TypeReferenceNode>tsType).typeArguments
			if (typeArguments && typeArguments.length) {
				genericParams = typeArguments.map(
					genericParam => getType(genericParam, 0))
			}
			type = <string>typeName.escapedText
			return { ...typeInfo, type, genericParams }
		default:
			throw new Error(
				`Unsupported Syntax kind for method parameter/type: ${tsType.kind}`)
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
			const propertyName = (<ts.Identifier>property.name).text
			const initializer = property.initializer
			const value = parseObjectProperty(initializer, TsObjectType.OBJECT_LITERAL, propertyName)
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
		case tsc.SyntaxKind.Identifier:
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
		case tsc.SyntaxKind.NullKeyword:
			value = null
			break
		case tsc.SyntaxKind.RegularExpressionLiteral:
			let regExp = <ts.Identifier>initializer
			value = convertRegExpStringToObject(regExp.text)
			break
		case tsc.SyntaxKind.StringLiteral:
		case tsc.SyntaxKind.NoSubstitutionTemplateLiteral:
			value = (<ts.StringLiteral>initializer).text
			break
		case tsc.SyntaxKind.TrueKeyword:
			value = true
			break
		case tsc.SyntaxKind.FalseKeyword:
			value = false
			break
		case tsc.SyntaxKind.NumericLiteral:
			let numberText = (<any>initializer).text
			if (numberText.indexOf('.') > 0) {
				value = parseFloat(numberText)
			} else {
				value = parseInt(numberText)
			}
			break
		case tsc.SyntaxKind.NewExpression:
			let newExpression = <ts.NewExpression>initializer
			let type = (<ts.Identifier>newExpression.expression).text
			value = 'new ' + type
			break
		case tsc.SyntaxKind.ObjectLiteralExpression:
			value = parseObjectLiteralExpression(<ts.ObjectLiteralExpression>initializer)
			break
		case tsc.SyntaxKind.ArrayLiteralExpression:
			value = []
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
		case tsc.SyntaxKind.PropertyAccessExpression:
			value = convertPropertyAccessExpressionToString(<ts.PropertyAccessExpression>initializer)
			break
		case tsc.SyntaxKind.CallExpression:
			throw new Error(
				`Function calls are not allowed as parameter values.`)
		case tsc.SyntaxKind.BinaryExpression:
			throw new Error(`Expression are not allowed as parameter values.`)
		case tsc.SyntaxKind.ArrowFunction:
			const arrowFunction = <ts.ArrowFunction>initializer
			for (const parameter of arrowFunction.parameters) {
				if (!parameter.name || !parameter.type) {
					throw new Error(`Uxpected @Table property indexes:${getExpectedPropertyIndexesFormatMessage()}`)
				}
			}
			const parameters = arrowFunction.parameters.map(parameter => ({
				name: (parameter.name as any).escapedText,
				type: (parameter.type as any).typeName.escapedText
			}))
			let body
			try {
				body = parseObjectProperty(arrowFunction.body, TsObjectType.OBJECT_LITERAL, null)
			} catch (e) {
				throw new Error(`Uxpected @Table property indexes:${getExpectedPropertyIndexesFormatMessage()}`)
			}
			value = {
				body,
				parameters
			}
			if (objectType == TsObjectType.DECORATOR && objectName === 'WhereJoinTable') {
				const printer = tsc.createPrinter({
					newLine: tsc.NewLineKind.LineFeed,
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
				const transpilationResult = tsc.transpileModule(tempFile, {
					compilerOptions: compilerOptions,
					moduleName: "WhereJoinTableModule"
				});
				value = transpilationResult.outputText;
				*/

				// For now allow only and, or & not functions and everything from
				// airport reference (and nothing else)
				const typescriptDefinition = printer.printNode(
					tsc.EmitHint.Expression, initializer, globalThis.currentSourceFile)
				const compilerOptions = { module: ts.ModuleKind.CommonJS }
				const transpilationResult = tsc.transpileModule(typescriptDefinition, {
					compilerOptions: compilerOptions,
					moduleName: 'WhereJoinTableModule'
				})
				value = transpilationResult.outputText
			}
			break
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
			throw new Error(`Unsupported property initializer.kind: ${initializer.kind}
				 for ${objectTypeDescription}: ${objectName}`)
	}

	return value
}

function convertPropertyAccessExpressionToString(
	propAccessExrp: ts.PropertyAccessExpression
): string {
	let leftHandExrp = <ts.Identifier>propAccessExrp.expression
	let suffix = '.' + propAccessExrp.name.text
	if (leftHandExrp.text) {
		return `${leftHandExrp.text}${suffix}`
	} else {
		return convertPropertyAccessExpressionToString(leftHandExrp as any) + suffix
	}
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
	decorators: readonly ts.Decorator[],
	classPath: string,
	fileImports: FileImports,
	file
): ClassDocEntry {
	const details: ClassDocEntry = serializeSymbol(symbol, file)
	details.fileImports = fileImports

	let properties: PropertyDocEntry[] = []
	let methodSignatures: MethodSignatureDocEntry[] = []
	let ids: DocEntry[] = []

	forEach(symbol.members, (
		memberName,
		member
	) => {
		if (member.valueDeclaration) {
			switch (member.valueDeclaration.kind) {
				case tsc.SyntaxKind.PropertyDeclaration:
					console.log(`Property: ${memberName}`)
					let propertySymbolDescriptor = serializeSymbol(member, file)
					if (propertySymbolDescriptor) {
						if (propertySymbolDescriptor.isId) {
							ids.push(propertySymbolDescriptor)
						}
						properties.push(propertySymbolDescriptor)
					}
					break
				case tsc.SyntaxKind.MethodDeclaration:
					console.log(`Method: ${memberName}`)
					const isPublic = !member.valueDeclaration.modifiers
						|| member.valueDeclaration.modifiers.filter(
							modifier =>
								modifier.kind === tsc.SyntaxKind.PrivateKeyword
								|| modifier.kind === tsc.SyntaxKind.ProtectedKeyword).length < 1
					if (isPublic) {
						methodSignatures.push(serializeMethodDefinition(member))
					}
					break
				case tsc.SyntaxKind.GetAccessor:
					// 		if (flags & 8 /* NoTruncation */) {
					// if (flags & 256 /* UseFullyQualifiedType */) {
					// if (flags & 4096 /* SuppressAnyReturnType */) {
					// if (flags & 1 /* WriteArrayAsGenericType */) {
					// if (flags & 64 /* WriteTypeArgumentsOfSignature */) {

					let type = globalThis.checker.typeToString(
						globalThis.checker.getTypeOfSymbolAtLocation(member, member.valueDeclaration),
						file,
						// 8 + 256 + 1 + 64 + 4096
					)

					properties.push({
						decorators: [],
						isTransient: true,
						name: member.getName(),
						optional: true,
						// documentation:
						// tsc.displayPartsToString(symbol.getDocumentationComment(undefined)),
						type
					});
					break;
				default:
					// skip
					break;
			}
		} else if (member.declarations) {
			// declaration (constructor, method)
			if (member.declarations.length === 1 && member.declarations[0].kind === tsc.SyntaxKind.Constructor) {
				// do not record the constructor
			} else {
				throw new Error('Not implemented')
			}
		} else {
			// value declaration (properity)
			throw new Error('Not implemented')
		}
	})
	details.properties = properties
	details.methodSignatures = methodSignatures

	// Get the construct signatures
	let constructorType = globalThis.checker
		.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
	details.constructors = constructorType.getConstructSignatures().map(serializeSignature)

	let parentClassName = getParentClassName(symbol)
	let parentClassImport: string
	if (parentClassName) {
		parentClassImport = getParentClassImport(<ts.Node><any>symbol, parentClassName)
	}

	let entityDecorator = isDecoratedAsEntity(decorators)

	let classInheritanceEntry = GLOBAL_CANDIDATES.inheritanceMap[details.name]
	if (classInheritanceEntry != undefined) {
		throw new Error(`Found duplicate entity '${details.name}'. 
			Non-unique class names are not supported`)
	}

	if (entityDecorator) {
		let entityCandidate = EntityCandidate.create(details.name, classPath, parentClassName, parentClassImport, entityDecorator.isSuperclass)
		entityCandidate.docEntry = details
		entityCandidate.ids = ids

		entityCandidate.implementedInterfaceNames = getImplementedInterfaces(symbol)

		details.properties.forEach(
			property => {
				property.ownerEntity = entityCandidate
			})

		GLOBAL_CANDIDATES.registry.addCandidate(entityCandidate)

		GLOBAL_CANDIDATES.inheritanceMap[details.name] = parentClassName
		if (GLOBAL_CANDIDATES.inheritanceMap[parentClassName] == undefined) {
			GLOBAL_CANDIDATES.inheritanceMap[parentClassName] = null
		}
	} else if (classInheritanceEntry == null) {
		GLOBAL_CANDIDATES.inheritanceMap[details.name] = parentClassName
	}

	return details
}

function registerInterface(
	symbol: ts.Symbol,
	classPath: string
) {
	let anInterface = new Interface(classPath, symbol.name)
	let interfaces = GLOBAL_CANDIDATES.registry.allInterfacesMap.get(symbol.name)
	if (!interfaces) {
		interfaces = []
		GLOBAL_CANDIDATES.registry.allInterfacesMap.set(symbol.name, interfaces)
	}
	interfaces.push(anInterface)
}


/** Serialize a signature (call or construct) */
function serializeSignature(signature: ts.Signature) {
	return {
		parameters: signature.parameters.map(serializeSymbol),
		returnType: globalThis.checker.typeToString(signature.getReturnType()),
		// documentation:
		// tsc.displayPartsToString(signature.getDocumentationComment(undefined))
	}
}

/** True if this is visible outside this file, false otherwise */
function isNodeExported(node: ts.Node): boolean {
	return (node.flags & ts.ModifierFlags.Export) !== 0 || (node.parent && node.parent.kind === tsc.SyntaxKind.SourceFile)
}
