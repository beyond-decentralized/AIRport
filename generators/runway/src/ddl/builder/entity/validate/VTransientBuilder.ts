import { PropertyDocEntry } from "../../../parser/DocEntry"
import { addImportForType } from "../../../../resolve/pathResolver"
import { IVCoreEntityBuilder } from "./common"
import { VRelationBuilder } from "./VRelationBuilder"
import { VPropertyBuilder } from "./VPropertyBuilder"

export class VTransientBuilder {

	constructor(
		private parentBuilder: IVCoreEntityBuilder,
		public propertyDocEntry: PropertyDocEntry
	) {
	}

	buildInterfaceDefinition(): string {
		let prop = this.propertyDocEntry

		if (!prop.primitive && prop.type !== 'Date') {
			let type = prop.type
			if (prop.isMap) {
				type = prop.mapValueType
			}
			type = type.replace('[]', '')
			if (!prop.mapValueIsPrimitive) {
				addImportForType(prop.ownerEntity, type, this.parentBuilder.fileBuilder)
			}
		}

		let builder: VPropertyBuilder | VRelationBuilder

		if (prop.entity || prop.fromProject) {
			builder = new VRelationBuilder(this.parentBuilder, prop)
		} else {
			builder = new VPropertyBuilder(this.parentBuilder, prop)
		}

		// let type = prop.type
		// if(prop.isMap && type.indexOf(']: ') > -1) {
		// 		type = type.replace(/\]\: (?!.*\]\: )/, "]: I")
		// } else {
		// 	type = prop.primitive ? `${type}` : `I${type}`
		// }
		//
		// return `${prop.name}?: ${type}`

		return builder.buildInterfaceDefinition()
	}

}
