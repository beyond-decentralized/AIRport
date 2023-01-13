export * from './definition/query/EntityFind'
export * from './definition/query/EntityFindOne'
export * from './definition/query/EntityLookup'
export * from './definition/query/EntitySearch'
export * from './definition/query/EntitySearchOne'
export * from './definition/query/Lookup'
export * from './definition/query/NonEntityFind'
export * from './definition/query/NonEntityFindOne'
export * from './definition/query/NonEntitySearch'
export * from './definition/query/NonEntitySearchOne'
export * from './definition/IDao'
export * from './definition/IDatabaseFacade'
export * from './definition/IFieldsSelect'
export * from './definition/IEntityDatabaseFacade'
export * from './implementation/query/EntityFind'
export * from './implementation/query/EntityFindOne'
export * from './implementation/query/EntityLookup'
export * from './implementation/query/EntitySearch'
export * from './implementation/query/EntitySearchOne'
export * from './implementation/query/Lookup'
export * from './implementation/query/NonEntityFind'
export * from './implementation/query/NonEntityFindOne'
export * from './implementation/query/NonEntitySearch'
export * from './implementation/query/NonEntitySearchOne'
export * from './implementation/Dao'
export * from './implementation/DaoQueryDecorators'
export * from './implementation/EntityDatabaseFacade'
export * from './implementation/FieldsSelect'
export * from './injection'

import { loadGlobalAirApi } from '@airport/aviation-communication'
import { DbApplication } from '@airport/ground-control';

export function diSet(
    dbApplication: DbApplication,
    dbEntityId: number // ApplicationEntity_LocalId
): boolean {
    if ((!globalThis.inAppMode && !globalThis.SEQ_GEN)
        || !dbApplication) {
        return false;
    }

    const dbEntity = dbApplication.currentVersion[0]
        .applicationVersion.entities[dbEntityId];

    if (globalThis.inAppMode) {
        return !!dbEntity
    }

    return globalThis.SEQ_GEN.exists(dbEntity);
}

export function duoDiSet(
    dbApplication: DbApplication,
    dbEntityId: number
): boolean {
    return dbApplication && dbApplication.currentVersion[0]
        .applicationVersion.entities[dbEntityId] as any as boolean;
}

loadGlobalAirApi()

globalThis.airApi.dS = diSet
globalThis.airApi.ddS = duoDiSet
