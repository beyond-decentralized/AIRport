import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog } from './qdailysynclog';
import { ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog } from './log/qlog';
import { IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog } from './qmonthlysynclog';
export interface IBaseDailySyncLogDmo extends IDmo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog> {
}
export declare class BaseDailySyncLogDmo extends Dmo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog> implements IBaseDailySyncLogDmo {
    constructor();
}
export interface IBaseLogDmo extends IDmo<ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog> {
}
export declare class BaseLogDmo extends Dmo<ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog> implements IBaseLogDmo {
    constructor();
}
export interface IBaseMonthlySyncLogDmo extends IDmo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog> {
}
export declare class BaseMonthlySyncLogDmo extends Dmo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog> implements IBaseMonthlySyncLogDmo {
    constructor();
}
