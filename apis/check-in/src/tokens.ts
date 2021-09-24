import { lib } from '@airport/di';
import { IApiRegistry, IApiValidator } from '.';
import { IClientQueryManager } from './clientQuery/ClientQueryManager';
import { ISelectorManager } from './Selector';
import { ISequenceGenerator } from './SequenceGenerator';
import { IOperationDeserializer } from './serialize/OperationDeserializer';
import { IQueryParameterDeserializer } from './serialize/QueryParameterDeserializer';
import { IQueryResultsSerializer } from './serialize/QueryResultsSerializer';

const checkIn = lib('check-in')

export const API_REGISTRY = checkIn.token<IApiRegistry>('IApiRegistry')
export const API_VALIDATOR = checkIn.token<IApiValidator>('IApiValidator')
export const CLIENT_QUERY_MANAGER = checkIn.token<IClientQueryManager>('IClientQueryManager');
export const OPERATION_DESERIALIZER = checkIn.token<IOperationDeserializer>('IOperationDeserializer');
export const QUERY_PARAMETER_DESERIALIZER = checkIn.token<IQueryParameterDeserializer>('IQueryParameterDeserializer');
export const QUERY_RESULTS_SERIALIZER = checkIn.token<IQueryResultsSerializer>('IQueryResultsSerializer');
export const SELECTOR_MANAGER = checkIn.token<ISelectorManager>('ISelectorManager');
export const SEQUENCE_GENERATOR = checkIn.token<ISequenceGenerator>('ISequenceGenerator');
