"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../resolve/pathResolver");
class GeneratedSummaryBuilder {
    constructor(pathBuilder) {
        this.pathBuilder = pathBuilder;
        this.generatedFilePaths = [];
        this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/generated.ts';
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
        return `export * from './mappedSuperclass'
export * from './qSchema';
export * from './baseDaos';
export * from './baseDmos';
${exports}
`;
    }
}
exports.GeneratedSummaryBuilder = GeneratedSummaryBuilder;
//# sourceMappingURL=GeneratedSummaryBuilder.js.map