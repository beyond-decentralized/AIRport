import { OBSERVABLE_QUERY_ADAPTER } from './injection'

export * from './ActiveQueries'
export * from './ObservableQueryAdapter'
export * from './injection'

setInterval(() => {
    const observableQueryAdapter = globalThis.IOC.getSync(OBSERVABLE_QUERY_ADAPTER)
    observableQueryAdapter.checkRepositoryExistence().then()
}, 1000)