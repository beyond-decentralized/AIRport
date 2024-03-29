import { IDependencyInjectionToken, InversionOfControl } from '@airport/direction-indicator'
import { IObservableQueryAdapter } from './ObservableQueryAdapter'

export * from './ActiveQueries'
export * from './ObservableQueryAdapter'
export * from './flight-number.injection'

setTimeout(() => {
    if (globalThis.repositoryAutoload !== false) {
        setInterval(() => {
            (globalThis.IOC as InversionOfControl).get(
                globalThis.OBSERVABLE_QUERY_ADAPTER as IDependencyInjectionToken<IObservableQueryAdapter>
            ).then(
                observableQueryAdapter => observableQueryAdapter
                    .checkExistenceOfQueriedRepositories().then()
            )
        }, 3000)
    }
}, 5000)
