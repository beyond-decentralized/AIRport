import { ApplicationColumn_Index, Application_Index, ApplicationVersion_LocalId, ApplicationEntity_TableIndex } from '@airport/ground-control';
import { Actor_Id, RecordHistory_ActorRecordId, AirEntity_ActorRecordId, Repository_Id } from '@airport/holding-pattern';
import { BaseRecordUpdateStageDao, IBaseRecordUpdateStageDao } from '../generated/generated';
export declare type RecordUpdateStageValue = any;
export declare type RecordUpdateStageValues = [
    ApplicationVersion_LocalId,
    ApplicationEntity_TableIndex,
    Repository_Id,
    Actor_Id,
    RecordHistory_ActorRecordId,
    ApplicationColumn_Index,
    RecordUpdateStageValue
];
export interface IRecordUpdateStageDao extends IBaseRecordUpdateStageDao {
    insertValues(values: RecordUpdateStageValues[]): Promise<number[][]>;
    updateEntityWhereIds(applicationIndex: Application_Index, applicationVersionId: ApplicationVersion_LocalId, tableIndex: ApplicationEntity_TableIndex, idMap: Map<Repository_Id, Map<Actor_Id, Set<AirEntity_ActorRecordId>>>, updatedColumnIndexes: ApplicationColumn_Index[]): Promise<void>;
    delete(): Promise<number>;
}
export declare class RecordUpdateStageDao extends BaseRecordUpdateStageDao implements IRecordUpdateStageDao {
    insertValues(values: RecordUpdateStageValues[]): Promise<number[][]>;
    updateEntityWhereIds(applicationIndex: Application_Index, applicationVersionId: ApplicationVersion_LocalId, tableIndex: ApplicationEntity_TableIndex, idMap: Map<Repository_Id, Map<Actor_Id, Set<AirEntity_ActorRecordId>>>, updatedColumnIndexes: ApplicationColumn_Index[]): Promise<void>;
    delete(): Promise<number>;
}
//# sourceMappingURL=RecordUpdateStageDao.d.ts.map