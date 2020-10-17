import { TmRepositoryTransactionBlockId } from '@airport/arrivals-n-departures';
import { MissingRecordId, MissingRecordStatus } from '../../ddl/ddl';
import { BaseRepositoryTransactionBlockDao, IBaseRepositoryTransactionBlockDao, IRepositoryTransactionBlock } from '../../generated/generated';
export interface IRepositoryTransactionBlockDao extends IBaseRepositoryTransactionBlockDao {
    updateFromResponseStage(): Promise<number>;
    findWithMissingRecordIdsAndNoMissingRecordsWithStatus(missingRecordIds: MissingRecordId[], status: MissingRecordStatus): Promise<IRepositoryTransactionBlock[]>;
    clearContentsWhereIdsIn(repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]): Promise<void>;
}
export declare class RepositoryTransactionBlockDao extends BaseRepositoryTransactionBlockDao implements IRepositoryTransactionBlockDao {
    updateFromResponseStage(): Promise<number>;
    findWithMissingRecordIdsAndNoMissingRecordsWithStatus(missingRecordIds: MissingRecordId[], status: MissingRecordStatus): Promise<IRepositoryTransactionBlock[]>;
    clearContentsWhereIdsIn(repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]): Promise<void>;
}
//# sourceMappingURL=RepositoryTransactionBlockDao.d.ts.map