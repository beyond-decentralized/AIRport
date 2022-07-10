import { RecordUpdateStage } from '../ddl/recordupdatestage';
import { RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage } from './qrecordupdatestage';
import { SynchronizationConflict } from '../ddl/conflict/synchronizationconflict';
import { SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { SynchronizationConflictValues } from '../ddl/conflict/synchronizationconflictvalues';
import { SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/tarmaq-query';
import { Dao, DaoQueryDecorators, IDao } from '@airport/tarmaq-dao';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseRecordUpdateStageDao extends IDao<RecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> {
}
export declare class BaseRecordUpdateStageDao extends SQDIDao<RecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> implements IBaseRecordUpdateStageDao {
    static Find: DaoQueryDecorators<RecordUpdateStageESelect>;
    static FindOne: DaoQueryDecorators<RecordUpdateStageESelect>;
    static Search: DaoQueryDecorators<RecordUpdateStageESelect>;
    static SearchOne: DaoQueryDecorators<RecordUpdateStageESelect>;
    static Save(config: RecordUpdateStageGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictDao extends IDao<SynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> {
}
export declare class BaseSynchronizationConflictDao extends SQDIDao<SynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> implements IBaseSynchronizationConflictDao {
    static Find: DaoQueryDecorators<SynchronizationConflictESelect>;
    static FindOne: DaoQueryDecorators<SynchronizationConflictESelect>;
    static Search: DaoQueryDecorators<SynchronizationConflictESelect>;
    static SearchOne: DaoQueryDecorators<SynchronizationConflictESelect>;
    static Save(config: SynchronizationConflictGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictValuesDao extends IDao<SynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> {
}
export declare class BaseSynchronizationConflictValuesDao extends SQDIDao<SynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> implements IBaseSynchronizationConflictValuesDao {
    static Find: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static FindOne: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static Search: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static SearchOne: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static Save(config: SynchronizationConflictValuesGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map