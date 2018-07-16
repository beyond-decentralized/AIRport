import {
	DbEntity,
	QueryResultType
}                                from "@airport/ground-control";
import {Observable}              from "rxjs";
import {IEntitySelectProperties} from "../../../lingo/core/entity/Entity";
import {IDatabaseFacade}         from "../../../lingo/core/repository/DatabaseFacade";
import {IEntitySearch}           from "../../../lingo/query/api/EntitySearch";
import {RawEntityQuery}          from "../../../lingo/query/facade/EntityQuery";
import {MappedEntityArray}       from "../../../lingo/query/MappedEntityArray";
import {IUtils}                  from "../../../lingo/utils/Utils";
import {EntityQuery}             from "../facade/EntityQuery";
import {EntityLookup}            from "./EntityLookup";

/**
 * Created by Papa on 11/12/2016.
 */

export class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, EntitySearch<Entity, MappedEntityArray<Entity>, IESP>>
	implements IEntitySearch<Entity, EntityArray, IESP> {

	constructor(
		protected dbEntity: DbEntity,
		protected dbFacade: IDatabaseFacade,
		private utils: IUtils,
	) {
		super();
	}

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Observable<EntityArray> {
		let entityQuery: EntityQuery<IESP> = this.utils.Entity.getEntityQuery(rawGraphQuery);
		const cacheForUpdate               = this.cleanNextCallState();

		return this.dbFacade.entity.search(
			this.dbEntity, entityQuery, QueryResultType.ENTITY_GRAPH, cacheForUpdate);
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Observable<EntityArray> {
		let entityQuery: EntityQuery<IESP> = this.utils.Entity.getEntityQuery(rawTreeQuery);
		const cacheForUpdate               = this.cleanNextCallState();

		return this.dbFacade.entity.search(
			this.dbEntity, entityQuery, QueryResultType.ENTITY_TREE, cacheForUpdate);
	}

}