import { IRepositoryTransactionBlock, SharingNodeId } from '@airport/moving-walkway';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ISyncOutRepositoryTransactionBlockCreator {
    createNewBlocks(sharingNodeIds: SharingNodeId[], terminal: ITerminal): Promise<Map<SharingNodeId, IRepositoryTransactionBlock[]>>;
}
export declare class SyncOutRepositoryTransactionBlockCreator implements ISyncOutRepositoryTransactionBlockCreator {
    private actorDao;
    private repositoryDao;
    private repositoryTransactionBlockDao;
    private repositoryTransactionHistoryUpdateStageDao;
    private schemaDao;
    private sharingNodeRepositoryDao;
    private utils;
    constructor();
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
