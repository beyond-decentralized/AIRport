import { system } from '@airport/di'
import { IQueryResultsDeserializer } from './QueryResultsDeserializer'
import { IOperationSerializer } from './OperationSerializer'

const pressurization = system('airport')
    .lib('pressurization')

export const QUERY_RESULTS_DESERIALIZER = pressurization.token<IQueryResultsDeserializer>('IQueryResultsDeserializer');
export const OPERATION_SERIALIZER = pressurization.token<IOperationSerializer>('IOperationSerializer');
