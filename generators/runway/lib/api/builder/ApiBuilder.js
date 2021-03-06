import { getFullPathFromRelativePath, resolveRelativePath } from "../../resolve/pathResolver";
import { FileBuilder } from "../../ddl/builder/entity/FileBuilder";
import { TokenBuilder } from "../../ddl/builder/TokenBuilder";
export class ApiBuilder extends FileBuilder {
    constructor(pathBuilder, apiFile) {
        super(null, null, pathBuilder, null);
        this.apiFile = apiFile;
        this.fullGenerationPath = pathBuilder.fullGeneratedDirPath
            + `/api/${this.apiFile.fileName}`;
    }
    addImports() {
        this.addImport([
            'DEPENDENCY_INJECTION',
            'Inject',
            'Injected'
        ], '@airport/direction-indicator');
        for (const objectAsName in this.apiFile.imports.importMapByObjectAsName) {
            const moduleImport = this.apiFile.imports
                .importMapByObjectAsName[objectAsName];
            let relativePathToImport = moduleImport.path;
            if (moduleImport.path.indexOf('.') === 0
                && !moduleImport.path.startsWith('./')) {
                const fullPathToImport = getFullPathFromRelativePath(moduleImport.path, this.fullGenerationPath);
                relativePathToImport = '../' + resolveRelativePath(this.fullGenerationPath, fullPathToImport);
            }
            this.addImport([moduleImport.objectMapByAsName[objectAsName]], relativePathToImport, false);
        }
    }
    build() {
        let enumAndInterfaceDefinitionCode = '';
        for (let enumOrInterfaceCode of this.apiFile.otherMemberDefinitions) {
            enumAndInterfaceDefinitionCode += `
${enumOrInterfaceCode}`;
        }
        let apiClassDefinitionCode = '';
        let tokenNames = [];
        for (let apiClass of this.apiFile.apiClasses) {
            const tokenName = TokenBuilder.getTokenNameFromClassName(apiClass.className);
            tokenNames.push(tokenName);
            apiClassDefinitionCode += this.buildClassDefinition(apiClass, tokenName);
        }
        this.addImport(tokenNames, '../../to_be_generated/common-tokens');
        const imports = this.buildImports();
        return `${imports}
${enumAndInterfaceDefinitionCode}
${apiClassDefinitionCode}`;
    }
    buildClassDefinition(apiClass, tokenName) {
        let proxyName = apiClass.className;
        proxyName = proxyName[0].toLowerCase() + proxyName.substring(1);
        return `
// An API stub for other Applications and UIs to use
@Injected()
export class ${apiClass.className} {

    constructor() {
        DEPENDENCY_INJECTION.db().manualInject(this, ${tokenName})
    }
        
    @Inject()
    ${proxyName}: ${apiClass.className}
            ${this.buildApiMethodStubFragment(apiClass, proxyName)}
}
`;
    }
    buildApiMethodStubFragment(apiClass, apiObjectName) {
        let methodStubFragment = '';
        for (const apiSignature of apiClass.apiSignatures) {
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