import { DI } from '@airport/di';
import { Q_VALIDATOR } from '../tokens';
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
    validateReadQEntityProperty(applicationIndex, tableIndex, columnIndex) {
    }
    validateReadQEntityManyToOneRelation(applicationIndex, tableIndex, columnIndex) {
    }
    addFunctionAlias(functionAlias) {
    }
    addSubQueryAlias(subQueryAlias) {
    }
    validateAliasedFieldAccess(fieldAlias) {
    }
}
DI.set(Q_VALIDATOR, QValidator);
//# sourceMappingURL=Validator.js.map