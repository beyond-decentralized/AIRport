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
export * from './definition/Dao'
export * from './definition/Duo'
export * from './definition/IDatabaseFacade'
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
export * from './implementation/Duo'
export * from './implementation/EntityDatabaseFacade'
export * from './tokens'

import { airApi } from '@airport/aviation-communication'
import { DbApplication, SEQ_GEN } from '@airport/ground-control';

export function diSet(
    dbApplication: DbApplication,
    dbEntityId: number // ApplicationEntity_LocalId
): boolean {
    if (!SEQ_GEN
        || !dbApplication) {
        return false;
    }

    const dbEntity = dbApplication.currentVersion[0]
        .applicationVersion.entities[dbEntityId];

    return SEQ_GEN.exists(dbEntity);
}

export function duoDiSet(
    dbApplication: DbApplication,
    dbEntityId: number
): boolean {
    return dbApplication && dbApplication.currentVersion[0]
        .applicationVersion.entities[dbEntityId] as any as boolean;
}

airApi.dS = diSet
airApi.ddS = duoDiSet
