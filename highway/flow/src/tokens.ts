import { lib }           from '@airport/direction-indicator';
import { IQueryValidator }  from './query/QueryValidator';
import { IQueryWebService } from './query/QueryWs';

const hwFlow = lib('hw-flow');

export const QUERY_WEB_SERVICE = hwFlow.token<IQueryWebService>('IQueryWebService');
export const QUERY_VALIDATOR   = hwFlow.token<IQueryValidator>('IQueryValidator');
