import { lib } from '@airport/direction-indicator'
import { SequenceDao } from './dao/SequenceDao'
import { TerminalRunDao } from './dao/TerminalRunDao'

const airportCode = lib('@airport/airport-code')

airportCode.register(SequenceDao, TerminalRunDao)
