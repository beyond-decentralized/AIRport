var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let ApplicationLocator = class ApplicationLocator {
    // private terminalStore: ITerminalStore
    locateExistingApplicationVersionRecord(jsonApplication, terminalStore) {
        const applicationVersionsForDomain_Name = terminalStore
            .getLatestApplicationVersionMapByNames().get(jsonApplication.domain);
        if (!applicationVersionsForDomain_Name) {
            return null;
        }
        const fullApplication_Name = this.dbApplicationUtils.
            getFullApplication_NameFromDomainAndName(jsonApplication.domain, jsonApplication.name);
        const latestApplicationVersionForApplication = applicationVersionsForDomain_Name.get(fullApplication_Name);
        const jsonApplicationVersion = jsonApplication.versions[0];
        if (latestApplicationVersionForApplication
            && latestApplicationVersionForApplication.integerVersion !== jsonApplicationVersion.integerVersion) {
            throw new Error(`Multiple versions of applications are not yet supported`);
        }
        return latestApplicationVersionForApplication;
    }
    async locateLatestApplicationVersionByApplication_Name(fullApplication_Name, terminalStore) {
        return terminalStore.getLatestApplicationVersionMapByFullApplication_Name()
            .get(fullApplication_Name);
    }
};
__decorate([
    Inject()
], ApplicationLocator.prototype, "dbApplicationUtils", void 0);
ApplicationLocator = __decorate([
    Injected()
], ApplicationLocator);
export { ApplicationLocator };
//# sourceMappingURL=ApplicationLocator.js.map