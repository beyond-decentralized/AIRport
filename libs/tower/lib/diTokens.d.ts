import { IDatabaseFacade, IQueryFacade } from '@airport/air-control';
import { DiToken } from '@airport/di';
import { IUpdateCache } from './core/data/UpdateCache';
export declare const QUERY_FACADE: DiToken<IQueryFacade>;
export declare const UPDATE_CACHE: DiToken<IUpdateCache>;
export declare const ENTITY_MANAGER: DiToken<IDatabaseFacade>;
