import { QApplication as AirportQApplication } from '@airport/air-traffic-control';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSystemWideOperationId } from './qsystemwideoperationid';
import { QTerminalRun } from './qterminalrun';
export interface LocalQApplication extends AirportQApplication {
    db: DbApplication;
    Sequence: QSequence;
    SystemWideOperationId: QSystemWideOperationId;
    TerminalRun: QTerminalRun;
}
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map