import { IRepositoryTransactionBlock, SharingNode_Id } from '@airport/moving-walkway';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ISyncOutRepositoryTransactionBlockCreator {
    createNewBlocks(sharingNodeIds: SharingNode_Id[], terminal: ITerminal): Promise<Map<SharingNode_Id, IRepositoryTransactionBlock[]>>;
}
export declare class SyncOutRepositoryTransactionBlockCreator implements ISyncOutRepositoryTransactionBlockCreator {
    createNewBlocks(sharingNodeIds: SharingNode_Id[], terminal: ITerminal): Promise<Map<SharingNode_Id, IRepositoryTransactionBlock[]>>;
    private gatherIdsForBlockCreation;
    private gatherHistoryIds;
    private createNewBlocksAndSetRepoTransHistoryBlockIds;
    private findSchemasByRepositoryMap;
    private createRepositoryTransactionBlockAndStageData;
    private createRepoTransHistoryUpdateStageValuesForBlock;
    private finishPopulatingRepositoryTransactionBlockData;
    private setRepositoryTransactionBlockBlockIds;
    private groupRepoTransBlocksBySharingNode;
}
//# sourceMappingURL=SyncOutRepositoryTransactionBlockCreator.d.ts.map