import { PropertyDocEntry } from "../../../parser/DocEntry";
import { EntityCandidate } from "../../../parser/EntityCandidate";
import { SColumn } from "../../application/SProperty";
import { IBuilder, MemberData } from "../../Builder";
import { FileBuilder } from "../FileBuilder";
import { QColumnBuilder } from "./QColumnBuilder";
import { QPropertyBuilder } from "./QPropertyBuilder";
import { QRelationBuilder } from "./QRelationBuilder";
import { QTransientBuilder } from "./QTransientBuilder";


export interface IQCoreEntityBuilder
    extends IBuilder {

    constructorFields: { [name: string]: boolean };
    entity: EntityCandidate;
    fileBuilder: FileBuilder;

    addImport(
        classNames: (string | { asName: string, sourceName: string })[],
        filePath: string
    ): void;

}

export abstract class QCoreEntityBuilder
    implements IQCoreEntityBuilder {

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

    protected getQColumnBuilders(
        columns: SColumn[]
    ): QColumnBuilder[] {
        return columns.map(
            column => new QColumnBuilder(this, column)
        )
    }

    protected getQPropertyBuilders(
        properties: PropertyDocEntry[]
    ): QPropertyBuilder[] {
        return properties.map(
            property => this.addQPropertyBuilder(property)
        ).filter(
            builder => builder != null)
    }

    protected getQTransientPropertyBuilders(
        properties: PropertyDocEntry[]
    ): QTransientBuilder[] {
        return properties.map(
            property => new QTransientBuilder(this, property)
        )
    }

    protected getQRelationBuilders(
        properties: PropertyDocEntry[],
        buildRelationInstance: boolean
    ): QRelationBuilder[] {
        return properties.map(
            property => this.addQRelationBuilder(property, buildRelationInstance)
        ).filter(
            builder => builder != null)
    }

    protected buildPropertyData(
        propertyBuilders: QPropertyBuilder[]
    ): MemberData {
        const propertyData: MemberData = {
            definitions: ``,
        }

        propertyBuilders.forEach((
            builder: QPropertyBuilder
        ) => {
            propertyData.definitions += `	${builder.buildDefinition()}\n`
        })

        return propertyData
    }

    protected buildRelationData(
        relationBuilders: QRelationBuilder[]
    ): MemberData {
        const relationData: MemberData = {
            definitions: ``,
        }

        relationBuilders.forEach((
            builder: QRelationBuilder
        ) => {
            relationData.definitions += `	${builder.buildDefinition()}\n`
        })

        return relationData
    }

    private addQPropertyBuilder(
        property: PropertyDocEntry
    ): QPropertyBuilder {
        let propertyBuilder = null
        if (property.primitive) {
            propertyBuilder = new QPropertyBuilder(this, property)
        }

        return propertyBuilder
    }

    private addQRelationBuilder(
        property: PropertyDocEntry,
        buildRelationInstance: boolean
    ): QRelationBuilder {
        let relationBuilder = null
        if (property.entity || property.fromProject) {
            relationBuilder = new QRelationBuilder(this, property, this.entityMapByName, buildRelationInstance)
        }
        return relationBuilder
    }

}

export function getQPropertyFieldInterface( //
    propertyDocEntry: PropertyDocEntry //
): string {
    return getQPrimitiveFieldInterface(propertyDocEntry.primitive)
}

export function getQColumnFieldInterface( //
    sColumn: SColumn //
): string {
    return getQPrimitiveFieldInterface(sColumn.type)
}

export function getQPrimitiveFieldInterface( //
    primitive: string //
): string {
    switch (primitive) {
        case 'boolean':
            return 'IQBooleanField'
        case 'Date':
            return 'IQDateField'
        case 'number':
            return 'IQNumberField'
        case 'string':
        case 'Json':
            return 'IQStringField'
        case 'any':
            return 'IQUntypedField'
        default:
            throw new Error(`Unexpected primitive ${primitive}`)
    }
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