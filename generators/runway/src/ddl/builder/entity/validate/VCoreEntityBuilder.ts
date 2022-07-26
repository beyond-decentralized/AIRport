import { PropertyDocEntry } from "../../../parser/DocEntry";
import { EntityCandidate } from "../../../parser/EntityCandidate";
import { SColumn } from "../../application/SProperty";
import { IBuilder, MemberData } from "../../Builder";
import { FileBuilder } from "../FileBuilder";
import { VPropertyBuilder } from "./VPropertyBuilder";
import { VRelationBuilder } from "./VRelationBuilder";
import { VTransientBuilder } from "./VTransientBuilder";

export interface IVCoreEntityBuilder
    extends IBuilder {

    constructorFields: { [name: string]: boolean };
    entity: EntityCandidate;
    fileBuilder: FileBuilder;

    addImport(
        classNames: (string | { asName: string, sourceName: string })[],
        filePath: string
    ): void;

}

export abstract class VCoreEntityBuilder
    implements IVCoreEntityBuilder {

    constructorFields: { [name: string]: boolean } = {}

    constructor(
        public entity: EntityCandidate,
        protected fullGenerationPath: string,
        protected workingDirPath: string,
        public fileBuilder: FileBuilder,
        protected entityMapByName: { [entityName: string]: EntityCandidate }
    ) {
    }

    abstract build(...args: any[]): string;

    addImport(
        classNames: (string | { asName: string, sourceName: string })[],
        filePath: string,
        toLowerCase?: boolean,
    ): void {
        this.fileBuilder.addImport(classNames, filePath, toLowerCase)
    }

    protected getVPropertyBuilders(
        properties: PropertyDocEntry[]
    ): VPropertyBuilder[] {
        return properties.map(
            property => this.addVPropertyBuilder(property)
        ).filter(
            builder => builder != null)
    }

    protected getVTransientPropertyBuilders(
        properties: PropertyDocEntry[]
    ): VTransientBuilder[] {
        return properties.map(
            property => new VTransientBuilder(this, property)
        )
    }

    protected getVRelationBuilders(
        properties: PropertyDocEntry[]
    ): VRelationBuilder[] {
        return properties.map(
            property => this.addVRelationBuilder(property)
        ).filter(
            builder => builder != null)
    }

    private addVPropertyBuilder(
        property: PropertyDocEntry
    ): VPropertyBuilder {
        let propertyBuilder = null
        if (property.primitive) {
            propertyBuilder = new VPropertyBuilder(this, property)
        }

        return propertyBuilder
    }

    private addVRelationBuilder(
        property: PropertyDocEntry
    ): VRelationBuilder {
        let relationBuilder = null
        if (property.entity || property.fromProject) {
            relationBuilder = new VRelationBuilder(this, property)
        }
        return relationBuilder
    }

}

export function getVPropertyFieldInterface( //
    propertyDocEntry: PropertyDocEntry //
): string {
    return getVPrimitiveFieldInterface(propertyDocEntry.primitive)
}

export function getVColumnFieldInterface( //
    sColumn: SColumn //
): string {
    return getVPrimitiveFieldInterface(sColumn.type)
}

export function getVPrimitiveFieldInterface( //
    primitive: string //
): string {
    switch (primitive) {
        case 'boolean':
            return 'IVBooleanField'
        case 'Date':
            return 'IVDateField'
        case 'number':
            return 'IVNumberField'
        case 'string':
        case 'Json':
            return 'IVStringField'
        case 'any':
            return 'IVUntypedField'
        default:
            throw new Error(`Unexpected primitive ${primitive}`)
    }
}

export function getVPropertyFieldClass( //
    propertyDocEntry: PropertyDocEntry //
): string {
    switch (propertyDocEntry.primitive) {
        case 'boolean':
            return 'VBooleanField'
        case 'Date':
            return 'VDateField'
        case 'number':
            return 'VNumberField'
        case 'string':
        case 'Json':
            return 'VStringField'
        case 'any':
            return 'VUntypedField'
        default:
            throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
    }
}