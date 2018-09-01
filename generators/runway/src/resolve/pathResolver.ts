import {QEntityFileBuilder} from '../builder/entity/QEntityFileBuilder'
import {EntityCandidate}    from '../parser/EntityCandidate'

/**
 * Created by Papa on 4/27/2016.
 */

export function resolveRelativeEntityPath(
	from: EntityCandidate, //
	to: EntityCandidate //
): string {
	return resolveRelativePath(from.path, to.path)
}

/**
 * Gets the full path to the import in a given file.
 *
 * @param {string} relativePath  ../../e/f/importedFileName
 * @param {string} relativeToPath  /a/b/c/sourceFileName
 * @returns {string}
 */
export function getFullPathFromRelativePath(
	relativePath: string, //
	relativeToPath: string, //
): string {
	if (relativePath.indexOf('.') !== 0) {
		return relativePath
	}

	relativePath   = normalizePath(relativePath)
	relativeToPath = normalizePath(relativeToPath)

	const relativeFragments   = relativePath.split('/')
	const relativeToFragments = relativeToPath.split('/')

	const numDirectoriesBack = relativeFragments.filter(
		relativeFragment => relativeFragment === '..').length

	const numCommonFragments = relativeToFragments.length - numDirectoriesBack - 1

	const commonFragments = []
	for (let i = 0; i < numCommonFragments; i++) {
		commonFragments.push(relativeToFragments[i])
	}
	let commonRelativeFragmentIndex = numDirectoriesBack
	if (!commonRelativeFragmentIndex) {
		commonRelativeFragmentIndex++
	}
	for (let j = commonRelativeFragmentIndex; j < relativeFragments.length; j++) {
		commonFragments.push(relativeFragments[j])
	}

	return commonFragments.join('/')
}

export function resolveRelativePath(
	fromPath: string, //
	toPath: string //
): string {
	fromPath = normalizePath(fromPath)
	toPath   = normalizePath(toPath)

	let fromFragments      = fromPath.split('/')
	let toFragments        = toPath.split('/')
	let numCommonFragments = 0
	for (let i = 0; i < fromFragments.length; i++) {
		let fromFragment
		if (fromFragments[i]) {
			fromFragment = fromFragments[i].toLowerCase()
		}
		let toFragment
		if (toFragments[i]) {
			toFragment = toFragments[i].toLowerCase()
		}

		if (fromFragment !== toFragment) {
			break
		}
		numCommonFragments = i + 1
	}

	let numFromPathDiffDirectories = fromFragments.length - numCommonFragments - 1
	let toPathDiffNodes            = toFragments.slice(numCommonFragments)

	let relativePath = ''
	if (numFromPathDiffDirectories == 0) {
		relativePath = './'
	} else {
		for (let i = 0; i < numFromPathDiffDirectories; i++) {
			relativePath += '../'
		}
	}
	for (let i = 0; i < toPathDiffNodes.length; i++) {
		relativePath += toPathDiffNodes[i]
		if (i < toPathDiffNodes.length - 1) {
			relativePath += '/'
		}
	}

	return relativePath
}

export function addImportForType(
	entity: EntityCandidate,
	type: string,
	fileBuilder: QEntityFileBuilder
) {
	const moduleImport = entity.docEntry.fileImports.importMapByObjectAsName[type]
	if (!moduleImport) {
		throw `Could not find import for ${type} in file for '${entity.type}'`
	}
	let relativePathToImport = moduleImport.path
	if (moduleImport.path.indexOf('.') === 0) {
		const fullPathToImport = getFullPathFromRelativePath(moduleImport.path, entity.path)
		relativePathToImport   = resolveRelativePath(fileBuilder.fullGenerationPath, fullPathToImport)
	}
	fileBuilder.addImport([moduleImport.objectMapByAsName[type]], relativePathToImport, false)
}

/*
 *   ../../e/f/g
 *   /a/b/c/d
 *
 */

export function normalizePath(
	path: string
): string {
	let forwardSlashedPath = path.replace(/\\/g, '/')
	return forwardSlashedPath
	// let lowercasePath = forwardSlashedPath.toLowerCase();

	// return lowercasePath;
}

export function canBeInterface(
	type: string
): boolean {
	return type.startsWith('I')
}

export function getImplNameFromInterfaceName(
	interfaceName: string
): string {
	return interfaceName.substr(1)
}
