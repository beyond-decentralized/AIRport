import { QColumnBuilder } from "./QColumnBuilder";
import { QPropertyBuilder } from "./QPropertyBuilder";
import { QRelationBuilder } from "./QRelationBuilder";
import { QTransientBuilder } from "./QTransientBuilder";
export class QCoreEntityBuilder {
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
    getQColumnBuilders(columns) {
        return columns.map(column => new QColumnBuilder(this, column));
    }
    getQPropertyBuilders(properties) {
        return properties.map(property => this.addQPropertyBuilder(property)).filter(builder => builder != null);
    }
    getQTransientPropertyBuilders(properties) {
        return properties.map(property => new QTransientBuilder(this, property));
    }
    getQRelationBuilders(properties, buildRelationInstance) {
        return properties.map(property => this.addQRelationBuilder(property, buildRelationInstance)).filter(builder => builder != null);
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
    addQPropertyBuilder(property) {
        let propertyBuilder = null;
        if (property.primitive) {
            propertyBuilder = new QPropertyBuilder(this, property);
        }
        return propertyBuilder;
    }
    addQRelationBuilder(property, buildRelationInstance) {
        let relationBuilder = null;
        if (property.entity || property.fromProject) {
            relationBuilder = new QRelationBuilder(this, property, this.entityMapByName, buildRelationInstance);
        }
        return relationBuilder;
    }
}
export function getQPropertyFieldInterface(//
propertyDocEntry //
) {
    return getQPrimitiveFieldInterface(propertyDocEntry.primitive);
}
export function getQColumnFieldInterface(//
sColumn //
) {
    return getQPrimitiveFieldInterface(sColumn.type);
}
export function getQPrimitiveFieldInterface(//
primitive //
) {
    switch (primitive) {
        case 'boolean':
            return 'IQBooleanField';
        case 'Date':
            return 'IQDateField';
        case 'number':
            return 'IQNumberField';
        case 'string':
        case 'Json':
            return 'IQStringField';
        case 'any':
            return 'IQUntypedField';
        default:
            throw new Error(`Unexpected primitive ${primitive}`);
    }
}
export function getQPropertyFieldClass(//
propertyDocEntry //
) {
    switch (propertyDocEntry.primitive) {
        case 'boolean':
            return 'QBooleanField';
        case 'Date':
            return 'QDateField';
        case 'number':
            return 'QNumberField';
        case 'string':
        case 'Json':
            return 'QStringField';
        case 'any':
            return 'QUntypedField';
        default:
            throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`);
    }
}
//# sourceMappingURL=QCoreEntityBuilder.js.map