import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QMissingRecord } from './missingRecord/qmissingrecord';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { QSynchronizationConflictPendingNotification } from './conflict/qsynchronizationconflictpendingnotification';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    MissingRecord: QMissingRecord;
    RecordUpdateStage: QRecordUpdateStage;
    SynchronizationConflict: QSynchronizationConflict;
    SynchronizationConflictPendingNotification: QSynchronizationConflictPendingNotification;
    SynchronizationConflictValues: QSynchronizationConflictValues;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map