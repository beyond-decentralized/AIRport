import { FileBuilder } from "./entity/FileBuilder";
export class TokenBuilder extends FileBuilder {
    static getTokenNameFromClassName(className) {
        let tokenName = '';
        for (let i = 0; i < className.length; i++) {
            let character = className[i];
            let upperCaseCharacter = character.toUpperCase();
            if (character === upperCaseCharacter
                && i > 0) {
                tokenName += '_';
            }
            tokenName += upperCaseCharacter;
        }
        return tokenName;
    }
    constructor(fileName, pathBuilder) {
        super(null, null, pathBuilder, null);
        // this.daoListingFilePath = pathBuilder.fullGeneratedDirPath + `/${fileName}.ts`;
    }
    addImports() {
        // this.addImport([
        //     'IQEntity'
        // ], '@airport/air-traffic-control');
    }
    build() {
        const imports = this.buildImports();
        return `/* eslint-disable */`;
    }
}
//# sourceMappingURL=TokenBuilder.js.map