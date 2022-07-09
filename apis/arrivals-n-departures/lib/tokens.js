import { lib } from "@airport/direction-indicator";
export const arrivalsNDepartures = lib('arrivals-n-departures');
export const REQUEST_MANAGER = arrivalsNDepartures.token({
    class: null,
    interface: 'RequestManager',
    token: 'REQUEST_MANAGER'
});
export const OPERATION_DESERIALIZER = arrivalsNDepartures.token({
    class: null,
    interface: 'IOperationDeserializer',
    token: 'OPERATION_DESERIALIZER'
});
export const QUERY_PARAMETER_DESERIALIZER = arrivalsNDepartures.token({
    class: null,
    interface: 'IQueryParameterDeserializer',
    token: 'QUERY_PARAMETER_DESERIALIZER'
});
export const QUERY_RESULTS_SERIALIZER = arrivalsNDepartures.token({
    class: null,
    interface: 'IQueryResultsSerializer',
    token: 'QUERY_RESULTS_SERIALIZER'
});
//# sourceMappingURL=tokens.js.map