import { resolveRelativePath } from '../../resolve/pathResolver';
import { IBuilder }            from './Builder';
import { PathBuilder }         from './PathBuilder';

export interface IEntityMapping {
	entityIndex: number;
	entityName: string;
	relativePath: string;
}

export interface IEntityMappingBuilder
	extends IBuilder {

}

export class EntityMappingBuilder {

	entityMappings: IEntityMapping[] = [];

	constructor(
		public entityMappingsPath: string,
		private pathBuilder: PathBuilder,
	) {
	}

	addEntity(
		entityIndex: number,
		entityName: string,
		relativePath: string,
	) {
		this.entityMappings.push({
			entityIndex,
			entityName,
			relativePath,
		});
	}

	build(
		applicationDomain: string,
		applicationName: string,
	): string {
		const imports: string[] = [];
		const entityDefinitions = this.entityMappings.map(
			entityMapping => {
				const entityImportRelativePath = resolveRelativePath(this.entityMappingsPath, entityMapping.relativePath)
					.replace('.ts', '');
				imports.push(`import { ${entityMapping.entityName} } from '${entityImportRelativePath}';`);
				return `  accumulator.add(${entityMapping.entityName}, ${entityMapping.entityIndex});`;
			}).join('\n');
		return `/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
${imports.join('\n')}

DI.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('${applicationDomain}', '${applicationName}');
${entityDefinitions}
});
`;
	}

}