import { IRepositoryTransactionBlock, SharingNodeId } from '@airport/moving-walkway';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ISyncOutRepositoryTransactionBlockCreator {
    createNewBlocks(sharingNodeIds: SharingNodeId[], terminal: ITerminal): Promise<Map<SharingNodeId, IRepositoryTransactionBlock[]>>;
}
export declare class SyncOutRepositoryTransactionBlockCreator implements ISyncOutRepositoryTransactionBlockCreator {
    createNewBlocks(sharingNodeIds: SharingNodeId[], terminal: ITerminal): Promise<Map<SharingNodeId, IRepositoryTransactionBlock[]>>;
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