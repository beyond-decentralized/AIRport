import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QTerminalRun } from './qterminalrun';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    Sequence: QSequence;
    TerminalRun: QTerminalRun;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
