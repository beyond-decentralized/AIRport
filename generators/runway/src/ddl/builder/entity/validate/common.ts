import { PropertyDocEntry } from "../../../parser/DocEntry"
import { EntityCandidate } from "../../../parser/EntityCandidate"
import { IBuilder } from "../../Builder"
import { SColumn } from "../../application/SProperty"
import { FileBuilder } from "../FileBuilder"

export interface IVCoreEntityBuilder
    extends IBuilder {

    constructorFields: { [name: string]: boolean }
    entity: EntityCandidate
    fileBuilder: FileBuilder

    addImport(
        classNames: (string | { asName: string, sourceName: string })[],
        filePath: string
    ): void

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