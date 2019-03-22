import { SchemaVersionId, TableIndex } from '@airport/ground-control';
import { ActorId, RepositoryEntityActorRecordId, RepositoryId } from '@airport/holding-pattern';
import { MissingRecordId, MissingRecordStatus } from '../../ddl/ddl';
import { BaseMissingRecordDao, IBaseMissingRecordDao } from '../../generated/generated';
export interface IMissingRecordDao extends IBaseMissingRecordDao {
    setStatusWhereIdsInAndReturnIds(recordIdMap: Map<RepositoryId, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>, status: MissingRecordStatus): Promise<MissingRecordId[]>;
    findActualIdsByRecordIds(recordIdMap: Map<RepositoryId, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>): Promise<MissingRecordId[]>;
    deleteWhereIdsIn(ids: MissingRecordId[]): Promise<void>;
}
export declare class MissingRecordDao extends BaseMissingRecordDao implements IMissingRecordDao {
    setStatusWhereIdsInAndReturnIds(recordIdMap: Map<RepositoryId, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>, status: MissingRecordStatus): Promise<MissingRecordId[]>;
    findActualIdsByRecordIds(recordIdMap: Map<RepositoryId, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>): Promise<MissingRecordId[]>;
    deleteWhereIdsIn(ids: MissingRecordId[]): Promise<void>;
}
