import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { container, DI } from "@airport/di";
import { ApplicationStatus } from '@airport/ground-control';
import {
    DOMAIN_DAO,
    IDomain,
    IApplication,
    APPLICATION_DAO
} from "@airport/airspace";
import { SYNC_IN_APPLICATION_CHECKER } from "../../../tokens";

export interface IDomainCheckRecord {
    domain?: IDomain
    domainName: string
    found?: boolean
}

export interface IApplicationCheckRecord {
    found?: boolean
    applicationName: string
    application?: IApplication;
}

export interface ISyncInApplicationChecker {

    ensureApplications(
        message: RepositorySynchronizationMessage
    ): Promise<boolean>

}

export class SyncInApplicationChecker
    implements ISyncInApplicationChecker {

    async ensureApplications(
        message: RepositorySynchronizationMessage
    ): Promise<boolean> {
        try {
            let applicationCheckMap = await this.checkApplicationsAndDomains(message);

            for (let i = 0; i < message.applications.length; i++) {
                let application = message.applications[i]
                message.applications[i] = applicationCheckMap
                    .get(application.domain.name).get(application.name)
                    .application
            }
        } catch (e) {
            console.error(e)
            return false
        }

        return true
    }

    private async checkApplicationsAndDomains(
        message: RepositorySynchronizationMessage
    ): Promise<Map<string, Map<string, IApplicationCheckRecord>>> {
        const { allApplicationNames, domainCheckMap, domainNames, applicationCheckMap }
            = this.getNames(message)

        const applicationDao = await container(this).get(APPLICATION_DAO)
        const applications = await applicationDao.findByDomainNamesAndApplicationNames(domainNames, allApplicationNames)

        for (let application of applications) {
            let domainName = application.domain.name
            let applicationName = application.name

            for (let [_, applicationCheck] of applicationCheckMap.get(domainName)) {
                if (applicationCheck.applicationName === applicationName) {
                    let domainCheck = domainCheckMap.get(domainName)
                    domainCheck.found = true
                    domainCheck.domain = application.domain
                    applicationCheck.found = true
                    applicationCheck.application = application
                }
            }
        }

        let domainsToCreate: IDomain[] = []
        for (let [name, domainCheck] of domainCheckMap) {
            if (domainCheck.found) {
                continue
            }
            let domain: IDomain = {
                id: null,
                name
            }
            domainCheck.domain = domain
            domainsToCreate.push(domain)
        }
        if (domainsToCreate.length) {
            const domainDao = await container(this).get(DOMAIN_DAO)
            await domainDao.insert(domainsToCreate)
        }

        let applicationsToCreate: IApplication[] = []
        for (let [domainName, applicationChecksByName] of applicationCheckMap) {
            for (let [name, applicationCheck] of applicationChecksByName) {
                if (applicationCheck.found) {
                    continue
                }
                let domain = domainCheckMap.get(domainName).domain
                let application: IApplication = {
                    domain,
                    index: null,
                    packageName: 'bogus',
                    name,
                    scope: 'private',
                    status: ApplicationStatus.STUB,
                    signature: 'localhost'
                }
                applicationCheck.application = application
                applicationsToCreate.push(application)
            }
        }

        if (applicationsToCreate.length) {
            await applicationDao.insert(applicationsToCreate)
        }

        return applicationCheckMap
    }

    private getNames(
        message: RepositorySynchronizationMessage
    ): {
        allApplicationNames: string[],
        domainCheckMap: Map<string, IDomainCheckRecord>,
        domainNames: string[],
        applicationCheckMap: Map<string, Map<string, IApplicationCheckRecord>>
    } {
        if (!message.applications || !(message.applications instanceof Array)) {
            throw new Error(`Did not find applications in RepositorySynchronizationMessage.`)
        }

        const domainCheckMap: Map<string, IDomainCheckRecord> = new Map()
        const applicationCheckMap: Map<string, Map<string, IApplicationCheckRecord>> = new Map()

        for (let application of message.applications) {
            if (typeof application !== 'object') {
                throw new Error(`Invalid ApplicationVersion.application`)
            }
            if (!application.name || typeof application.name !== 'string') {
                throw new Error(`Invalid ApplicationVersion.Application.name`)
            }
            const domain = application.domain
            if (typeof domain !== 'object') {
                throw new Error(`Invalid ApplicationVersion.Application.Domain`)
            }
            if (!domain.name || typeof domain.name !== 'string') {
                throw new Error(`Invalid ApplicationVersion.Application.Domain.name`)
            }
            let applicationChecksForDomain = applicationCheckMap.get(domain.name)
            if (!applicationChecksForDomain) {
                applicationChecksForDomain = new Map()
                applicationCheckMap.set(domain.name, applicationChecksForDomain)
            }
            if (!applicationChecksForDomain.has(application.name)) {
                applicationChecksForDomain.set(application.name, {
                    applicationName: application.name,
                })
            }
            let domainCheck = domainCheckMap.get(domain.name)
            if (!domainCheck) {
                domainCheckMap.set(domain.name, {
                    domainName: domain.name
                })
            }
        }

        const domainNames = []
        const allApplicationNames = []
        for (const [domainName, applicationChecksForDomainMap] of applicationCheckMap) {
            domainNames.push(domainName)
            for (let [applicationName, _] of applicationChecksForDomainMap) {
                allApplicationNames.push(applicationName)
            }
        }

        return {
            allApplicationNames,
            domainCheckMap,
            domainNames,
            applicationCheckMap
        }
    }

}
DI.set(SYNC_IN_APPLICATION_CHECKER, SyncInApplicationChecker)
