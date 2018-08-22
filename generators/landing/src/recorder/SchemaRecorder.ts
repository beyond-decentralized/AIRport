import {
	DomainName,
	ISchemaUtils,
	JsonSchema,
	SchemaUtilsToken
} from '@airport/ground-control'
import {
	DomainDaoToken,
	IDomain,
	IDomainDao
} from '@airport/territory'
import {
	ISchema,
	ISchemaDao,
	ISchemaVersion,
	ISchemaVersionDao,
	SchemaDaoToken,
	SchemaStatus,
	SchemaVersionDaoToken
} from '@airport/traffic-pattern'
import {
	Inject,
	Service
} from 'typedi'

export interface ISchemaRecorder {

	record(
		jsonSchemas: JsonSchema[]
	): Promise<void>

}

@Service(SchemaUtilsToken)
export class SchemaRecorder
	implements ISchemaRecorder {

	constructor(
		@Inject(DomainDaoToken)
		private domainDao: IDomainDao,
		@Inject(SchemaDaoToken)
		private schemaDao: ISchemaDao,
		@Inject(SchemaUtilsToken)
		private schemaUtils: ISchemaUtils,
		@Inject(SchemaVersionDaoToken)
		private schemaVersionDao: ISchemaVersionDao
	) {
	}

	async record(
		jsonSchemas: JsonSchema[]
	): Promise<void> {
		const domainSet: Set<DomainName>                       = new Set()
		const jsonSchemaMapByName: Map<DomainName, JsonSchema> = new Map()

		for (const jsonSchema of jsonSchemas) {
			domainSet.add(jsonSchema.domain)
			jsonSchemaMapByName.set(this.schemaUtils.getSchemaName(jsonSchema), jsonSchema)
		}

		const domainMapByName
			      = await this.domainDao.findMapByNameWithNames(Array.from(domainSet))

		const newDomains: IDomain[] = []
		for (const domainName of domainSet) {
			if (domainMapByName.has(domainName)) {
				continue
			}
			newDomains.push({
				name: domainName
			})
		}

		if (newDomains.length) {
			await this.domainDao.bulkCreate(newDomains, false, false)

			for (const domain of newDomains) {
				domainMapByName.set(domain.name, domain)
			}
		}

		const schemaMapByName = await this.schemaDao
			.findMapByNames(Array.from(jsonSchemaMapByName.keys()))

		const newSchemas: ISchema[] = []
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			if (schemaMapByName.has(schemaName)) {
				continue
			}
			const domain = domainMapByName.get(jsonSchema.domain)
			newSchemas.push({
				domain,
				scope: 'public',
				name: schemaName,
				status: SchemaStatus.CURRENT
			})
		}

		if (newSchemas.length) {
			await this.schemaDao.bulkCreate(newSchemas, false, false)

			for (const schema of newSchemas) {
				schemaMapByName.set(schema.name, schema)
			}
		}

		// Schema versions are guaranteed to be new
		const newSchemaVersions: ISchemaVersion[] = []
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const schema                = schemaMapByName.get(schemaName)
			const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const versionParts          = lastJsonSchemaVersion.versionString.split('.')
			newSchemaVersions.push({
				integerVersion: lastJsonSchemaVersion.integerVersion,
				versionString: lastJsonSchemaVersion.versionString,
				majorVersion: parseInt(versionParts[0]),
				minorVersion: parseInt(versionParts[1]),
				patchVersion: parseInt(versionParts[2]),
				schema
			})
		}

		await this.schemaVersionDao.bulkCreate(newSchemaVersions, false, false)

		for(const schemaVersion of newSchemaVersions) {
			const schema = schemaVersion.schema;
			const jsonSchema = jsonSchemaMapByName.get(schema.name)
			const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			for(const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {

			}
		}
	}

}