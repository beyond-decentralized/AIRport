import {system}            from '@airport/di'
import {IActiveQueries}     from './store/ActiveQueries'
import {IIdGenerator}       from './store/IdGenerator'

const fuelHydrantSystem = system('airport').lib('fuel-hydrant-system')

export const ACTIVE_QUERIES     = fuelHydrantSystem.token<IActiveQueries>()
export const ID_GENERATOR       = fuelHydrantSystem.token<IIdGenerator>()
