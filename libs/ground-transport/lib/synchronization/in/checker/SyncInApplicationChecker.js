var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApplicationStatus } from '@airport/ground-control';
import { Inject, Injected } from "@airport/air-control";
let SyncInApplicationChecker = class SyncInApplicationChecker {
    async ensureApplications(message) {
        try {
            let applicationCheckMap = await this.checkApplicationsAndDomains(message);
            for (let i = 0; i < message.applications.length; i++) {
                let application = message.applications[i];
                message.applications[i] = applicationCheckMap
                    .get(application.domain.name).get(application.name)
                    .application;
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async checkApplicationsAndDomains(message) {
        const { allApplicationNames, domainCheckMap, domainNames, applicationCheckMap } = this.getNames(message);
        const applications = await this.applicationDao
            .findByDomainNamesAndApplicationNames(domainNames, allApplicationNames);
        for (let application of applications) {
            let domainName = application.domain.name;
            let applicationName = application.name;
            for (let [_, applicationCheck] of applicationCheckMap.get(domainName)) {
                if (applicationCheck.applicationName === applicationName) {
                    let domainCheck = domainCheckMap.get(domainName);
                    domainCheck.found = true;
                    domainCheck.domain = application.domain;
                    applicationCheck.found = true;
                    applicationCheck.application = application;
                }
            }
        }
        let domainsToCreate = [];
        for (let [name, domainCheck] of domainCheckMap) {
            if (domainCheck.found) {
                continue;
            }
            let domain = {
                id: null,
                name
            };
            domainCheck.domain = domain;
            domainsToCreate.push(domain);
        }
        if (domainsToCreate.length) {
            await this.domainDao.insert(domainsToCreate);
        }
        let applicationsToCreate = [];
        for (let [domainName, applicationChecksByName] of applicationCheckMap) {
            for (let [name, applicationCheck] of applicationChecksByName) {
                if (applicationCheck.found) {
                    continue;
                }
                let domain = domainCheckMap.get(domainName).domain;
                let application = {
                    domain,
                    index: null,
                    name,
                    scope: 'private',
                    status: ApplicationStatus.STUB,
                    signature: 'localhost'
                };
                applicationCheck.application = application;
                applicationsToCreate.push(application);
            }
        }
        if (applicationsToCreate.length) {
            await this.applicationDao.insert(applicationsToCreate);
        }
        return applicationCheckMap;
    }
    getNames(message) {
        if (!message.applications || !(message.applications instanceof Array)) {
            throw new Error(`Did not find applications in RepositorySynchronizationMessage.`);
        }
        const domainCheckMap = new Map();
        const applicationCheckMap = new Map();
        for (let application of message.applications) {
            if (typeof application !== 'object') {
                throw new Error(`Invalid ApplicationVersion.application`);
            }
            if (!application.name || typeof application.name !== 'string') {
                throw new Error(`Invalid ApplicationVersion.Application.name`);
            }
            const domain = application.domain;
            if (typeof domain !== 'object') {
                throw new Error(`Invalid ApplicationVersion.Application.Domain`);
            }
            if (!domain.name || typeof domain.name !== 'string') {
                throw new Error(`Invalid ApplicationVersion.Application.Domain.name`);
            }
            let applicationChecksForDomain = applicationCheckMap.get(domain.name);
            if (!applicationChecksForDomain) {
                applicationChecksForDomain = new Map();
                applicationCheckMap.set(domain.name, applicationChecksForDomain);
            }
            if (!applicationChecksForDomain.has(application.name)) {
                applicationChecksForDomain.set(application.name, {
                    applicationName: application.name,
                });
            }
            let domainCheck = domainCheckMap.get(domain.name);
            if (!domainCheck) {
                domainCheckMap.set(domain.name, {
                    domainName: domain.name
                });
            }
        }
        const domainNames = [];
        const allApplicationNames = [];
        for (const [domainName, applicationChecksForDomainMap] of applicationCheckMap) {
            domainNames.push(domainName);
            for (let [applicationName, _] of applicationChecksForDomainMap) {
                allApplicationNames.push(applicationName);
            }
        }
        return {
            allApplicationNames,
            domainCheckMap,
            domainNames,
            applicationCheckMap
        };
    }
};
__decorate([
    Inject()
], SyncInApplicationChecker.prototype, "applicationDao", void 0);
__decorate([
    Inject()
], SyncInApplicationChecker.prototype, "domainDao", void 0);
SyncInApplicationChecker = __decorate([
    Injected()
], SyncInApplicationChecker);
export { SyncInApplicationChecker };
//# sourceMappingURL=SyncInApplicationChecker.js.map