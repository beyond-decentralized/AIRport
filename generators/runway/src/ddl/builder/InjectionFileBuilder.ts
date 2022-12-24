import { IBuilder } from "./Builder";
import { FileBuilder } from "./entity/FileBuilder";
import { PathBuilder } from "./PathBuilder";

/**
 * A builder for generating injection.ts
 * 
 */
export class InjectionFileBuilder
    extends FileBuilder
    implements IBuilder {

    static getTokenNameFromClassName(
        className: string
    ): string {
        let tokenName = ''
        for (let i = 0; i < className.length; i++) {
            let character = className[i]
            let upperCaseCharacter = character.toUpperCase()
            if (character === upperCaseCharacter
                && i > 0) {
                tokenName += '_'
            }
            tokenName += upperCaseCharacter
        }

        return tokenName
    }

    constructor(
        fileName: string,
        pathBuilder: PathBuilder,
    ) {
        super(null, null, pathBuilder, null);
        // this.daoListingFilePath = pathBuilder.fullGeneratedDirPath + `/${fileName}.ts`;
    }

    addImports() {
        // this.addImport([
        //     'IQEntity'
        // ], '@airport/air-traffic-control');
    }

    build(): string {
        const imports = this.buildImports();

        throw new Error(`Not Implemented, yet.`)
    }
}