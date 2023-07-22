export * from './core/api/ApiRegistry'
export * from './core/api/AirRequest';
export * from './core/api/ApiValidator'
export * from './core/api/LocalAPIServer'
export * from './core/api/OperationDeserializer'
export * from './core/api/RequestManager';
export * from './core/data/EntityCopier'
export * from './core/data/UpdateCacheManager'
export * from './core/EntityStateManager'
export * from './core/globalScopeUtils'
export * from './facade/DatabaseFacade'
export * from './facade/QueryFacade'
export * from './state/ApplicationStore'
export * from './state/theApplicationState'
export * from './AirportDatabase'
export * from './tower.injection'

export function loadTower(
    applicationName: string
) {
    globalThis.inAppMode = true
    console.log('@airport/tower is loaded for Application: ' + applicationName);
}