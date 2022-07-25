import { Configuration } from '../../../options/Options';
import { EntityCandidate } from '../../../parser/EntityCandidate';
import {
  resolveRelativeEntityPath,
  resolveRelativePath,
} from '../../../../resolve/pathResolver';
import { PathBuilder } from '../../PathBuilder';
import { IBuilder } from '../../Builder';
import { SIndexedEntity } from '../../application/SEntity';
import { FileBuilder } from '../FileBuilder';
import { IVEntityInterfaceBuilder } from './IVEntityInterfaceBuilder';
import { VEntityBuilder } from './VEntityBuilder';
import { VEntityIdBuilder } from './VEntityIdBuilder';
import { VEntityRelationBuilder } from './VEntityRelationBuilder';
import { VRelationBuilder } from './VRelationBuilder';

/**
 * Created by Papa on 4/26/2016.
 */

export class VEntityFileBuilder
  extends FileBuilder
  implements IBuilder {

  vEntityBuilder: VEntityBuilder;
  vEntityIdBuilder: VEntityIdBuilder;
  vEntityRelationBuilder: VEntityRelationBuilder;
  vEntityInterfaceBuilder: IVEntityInterfaceBuilder;

  importMap: { [fileName: string]: { [asName: string]: string } } = {};

  constructor(
    entity: EntityCandidate,
    fullGenerationPath: string,
    pathBuilder: PathBuilder,
    private entityMapByName: { [entityName: string]: EntityCandidate },
    configuration: Configuration,
    sIndexedEntity: SIndexedEntity,
    private entityPath: string,
  ) {
    super(entity, fullGenerationPath, pathBuilder, configuration);
    this.vEntityBuilder = new VEntityBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath,
      this, entityMapByName, sIndexedEntity);
    this.vEntityIdBuilder = new VEntityIdBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath,
      this, entityMapByName);
    this.vEntityRelationBuilder = new VEntityRelationBuilder(entity, this.fullGenerationPath,
      this.pathBuilder.workingDirPath, this, entityMapByName);
    this.vEntityInterfaceBuilder = new IVEntityInterfaceBuilder(entity, this.vEntityBuilder);

    this.addImport([
      'IEntitySelectProperties',
      'IVBooleanField',
      'IVDateField',
      'IVNumberField',
      'IVStringField',
      'IVUntypedField'],
      '@airport/airbridge-validate');
    // let entityRelativePath = resolveRelativePath(fullGenerationPath, entity.path);
    if (entity.parentEntity) {
      let parentVEntityRelativePath;
      if (entity.parentEntity.project) {
        parentVEntityRelativePath = entity.parentEntity.project;
      } else {
        let parentFullGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.parentEntity.path);
        parentVEntityRelativePath = resolveRelativePath(fullGenerationPath, parentFullGenerationPath);
      }
      let parentEntityType = entity.parentEntity.type;
      this.addImport([
        `${parentEntityType}VDescriptor`
      ], parentVEntityRelativePath);
    }

  }

  build(): string {
    let interfaceSource = this.vEntityInterfaceBuilder.build();

    let imports = this.buildImports();

    let fileSource = `${imports}

${interfaceSource}
`;

    return fileSource;
  }

  addRelationImports(
    relationBuilders: VRelationBuilder[],
  ): void {
    relationBuilders.forEach((
      builder: VRelationBuilder,
    ) => {
      let property = builder.entityProperty;
      if (this.entity === property.entity) {
        return;
      }
      let type = property.type;
      let vEntityRelativePath;
      if (property.fromProject) {
        vEntityRelativePath = property.fromProject;
        type = property.otherApplicationDbEntity.name;
      } else {
        type = property.entity.type;
        vEntityRelativePath = resolveRelativeEntityPath(this.entity, property.entity);
        vEntityRelativePath = vEntityRelativePath.replace('.ts', '');
        vEntityRelativePath = this.pathBuilder.prefixQToFileName(vEntityRelativePath);
      }
      type = type.replace('[]', '');
      this.addImport([type + 'VDescriptor'],
        vEntityRelativePath);

      if (property.fromProject) {
        let relationEntityPath = property.fromProject;
        this.addImport(['I' + type], relationEntityPath, false);
      } else {
        const interfaceFilePath = this.pathBuilder.getFullPathToGeneratedSource(this.entityMapByName[type].path, false);
        let entityInterfaceRelativePath = resolveRelativePath(this.fullGenerationPath, interfaceFilePath)
        entityInterfaceRelativePath = entityInterfaceRelativePath.replace('.ts', '').toLowerCase()
        this.addImport(['I' + type], entityInterfaceRelativePath, false);
      }
    });
  }

  protected addImports(): void {
    this.addRelationImports(this.vEntityBuilder.idRelationBuilders);
    this.addRelationImports(this.vEntityBuilder.nonIdRelationBuilders);
    // const entityImportRelativePath = resolveRelativePath(this.fullGenerationPath,
    //   this.entityPath).replace('.ts', '');
    // this.addImport([this.entity.docEntry.name], entityImportRelativePath, false);

    const vFilePath = this.pathBuilder.getFullPathToGeneratedSource(this.entity.path);
    let entityInterfaceRelativePath = resolveRelativePath(vFilePath, this.fullGenerationPath)
    entityInterfaceRelativePath = entityInterfaceRelativePath.replace('.ts', '').toLowerCase()
    this.addImport([
      'I' + this.entity.docEntry.name],
      entityInterfaceRelativePath)
  }

}
