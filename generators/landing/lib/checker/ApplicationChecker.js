var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ensureChildJsMap, } from '@airport/ground-control';
import { Inject, Injected } from '@airport/direction-indicator';
let ApplicationChecker = class ApplicationChecker {
    async check(jsonApplication) {
        if (!jsonApplication) {
            throw new Error(`Json Application not provided`);
        }
        if (!(jsonApplication.versions instanceof Array)) {
            throw new Error('application.versions is not an array');
        }
        if (jsonApplication.versions.length !== 1) {
            // FIXME: add support for application versioning
            throw new Error('Currently only 1 version of application is supported');
        }
        await this.checkDomain(jsonApplication);
    }
    async checkDomain(jsonApplication) {
        // TODO: implement domain checking
    }
    async checkDependencies(jsonApplications) {
        const allReferencedApplicationMap = new Map();
        const referencedApplicationMapByApplication = new Map();
        for (const jsonApplication of jsonApplications) {
            const lastJsonApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
            const referencedApplicationMapForApplication = ensureChildJsMap(ensureChildJsMap(referencedApplicationMapByApplication, jsonApplication.domain), jsonApplication.name);
            for (const jsonReferencedApplication of lastJsonApplicationVersion.referencedApplications) {
                ensureChildJsMap(allReferencedApplicationMap, jsonReferencedApplication.domain).set(jsonReferencedApplication.name, jsonReferencedApplication);
                ensureChildJsMap(referencedApplicationMapForApplication, jsonReferencedApplication.domain).set(jsonReferencedApplication.name, jsonReferencedApplication);
            }
        }
        this.pruneInGroupReferences(jsonApplications, allReferencedApplicationMap, referencedApplicationMapByApplication);
        await this.pruneReferencesToExistingApplications(jsonApplications, allReferencedApplicationMap, referencedApplicationMapByApplication);
        const applicationsWithValidDependencies = [];
        const applicationsInNeedOfAdditionalDependencies = [];
        const neededDependencies = [];
        for (const dependenciesForDomain of allReferencedApplicationMap.values()) {
            for (const dependency of dependenciesForDomain.values()) {
                neededDependencies.push(dependency);
            }
        }
        for (const jsonApplication of jsonApplications) {
            const referencedApplicationMapForApplication = referencedApplicationMapByApplication.get(jsonApplication.domain).get(jsonApplication.name);
            if (this.hasReferences(referencedApplicationMapForApplication)) {
                applicationsInNeedOfAdditionalDependencies.push(jsonApplication);
            }
            else {
                applicationsWithValidDependencies.push(jsonApplication);
            }
        }
        return {
            applicationsWithValidDependencies,
            applicationsInNeedOfAdditionalDependencies,
            neededDependencies
        };
    }
    pruneInGroupReferences(jsonApplications, allReferencedApplicationMap, referencedApplicationMapByApplication) {
        for (const jsonApplication of jsonApplications) {
            // Remove every in-group reference for this application
            for (const [_domainName, referenceMapForApplicationsOfDomain] of referencedApplicationMapByApplication) {
                for (const [_applicationName, applicationsReferencedByAGivenApplication] of referenceMapForApplicationsOfDomain) {
                    const applicationReferencesForDomain = applicationsReferencedByAGivenApplication.get(jsonApplication.domain);
                    if (applicationReferencesForDomain) {
                        applicationReferencesForDomain.delete(jsonApplication.name);
                    }
                }
            }
            const allApplicationReferencesForDomain = allReferencedApplicationMap.get(jsonApplication.domain);
            if (allApplicationReferencesForDomain) {
                allApplicationReferencesForDomain.delete(jsonApplication.name);
            }
        }
    }
    async pruneReferencesToExistingApplications(jsonApplications, allReferencedApplicationMap, referencedApplicationMapByApplication) {
        const existingApplicationInfo = await this.findExistingApplications(allReferencedApplicationMap);
        for (const applicationName of existingApplicationInfo.existingApplicationMapByName.keys()) {
            const coreDomainAndApplication_Names = existingApplicationInfo.coreDomainAndApplication_NamesByApplication_Name.get(applicationName);
            // Remove every reference for this existing application
            for (const referenceMapForApplicationsOfDomain of referencedApplicationMapByApplication.values()) {
                for (const applicationsReferencedByAGivenApplication of referenceMapForApplicationsOfDomain.values()) {
                    const applicationReferencesForDomain = applicationsReferencedByAGivenApplication.get(coreDomainAndApplication_Names.domain);
                    if (applicationReferencesForDomain) {
                        applicationReferencesForDomain.delete(coreDomainAndApplication_Names.application);
                    }
                }
            }
            const allApplicationReferencesForDomain = allReferencedApplicationMap.get(coreDomainAndApplication_Names.domain);
            if (allApplicationReferencesForDomain) {
                allApplicationReferencesForDomain.delete(coreDomainAndApplication_Names.application);
            }
        }
    }
    async findExistingApplications(allReferencedApplicationMap) {
        const fullApplication_Names = [];
        const coreDomainAndApplication_NamesByApplication_Name = new Map();
        for (const [domainName, allReferencedApplicationsForDomain] of allReferencedApplicationMap) {
            for (const [coreApplication_Name, referencedApplication] of allReferencedApplicationsForDomain) {
                const fullApplication_Name = this.dbApplicationUtils.
                    getFullApplication_Name(referencedApplication);
                fullApplication_Names.push(fullApplication_Name);
                coreDomainAndApplication_NamesByApplication_Name.set(fullApplication_Name, {
                    domain: domainName,
                    application: coreApplication_Name
                });
            }
        }
        let existingApplicationMapByName;
        if (!fullApplication_Names.length) {
            existingApplicationMapByName = new Map();
        }
        else {
            existingApplicationMapByName = await this.applicationDao.findMapByFullNames(fullApplication_Names);
        }
        return {
            coreDomainAndApplication_NamesByApplication_Name,
            existingApplicationMapByName
        };
    }
    hasReferences(referencedApplicationMap) {
        for (const referencesForDomain of referencedApplicationMap.values()) {
            for (const _ of referencesForDomain) {
                return true;
            }
        }
        return false;
    }
};
__decorate([
    Inject()
], ApplicationChecker.prototype, "applicationDao", void 0);
__decorate([
    Inject()
], ApplicationChecker.prototype, "dbApplicationUtils", void 0);
ApplicationChecker = __decorate([
    Injected()
], ApplicationChecker);
export { ApplicationChecker };
//# sourceMappingURL=ApplicationChecker.js.map