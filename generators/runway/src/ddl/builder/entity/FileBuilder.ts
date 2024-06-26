import { Configuration } from '../../options/Options'
import { EntityCandidate } from '../../parser/EntityCandidate'
import { PathBuilder } from '../PathBuilder'

export abstract class FileBuilder {

	importMap: { [fileName: string]: { [asName: string]: string } } = {}

	constructor(
		protected entity: EntityCandidate,
		public fullGenerationPath: string,
		protected pathBuilder: PathBuilder,
		public configuration: Configuration,
	) {
	}
	addImport(
		classNames: (string | { asName: string, sourceName: string })[],
		filePath: string,
	): void {
		filePath = filePath.replace('.ts', '')
		let fileImportMap = this.importMap[filePath]
		if (!fileImportMap) {
			fileImportMap = {}
			this.importMap[filePath] = fileImportMap
		}
		classNames.forEach(
			className => {
				let asName
				let sourceName
				if (typeof className === 'string') {
					asName = className
					sourceName = className
				} else {
					asName = className.asName
					sourceName = className.sourceName
				}
				let existingSourceName = fileImportMap[asName]
				if (existingSourceName) {
					if (existingSourceName !== sourceName) {
						throw new Error(`Cannot import '${sourceName}' as '${asName}' from ${filePath}.
					'${existingSourceName}' is already imported as '${asName}' from this path.`)
					}
					return
				} else {
					fileImportMap[asName] = sourceName
				}
			})
	}

	protected buildImports(): string {
		this.addImports()

		let imports = ``
		for (let filePath in this.importMap) {
			const fileImportMap = this.importMap[filePath]
			let importedObjects = []
			for (let asName in fileImportMap) {
				let sourceName = fileImportMap[asName]
				if (sourceName === asName) {
					importedObjects.push(sourceName)
				} else {
					importedObjects.push(`${sourceName} as ${asName}`)
				}
			}
			imports += `import {\n\t${importedObjects.join(',\n\t')},\n} from '${filePath}'\n`
		}

		return imports
	}

	protected abstract addImports(): void

}
