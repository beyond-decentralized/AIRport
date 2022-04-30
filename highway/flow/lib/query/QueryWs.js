var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let QueryWebService = class QueryWebService {
    async handle(request, config = {}, context) {
        try {
            this.queryValidator.validate(request);
        }
        catch (e) {
            return {
                error: e.message
            };
        }
    }
};
__decorate([
    Inject()
], QueryWebService.prototype, "queryValidator", void 0);
QueryWebService = __decorate([
    Injected()
], QueryWebService);
export { QueryWebService };
//# sourceMappingURL=QueryWs.js.map