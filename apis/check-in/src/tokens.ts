import {system}             from '@airport/di'
import {ISequenceGenerator} from './SequenceGenerator'

const checkIn = system('airport').lib('check-in')

export const SEQUENCE_GENERATOR = checkIn.token<ISequenceGenerator>()
