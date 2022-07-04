var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApplicationLocator } from '@airport/landing';
import { Inject, Injected } from '@airport/direction-indicator';
let IFrameApplicationLocator = class IFrameApplicationLocator extends ApplicationLocator {
    async locateLatestApplicationVersionByApplication_Name(fullApplication_Name, terminalStore) {
        let applicationVersion = terminalStore
            .getLatestApplicationVersionMapByFullApplication_Name()
            .get(fullApplication_Name);
        if (applicationVersion) {
            return applicationVersion;
        }
        return await this.transactionalConnector
            .getLatestApplicationVersionMapByFullApplication_Name(fullApplication_Name);
    }
};
__decorate([
    Inject()
], IFrameApplicationLocator.prototype, "transactionalConnector", void 0);
IFrameApplicationLocator = __decorate([
    Injected()
], IFrameApplicationLocator);
export { IFrameApplicationLocator };
//# sourceMappingURL=IFrameApplicationLocator.js.map