import { DbApplication_Name, ApplicationStatus, DbDomain, DbApplication, SyncRepositoryData, IDbApplicationUtils } from '@airport/ground-control';
import {
    IDbDomainDao,
    IDbApplicationDao
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
    applicationName: DbApplication_Name
    application?: DbApplication
}

export interface ISyncInApplicationChecker {

    ensureApplications(
        data: SyncRepositoryData,
        context: IContext
    ): Promise<boolean>

}

@Injected()
export class SyncInApplicationChecker
    implements ISyncInApplicationChecker {

    @Inject()
    dbApplicationDao: IDbApplicationDao

    @Inject()
    dbApplicationUtils: IDbApplicationUtils

    @Inject()
    dbDomainDao: IDbDomainDao

    async ensureApplications(
        data: SyncRepositoryData,
        context: IContext
    ): Promise<boolean> {
        try {
            let applicationCheckMap = await this.checkApplicationsAndDomains(data, context);

            for (let i = 0; i < data.applications.length; i++) {
                let application = data.applications[i]
                data.applications[i] = applicationCheckMap
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
        data: SyncRepositoryData,
        context: IContext
    ): Promise<Map<string, Map<string, IApplicationCheckRecord>>> {
        const { allDbApplication_Names, domainCheckMap, domainNames, applicationCheckMap }
            = this.getNames(data)

        const applications = await this.dbApplicationDao
            .findByDomain_NamesAndDbApplication_Names(
                domainNames, allDbApplication_Names, context)

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
            await this.dbDomainDao.insert(domainsToCreate, context)
        }

        let applicationsToCreate: DbApplication[] = []
        for (let [domainName, applicationChecksByName] of applicationCheckMap) {
            for (let [name, applicationCheck] of applicationChecksByName) {
                if (applicationCheck.found) {
                    continue
                }
                let domain = domainCheckMap.get(domainName).domain
                let application: DbApplication = {
                    currentVersion: null,
                    domain,
                    fullName: this.dbApplicationUtils.getDbApplication_FullNameFromDomainAndName(
                        domainName, name
                    ),
                    index: null,
                    name,
                    scope: 'private',
                    status: ApplicationStatus.STUB,
                    publicSigningKey: 'localhost',
                    versions: []
                }
                applicationCheck.application = application
                applicationsToCreate.push(application)
            }
        }

        if (applicationsToCreate.length) {
            await this.dbApplicationDao.insert(applicationsToCreate, context)
        }

        return applicationCheckMap
    }

    private getNames(
        message: SyncRepositoryData
    ): {
        allDbApplication_Names: string[],
        domainCheckMap: Map<string, IDomainCheckRecord>,
        domainNames: string[],
        applicationCheckMap: Map<string, Map<string, IApplicationCheckRecord>>
    } {
        if (!message.applications || !(message.applications instanceof Array)) {
            throw new Error(`Did not find applications in SyncRepositoryData.`)
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
                    applicationName: application.name
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
        const allDbApplication_Names = []
        for (const [domainName, applicationChecksForDomainMap] of applicationCheckMap) {
            domainNames.push(domainName)
            for (let [applicationName, _] of applicationChecksForDomainMap) {
                allDbApplication_Names.push(applicationName)
            }
        }

        return {
            allDbApplication_Names,
            domainCheckMap,
            domainNames,
            applicationCheckMap
        }
    }

}
