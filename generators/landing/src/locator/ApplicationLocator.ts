import {
	getFullApplicationNameFromDomainAndName,
	JsonApplication
} from '@airport/ground-control'
import {
	ITerminalStore
} from '@airport/terminal-map'
import { IApplicationVersion } from '@airport/airspace'
import { Injected } from '@airport/air-control'

export interface IApplicationLocator {

	locateExistingApplicationVersionRecord(
		jsonApplication: JsonApplication,
		terminalStore: ITerminalStore
	): IApplicationVersion

	locateLatestApplicationVersionByApplicationName(
		fullApplicationName: string,
		terminalStore: ITerminalStore,
	): Promise<IApplicationVersion>

}

@Injected()
export class ApplicationLocator
	implements IApplicationLocator {

	// private terminalStore: ITerminalStore

	locateExistingApplicationVersionRecord(
		jsonApplication: JsonApplication,
		terminalStore: ITerminalStore
	): IApplicationVersion {
		const applicationVersionsForDomainName = terminalStore
			.getLatestApplicationVersionMapByNames().get(jsonApplication.domain)
		if (!applicationVersionsForDomainName) {
			return null
		}
		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			jsonApplication.domain,
			jsonApplication.name
		)
		const latestApplicationVersionForApplication = applicationVersionsForDomainName.get(fullApplicationName)

		const jsonApplicationVersion = jsonApplication.versions[0]

		if (latestApplicationVersionForApplication
			&& latestApplicationVersionForApplication.integerVersion !== jsonApplicationVersion.integerVersion) {
			throw new Error(`Multiple versions of applications are not yet supported`)
		}

		return latestApplicationVersionForApplication
	}

	async locateLatestApplicationVersionByApplicationName(
		fullApplicationName: string,
		terminalStore: ITerminalStore,
	): Promise<IApplicationVersion> {
		return terminalStore.getLatestApplicationVersionMapByFullApplicationName()
			.get(fullApplicationName)
	}

}
