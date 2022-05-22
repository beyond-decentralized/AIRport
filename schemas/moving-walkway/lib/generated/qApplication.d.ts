import { QApplication } from '@airport/aviation-communication';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
export interface LocalQApplication extends QApplication {
    db: DbApplication;
    RecordUpdateStage: QRecordUpdateStage;
    SynchronizationConflict: QSynchronizationConflict;
    SynchronizationConflictValues: QSynchronizationConflictValues;
}
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map