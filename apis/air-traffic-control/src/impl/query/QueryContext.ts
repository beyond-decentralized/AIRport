import {
	IQueryContext
} from '../../lingo/query/QueryContext';


export interface IQueryContextLoader {

	ensure(
		context: IQueryContext
	): Promise<void>

}

export class QueryContextLoader
	implements IQueryContextLoader {

	async ensure(
		context: IQueryContext
	): Promise<void> {
	}

}
