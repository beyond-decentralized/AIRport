import {
	IDatabaseFacade,
	IQueryFacade
}                             from '@airport/air-control'
import {
	diToken,
	DiToken
}                             from '@airport/di'
import {ITransactionalServer} from './core/data/ITransactionalServer'
import {IUpdateCache}         from './core/data/UpdateCache'

export const QUERY_FACADE: DiToken<IQueryFacade>         = diToken<IQueryFacade>()
export const UPDATE_CACHE: DiToken<IUpdateCache>         = diToken<IUpdateCache>()
export const TRANS_SERVER: DiToken<ITransactionalServer> = diToken<ITransactionalServer>()
