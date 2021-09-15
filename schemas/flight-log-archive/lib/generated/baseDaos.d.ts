import { IDailySyncLog } from './dailysynclog';
import { DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogGraph, QDailySyncLog } from './qdailysynclog';
import { ILog } from './log/log';
import { LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogGraph, QLog } from './log/qlog';
import { IMonthlySyncLog } from './monthlysynclog';
import { MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogGraph, QMonthlySyncLog } from './qmonthlysynclog';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseDailySyncLogDao extends IDao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogGraph, QDailySyncLog> {
}
export declare class BaseDailySyncLogDao extends SQDIDao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogGraph, QDailySyncLog> implements IBaseDailySyncLogDao {
    static Find: DaoQueryDecorators<DailySyncLogESelect>;
    static FindOne: DaoQueryDecorators<DailySyncLogESelect>;
    static Search: DaoQueryDecorators<DailySyncLogESelect>;
    static SearchOne: DaoQueryDecorators<DailySyncLogESelect>;
    static Save(config: DailySyncLogGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogDao extends IDao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogGraph, QLog> {
}
export declare class BaseLogDao extends SQDIDao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogGraph, QLog> implements IBaseLogDao {
    static Find: DaoQueryDecorators<LogESelect>;
    static FindOne: DaoQueryDecorators<LogESelect>;
    static Search: DaoQueryDecorators<LogESelect>;
    static SearchOne: DaoQueryDecorators<LogESelect>;
    static Save(config: LogGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseMonthlySyncLogDao extends IDao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogGraph, QMonthlySyncLog> {
}
export declare class BaseMonthlySyncLogDao extends SQDIDao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogGraph, QMonthlySyncLog> implements IBaseMonthlySyncLogDao {
    static Find: DaoQueryDecorators<MonthlySyncLogESelect>;
    static FindOne: DaoQueryDecorators<MonthlySyncLogESelect>;
    static Search: DaoQueryDecorators<MonthlySyncLogESelect>;
    static SearchOne: DaoQueryDecorators<MonthlySyncLogESelect>;
    static Save(config: MonthlySyncLogGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map