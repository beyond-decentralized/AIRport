import {
	DomainName,
	ISchemaUtils,
	JsonSchema,
	SchemaName,
	SchemaUtilsToken
}                            from '@airport/ground-control'
import {
	DomainDaoToken,
	IDomain,
	IDomainDao
}                            from '@airport/territory'
import {
	ISchema,
	ISchemaDao,
	ISchemaReference,
	ISchemaVersion,
	ISchemaVersionDao,
	SchemaDaoToken,
	SchemaEntityDaoToken,
	SchemaReferenceDaoToken,
	SchemaStatus,
	SchemaVersionDaoToken
}                            from '@airport/traffic-pattern'
import {ISchemaEntityDao}    from '@airport/traffic-pattern/lib/dao/SchemaEntityDao'
import {ISchemaReferenceDao} from '@airport/traffic-pattern/lib/dao/SchemaReferenceDao'
import {
	Inject,
	Service
}                            from 'typedi'
import {SchemaLocatorToken}  from '../InjectionTokens'
import {ISchemaLocator}      from '../locator/SchemaLocator'

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
		@Inject(SchemaEntityDaoToken)
		private schemaEntityDao: ISchemaEntityDao,
		@Inject(SchemaLocatorToken)
		private schemaLocator: ISchemaLocator,
		@Inject(SchemaReferenceDaoToken)
		private schemaReferenceDao: ISchemaReferenceDao,
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
		const jsonSchemaMapByName: Map<SchemaName, JsonSchema> = new Map()

		for (const jsonSchema of jsonSchemas) {
			domainSet.add(jsonSchema.domain)
			jsonSchemaMapByName.set(this.schemaUtils.getSchemaName(jsonSchema), jsonSchema)
		}

		const domainMapByName   = await this.recordDomains(domainSet)
		const schemaMapByName   = await this.recordSchemas(
			domainMapByName, jsonSchemaMapByName)
		const newSchemaVersionMapBySchemaName = await this.recordSchemaVersions(
			jsonSchemaMapByName, schemaMapByName)
		await this.generateSchemaReferences(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName)
		await this.generateSchemaEntities(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName)

	}

	private async recordDomains(
		domainSet: Set<DomainName>
	): Promise<Map<DomainName, IDomain>> {
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

		return domainMapByName
	}

	private async recordSchemas(
		domainMapByName: Map<DomainName, IDomain>,
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>
	): Promise<Map<SchemaName, ISchema>> {
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

		return schemaMapByName
	}

	private async recordSchemaVersions(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		schemaMapByName: Map<SchemaName, ISchema>
	): Promise<Map<SchemaName, ISchemaVersion>> {
		// Schema versions are guaranteed to be new
		const newSchemaVersions: ISchemaVersion[]                              = []
		const newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion> = new Map()
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const schema                           = schemaMapByName.get(schemaName)
			const lastJsonSchemaVersion            = jsonSchema.versions[jsonSchema.versions.length - 1]
			const versionParts                     = lastJsonSchemaVersion.versionString.split('.')
			const newSchemaVersion: ISchemaVersion = {
				integerVersion: lastJsonSchemaVersion.integerVersion,
				versionString: lastJsonSchemaVersion.versionString,
				majorVersion: parseInt(versionParts[0]),
				minorVersion: parseInt(versionParts[1]),
				patchVersion: parseInt(versionParts[2]),
				schema
			}
			newSchemaVersions.push(newSchemaVersion)
			newSchemaVersionMapBySchemaName.set(schemaName, newSchemaVersion)
		}

		await this.schemaVersionDao.bulkCreate(newSchemaVersions, false, false)

		return newSchemaVersionMapBySchemaName
	}

	private async generateSchemaReferences(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>
	) {
		const schemaReferences: ISchemaReference[] = []
		for (const ownSchemaVersion of newSchemaVersionMapBySchemaName.values()) {
			const schema                = ownSchemaVersion.schema
			const jsonSchema            = jsonSchemaMapByName.get(schema.name)
			const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
				const schemaName = this.schemaUtils.getSchemaName(jsonReferencedSchema)
				let referencedSchemaVersion = newSchemaVersionMapBySchemaName.get(schemaName)
				if(!referencedSchemaVersion) {
					referencedSchemaVersion = this.schemaLocator.locateLatestSchemaVersionBySchemaName(schemaName)
					if(!referencedSchemaVersion) {
						throw new Error(`Could not locate schema:
						${schemaName}
						in either existing schemas or schemas being currently processed`)
					}
				}
				schemaReferences.push({
					index: jsonReferencedSchema.index,
					ownSchemaVersion,
					referencedSchemaVersion
				})
			}
		}

		await this.schemaReferenceDao.bulkCreate(schemaReferences, false, false)
	}

	private async generateSchemaEntities(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>
	) {

	}

}