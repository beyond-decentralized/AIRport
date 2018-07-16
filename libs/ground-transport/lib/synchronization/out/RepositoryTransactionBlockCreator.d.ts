import { IRepositoryTransactionBlock, IRepositoryTransactionBlockDao, IRepositoryTransactionHistoryUpdateStageDao, ISharingNodeRepositoryDao, SharingNodeId } from "@airport/moving-walkway";
import { IActorDao, IDatabase, IRepositoryDao } from "@airport/holding-pattern";
import { IUtils } from "@airport/air-control";
import { ISchemaDao } from "@airport/traffic-pattern";
export interface IRepositoryTransactionBlockCreator {
    createNewBlocks(sharingNodeIds: SharingNodeId[], database: IDatabase): Promise<Map<SharingNodeId, IRepositoryTransactionBlock[]>>;
}
export declare class RepositoryTransactionBlockCreator implements IRepositoryTransactionBlockCreator {
    private actorDao;
    private repositoryDao;
    private repositoryTransactionBlockDao;
    private repositoryTransactionHistoryUpdateStageDao;
    private schemaDao;
    private sharingNodeRepositoryDao;
    private utils;
    constructor(actorDao: IActorDao, repositoryDao: IRepositoryDao, repositoryTransactionBlockDao: IRepositoryTransactionBlockDao, repositoryTransactionHistoryUpdateStageDao: IRepositoryTransactionHistoryUpdateStageDao, schemaDao: ISchemaDao, sharingNodeRepositoryDao: ISharingNodeRepositoryDao, utils: IUtils);
    createNewBlocks(sharingNodeIds: SharingNodeId[], database: IDatabase): Promise<Map<SharingNodeId, IRepositoryTransactionBlock[]>>;
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
