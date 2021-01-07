import { resolveRelativePath } from '../../resolve/pathResolver';
import { FileBuilder } from './entity/FileBuilder';
export class ImplementationFileBuilder extends FileBuilder {
    constructor(fileName, pathBuilder) {
        super(null, null, pathBuilder, null);
        this.entityIdMapByName = {};
        this.entityNames = [];
        this.ddlPathMapByEntityName = {};
        this.generatedPathMapByEntityName = {};
        this.daoListingFilePath = pathBuilder.fullGeneratedDirPath + `/${fileName}.ts`;
    }
    addFileNameAndPaths(entityId, entityName, fullDdlPath, fullGenerationPath) {
        if (entityId === undefined) {
            return;
        }
        const ddlRelativePath = resolveRelativePath(this.daoListingFilePath, fullDdlPath)
            .replace('.ts', '');
        this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
        const generatedRelativePath = resolveRelativePath(this.daoListingFilePath, fullGenerationPath)
            .replace('.ts', '');
        this.generatedPathMapByEntityName[entityName]
            = this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
        this.entityNames.push(entityName);
        this.entityIdMapByName[entityName] = entityId;
    }
}
//# sourceMappingURL=ImplementationFileBuilder.js.map