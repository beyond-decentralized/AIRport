import { resolveRelativePath } from '../../resolve/pathResolver';
export class ImplementationFileBuilder {
    constructor(fileName, pathBuilder) {
        this.pathBuilder = pathBuilder;
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