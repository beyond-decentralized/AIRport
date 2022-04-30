var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/air-control';
let QValidator = class QValidator {
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
};
QValidator = __decorate([
    Injected()
], QValidator);
export { QValidator };
//# sourceMappingURL=Validator.js.map