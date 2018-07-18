import { IQBuilder } from "./QBuilder";
import { resolveRelativePath } from "../resolve/pathResolver";
import {PathBuilder} from "./PathBuilder";

export class QSchemaBuilder implements IQBuilder {

	public qSchemaFilePath;

	private entityNames: string[] = [];
	private ddlPathMapByEntityName: { [entityName: string]: string } = {};
	private generatedFilePaths: string[] = [];
	private generatedPathMapByEntityName: { [entityName: string]: string } = {};

	constructor(
		private pathBuilder: PathBuilder
	) {
		this.qSchemaFilePath = pathBuilder.fullGeneratedDirPath + '/qSchema.ts'
	}

	addFileNameAndPaths(
		entityName: string,
		fullDdlPath: string,
		fullGenerationPath: string,
	): void {
		const ddlRelativePath = resolveRelativePath(this.qSchemaFilePath, fullDdlPath)
			.replace('.ts', '');
		this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
		const generatedRelativePath = resolveRelativePath(this.qSchemaFilePath, fullGenerationPath)
			.replace('.ts', '');
		this.generatedFilePaths.push(generatedRelativePath);
		this.generatedPathMapByEntityName[entityName]
			= this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
		this.entityNames.push(entityName);
	}

	build(): string {
		this.entityNames.sort();
		this.generatedFilePaths.sort();

		const qApiDefinitions = this.entityNames.map(
			entityName => `${entityName}: Q${entityName};`
		).join('\n\t');
		const dmoDefinitions = this.entityNames.map(
			entityName => `${entityName}: IBase${entityName}Dmo;`
		).join('\n\t\t');
		const daoDefinitions = this.entityNames.map(
			entityName => `${entityName}: IBase${entityName}Dao;`
		).join('\n\t\t');
		const constructorDefinitions = this.entityNames.map(
			entityName =>
				`${entityName}: ${entityName}`
		).join(',\n\t');

		const qEntityImports = this.entityNames.map(
			entityName =>
				`import { ${entityName} } from '${this.ddlPathMapByEntityName[entityName]}';
import { Q${entityName} } from '${this.generatedPathMapByEntityName[entityName]}';`
		).join('\n');
		const iDmoImports = this.entityNames.map(
			entityName =>
				`IBase${entityName}Dmo`
		).join(',\n\t');
		const iDaoImports = this.entityNames.map(
			entityName =>
				`IBase${entityName}Dao`
		).join(',\n\t');

		return `import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
${qEntityImports}

import {
	${iDmoImports}
} from './baseDmos';

import {
	${iDaoImports}
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		${dmoDefinitions}
	}

	dao: {
		${daoDefinitions}
	}
	
	${qApiDefinitions}

}

const __constructors__ = {
	${constructorDefinitions}
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
`;
	}

}