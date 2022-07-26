import { resolveRelativeEntityPath, resolveRelativePath, } from '../../../../resolve/pathResolver';
import { FileBuilder } from '../FileBuilder';
import { IVEntityInterfaceBuilder } from './IVEntityInterfaceBuilder';
import { VEntityBuilder } from './VEntityBuilder';
/**
 * Created by Papa on 4/26/2016.
 */
export class VEntityFileBuilder extends FileBuilder {
    constructor(entity, fullGenerationPath, pathBuilder, entityMapByName, configuration, sIndexedEntity, entityPath) {
        super(entity, fullGenerationPath, pathBuilder, configuration);
        this.entityMapByName = entityMapByName;
        this.entityPath = entityPath;
        this.importMap = {};
        this.vEntityBuilder = new VEntityBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath, this, entityMapByName, sIndexedEntity);
        this.vEntityInterfaceBuilder = new IVEntityInterfaceBuilder(entity, this.vEntityBuilder);
        this.addImport([
            'IEntityVDescriptor',
            'IVBooleanField',
            'IVDateField',
            'IVNumberField',
            'IVStringField',
            'IVUntypedField'
        ], '@airport/airbridge-validate');
        // let entityRelativePath = resolveRelativePath(fullGenerationPath, entity.path);
        if (entity.parentEntity) {
            let parentVEntityRelativePath;
            if (entity.parentEntity.project) {
                parentVEntityRelativePath = entity.parentEntity.project;
            }
            else {
                let parentFullGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.parentEntity.path, 'v');
                parentVEntityRelativePath = resolveRelativePath(fullGenerationPath, parentFullGenerationPath);
            }
            let parentEntityType = entity.parentEntity.type;
            this.addImport([
                `${parentEntityType}VDescriptor`
            ], parentVEntityRelativePath);
        }
    }
    build() {
        let interfaceSource = this.vEntityInterfaceBuilder.build();
        let imports = this.buildImports();
        let fileSource = `${imports}

${interfaceSource}
`;
        return fileSource;
    }
    addRelationImports(relationBuilders) {
        relationBuilders.forEach((builder) => {
            let property = builder.entityProperty;
            if (this.entity === property.entity) {
                return;
            }
            let type = property.type;
            let vEntityRelativePath;
            if (property.fromProject) {
                vEntityRelativePath = property.fromProject;
                type = property.otherApplicationDbEntity.name;
            }
            else {
                type = property.entity.type;
                vEntityRelativePath = resolveRelativeEntityPath(this.entity, property.entity);
                vEntityRelativePath = vEntityRelativePath.replace('.ts', '');
                vEntityRelativePath = this.pathBuilder.prefixToFileName(vEntityRelativePath, 'v');
            }
            type = type.replace('[]', '');
            this.addImport([type + 'VDescriptor'], vEntityRelativePath);
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
        this.addRelationImports(this.vEntityBuilder.idRelationBuilders);
        this.addRelationImports(this.vEntityBuilder.nonIdRelationBuilders);
        // const entityImportRelativePath = resolveRelativePath(this.fullGenerationPath,
        //   this.entityPath).replace('.ts', '');
        // this.addImport([this.entity.docEntry.name], entityImportRelativePath, false);
        const vFilePath = this.pathBuilder.getFullPathToGeneratedSource(this.entity.path, 'v');
        let entityInterfaceRelativePath = resolveRelativePath(vFilePath, this.fullGenerationPath);
        entityInterfaceRelativePath = entityInterfaceRelativePath.replace('.ts', '').toLowerCase();
        this.addImport([
            'I' + this.entity.docEntry.name
        ], entityInterfaceRelativePath);
    }
}
//# sourceMappingURL=VEntityFileBuilder.js.map