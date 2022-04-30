import {
	Injected
} from '@airport/direction-indicator'
import {
	IQueryRequest,
	QueryType
} from './Query';

export interface IQueryValidator {

	validate(
		request: IQueryRequest
	): void
}

@Injected()
export class QueryValidator
	implements IQueryValidator {

	validate(request: IQueryRequest) {
		switch (request.type) {
			case QueryType.DYNAMIC:
				throw new Error(`Dynamic queries are not (yet) supported by Highway.`);
			case QueryType.PREPARED:
				// TODO: implement
				return null;
			default:
				throw new Error(`Unknown Query type: ${request.type}`);
		}
	}
}
