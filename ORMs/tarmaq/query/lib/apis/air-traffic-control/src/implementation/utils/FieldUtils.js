var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { FieldQuery } from '../../../../../ORMs/tarmaq/query/src/definition/query/facade/FieldQuery';
let FieldUtils = class FieldUtils {
    getFieldQueryJson(fieldSubQuery, entityAliases, queryUtils) {
        let subSelectQuery = new FieldQuery(fieldSubQuery, entityAliases);
        return subSelectQuery.toJSON(queryUtils, this, this.relationManager);
    }
};
__decorate([
    Inject()
], FieldUtils.prototype, "relationManager", void 0);
FieldUtils = __decorate([
    Injected()
], FieldUtils);
export { FieldUtils };
//# sourceMappingURL=FieldUtils.js.map