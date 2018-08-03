import { IUtils } from "@airport/air-control";
import { IActorDao, ITerminal, IRepositoryDao } from "@airport/holding-pattern";
import { IRepositoryTransactionBlock, IRepositoryTransactionBlockDao, IRepositoryTransactionHistoryUpdateStageDao, ISharingNodeRepositoryDao, SharingNodeId } from "@airport/moving-walkway";
import { ISchemaDao } from "@airport/traffic-pattern";
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
    constructor(actorDao: IActorDao, repositoryDao: IRepositoryDao, repositoryTransactionBlockDao: IRepositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao: IRepositoryTransactionHistoryUpdateStageDao, schemaDao: ISchemaDao, sharingNodeRepositoryDao: ISharingNodeRepositoryDao, utils: IUtils);
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
