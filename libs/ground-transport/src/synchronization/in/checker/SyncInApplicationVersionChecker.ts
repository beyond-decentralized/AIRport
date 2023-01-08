import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	IApplicationVersion,
	IApplicationVersionDao
} from '@airport/airspace/dist/app/bundle'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IApplicationInitializer, ITransactionalReceiver } from '@airport/terminal-map'
import { IApplication } from '@airport/airspace'

export interface IApplicationVersionCheckRecord {
	found?: boolean
	applicationName: string
	applicationVersion?: IApplicationVersion;
	applicationVersionNumber: number
}

export interface ISyncInApplicationVersionChecker {

	ensureApplicationVersions(
		inMessageApplicationVersions: IApplicationVersion[],
		inMessageApplications: IApplication[],
		context: IContext
	): Promise<boolean>;

}

@Injected()
export class SyncInApplicationVersionChecker
	implements ISyncInApplicationVersionChecker {

	@Inject()
	applicationVersionDao: IApplicationVersionDao

	@Inject()
	applicationInitializer: IApplicationInitializer

	async ensureApplicationVersions(
		// message: RepositorySynchronizationMessage,
		inMessageApplicationVersions: IApplicationVersion[],
		inMessageApplications: IApplication[],
		context: IContext
	): Promise<boolean> {
		try {
			let applicationCheckMap = await this.checkVersionsApplicationsDomains(
				inMessageApplicationVersions, inMessageApplications, context);

			for (let i = 0; i < inMessageApplicationVersions.length; i++) {
				const applicationVersion = inMessageApplicationVersions[i]
				inMessageApplicationVersions[i] = applicationCheckMap
					.get(applicationVersion.application.domain.name).get(applicationVersion.application.name)
					.applicationVersion
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async checkVersionsApplicationsDomains(
		inMessageApplicationVersions: IApplicationVersion[],
		inMessageApplications: IApplication[],
		context: IContext
	): Promise<Map<string, Map<string, IApplicationVersionCheckRecord>>> {
		const { allApplication_Names, domainNames, applicationVersionCheckMap } = this
			.getNames(inMessageApplicationVersions, inMessageApplications)

		const existingApplicationVersions = await this.applicationVersionDao.findByDomain_NamesAndApplication_Names(domainNames, allApplication_Names)

		let lastDomain_Name
		let lastApplication_Name
		for (let applicationVersion of existingApplicationVersions) {
			let domainName = applicationVersion.application.domain.name
			let applicationName = applicationVersion.application.name
			if (lastDomain_Name !== domainName
				&& lastApplication_Name !== applicationName) {
				let applicationVersionNumber = applicationVersion.integerVersion

				for (let [_, applicationCheck] of applicationVersionCheckMap.get(domainName)) {
					if (applicationCheck.applicationName === applicationName) {
						applicationCheck.found = true
						if (applicationCheck.applicationVersionNumber > applicationVersionNumber) {
							throw new Error(`Installed application ${applicationName} for domain ${domainName}
	is at a lower version ${applicationVersionNumber} than needed in message ${applicationCheck.applicationVersionNumber}.`)
						}
						applicationCheck.applicationVersion = applicationVersion
					}
				}
				lastDomain_Name = domainName
				lastApplication_Name = applicationName
			}
		}

		for (const [domainName, applicationChecks] of applicationVersionCheckMap) {
			for (let [_, applicationCheck] of applicationChecks) {
				if (!applicationCheck.found) {
					await this.applicationInitializer.installApplication(
						domainName, applicationCheck.applicationName)
				}
			}
		}

		return applicationVersionCheckMap
	}

	private getNames(
		inMessageApplicationVersions: IApplicationVersion[],
		inMessageApplications: IApplication[]
	): {
		allApplication_Names: string[],
		domainNames: string[],
		applicationVersionCheckMap: Map<string, Map<string, IApplicationVersionCheckRecord>>
	} {
		if (!inMessageApplicationVersions || !(inMessageApplicationVersions instanceof Array)) {
			throw new Error(`Did not find applicationVersions in RepositorySynchronizationMessage.`)
		}

		const applicationVersionCheckMap: Map<string, Map<string, IApplicationVersionCheckRecord>> = new Map()

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
					applicationVersionNumber: applicationVersion.integerVersion
				})
			}
		}

		const domainNames = []
		const allApplication_Names = []
		for (const [domainName, applicationChecksForDomainMap] of applicationVersionCheckMap) {
			domainNames.push(domainName)
			for (let [applicationName, _] of applicationChecksForDomainMap) {
				allApplication_Names.push(applicationName)
			}
		}

		return {
			allApplication_Names,
			domainNames,
			applicationVersionCheckMap
		}
	}

}
