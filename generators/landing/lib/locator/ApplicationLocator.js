var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getFullApplicationNameFromDomainAndName } from '@airport/ground-control';
import { Injected } from '@airport/air-control';
let ApplicationLocator = class ApplicationLocator {
    // private terminalStore: ITerminalStore
    locateExistingApplicationVersionRecord(jsonApplication, terminalStore) {
        const applicationVersionsForDomainName = terminalStore
            .getLatestApplicationVersionMapByNames().get(jsonApplication.domain);
        if (!applicationVersionsForDomainName) {
            return null;
        }
        const fullApplicationName = getFullApplicationNameFromDomainAndName(jsonApplication.domain, jsonApplication.name);
        const latestApplicationVersionForApplication = applicationVersionsForDomainName.get(fullApplicationName);
        const jsonApplicationVersion = jsonApplication.versions[0];
        if (latestApplicationVersionForApplication
            && latestApplicationVersionForApplication.integerVersion !== jsonApplicationVersion.integerVersion) {
            throw new Error(`Multiple versions of applications are not yet supported`);
        }
        return latestApplicationVersionForApplication;
    }
    async locateLatestApplicationVersionByApplicationName(fullApplicationName, terminalStore) {
        return terminalStore.getLatestApplicationVersionMapByFullApplicationName()
            .get(fullApplicationName);
    }
};
ApplicationLocator = __decorate([
    Injected()
], ApplicationLocator);
export { ApplicationLocator };
//# sourceMappingURL=ApplicationLocator.js.map