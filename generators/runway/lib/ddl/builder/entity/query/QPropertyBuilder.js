import { addImportForType, getFullPathFromRelativePath, resolveRelativePath } from '../../../../resolve/pathResolver';
import { getQPropertyFieldClass, getQPropertyFieldInterface } from './QCoreEntityBuilder';
/**
 * Created by Papa on 4/25/2016.
 */
export class QPropertyBuilder {
    constructor(parentBuilder, propertyDocEntry) {
        this.parentBuilder = parentBuilder;
        this.propertyDocEntry = propertyDocEntry;
    }
    buildDefinition() {
        let prop = this.propertyDocEntry;
        let name = prop.name;
        let fieldClass = getQPropertyFieldClass(prop);
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
            let trimmedPropertyType = propertyType.trim();
            if (trimmedPropertyType.startsWith('{') || trimmedPropertyType.startsWith('[')
                || trimmedPropertyType.endsWith('}') || trimmedPropertyType.endsWith(']')) {
                throw new Error(`@Json() type must be an imported interface.  It cannot be an inplace type definition`);
            }
            const moduleImport = this.propertyDocEntry.ownerEntity.docEntry.fileImports.importMapByObjectAsName[propertyType];
            let relativePathToImport = moduleImport.path;
            if (moduleImport.path.indexOf('.') === 0) {
                const fullPathToImport = getFullPathFromRelativePath(moduleImport.path, this.propertyDocEntry.ownerEntity.path);
                relativePathToImport = resolveRelativePath(this.parentBuilder.fileBuilder.fullGenerationPath, fullPathToImport);
            }
            this.parentBuilder.addImport([moduleImport.objectMapByAsName[propertyType]], relativePathToImport);
        }
        let operableFieldSuffix = '';
        if (forInternalInterfaces) {
            operableFieldSuffix = ' | ' + getQPropertyFieldInterface(prop);
        }
        else {
            if (!prop.primitive) {
                addImportForType(prop.ownerEntity, prop.type, this.parentBuilder.fileBuilder);
                propertyType = prop.type;
            }
        }
        return `${name}${optional || prop.optional ? '?' : ''}: ${propertyType}${operableFieldSuffix};`;
    }
}
//# sourceMappingURL=QPropertyBuilder.js.map