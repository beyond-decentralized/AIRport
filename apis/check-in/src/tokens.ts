import { lib } from '@airport/direction-indicator';
import { IApiRegistry, IApiValidator } from '.';
import { IClientQueryManager } from './clientQuery/ClientQueryManager';
import { ISelectorManager } from './Selector';
import { ISequenceGenerator } from './SequenceGenerator';
import { IOperationDeserializer } from './serialize/OperationDeserializer';
import { IQueryParameterDeserializer } from './serialize/QueryParameterDeserializer';
import { IQueryResultsSerializer } from './serialize/QueryResultsSerializer';

const checkIn = lib('check-in')

export const API_REGISTRY = checkIn.token<IApiRegistry>('API_REGISTRY')
export const API_VALIDATOR = checkIn.token<IApiValidator>('API_VALIDATOR')
export const CLIENT_QUERY_MANAGER = checkIn.token<IClientQueryManager>('CLIENT_QUERY_MANAGER');
export const OPERATION_DESERIALIZER = checkIn.token<IOperationDeserializer>('OPERATION_DESERIALIZER');
export const QUERY_PARAMETER_DESERIALIZER = checkIn.token<IQueryParameterDeserializer>('QUERY_PARAMETER_DESERIALIZER');
export const QUERY_RESULTS_SERIALIZER = checkIn.token<IQueryResultsSerializer>('QUERY_RESULTS_SERIALIZER');
export const SELECTOR_MANAGER = checkIn.token<ISelectorManager>('SELECTOR_MANAGER');
export const SEQUENCE_GENERATOR = checkIn.token<ISequenceGenerator>('SEQUENCE_GENERATOR');
