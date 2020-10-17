import { RepoTransBlockSyncOutcomeType, TmRepositoryTransactionBlockId } from '@airport/arrivals-n-departures';
import { BaseRepoTransBlockResponseStageDao } from '../../generated/generated';
export declare type RepoTransBlockResponseStageValues = [TmRepositoryTransactionBlockId, RepoTransBlockSyncOutcomeType];
export interface IRepoTransBlockResponseStageDao {
    insertValues(values: RepoTransBlockResponseStageValues[]): Promise<number>;
    delete(): Promise<number>;
}
export declare class RepoTransBlockResponseStageDao extends BaseRepoTransBlockResponseStageDao implements IRepoTransBlockResponseStageDao {
    insertValues(values: RepoTransBlockResponseStageValues[]): Promise<number>;
    delete(): Promise<number>;
}
//# sourceMappingURL=RepoTransBlockResponseStageDao.d.ts.map