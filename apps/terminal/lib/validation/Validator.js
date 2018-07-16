"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QValidator {
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
exports.QValidator = QValidator;
const VALIDATOR = new QValidator();
function getValidator(dbEntity) {
    return VALIDATOR;
}
exports.getValidator = getValidator;
//# sourceMappingURL=Validator.js.map