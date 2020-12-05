import {DI}                         from '@airport/di'
import {QUERY_RESULTS_DESERIALIZER} from '../tokens'

/**
 * Deserializer for query results coming back from the server
 */
export interface IQueryResultsDeserializer {

	deserialize<E, T = E | E[]>(
		entity: T,
		isOperation: boolean,
	): T

}

export class QueryResultsDeserializer
	implements IQueryResultsDeserializer {

	deserialize<E, T = E | E[]>(
		entity: T,
	): T {
		return null
	}

}

DI.set(QUERY_RESULTS_DESERIALIZER, QueryResultsDeserializer)
