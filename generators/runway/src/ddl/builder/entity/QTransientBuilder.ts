import { PropertyDocEntry } from "../../parser/DocEntry";
import { addImportForType } from "../../../resolve/pathResolver";
import { IQCoreEntityBuilder } from "../Builder";

export class QTransientBuilder {

	constructor(
		private parentBuilder: IQCoreEntityBuilder,
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

		return `${prop.name}?: ${prop.type};`;
	}

}