import { QApplication } from '@airport/aviation-communication';
import { DbApplication, ApplicationEntity_LocalId } from '@airport/ground-control';
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
export declare function diSet(dbEntityId: ApplicationEntity_LocalId): boolean;
export declare function duoDiSet(dbEntityId: ApplicationEntity_LocalId): boolean;
//# sourceMappingURL=qApplication.d.ts.map