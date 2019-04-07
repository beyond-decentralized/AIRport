import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QDailySyncLog } from './qdailysynclog';
import { QLog } from './log/qlog';
import { QMonthlySyncLog } from './qmonthlysynclog';
import { IBaseDailySyncLogDuo, IBaseLogDuo, IBaseMonthlySyncLogDuo } from './baseDuos';
import { IBaseDailySyncLogDao, IBaseLogDao, IBaseMonthlySyncLogDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    duo: {
        DailySyncLog: IBaseDailySyncLogDuo;
        Log: IBaseLogDuo;
        MonthlySyncLog: IBaseMonthlySyncLogDuo;
    };
    dao: {
        DailySyncLog: IBaseDailySyncLogDao;
        Log: IBaseLogDao;
        MonthlySyncLog: IBaseMonthlySyncLogDao;
    };
    DailySyncLog: QDailySyncLog;
    Log: QLog;
    MonthlySyncLog: QMonthlySyncLog;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
