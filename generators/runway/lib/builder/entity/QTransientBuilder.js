"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../../resolve/pathResolver");
class QTransientBuilder {
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
                pathResolver_1.addImportForType(prop.ownerEntity, type, this.parentBuilder.fileBuilder);
            }
        }
        return `${prop.name}?: ${prop.type};`;
    }
}
exports.QTransientBuilder = QTransientBuilder;
//# sourceMappingURL=QTransientBuilder.js.map