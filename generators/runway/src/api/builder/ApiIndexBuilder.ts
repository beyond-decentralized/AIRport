import { resolveRelativePath } from "../../resolve/pathResolver";
import { IBuilder } from "../../ddl/builder/Builder";
import { FileBuilder } from "../../ddl/builder/entity/FileBuilder";
import { PathBuilder } from "../../ddl/builder/PathBuilder";

export class ApiIndexBuilder
    extends FileBuilder
    implements IBuilder {

    apiFilePaths: string[] = []

    constructor(
        pathBuilder: PathBuilder
    ) {
        super(null, null, pathBuilder, null);
        this.fullGenerationPath = pathBuilder.fullGeneratedDirPath
            + `/api/api.ts`;
    }

    addApiFilePath(
        filePath: string
    ): void {
        const filePathFragments = filePath.split('.')
        filePathFragments.pop()
        this.apiFilePaths.push(filePathFragments.join('.'))
    }

    addImports() {
    }

    build(): string {
        let exports = ''
        for (const apiFilePath of this.apiFilePaths) {
            let relativePathToImport = resolveRelativePath(
                this.fullGenerationPath, apiFilePath)
            exports += `export * from '${relativePathToImport}'
`
        }
        return `${exports}
// import { loadAutopilot } from '@airport/autopilot'
       
// loadAutopilot()
`
    }
}