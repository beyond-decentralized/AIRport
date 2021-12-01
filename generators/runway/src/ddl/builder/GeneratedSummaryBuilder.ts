import {resolveRelativePath} from '../../resolve/pathResolver'
import {PathBuilder}         from './PathBuilder'
import {IBuilder}            from './Builder'

export class GeneratedSummaryBuilder
	implements IBuilder {

	public generatedListingFilePath

	constructor(
		private pathBuilder: PathBuilder
	) {
		this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/generated.ts'
	}

	build(): string {
		return `export * from './mappedSuperclass'
export * from './qApplication';
export * from './baseDaos';
export * from './baseDuos';
export * from './qInterfaces';
export * from './interfaces';
`
	}
}
