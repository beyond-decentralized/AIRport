import { lib } from "@airport/direction-indicator"
import { RepositoryDao } from "@airport/holding-pattern/dist/app/bundle"
import { ActiveQueries } from "./ActiveQueries"
import { IObservableQueryAdapter, ObservableQueryAdapter } from "./ObservableQueryAdapter"

const flightNumber = lib('flight-number')

flightNumber.register(ActiveQueries)

export const OBSERVABLE_QUERY_ADAPTER = flightNumber.token<IObservableQueryAdapter>('ObservableQueryAdapter')

OBSERVABLE_QUERY_ADAPTER.setClass(ObservableQueryAdapter)
OBSERVABLE_QUERY_ADAPTER.setDependencies({
    activeQueries: ActiveQueries,
    repositoryDao: RepositoryDao
})

globalThis.OBSERVABLE_QUERY_ADAPTER = OBSERVABLE_QUERY_ADAPTER
