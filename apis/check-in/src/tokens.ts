import { system } from '@airport/di';
import { IClientQueryManager } from './clientQuery/ClientQueryManager';
import { ISelectorManager } from './Selector';
import { ISequenceGenerator } from './SequenceGenerator';
import { IOperationDeserializer } from './serialize/OperationDeserializer';
import { IQueryParameterDeserializer } from './serialize/QueryParameterDeserializer';
import { IQueryResultsSerializer } from './serialize/QueryResultsSerializer';

const checkIn = system('airport').lib('check-in');

export const CLIENT_QUERY_MANAGER = checkIn.token<IClientQueryManager>('IClientQueryManager');
export const OPERATION_DESERIALIZER = checkIn.token<IOperationDeserializer>('IOperationDeserializer');
export const QUERY_PARAMETER_DESERIALIZER = checkIn.token<IQueryParameterDeserializer>('IQueryParameterDeserializer');
export const QUERY_RESULTS_SERIALIZER = checkIn.token<IQueryResultsSerializer>('IQueryResultsSerializer');
export const SELECTOR_MANAGER = checkIn.token<ISelectorManager>('ISelectorManager');
export const SEQUENCE_GENERATOR = checkIn.token<ISequenceGenerator>('ISequenceGenerator');
