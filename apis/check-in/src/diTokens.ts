import {diToken}            from '@airport/di'
import {ISequenceGenerator} from './SequenceGenerator'

export const SEQUENCE_GENERATOR = diToken<ISequenceGenerator>()
