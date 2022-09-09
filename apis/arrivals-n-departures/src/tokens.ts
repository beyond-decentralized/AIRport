import { lib } from "@airport/direction-indicator";
import { RequestManager } from "./RequestManager";
import { IOperationDeserializer } from "./serialize/OperationDeserializer";
import { IQueryParameterDeserializer } from "./serialize/QueryParameterDeserializer";
import { IQueryResultsSerializer } from "./serialize/QueryResultsSerializer";
import { SessionManager } from "./SessionManager";

export const arrivalsNDepartures = lib('arrivals-n-departures')

export const REQUEST_MANAGER = arrivalsNDepartures.token<RequestManager>({
    class: RequestManager,
    interface: 'RequestManager',
    token: 'REQUEST_MANAGER'
})
export const OPERATION_DESERIALIZER = arrivalsNDepartures.token<IOperationDeserializer>({
    class: null,
    interface: 'IOperationDeserializer',
    token: 'OPERATION_DESERIALIZER'
});
export const QUERY_PARAMETER_DESERIALIZER = arrivalsNDepartures.token<IQueryParameterDeserializer>({
    class: null,
    interface: 'IQueryParameterDeserializer',
    token: 'QUERY_PARAMETER_DESERIALIZER'
});
export const QUERY_RESULTS_SERIALIZER = arrivalsNDepartures.token<IQueryResultsSerializer>({
    class: null,
    interface: 'IQueryResultsSerializer',
    token: 'QUERY_RESULTS_SERIALIZER'
});
export const SESSION_MANAGER = arrivalsNDepartures.token<SessionManager>({
    class: SessionManager,
    interface: 'SessionManager',
    token: 'SESSION_MANAGER'
})