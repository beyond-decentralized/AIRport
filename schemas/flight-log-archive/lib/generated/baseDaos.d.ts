import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IDailySyncLog } from './dailysynclog';
import { DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogGraph, QDailySyncLog } from './qdailysynclog';
import { ILog } from './log/log';
import { LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogGraph, QLog } from './log/qlog';
import { IMonthlySyncLog } from './monthlysynclog';
import { MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogGraph, QMonthlySyncLog } from './qmonthlysynclog';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseDailySyncLogDao extends IDao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogGraph, QDailySyncLog> {
}
export declare class BaseDailySyncLogDao extends SQDIDao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogGraph, QDailySyncLog> implements IBaseDailySyncLogDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogDao extends IDao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogGraph, QLog> {
}
export declare class BaseLogDao extends SQDIDao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogGraph, QLog> implements IBaseLogDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMonthlySyncLogDao extends IDao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogGraph, QMonthlySyncLog> {
}
export declare class BaseMonthlySyncLogDao extends SQDIDao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogGraph, QMonthlySyncLog> implements IBaseMonthlySyncLogDao {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map