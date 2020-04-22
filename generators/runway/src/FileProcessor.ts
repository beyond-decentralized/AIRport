import {DbSchema}                from '@airport/ground-control'
import * as ts         from 'typescript'
import {visitDaoFile}  from './dao/parser/OperationGenerator'
import {Configuration} from './ddl/options/Options'
import {EntityCandidate}         from './ddl/parser/EntityCandidate'
import {EntityCandidateRegistry} from './ddl/parser/EntityCandidateRegistry'
import {
	globalCandidateRegistry,
	visitEntityFile
}                                from './ddl/parser/EntityDefinitionGenerator'
import {getClassPath}            from './ddl/parser/utils'

const enumMap: Map<string, string> = new Map<string, string>()
globalThis.enumMap                 = enumMap

/** Generate documention for all classes in a set of .ts files */
export function generateDefinitions(
	fileNames: string[],
	options: ts.CompilerOptions,
	configuration: Configuration,
	schemaMapByProjectName: { [projectName: string]: DbSchema }
): { [entityName: string]: EntityCandidate } {
	// Build a program using the set of root file names in fileNames
	let program        = ts.createProgram(fileNames, options)
	globalThis.checker = program.getTypeChecker()

	// Get the checker, we will use it to find more about classes
	globalCandidateRegistry.configuration = configuration
	globalCandidateRegistry.schemaMap     = schemaMapByProjectName
	globalThis.processedCandidateRegistry = new EntityCandidateRegistry(enumMap)

	// const daoFileMap: { [classPath: string]: DaoFile } = {}

	const sourceFiles = program.getSourceFiles()

	// Visit every sourceFile in the program
	for (const sourceFile of sourceFiles) {
		globalThis.currentSourceFile = sourceFile
		// Walk the tree to searchOne for classes
		ts.forEachChild(sourceFile, visit)
	}

	// print out the doc
	// fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));

	return globalCandidateRegistry
		.matchVerifiedEntities(globalThis.processedCandidateRegistry)
}

/** visit nodes finding exported classes */
function visit(node: ts.Node) {
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
	|| path.indexOf(process.cwd() + '\src') > -1) {
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
	}
}
