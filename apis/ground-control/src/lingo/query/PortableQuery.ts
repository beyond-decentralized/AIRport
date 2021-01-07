import { JsonStatement }   from './facade/Query';
import { QueryResultType } from './QueryResultType';

/**
 * Created by Papa on 11/12/2016.
 */

export type QueryParameterPosition = number;

export interface IQueryParameter<Value> {
	alias: string;
	value: Value
}

export interface PortableQuery {
	schemaIndex?: number;
	tableIndex?: number;
	jsonQuery: JsonStatement;
	queryResultType: QueryResultType;
	parameterMap: {
		[alias: string]: IQueryParameter<any>
	};
	// values?: any[];
}

export interface ISchemaQuery
	extends PortableQuery {
	parameterMap: {
		[alias: string]: IQueryParameter<QueryParameterPosition>
	};
}
