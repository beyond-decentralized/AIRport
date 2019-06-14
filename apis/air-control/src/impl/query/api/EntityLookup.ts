import {DI}              from '@airport/di'
import {QueryResultType} from "@airport/ground-control";
import {UTILS}           from '../../../diTokens'
import {
	IUtils,
}                        from '../../../lingo/utils/Utils'
import {
	IEntityLookup,
	UpdateCacheType
}                        from "../../../lingo/query/api/EntityLookup";

export abstract class EntityLookup<Child, MappedChild>
	implements IEntityLookup<Child, MappedChild> {

	isMapped = false;
	private saveNextCallInUpdateCache = UpdateCacheType.NONE;

	protected DI = DI
	protected UTILS = UTILS

	get mapped(): MappedChild {
		this.isMapped = true;
		return <any>this;
	}

	getQueryResultType(
		baseQueryResultType: QueryResultType
	): QueryResultType {
		switch (baseQueryResultType) {
			case QueryResultType.ENTITY_GRAPH:
				if (this.isMapped) {
					return QueryResultType.MAPPED_ENTITY_GRAPH;
				}
				return QueryResultType.ENTITY_GRAPH;
			case QueryResultType.ENTITY_TREE:
				if (this.isMapped) {
					return QueryResultType.MAPPED_ENTITY_TREE;
				}
				return QueryResultType.ENTITY_TREE;
			default:
				throw `Unexpected Base Query ResultType: '${baseQueryResultType}'.`;
		}
	}

	andCacheForUpdate(
		cacheForUpdateState: UpdateCacheType = UpdateCacheType.ROOT_QUERY_ENTITIES
	): Child {
		this.saveNextCallInUpdateCache = cacheForUpdateState;
		return <Child><any>this;
	}

	protected cleanNextCallState(): UpdateCacheType {
		const saveCurrentCallInUpdateCache = this.saveNextCallInUpdateCache;
		this.saveNextCallInUpdateCache     = UpdateCacheType.NONE;

		return saveCurrentCallInUpdateCache;
	}

}
