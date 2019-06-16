import { IQueryFacade } from '@airport/air-control';
import { DiToken } from '@airport/di';
import { ITransactionalServer } from './core/data/ITransactionalServer';
import { IUpdateCache } from './core/data/UpdateCache';
export declare const QUERY_FACADE: DiToken<IQueryFacade>;
export declare const UPDATE_CACHE: DiToken<IUpdateCache>;
export declare const TRANS_SERVER: DiToken<ITransactionalServer>;
