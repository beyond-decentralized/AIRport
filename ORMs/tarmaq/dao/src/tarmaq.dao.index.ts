export * from './definition/query/IEntityFind'
export * from './definition/query/IEntityFindOne'
export * from './definition/query/IEntityLookup'
export * from './definition/query/IEntitySearch'
export * from './definition/query/IEntitySearchOne'
export * from './definition/query/ILookup'
export * from './definition/query/INonEntityFind'
export * from './definition/query/INonEntityFindOne'
export * from './definition/query/INonEntitySearch'
export * from './definition/query/INonEntitySearchOne'
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
export * from './tarmaq.dao.injection'

import { loadGlobalAirApi } from '@airport/aviation-communication'
import { DbApplication } from '@airport/ground-control';

export function diSet(
    dbApplication: DbApplication,
    dbEntityId: number // DbEntity_LocalId
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
