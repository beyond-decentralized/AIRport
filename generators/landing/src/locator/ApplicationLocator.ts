import {
	IDbApplicationUtils,
	JsonApplication,
	JsonApplicationVersion
} from '@airport/ground-control'
import {
	ITerminalStore
} from '@airport/terminal-map'
import { IApplicationVersion } from '@airport/airspace/dist/app/bundle'
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

	getCurrentJsonApplicationVersion(
		jsonApplication: JsonApplication
	): JsonApplicationVersion

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

	getCurrentJsonApplicationVersion(
		jsonApplication: JsonApplication
	): JsonApplicationVersion {
		return jsonApplication.versions[jsonApplication.versions.length - 1]
	}

}
