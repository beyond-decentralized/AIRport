import { QApplication as AirportQApplication } from '@airport/air-control';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QLevel1 } from './qlevel1';
import { QLevel2 } from './qlevel2';
export interface LocalQApplication extends AirportQApplication {
    db: DbApplication;
    Level1: QLevel1;
    Level2: QLevel2;
}
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map