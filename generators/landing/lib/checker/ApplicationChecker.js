import { container, DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { ensureChildJsMap, getFullApplicationName, } from '@airport/ground-control';
import { APPLICATION_DAO } from '@airport/airspace';
import { APPLICATION_CHECKER } from '../tokens';
export class ApplicationChecker {
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
            const coreDomainAndApplicationNames = existingApplicationInfo.coreDomainAndApplicationNamesByApplicationName.get(applicationName);
            // Remove every reference for this existing application
            for (const referenceMapForApplicationsOfDomain of referencedApplicationMapByApplication.values()) {
                for (const applicationsReferencedByAGivenApplication of referenceMapForApplicationsOfDomain.values()) {
                    const applicationReferencesForDomain = applicationsReferencedByAGivenApplication.get(coreDomainAndApplicationNames.domain);
                    if (applicationReferencesForDomain) {
                        applicationReferencesForDomain.delete(coreDomainAndApplicationNames.application);
                    }
                }
            }
            const allApplicationReferencesForDomain = allReferencedApplicationMap.get(coreDomainAndApplicationNames.domain);
            if (allApplicationReferencesForDomain) {
                allApplicationReferencesForDomain.delete(coreDomainAndApplicationNames.application);
            }
        }
    }
    async findExistingApplications(allReferencedApplicationMap) {
        const fullApplicationNames = [];
        const coreDomainAndApplicationNamesByApplicationName = new Map();
        for (const [domainName, allReferencedApplicationsForDomain] of allReferencedApplicationMap) {
            for (const [coreApplicationName, referencedApplication] of allReferencedApplicationsForDomain) {
                const fullApplicationName = getFullApplicationName(referencedApplication);
                fullApplicationNames.push(fullApplicationName);
                coreDomainAndApplicationNamesByApplicationName.set(fullApplicationName, {
                    domain: domainName,
                    application: coreApplicationName
                });
            }
        }
        let existingApplicationMapByName;
        if (!fullApplicationNames.length) {
            existingApplicationMapByName = new Map();
        }
        else {
            const applicationDao = await container(this).get(APPLICATION_DAO);
            existingApplicationMapByName = await applicationDao.findMapByFullNames(fullApplicationNames);
        }
        return {
            coreDomainAndApplicationNamesByApplicationName,
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
}
DEPENDENCY_INJECTION.set(APPLICATION_CHECKER, ApplicationChecker);
//# sourceMappingURL=ApplicationChecker.js.map