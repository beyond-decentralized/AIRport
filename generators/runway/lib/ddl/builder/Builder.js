export function getPropertyFieldType(//
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
export function getPropertyJSONOperationInterface(//
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
export function getPropertyTypedOperationInterface(//
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
export function getRelationFieldType(//
entityProperty //
) {
    if (entityProperty.isArray) {
        return 'ONE_TO_MANY';
    }
    else {
        return 'MANY_TO_ONE';
    }
}
//# sourceMappingURL=Builder.js.map