import { SchemaIndex } from '@airport/ground-control';
import { IRepositoryTransactionBlock, ISharingMessage } from '@airport/moving-walkway';
import { IDataToTM } from '../SyncInUtils';
import { ISyncInActorChecker } from './SyncInActorChecker';
import { ISyncInRepositoryChecker } from './SyncInRepositoryChecker';
export interface CheckSchemasResult {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    dataMessagesWithMissingData: IDataToTM[];
    usedSchemaVersionIdSet: Set<SchemaIndex>;
}
export interface CheckResults {
    sharingMessagesWithCompatibleSchemasAndData: ISharingMessage[];
    existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[];
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithInvalidData: IDataToTM[];
}
export interface ISyncInChecker {
    actorChecker: ISyncInActorChecker;
    repositoryChecker: ISyncInRepositoryChecker;
    checkSchemasAndDataAndRecordRepoTransBlocks(dataMessages: IDataToTM[]): Promise<CheckResults>;
}
export declare class SyncInChecker implements ISyncInChecker {
    /**
     *
     * @param {IDataToTM[]} dataMessages
     * @returns {Promise<[IDataToTM[] , Map<SchemaDomainName, Map<SchemaName, ISchema>>]>}
     *      [
     *          checked messages composed entirely of records from schemas with versions
     *   compatible to this TM (it's present state), map of schemas used in messages that
     *   have been verified to be in acceptable state for message processing
     *      ]
     */
    checkSchemasAndDataAndRecordRepoTransBlocks(dataMessages: IDataToTM[]): Promise<CheckResults>;
    /**
     * Schema references are to be upgraded for messages with Compatible Schemas only. The
     * remaining types of messages are only upgraded when processed
     *
     * 1) Incompatible schemas:
     *
     * Missing Schema ids cannot be upgraded
     * Schema version ids are not yet be upgraded
     *
     * FIXME: when missing schemas are retrieved - map schema & schema version ids to local
     * values FIXME: when messages/or local schema are upgraded - map schema version ids to
     * local values
     *
     * 2) Data to be upgraded:
     * Schema version ids are not yet be upgraded
     * FIXME: when messages are upgraded - map schema version ids to local values
     *
     */
    private updateSchemaReferences;
    private updateActorReferences;
    private updateRepositoryReferences;
    private recordRepoTransBlockSchemaToChange;
    private findMatchingSchema;
}
