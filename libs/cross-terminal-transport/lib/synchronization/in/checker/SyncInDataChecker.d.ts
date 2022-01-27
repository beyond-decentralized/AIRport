import { EntityId, ApplicationVersionId } from '@airport/ground-control';
import { ActorId, IRecordHistory, RepositoryEntity_ActorRecordId, Repository_Id } from '@airport/holding-pattern';
import { IMissingRecord, IRepositoryTransactionBlock } from '@airport/moving-walkway';
import { IDataToTM } from '../SyncInUtils';
export interface DataCheckResults {
    dataMessagesWithCompatibleApplicationsAndData: IDataToTM[];
    dataMessagesWithIncompatibleData: IDataToTM[];
    existingRepoTransBlocksWithCompatibleApplicationsAndData: IRepositoryTransactionBlock[];
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
    messageIndexMapByRecordToUpdateIds: Map<Repository_Id, Map<ApplicationVersionId, Map<EntityId, Map<ActorId, Map<RepositoryEntity_ActorRecordId, Set<number>>>>>>;
    recordsToUpdateMap: Map<Repository_Id, Map<ApplicationVersionId, Map<EntityId, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>;
}
export interface ISyncInDataChecker {
    checkData(dataMessagesWithCompatibleApplications: IDataToTM[]): Promise<DataCheckResults>;
}
export declare class SyncInDataChecker implements ISyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleApplications
     * @returns {DataCheckResults}
     */
    checkData(dataMessagesWithCompatibleApplications: IDataToTM[]): Promise<DataCheckResults>;
    private getDataStructuresForChanges;
    private determineMissingRecords;
    private getRecordsToInsertMap;
    ensureRecordId(recordHistory: IRecordHistory, actorRecordIdSetByActor: Map<ActorId, Set<RepositoryEntity_ActorRecordId>>, actorRecordId?: RepositoryEntity_ActorRecordId): void;
    private recordMissingRecordAndRepoTransBlockRelations;
    private createMissingRecord;
    private getExistingRepoTransBlocksWithCompatibleApplicationsAndData;
}
//# sourceMappingURL=SyncInDataChecker.d.ts.map