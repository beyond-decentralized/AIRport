import { RepositorySynchronizationData } from "@airport/arrivals-n-departures";
import { Application_Name, ApplicationStatus, DbDomain, DbApplication } from '@airport/ground-control';
import {
    IDomainDao,
    IApplicationDao
} from "@airport/airspace/dist/app/bundle";
import {
    IContext,
    Inject,
    Injected
} from '@airport/direction-indicator'

export interface IDomainCheckRecord {
    domain?: DbDomain
    domainName: string
    found?: boolean
}

export interface IApplicationCheckRecord {
    found?: boolean
    applicationName: Application_Name
    application?: DbApplication;
}

export interface ISyncInApplicationChecker {

    ensureApplications(
        message: RepositorySynchronizationData,
        context: IContext
    ): Promise<boolean>

}

@Injected()
export class SyncInApplicationChecker
    implements ISyncInApplicationChecker {

    @Inject()
    applicationDao: IApplicationDao

    @Inject()
    domainDao: IDomainDao

    async ensureApplications(
        message: RepositorySynchronizationData,
        context: IContext
    ): Promise<boolean> {
        try {
            let applicationCheckMap = await this.checkApplicationsAndDomains(message, context);

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
        message: RepositorySynchronizationData,
        context: IContext
    ): Promise<Map<string, Map<string, IApplicationCheckRecord>>> {
        const { allApplication_Names, domainCheckMap, domainNames, applicationCheckMap }
            = this.getNames(message)

        const applications = await this.applicationDao
            .findByDomain_NamesAndApplication_Names(domainNames, allApplication_Names)

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

        let domainsToCreate: DbDomain[] = []
        for (let [name, domainCheck] of domainCheckMap) {
            if (domainCheck.found) {
                continue
            }
            let domain: DbDomain = {
                _localId: null,
                name
            }
            domainCheck.domain = domain
            domainsToCreate.push(domain)
        }
        if (domainsToCreate.length) {
            await this.domainDao.insert(domainsToCreate)
        }

        let applicationsToCreate: DbApplication[] = []
        for (let [domainName, applicationChecksByName] of applicationCheckMap) {
            for (let [name, applicationCheck] of applicationChecksByName) {
                if (applicationCheck.found) {
                    continue
                }
                let domain = domainCheckMap.get(domainName).domain
                let application: DbApplication = {
                    domain,
                    index: null,
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
            await this.applicationDao.insert(applicationsToCreate, context)
        }

        return applicationCheckMap
    }

    private getNames(
        message: RepositorySynchronizationData
    ): {
        allApplication_Names: string[],
        domainCheckMap: Map<string, IDomainCheckRecord>,
        domainNames: string[],
        applicationCheckMap: Map<string, Map<string, IApplicationCheckRecord>>
    } {
        if (!message.applications || !(message.applications instanceof Array)) {
            throw new Error(`Did not find applications in RepositorySynchronizationData.`)
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
        const allApplication_Names = []
        for (const [domainName, applicationChecksForDomainMap] of applicationCheckMap) {
            domainNames.push(domainName)
            for (let [applicationName, _] of applicationChecksForDomainMap) {
                allApplication_Names.push(applicationName)
            }
        }

        return {
            allApplication_Names,
            domainCheckMap,
            domainNames,
            applicationCheckMap
        }
    }

}
