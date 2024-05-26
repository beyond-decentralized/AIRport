import { SQLDataType } from "@airport/ground-control";
import { PropertyDocEntry } from "../../../parser/DocEntry";
import { EntityCandidate } from "../../../parser/EntityCandidate";
import { IBuilder } from "../../Builder";
import { SIndexedApplication } from "../../application/SApplication";
import { SColumn } from "../../application/SProperty";
import { FileBuilder } from "../FileBuilder";

export interface IQCoreEntityBuilder
    extends IBuilder {

    constructorFields: { [name: string]: boolean }
    entity: EntityCandidate
    fileBuilder: FileBuilder
    sIndexedApplication: SIndexedApplication

    addImport(
        classNames: (string | { asName: string, sourceName: string })[],
        filePath: string
    ): void

}

export function getQPrimitiveFieldInterface( //
    primitive: string | SQLDataType //
): string {
    switch (primitive) {
        case 'boolean':
        case SQLDataType.BOOLEAN:
            return 'IQBooleanField'
        case 'Date':
        case SQLDataType.DATE:
            return 'IQDateField'
        case 'number':
        case SQLDataType.NUMBER:
            return 'IQNumberField'
        case 'string':
        case SQLDataType.STRING:
        case 'Json':
        case SQLDataType.JSON:
            return 'IQStringField'
        case 'any':
        case SQLDataType.ANY:
            return 'IQUntypedField'
        default:
            throw new Error(`Unexpected primitive ${primitive}`)
    }
}

export function getQColumnFieldInterface( //
    sColumn: SColumn //
): string {
    return getQPrimitiveFieldInterface(sColumn.type)
}

export function getQPropertyFieldInterface( //
    propertyDocEntry: PropertyDocEntry //
): string {
    return getQPrimitiveFieldInterface(propertyDocEntry.primitive)
}

export function getQPropertyFieldClass( //
    propertyDocEntry: PropertyDocEntry //
): string {
    switch (propertyDocEntry.primitive) {
        case 'boolean':
            return 'QBooleanField'
        case 'Date':
            return 'QDateField'
        case 'number':
            return 'QNumberField'
        case 'string':
        case 'Json':
            return 'QStringField'
        case 'any':
            return 'QUntypedField'
        default:
            throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
    }
}