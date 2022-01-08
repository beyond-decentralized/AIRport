import { QApplication as AirportQApplication } from '@airport/air-control';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QAddress } from './qaddress';
import { QLanguage } from './qlanguage';
import { QTranslationType } from './qtranslationtype';
export interface LocalQApplication extends AirportQApplication {
    db: DbApplication;
    Address: QAddress;
    Language: QLanguage;
    TranslationType: QTranslationType;
}
export declare const Q_SCHEMA: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map