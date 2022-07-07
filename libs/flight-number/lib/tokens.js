import { lib } from "@airport/direction-indicator";
import { ActiveQueries } from "./ActiveQueries";
import { ObservableQueryAdapter } from "./ObservableQueryAdapter";
const flightNumber = lib('flight-number');
export const ACTIVE_QUERIES = flightNumber.token({
    class: ActiveQueries,
    interface: 'IActiveQueries',
    token: 'ACTIVE_QUERIES'
});
export const OBSERVABLE_QUERY_ADAPTER = flightNumber.token({
    class: ObservableQueryAdapter,
    interface: 'IObservableQueryAdapter',
    token: 'OBSERVABLE_QUERY_ADAPTER'
});
OBSERVABLE_QUERY_ADAPTER.setDependencies({
    activeQueries: ACTIVE_QUERIES
});
//# sourceMappingURL=tokens.js.map