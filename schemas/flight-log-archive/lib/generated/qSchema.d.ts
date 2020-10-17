import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QDailySyncLog } from './qdailysynclog';
import { QLog } from './log/qlog';
import { QMonthlySyncLog } from './qmonthlysynclog';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    DailySyncLog: QDailySyncLog;
    Log: QLog;
    MonthlySyncLog: QMonthlySyncLog;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map