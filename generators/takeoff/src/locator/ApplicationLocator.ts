import {
	IApplicationVersion,
	IApplicationNameUtils,
	JsonApplication
} from '@airport/ground-control'
import {
	ITerminalStore
} from '@airport/terminal-map'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'

export interface IApplicationLocator {

	locateExistingApplicationVersionRecord(
		jsonApplication: JsonApplication,
		terminalStore: ITerminalStore
	): IApplicationVersion

	locateLatestApplicationVersionByApplication_Name(
		fullApplication_Name: string,
		terminalStore: ITerminalStore,
	): Promise<IApplicationVersion>

}

@Injected()
export class ApplicationLocator
	implements IApplicationLocator {

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	// private terminalStore: ITerminalStore

	locateExistingApplicationVersionRecord(
		jsonApplication: JsonApplication,
		terminalStore: ITerminalStore
	): IApplicationVersion {
		const applicationVersionsForDomain_Name = terminalStore
			.getLatestApplicationVersionMapByNames().get(jsonApplication.domain)
		if (!applicationVersionsForDomain_Name) {
			return null
		}
		const fullApplication_Name = this.applicationNameUtils.
			getApplication_FullNameFromDomainAndName(
				jsonApplication.domain,
				jsonApplication.name
			)
		const latestApplicationVersionForApplication = applicationVersionsForDomain_Name.get(fullApplication_Name)

		const jsonApplicationVersion = jsonApplication.versions[0]

		if (latestApplicationVersionForApplication
			&& latestApplicationVersionForApplication.integerVersion !== jsonApplicationVersion.integerVersion) {
			throw new Error(`Multiple versions of applications are not yet supported`)
		}

		return latestApplicationVersionForApplication
	}

	async locateLatestApplicationVersionByApplication_Name(
		fullApplication_Name: string,
		terminalStore: ITerminalStore,
	): Promise<IApplicationVersion> {
		return terminalStore.getLatestApplicationVersionMapByApplication_FullName()
			.get(fullApplication_Name)
	}

}
