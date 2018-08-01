import { IUtils } from "@airport/air-control";
import { SchemaName } from "@airport/ground-control";
import { ISchema, ISchemaDao, ISchemaVersionDao, MaxSchemaVersionView, SchemaDomainName } from "@airport/traffic-pattern";
import { IDataToTM } from "../SyncInUtils";
export interface SchemaCheckResults {
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    dataMessagesWithInvalidSchemas: IDataToTM[];
    dataMessagesToBeUpgraded: IDataToTM[];
    maxVersionedMapBySchemaAndDomainNames: Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>;
    schemaWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
}
export interface ISyncInSchemaChecker {
    checkSchemas(dataMessages: IDataToTM[]): Promise<SchemaCheckResults>;
}
export declare class SyncInSchemaChecker implements ISyncInSchemaChecker {
    private schemaDao;
    private schemaVersionDao;
    private utils;
    constructor(schemaDao: ISchemaDao, schemaVersionDao: ISchemaVersionDao, utils: IUtils);
    checkSchemas(dataMessages: IDataToTM[]): Promise<SchemaCheckResults>;
    private groupMessagesAndSchemasBySchemaState;
    private verifyRTBSchemaConsistency;
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
    private recordSchemasToBeAddedAndUpgraded;
    private mergeSchemaMaps;
    private copySchemaMap;
    private compareSchemaVersions;
    private compareGivenSchemaVersionLevel;
}
