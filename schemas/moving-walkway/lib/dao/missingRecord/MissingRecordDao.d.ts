import { SchemaVersionId, TableIndex } from '@airport/ground-control';
import { ActorId, RepositoryEntity_ActorRecordId, Repository_Id, IRepositoryTransactionHistory } from '@airport/holding-pattern';
import { MissingRecordId, MissingRecordStatus } from '../../ddl/ddl';
import { BaseMissingRecordDao, IBaseMissingRecordDao } from '../../generated/generated';
export interface IMissingRecordDao extends IBaseMissingRecordDao {
    findWithMissingRecordIdsAndNoMissingRecordsWithStatus(missingRecordIds: MissingRecordId[], status: MissingRecordStatus): Promise<IRepositoryTransactionHistory[]>;
    setStatusWhereIdsInAndReturnIds(recordIdMap: Map<Repository_Id, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>, status: MissingRecordStatus): Promise<MissingRecordId[]>;
    findActualIdsByRecordIds(recordIdMap: Map<Repository_Id, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>): Promise<MissingRecordId[]>;
    deleteWhereIdsIn(ids: MissingRecordId[]): Promise<void>;
}
export declare class MissingRecordDao extends BaseMissingRecordDao implements IMissingRecordDao {
    findWithMissingRecordIdsAndNoMissingRecordsWithStatus(missingRecordIds: MissingRecordId[], status: MissingRecordStatus): Promise<IRepositoryTransactionHistory[]>;
    setStatusWhereIdsInAndReturnIds(recordIdMap: Map<Repository_Id, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>, status: MissingRecordStatus): Promise<MissingRecordId[]>;
    findActualIdsByRecordIds(recordIdMap: Map<Repository_Id, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>>>): Promise<MissingRecordId[]>;
    deleteWhereIdsIn(ids: MissingRecordId[]): Promise<void>;
}
//# sourceMappingURL=MissingRecordDao.d.ts.map