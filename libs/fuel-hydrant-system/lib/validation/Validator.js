export class QValidator {
    validateInsertQEntity(dbEntity) {
    }
    validateReadFromEntity(relation) {
    }
    validateReadProperty(dbColumn) {
    }
    validateUpdateProperty(propertyName, dbEntity) {
    }
    validateUpdateColumn(dbColumn) {
    }
    validateReadQEntityProperty(schemaIndex, tableIndex, columnIndex) {
    }
    validateReadQEntityManyToOneRelation(schemaIndex, tableIndex, columnIndex) {
    }
    addFunctionAlias(functionAlias) {
    }
    addSubQueryAlias(subQueryAlias) {
    }
    validateAliasedFieldAccess(fieldAlias) {
    }
}
const VALIDATOR = new QValidator();
export function getValidator(dbEntity) {
    return VALIDATOR;
}
//# sourceMappingURL=Validator.js.map