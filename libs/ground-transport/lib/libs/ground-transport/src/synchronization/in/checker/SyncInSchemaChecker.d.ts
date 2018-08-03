import { IUtils } from '@airport/air-control';
import { DomainName, SchemaName, SchemaVersionId } from '@airport/ground-control';
import { IDomain, IDomainDao } from '@airport/territory';
import { ISchema, ISchemaDao, ISchemaVersion, ISchemaVersionDao } from '@airport/traffic-pattern';
import { IDataToTM } from '../SyncInUtils';
export interface SchemaCheckResults {
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    dataMessagesWithInvalidSchemas: IDataToTM[];
    dataMessagesToBeUpgraded: IDataToTM[];
    maxVersionedMapBySchemaAndDomainNames: Map<DomainName, Map<SchemaName, ISchemaVersion>>;
    requiredSchemaVersionIds: Set<SchemaVersionId>;
    schemasWithChangesMap: Map<DomainName, Map<SchemaName, ISchema>>;
}
export interface DataMessageSchemaGroupings {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    missingDomainMap: Map<DomainName, IDomain>;
    missingSchemaMap: Map<DomainName, Map<SchemaName, ISchema>>;
    requiredSchemaVersionIds: Set<SchemaVersionId>;
    schemasToBeUpgradedMap: Map<DomainName, Map<SchemaName, ISchema>>;
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
    private compareSchemaVersions;
    private compareGivenSchemaVersionLevel;
}
