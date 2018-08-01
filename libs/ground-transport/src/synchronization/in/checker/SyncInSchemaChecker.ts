import {
	IUtils,
	UtilsToken
}                                 from "@airport/air-control";
import {
	DomainId,
	DomainName,
	SchemaIndex,
	SchemaName,
	SchemaVersionId,
	SchemaVersionMajor,
	SchemaVersionMinor,
	SchemaVersionPatch
}                                 from "@airport/ground-control";
import {IDomain}                  from "@airport/territory";
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
}                                 from "@airport/traffic-pattern";
import {Service}                  from "typedi";
import {Inject}                   from "typedi/decorators/Inject";
import {parse}                    from "zipson/lib";
import {SyncInSchemaCheckerToken} from "../../../InjectionTokens";
import {
	DataMessageSchemaGroupings,
	IDataToTM,
	SchemaComparisonResult
}                                 from "../SyncInUtils";

export interface SchemaCheckResults {
	dataMessagesWithCompatibleSchemas: IDataToTM[];
	dataMessagesWithIncompatibleSchemas: IDataToTM[];
	dataMessagesWithInvalidSchemas: IDataToTM[];
	dataMessagesToBeUpgraded: IDataToTM[];
	maxVersionedMapBySchemaAndDomainNames:
		Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>;
	schemaWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
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
		const schemaNameSet: Set<SchemaName> = new Set();
		const schemaDomainNameSet: Set<SchemaDomainName> = new Set();

		const dataMessagesWithInvalidSchemas: IDataToTM[] = [];

		// Build schema name and domainName sets
		for (const message of dataMessages) {
			message.data = parse(<any>message.data);

			if (!this.verifyRTBSchemaConsistency(message)) {
				dataMessagesWithInvalidSchemas.push(message);
				continue;
			}

			for (const schemaVersion of message.data.schemaVersions) {
				schemaDomainNameSet.add(schemaVersion.schema.domainName);
				schemaNameSet.add(schemaVersion.schema.name);
			}
		}

		const maxVersionedMapBySchemaAndDomainNames:
			Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>> =
			await this.schemaVersionDao.findMaxVersionedMapBySchemaAndDomainNames(
				Array.from(schemaDomainNameSet), Array.from(schemaNameSet)
			);

		const {
			dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			dataMessagesToBeUpgraded,
			missingSchemaNameMap,
			schemasToBeUpgradedMap,
		}: DataMessageSchemaGroupings
			= this.groupMessagesAndSchemasBySchemaState(dataMessages,
			maxVersionedMapBySchemaAndDomainNames);

		const schemaWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>> =
			await this.recordSchemasToBeAddedAndUpgraded(schemasToBeUpgradedMap, missingSchemaNameMap);

		// const schemasWithChangesMap
		// 	= this.mergeSchemaMaps(missingSchemaMap, schemasToBeUpgradedMap);
		// const allSchemaMap
		// 	= this.mergeSchemaMaps(maxVersionedMapBySchemaAndDomainNames, schemasWithChangesMap);

		return {
			dataMessagesToBeUpgraded,
			dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			dataMessagesWithInvalidSchemas,
			maxVersionedMapBySchemaAndDomainNames,
			schemaWithChangesMap
		}
	}

	private groupMessagesAndSchemasBySchemaState(
		dataMessages: IDataToTM[],
		maxVersionedMapBySchemaAndDomainNames: Map<SchemaDomainName,
			Map<SchemaName, MaxSchemaVersionView>>
	): DataMessageSchemaGroupings {
		const dataMessagesWithIncompatibleSchemas: IDataToTM[] = [];
		const dataMessagesWithCompatibleSchemas: IDataToTM[] = [];
		const schemasToBeUpgradedMap:
			Map<SchemaDomainName, Map<SchemaName, ISchema>> = new Map();
		const missingSchemaNameMap: Map<SchemaDomainName, Set<SchemaName>> = new Map();
		const dataMessagesToBeUpgraded: IDataToTM[] = [];

		// split messages by the status of the schemas in them
		for (const message of dataMessages) {
			let allMessageSchemasAreCompatible = true;
			let messageBuildWithOutdatedSchemaVersions = false;

			// for every schema (at a given version) used in the message
			for (const schemaVersion of message.data.schemaVersions) {
				const schema = schemaVersion.schema;
				const maxVersionedMapBySchemaName
					= maxVersionedMapBySchemaAndDomainNames.get(schema.domainName);
				// If the domain of the message schema is not present in this TM
				if (!maxVersionedMapBySchemaName) {
					this.utils.ensureChildJsSet(missingSchemaNameMap, schema.domainName)
						.add(schema.name);
					allMessageSchemasAreCompatible = false;
					continue;
				}

				const maxSchemaVersionView = maxVersionedMapBySchemaName.get(schema.name);
				// If the schema of the message is not present in this TM
				if (!maxSchemaVersionView) {
					this.utils.ensureChildJsSet(missingSchemaNameMap, schema.domainName)
						.add(schema.name);
					allMessageSchemasAreCompatible = false;
					continue;
				}

				switch (this.compareSchemaVersions(schemaVersion, maxSchemaVersionView)) {
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
			dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			missingSchemaNameMap,
			schemasToBeUpgradedMap
		};
	}

	private verifyRTBSchemaConsistency(
		dataMessage: IDataToTM
	): boolean {
		const data = dataMessage.data;

		const domainMapByName: Map<DomainName, IDomain> = new Map();
		const domainMapById: Map<DomainId, IDomain> = new Map();

		for (const domain of data.domains) {
			if (domainMapByName.has(domain.name)) {
				return false;
			}
			if (domainMapById.has(domain.id)) {
				return false;
			}
			domainMapByName.set(domain.name, domain);
			domainMapById.set(domain.id, domain);
		}

		const schemaMapByIndex: Map<SchemaIndex, ISchema> = new Map();
		const schemaMapByDomainIdAndName: Map<DomainId, Map<SchemaName, ISchema>> = new Map();
		for (const schema of data.schemas) {
			const domainId = schema.domain.id;
			const schemaMapForDomainByName = schemaMapByDomainIdAndName.get(domainId);
			if (schemaMapForDomainByName
				&& schemaMapForDomainByName.has(schema.name)) {
				return false;
			}
			this.utils.ensureChildJsMap(schemaMapByDomainIdAndName, domainId)
				.set(schema.name, schema);

			if (schemaMapByIndex.has(schema.index)) {
				return false;
			}
			schemaMapByIndex.set(schema.index, schema);

			schema.domain = domainMapById.get(domainId);
		}

		const schemaVersionMapById: Map<SchemaVersionId, ISchemaVersion> = new Map();
		const schemaVersionMapBySchemaIndexAndVersions
			: Map<SchemaIndex, Map<SchemaVersionMajor, Map<SchemaVersionMinor,
			Map<SchemaVersionPatch, ISchemaVersion>>>>
			= new Map();

		for (const schemaVersion of data.schemaVersions) {
			const schemaVersionIdAlreadyDefinedInRTB = schemaVersionMapById.has(schemaVersion.id);
			if (schemaVersionIdAlreadyDefinedInRTB) {
				return false;
			}
			schemaVersionMapById.set(schemaVersion.id, schemaVersion);

			const schema = schemaVersion.schema;
			const schemaVersionMapForSchemaIndexByVersions = schemaVersionMapBySchemaIndexAndVersions
				.get(schema.index);
			if (schemaVersionMapForSchemaIndexByVersions) {
				const schemaVersionMapForMajorVersion
					= schemaVersionMapForSchemaIndexByVersions.get(schemaVersion.majorVersion);
				if (schemaVersionMapForMajorVersion) {
					const schemaVersionMapForMinorVersion
						= schemaVersionMapForMajorVersion.get(schemaVersion.minorVersion);
					if (schemaVersionMapForMinorVersion
						&& schemaVersionMapForMinorVersion.has(schemaVersion.patchVersion)) {
						return false;
					}
				}
			}
			this.utils.ensureChildJsMap(
				this.utils.ensureChildJsMap(
					this.utils.ensureChildJsMap(
						schemaVersionMapBySchemaIndexAndVersions, schema.index),
					schemaVersion.majorVersion),
				schemaVersion.minorVersion
			).set(schemaVersion.patchVersion, schemaVersion);

			schemaVersion.schema = schemaMapByIndex.get(schema.index);
		}

		return true;
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
		schemasToBeUpgradedMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>,
		missingSchemaNameMap: Map<SchemaDomainName, Set<SchemaName>>,
	): Promise<Map<SchemaDomainName, Map<SchemaName, ISchema>>> {

		const schemaWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>> = new Map();

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


		for (const [domainName, schemaNameSet] of missingSchemaNameMap) {
			const schemaDomainWithChangesMap: Map<SchemaName, ISchema>
				= <Map<SchemaName, ISchema>>this.utils.ensureChildJsMap(schemaWithChangesMap, domainName);
			for (const name of schemaNameSet) {
				const schema: ISchema = {
					domainName,
					name,
					status: SchemaStatus.MISSING
				};
				schemaDomainWithChangesMap.set(name, schema);
				newlyNeededSchemas.push(schema);
			}
		}

		await this.schemaDao.bulkCreate(newlyNeededSchemas, false, false);

		return schemaWithChangesMap;
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