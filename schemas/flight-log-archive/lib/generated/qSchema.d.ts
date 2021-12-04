import { QApplication as AirportQApplication } from '@airport/air-control';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QDailySyncLog } from './qdailysynclog';
import { QLog } from './log/qlog';
import { QMonthlySyncLog } from './qmonthlysynclog';
export interface LocalQApplication extends AirportQApplication {
    db: DbApplication;
    DailySyncLog: QDailySyncLog;
    Log: QLog;
    MonthlySyncLog: QMonthlySyncLog;
}
export declare const Q_SCHEMA: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map