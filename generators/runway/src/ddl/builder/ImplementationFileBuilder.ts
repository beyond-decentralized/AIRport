import { ApplicationEntity_LocalId }            from '@airport/ground-control';
import { resolveRelativePath } from '../../resolve/pathResolver';
import { IBuilder }            from './Builder';
import { FileBuilder }         from './entity/FileBuilder';
import { PathBuilder }         from './PathBuilder';

export abstract class ImplementationFileBuilder
	extends FileBuilder
	implements IBuilder {

	public listingFilePath;

	protected entityIdMapByName: { [entityName: string]: ApplicationEntity_LocalId }          = {};
	protected entityNames: string[]
	                                                                         = [];
	protected ddlPathMapByEntityName: { [entityName: string]: string }       = {};
	protected generatedPathMapByEntityName: { [entityName: string]: string } = {};

	constructor(
		fileName: string,
		pathBuilder: PathBuilder,
	) {
		super(null, null, pathBuilder, null);
		this.listingFilePath = pathBuilder.fullGeneratedDirPath + `/${fileName}.ts`;
	}

	addFileNameAndPaths(
		entityId: ApplicationEntity_LocalId,
		entityName: string,
		fullDdlPath: string,
		fullGenerationPath: string,
	): void {
		if (entityId === undefined) {
			return;
		}
		const ddlRelativePath                   = resolveRelativePath(this.listingFilePath, fullDdlPath)
			.replace('.ts', '');
		this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
		const generatedRelativePath             = resolveRelativePath(this.listingFilePath, fullGenerationPath)
			.replace('.ts', '');
		this.generatedPathMapByEntityName[entityName]
		                                        = this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
		this.entityNames.push(entityName);
		this.entityIdMapByName[entityName] = entityId;
	}

	abstract build(): string;

}
