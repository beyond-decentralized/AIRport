import { ColumnIndex, SchemaIndex, SchemaVersionId, TableIndex } from '@airport/ground-control';
import { ActorId, RecordHistoryActorRecordId, RepositoryEntity_ActorRecordId, RepositoryId } from '@airport/holding-pattern';
import { BaseRecordUpdateStageDao, IBaseRecordUpdateStageDao } from '../generated/generated';
export declare type RecordUpdateStageValue = any;
export declare type RecordUpdateStageValues = [SchemaVersionId, TableIndex, RepositoryId, ActorId, RecordHistoryActorRecordId, ColumnIndex, RecordUpdateStageValue];
export interface IRecordUpdateStageDao extends IBaseRecordUpdateStageDao {
    insertValues(values: RecordUpdateStageValues[]): Promise<number>;
    updateEntityWhereIds(schemaIndex: SchemaIndex, schemaVersionId: SchemaVersionId, tableIndex: TableIndex, idMap: Map<RepositoryId, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>, updatedColumnIndexes: ColumnIndex[]): Promise<void>;
    delete(): Promise<number>;
}
export declare class RecordUpdateStageDao extends BaseRecordUpdateStageDao implements IRecordUpdateStageDao {
    insertValues(values: RecordUpdateStageValues[]): Promise<number>;
    updateEntityWhereIds(schemaIndex: SchemaIndex, schemaVersionId: SchemaVersionId, tableIndex: TableIndex, idMap: Map<RepositoryId, Map<ActorId, Set<RepositoryEntity_ActorRecordId>>>, updatedColumnIndexes: ColumnIndex[]): Promise<void>;
    delete(): Promise<number>;
}
//# sourceMappingURL=RecordUpdateStageDao.d.ts.map