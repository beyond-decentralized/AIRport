import { system }                    from '@airport/di';
import { ISelectorManager }          from './Selector';
import { IOperationSerializer }      from './serialize/OperationSerializer';
import { IQueryResultsDeserializer } from './serialize/QueryResultsDeserializer';
import { IQueryResultsSerializer }   from './serialize/QueryResultsSerializer';

const checkIn = system('airport')
	.lib('check-in');

export const QUERY_RESULTS_DESERIALIZER = checkIn.token<IQueryResultsDeserializer>('IQueryResultsDeserializer');
export const QUERY_RESULTS_SERIALIZER   = checkIn.token<IQueryResultsSerializer>('IQueryResultsSerializer');
export const OPERATION_SERIALIZER       = checkIn.token<IOperationSerializer>('IOperationSerializer');
export const SELECTOR_MANAGER           = checkIn.token<ISelectorManager>('ISelectorManager');
