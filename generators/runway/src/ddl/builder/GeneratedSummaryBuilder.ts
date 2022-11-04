import { resolveRelativePath } from '../../resolve/pathResolver'
import { PathBuilder } from './PathBuilder'
import { IBuilder } from './Builder'
import { GeneratedFileListingBuilder } from './GeneratedFileListingBuilder'

export class GeneratedSummaryBuilder
	implements IBuilder {

	public generatedListingFilePath

	constructor(
		private pathBuilder: PathBuilder,
		private entityInterfaceListingBuilder: GeneratedFileListingBuilder,
		private entityQInterfaceListingBuilder: GeneratedFileListingBuilder,
		private entityVInterfaceListingBuilder: GeneratedFileListingBuilder
	) {
		this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/generated.ts'
	}

	build(): string {
		return `export * from './qApplication';
export * from './baseDaos';
export * from './baseDvos';
${this.entityQInterfaceListingBuilder.generatedFilePaths.length ? "export * from './qInterfaces'" : ""};
${this.entityVInterfaceListingBuilder.generatedFilePaths.length ? "export * from './vInterfaces'" : ""};
${this.entityInterfaceListingBuilder.generatedFilePaths.length ? "export * from './interfaces'" : ""};
`
	}
}
