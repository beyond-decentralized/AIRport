import { resolveRelativePath } from '../../resolve/pathResolver';
import { Configuration } from '../options/Options';
import { PathBuilder } from './PathBuilder';
import { IBuilder } from './Builder';
import { IApplication } from '@airport/ground-control';

export class QApplicationBuilder
  implements IBuilder {

  public qApplicationFilePath;

  private entityNames: string[] = [];
  private ddlPathMapByEntityName: { [entityName: string]: string } = {};
  private generatedFilePaths: string[] = [];
  private generatedPathMapByEntityName: { [entityName: string]: string } = {};
  private mappedSuperclassSet: { [entityName: string]: boolean } = {};

  constructor(
    private applicationFullName: string,
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
    this.generatedPathMapByEntityName[entityName] = generatedRelativePath;
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
    // TODO: enable DVO and DAO injections into QApp, if needed
    // const dvoDefinitions = this.entityNames.map(
    // 	entityName => `${entityName}: IBase${entityName}Dvo;`
    // ).join('\n\t\t');
    // const daoDefinitions = this.entityNames.map(
    // 	entityName => `${entityName}: IBase${entityName}Dao;`
    // ).join('\n\t\t');
    const constructorDefinitions = this.entityNames.map(
      entityName =>
        `${entityName}`,
    ).join(',\n\t');

    const qEntityImports = this.entityNames.map(
      entityName =>
        // FIXME: this is a temporary hack to get Svelte to compile, revisit later
        // `import { ${entityName} } from '${this.ddlPathMapByEntityName[entityName]}';
        `import { Q${entityName} } from '${this.generatedPathMapByEntityName[entityName]}';`,
    ).join('\n');

    // FIXME: this is a temporary hack to get Svelte to compile, revisit later
    let entityImports = '';
    if (this.entityNames.length) {
      entityImports = 'import {\n' + this.entityNames.map(
        entityName =>
          `  ${entityName}`,
      ).join(',\n') + `\n} from '../ddl/ddl';`;
    }
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
    QAppInternal
} from '@airport/air-traffic-control'
import {
    IApplication
} from '@airport/ground-control';
${qEntityImports}
${entityImports}

export interface ${this.applicationFullName}_LocalQApp extends QAppInternal {

    db: IApplication;

  ${qApiDefinitions}

}

const __constructors__ = {
	${constructorDefinitions}
};

export const Q_${this.applicationFullName}: ${this.applicationFullName}_LocalQApp = <any>{
	__constructors__,
  domain: '${domainName}',
  name: '${applicationName}'
};
export default Q_${this.applicationFullName}

export function ${this.applicationFullName}_diSet(
	dbEntityId: number
): boolean {
	return globalThis.airApi.dS(Q_${this.applicationFullName}.__dbApplication__, dbEntityId)
}
if (globalThis.airApi) {
  globalThis.airApi.setQApp(Q_${this.applicationFullName})
}
`;

    // export function duoDiSet(
    // 	dbEntityId: number
    // ): boolean {
    // 	return globalThis.airApi.ddS(Q.__dbApplication__, dbEntityId)
    // }
  }

}
