import { IMissingRecord } from './missingRecord/missingrecord';
import { MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord } from './missingRecord/qmissingrecord';
import { IRecordUpdateStage } from './recordupdatestage';
import { RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage } from './qrecordupdatestage';
import { ISynchronizationConflict } from './conflict/synchronizationconflict';
import { SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { ISynchronizationConflictPendingNotification } from './conflict/synchronizationconflictpendingnotification';
import { SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { ISynchronizationConflictValues } from './conflict/synchronizationconflictvalues';
import { SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseMissingRecordDao extends IDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord> {
}
export declare class BaseMissingRecordDao extends SQDIDao<IMissingRecord, MissingRecordESelect, MissingRecordECreateProperties, MissingRecordEUpdateColumns, MissingRecordEUpdateProperties, MissingRecordEId, MissingRecordGraph, QMissingRecord> implements IBaseMissingRecordDao {
    static Find: DaoQueryDecorators<MissingRecordESelect>;
    static FindOne: DaoQueryDecorators<MissingRecordESelect>;
    static Search: DaoQueryDecorators<MissingRecordESelect>;
    static SearchOne: DaoQueryDecorators<MissingRecordESelect>;
    static Save(config: MissingRecordGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseRecordUpdateStageDao extends IDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> {
}
export declare class BaseRecordUpdateStageDao extends SQDIDao<IRecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> implements IBaseRecordUpdateStageDao {
    static Find: DaoQueryDecorators<RecordUpdateStageESelect>;
    static FindOne: DaoQueryDecorators<RecordUpdateStageESelect>;
    static Search: DaoQueryDecorators<RecordUpdateStageESelect>;
    static SearchOne: DaoQueryDecorators<RecordUpdateStageESelect>;
    static Save(config: RecordUpdateStageGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictDao extends IDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> {
}
export declare class BaseSynchronizationConflictDao extends SQDIDao<ISynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> implements IBaseSynchronizationConflictDao {
    static Find: DaoQueryDecorators<SynchronizationConflictESelect>;
    static FindOne: DaoQueryDecorators<SynchronizationConflictESelect>;
    static Search: DaoQueryDecorators<SynchronizationConflictESelect>;
    static SearchOne: DaoQueryDecorators<SynchronizationConflictESelect>;
    static Save(config: SynchronizationConflictGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictPendingNotificationDao extends IDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification> {
}
export declare class BaseSynchronizationConflictPendingNotificationDao extends SQDIDao<ISynchronizationConflictPendingNotification, SynchronizationConflictPendingNotificationESelect, SynchronizationConflictPendingNotificationECreateProperties, SynchronizationConflictPendingNotificationEUpdateColumns, SynchronizationConflictPendingNotificationEUpdateProperties, SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationGraph, QSynchronizationConflictPendingNotification> implements IBaseSynchronizationConflictPendingNotificationDao {
    static Find: DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>;
    static FindOne: DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>;
    static Search: DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>;
    static SearchOne: DaoQueryDecorators<SynchronizationConflictPendingNotificationESelect>;
    static Save(config: SynchronizationConflictPendingNotificationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictValuesDao extends IDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> {
}
export declare class BaseSynchronizationConflictValuesDao extends SQDIDao<ISynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> implements IBaseSynchronizationConflictValuesDao {
    static Find: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static FindOne: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static Search: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static SearchOne: DaoQueryDecorators<SynchronizationConflictValuesESelect>;
    static Save(config: SynchronizationConflictValuesGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map