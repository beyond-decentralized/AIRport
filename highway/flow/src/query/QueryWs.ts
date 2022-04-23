import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import {
	QUERY_VALIDATOR,
	QUERY_WEB_SERVICE
}             from '../tokens';
import {
	IQueryConfig,
	IQueryContext,
	IQueryRequest,
	IQueryResponse
}             from './Query';

export interface IQueryWebService {

	handle(
		request: IQueryRequest,
		config: IQueryConfig,
		context: IQueryContext
	): Promise<IQueryResponse>;

}

export class QueryWebService
	implements IQueryWebService {

	async handle(
		request: IQueryRequest,
		config: IQueryConfig = {},
		context: IQueryContext
	): Promise<IQueryResponse> {
		const queryValidator = await DEPENDENCY_INJECTION.db().get(QUERY_VALIDATOR);
		try {
			queryValidator.validate(request);
		} catch (e) {
			return {
				error: e.message
			};
		}
	}

	// Look up the query mapping: should it be directed to Vespa, ScyllaDb or CockroachDbco
}

DEPENDENCY_INJECTION.set(QUERY_WEB_SERVICE, QueryWebService);
