import { IAirportDatabase } from '@airport/air-traffic-control';
import { ApplicationColumn_Index, Application_Index, ApplicationVersion_LocalId, ApplicationEntity_TableIndex } from '@airport/ground-control';
import { Actor_LocalId, RecordHistory_ActorRecordId, AirEntity_ActorRecordId, Repository_LocalId } from '@airport/holding-pattern';
import { BaseRecordUpdateStageDao, IBaseRecordUpdateStageDao } from '../generated/generated';
export declare type RecordUpdateStageValue = any;
export declare type RecordUpdateStageValues = [
    ApplicationVersion_LocalId,
    ApplicationEntity_TableIndex,
    Repository_LocalId,
    Actor_LocalId,
    RecordHistory_ActorRecordId,
    ApplicationColumn_Index,
    RecordUpdateStageValue
];
export interface IRecordUpdateStageDao extends IBaseRecordUpdateStageDao {
    insertValues(values: RecordUpdateStageValues[]): Promise<number[][]>;
    updateEntityWhereIds(applicationIndex: Application_Index, applicationVersionId: ApplicationVersion_LocalId, tableIndex: ApplicationEntity_TableIndex, idMap: Map<Repository_LocalId, Map<Actor_LocalId, Set<AirEntity_ActorRecordId>>>, updatedColumnIndexes: ApplicationColumn_Index[]): Promise<void>;
    delete(): Promise<number>;
}
export declare class RecordUpdateStageDao extends BaseRecordUpdateStageDao implements IRecordUpdateStageDao {
    airportDatabase: IAirportDatabase;
    insertValues(values: RecordUpdateStageValues[]): Promise<number[][]>;
    updateEntityWhereIds(applicationIndex: Application_Index, applicationVersionId: ApplicationVersion_LocalId, tableIndex: ApplicationEntity_TableIndex, idMap: Map<Repository_LocalId, Map<Actor_LocalId, Set<AirEntity_ActorRecordId>>>, updatedColumnIndexes: ApplicationColumn_Index[]): Promise<void>;
    delete(): Promise<number>;
}
//# sourceMappingURL=RecordUpdateStageDao.d.ts.map