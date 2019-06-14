"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../resolve/pathResolver");
class ImplementationFileBuilder {
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
        const ddlRelativePath = pathResolver_1.resolveRelativePath(this.daoListingFilePath, fullDdlPath)
            .replace('.ts', '');
        this.ddlPathMapByEntityName[entityName] = ddlRelativePath;
        const generatedRelativePath = pathResolver_1.resolveRelativePath(this.daoListingFilePath, fullGenerationPath)
            .replace('.ts', '');
        this.generatedPathMapByEntityName[entityName]
            = this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath);
        this.entityNames.push(entityName);
        this.entityIdMapByName[entityName] = entityId;
    }
}
exports.ImplementationFileBuilder = ImplementationFileBuilder;
//# sourceMappingURL=ImplementationFileBuilder.js.map