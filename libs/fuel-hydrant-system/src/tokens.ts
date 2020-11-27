import {system}           from '@airport/di'
import {ISQLQueryAdaptor} from './adaptor/SQLQueryAdaptor'
import {IActiveQueries}   from './store/ActiveQueries'
import {IIdGenerator}     from './store/IdGenerator'
import {IValidator}       from './validation/Validator'

const fuelHydrantSystem = system('airport')
	.lib('fuel-hydrant-system')

export const ACTIVE_QUERIES    = fuelHydrantSystem.token<IActiveQueries>('IActiveQueries')
export const ID_GENERATOR      = fuelHydrantSystem.token<IIdGenerator>('IIdGenerator')
export const SQL_QUERY_ADAPTOR = fuelHydrantSystem.token<ISQLQueryAdaptor>('ISQLQueryAdaptor')
export const Q_VALIDATOR       = fuelHydrantSystem.token<IValidator>('IValidator')
