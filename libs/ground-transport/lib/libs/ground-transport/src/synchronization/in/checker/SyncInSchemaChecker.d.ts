import { IUtils } from "@airport/air-control";
import { SchemaName } from "@airport/ground-control";
import { IDomain, IDomainDao } from "@airport/territory";
import { ISchema, ISchemaDao, ISchemaVersionDao, MaxSchemaVersionView, SchemaDomainName } from "@airport/traffic-pattern";
import { IDataToTM } from "../SyncInUtils";
export interface SchemaCheckResults {
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    dataMessagesWithInvalidSchemas: IDataToTM[];
    dataMessagesToBeUpgraded: IDataToTM[];
    maxVersionedMapBySchemaAndDomainNames: Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>;
    schemasWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
}
export interface DataMessageSchemaGroupings {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    missingDomainMap: Map<SchemaDomainName, IDomain>;
    missingSchemaMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
    schemasWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
}
export interface ISyncInSchemaChecker {
    checkSchemas(dataMessages: IDataToTM[]): Promise<SchemaCheckResults>;
}
export declare class SyncInSchemaChecker implements ISyncInSchemaChecker {
    private domainDao;
    private schemaDao;
    private schemaVersionDao;
    private utils;
    constructor(domainDao: IDomainDao, schemaDao: ISchemaDao, schemaVersionDao: ISchemaVersionDao, utils: IUtils);
    checkSchemas(dataMessages: IDataToTM[]): Promise<SchemaCheckResults>;
    private groupMessagesAndSchemasBySchemaState(dataMessages, domainMapByName, maxVersionedMapBySchemaAndDomainNames);
    private verifyRTBSchemaConsistency(dataMessage);
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
    private recordSchemasToBeAddedAndUpgraded(schemasToBeUpgradedMap, missingSchemaMap);
    private mergeSchemaMaps(schemaMap1, schemaMap2);
    private copySchemaMap(sourceMap, targetMap);
    private compareSchemaVersions(messageSchemaVersion, maxSchemaVersionView);
    private compareGivenSchemaVersionLevel(messageSchemaVersion, localSchemaVersion);
}
