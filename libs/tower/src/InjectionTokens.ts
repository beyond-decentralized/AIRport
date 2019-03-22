import {
	IDatabaseFacade,
	IQueryFacade
}                     from '@airport/air-control'
import {diToken}      from '@airport/di'
import {IUpdateCache} from './core/data/UpdateCache'

export const QUERY_FACADE   = diToken<IQueryFacade>()
export const UPDATE_CACHE   = diToken<IUpdateCache>()
export const ENTITY_MANAGER = diToken<IDatabaseFacade>()
