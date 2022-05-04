var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let AutopilotApiLoader = class AutopilotApiLoader {
    loadApiAutopilot(token) {
        return new Proxy({}, {
            get(target, methodName) {
                switch (methodName) {
                    case '__initialized__':
                        return true;
                    case 'then':
                        return target;
                }
                return function (...args) {
                    return this.localApiClient.invokeApiMethod(token, methodName, args);
                };
            }
        });
    }
};
__decorate([
    Inject()
], AutopilotApiLoader.prototype, "localApiClient", void 0);
AutopilotApiLoader = __decorate([
    Injected()
], AutopilotApiLoader);
export { AutopilotApiLoader };
//# sourceMappingURL=AutopilotApiLoader.js.map