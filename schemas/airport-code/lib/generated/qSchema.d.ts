import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSequenceBlock } from './qsequenceblock';
import { QSequenceConsumer } from './qsequenceconsumer';
import { IBaseSequenceDuo, IBaseSequenceBlockDuo, IBaseSequenceConsumerDuo } from './baseDuos';
import { IBaseSequenceDao, IBaseSequenceBlockDao, IBaseSequenceConsumerDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    duo: {
        Sequence: IBaseSequenceDuo;
        SequenceBlock: IBaseSequenceBlockDuo;
        SequenceConsumer: IBaseSequenceConsumerDuo;
    };
    dao: {
        Sequence: IBaseSequenceDao;
        SequenceBlock: IBaseSequenceBlockDao;
        SequenceConsumer: IBaseSequenceConsumerDao;
    };
    Sequence: QSequence;
    SequenceBlock: QSequenceBlock;
    SequenceConsumer: QSequenceConsumer;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
