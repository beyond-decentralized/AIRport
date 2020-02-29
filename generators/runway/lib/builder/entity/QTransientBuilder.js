import { addImportForType } from "../../resolve/pathResolver";
export class QTransientBuilder {
    constructor(parentBuilder, propertyDocEntry) {
        this.parentBuilder = parentBuilder;
        this.propertyDocEntry = propertyDocEntry;
    }
    buildInterfaceDefinition() {
        let prop = this.propertyDocEntry;
        if (!prop.primitive && prop.type !== 'Date') {
            let type = prop.type;
            if (prop.isMap) {
                type = prop.mapValueType;
            }
            type = type.replace('[]', '');
            if (!prop.mapValueIsPrimitive) {
                addImportForType(prop.ownerEntity, type, this.parentBuilder.fileBuilder);
            }
        }
        return `${prop.name}?: ${prop.type};`;
    }
}
//# sourceMappingURL=QTransientBuilder.js.map