import { VPropertyBuilder } from "./VPropertyBuilder";
import { VRelationBuilder } from "./VRelationBuilder";
import { VTransientBuilder } from "./VTransientBuilder";
export class VCoreEntityBuilder {
    constructor(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName) {
        this.entity = entity;
        this.fullGenerationPath = fullGenerationPath;
        this.workingDirPath = workingDirPath;
        this.fileBuilder = fileBuilder;
        this.entityMapByName = entityMapByName;
        this.constructorFields = {};
    }
    addImport(classNames, filePath, toLowerCase) {
        this.fileBuilder.addImport(classNames, filePath, toLowerCase);
    }
    getVPropertyBuilders(properties) {
        return properties.map(property => this.addVPropertyBuilder(property)).filter(builder => builder != null);
    }
    getVTransientPropertyBuilders(properties) {
        return properties.map(property => new VTransientBuilder(this, property));
    }
    getVRelationBuilders(properties, buildRelationInstance) {
        return properties.map(property => this.addVRelationBuilder(property, buildRelationInstance)).filter(builder => builder != null);
    }
    buildPropertyData(propertyBuilders) {
        const propertyData = {
            definitions: ``,
        };
        propertyBuilders.forEach((builder) => {
            propertyData.definitions += `	${builder.buildDefinition()}\n`;
        });
        return propertyData;
    }
    buildRelationData(relationBuilders) {
        const relationData = {
            definitions: ``,
        };
        relationBuilders.forEach((builder) => {
            relationData.definitions += `	${builder.buildDefinition()}\n`;
        });
        return relationData;
    }
    addVPropertyBuilder(property) {
        let propertyBuilder = null;
        if (property.primitive) {
            propertyBuilder = new VPropertyBuilder(this, property);
        }
        return propertyBuilder;
    }
    addVRelationBuilder(property, buildRelationInstance) {
        let relationBuilder = null;
        if (property.entity || property.fromProject) {
            relationBuilder = new VRelationBuilder(this, property, this.entityMapByName, buildRelationInstance);
        }
        return relationBuilder;
    }
}
export function getVPropertyFieldInterface(//
propertyDocEntry //
) {
    return getVPrimitiveFieldInterface(propertyDocEntry.primitive);
}
export function getVColumnFieldInterface(//
sColumn //
) {
    return getVPrimitiveFieldInterface(sColumn.type);
}
export function getVPrimitiveFieldInterface(//
primitive //
) {
    switch (primitive) {
        case 'boolean':
            return 'IVBooleanField';
        case 'Date':
            return 'IVDateField';
        case 'number':
            return 'IVNumberField';
        case 'string':
        case 'Json':
            return 'IVStringField';
        case 'any':
            return 'IVUntypedField';
        default:
            throw new Error(`Unexpected primitive ${primitive}`);
    }
}
export function getVPropertyFieldClass(//
propertyDocEntry //
) {
    switch (propertyDocEntry.primitive) {
        case 'boolean':
            return 'VBooleanField';
        case 'Date':
            return 'VDateField';
        case 'number':
            return 'VNumberField';
        case 'string':
        case 'Json':
            return 'VStringField';
        case 'any':
            return 'VUntypedField';
        default:
            throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`);
    }
}
//# sourceMappingURL=VCoreEntityBuilder.js.map