import { QApplication } from '@airport/aviation-communication';
import { DbApplication, ApplicationEntity_LocalId } from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSystemWideOperationId } from './qsystemwideoperationid';
import { QTerminalRun } from './qterminalrun';
export interface LocalQApplication extends QApplication {
    db: DbApplication;
    Sequence: QSequence;
    SystemWideOperationId: QSystemWideOperationId;
    TerminalRun: QTerminalRun;
}
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: ApplicationEntity_LocalId): boolean;
export declare function duoDiSet(dbEntityId: ApplicationEntity_LocalId): boolean;
//# sourceMappingURL=qApplication.d.ts.map