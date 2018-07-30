import {IUtils, UtilsToken} from "@airport/air-control";
import {
	DomainId,
	DomainName,
	SchemaIndex,
	SchemaName,
	SchemaVersionId
} from "@airport/ground-control";
import {IRepoTransBlockSchemasToChange} from "@airport/moving-walkway";
import {DomainDaoToken, IDomain, IDomainDao} from "@airport/territory";
import {
	ISchema,
	ISchemaDao,
	ISchemaVersion,
	ISchemaVersionDao,
	MaxSchemaVersionView,
	SchemaDaoToken,
	SchemaDomainName,
	SchemaStatus,
	SchemaVersionDaoToken
} from "@airport/traffic-pattern";
import {Service} from "typedi";
import {Inject} from "typedi/decorators/Inject";
import {parse} from "zipson/lib";
import {SyncInSchemaCheckerToken} from "../../../InjectionTokens";
import {IDataToTM, SchemaComparisonResult} from "../SyncInUtils";

export interface SchemaCheckResults {
	dataMessagesWithCompatibleSchemas: IDataToTM[];
	dataMessagesWithIncompatibleSchemas: IDataToTM[];
	dataMessagesWithInvalidSchemas: IDataToTM[];
	dataMessagesToBeUpgraded: IDataToTM[];
	maxVersionedMapBySchemaAndDomainNames:
		Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>;
	schemasWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
}

export interface DataMessageSchemaGroupings {
	dataMessagesToBeUpgraded: IDataToTM[];
	dataMessagesWithCompatibleSchemas: IDataToTM[];
	dataMessagesWithIncompatibleSchemas: IDataToTM[];
	// dataMessagesWithInvalidSchemas: IDataToTM[];
	missingDomainMap: Map<SchemaDomainName, IDomain>;
	missingSchemaMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
	// repoTransBlockSchemasToChange: IRepoTransBlockSchemasToChange[];
	// schemasToBeUpgradedMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
	schemasWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
}

export interface ISyncInSchemaChecker {

	checkSchemas(
		dataMessages: IDataToTM[],
	): Promise<SchemaCheckResults>;

}

@Service(SyncInSchemaCheckerToken)
export class SyncInSchemaChecker
	implements ISyncInSchemaChecker {

	constructor(
		@Inject(DomainDaoToken)
		private domainDao: IDomainDao,
		@Inject(SchemaDaoToken)
		private schemaDao: ISchemaDao,
		@Inject(SchemaVersionDaoToken)
		private schemaVersionDao: ISchemaVersionDao,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {
	}

	async checkSchemas(
		dataMessages: IDataToTM[],
	): Promise<SchemaCheckResults> {
		const schemaNameSet: Set<SchemaName> = new Set()
		const schemaDomainNameSet: Set<SchemaDomainName> = new Set()

		const dataMessagesWithInvalidSchemas: IDataToTM[] = []

		// Build schema name and domainName sets
		for (const message of dataMessages) {
			message.data = parse(<any>message.data)

			if (!this.verifyRTBSchemaConsistency(message)) {
				dataMessagesWithInvalidSchemas.push(message)
				continue;
			}

			for (const schemaVersion of message.data.schemaVersions) {
				schemaDomainNameSet.add(schemaVersion.schema.domain.name)
				schemaNameSet.add(schemaVersion.schema.name)
			}
		}

		const domainNames = Array.from(schemaDomainNameSet);
		const domainMapByName = await this.domainDao.findMapByNameWithNames(domainNames)
		const foundDomainNames = Array.from(domainMapByName.keys())

		let maxVersionedMapBySchemaAndDomainNames:
			Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>> = new Map()
		if (foundDomainNames.length) {
			await this.schemaVersionDao.findMaxVersionedMapBySchemaAndDomainNames(
				foundDomainNames, Array.from(schemaNameSet)
			)
		}

		const {
			dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			dataMessagesToBeUpgraded,
			missingDomainMap,
			missingSchemaMap,
			// repoTransBlockMissingSchemas,
			// repoTransBlockSchemasToBeUpgraded,
			// schemasToBeUpgradedMap,
			schemasWithChangesMap
		}: DataMessageSchemaGroupings
			= this.groupMessagesAndSchemasBySchemaState(dataMessages, domainMapByName,
			maxVersionedMapBySchemaAndDomainNames)

		const missingSchemaMap: Map<SchemaDomainName, Map<SchemaName, ISchema>> =
			await this.recordSchemasToBeAddedAndUpgraded(schemasToBeUpgradedMap, missingSchemaMap);

		// const schemasWithChangesMap
		// 	= this.mergeSchemaMaps(missingSchemaMap, schemasToBeUpgradedMap);
		// const allSchemaMap
		// 	= this.mergeSchemaMaps(maxVersionedMapBySchemaAndDomainNames, schemasWithChangesMap);

		return {
			dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			dataMessagesWithInvalidSchemas,
			dataMessagesToBeUpgraded,
			maxVersionedMapBySchemaAndDomainNames
		}
	}

	private groupMessagesAndSchemasBySchemaState(
		dataMessages: IDataToTM[],
		domainMapByName: Map<DomainName, IDomain>,
		maxVersionedMapBySchemaAndDomainNames: Map<SchemaDomainName,
			Map<SchemaName, MaxSchemaVersionView>>
	): DataMessageSchemaGroupings {
		const dataMessagesWithIncompatibleSchemas: IDataToTM[] = []
		const dataMessagesWithCompatibleSchemas: IDataToTM[] = []
		const schemasToBeUpgradedMap:
			Map<SchemaDomainName, Map<SchemaName, ISchema>> = new Map()
		const missingDomainMap: Map<SchemaDomainName, IDomain> = new Map()
		const missingSchemaMap: Map<SchemaDomainName, Map<SchemaName, ISchema>> = new Map()
		const dataMessagesToBeUpgraded: IDataToTM[] = []

		// split messages by the status of the schemas in them
		for (const message of dataMessages) {
			let allMessageSchemasAreCompatible = true
			let messageBuildWithOutdatedSchemaVersions = false

			// for every schema (at a given version) used in the message
			for (const schemaVersion of message.data.schemaVersions) {
				const schema = schemaVersion.schema
				const domain = schema.domain
				const existingDomain = domainMapByName.get(domain.name)
				const maxVersionedMapBySchemaName
					= maxVersionedMapBySchemaAndDomainNames.get(domain.name)
				// If the domain of the message schema is not present in this TM
				if (!maxVersionedMapBySchemaName) {
					const missingDomain: IDomain = {
						name: domain.name
					}
					missingDomainMap.set(domain.name, missingDomain)
					this.utils.ensureChildJsMap(missingSchemaMap, domain.name)
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
					this.utils.ensureChildJsMap(missingSchemaMap, domain.name)
						.set(schema.name, {
							domain: domain,
							name: schema.name
						})
					this.utils.ensureChildJsMap(missingSchemaMap, schema.domainName)
						.set(schema.name);
					allMessageSchemasAreCompatible = false;
					continue;
				}

				switch (this.compareSchemaVersions(schemaVersion, maxSchemaVersion)) {
					case SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_LOWER:
						messageBuildWithOutdatedSchemaVersions = true;
						break;
					case SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_HIGHER:
						this.utils.ensureChildJsMap(
							schemasToBeUpgradedMap, schema.domainName)
							.set(schema.name, schema);
						allMessageSchemasAreCompatible = false;
						break;
				}
			}
			if (!allMessageSchemasAreCompatible) {
				dataMessagesWithIncompatibleSchemas.push(message);
			} else if (messageBuildWithOutdatedSchemaVersions) {
				dataMessagesToBeUpgraded.push(message);
			} else {
				dataMessagesWithCompatibleSchemas.push(message);
			}

		}

		return {
			dataMessagesToBeUpgraded,
			dataMessgesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			missingSchemaMap: missingSchemaNameMap,
			schemasToBeUpgradedMap
		};
	}

	private verifyRTBSchemaConsistency(
		dataMessage: IDataToTM
	): boolean {
		const data = dataMessage.data

		const domainMapById: Map<DomainId, IDomain> = new Map()
		const domainMapByName: Map<DomainName, IDomain> = new Map()

		for (const domain of data.domains) {
			if (domainMapById.has(domain.id)) {
				return false
			}
			if (domainMapByName.has(domain.name)) {
				return false
			}
			domainMapById.set(domain.id, domain)
			domainMapByName.set(domain.name, domain)
		}

		const schemaMapByIndex: Map<SchemaIndex, ISchema> = new Map()
		for (const schema of data.schemas) {
			if (schemaMapByIndex.has(schema.index)) {
				return false
			}
			if (!domainMapById.has(schema.domain.id)) {
				return false
			}
			schema.domain = domainMapById.get(schema.domain.id)
			schemaMapByIndex.set(schema.index, schema)
		}

		const schemaVersionSet: Set<SchemaVersionId> = new Set()
		for (const schemaVersion of data.schemaVersions) {
			const schemaVersionIdAlreadyDefinedInRTB = schemaVersionSet.has(schemaVersion.id)
			if (schemaVersionIdAlreadyDefinedInRTB) {
				return false
			}

			if (!schemaMapByIndex.has(schemaVersion.schema.index)) {
				return false
			}

			schemaVersion.schema = schemaMapByIndex.get(schemaVersion.schema.index)
			const schema = schemaVersion.schema

			schemaVersionSet.add(schemaVersion.id)
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
	 * @param {Map<SchemaDomainName, Set<SchemaName>>} missingSchemaMap
	 * @returns {Promise<void>}
	 */
	private async recordSchemasToBeAddedAndUpgraded(
		schemasToBeUpgradedMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>,
		missingSchemaMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>,
	): Promise<Map<SchemaDomainName, Map<SchemaName, ISchema>>> {

		// All local (TM) indexes of schemas that need to be upgraded
		const schemaIndexesToUpdateStatusBy: SchemaIndex[] = [];
		for (const schemaMapByName of schemasToBeUpgradedMap.values()) {
			for (const schema of schemaMapByName.values()) {
				schemaIndexesToUpdateStatusBy.push(schema.index);
			}
		}
		await this.schemaDao.setStatusByIndexes(
			schemaIndexesToUpdateStatusBy, SchemaStatus.NEEDS_UPGRADES);

		// All schemas needed (that do not yet exist in this TM)
		const newlyNeededSchemas: ISchema[] = [];

		for (const [domainName, schemaMapForDomain] of missingSchemaMap) {
			for (const name of schemaMapForDomain) {
				const schema: ISchema = {
					domainName,
					name,
					status: SchemaStatus.MISSING
				};
				missingSchemaDomainMap.set(name, schema);
				newlyNeededSchemas.push(schema);
			}
		}

		await this.schemaDao.bulkCreate(newlyNeededSchemas, false, false);

		return missingSchemaMap;
	}

	private mergeSchemaMaps(
		schemaMap1: Map<SchemaDomainName, Map<SchemaName, ISchema>>,
		schemaMap2: Map<SchemaDomainName, Map<SchemaName, ISchema>>
	): Map<SchemaDomainName, Map<SchemaName, ISchema>> {
		const mergedSchemaMap: Map<SchemaDomainName, Map<SchemaName, ISchema>> = new Map();

		this.copySchemaMap(schemaMap1, mergedSchemaMap);
		this.copySchemaMap(schemaMap2, mergedSchemaMap);

		return mergedSchemaMap;
	}

	private copySchemaMap(
		sourceMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>,
		targetMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>
	): void {
		for (const [schemaDomainName, schemaMapByName] of sourceMap) {
			const targetSchemaMapByName = this.utils.ensureChildJsMap(targetMap, schemaDomainName);
			for (const [schemaName, schema] of schemaMapByName) {
				targetSchemaMapByName.set(schemaName, schema);
			}
		}
	}

	private compareSchemaVersions(
		messageSchemaVersion: ISchemaVersion,
		maxSchemaVersionView: MaxSchemaVersionView
	): SchemaComparisonResult {
		const majorVersionComparison = this.compareGivenSchemaVersionLevel(
			messageSchemaVersion.majorVersion, maxSchemaVersionView.majorVersion
		);
		if (majorVersionComparison) {
			return majorVersionComparison;
		}

		const minorVersionComparison = this.compareGivenSchemaVersionLevel(
			messageSchemaVersion.minorVersion, maxSchemaVersionView.minorVersion
		);
		if (minorVersionComparison) {
			return minorVersionComparison;
		}

		return this.compareGivenSchemaVersionLevel(
			messageSchemaVersion.patchVersion, maxSchemaVersionView.patchVersion
		);
	}

	private compareGivenSchemaVersionLevel(
		messageSchemaVersion: number,
		localSchemaVersion: number,
	): SchemaComparisonResult {
		if (messageSchemaVersion < localSchemaVersion) {
			return SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_LOWER;
		}
		if (messageSchemaVersion > localSchemaVersion) {
			return SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_HIGHER;
		}
		return SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_EQUAL;
	}

}