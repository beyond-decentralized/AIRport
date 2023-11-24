import { Application_Name, IDomain, IApplication, SyncRepositoryData, IApplicationNameUtils } from '@airport/ground-control';
import {
    IDdlApplicationDao
} from "@airport/airspace/dist/app/bundle";
import {
    IContext,
    Inject,
    Injected
} from '@airport/direction-indicator'
import { ITerminalStore } from '@airport/terminal-map';
import { ISyncInApplicationVersionChecker } from './SyncInApplicationVersionChecker';

export interface IDomainCheckRecord {
    domain?: IDomain
    domainName: string
    found?: boolean
}

export interface IApplicationCheckRecord {
    found?: boolean
    applicationName: Application_Name
    application?: IApplication
}

export interface ISyncInApplicationChecker {

    ensureApplications(
        data: SyncRepositoryData,
        context: IContext
    ): Promise<{
        isValid: boolean,
        isInstalled: boolean
    }>

}

@Injected()
export class SyncInApplicationChecker
    implements ISyncInApplicationChecker {

    @Inject()
    applicationNameUtils: IApplicationNameUtils

    @Inject()
    ddlApplicationDao: IDdlApplicationDao

    @Inject()
    syncInApplicationVersionChecker: ISyncInApplicationVersionChecker

    @Inject()
    terminalStore: ITerminalStore

    async ensureApplications(
        data: SyncRepositoryData,
        context: IContext
    ): Promise<{
        isValid: boolean,
        isInstalled: boolean
    }> {
        try {
            let applicationCheckMap = await this.checkApplicationsAndDomains(data, context)
            for (const applicationsForDomainCheckMap of applicationCheckMap.values()) {
                for (const applicationCheck of applicationsForDomainCheckMap.values()) {
                    if (!applicationCheck.found) {
                        return {
                            isValid: true,
                            isInstalled: false
                        }
                    }
                }
            }

            const allAppsInstalled = await this.syncInApplicationVersionChecker
                .ensureApplicationVersions(data, context)
            if (!allAppsInstalled) {
                return {
                    isValid: true,
                    isInstalled: false
                }
            }

            for (let i = 0; i < data.applications.length; i++) {
                let application = data.applications[i]
                data.applications[i] = applicationCheckMap
                    .get(application.domain.name).get(application.name)
                    .application
            }
        } catch (e) {
            console.error(e)
            return {
                isValid: false,
                isInstalled: false
            }
        }

        return {
            isValid: true,
            isInstalled: true
        }
    }

    private async checkApplicationsAndDomains(
        data: SyncRepositoryData,
        context: IContext
    ): Promise<Map<string, Map<string, IApplicationCheckRecord>>> {
        const { allApplication_Names, domainNames, applicationCheckMap }
            = this.getNames(data)

        const applications = await this.ddlApplicationDao
            .findByDomain_NamesAndApplication_Names(
                domainNames, allApplication_Names, context)

        for (let application of applications) {
            let domainName = application.domain.name
            let applicationName = application.name

            for (let [_, applicationCheck] of applicationCheckMap.get(domainName)) {
                if (applicationCheck.applicationName === applicationName) {
                    applicationCheck.found = true
                    applicationCheck.application = application
                }
            }
        }

        return applicationCheckMap
    }

    private getNames(
        message: SyncRepositoryData
    ): {
        allApplication_Names: string[],
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
