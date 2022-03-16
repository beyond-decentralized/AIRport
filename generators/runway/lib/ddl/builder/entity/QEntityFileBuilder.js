import { resolveRelativeEntityPath, resolveRelativePath, } from '../../../resolve/pathResolver';
import { FileBuilder } from './FileBuilder';
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
            'IEntityDatabaseFacade',
            'IEntityFind',
            'IEntityFindOne',
            'IEntitySearch',
            'IEntitySearchOne',
            'IQBooleanField',
            'IQDateField',
            'IQNumberField',
            'IQOneToManyRelation', 'IQStringField',
            'IQUntypedField',
            'IQEntity', 'IQRelation',
            'RawDelete', 'RawUpdate'
        ], '@airport/air-control');
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
        let addEntityCommand = '';
        let fileSource = `${imports}

declare function require(moduleName: string): any;

${interfaceSource}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

${classSource}

${idClassSource}

${relationClassSource}

${addEntityCommand}`;
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
                if (property.fromProject.indexOf('@airport/') !== 0) {
                    qEntityRelativePath += '/lib/app';
                }
                type = property.otherApplicationDbEntity.name;
            }
            else {
                type = property.entity.type;
                qEntityRelativePath = resolveRelativeEntityPath(this.entity, property.entity);
                qEntityRelativePath = qEntityRelativePath.replace('.ts', '');
                qEntityRelativePath = this.pathBuilder.prefixQToFileName(qEntityRelativePath);
            }
            type = type.replace('[]', '');
            let qType = 'Q' + type;
            let relationEntityPath;
            if (property.fromProject) {
                relationEntityPath = property.fromProject;
                if (property.fromProject.indexOf('@airport/') !== 0) {
                    relationEntityPath += '/lib/app';
                }
            }
            else {
                relationEntityPath = resolveRelativePath(this.fullGenerationPath, this.entityMapByName[type].path);
            }
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
            this.addImport([type], relationEntityPath, false);
        });
    }
    addImports() {
        this.addRelationImports(this.qEntityBuilder.idRelationBuilders);
        this.addRelationImports(this.qEntityBuilder.nonIdRelationBuilders);
        const entityImportRelativePath = resolveRelativePath(this.fullGenerationPath, this.entityPath).replace('.ts', '');
        this.addImport([this.entity.docEntry.name], entityImportRelativePath, false);
    }
}
//# sourceMappingURL=QEntityFileBuilder.js.map