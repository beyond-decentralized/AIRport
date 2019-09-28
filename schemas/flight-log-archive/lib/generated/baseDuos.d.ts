import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IDailySyncLog } from './dailysynclog';
import { DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogECascadeGraph, QDailySyncLog } from './qdailysynclog';
import { ILog } from './log/log';
import { LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogECascadeGraph, QLog } from './log/qlog';
import { IMonthlySyncLog } from './monthlysynclog';
import { MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogECascadeGraph, QMonthlySyncLog } from './qmonthlysynclog';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseDailySyncLogDuo extends IDuo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogECascadeGraph, QDailySyncLog> {
}
export declare class BaseDailySyncLogDuo extends SQDIDuo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogECascadeGraph, QDailySyncLog> implements IBaseDailySyncLogDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogDuo extends IDuo<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogECascadeGraph, QLog> {
}
export declare class BaseLogDuo extends SQDIDuo<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogECascadeGraph, QLog> implements IBaseLogDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMonthlySyncLogDuo extends IDuo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogECascadeGraph, QMonthlySyncLog> {
}
export declare class BaseMonthlySyncLogDuo extends SQDIDuo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogECascadeGraph, QMonthlySyncLog> implements IBaseMonthlySyncLogDuo {
    static diSet(): boolean;
    constructor();
}
