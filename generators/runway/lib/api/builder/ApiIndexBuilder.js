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
        const filePathFragments = filePath.split('.');
        filePathFragments.pop();
        this.apiFilePaths.push(filePathFragments.join('.'));
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
        return `${exports}
import { loadAutopilot } from '@airport/autopilot'
       
loadAutopilot()
`;
    }
}
//# sourceMappingURL=ApiIndexBuilder.js.map