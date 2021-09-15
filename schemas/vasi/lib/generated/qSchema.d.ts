import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QAddress } from './qaddress';
import { QLanguage } from './qlanguage';
import { QTranslationType } from './qtranslationtype';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    Address: QAddress;
    Language: QLanguage;
    TranslationType: QTranslationType;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map