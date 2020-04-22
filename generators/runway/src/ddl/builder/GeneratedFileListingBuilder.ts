import {resolveRelativePath} from '../../resolve/pathResolver'
import {PathBuilder}         from './PathBuilder'
import {IBuilder}            from './Builder'

export class GeneratedFileListingBuilder
	implements IBuilder {

	public generatedListingFilePath
	private generatedFilePaths: string[] = []

	constructor(
		private pathBuilder: PathBuilder,
		private fileName: string
	) {
		this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/' + fileName
	}

	addFileNameAndPaths(
		entityName: string,
		fullDdlPath: string,
		fullGenerationPath: string
	): void {
		const generatedRelativePath = resolveRelativePath(this.generatedListingFilePath, fullGenerationPath)
			.replace('.ts', '')
		this.generatedFilePaths.push(this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath))
	}

	build(): string {
		this.generatedFilePaths.sort()

		const exports = this.generatedFilePaths.map(
			filePath => `export * from '${filePath}';`)
			.join('\n')

		return `${exports}
`
	}
}
