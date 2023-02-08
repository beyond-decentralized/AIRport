import {
	IDbApplicationVersionDao
} from '@airport/airspace/dist/app/bundle'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IApplicationInitializer } from '@airport/terminal-map'
import { DbApplication_Name, DbApplication, DbApplicationVersion, DbDomain_Name } from '@airport/ground-control'

export interface IApplicationVersionCheckRecord {
	found?: boolean
	applicationName: string
	applicationVersion?: DbApplicationVersion;
	applicationVersionNumber: number
}

export interface ISyncInApplicationVersionChecker {

	ensureApplicationVersions(
		inMessageApplicationVersions: DbApplicationVersion[],
		inMessageApplications: DbApplication[],
		context: IContext
	): Promise<Map<DbDomain_Name, Map<DbApplication_Name, IApplicationVersionCheckRecord>>>;

}

@Injected()
export class SyncInApplicationVersionChecker
	implements ISyncInApplicationVersionChecker {

	@Inject()
	dbApplicationVersionDao: IDbApplicationVersionDao

	@Inject()
	applicationInitializer: IApplicationInitializer

	async ensureApplicationVersions(
		// message: SyncRepositoryData,
		inMessageApplicationVersions: DbApplicationVersion[],
		inMessageApplications: DbApplication[],
		context: IContext
	): Promise<Map<DbDomain_Name, Map<DbApplication_Name, IApplicationVersionCheckRecord>>> {
		let applicationCheckMap
		try {
			applicationCheckMap = await this.checkVersionsApplicationsDomains(
				inMessageApplicationVersions, inMessageApplications, context);

			for (let i = 0; i < inMessageApplicationVersions.length; i++) {
				const applicationVersion = inMessageApplicationVersions[i]
				inMessageApplicationVersions[i] = applicationCheckMap
					.get(applicationVersion.application.domain.name).get(applicationVersion.application.name)
					.applicationVersion
			}
		} catch (e) {
			console.error(e)
			return null
		}

		return applicationCheckMap
	}

	private async checkVersionsApplicationsDomains(
		inMessageApplicationVersions: DbApplicationVersion[],
		inMessageApplications: DbApplication[],
		context: IContext
	): Promise<Map<DbDomain_Name, Map<DbApplication_Name, IApplicationVersionCheckRecord>>> {
		const { allApplicationNames: allDbApplication_Names, domainNames, applicationVersionCheckMap } = this
			.getNames(inMessageApplicationVersions, inMessageApplications)

		await this.setApplicationVersions(
			domainNames,
			allDbApplication_Names,
			applicationVersionCheckMap,
			context
		)

		const domainWithNewApp_NameSet: Set<DbDomain_Name> = new Set()
		const newApplicationNameSet: Set<DbApplication_Name> = new Set()
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

		await this.setApplicationVersions(
			Array.from(domainWithNewApp_NameSet),
			Array.from(newApplicationNameSet),
			applicationVersionCheckMap,
			context
		)

		return applicationVersionCheckMap
	}

	async setApplicationVersions(
		domainNames: DbDomain_Name[],
		allDbApplication_Names: DbApplication_Name[],
		applicationVersionCheckMap: Map<DbDomain_Name, Map<DbApplication_Name, IApplicationVersionCheckRecord>>,
		context: IContext
	): Promise<void> {
		const existingApplicationVersions = await this.dbApplicationVersionDao
			.findByDomain_NamesAndDbApplication_Names(
				domainNames, allDbApplication_Names, context)

		let lastDomainName
		let lastApplicationName
		for (let applicationVersion of existingApplicationVersions) {
			const domainName = applicationVersion.application.domain.name
			const applicationName = applicationVersion.application.name
			if (lastDomainName !== domainName && lastApplicationName !== applicationName) {
				const applicationVersionNumber = applicationVersion.integerVersion

				const applicationVersionCheckMapForDomain = applicationVersionCheckMap.get(domainName);
				for (let [_, applicationCheck] of applicationVersionCheckMapForDomain) {
					if (applicationCheck.applicationName === applicationName) {
						applicationCheck.found = true
						if (applicationCheck.applicationVersionNumber > applicationVersionNumber) {
							throw new Error(`Installed application ${applicationName} for domain ${domainName}
	is at a lower version ${applicationVersionNumber} than needed in message ${applicationCheck.applicationVersionNumber}.`)
						}
						applicationCheck.applicationVersion = applicationVersion
					}
				}

				lastDomainName = domainName
				lastApplicationName = applicationName
			}
		}
	}

	private getNames(
		inMessageApplicationVersions: DbApplicationVersion[],
		inMessageApplications: DbApplication[]
	): {
		allApplicationNames: DbApplication_Name[],
		domainNames: DbDomain_Name[],
		applicationVersionCheckMap: Map<DbDomain_Name, Map<DbApplication_Name, IApplicationVersionCheckRecord>>
	} {
		if (!inMessageApplicationVersions || !(inMessageApplicationVersions instanceof Array)) {
			throw new Error(`Did not find applicationVersions in SyncRepositoryData.`)
		}

		const applicationVersionCheckMap: Map<DbDomain_Name, Map<DbApplication_Name, IApplicationVersionCheckRecord>> = new Map()

		for (let applicationVersion of inMessageApplicationVersions) {
			if (!applicationVersion.integerVersion || typeof applicationVersion.integerVersion !== 'number') {
				throw new Error(`Invalid ApplicationVersion.integerVersion.`)
			}
			const application = inMessageApplications[applicationVersion.application as any]
			if (typeof application !== 'object') {
				throw new Error(`Invalid ApplicationVersion.application`)
			}
			applicationVersion.application = application
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

}
