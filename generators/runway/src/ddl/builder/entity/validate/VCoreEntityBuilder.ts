import { PropertyDocEntry } from "../../../parser/DocEntry"
import { EntityCandidate } from "../../../parser/EntityCandidate"
import { FileBuilder } from "../FileBuilder"
import { IVCoreEntityBuilder } from "./common"
import { VPropertyBuilder } from "./VPropertyBuilder"
import { VRelationBuilder } from "./VRelationBuilder"
import { VTransientBuilder } from "./VTransientBuilder"

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

    abstract build(...args: any[]): string

    addImport(
        classNames: (string | { asName: string, sourceName: string })[],
        filePath: string,
    ): void {
        this.fileBuilder.addImport(classNames, filePath)
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