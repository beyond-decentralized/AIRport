import { EntityId, SchemaVersionId } from '@airport/ground-control';
import { ActorId, IRecordHistory, RepositoryEntity_ActorRecordId, Repository_Id } from '@airport/holding-pattern';
import { IMissingRecord, IRepositoryTransactionBlock } from '@airport/moving-walkway';
import { IDataToTM } from '../SyncInUtils';
export interface DataCheckResults {
    dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
    dataMessagesWithIncompatibleData: IDataToTM[];
    existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[];
    missingRecordDataToTMs: IMissingRecordDataToTM[];
}
export interface IMissingRecordDataToTM {
    missingRecord: IMissingRecord;
    dataMessage: IDataToTM;
}
export interface MissingRecordResults {
    compatibleDataMessageFlags: boolean[];
    missingRecordDataToTMs: IMissingRecordDataToTM[];
}
export interface DataStructuresForChanges {
    messageIndexMapByRecordToUpdateIds: Map<Repository_Id, Map<SchemaVersionId, Map<EntityId, Map<ActorId, Map<RepositoryEntity_ActorRecordId, Set<number>>>>>>;
    recordsToUpdateMap: Map<Repository_Id, Map<SchemaVersionId, Map<EntityId, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>;
}
export interface ISyncInDataChecker {
    checkData(dataMessagesWithCompatibleSchemas: IDataToTM[]): Promise<DataCheckResults>;
}
export declare class SyncInDataChecker implements ISyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    checkData(dataMessagesWithCompatibleSchemas: IDataToTM[]): Promise<DataCheckResults>;
    private getDataStructuresForChanges;
    private determineMissingRecords;
    private getRecordsToInsertMap;
    ensureRecordId(recordHistory: IRecordHistory, actorRecordIdSetByActor: Map<ActorId, Set<RepositoryEntity_ActorRecordId>>, actorRecordId?: RepositoryEntity_ActorRecordId): void;
    private recordMissingRecordAndRepoTransBlockRelations;
    private createMissingRecord;
    private getExistingRepoTransBlocksWithCompatibleSchemasAndData;
}
//# sourceMappingURL=SyncInDataChecker.d.ts.map