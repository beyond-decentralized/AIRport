import { DbApplication } from '@airport/ground-control'
import * as ts from 'typescript'
import { visitDaoFile } from './dao/parser/OperationGenerator'
import { Configuration } from './ddl/options/Options'
import { EntityCandidate } from './ddl/parser/EntityCandidate'
import {
	GLOBAL_CANDIDATES,
	visitEntityFile
} from './ddl/parser/EntityDefinitionGenerator'
import { getClassPath } from './ddl/parser/utils'
import tsc from 'typescript'
import { visitApiFile } from './api/parser/ApiGenerator'
import { PathBuilder } from './ddl/builder/PathBuilder'
import { normalizePath } from './resolve/pathResolver'
import { DB_APPLICATION_LOADER } from './ddl/loader/ApplicationLoader'
import { JsonApplicationWithApi } from '@airport/air-traffic-control'

export interface IFileProcessor<Candidate> {

	getDir(): string

	process(
		node: ts.Node,
		path: string
	): void

	finishProcessing(
	): Promise<{ [dtoName: string]: Candidate }>

	build(
		pathBuilder: PathBuilder,
		jsonApplication: JsonApplicationWithApi
	): void

}

export const additionalFileProcessors: IFileProcessor<any>[] = []

export function addFileProcessor(
	fileProcessor: IFileProcessor<any>
): void {
	additionalFileProcessors.push(fileProcessor)
}

/** Generate documention for all classes in a set of .ts files */
export async function generateDefinitions(
	fileNames: string[],
	options: ts.CompilerOptions,
	configuration: Configuration,
	applicationMapByProjectName: { [projectName: string]: DbApplication }
): Promise<{ [entityName: string]: EntityCandidate }> {
	// Build a program using the set of root file names in fileNames
	let program = tsc.createProgram(fileNames, options)
	globalThis.checker = program.getTypeChecker()

	// Get the checker, we will use it to find more about classes
	GLOBAL_CANDIDATES.registry.configuration = configuration
	DB_APPLICATION_LOADER.setApplicationMap(applicationMapByProjectName)

	// const daoFileMap: { [classPath: string]: DaoFile } = {}

	const sourceFiles = program.getSourceFiles()

	// Visit every sourceFile in the program
	for (const sourceFile of sourceFiles) {
		if (sourceFile.fileName.indexOf('node_modules') > -1
			|| sourceFile.fileName.indexOf('src/generated') > -1) {
			continue
		}
		globalThis.currentSourceFile = sourceFile
		// Walk the tree to searchOne for classes
		tsc.forEachChild(sourceFile, visit)
	}

	// print out the doc
	// fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));

	const entityCandidateMap = await GLOBAL_CANDIDATES.registry
		.matchVerifiedEntities()

	for (const additionalFileProcessor of additionalFileProcessors) {
		await additionalFileProcessor.finishProcessing()
	}

	return entityCandidateMap
}

/** visit nodes finding exported classes */
function visit(
	node: ts.Node
) {
	let path = getClassPath((<any>node).parent)
	// Only top level entities are supported
	if (!path) {
		return
	}
	// Do not process libraries
	if (path.indexOf('node_modules') > -1) {
		return
	}
	// Do not process files outside of the project (possible with MS Rush setup)
	if (path.indexOf(process.cwd() + '/src') > -1
		&& path.indexOf(process.cwd() + '\\src') > -1) {
		return
	}
	// if (path.indexOf(globalThis.configuration.airport.node_modulesLinks.pathToProject) == -1) {
	// 	return
	// }

	if (globalThis.configuration.airport.daoDir
		&& path.indexOf(globalThis.configuration.airport.daoDir) > 0) {
		visitDaoFile(node, path)
	} else if (path.indexOf(globalThis.configuration.airport.ddlDir) > 0) {
		visitEntityFile(node, path)
	} else if (globalThis.configuration.airport.apiDir
		&& path.indexOf(globalThis.configuration.airport.apiDir) > 0) {
		visitApiFile(node, path)
	}
	for (const fileProcessor of additionalFileProcessors) {
		let normalizedPath = normalizePath(path)

		if (normalizedPath.indexOf(fileProcessor.getDir()) > -1) {
			fileProcessor.process(node, path)
		}
	}
	// not needed as long as classes with APIS are referenced in
	// client side tokens via their interfaces
	// visitInterfaceCandidateFile(node, path)
}
