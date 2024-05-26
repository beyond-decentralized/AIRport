import {
	IDdlApplicationVersionDao
} from '@airport/airspace/dist/app/bundle'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IApplicationInitializer } from '@airport/terminal-map'
import { Application_Name, IApplicationVersion, Domain_Name, IRepositoryBlockData } from '@airport/ground-control'

export interface IApplicationVersionCheckRecord {
	found?: boolean
	applicationName: string
	applicationVersion?: IApplicationVersion;
	applicationVersionNumber: number
}

export interface ISyncInApplicationVersionChecker {

	ensureApplicationVersions(
		data: IRepositoryBlockData,
		context: IContext
	): Promise<boolean>

	installAndCheckApplications(
		data: IRepositoryBlockData,
		context: IContext
	): Promise<boolean>

}

@Injected()
export class SyncInApplicationVersionChecker
	implements ISyncInApplicationVersionChecker {

	@Inject()
	ddlApplicationVersionDao: IDdlApplicationVersionDao

	@Inject()
	applicationInitializer: IApplicationInitializer

	async ensureApplicationVersions(
		data: IRepositoryBlockData,
		context: IContext
	): Promise<boolean> {
		const checkResult = await this.checkVersionsApplicationsDomains(
			data, context)

		if (checkResult.haveMissingApplicationVersions) {
			return false
		}

		this.setApplicationVersionApps(data)
		for (let i = 0; i < data.applicationVersions.length; i++) {
			const applicationVersion = data.applicationVersions[i]
			data.applicationVersions[i] = checkResult.applicationVersionCheckMap
				.get(applicationVersion.application.domain.name)
				.get(applicationVersion.application.name)
				.applicationVersion
		}


		return true
	}

	async installAndCheckApplications(
		data: IRepositoryBlockData,
		context: IContext
	): Promise<boolean> {
		const {
			allApplicationNames: allApplication_Names,
			domainNames, applicationVersionCheckMap
		} = this.getNames(data)

		await this.setApplicationVersions(
			domainNames,
			allApplication_Names,
			applicationVersionCheckMap,
			context
		)

		const domainWithNewApp_NameSet: Set<Domain_Name> = new Set()
		const newApplicationNameSet: Set<Application_Name> = new Set()
		for (const [domainName, applicationChecks] of applicationVersionCheckMap) {
			for (let [_, applicationCheck] of applicationChecks) {
				if (!applicationCheck.found) {
					domainWithNewApp_NameSet.add(domainName)
					newApplicationNameSet.add(applicationCheck.applicationName)
					await this.applicationInitializer.installApplication(
						domainName, applicationCheck.applicationName)
				}
			}
		}

		return await this.setApplicationVersions(
			Array.from(domainWithNewApp_NameSet),
			Array.from(newApplicationNameSet),
			applicationVersionCheckMap,
			context
		)
	}

	private async checkVersionsApplicationsDomains(
		data: IRepositoryBlockData,
		context: IContext
	): Promise<{
		applicationVersionCheckMap: Map<Domain_Name, Map<Application_Name, IApplicationVersionCheckRecord>>,
		haveMissingApplicationVersions: boolean
	}> {
		const {
			allApplicationNames: allApplication_Names,
			domainNames, applicationVersionCheckMap
		} = this.getNames(data)

		await this.setApplicationVersions(
			domainNames,
			allApplication_Names,
			applicationVersionCheckMap,
			context
		)

		let haveMissingApplicationVersions = false
		for (const [_, applicationChecks] of applicationVersionCheckMap) {
			for (let [_, applicationCheck] of applicationChecks) {
				if (!applicationCheck.found) {
					haveMissingApplicationVersions = true
				}
			}
		}

		return {
			applicationVersionCheckMap,
			haveMissingApplicationVersions
		}
	}

	private async setApplicationVersions(
		domainNames: Domain_Name[],
		allApplication_Names: Application_Name[],
		applicationVersionCheckMap: Map<Domain_Name, Map<Application_Name, IApplicationVersionCheckRecord>>,
		context: IContext
	): Promise<boolean> {
		const existingApplicationVersions = await this.ddlApplicationVersionDao
			.findByDomain_NamesAndApplication_Names(
				domainNames, allApplication_Names, context)

		let lastDomainName
		let lastApplicationName
		let haveMissingApplicationVersions = false
		for (let applicationVersion of existingApplicationVersions) {
			const domainName = applicationVersion.application.domain.name
			const applicationName = applicationVersion.application.name
			if (lastDomainName !== domainName && lastApplicationName !== applicationName) {
				const applicationVersionNumber = applicationVersion.integerVersion

				const applicationVersionCheckMapForDomain = applicationVersionCheckMap.get(domainName);
				for (let [_, applicationCheck] of applicationVersionCheckMapForDomain) {
					if (applicationCheck.applicationName === applicationName) {
						if (applicationCheck.applicationVersionNumber > applicationVersionNumber) {
							console.error(`Installed application ${applicationName} for domain ${domainName}
	is at a lower version ${applicationVersionNumber} than needed in message ${applicationCheck.applicationVersionNumber}.`)
							haveMissingApplicationVersions = true
						} else {
							applicationCheck.found = true
						}
						applicationCheck.applicationVersion = applicationVersion
					}
				}

				lastDomainName = domainName
				lastApplicationName = applicationName
			}
		}

		return !haveMissingApplicationVersions
	}

	private getNames(
		data: IRepositoryBlockData
	): {
		allApplicationNames: Application_Name[],
		domainNames: Domain_Name[],
		applicationVersionCheckMap: Map<Domain_Name, Map<Application_Name, IApplicationVersionCheckRecord>>
	} {
		const inMessageApplicationVersions = data.applicationVersions
		if (!inMessageApplicationVersions || !(inMessageApplicationVersions instanceof Array)) {
			throw new Error(`Did not find applicationVersions in IRepositoryBlockData.`)
		}

		const applicationVersionCheckMap: Map<Domain_Name, Map<Application_Name, IApplicationVersionCheckRecord>> = new Map()

		for (let applicationVersion of inMessageApplicationVersions) {
			if (!applicationVersion.integerVersion || typeof applicationVersion.integerVersion !== 'number') {
				throw new Error(`Invalid ApplicationVersion.integerVersion.`)
			}
			const application = data.applications[applicationVersion.application as any]
			if (typeof application !== 'object') {
				throw new Error(`Invalid ApplicationVersion.application`)
			}
			const domain = application.domain

			let applicationChecksForDomain = applicationVersionCheckMap.get(domain.name)
			if (!applicationChecksForDomain) {
				applicationChecksForDomain = new Map()
				applicationVersionCheckMap.set(domain.name, applicationChecksForDomain)
			}
			if (!applicationChecksForDomain.has(application.name)) {
				applicationChecksForDomain.set(application.name, {
					applicationName: application.name,
					applicationVersionNumber: applicationVersion.integerVersion,
					found: false
				})
			}
		}

		const domainNames = []
		const allApplicationNames = []
		for (const [domainName, applicationChecksForDomainMap] of applicationVersionCheckMap) {
			domainNames.push(domainName)
			for (let [applicationName, _] of applicationChecksForDomainMap) {
				allApplicationNames.push(applicationName)
			}
		}

		return {
			allApplicationNames: allApplicationNames,
			domainNames,
			applicationVersionCheckMap
		}
	}

	private setApplicationVersionApps(
		data: IRepositoryBlockData
	): void {
		for (let applicationVersion of data.applicationVersions) {
			const application = data.applications[applicationVersion.application as any]
			applicationVersion.application = application
		}
	}

}
