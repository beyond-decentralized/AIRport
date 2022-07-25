import { PropertyDocEntry } from "../../../parser/DocEntry";
import { addImportForType } from "../../../../resolve/pathResolver";
import { IVCoreEntityBuilder } from "./VCoreEntityBuilder";

export class VTransientBuilder {

	constructor(
		private parentBuilder: IVCoreEntityBuilder,
		public propertyDocEntry: PropertyDocEntry
	) {
	}

	buildInterfaceDefinition(): string {
		let prop = this.propertyDocEntry;

		if (!prop.primitive && prop.type !== 'Date') {
			let type = prop.type;
			if (prop.isMap) {
				type = prop.mapValueType;
			}
			type = type.replace('[]', '');
			if(!prop.mapValueIsPrimitive) {
				addImportForType(prop.ownerEntity, type, this.parentBuilder.fileBuilder);
			}
		}

		// let type = prop.type;
		// if(prop.isMap && type.indexOf(']: ') > -1) {
		// 		type = type.replace(/\]\: (?!.*\]\: )/, "]: I");
		// } else {
		// 	type = prop.primitive ? `${type}` : `I${type}`
		// }
		//
		// return `${prop.name}?: ${type};`;
		return `${prop.name}?: ${prop.type};`;
	}

}
