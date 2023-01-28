import { OBSERVABLE_QUERY_ADAPTER } from './injection'

export * from './ActiveQueries'
export * from './ObservableQueryAdapter'
export * from './injection'

setTimeout(() => {
    if (globalThis.repositoryAutoload !== false) {
        setInterval(() => {
            globalThis.IOC.get(OBSERVABLE_QUERY_ADAPTER).then(
                observableQueryAdapter => observableQueryAdapter.checkRepositoryExistence().then()
            )
        }, 1000)
    }
}, 2000)