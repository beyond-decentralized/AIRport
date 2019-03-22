import {diToken}                      from '@airport/di'
import {IAbstractSequenceBlockDao}    from './dao/SequenceBlockDao'
import {IAbstractSequenceConsumerDao} from './dao/SequenceConsumerDao'
import {IAbstractSequenceDao}         from './dao/SequenceDao'

export const SEQUENCE_BLOCK_DAO    = diToken<IAbstractSequenceBlockDao>()
export const SEQUENCE_CONSUMER_DAO = diToken<IAbstractSequenceConsumerDao>()
export const SEQUENCE_DAO          = diToken<IAbstractSequenceDao>()
