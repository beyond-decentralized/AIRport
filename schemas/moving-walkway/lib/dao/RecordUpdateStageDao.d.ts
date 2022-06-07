import { ColumnIndex, ApplicationIndex, ApplicationVersionId, TableIndex } from '@airport/ground-control';
import { Actor_Id, RecordHistoryActorRecordId, AirEntity_ActorRecordId, Repository_Id } from '@airport/holding-pattern';
import { BaseRecordUpdateStageDao, IBaseRecordUpdateStageDao } from '../generated/generated';
export declare type RecordUpdateStageValue = any;
export declare type RecordUpdateStageValues = [
    ApplicationVersionId,
    TableIndex,
    Repository_Id,
    Actor_Id,
    RecordHistoryActorRecordId,
    ColumnIndex,
    RecordUpdateStageValue
];
export interface IRecordUpdateStageDao extends IBaseRecordUpdateStageDao {
    insertValues(values: RecordUpdateStageValues[]): Promise<number[][]>;
    updateEntityWhereIds(applicationIndex: ApplicationIndex, applicationVersionId: ApplicationVersionId, tableIndex: TableIndex, idMap: Map<Repository_Id, Map<Actor_Id, Set<AirEntity_ActorRecordId>>>, updatedColumnIndexes: ColumnIndex[]): Promise<void>;
    delete(): Promise<number>;
}
export declare class RecordUpdateStageDao extends BaseRecordUpdateStageDao implements IRecordUpdateStageDao {
    insertValues(values: RecordUpdateStageValues[]): Promise<number[][]>;
    updateEntityWhereIds(applicationIndex: ApplicationIndex, applicationVersionId: ApplicationVersionId, tableIndex: TableIndex, idMap: Map<Repository_Id, Map<Actor_Id, Set<AirEntity_ActorRecordId>>>, updatedColumnIndexes: ColumnIndex[]): Promise<void>;
    delete(): Promise<number>;
}
//# sourceMappingURL=RecordUpdateStageDao.d.ts.map