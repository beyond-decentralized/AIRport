import { PropertyDocEntry } from "../../../parser/DocEntry"
import { EntityCandidate } from "../../../parser/EntityCandidate"
import { SIndexedApplication } from "../../application/SApplication"
import { SColumn } from "../../application/SProperty"
import { IdRelationData, MemberData } from "../../Builder"
import { FileBuilder } from "../FileBuilder"
import { IQCoreEntityBuilder } from "./common"
import { QColumnBuilder } from "./QColumnBuilder"
import { QPropertyBuilder } from "./QPropertyBuilder"
import { QRelationBuilder } from "./QRelationBuilder"
import { QTransientBuilder } from "./QTransientBuilder"


export abstract class QCoreEntityBuilder
    implements IQCoreEntityBuilder {

    constructorFields: { [name: string]: boolean } = {}

    constructor(
        public entity: EntityCandidate,
        protected fullGenerationPath: string,
        protected workingDirPath: string,
        public fileBuilder: FileBuilder,
        protected entityMapByName: { [entityName: string]: EntityCandidate },
		public sIndexedApplication: SIndexedApplication
    ) {
    }

    abstract build(...args: any[]): string

    addImport(
        classNames: (string | { asName: string, sourceName: string })[],
        filePath: string,
    ): void {
        this.fileBuilder.addImport(classNames, filePath)
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
    ): IdRelationData {
        const relationData: IdRelationData = {
            definitions: ``,
            customInterfaces: ``
        }

        relationBuilders.forEach((
            builder: QRelationBuilder
        ) => {
            relationData.customInterfaces += builder.buildCustomInterface()
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