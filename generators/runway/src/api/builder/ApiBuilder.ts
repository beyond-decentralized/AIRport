import { IApiClass, IApiFileForGeneration, IApiSignature } from "../parser/ApiGenerator";
import { getFullPathFromRelativePath, resolveRelativePath } from "../../resolve/pathResolver";
import { IBuilder } from "../../ddl/builder/Builder";
import { FileBuilder } from "../../ddl/builder/entity/FileBuilder";
import { PathBuilder } from "../../ddl/builder/PathBuilder";

export class ApiBuilder
    extends FileBuilder
    implements IBuilder {

    directoryFile

    constructor(
        pathBuilder: PathBuilder,
        private apiFile: IApiFileForGeneration,
        apiFilePath: string
    ) {
        super(null, null, pathBuilder, null);

        const relativePathToApiFile = resolveRelativePath(
            pathBuilder.apiDirPath, apiFilePath);
        this.fullGenerationPath = pathBuilder.fullGeneratedDirPath
            + `/api/${relativePathToApiFile}`;
    }

    addImports() {
        for (const objectAsName in this.apiFile.imports.importMapByObjectAsName) {
            const moduleImport = this.apiFile.imports
                .importMapByObjectAsName[objectAsName]

            let relativePathToImport = moduleImport.path
            if (moduleImport.path.indexOf('.') === 0
                && !moduleImport.path.startsWith('./')) {
                const fullPathToImport = getFullPathFromRelativePath(
                    moduleImport.path, this.fullGenerationPath)
                relativePathToImport = '../' + resolveRelativePath(
                    this.fullGenerationPath, fullPathToImport)
            }
            this.addImport([moduleImport.objectMapByAsName[objectAsName]],
                relativePathToImport)
        }

        this.addImport(['ApiProxy'], '@airport/final-approach')

        const appDeclarationFilePath = this.pathBuilder.workingDirPath
            + '/src/to_be_generated/app-declaration'
        const appDeclarationFileRelativePath = resolveRelativePath(
            this.fullGenerationPath, appDeclarationFilePath)
        this.addImport(['application'], appDeclarationFileRelativePath)
    }

    build(): string {
        let enumAndInterfaceDefinitionCode = ''
        for (let enumOrInterfaceCode of this.apiFile.otherMemberDefinitions) {
            enumAndInterfaceDefinitionCode += `
${enumOrInterfaceCode}`
        }

        let apiClassDefinitionCode = ''
        for (let apiClass of this.apiFile.apiClasses) {
            apiClassDefinitionCode += this.buildClassDefinition(apiClass)
        }

        const imports = this.buildImports();

        return `${imports}
${enumAndInterfaceDefinitionCode}
${apiClassDefinitionCode}`
    }

    private buildClassDefinition(
        apiClass: IApiClass
    ) {

        return `
// An API stub for other Applications and UIs to use
// @Injected() is implied but not specified to avoid @airport/direction-indicator
// dependency in UI API stub (eventually, once it's @airport/autopilot is cleaned
// up)
// @Injected()
export class ${apiClass.className} extends ApiProxy<${apiClass.className}> {

    constructor() {
        super(application)
    }
        
            ${this.buildApiMethodStubFragment(apiClass)}
}
`
    }

    private buildApiMethodStubFragment(
        apiClass: IApiClass
    ): string {
        let methodStubFragment = ''
        for (const apiSignature of apiClass.apiSignatures) {
            methodStubFragment += `
    ${this.buildApiMethodStub(apiSignature)}
`
        }

        return methodStubFragment
    }

    private buildApiMethodStub(
        apiSignature: IApiSignature
    ): string {
        const asyncPrefix = apiSignature.isAsync ? 'async ' : ''
        let methodParameters = ''
        let apiCallParameters = ''
        if (apiSignature.parameters.length) {
            methodParameters = `
`
            for (let i = 0; i < apiSignature.parameters.length; i++) {
                const parameter = apiSignature.parameters[i]
                if (i === 0) {
                    methodParameters += '        '
                }
                methodParameters += parameter
                let parameterName = parameter.split(':')[0].trim()
                if (parameterName.endsWith('?')) {
                    parameterName = parameterName.substring(0, parameterName.length - 1)
                }
                apiCallParameters += parameterName
                if (i < apiSignature.parameters.length - 1) {
                    if (apiSignature.parameters.length > 1) {
                        apiCallParameters += ',\n            '
                    }
                    methodParameters += ',\n        '
                }
            }
            if (apiSignature.parameters.length
                && apiSignature.parameters.length > 1) {
                apiCallParameters = `
            ${apiCallParameters}
        `
            }
            methodParameters += `
    `
        }
        let returnPrefix = ''
        if (apiSignature.returnType !== 'Promise<void>'
            && apiSignature.returnType !== 'void'
            && apiSignature.returnType) {
            returnPrefix = 'return '
        }

        return `${asyncPrefix} ${apiSignature.name}(${methodParameters}): ${apiSignature.returnType} {
        ${returnPrefix}await this.proxy.${apiSignature.name}(${apiCallParameters})
    }`
    }
}