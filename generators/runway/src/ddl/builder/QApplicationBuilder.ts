import { resolveRelativePath } from '../../resolve/pathResolver';
import { Configuration } from '../options/Options';
import { PathBuilder } from './PathBuilder';
import { IBuilder } from './Builder';

export class QApplicationBuilder
  implements IBuilder {

  public qApplicationFilePath;

  private entityNames: string[] = [];
  private ddlPathMapByEntityName: { [entityName: string]: string } = {};
  private generatedFilePaths: string[] = [];
  private generatedPathMapByEntityName: { [entityName: string]: string } = {};
  private mappedSuperclassSet: { [entityName: string]: boolean } = {};

  constructor(
    private pathBuilder: PathBuilder,
    private configuration: Configuration,
  ) {
    this.qApplicationFilePath = pathBuilder.fullGeneratedDirPath + '/qApplication.ts';
  }

  addFileNameAndPaths(
    entityName: string,
    fullDdlPath: string,
    fullGenerationPath: string,
    isMappedSuperclass: boolean,
  ): void {
    const ddlRelativePath = resolveRelativePath(this.qApplicationFilePath, fullDdlPath)
      .replace('.ts', '');
    this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
    const generatedRelativePath = resolveRelativePath(this.qApplicationFilePath, fullGenerationPath)
      .replace('.ts', '');
    this.generatedFilePaths.push(generatedRelativePath);
    this.generatedPathMapByEntityName[entityName]
      = this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
    this.entityNames.push(entityName);
    this.mappedSuperclassSet[entityName] = isMappedSuperclass;
  }

  build(
    domainName: string,
    applicationName: string,
  ): string {
    this.entityNames.sort();
    this.generatedFilePaths.sort();

    const qApiDefinitions = this.entityNames
      .filter(entityName => !this.mappedSuperclassSet[entityName])
      .map(
        entityName => `${entityName}: Q${entityName};`,
      ).join('\n\t');
    // TODO: enable DVO and DAO injections into QApplication, if needed
    // const dvoDefinitions = this.entityNames.map(
    // 	entityName => `${entityName}: IBase${entityName}Dvo;`
    // ).join('\n\t\t');
    // const daoDefinitions = this.entityNames.map(
    // 	entityName => `${entityName}: IBase${entityName}Dao;`
    // ).join('\n\t\t');
    const constructorDefinitions = this.entityNames.map(
      entityName =>
        `${entityName}: ${entityName}`,
    ).join(',\n\t');

    const qEntityImports = this.entityNames.map(
      entityName =>
        // FIXME: this is a temporary hack to get Svelte to compile, revisit later
        // `import { ${entityName} } from '${this.ddlPathMapByEntityName[entityName]}';
        `import { Q${entityName} } from '${this.generatedPathMapByEntityName[entityName]}';`,
    ).join('\n');

    // FIXME: this is a temporary hack to get Svelte to compile, revisit later
    const entityImports = 'import {\n' + this.entityNames.map(
      entityName =>
        `  ${entityName}`,
    ).join(',\n') + `\n} from '../ddl/ddl';`;
    // const iDvoImports = this.entityNames.map(
    // 	entityName =>
    // 		`IBase${entityName}Dvo`
    // ).join(',\n\t');
    // const iDaoImports = this.entityNames.map(
    // 	entityName =>
    // 		`IBase${entityName}Dao`
    // ).join(',\n\t');

    // import {
    // 	${iDvoImports}
    // } from './baseDvos';
    //
    // import {
    // 	${iDaoImports}
    // } from './baseDaos';

    // dvo: {
    // 	${dvoDefinitions}
    // }
    //
    // dao: {
    // 	${daoDefinitions}
    // }

    return `import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
${qEntityImports}
${entityImports}

export interface LocalQApplication extends QApplication {

    db: DbApplication;

  ${qApiDefinitions}

}

const __constructors__ = {
	${constructorDefinitions}
};

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
  domain: '${domainName}',
  name: '${applicationName}'
};
export const Q: LocalQApplication = Q_APPLICATION

export function diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.ddS(Q.__dbApplication__, dbEntityId)
}

airApi.setQApplication(Q_APPLICATION)
`;
  }

}
