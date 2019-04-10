import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSequenceBlock } from './qsequenceblock';
import { QSequenceConsumer } from './qsequenceconsumer';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    Sequence: QSequence;
    SequenceBlock: QSequenceBlock;
    SequenceConsumer: QSequenceConsumer;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
