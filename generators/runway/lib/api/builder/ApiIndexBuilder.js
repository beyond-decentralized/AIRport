import { resolveRelativePath } from "../../resolve/pathResolver";
import { FileBuilder } from "../../ddl/builder/entity/FileBuilder";
export class ApiIndexBuilder extends FileBuilder {
    constructor(pathBuilder) {
        super(null, null, pathBuilder, null);
        this.apiFilePaths = [];
        this.fullGenerationPath = pathBuilder.fullGeneratedDirPath
            + `/api/api.ts`;
    }
    addApiFilePath(filePath) {
        this.apiFilePaths.push(filePath.split('.')[0]);
    }
    addImports() {
    }
    build() {
        let exports = '';
        for (const apiFilePath of this.apiFilePaths) {
            let relativePathToImport = resolveRelativePath(this.fullGenerationPath, apiFilePath);
            exports += `export * from '${relativePathToImport}'
`;
        }
        return exports;
    }
}
//# sourceMappingURL=ApiIndexBuilder.js.map