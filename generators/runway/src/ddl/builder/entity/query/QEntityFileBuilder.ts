import { Configuration } from '../../../options/Options'
import { EntityCandidate } from '../../../parser/EntityCandidate'
import {
  resolveRelativeEntityPath,
  resolveRelativePath,
} from '../../../../resolve/pathResolver'
import { PathBuilder } from '../../PathBuilder'
import { IBuilder } from '../../Builder'
import { FileBuilder } from '../FileBuilder'
import { IQEntityInterfaceBuilder } from './IQEntityInterfaceBuilder'
import { QEntityBuilder } from './QEntityBuilder'
import { QEntityIdBuilder } from './QEntityIdBuilder'
import { QEntityRelationBuilder } from './QEntityRelationBuilder'
import { QRelationBuilder } from './QRelationBuilder'
import { SIndexedApplication } from '../../application/SApplication'

/**
 * Created by Papa on 4/26/2016.
 */

export class QEntityFileBuilder
  extends FileBuilder
  implements IBuilder {

  qEntityBuilder: QEntityBuilder
  qEntityIdBuilder: QEntityIdBuilder
  qEntityRelationBuilder: QEntityRelationBuilder
  qEntityInterfaceBuilder: IQEntityInterfaceBuilder

  importMap: { [fileName: string]: { [asName: string]: string } } = {}

  constructor(
    entity: EntityCandidate,
    fullGenerationPath: string,
    pathBuilder: PathBuilder,
    private entityMapByName: { [entityName: string]: EntityCandidate },
    configuration: Configuration,
    sIndexedApplication: SIndexedApplication,
    entityName: string,
    private entityPath: string,
  ) {
    super(entity, fullGenerationPath, pathBuilder, configuration)

    const sIndexedEntity = sIndexedApplication.entityMapByName[entityName]
    this.qEntityBuilder = new QEntityBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath,
      this, entityMapByName, sIndexedEntity, sIndexedApplication)
    this.qEntityIdBuilder = new QEntityIdBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath,
      this, entityMapByName, sIndexedApplication)
    this.qEntityRelationBuilder = new QEntityRelationBuilder(entity, this.fullGenerationPath,
      this.pathBuilder.workingDirPath, this, entityMapByName, sIndexedApplication)
    this.qEntityInterfaceBuilder = new IQEntityInterfaceBuilder(entity, this.qEntityBuilder)

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
      'IQEntity', 'IQManyToOneInternalRelation',
      'IQAirEntityOneToManyRelation',
      'IQManyToOneAirEntityRelation',
      'IQManyToOneEntityRelation',
      'RawDelete', 'RawUpdate'],
      '@airport/tarmaq-query')
    // let entityRelativePath = resolveRelativePath(fullGenerationPath, entity.path)
    if (entity.parentEntity) {
      let parentQEntityRelativePath
      if (entity.parentEntity.project) {
        parentQEntityRelativePath = entity.parentEntity.project
      } else {
        let parentFullGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.parentEntity.path, 'Q', 'query')
        parentQEntityRelativePath = resolveRelativePath(fullGenerationPath, parentFullGenerationPath)
      }
      let parentEntityType = entity.parentEntity.type
      this.addImport([
        `${parentEntityType}Graph`,
        `${parentEntityType}EId`,
        `${parentEntityType}EUpdateColumns`,
        `${parentEntityType}EUpdateProperties`,
        `${parentEntityType}ESelect`,
        `Q${parentEntityType}QId`,
        `Q${parentEntityType}QRelation`,
        `Q${parentEntityType}`],
        parentQEntityRelativePath)
    }

  }

  build(): string {
    let interfaceSource = this.qEntityInterfaceBuilder.build()
    let idClassSource = this.qEntityIdBuilder.build()
    let relationClassSource = this.qEntityRelationBuilder.build()
    let classSource = this.qEntityBuilder.build()

    let imports = this.buildImports()

    let fileSource = `${imports}
${interfaceSource}
///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

${classSource}
${idClassSource}

${relationClassSource}`

    return fileSource
  }

  addRelationImports(
    relationBuilders: QRelationBuilder[],
  ): void {
    relationBuilders.forEach((
      builder: QRelationBuilder,
    ) => {
      let property = builder.entityProperty
      if (this.entity === property.entity) {
        return
      }
      let type = property.type
      let qEntityRelativePath
      if (property.fromProject) {
        qEntityRelativePath = property.fromProject
        type = property.otherApplicationDbEntity.name
      } else {
        type = property.entity.type
        qEntityRelativePath = resolveRelativeEntityPath(this.entity, property.entity)
        qEntityRelativePath = qEntityRelativePath.replace('.ts', '')
        qEntityRelativePath = this.pathBuilder.prefixToFileName(qEntityRelativePath, 'Q')
      }
      type = type.replace('[]', '')
      let qType = 'Q' + type
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
        qEntityRelativePath)

      if (property.fromProject) {
        let relationEntityPath = property.fromProject
        this.addImport([type], relationEntityPath)
      } else {
        let entityRelativePath = resolveRelativePath(this.fullGenerationPath, this.entityMapByName[type].path)
        entityRelativePath = entityRelativePath.replace('.ts', '')
        this.addImport([type], entityRelativePath)
      }
    })
  }

  protected addImports(): void {
    this.addRelationImports(this.qEntityBuilder.idRelationBuilders)
    this.addRelationImports(this.qEntityBuilder.nonIdRelationBuilders)
    // const entityImportRelativePath = resolveRelativePath(this.fullGenerationPath,
    //   this.entityPath).replace('.ts', '')
    // this.addImport([this.entity.docEntry.name], entityImportRelativePath, false)

    const type = this.entity.docEntry.name
    let entityRelativePath = resolveRelativePath(this.fullGenerationPath, this.entityMapByName[type].path)
    entityRelativePath = entityRelativePath.replace('.ts', '')
    this.addImport([type], entityRelativePath)
  }

}
