import { system }          from '@airport/di';
import { IQueryValidator } from './query/QueryValidator';

const hwFlow = system('airport').lib('hw-flow');

export const QUERY_VALIDATOR = hwFlow.token<IQueryValidator>('IQueryValidator');
