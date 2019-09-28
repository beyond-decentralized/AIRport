import {EntityId}            from '@airport/ground-control'
import {resolveRelativePath} from '../resolve/pathResolver'
import {PathBuilder}         from './PathBuilder'
import {IBuilder}            from './Builder'

export abstract class ImplementationFileBuilder
	implements IBuilder {

	public daoListingFilePath

	protected entityIdMapByName: {[entityName: string]: EntityId} = {}
	protected entityNames: string[]
		        = []
	protected ddlPathMapByEntityName: { [entityName: string]: string }       = {}
	protected generatedPathMapByEntityName: { [entityName: string]: string } = {}

	constructor(
		fileName: string,
		protected pathBuilder: PathBuilder
	) {
		this.daoListingFilePath = pathBuilder.fullGeneratedDirPath + `/${fileName}.ts`
	}

	addFileNameAndPaths(
		entityId: EntityId,
		entityName: string,
		fullDdlPath: string,
		fullGenerationPath: string,
	): void {
		if(entityId === undefined) {
			return
		}
		const ddlRelativePath                   = resolveRelativePath(this.daoListingFilePath, fullDdlPath)
			.replace('.ts', '')
		this.ddlPathMapByEntityName[entityName] = ddlRelativePath
		const generatedRelativePath             = resolveRelativePath(this.daoListingFilePath, fullGenerationPath)
			.replace('.ts', '')
		this.generatedPathMapByEntityName[entityName]
		                                        = this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath)
		this.entityNames.push(entityName)
		this.entityIdMapByName[entityName] = entityId;
	}

	abstract build(): string;

}
