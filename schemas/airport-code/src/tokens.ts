import { lib } from '@airport/di'
import { ISchemaApi } from './api/SchemaApi'
import { ISequenceDao } from './dao/SequenceDao'
import { ITerminalRunDao } from './dao/TerminalRunDao'

const airportCode = lib('airport-code')

export const SEQUENCE_DAO = airportCode.token<ISequenceDao>('ISequenceDao')
export const TERMINAL_RUN_DAO = airportCode.token<ITerminalRunDao>('ITerminalRunDao')
export const SCHEMA_API = airportCode.token<ISchemaApi>('ISchemaApi')
