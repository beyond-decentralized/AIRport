import { SchemaIndex } from "@airport/air-control";
import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { ActorRandomId, TerminalName, TerminalSecondId, IActor, RepositoryId, UserUniqueId } from "@airport/holding-pattern";
import { IMissingRecordRepoTransBlockDao, IRepositoryTransactionBlock, IRepoTransBlockSchemasToChangeDao, ISharingMessage, ISharingMessageDao, SharingNodeId } from "@airport/moving-walkway";
import { IDataToTM, ISyncInUtils } from "../SyncInUtils";
import { ISyncInActorChecker } from "./SyncInActorChecker";
import { ISyncInDataChecker } from "./SyncInDataChecker";
import { ISyncInRepositoryChecker } from "./SyncInRepositoryChecker";
import { ISyncInSchemaChecker } from "./SyncInSchemaChecker";
export interface ISyncInChecker {
    actorChecker: ISyncInActorChecker;
    repositoryChecker: ISyncInRepositoryChecker;
    checkSchemasAndDataAndRecordSharingMessages(dataMessages: IDataToTM[], actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>, sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>): Promise<[ISharingMessage[], ISharingMessage[], IDataToTM[], Set<SchemaIndex>]>;
}
export declare class SyncInChecker implements ISyncInChecker {
    private missingRecordRepoTransBlockDao;
    private sharingMessageDao;
    private repoTransBlockSchemasToChangeDao;
    actorChecker: ISyncInActorChecker;
    private dataChecker;
    repositoryChecker: ISyncInRepositoryChecker;
    private schemaChecker;
    private syncInUtils;
    constructor(missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao, sharingMessageDao: ISharingMessageDao, repoTransBlockSchemasToChangeDao: IRepoTransBlockSchemasToChangeDao, actorChecker: ISyncInActorChecker, dataChecker: ISyncInDataChecker, repositoryChecker: ISyncInRepositoryChecker, schemaChecker: ISyncInSchemaChecker, syncInUtils: ISyncInUtils);
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
    checkSchemasAndDataAndRecordSharingMessages(dataMessages: IDataToTM[], actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>, sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>): Promise<[ISharingMessage[], IRepositoryTransactionBlock[], IDataToTM[], Set<SchemaIndex>]>;
    private updateSchemaReferences(dataMessages, schemaMap);
    private updateActorReferences(dataMessages, actorMap);
    private updateRepositoryReferences(dataMessages, sharingNodeRepositoryMap);
    private recordSharingMessages(dataMessagesWithIncompatibleSchemas, dataMessagesToBeUpgraded, schemasWithChangesMap, dataMessagesWithCompatibleSchemasAndData, sharingMessagesWithIncompatibleData, missingRecordRepoTransBlocks);
    private findMatchingSchema(schemaMap, schema);
}
