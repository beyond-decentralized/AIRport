import {Token}                from 'typedi'
import {ISequenceBlockDao}    from './dao/SequenceBlockDao'
import {ISequenceConsumerDao} from './dao/SequenceConsumerDao'
import {ISequenceDao}         from './dao/SequenceDao'

export const SequenceBlockDaoToken    = new Token<ISequenceBlockDao>()
export const SequenceConsumerDaoToken = new Token<ISequenceConsumerDao>()
export const SequenceDaoToken         = new Token<ISequenceDao>()
