import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QChild } from './qchild';
import { QParent } from './qparent';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    Child: QChild;
    Parent: QParent;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map