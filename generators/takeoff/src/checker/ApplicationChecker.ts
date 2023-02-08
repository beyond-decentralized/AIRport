import {
	DbDomain_Name,
	JsonApplication,
	JsonApplication_Name,
	DbApplication_Name,
	DbApplication_FullName,
	IDbApplicationUtils,
	IDatastructureUtils,
	DbApplication,
} from '@airport/ground-control'
import {
	IDbApplicationDao
} from '@airport/airspace/dist/app/bundle'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'

export interface CoreDomainAndDbApplication_Names {

	domain: string;
	application: string;

}

export interface ExistingApplicationInfo {
	coreDomainAndDbApplication_NamesByDbApplication_Name: Map<DbApplication_Name, CoreDomainAndDbApplication_Names>
	existingApplicationMapByName: Map<DbApplication_Name, DbApplication>
}

export interface ApplicationReferenceCheckResults {

	applicationsWithValidDependencies: JsonApplication[]
	applicationsInNeedOfAdditionalDependencies: JsonApplication[]
	neededDependencies: JsonApplication[]

}

export interface IApplicationChecker {

	check(
		jsonApplication: JsonApplication
	): Promise<void>

	checkDependencies(
		jsonApplications: JsonApplication[],
		context: IContext
	): Promise<ApplicationReferenceCheckResults>

}

@Injected()
export class ApplicationChecker
	implements IApplicationChecker {

	@Inject()
	dbApplicationDao: IDbApplicationDao

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	async check(
		jsonApplication: JsonApplication
	): Promise<void> {
		if (!jsonApplication) {
			throw new Error(`Json Application not provided`)
		}
		if (!(jsonApplication.versions instanceof Array)) {
			throw new Error('application.versions is not an array')
		}
		if (jsonApplication.versions.length !== 1) {
			// FIXME: add support for application versioning
			throw new Error('Currently only 1 version of application is supported')
		}

		await this.checkDomain(jsonApplication)
	}

	async checkDomain(
		jsonApplication: JsonApplication
	): Promise<void> {
		// TODO: implement domain checking
	}

	async checkDependencies(
		jsonApplications: JsonApplication[],
		context: IContext
	): Promise<ApplicationReferenceCheckResults> {
		const allReferencedApplicationMap: Map<DbDomain_Name, Map<JsonApplication_Name, JsonApplication>> = new Map()

		const referencedApplicationMapByApplication:
			Map<DbDomain_Name, Map<DbApplication_Name, Map<DbDomain_Name, Map<JsonApplication_Name, JsonApplication>>>>
			= new Map()

		for (const jsonApplication of jsonApplications) {
			const lastJsonApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1]
			const referencedApplicationMapForApplication = this.datastructureUtils.ensureChildJsMap(
				this.datastructureUtils.ensureChildJsMap(
					referencedApplicationMapByApplication, jsonApplication.domain
				), jsonApplication.name)
			for (const jsonReferencedApplication of lastJsonApplicationVersion.referencedApplications) {
				this.datastructureUtils.ensureChildJsMap(
					allReferencedApplicationMap, jsonReferencedApplication.domain
				).set(jsonReferencedApplication.name, jsonReferencedApplication)
				this.datastructureUtils.ensureChildJsMap(
					referencedApplicationMapForApplication, jsonReferencedApplication.domain
				).set(jsonReferencedApplication.name, jsonReferencedApplication)
			}
		}

		this.pruneInGroupReferences(jsonApplications, allReferencedApplicationMap, referencedApplicationMapByApplication)
		await this.pruneReferencesToExistingApplications(jsonApplications, allReferencedApplicationMap,
			referencedApplicationMapByApplication, context)


		const applicationsWithValidDependencies: JsonApplication[] = []
		const applicationsInNeedOfAdditionalDependencies: JsonApplication[] = []
		const neededDependencies: JsonApplication[] = []

		for (const dependenciesForDomain of allReferencedApplicationMap.values()) {
			for (const dependency of dependenciesForDomain.values()) {
				neededDependencies.push(dependency)
			}
		}

		for (const jsonApplication of jsonApplications) {
			const referencedApplicationMapForApplication
				= referencedApplicationMapByApplication.get(jsonApplication.domain).get(jsonApplication.name)

			if (this.hasReferences(referencedApplicationMapForApplication)) {
				applicationsInNeedOfAdditionalDependencies.push(jsonApplication)
			} else {
				applicationsWithValidDependencies.push(jsonApplication)
			}
		}

		return {
			applicationsWithValidDependencies,
			applicationsInNeedOfAdditionalDependencies,
			neededDependencies
		}
	}

	private pruneInGroupReferences(
		jsonApplications: JsonApplication[],
		allReferencedApplicationMap: Map<DbDomain_Name, Map<JsonApplication_Name, JsonApplication>>,
		referencedApplicationMapByApplication:
			Map<DbDomain_Name, Map<JsonApplication_Name, Map<DbDomain_Name, Map<JsonApplication_Name, JsonApplication>>>>
	): void {
		for (const jsonApplication of jsonApplications) {
			// Remove every in-group reference for this application
			for (const [_domainName, referenceMapForApplicationsOfDomain] of referencedApplicationMapByApplication) {
				for (const [_applicationName, applicationsReferencedByAGivenApplication] of referenceMapForApplicationsOfDomain) {
					const applicationReferencesForDomain = applicationsReferencedByAGivenApplication.get(jsonApplication.domain)
					if (applicationReferencesForDomain) {
						applicationReferencesForDomain.delete(jsonApplication.name)
					}
				}
			}
			const allApplicationReferencesForDomain = allReferencedApplicationMap.get(jsonApplication.domain)
			if (allApplicationReferencesForDomain) {
				allApplicationReferencesForDomain.delete(jsonApplication.name)
			}
		}
	}

	private async pruneReferencesToExistingApplications(
		jsonApplications: JsonApplication[],
		allReferencedApplicationMap: Map<DbDomain_Name, Map<JsonApplication_Name, JsonApplication>>,
		referencedApplicationMapByApplication:
			Map<DbDomain_Name, Map<JsonApplication_Name, Map<DbDomain_Name, Map<JsonApplication_Name, JsonApplication>>>>,
		context: IContext
	): Promise<void> {
		const existingApplicationInfo = await this.findExistingApplications(
			allReferencedApplicationMap, context)

		for (const applicationName of existingApplicationInfo.existingApplicationMapByName.keys()) {
			const coreDomainAndDbApplication_Names
				= existingApplicationInfo.coreDomainAndDbApplication_NamesByDbApplication_Name.get(applicationName)

			// Remove every reference for this existing application
			for (const referenceMapForApplicationsOfDomain of referencedApplicationMapByApplication.values()) {
				for (const applicationsReferencedByAGivenApplication of referenceMapForApplicationsOfDomain.values()) {
					const applicationReferencesForDomain
						= applicationsReferencedByAGivenApplication.get(coreDomainAndDbApplication_Names.domain)
					if (applicationReferencesForDomain) {
						applicationReferencesForDomain.delete(coreDomainAndDbApplication_Names.application)
					}
				}
			}
			const allApplicationReferencesForDomain
				= allReferencedApplicationMap.get(coreDomainAndDbApplication_Names.domain)
			if (allApplicationReferencesForDomain) {
				allApplicationReferencesForDomain.delete(coreDomainAndDbApplication_Names.application)
			}
		}

	}

	private async findExistingApplications(
		allReferencedApplicationMap: Map<DbDomain_Name, Map<JsonApplication_Name, JsonApplication>>,
		context: IContext
	): Promise<ExistingApplicationInfo> {
		const fullDbApplication_Names: DbApplication_FullName[] = []
		const coreDomainAndDbApplication_NamesByDbApplication_Name: Map<DbApplication_FullName, CoreDomainAndDbApplication_Names> = new Map()

		for (const [domainName, allReferencedApplicationsForDomain] of allReferencedApplicationMap) {
			for (const [coreDbApplication_Name, referencedApplication] of allReferencedApplicationsForDomain) {
				const fullDbApplication_Name = this.dbApplicationUtils.
					getDbApplication_FullName(referencedApplication)
				fullDbApplication_Names.push(fullDbApplication_Name)
				coreDomainAndDbApplication_NamesByDbApplication_Name.set(fullDbApplication_Name, {
					domain: domainName,
					application: coreDbApplication_Name
				})
			}
		}

		let existingApplicationMapByName: Map<DbApplication_FullName, DbApplication>
		if (!fullDbApplication_Names.length) {
			existingApplicationMapByName = new Map()
		} else {
			existingApplicationMapByName = await this.dbApplicationDao
				.findMapByFullNames(fullDbApplication_Names, context)
		}

		return {
			coreDomainAndDbApplication_NamesByDbApplication_Name,
			existingApplicationMapByName
		}
	}

	private hasReferences(
		referencedApplicationMap: Map<DbDomain_Name, Map<JsonApplication_Name, JsonApplication>>
	): boolean {
		for (const referencesForDomain of referencedApplicationMap.values()) {
			for (const _ of referencesForDomain) {
				return true
			}
		}

		return false
	}

}
