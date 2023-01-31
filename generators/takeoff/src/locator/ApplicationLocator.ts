import {
	DbApplicationVersion,
	DbApplicationUtils,
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
	): DbApplicationVersion

	locateLatestApplicationVersionByDbApplication_Name(
		fullDbApplication_Name: string,
		terminalStore: ITerminalStore,
	): Promise<DbApplicationVersion>

}

@Injected()
export class ApplicationLocator
	implements IApplicationLocator {

	@Inject()
	dbApplicationUtils: DbApplicationUtils

	// private terminalStore: ITerminalStore

	locateExistingApplicationVersionRecord(
		jsonApplication: JsonApplication,
		terminalStore: ITerminalStore
	): DbApplicationVersion {
		const applicationVersionsForDomain_Name = terminalStore
			.getLatestApplicationVersionMapByNames().get(jsonApplication.domain)
		if (!applicationVersionsForDomain_Name) {
			return null
		}
		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				jsonApplication.domain,
				jsonApplication.name
			)
		const latestApplicationVersionForApplication = applicationVersionsForDomain_Name.get(fullDbApplication_Name)

		const jsonApplicationVersion = jsonApplication.versions[0]

		if (latestApplicationVersionForApplication
			&& latestApplicationVersionForApplication.integerVersion !== jsonApplicationVersion.integerVersion) {
			throw new Error(`Multiple versions of applications are not yet supported`)
		}

		return latestApplicationVersionForApplication
	}

	async locateLatestApplicationVersionByDbApplication_Name(
		fullDbApplication_Name: string,
		terminalStore: ITerminalStore,
	): Promise<DbApplicationVersion> {
		return terminalStore.getLatestApplicationVersionMapByDbApplication_FullName()
			.get(fullDbApplication_Name)
	}

}
