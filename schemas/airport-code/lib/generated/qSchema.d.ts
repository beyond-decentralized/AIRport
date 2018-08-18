import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSequenceBlock } from './qsequenceblock';
import { QSequenceConsumer } from './qsequenceconsumer';
import { IBaseSequenceDmo, IBaseSequenceBlockDmo, IBaseSequenceConsumerDmo } from './baseDmos';
import { IBaseSequenceDao, IBaseSequenceBlockDao, IBaseSequenceConsumerDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        Sequence: IBaseSequenceDmo;
        SequenceBlock: IBaseSequenceBlockDmo;
        SequenceConsumer: IBaseSequenceConsumerDmo;
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
