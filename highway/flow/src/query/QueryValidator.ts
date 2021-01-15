import { DI }              from '@airport/di';
import { QUERY_VALIDATOR } from '../tokens';

export interface IQueryValidator {

}

export class QueryValidator
	implements IQueryValidator {

}

DI.set(QUERY_VALIDATOR, QueryValidator);
