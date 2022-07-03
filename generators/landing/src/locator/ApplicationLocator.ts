import {
	IDbApplicationUtils,
	JsonApplication
} from '@airport/ground-control'
import {
	ITerminalStore
} from '@airport/terminal-map'
import { IApplicationVersion } from '@airport/airspace'
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
	dbApplicationUtils: IDbApplicationUtils

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
		const fullApplication_Name = this.dbApplicationUtils.
			getFullApplication_NameFromDomainAndName(
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
		return terminalStore.getLatestApplicationVersionMapByFullApplication_Name()
			.get(fullApplication_Name)
	}

}
