import { MissingRecordId } from '../../ddl/ddl';
import { BaseMissingRecordRepoTransBlockDao, IBaseMissingRecordRepoTransBlockDao } from '../../generated/generated';
export interface IMissingRecordRepoTransBlockDao extends IBaseMissingRecordRepoTransBlockDao {
    deleteWhereMissingRecordIdsIn(missingRecordIds: MissingRecordId[]): Promise<void>;
}
export declare class MissingRecordRepoTransBlockDao extends BaseMissingRecordRepoTransBlockDao implements IMissingRecordRepoTransBlockDao {
    deleteWhereMissingRecordIdsIn(missingRecordIds: MissingRecordId[]): Promise<void>;
}
//# sourceMappingURL=MissingRecordRepoTransBlockDao.d.ts.map