import { Token } from 'typedi';
import { ISequenceBlockDao } from './dao/SequenceBlockDao';
import { ISequenceConsumerDao } from './dao/SequenceConsumerDao';
import { ISequenceDao } from './dao/SequenceDao';
export declare const SequenceBlockDaoToken: Token<ISequenceBlockDao>;
export declare const SequenceConsumerDaoToken: Token<ISequenceConsumerDao>;
export declare const SequenceDaoToken: Token<ISequenceDao>;
