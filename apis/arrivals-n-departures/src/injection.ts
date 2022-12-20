import { lib } from "@airport/direction-indicator";
import { RequestManager } from "./RequestManager";
import { IOperationDeserializer } from "./serialize/OperationDeserializer";
import { IQueryParameterDeserializer } from "./serialize/QueryParameterDeserializer";
import { IQueryResultsSerializer } from "./serialize/QueryResultsSerializer";
import { SessionManager } from "./SessionManager";

export const arrivalsNDepartures = lib('arrivals-n-departures')

arrivalsNDepartures.register(RequestManager, SessionManager)

export const OPERATION_DESERIALIZER = arrivalsNDepartures.token<IOperationDeserializer>('OperationDeserializer');
export const QUERY_PARAMETER_DESERIALIZER = arrivalsNDepartures.token<IQueryParameterDeserializer>('QueryParameterDeserializer');
export const QUERY_RESULTS_SERIALIZER = arrivalsNDepartures.token<IQueryResultsSerializer>('QueryResultsSerializer');
