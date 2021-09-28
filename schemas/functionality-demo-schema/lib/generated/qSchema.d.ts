import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QLevel1 } from './qlevel1';
import { QLevel2 } from './qlevel2';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    Level1: QLevel1;
    Level2: QLevel2;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map