import { SharingNodeRepoTransBlockSyncStatus, TmRepositoryTransactionBlockId } from '@airport/arrivals-n-departures';
import { SharingNode_Id } from '../../ddl/ddl';
import { BaseSharingNodeRepoTransBlockStageDao, IBaseSharingNodeRepoTransBlockStageDao } from '../../generated/generated';
export declare type SharingNodeRepoTransBlockStageValues = [
    SharingNode_Id,
    TmRepositoryTransactionBlockId,
    SharingNodeRepoTransBlockSyncStatus
];
export interface ISharingNodeRepoTransBlockStageDao extends IBaseSharingNodeRepoTransBlockStageDao {
    insertValues(values: SharingNodeRepoTransBlockStageValues[]): Promise<number>;
    delete(): Promise<number>;
}
export declare class SharingNodeRepoTransBlockStageDao extends BaseSharingNodeRepoTransBlockStageDao implements ISharingNodeRepoTransBlockStageDao {
    insertValues(values: SharingNodeRepoTransBlockStageValues[]): Promise<number>;
    delete(): Promise<number>;
}
//# sourceMappingURL=SharingNodeRepoTransBlockStageDao.d.ts.map