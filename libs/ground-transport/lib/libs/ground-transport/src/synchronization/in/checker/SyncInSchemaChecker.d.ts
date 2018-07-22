import { IUtils } from "@airport/air-control";
import { ISchemaDao, ISchemaVersionDao } from "@airport/traffic-pattern";
import { IDataToTM, SchemaCheckResults } from "../SyncInUtils";
export interface ISyncInSchemaChecker {
    checkSchemas(dataMessages: IDataToTM[]): Promise<SchemaCheckResults>;
}
export declare class SyncInSchemaChecker implements ISyncInSchemaChecker {
    private schemaDao;
    private schemaVersionDao;
    private utils;
    constructor(schemaDao: ISchemaDao, schemaVersionDao: ISchemaVersionDao, utils: IUtils);
    checkSchemas(dataMessages: IDataToTM[]): Promise<SchemaCheckResults>;
    private groupMessagesAndSchemasBySchemaState(dataMessages, maxVersionedMapBySchemaAndDomainNames);
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
    private recordSchemasToBeAddedAndUpgraded(schemasToBeUpgradedMap, missingSchemaNameMap);
    private mergeSchemaMaps(schemaMap1, schemaMap2);
    private copySchemaMap(sourceMap, targetMap);
    private compareSchemaVersions(messageSchema, localSchema);
    private compareGivenSchemaVersionLevel(messageSchemaVersion, localSchemaVersion);
}
