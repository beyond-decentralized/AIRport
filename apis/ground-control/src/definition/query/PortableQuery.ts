import { Repository_GUID, Repository_LocalId } from '../core/types';
import { JsonStatement } from './facade/Query';
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
	applicationIndex?: number;
	tableIndex?: number;
	jsonQuery: JsonStatement;
	queryResultType: QueryResultType;
	parameterMap: {
		[alias: string]: IQueryParameter<any>
	};
	trackedRepoGUIDs?: Repository_GUID[]
	trackedRepoLocalIds?: Repository_LocalId[]
	// values?: any[];
}

export interface IApplicationQuery
	extends PortableQuery {
	parameterMap: {
		[alias: string]: IQueryParameter<QueryParameterPosition>
	};
}
