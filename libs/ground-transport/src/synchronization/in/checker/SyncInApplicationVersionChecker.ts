import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	IApplicationVersion,
	IApplicationVersionDao
} from '@airport/airspace'
import { Inject, Injected } from '@airport/air-control';

export interface IApplicationVersionCheckRecord {
	found?: boolean
	applicationName: string
	applicationVersion?: IApplicationVersion;
	applicationVersionNumber: number
}

export interface ISyncInApplicationVersionChecker {

	ensureApplicationVersions(
		message: RepositorySynchronizationMessage
	): Promise<boolean>;

}

@Injected()
export class SyncInApplicationVersionChecker
	implements ISyncInApplicationVersionChecker {

	@Inject()
	applicationVersionDao: IApplicationVersionDao

	async ensureApplicationVersions(
		message: RepositorySynchronizationMessage
	): Promise<boolean> {
		try {
			let applicationCheckMap = await this.checkVersionsApplicationsDomains(message);

			for (let i = 0; i < message.applicationVersions.length; i++) {
				const applicationVersion = message.applicationVersions[i]
				message.applicationVersions[i] = applicationCheckMap
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
		message: RepositorySynchronizationMessage
	): Promise<Map<string, Map<string, IApplicationVersionCheckRecord>>> {
		const { allApplicationNames, domainNames, applicationVersionCheckMap } = this.getNames(message)

		const applicationVersions = await this.applicationVersionDao.findByDomainNamesAndApplicationNames(domainNames, allApplicationNames)

		let lastDomainName
		let lastApplicationName
		for (let applicationVersion of applicationVersions) {
			let domainName = applicationVersion.application.domain.name
			let applicationName = applicationVersion.application.name
			if (lastDomainName !== domainName
				&& lastApplicationName !== applicationName) {
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
				lastDomainName = domainName
				lastApplicationName = applicationName
			}
		}

		for (const [domainName, applicationChecks] of applicationVersionCheckMap) {
			for (let [_, applicationCheck] of applicationChecks) {
				if (!applicationCheck.found) {
					// TODO: download and install the application
					throw new Error(
						`Application ${applicationCheck.applicationName} for domain ${domainName} is not installed.`)
				}
			}
		}

		return applicationVersionCheckMap
	}

	private getNames(
		message: RepositorySynchronizationMessage
	): {
		allApplicationNames: string[],
		domainNames: string[],
		applicationVersionCheckMap: Map<string, Map<string, IApplicationVersionCheckRecord>>
	} {
		if (!message.applicationVersions || !(message.applicationVersions instanceof Array)) {
			throw new Error(`Did not find applicationVersions in RepositorySynchronizationMessage.`)
		}

		const applicationVersionCheckMap: Map<string, Map<string, IApplicationVersionCheckRecord>> = new Map()

		for (let applicationVersion of message.applicationVersions) {
			if (!applicationVersion.integerVersion || typeof applicationVersion.integerVersion !== 'number') {
				throw new Error(`Invalid ApplicationVersion.integerVersion.`)
			}
			const application = message.applications[applicationVersion.application as any]
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
		const allApplicationNames = []
		for (const [domainName, applicationChecksForDomainMap] of applicationVersionCheckMap) {
			domainNames.push(domainName)
			for (let [applicationName, _] of applicationChecksForDomainMap) {
				allApplicationNames.push(applicationName)
			}
		}

		return {
			allApplicationNames,
			domainNames,
			applicationVersionCheckMap
		}
	}

}
