import {IQBuilder} from "./QBuilder";
import {resolveRelativePath} from "../resolve/pathResolver";
import {PathBuilder} from "./PathBuilder";

export class GeneratedSummaryBuilder implements IQBuilder {

	public generatedListingFilePath;
	private generatedFilePaths: string[] = [];

	constructor(
		private pathBuilder: PathBuilder
	) {
		this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/generated.ts'
	}

	addFileNameAndPaths(
		entityName: string,
		fullDdlPath: string,
		fullGenerationPath: string,
	): void {
		const generatedRelativePath = resolveRelativePath(this.generatedListingFilePath, fullGenerationPath)
			.replace('.ts', '');
		this.generatedFilePaths.push(this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath));
	}

	build(): string {
		this.generatedFilePaths.sort();

		const exports = this.generatedFilePaths.map(
			filePath => `export * from '${filePath}';`).join('\n');

		return `export * from './schema';
export * from './qSchema';
export * from './baseDaos';
export * from './baseDmos';
${exports}
`
	}
}