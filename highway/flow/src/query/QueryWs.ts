import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IQueryConfig,
	IQueryContext,
	IQueryRequest,
	IQueryResponse
} from './Query';
import { IQueryValidator } from './QueryValidator';

export interface IQueryWebService {

	handle(
		request: IQueryRequest,
		config: IQueryConfig,
		context: IQueryContext
	): Promise<IQueryResponse>;

}

@Injected()
export class QueryWebService
	implements IQueryWebService {

	@Inject()
	queryValidator: IQueryValidator

	async handle(
		request: IQueryRequest,
		config: IQueryConfig = {},
		context: IQueryContext
	): Promise<IQueryResponse> {
		try {
			this.queryValidator.validate(request);
		} catch (e) {
			return {
				error: e.message
			};
		}
	}

	// Look up the query mapping: should it be directed to Vespa, ScyllaDb or CockroachDbco
}
