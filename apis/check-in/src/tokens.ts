import {system}                    from '@airport/di'
import {ISequenceGenerator}        from './SequenceGenerator'
import {IOperationSerializer}      from './serialize/OperationSerializer'
import {IQueryResultsDeserializer} from './serialize/QueryResultsDeserializer'
import {IQueryResultsSerializer}   from './serialize/QueryResultsSerializer'

const checkIn = system('airport')
	.lib('check-in')

export const QUERY_RESULTS_DESERIALIZER = checkIn.token<IQueryResultsDeserializer>('IQueryResultsDeserializer')
export const QUERY_RESULTS_SERIALIZER   = checkIn.token<IQueryResultsSerializer>('IQueryResultsSerializer')
export const OPERATION_SERIALIZER       = checkIn.token<IOperationSerializer>('IOperationSerializer')
export const SEQUENCE_GENERATOR         = checkIn.token<ISequenceGenerator>('ISequenceGenerator')
