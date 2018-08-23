import {
	IUtils,
	UtilsToken
}                           from '@airport/air-control'
import {
	DomainName,
	ISchemaUtils,
	JsonSchema,
	SchemaName,
	SchemaUtilsToken
}                           from '@airport/ground-control'
import {
	ISchema,
	ISchemaDao,
	SchemaDao,
	SchemaDaoToken
} from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                           from 'typedi'
import {SchemaCheckerToken} from '../InjectionTokens'


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

}

@Service(SchemaCheckerToken)
export class SchemaChecker {

	constructor(
		@Inject(SchemaDaoToken)
		private schemaDao: ISchemaDao,
		@Inject(SchemaUtilsToken)
		private schemaUtils: ISchemaUtils,
		@Inject(UtilsToken)
		private utils: IUtils
	) {

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
		const allReferencedSchemaMap: Map<DomainName, Map<SchemaName, JsonSchema>> = new Map()

		const referencedSchemaMapBySchema:
						Map<DomainName, Map<SchemaName, Map<DomainName, Map<SchemaName, JsonSchema>>>>
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

	}

	private pruneInGroupReferences(
		jsonSchemas: JsonSchema[],
		allReferencedSchemaMap: Map<DomainName, Map<SchemaName, JsonSchema>>,
		referencedSchemaMapBySchema:
			Map<DomainName, Map<SchemaName, Map<DomainName, Map<SchemaName, JsonSchema>>>>
	):void {
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
			if(allSchemaReferencesForDomain) {
				allSchemaReferencesForDomain.delete(jsonSchema.name)
			}
		}
	}

	private async pruneReferencesToExistingSchemas(
		jsonSchemas: JsonSchema[],
		allReferencedSchemaMap: Map<DomainName, Map<SchemaName, JsonSchema>>,
		referencedSchemaMapBySchema:
			Map<DomainName, Map<SchemaName, Map<DomainName, Map<SchemaName, JsonSchema>>>>
	): Promise<void> {
		const existingSchemaInfo = await this.findExistingSchemas(allReferencedSchemaMap)

		for(const [schemaName, schema] of existingSchemaInfo.existingSchemaMapByName) {
			const coreDomainAndSchemaNames
							= existingSchemaInfo.coreDomainAndSchemaNamesBySchemaName.get(schemaName)

			// Remove every reference for this existing schema
			for (const [domainName, referenceMapForSchemasOfDomain] of referencedSchemaMapBySchema) {
				for (const [schemaName, schemasReferencedByAGivenSchema] of referenceMapForSchemasOfDomain) {
					const schemaReferencesForDomain
									= schemasReferencedByAGivenSchema.get(coreDomainAndSchemaNames.domain)
					if (schemaReferencesForDomain) {
						schemaReferencesForDomain.delete(coreDomainAndSchemaNames.schema)
					}
				}
			}
			const allSchemaReferencesForDomain
							= allReferencedSchemaMap.get(coreDomainAndSchemaNames.domain)
			if(allSchemaReferencesForDomain) {
				allSchemaReferencesForDomain.delete(coreDomainAndSchemaNames.schema)
			}
		}

	}

	private async findExistingSchemas(
		allReferencedSchemaMap: Map<DomainName, Map<SchemaName, JsonSchema>>
	):Promise<ExistingSchemaInfo> {
		const schemaNames: SchemaName[] = []
		const coreDomainAndSchemaNamesBySchemaName: Map<SchemaName, CoreDomainAndSchemaNames> = new Map()

		for(const [domainName, allReferencedSchemasForDomain] of allReferencedSchemaMap) {
			for( const [coreSchemaName, referencedSchema] of allReferencedSchemasForDomain) {
				const schemaName = this.schemaUtils.getSchemaName(referencedSchema)
				schemaNames.push(schemaName)
				coreDomainAndSchemaNamesBySchemaName.set(schemaName, {
					domain: domainName,
					schema: coreSchemaName
				})
			}
		}

		const existingSchemaMapByName = await this.schemaDao.findMapByNames(schemaNames)

		return {
			coreDomainAndSchemaNamesBySchemaName,
			existingSchemaMapByName
		}
	}

}