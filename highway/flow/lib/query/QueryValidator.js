var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { QueryType } from './Query';
let QueryValidator = class QueryValidator {
    validate(request) {
        switch (request.type) {
            case QueryType.DYNAMIC:
                throw new Error(`Dynamic queries are not (yet) supported by Highway.`);
            case QueryType.PREPARED:
                // TODO: implement
                return null;
            default:
                throw new Error(`Unknown Query type: ${request.type}`);
        }
    }
};
QueryValidator = __decorate([
    Injected()
], QueryValidator);
export { QueryValidator };
//# sourceMappingURL=QueryValidator.js.map