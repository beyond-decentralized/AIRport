import {container, DI}                     from '@airport/di'
import {
	DomainId,
	DomainName,
	ensureChildJsMap,
	SchemaIndex,
	SchemaName,
	SchemaStatus,
	SchemaVersionId,
	SchemaVersionMajor,
	SchemaVersionMinor,
	SchemaVersionPatch
}                               from '@airport/ground-control'
import {TERMINAL_STORE}         from '@airport/terminal-map'
import {
	DOMAIN_DAO,
	IDomain,
	IDomainDao
}                               from '@airport/territory'
import {
	ISchema,
	ISchemaDao,
	ISchemaVersion,
	SCHEMA_DAO,
	SCHEMA_VERSION_DAO
}                               from '@airport/traffic-pattern'
import {parse}                  from 'zipson/lib'
import {SYNC_IN_SCHEMA_CHECKER} from '../../../tokens'
import {
	IDataToTM,
	SchemaComparisonResult
}                               from '../SyncInUtils'

export interface SchemaCheckResults {
	dataMessagesWithCompatibleSchemas: IDataToTM[]
	dataMessagesWithIncompatibleSchemas: IDataToTM[]
	dataMessagesWithInvalidSchemas: IDataToTM[]
	dataMessagesToBeUpgraded: IDataToTM[]
	maxVersionedMapBySchemaAndDomainNames:
		Map<DomainName, Map<SchemaName, ISchemaVersion>>
	requiredSchemaVersionIds: Set<SchemaVersionId>
	schemasWithChangesMap: Map<DomainName, Map<SchemaName, ISchema>>
}

export interface DataMessageSchemaGroupings {
	dataMessagesToBeUpgraded: IDataToTM[]
	dataMessagesWithCompatibleSchemas: IDataToTM[]
	dataMessagesWithIncompatibleSchemas: IDataToTM[]
	// dataMessagesWithInvalidSchemas: IDataToTM[];
	missingDomainMap: Map<DomainName, IDomain>
	missingSchemaMap: Map<DomainName, Map<SchemaName, ISchema>>
	// repoTransBlockSchemasToChange: IRepoTransBlockSchemasToChange[];
	requiredSchemaVersionIds: Set<SchemaVersionId>
	// schemasToBeUpgradedMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
	schemasToBeUpgradedMap: Map<DomainName, Map<SchemaName, ISchema>>
}

export interface ISyncInSchemaChecker {

	checkSchemas(
		dataMessages: IDataToTM[],
	): Promise<SchemaCheckResults>;

}

export class SyncInSchemaChecker
	implements ISyncInSchemaChecker {

	async checkSchemas(
		dataMessages: IDataToTM[]
	): Promise<SchemaCheckResults> {
		// TODO: remove unused dependencies once tested
		const [domainDao, schemaDao, schemaVersionDao, terminalStore
		      ] = await container(this).get(DOMAIN_DAO, SCHEMA_DAO,
			SCHEMA_VERSION_DAO, TERMINAL_STORE)

		const schemaNameSet: Set<SchemaName>       = new Set()
		const schemaDomainNameSet: Set<DomainName> = new Set()

		const dataMessagesWithInvalidSchemas: IDataToTM[] = []

		// Build schema name and domainName sets
		for (const message of dataMessages) {
			message.data = parse(<any>message.data)

			if (!this.verifyRTBSchemaConsistency(message)) {
				dataMessagesWithInvalidSchemas.push(message)
				continue
			}

			for (const schemaVersion of message.data.schemaVersions) {
				schemaDomainNameSet.add(schemaVersion.schema.domain.name)
				schemaNameSet.add(schemaVersion.schema.name)
			}
		}

		const domainNames = Array.from(schemaDomainNameSet)
		// const domainMapByName = await this.domainDao.findMapByNameWithNames(domainNames);
		// const foundDomainNames = Array.from(domainMapByName.keys());

		const maxVersionedMapBySchemaAndDomainNames:
			      Map<DomainName, Map<SchemaName, ISchemaVersion>> =
			      terminalStore.getLatestSchemaVersionMapByNames()
		// 	// new Map();
		// 	// if (foundDomainNames.length) {
		// 	// 	maxVersionedMapBySchemaAndDomainNames =
		// FIXME: look schemas by signature
		// PREVIOUS SOLUTION: use the store terminalStore.getLatestSchemaVersionMapBySchemaName
		// 	await this.schemaVersionDao.findMaxVersionedMapBySchemaAndDomainNames(
		// 		Array.from(schemaDomainNameSet), Array.from(schemaNameSet)
		// 	)
		// // }

		const {
			      dataMessagesWithCompatibleSchemas,
			      dataMessagesWithIncompatibleSchemas,
			      dataMessagesToBeUpgraded,
			      missingDomainMap,
			      missingSchemaMap,
			      // repoTransBlockMissingSchemas,
			      // repoTransBlockSchemasToBeUpgraded,
			      requiredSchemaVersionIds,
			      // schemasToBeUpgradedMap,
			      schemasToBeUpgradedMap
		      }: DataMessageSchemaGroupings
			      = this.groupMessagesAndSchemasBySchemaState(dataMessages,
			maxVersionedMapBySchemaAndDomainNames
		)

		const schemasWithChangesMap: Map<DomainName, Map<SchemaName, ISchema>> =
			      await this.recordSchemasToBeAddedAndUpgraded(
				      schemasToBeUpgradedMap, missingDomainMap, missingSchemaMap,
				      domainDao, schemaDao)

		// const schemasWithChangesMap
		// 	= this.mergeSchemaMaps(missingSchemaMap, schemasToBeUpgradedMap);
		// const allSchemaMap
		// 	= this.mergeSchemaMaps(maxVersionedMapBySchemaAndDomainNames,
		// schemasWithChangesMap);

		return {
			dataMessagesToBeUpgraded,
			dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			dataMessagesWithInvalidSchemas,
			maxVersionedMapBySchemaAndDomainNames,
			requiredSchemaVersionIds,
			schemasWithChangesMap
		}
	}

	private groupMessagesAndSchemasBySchemaState(
		dataMessages: IDataToTM[],
		maxVersionedMapBySchemaAndDomainNames: Map<DomainName,
			Map<SchemaName, ISchemaVersion>>
	): DataMessageSchemaGroupings {
		const requiredSchemaVersionIds: Set<SchemaVersionId>              = new Set()
		const dataMessagesWithIncompatibleSchemas: IDataToTM[]            = []
		const dataMessagesWithCompatibleSchemas: IDataToTM[]              = []
		const schemasToBeUpgradedMap:
			      Map<DomainName, Map<SchemaName, ISchema>>                 = new Map()
		const missingDomainMap: Map<DomainName, IDomain>                  = new Map()
		const missingSchemaMap: Map<DomainName, Map<SchemaName, ISchema>> = new Map()
		const dataMessagesToBeUpgraded: IDataToTM[]                       = []

		// split messages by the status of the schemas in them
		for (const message of dataMessages) {
			let allMessageSchemasAreCompatible         = true
			let messageBuildWithOutdatedSchemaVersions = false

			// for every schema (at a given version) used in the message
			for (const schemaVersion of message.data.schemaVersions) {
				const schema = schemaVersion.schema
				const domain = schema.domain
				const maxVersionedMapBySchemaName
				             = maxVersionedMapBySchemaAndDomainNames.get(domain.name)
				// If the domain of the message schema is not present in this TM
				if (!maxVersionedMapBySchemaName) {
					const missingDomain: IDomain = {
						name: domain.name
					}
					missingDomainMap.set(domain.name, missingDomain)
					ensureChildJsMap(missingSchemaMap, domain.name)
						.set(schema.name, {
							domain: missingDomain,
							name: schema.name
						})
					allMessageSchemasAreCompatible = false
					continue
				}

				const maxSchemaVersion = maxVersionedMapBySchemaName.get(schema.name)
				// If the schema of the message is not present in this TM
				if (!maxSchemaVersion) {
					ensureChildJsMap(missingSchemaMap, domain.name)
						.set(schema.name, {
							domain: domain,
							name: schema.name
						})
					ensureChildJsMap(missingSchemaMap, schema.domain.name)
						.set(schema.name, schema)
					allMessageSchemasAreCompatible = false
					continue
				}

				switch (this.compareSchemaVersions(schemaVersion, maxSchemaVersion)) {
					case SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_LOWER:
						messageBuildWithOutdatedSchemaVersions = true
						break
					case SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_HIGHER:
						ensureChildJsMap(
							schemasToBeUpgradedMap, schema.domain.name)
							.set(schema.name, schema)
						allMessageSchemasAreCompatible = false
						break
					default:
						requiredSchemaVersionIds.add(maxSchemaVersion.id)
						break
				}
			}
			if (!allMessageSchemasAreCompatible) {
				dataMessagesWithIncompatibleSchemas.push(message)
			} else if (messageBuildWithOutdatedSchemaVersions) {
				dataMessagesToBeUpgraded.push(message)
			} else {
				dataMessagesWithCompatibleSchemas.push(message)
			}

		}

		return {
			dataMessagesToBeUpgraded,
			dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			missingDomainMap,
			missingSchemaMap,
			requiredSchemaVersionIds,
			schemasToBeUpgradedMap
		}
	}

	private verifyRTBSchemaConsistency(
		dataMessage: IDataToTM
	): boolean {
		const data = dataMessage.data

		const domainMapByName: Map<DomainName, IDomain> = new Map()
		const domainMapById: Map<DomainId, IDomain>     = new Map()

		for (const domain of data.domains) {
			if (domainMapByName.has(domain.name)) {
				return false
			}
			if (domainMapById.has(domain.id)) {
				return false
			}
			domainMapByName.set(domain.name, domain)
			domainMapById.set(domain.id, domain)
		}

		const schemaMapByIndex: Map<SchemaIndex, ISchema>                         = new Map()
		const schemaMapByDomainIdAndName: Map<DomainId, Map<SchemaName, ISchema>> = new Map()
		for (const schema of data.schemas) {
			const domainId                 = schema.domain.id
			const schemaMapForDomainByName = schemaMapByDomainIdAndName.get(domainId)
			if (schemaMapForDomainByName
				&& schemaMapForDomainByName.has(schema.name)) {
				return false
			}
			ensureChildJsMap(schemaMapByDomainIdAndName, domainId)
				.set(schema.name, schema)

			if (schemaMapByIndex.has(schema.index)) {
				return false
			}
			schemaMapByIndex.set(schema.index, schema)

			schema.domain = domainMapById.get(domainId)
		}

		const schemaVersionMapById: Map<SchemaVersionId, ISchemaVersion> = new Map()
		const schemaVersionMapBySchemaIndexAndVersions
			      : Map<SchemaIndex, Map<SchemaVersionMajor, Map<SchemaVersionMinor,
			Map<SchemaVersionPatch, ISchemaVersion>>>>
		                                                                 = new Map()

		for (const schemaVersion of data.schemaVersions) {
			const schemaVersionIdAlreadyDefinedInRTB = schemaVersionMapById.has(schemaVersion.id)
			if (schemaVersionIdAlreadyDefinedInRTB) {
				return false
			}
			schemaVersionMapById.set(schemaVersion.id, schemaVersion)

			const schema                                   = schemaVersion.schema
			const schemaVersionMapForSchemaIndexByVersions = schemaVersionMapBySchemaIndexAndVersions
				.get(schema.index)
			if (schemaVersionMapForSchemaIndexByVersions) {
				const schemaVersionMapForMajorVersion
					      = schemaVersionMapForSchemaIndexByVersions.get(schemaVersion.majorVersion)
				if (schemaVersionMapForMajorVersion) {
					const schemaVersionMapForMinorVersion
						      = schemaVersionMapForMajorVersion.get(schemaVersion.minorVersion)
					if (schemaVersionMapForMinorVersion
						&& schemaVersionMapForMinorVersion.has(schemaVersion.patchVersion)) {
						return false
					}
				}
			}
			ensureChildJsMap(
				ensureChildJsMap(
					ensureChildJsMap(
						schemaVersionMapBySchemaIndexAndVersions, schema.index),
					schemaVersion.majorVersion),
				schemaVersion.minorVersion
			).set(schemaVersion.patchVersion, schemaVersion)

			schemaVersion.schema = schemaMapByIndex.get(schema.index)
		}

		return true
	}

	/**
	 * Record which schemas will have to be added to this TM or upgraded to a later version.
	 *
	 * Schemas to be upgraded change status to NEEDS_UPGRADES.  New records are created for
	 * missing schemas.
	 *
	 * @param {Map<SchemaDomainName, Map<SchemaName, ISchema>>} schemasToBeUpgradedMap
	 * @param {Map<SchemaDomainName, Set<SchemaName>>} missingSchemaNameMap
	 * @returns {Promise<void>}
	 */
	private async recordSchemasToBeAddedAndUpgraded(
		schemasToBeUpgradedMap: Map<DomainName, Map<SchemaName, ISchema>>,
		missingDomainMap: Map<DomainName, IDomain>,
		missingSchemaMap: Map<DomainName, Map<SchemaName, ISchema>>,
		domainDao: IDomainDao,
		schemaDao: ISchemaDao
	): Promise<Map<DomainName, Map<SchemaName, ISchema>>> {

		const schemaWithChangesMap: Map<DomainName, Map<SchemaName, ISchema>> = new Map()

		// All local (TM) indexes of schemas that need to be upgraded
		const schemaIndexesToUpdateStatusBy: SchemaIndex[] = []
		for (const schemaMapByName of schemasToBeUpgradedMap.values()) {
			for (const schema of schemaMapByName.values()) {
				schemaIndexesToUpdateStatusBy.push(schema.index)
			}
		}
		await (await schemaDao).setStatusByIndexes(
			schemaIndexesToUpdateStatusBy, SchemaStatus.NEEDS_UPGRADES)

		// All schemas needed (that do not yet exist in this TM)
		const newlyNeededSchemas: ISchema[] = []


		for (const [domainName, schemaMapForDomain] of missingSchemaMap) {
			const schemaDomainWithChangesMap: Map<SchemaName, ISchema>
				      = <Map<SchemaName, ISchema>>ensureChildJsMap(schemaWithChangesMap, domainName)
			for (const [schemaName, missingSchema] of schemaMapForDomain) {
				const schema: ISchema = {
					domain: missingSchema.domain,
					name: schemaName,
					status: SchemaStatus.MISSING
				}
				schemaDomainWithChangesMap.set(name, schema)
				newlyNeededSchemas.push(schema)
			}
		}

		await (await domainDao).bulkCreate(Array.from(missingDomainMap.values()), false)

		await (await schemaDao).bulkCreate(newlyNeededSchemas, false)

		return schemaWithChangesMap
	}

	/*
		private mergeSchemaMaps(
			schemaMap1: Map<DomainName, Map<SchemaName, ISchema>>,
			schemaMap2: Map<DomainName, Map<SchemaName, ISchema>>
		): Map<DomainName, Map<SchemaName, ISchema>> {
			const mergedSchemaMap: Map<DomainName, Map<SchemaName, ISchema>> = new Map()

			this.copySchemaMap(schemaMap1, mergedSchemaMap)
			this.copySchemaMap(schemaMap2, mergedSchemaMap)

			return mergedSchemaMap
		}

		private copySchemaMap(
			sourceMap: Map<DomainName, Map<SchemaName, ISchema>>,
			targetMap: Map<DomainName, Map<SchemaName, ISchema>>
		): void {
			for (const [schemaDomainName, schemaMapByName] of sourceMap) {
				const targetSchemaMapByName = ensureChildJsMap(targetMap, schemaDomainName)
				for (const [schemaName, schema] of schemaMapByName) {
					targetSchemaMapByName.set(schemaName, schema)
				}
			}
		}
		*/

	private compareSchemaVersions(
		messageSchemaVersion: ISchemaVersion,
		maxSchemaVersion: ISchemaVersion
	): SchemaComparisonResult {
		return this.compareGivenSchemaVersionLevel(
			messageSchemaVersion.integerVersion, maxSchemaVersion.integerVersion)

		// const majorVersionComparison = this.compareGivenSchemaVersionLevel(
		// 	messageSchemaVersion.majorVersion, maxSchemaVersion.majorVersion
		// )
		// if (majorVersionComparison) {
		// 	return majorVersionComparison
		// }
		//
		// const minorVersionComparison = this.compareGivenSchemaVersionLevel(
		// 	messageSchemaVersion.minorVersion, maxSchemaVersion.minorVersion
		// )
		// if (minorVersionComparison) {
		// 	return minorVersionComparison
		// }
		//
		// return this.compareGivenSchemaVersionLevel(
		// 	messageSchemaVersion.patchVersion, maxSchemaVersion.patchVersion
		// )
	}

	private compareGivenSchemaVersionLevel(
		messageSchemaVersion: number,
		localSchemaVersion: number,
	): SchemaComparisonResult {
		if (messageSchemaVersion < localSchemaVersion) {
			return SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_LOWER
		}
		if (messageSchemaVersion > localSchemaVersion) {
			return SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_HIGHER
		}
		return SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_EQUAL
	}

}

DI.set(SYNC_IN_SCHEMA_CHECKER, SyncInSchemaChecker)
