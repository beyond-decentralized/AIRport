import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSequenceBlock } from './qsequenceblock';
import { QTerminalRun } from './qterminalrun';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    Sequence: QSequence;
    SequenceBlock: QSequenceBlock;
    TerminalRun: QTerminalRun;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
