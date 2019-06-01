import { IAbstractSequenceBlockDao } from './dao/SequenceBlockDao';
import { IAbstractSequenceConsumerDao } from './dao/SequenceConsumerDao';
import { ISequenceDao } from './dao/SequenceDao';
export declare const SEQUENCE_BLOCK_DAO: import("@airport/di").DiToken<IAbstractSequenceBlockDao>;
export declare const SEQUENCE_CONSUMER_DAO: import("@airport/di").DiToken<IAbstractSequenceConsumerDao>;
export declare const SEQUENCE_DAO: import("@airport/di").DiToken<ISequenceDao>;
