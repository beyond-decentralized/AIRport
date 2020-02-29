import { resolveRelativePath } from '../resolve/pathResolver';
export class GeneratedFileListingBuilder {
    constructor(pathBuilder, fileName) {
        this.pathBuilder = pathBuilder;
        this.fileName = fileName;
        this.generatedFilePaths = [];
        this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/' + fileName;
    }
    addFileNameAndPaths(entityName, fullDdlPath, fullGenerationPath) {
        const generatedRelativePath = resolveRelativePath(this.generatedListingFilePath, fullGenerationPath)
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
//# sourceMappingURL=GeneratedFileListingBuilder.js.map