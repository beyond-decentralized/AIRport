import {
	IUtils,
	UtilsToken
} from '@airport/air-control'
import {
	DomainName,
	JsonSchema,
	SchemaName
}                           from '@airport/ground-control'
import {
	Inject,
	Service
}                           from 'typedi'
import {SchemaCheckerToken} from '../InjectionTokens'


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
		const referencedSchemaMap: Map<DomainName, Map<SchemaName, JsonSchema>> = new Map()

		const referencedSchemaMapBySchema:
			      Map<DomainName, Map<SchemaName, Map<DomainName, Map<SchemaName, JsonSchema>>>>
			      = new Map()

		for(const jsonSchema of jsonSchemas) {
			const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const referencedSchemaMapForSchema = this.utils.ensureChildJsMap(
			this.utils.ensureChildJsMap(
				referencedSchemaMapBySchema, jsonSchema.domain
			), jsonSchema.name)
			for(const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
				this.utils.ensureChildJsMap(
					referencedSchemaMap, jsonReferencedSchema.domain
				).set(jsonReferencedSchema.name, jsonReferencedSchema)
				this.utils.ensureChildJsMap(
					referencedSchemaMapForSchema, jsonReferencedSchema.domain
				).set(jsonReferencedSchema.name, jsonReferencedSchema)
			}
		}

		for(const jsonSchema of jsonSchemas) {
			for(const [domainName, referenceMapForSchemasOfDomain] of referencedSchemaMapBySchema) {
				for(const [schemaName, schemasReferencedByAGivenSchema] of referenceMapForSchemasOfDomain) {

				}
			}
			const referencedSchemaMapForSchema =
				      referencedSchemaMapBySchema.get(jsonSchema.domain).get(jsonSchema.name)
		}

	}

}