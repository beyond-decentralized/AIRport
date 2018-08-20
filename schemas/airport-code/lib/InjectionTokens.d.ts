import { Token } from 'typedi';
import { IAbstractSequenceBlockDao } from './dao/SequenceBlockDao';
import { IAbstractSequenceConsumerDao } from './dao/SequenceConsumerDao';
import { IAbstractSequenceDao } from './dao/SequenceDao';
export declare const SequenceBlockDaoToken: Token<IAbstractSequenceBlockDao>;
export declare const SequenceConsumerDaoToken: Token<IAbstractSequenceConsumerDao>;
export declare const SequenceDaoToken: Token<IAbstractSequenceDao>;
