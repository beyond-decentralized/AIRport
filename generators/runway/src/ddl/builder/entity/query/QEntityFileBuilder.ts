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
import { IQEntityInterfaceBuilder } from './IQEntityInterfaceBuilder';
import { QEntityBuilder } from './QEntityBuilder';
import { QEntityIdBuilder } from './QEntityIdBuilder';
import { QEntityRelationBuilder } from './QEntityRelationBuilder';
import { QRelationBuilder } from './QRelationBuilder';

/**
 * Created by Papa on 4/26/2016.
 */

export class QEntityFileBuilder
  extends FileBuilder
  implements IBuilder {

  qEntityBuilder: QEntityBuilder;
  qEntityIdBuilder: QEntityIdBuilder;
  qEntityRelationBuilder: QEntityRelationBuilder;
  qEntityInterfaceBuilder: IQEntityInterfaceBuilder;

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
    this.qEntityBuilder = new QEntityBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath,
      this, entityMapByName, sIndexedEntity);
    this.qEntityIdBuilder = new QEntityIdBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath,
      this, entityMapByName);
    this.qEntityRelationBuilder = new QEntityRelationBuilder(entity, this.fullGenerationPath,
      this.pathBuilder.workingDirPath, this, entityMapByName);
    this.qEntityInterfaceBuilder = new IQEntityInterfaceBuilder(entity, this.qEntityBuilder);

    this.addImport([
      'IQEntityInternal',
      'IEntityIdProperties',
      'IEntityCascadeGraph',
      'IEntityUpdateColumns',
      'IEntityUpdateProperties',
      'IEntitySelectProperties',
      'IQBooleanField',
      'IQDateField',
      'IQNumberField',
      'IQOneToManyRelation', 'IQStringField',
      'IQUntypedField',
      'IQEntity', 'IQRelation',
      'IQAirEntityOneToManyRelation', 'IQAirEntityRelation',
      'RawDelete', 'RawUpdate'],
      '@airport/tarmaq-query');
    // let entityRelativePath = resolveRelativePath(fullGenerationPath, entity.path);
    if (entity.parentEntity) {
      let parentQEntityRelativePath;
      if (entity.parentEntity.project) {
        parentQEntityRelativePath = entity.parentEntity.project;
      } else {
        let parentFullGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.parentEntity.path);
        parentQEntityRelativePath = resolveRelativePath(fullGenerationPath, parentFullGenerationPath);
      }
      let parentEntityType = entity.parentEntity.type;
      this.addImport([
        // `I${parentEntityType}`,
        `${parentEntityType}Graph`,
        `${parentEntityType}EId`,
        `${parentEntityType}EUpdateColumns`,
        `${parentEntityType}EUpdateProperties`,
        `${parentEntityType}ESelect`,
        `Q${parentEntityType}QId`,
        `Q${parentEntityType}QRelation`,
        `Q${parentEntityType}`],
        parentQEntityRelativePath);
    }

  }

  build(): string {
    let interfaceSource = this.qEntityInterfaceBuilder.build();
    let idClassSource = this.qEntityIdBuilder.build();
    let relationClassSource = this.qEntityRelationBuilder.build();
    let classSource = this.qEntityBuilder.build();

    let imports = this.buildImports();

    let fileSource = `${imports}
${interfaceSource}
///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

${classSource}
${idClassSource}

${relationClassSource}`;

    return fileSource;
  }

  addRelationImports(
    relationBuilders: QRelationBuilder[],
  ): void {
    relationBuilders.forEach((
      builder: QRelationBuilder,
    ) => {
      let property = builder.entityProperty;
      if (this.entity === property.entity) {
        return;
      }
      let type = property.type;
      let qEntityRelativePath;
      if (property.fromProject) {
        qEntityRelativePath = property.fromProject;
        type = property.otherApplicationDbEntity.name;
      } else {
        type = property.entity.type;
        qEntityRelativePath = resolveRelativeEntityPath(this.entity, property.entity);
        qEntityRelativePath = qEntityRelativePath.replace('.ts', '');
        qEntityRelativePath = this.pathBuilder.prefixToFileName(qEntityRelativePath, 'q');
      }
      type = type.replace('[]', '');
      let qType = 'Q' + type;
      this.addImport([
        // 'I' + type,
        type + 'Graph',
        type + 'EId',
        type + 'EOptionalId',
        type + 'EUpdateProperties',
        type + 'ESelect',
        qType,
        qType + 'QId',
        qType + 'QRelation'],
        qEntityRelativePath);

      if (property.fromProject) {
        let relationEntityPath = property.fromProject;
        this.addImport(['I' + type], relationEntityPath, false);
      } else {
        const interfaceFilePath = this.pathBuilder.getFullPathToGeneratedSource(this.entityMapByName[type].path, null);
        let entityInterfaceRelativePath = resolveRelativePath(this.fullGenerationPath, interfaceFilePath)
        entityInterfaceRelativePath = entityInterfaceRelativePath.replace('.ts', '').toLowerCase()
        this.addImport(['I' + type], entityInterfaceRelativePath, false);
      }
    });
  }

  protected addImports(): void {
    this.addRelationImports(this.qEntityBuilder.idRelationBuilders);
    this.addRelationImports(this.qEntityBuilder.nonIdRelationBuilders);
    // const entityImportRelativePath = resolveRelativePath(this.fullGenerationPath,
    //   this.entityPath).replace('.ts', '');
    // this.addImport([this.entity.docEntry.name], entityImportRelativePath, false);

    const qFilePath = this.pathBuilder.getFullPathToGeneratedSource(this.entity.path);
    let entityInterfaceRelativePath = resolveRelativePath(qFilePath, this.fullGenerationPath)
    entityInterfaceRelativePath = entityInterfaceRelativePath.replace('.ts', '').toLowerCase()
    this.addImport([
      'I' + this.entity.docEntry.name],
      entityInterfaceRelativePath)
  }

}
