"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QColumnBuilder_1 = require("./entity/QColumnBuilder");
const QPropertyBuilder_1 = require("./entity/QPropertyBuilder");
const QRelationBuilder_1 = require("./entity/QRelationBuilder");
const QTransientBuilder_1 = require("./entity/QTransientBuilder");
class QCoreEntityBuilder {
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
    getColumnBuilders(columns) {
        return columns.map(column => new QColumnBuilder_1.QColumnBuilder(this, column));
    }
    getPropertyBuilders(properties) {
        return properties.map(property => this.addPropertyBuilder(property)).filter(builder => builder != null);
    }
    getTransientPropertyBuilders(properties) {
        return properties.map(property => new QTransientBuilder_1.QTransientBuilder(this, property));
    }
    getRelationBuilders(properties, buildRelationInstance) {
        return properties.map(property => this.addRelationBuilder(property, buildRelationInstance)).filter(builder => builder != null);
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
    addPropertyBuilder(property) {
        let propertyBuilder = null;
        if (property.primitive) {
            propertyBuilder = new QPropertyBuilder_1.QPropertyBuilder(this, property);
        }
        return propertyBuilder;
    }
    addRelationBuilder(property, buildRelationInstance) {
        let relationBuilder = null;
        if (property.entity || property.fromProject) {
            relationBuilder = new QRelationBuilder_1.QRelationBuilder(this, property, this.entityMapByName, buildRelationInstance);
        }
        return relationBuilder;
    }
}
exports.QCoreEntityBuilder = QCoreEntityBuilder;
function getPropertyFieldType(//
propertyDocEntry //
) {
    switch (propertyDocEntry.primitive) {
        case 'boolean':
            return 'BOOLEAN';
        case 'Date':
            return 'DATE';
        case 'number':
            return 'NUMBER';
        case 'string':
        case 'Json':
            return 'STRING';
        case 'any':
            return 'ANY';
        default:
            throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`);
    }
}
exports.getPropertyFieldType = getPropertyFieldType;
function getPropertyJSONOperationInterface(//
propertyDocEntry //
) {
    switch (propertyDocEntry.primitive) {
        case 'boolean':
            return 'JSONRawBooleanOperation';
        case 'Date':
            return 'JSONRawDateOperation';
        case 'number':
            return 'JSONRawNumberOperation';
        case 'string':
        case 'Json':
            return 'JSONRawStringOperation';
        case 'any':
            return 'JSONRawUntypedOperation';
        default:
            throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`);
    }
}
exports.getPropertyJSONOperationInterface = getPropertyJSONOperationInterface;
function getPropertyTypedOperationInterface(//
propertyDocEntry //
) {
    switch (propertyDocEntry.primitive) {
        case 'boolean':
            return 'IBooleanOperation';
        case 'Date':
            return 'IDateOperation';
        case 'number':
            return 'INumberOperation';
        case 'string':
        case 'Json':
            return 'IStringOperation';
        case 'any':
            return 'IUntypedOperation';
        default:
            throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`);
    }
}
exports.getPropertyTypedOperationInterface = getPropertyTypedOperationInterface;
function getPropertyFieldInterface(//
propertyDocEntry //
) {
    return getPrimitiveFieldInterface(propertyDocEntry.primitive);
}
exports.getPropertyFieldInterface = getPropertyFieldInterface;
function getColumnFieldInterface(//
sColumn //
) {
    return getPrimitiveFieldInterface(sColumn.type);
}
exports.getColumnFieldInterface = getColumnFieldInterface;
function getPrimitiveFieldInterface(//
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
exports.getPrimitiveFieldInterface = getPrimitiveFieldInterface;
function getPropertyFieldClass(//
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
exports.getPropertyFieldClass = getPropertyFieldClass;
function getRelationFieldType(//
entityProperty //
) {
    if (entityProperty.isArray) {
        return 'ONE_TO_MANY';
    }
    else {
        return 'MANY_TO_ONE';
    }
}
exports.getRelationFieldType = getRelationFieldType;
//# sourceMappingURL=Builder.js.map