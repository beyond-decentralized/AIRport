"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../resolve/pathResolver");
class GeneratedFileListingBuilder {
    constructor(pathBuilder, fileName) {
        this.pathBuilder = pathBuilder;
        this.fileName = fileName;
        this.generatedFilePaths = [];
        this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/' + fileName;
    }
    addFileNameAndPaths(entityName, fullDdlPath, fullGenerationPath) {
        const generatedRelativePath = pathResolver_1.resolveRelativePath(this.generatedListingFilePath, fullGenerationPath)
            .replace('.ts', '');
        this.generatedFilePaths.push(this.pathBuilder.convertFileNameToLowerCase(generatedRelativePath));
    }
    build() {
        this.generatedFilePaths.sort();
        const exports = this.generatedFilePaths.map(filePath => `export * from '${filePath}';`)
            .join('\n');
        return `${exports}
`;
    }
}
exports.GeneratedFileListingBuilder = GeneratedFileListingBuilder;
//# sourceMappingURL=GeneratedFileListingBuilder.js.map