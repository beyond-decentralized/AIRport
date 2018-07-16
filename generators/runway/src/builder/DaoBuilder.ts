import {resolveRelativePath} from "../resolve/pathResolver";
import {PathBuilder}         from "./PathBuilder";
import {IQBuilder}           from "./QBuilder";

export class DaoBuilder implements IQBuilder {

	public daoListingFilePath;

	private entityNames: string[]                                          = [];
	private ddlPathMapByEntityName: { [entityName: string]: string }       = {};
	private generatedPathMapByEntityName: { [entityName: string]: string } = {};

	constructor(
		private pathBuilder: PathBuilder
	) {
		this.daoListingFilePath = pathBuilder.fullGeneratedDirPath + '/baseDaos.ts'
	}

	addFileNameAndPaths(
		entityName: string,
		fullDdlPath: string,
		fullGenerationPath: string,
	): void {
		const ddlRelativePath                   = resolveRelativePath(this.daoListingFilePath, fullDdlPath)
			.replace('.ts', '');
		this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
		const generatedRelativePath             = resolveRelativePath(this.daoListingFilePath, fullGenerationPath)
			.replace('.ts', '');
		this.generatedPathMapByEntityName[entityName]
		                                        = this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
		this.entityNames.push(entityName);
	}

	build(): string {
		this.entityNames.sort();

		const daoDefinitions = this.entityNames.map(
			entityName => `
export interface IBase${entityName}Dao
  extends IDao<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}> {
}

export class Base${entityName}Dao
  extends Dao<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateColumns, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}>
	implements IBase${entityName}Dao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['${entityName}'], Q, utils);
	}
}
`).join('\n');
		const imports        = this.entityNames.map(
			entityName =>
				`import {
	I${entityName},
	${entityName}ESelect,
	${entityName}ECreateColumns,
	${entityName}ECreateProperties,
	${entityName}EUpdateColumns,
	${entityName}EUpdateProperties,
	${entityName}EId,
	Q${entityName}
} from '${this.generatedPathMapByEntityName[entityName]}';`
		).join('\n');

		return `import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
${imports}

${daoDefinitions}`;
	}

}