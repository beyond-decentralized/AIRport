import { resolveRelativeEntityPath, resolveRelativePath, } from '../../../../resolve/pathResolver';
import { FileBuilder } from '../FileBuilder';
import { IQEntityInterfaceBuilder } from './IQEntityInterfaceBuilder';
import { QEntityBuilder } from './QEntityBuilder';
import { QEntityIdBuilder } from './QEntityIdBuilder';
import { QEntityRelationBuilder } from './QEntityRelationBuilder';
/**
 * Created by Papa on 4/26/2016.
 */
export class QEntityFileBuilder extends FileBuilder {
    constructor(entity, fullGenerationPath, pathBuilder, entityMapByName, configuration, sIndexedEntity, entityPath) {
        super(entity, fullGenerationPath, pathBuilder, configuration);
        this.entityMapByName = entityMapByName;
        this.entityPath = entityPath;
        this.importMap = {};
        this.qEntityBuilder = new QEntityBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath, this, entityMapByName, sIndexedEntity);
        this.qEntityIdBuilder = new QEntityIdBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath, this, entityMapByName);
        this.qEntityRelationBuilder = new QEntityRelationBuilder(entity, this.fullGenerationPath, this.pathBuilder.workingDirPath, this, entityMapByName);
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
            'RawDelete', 'RawUpdate'
        ], '@airport/tarmaq-query');
        // let entityRelativePath = resolveRelativePath(fullGenerationPath, entity.path);
        if (entity.parentEntity) {
            let parentQEntityRelativePath;
            if (entity.parentEntity.project) {
                parentQEntityRelativePath = entity.parentEntity.project;
            }
            else {
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
                `Q${parentEntityType}`
            ], parentQEntityRelativePath);
        }
    }
    build() {
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
    addRelationImports(relationBuilders) {
        relationBuilders.forEach((builder) => {
            let property = builder.entityProperty;
            if (this.entity === property.entity) {
                return;
            }
            let type = property.type;
            let qEntityRelativePath;
            if (property.fromProject) {
                qEntityRelativePath = property.fromProject;
                type = property.otherApplicationDbEntity.name;
            }
            else {
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
                qType + 'QRelation'
            ], qEntityRelativePath);
            if (property.fromProject) {
                let relationEntityPath = property.fromProject;
                this.addImport(['I' + type], relationEntityPath, false);
            }
            else {
                const interfaceFilePath = this.pathBuilder.getFullPathToGeneratedSource(this.entityMapByName[type].path, null);
                let entityInterfaceRelativePath = resolveRelativePath(this.fullGenerationPath, interfaceFilePath);
                entityInterfaceRelativePath = entityInterfaceRelativePath.replace('.ts', '').toLowerCase();
                this.addImport(['I' + type], entityInterfaceRelativePath, false);
            }
        });
    }
    addImports() {
        this.addRelationImports(this.qEntityBuilder.idRelationBuilders);
        this.addRelationImports(this.qEntityBuilder.nonIdRelationBuilders);
        // const entityImportRelativePath = resolveRelativePath(this.fullGenerationPath,
        //   this.entityPath).replace('.ts', '');
        // this.addImport([this.entity.docEntry.name], entityImportRelativePath, false);
        const qFilePath = this.pathBuilder.getFullPathToGeneratedSource(this.entity.path);
        let entityInterfaceRelativePath = resolveRelativePath(qFilePath, this.fullGenerationPath);
        entityInterfaceRelativePath = entityInterfaceRelativePath.replace('.ts', '').toLowerCase();
        this.addImport([
            'I' + this.entity.docEntry.name
        ], entityInterfaceRelativePath);
    }
}
//# sourceMappingURL=QEntityFileBuilder.js.map