import { resolveRelativePath } from '../../resolve/pathResolver'
import { PathBuilder } from './PathBuilder'
import { IBuilder } from './Builder'

export class GeneratedFileListingBuilder
	implements IBuilder {

	public generatedListingFilePath
	public generatedFilePaths: string[] = []

	constructor(
		private pathBuilder: PathBuilder,
		private fileName: string,
		// private directoryName: string
	) {
		this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/' + fileName
	}

	addFileNameAndPaths(
		fullGenerationPath: string
	): void {
		const generatedRelativePath = resolveRelativePath(this.generatedListingFilePath,
			fullGenerationPath).replace('.ts', '')
		this.generatedFilePaths.push(generatedRelativePath)
	}

	build(): string {
		this.generatedFilePaths.sort()

		const exports = this.generatedFilePaths.map(
			filePath => `export * from '${filePath}'`)
			.join('\n')

		return `${exports}
`
	}
}
