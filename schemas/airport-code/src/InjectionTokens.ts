import {Token}                        from 'typedi'
import {IAbstractSequenceBlockDao}    from './dao/SequenceBlockDao'
import {IAbstractSequenceConsumerDao} from './dao/SequenceConsumerDao'
import {IAbstractSequenceDao}         from './dao/SequenceDao'

export const SequenceBlockDaoToken    = new Token<IAbstractSequenceBlockDao>()
export const SequenceConsumerDaoToken = new Token<IAbstractSequenceConsumerDao>()
export const SequenceDaoToken         = new Token<IAbstractSequenceDao>()
