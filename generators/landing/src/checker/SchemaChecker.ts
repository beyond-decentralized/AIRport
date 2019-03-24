import {
	IUtils,
	UTILS
}                       from '@airport/air-control'
import {DI}             from '@airport/di'
import {
	DB_SCHEMA_UTILS,
	DomainName,
	IDbSchemaUtils,
	JsonSchema,
	JsonSchemaName,
	SchemaName,
}                       from '@airport/ground-control'
import {
	ISchema,
	ISchemaDao,
	SCHEMA_DAO
}                       from '@airport/traffic-pattern'
import {SCHEMA_CHECKER} from '../diTokens'


export interface CoreDomainAndSchemaNames {

	domain: string;
	schema: string;

}

export interface ExistingSchemaInfo {
	coreDomainAndSchemaNamesBySchemaName: Map<SchemaName, CoreDomainAndSchemaNames>
	existingSchemaMapByName: Map<SchemaName, ISchema>
}

export interface SchemaReferenceCheckResults {

	schemasWithValidDependencies: JsonSchema[]
	schemasInNeedOfAdditionalDependencies: JsonSchema[]
	neededDependencies: JsonSchema[]

}

export interface ISchemaChecker {

	check(
		jsonSchema: JsonSchema
	): Promise<void>

	checkDependencies(
		jsonSchemas: JsonSchema[]
	): Promise<SchemaReferenceCheckResults>

}

export class SchemaChecker {

	private schemaDao: ISchemaDao
	private dbSchemaUtils: IDbSchemaUtils
	private utils: IUtils

	constructor() {
		DI.get((
			schemaDao,
			dbSchemaUtils,
			utils
		) => {
			this.schemaDao     = schemaDao
			this.dbSchemaUtils = dbSchemaUtils
			this.utils         = utils
		}, SCHEMA_DAO, DB_SCHEMA_UTILS, UTILS)
	}

	async check(
		jsonSchema: JsonSchema
	): Promise<void> {
		if (!jsonSchema) {
			throw new Error(`Json Schema not provided`)
		}
		if (!(jsonSchema.versions instanceof Array)) {
			throw new Error('schema.versions is not an array')
		}
		if (jsonSchema.versions.length !== 1) {
			// FIXME: add support for schema versioning
			throw new Error('Currently only 1 version of schema is supported')
		}

		await this.checkDomain(jsonSchema)
	}

	async checkDomain(
		jsonSchema: JsonSchema
	): Promise<void> {
		// TODO: implement domain checking
	}

	async checkDependencies(
		jsonSchemas: JsonSchema[]
	): Promise<SchemaReferenceCheckResults> {
		const allReferencedSchemaMap: Map<DomainName, Map<JsonSchemaName, JsonSchema>> = new Map()

		const referencedSchemaMapBySchema:
			      Map<DomainName, Map<SchemaName, Map<DomainName, Map<JsonSchemaName, JsonSchema>>>>
			      = new Map()

		for (const jsonSchema of jsonSchemas) {
			const lastJsonSchemaVersion        = jsonSchema.versions[jsonSchema.versions.length - 1]
			const referencedSchemaMapForSchema = this.utils.ensureChildJsMap(
				this.utils.ensureChildJsMap(
					referencedSchemaMapBySchema, jsonSchema.domain
				), jsonSchema.name)
			for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
				this.utils.ensureChildJsMap(
					allReferencedSchemaMap, jsonReferencedSchema.domain
				).set(jsonReferencedSchema.name, jsonReferencedSchema)
				this.utils.ensureChildJsMap(
					referencedSchemaMapForSchema, jsonReferencedSchema.domain
				).set(jsonReferencedSchema.name, jsonReferencedSchema)
			}
		}

		this.pruneInGroupReferences(jsonSchemas, allReferencedSchemaMap, referencedSchemaMapBySchema)
		await this.pruneReferencesToExistingSchemas(jsonSchemas, allReferencedSchemaMap, referencedSchemaMapBySchema)


		const schemasWithValidDependencies: JsonSchema[]          = []
		const schemasInNeedOfAdditionalDependencies: JsonSchema[] = []
		const neededDependencies: JsonSchema[]                    = []

		for (const dependenciesForDomain of allReferencedSchemaMap.values()) {
			for (const dependency of dependenciesForDomain.values()) {
				neededDependencies.push(dependency)
			}
		}

		for (const jsonSchema of jsonSchemas) {
			const referencedSchemaMapForSchema
				      = referencedSchemaMapBySchema.get(jsonSchema.domain).get(jsonSchema.name)

			if (this.hasReferences(referencedSchemaMapForSchema)) {
				schemasWithValidDependencies.push(jsonSchema)
			} else {
				schemasInNeedOfAdditionalDependencies.push(jsonSchema)
			}
		}

		return {
			schemasWithValidDependencies,
			schemasInNeedOfAdditionalDependencies,
			neededDependencies
		}
	}

	private pruneInGroupReferences(
		jsonSchemas: JsonSchema[],
		allReferencedSchemaMap: Map<DomainName, Map<JsonSchemaName, JsonSchema>>,
		referencedSchemaMapBySchema:
			Map<DomainName, Map<JsonSchemaName, Map<DomainName, Map<JsonSchemaName, JsonSchema>>>>
	): void {
		for (const jsonSchema of jsonSchemas) {
			// Remove every in-group reference for this schema
			for (const [domainName, referenceMapForSchemasOfDomain] of referencedSchemaMapBySchema) {
				for (const [schemaName, schemasReferencedByAGivenSchema] of referenceMapForSchemasOfDomain) {
					const schemaReferencesForDomain = schemasReferencedByAGivenSchema.get(jsonSchema.domain)
					if (schemaReferencesForDomain) {
						schemaReferencesForDomain.delete(jsonSchema.name)
					}
				}
			}
			const allSchemaReferencesForDomain = allReferencedSchemaMap.get(jsonSchema.domain)
			if (allSchemaReferencesForDomain) {
				allSchemaReferencesForDomain.delete(jsonSchema.name)
			}
		}
	}

	private async pruneReferencesToExistingSchemas(
		jsonSchemas: JsonSchema[],
		allReferencedSchemaMap: Map<DomainName, Map<JsonSchemaName, JsonSchema>>,
		referencedSchemaMapBySchema:
			Map<DomainName, Map<JsonSchemaName, Map<DomainName, Map<JsonSchemaName, JsonSchema>>>>
	): Promise<void> {
		const existingSchemaInfo = await this.findExistingSchemas(allReferencedSchemaMap)

		for (const schemaName of existingSchemaInfo.existingSchemaMapByName.keys()) {
			const coreDomainAndSchemaNames
				      = existingSchemaInfo.coreDomainAndSchemaNamesBySchemaName.get(schemaName)

			// Remove every reference for this existing schema
			for (const referenceMapForSchemasOfDomain of referencedSchemaMapBySchema.values()) {
				for (const schemasReferencedByAGivenSchema of referenceMapForSchemasOfDomain.values()) {
					const schemaReferencesForDomain
						      = schemasReferencedByAGivenSchema.get(coreDomainAndSchemaNames.domain)
					if (schemaReferencesForDomain) {
						schemaReferencesForDomain.delete(coreDomainAndSchemaNames.schema)
					}
				}
			}
			const allSchemaReferencesForDomain
				      = allReferencedSchemaMap.get(coreDomainAndSchemaNames.domain)
			if (allSchemaReferencesForDomain) {
				allSchemaReferencesForDomain.delete(coreDomainAndSchemaNames.schema)
			}
		}

	}

	private async findExistingSchemas(
		allReferencedSchemaMap: Map<DomainName, Map<JsonSchemaName, JsonSchema>>
	): Promise<ExistingSchemaInfo> {
		const schemaNames: SchemaName[]                                                       = []
		const coreDomainAndSchemaNamesBySchemaName: Map<SchemaName, CoreDomainAndSchemaNames> = new Map()

		for (const [domainName, allReferencedSchemasForDomain] of allReferencedSchemaMap) {
			for (const [coreSchemaName, referencedSchema] of allReferencedSchemasForDomain) {
				const schemaName = this.dbSchemaUtils.getSchemaName(referencedSchema)
				schemaNames.push(schemaName)
				coreDomainAndSchemaNamesBySchemaName.set(schemaName, {
					domain: domainName,
					schema: coreSchemaName
				})
			}
		}

		let existingSchemaMapByName: Map<string, ISchema>
		if (schemaNames.length) {
			existingSchemaMapByName = new Map()
		} else {
			existingSchemaMapByName = await this.schemaDao.findMapByNames(schemaNames)

		}

		return {
			coreDomainAndSchemaNamesBySchemaName,
			existingSchemaMapByName
		}
	}

	private hasReferences(
		referencedSchemaMap: Map<DomainName, Map<JsonSchemaName, JsonSchema>>
	): boolean {
		for (const referencesForDomain of referencedSchemaMap.values()) {
			for (const _ of referencesForDomain) {
				return true
			}
		}

		return false
	}

}

DI.set(SCHEMA_CHECKER, SchemaChecker)
