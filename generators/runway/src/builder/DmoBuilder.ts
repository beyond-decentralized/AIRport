import { IQBuilder } from "./QBuilder";
import { resolveRelativePath } from "../resolve/pathResolver";
import {PathBuilder} from "./PathBuilder";

export class DmoBuilder implements IQBuilder {

	public daoListingFilePath;

	private entityNames: string[] = [];
	private ddlPathMapByEntityName: { [entityName: string]: string } = {};
	private generatedPathMapByEntityName: { [entityName: string]: string } = {};

	constructor(
		private pathBuilder: PathBuilder
	) {
		this.daoListingFilePath = pathBuilder.fullGeneratedDirPath + '/baseDmos.ts'
	}

	addFileNameAndPaths(
		entityName: string,
		fullDdlPath: string,
		fullGenerationPath: string,
	): void {
		const ddlRelativePath = resolveRelativePath(this.daoListingFilePath, fullDdlPath)
			.replace('.ts', '');
		this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
		const generatedRelativePath = resolveRelativePath(this.daoListingFilePath, fullGenerationPath)
			.replace('.ts', '');
		this.generatedPathMapByEntityName[entityName]
			= this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
		this.entityNames.push(entityName);
	}

	build(): string {
		this.entityNames.sort();

		const daoDefinitions = this.entityNames.map(
			entityName => `
export interface IBase${entityName}Dmo
  extends IDmo<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}> {
}

export class Base${entityName}Dmo
  extends Dmo<I${entityName}, ${entityName}ESelect, ${entityName}ECreateProperties, ${entityName}EUpdateProperties, ${entityName}EId, Q${entityName}>
	implements IBase${entityName}Dmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['${entityName}']);
	}
}
`).join('\n');
		const imports = this.entityNames.map(
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

		return `import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { Q } from './qSchema';
${imports}

${daoDefinitions}`;
	}

}