import { getFullPathFromRelativePath, resolveRelativePath } from "../../resolve/pathResolver";
import { FileBuilder } from "./entity/FileBuilder";
export class ApiBuilder extends FileBuilder {
    constructor(pathBuilder, apiFile) {
        super(null, null, pathBuilder, null);
        this.apiFile = apiFile;
        this.fullGenerationPath = pathBuilder.fullGeneratedDirPath
            + `/api/${this.apiFile.className}.ts`;
    }
    addImports() {
        this.addImport([
            'Inject',
            'Injected'
        ], '@airport/direction-indicator');
        for (const objectAsName in this.apiFile.imports.importMapByObjectAsName) {
            const moduleImport = this.apiFile.imports
                .importMapByObjectAsName[objectAsName];
            let relativePathToImport = moduleImport.path;
            if (moduleImport.path.indexOf('.') === 0) {
                const fullPathToImport = getFullPathFromRelativePath(moduleImport.path, this.fullGenerationPath);
                relativePathToImport = '../' + resolveRelativePath(this.fullGenerationPath, fullPathToImport);
            }
            this.addImport([moduleImport.objectMapByAsName[objectAsName]], relativePathToImport, false);
        }
    }
    build() {
        const imports = this.buildImports();
        let proxyName = this.apiFile.className;
        proxyName = proxyName[0].toLowerCase() + proxyName.substring(1);
        return `${imports}

// An API stub for other Applications and UIs to use
@Injected()
export class ${this.apiFile.className} {

    @Inject()
    ${proxyName}: ${this.apiFile.className}
    ${this.buildApiMethodStubFragment(proxyName)}
}
`;
    }
    buildApiMethodStubFragment(apiObjectName) {
        let methodStubFragment = '';
        for (const apiSignature of this.apiFile.apiSignatures) {
            methodStubFragment += `
    ${this.buildApiMethodStub(apiObjectName, apiSignature)}
`;
        }
        return methodStubFragment;
    }
    buildApiMethodStub(apiObjectName, apiSignature) {
        const asyncPrefix = apiSignature.isAsync ? 'async ' : '';
        let methodParameters = '';
        let apiCallParameters = '';
        if (apiSignature.parameters.length) {
            methodParameters = `
`;
            for (let i = 0; i < apiSignature.parameters.length; i++) {
                const parameter = apiSignature.parameters[i];
                if (i === 0) {
                    methodParameters += '        ';
                }
                methodParameters += parameter;
                let parameterName = parameter.split(':')[0];
                apiCallParameters += parameterName;
                if (i < apiSignature.parameters.length - 1) {
                    if (apiSignature.parameters.length > 1) {
                        apiCallParameters += ',\n            ';
                    }
                    methodParameters += ',\n        ';
                }
            }
            if (apiSignature.parameters.length
                && apiSignature.parameters.length > 1) {
                apiCallParameters = `
            ${apiCallParameters}
        `;
            }
            methodParameters += `
    `;
        }
        let returnPrefix = '';
        if (apiSignature.returnType !== 'Promise<void>'
            && apiSignature.returnType !== 'void'
            && apiSignature.returnType) {
            returnPrefix = 'return ';
        }
        return `${asyncPrefix} ${apiSignature.name}(${methodParameters}): ${apiSignature.returnType} {
        ${returnPrefix}await this.${apiObjectName}.${apiSignature.name}(${apiCallParameters})
    }`;
    }
}
//# sourceMappingURL=ApiBuilder.js.map