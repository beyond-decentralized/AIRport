"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../../resolve/pathResolver");
const Builder_1 = require("../Builder");
/**
 * Created by Papa on 4/25/2016.
 */
class QPropertyBuilder {
    constructor(parentBuilder, propertyDocEntry) {
        this.parentBuilder = parentBuilder;
        this.propertyDocEntry = propertyDocEntry;
    }
    buildDefinition() {
        let prop = this.propertyDocEntry;
        let name = prop.name;
        let fieldClass = Builder_1.getPropertyFieldClass(prop);
        return `${name}: I${fieldClass};`;
    }
    build() {
        throw new Error(`Not Implemented.`);
    }
    buildInterfaceDefinition(optional = true, forInternalInterfaces = true) {
        let prop = this.propertyDocEntry;
        let name = prop.name;
        let propertyType = prop.primitive;
        if (propertyType === 'Json') {
            propertyType = prop.type;
            const moduleImport = this.propertyDocEntry.ownerEntity.docEntry.fileImports.importMapByObjectAsName[propertyType];
            let relativePathToImport = moduleImport.path;
            if (moduleImport.path.indexOf('.') === 0) {
                const fullPathToImport = pathResolver_1.getFullPathFromRelativePath(moduleImport.path, this.propertyDocEntry.ownerEntity.path);
                relativePathToImport = pathResolver_1.resolveRelativePath(this.parentBuilder.fileBuilder.fullGenerationPath, fullPathToImport);
            }
            this.parentBuilder.addImport([moduleImport.objectMapByAsName[propertyType]], relativePathToImport);
        }
        let operableFieldSuffix = '';
        if (forInternalInterfaces) {
            operableFieldSuffix = ' | ' + Builder_1.getPropertyFieldInterface(prop);
        }
        else {
            if (!prop.primitive) {
                pathResolver_1.addImportForType(prop.ownerEntity, prop.type, this.parentBuilder.fileBuilder);
                propertyType = prop.type;
            }
        }
        return `${name}${optional ? '?' : ''}: ${propertyType}${operableFieldSuffix};`;
    }
}
exports.QPropertyBuilder = QPropertyBuilder;
//# sourceMappingURL=QPropertyBuilder.js.map