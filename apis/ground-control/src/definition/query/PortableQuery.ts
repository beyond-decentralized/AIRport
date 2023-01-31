import { Repository_GUID, Repository_LocalId } from '../core/types';
import { QueryWhereBase } from './facade/Query';
import { QueryResultType } from './QueryResultType';

/**
 * Created by Papa on 11/12/2016.
 */

export type QueryParameterPosition = number;

export interface PortableQueryParameter<Value> {
	alias: string;
	value: Value
}

export interface PortableQuery {
	applicationIndex?: number;
	tableIndex?: number;
	query: QueryWhereBase;
	queryResultType: QueryResultType;
	parameterMap: {
		[alias: string]: PortableQueryParameter<any>
	};
	trackedRepoGUIDs?: Repository_GUID[]
	trackedRepoLocalIds?: Repository_LocalId[]
	// values?: any[];
}

export interface PortableApplicationQuery
	extends PortableQuery {
	parameterMap: {
		[alias: string]: PortableQueryParameter<QueryParameterPosition>
	};
}
