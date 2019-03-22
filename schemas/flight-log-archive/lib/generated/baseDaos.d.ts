import { IDao } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog } from './qdailysynclog';
import { ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, QLog } from './log/qlog';
import { IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog } from './qmonthlysynclog';
export interface IBaseDailySyncLogDao extends IDao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog> {
}
export declare class BaseDailySyncLogDao extends Dao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog> implements IBaseDailySyncLogDao {
    constructor();
}
export interface IBaseLogDao extends IDao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, QLog> {
}
export declare class BaseLogDao extends Dao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, QLog> implements IBaseLogDao {
    constructor();
}
export interface IBaseMonthlySyncLogDao extends IDao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog> {
}
export declare class BaseMonthlySyncLogDao extends Dao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog> implements IBaseMonthlySyncLogDao {
    constructor();
}
