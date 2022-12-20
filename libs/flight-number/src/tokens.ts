import { lib } from "@airport/direction-indicator"
import { ActiveQueries } from "./ActiveQueries"
import { ObservableQueryAdapter } from "./ObservableQueryAdapter"

const flightNumber = lib('flight-number')

flightNumber.register(ActiveQueries, ObservableQueryAdapter)

flightNumber.setDependencies(ObservableQueryAdapter, {
    activeQueries: ActiveQueries
})
