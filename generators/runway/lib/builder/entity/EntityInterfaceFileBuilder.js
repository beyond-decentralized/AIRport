import { resolveRelativeEntityPath, resolveRelativePath } from '../../resolve/pathResolver';
import { FileBuilder } from './FileBuilder';
import { IEntityInterfaceBuilder } from './IEntityInterfaceBuilder';
import { QEntityBuilder } from './QEntityBuilder';
/**
 * Created by Papa on 4/26/2016.
 */
export class EntityInterfaceFileBuilder extends FileBuilder {
    constructor(entity, fullGenerationPath, pathBuilder, entityMapByName, configuration, sIndexedEntity) {
        super(entity, fullGenerationPath, pathBuilder, configuration);
        this.qEntityBuilder = new QEntityBuilder(entity, fullGenerationPath, pathBuilder.workingDirPath, this, entityMapByName, sIndexedEntity);
        this.entityInterfaceBuilder = new IEntityInterfaceBuilder(entity, this.qEntityBuilder);
        // let entityRelativePath = resolveRelativePath(fullGenerationPath, entity.path);
        if (entity.parentEntity) {
            let parentEntityRelativePath;
            if (entity.parentEntity.project) {
                parentEntityRelativePath = entity.parentEntity.project;
            }
            else {
                let parentFullGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.parentEntity.path, false);
                parentEntityRelativePath = resolveRelativePath(fullGenerationPath, parentFullGenerationPath);
            }
            let parentEntityType = entity.parentEntity.type;
            this.addImport([
                `I${parentEntityType}`
            ], parentEntityRelativePath);
        }
    }
    build() {
        let interfaceSource = this.entityInterfaceBuilder.build();
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
            let entityInterfaceRelativePath;
            if (property.fromProject) {
                entityInterfaceRelativePath = property.fromProject;
                type = property.otherSchemaDbEntity.name;
            }
            else {
                type = property.entity.type;
                entityInterfaceRelativePath = resolveRelativeEntityPath(this.entity, property.entity);
                entityInterfaceRelativePath = entityInterfaceRelativePath.replace('.ts', '');
            }
            type = type.replace('[]', '');
            this.addImport([
                'I' + type
            ], entityInterfaceRelativePath);
        });
    }
    addImports() {
        this.addRelationImports(this.qEntityBuilder.idRelationBuilders);
        this.addRelationImports(this.qEntityBuilder.nonIdRelationBuilders);
    }
}
//# sourceMappingURL=EntityInterfaceFileBuilder.js.map