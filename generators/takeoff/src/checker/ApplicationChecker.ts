import {
	Domain_Name,
	JsonApplication,
	JsonApplication_Name,
	Application_Name,
	Application_FullName,
	IApplicationNameUtils,
	IDatastructureUtils,
	IApplication,
} from '@airport/ground-control'
import {
	IDdlApplicationDao
} from '@airport/airspace/dist/app/bundle'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { ITransactionManager } from '@airport/terminal-map';

export interface CoreDomainAndApplication_Names {

	domain: string;
	application: string;

}

export interface ExistingApplicationInfo {
	coreDomainAndApplication_NamesByApplication_Name: Map<Application_Name, CoreDomainAndApplication_Names>
	existingApplicationMapByName: Map<Application_Name, IApplication>
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
	ddlApplicationDao: IDdlApplicationDao

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	transactionManager: ITransactionManager

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
		const allReferencedApplicationMap: Map<Domain_Name, Map<JsonApplication_Name, JsonApplication>> = new Map()

		const referencedApplicationMapByApplication:
			Map<Domain_Name, Map<Application_Name, Map<Domain_Name, Map<JsonApplication_Name, JsonApplication>>>>
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
		allReferencedApplicationMap: Map<Domain_Name, Map<JsonApplication_Name, JsonApplication>>,
		referencedApplicationMapByApplication:
			Map<Domain_Name, Map<JsonApplication_Name, Map<Domain_Name, Map<JsonApplication_Name, JsonApplication>>>>
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
		allReferencedApplicationMap: Map<Domain_Name, Map<JsonApplication_Name, JsonApplication>>,
		referencedApplicationMapByApplication:
			Map<Domain_Name, Map<JsonApplication_Name, Map<Domain_Name, Map<JsonApplication_Name, JsonApplication>>>>,
		context: IContext
	): Promise<void> {
		const existingApplicationInfo = await this.findExistingApplications(
			allReferencedApplicationMap, context)

		for (const applicationName of existingApplicationInfo.existingApplicationMapByName.keys()) {
			const coreDomainAndApplication_Names
				= existingApplicationInfo.coreDomainAndApplication_NamesByApplication_Name.get(applicationName)

			// Remove every reference for this existing application
			for (const referenceMapForApplicationsOfDomain of referencedApplicationMapByApplication.values()) {
				for (const applicationsReferencedByAGivenApplication of referenceMapForApplicationsOfDomain.values()) {
					const applicationReferencesForDomain
						= applicationsReferencedByAGivenApplication.get(coreDomainAndApplication_Names.domain)
					if (applicationReferencesForDomain) {
						applicationReferencesForDomain.delete(coreDomainAndApplication_Names.application)
					}
				}
			}
			const allApplicationReferencesForDomain
				= allReferencedApplicationMap.get(coreDomainAndApplication_Names.domain)
			if (allApplicationReferencesForDomain) {
				allApplicationReferencesForDomain.delete(coreDomainAndApplication_Names.application)
			}
		}

	}

	private async findExistingApplications(
		allReferencedApplicationMap: Map<Domain_Name, Map<JsonApplication_Name, JsonApplication>>,
		context: IContext
	): Promise<ExistingApplicationInfo> {
		const fullApplication_Names: Application_FullName[] = []
		const coreDomainAndApplication_NamesByApplication_Name: Map<Application_FullName, CoreDomainAndApplication_Names> = new Map()

		for (const [domainName, allReferencedApplicationsForDomain] of allReferencedApplicationMap) {
			for (const [coreApplication_Name, referencedApplication] of allReferencedApplicationsForDomain) {
				const fullApplication_Name = this.applicationNameUtils.
					getApplication_FullName(referencedApplication)
				fullApplication_Names.push(fullApplication_Name)
				coreDomainAndApplication_NamesByApplication_Name.set(fullApplication_Name, {
					domain: domainName,
					application: coreApplication_Name
				})
			}
		}

		let existingApplicationMapByName: Map<Application_FullName, IApplication>
		if (!fullApplication_Names.length) {
			existingApplicationMapByName = new Map()
		} else {
			await this.transactionManager.transactInternal(async (
				_transaction,
				context
			) => {
				existingApplicationMapByName = await this.ddlApplicationDao
					.findMapByFullNames(fullApplication_Names, context)
			}, null, context)
		}

		return {
			coreDomainAndApplication_NamesByApplication_Name,
			existingApplicationMapByName
		}
	}

	private hasReferences(
		referencedApplicationMap: Map<Domain_Name, Map<JsonApplication_Name, JsonApplication>>
	): boolean {
		for (const referencesForDomain of referencedApplicationMap.values()) {
			for (const _ of referencesForDomain) {
				return true
			}
		}

		return false
	}

}
