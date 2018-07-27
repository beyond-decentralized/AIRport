import { SchemaIndex } from "@airport/air-control";
import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { SchemaVersionId } from "@airport/ground-control";
import { ActorRandomId, IActor, RepositoryId, TerminalName, TerminalSecondId, UserUniqueId } from "@airport/holding-pattern";
import { IMissingRecordRepoTransBlockDao, IRepositoryTransactionBlock, IRepoTransBlockSchemasToChangeDao, ISharingMessage, ISharingMessageDao, SharingNodeId } from "@airport/moving-walkway";
import { ISyncInRepositoryTransactionBlockCreator } from "../creator/SyncInRepositoryTransactionBlockCreator";
import { IDataToTM, ISyncInUtils } from "../SyncInUtils";
import { ISyncInActorChecker } from "./SyncInActorChecker";
import { ISyncInDataChecker } from "./SyncInDataChecker";
import { ISyncInRepositoryChecker } from "./SyncInRepositoryChecker";
import { ISyncInSchemaChecker } from "./SyncInSchemaChecker";
export interface CheckSchemasResult {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    dataMessagesWithMissingData: IDataToTM[];
    usedSchemaVersionIdSet: Set<SchemaIndex>;
}
export interface ISyncInChecker {
    actorChecker: ISyncInActorChecker;
    repositoryChecker: ISyncInRepositoryChecker;
    checkSchemasAndDataAndRecordRepoTransBlocks(dataMessages: IDataToTM[], actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>, sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>, dataMessagesWithInvalidData: IDataToTM[]): Promise<[ISharingMessage[], ISharingMessage[], IDataToTM[], Set<SchemaIndex>]>;
}
export declare class SyncInChecker implements ISyncInChecker {
    actorChecker: ISyncInActorChecker;
    private dataChecker;
    private missingRecordRepoTransBlockDao;
    repositoryChecker: ISyncInRepositoryChecker;
    private repoTransBlockSchemasToChangeDao;
    private schemaChecker;
    private sharingMessageDao;
    private syncInRepositoryTransactionBlockCreator;
    private syncInUtils;
    constructor(actorChecker: ISyncInActorChecker, dataChecker: ISyncInDataChecker, missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao, repositoryChecker: ISyncInRepositoryChecker, repoTransBlockSchemasToChangeDao: IRepoTransBlockSchemasToChangeDao, schemaChecker: ISyncInSchemaChecker, sharingMessageDao: ISharingMessageDao, syncInRepositoryTransactionBlockCreator: ISyncInRepositoryTransactionBlockCreator, syncInUtils: ISyncInUtils);
    /**
     *
     * @param {IDataToTM[]} dataMessages
     * @returns {Promise<[IDataToTM[] , Map<SchemaDomainName, Map<SchemaName, ISchema>>]>}
     *      [
     *          checked messages composed entirely of records from schemas with versions compatible
     *              to this TM (it's present state),
     *          map of schemas used in messages that have been verified to be in acceptable state
     *              for message processing
     *      ]
     */
    checkSchemasAndDataAndRecordRepoTransBlocks(dataMessages: IDataToTM[], actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>, sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>, dataMessagesWithInvalidData: IDataToTM[]): Promise<[ISharingMessage[], IRepositoryTransactionBlock[], IDataToTM[], Set<SchemaVersionId>]>;
    /**
     * Schema references are to be upgraded for messages with Compatible Schemas only. The remaining
     * types of messages are only upgraded when processed
     *
     * 1) Incompatible schemas:
     *
     * Missing Schema ids cannot be upgraded
     * Schema version ids are not yet be upgraded
     *
     * FIXME: when missing schemas are retrieved - map schema & schema version ids to local values
     * FIXME: when messages/or local schema are upgraded - map schema version ids to local values
     *
     * 2) Data to be upgraded:
     * Schema version ids are not yet be upgraded
     * FIXME: when messages are upgraded - map schema version ids to local values
     *
     */
    private updateSchemaReferences;
    private updateActorReferences;
    private updateRepositoryReferences;
    private recordSharingMessages;
    private findMatchingSchema;
}
