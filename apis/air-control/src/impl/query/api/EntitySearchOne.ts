import {
	DbEntity,
	QueryResultType
}                                from "@airport/ground-control";
import {IObservable}              from "@airport/observe";
import {IEntitySelectProperties} from "../../../lingo/core/entity/Entity";
import {IDatabaseFacade}         from "../../../lingo/core/repository/DatabaseFacade";
import {IEntitySearchOne}        from "../../../lingo/query/api/EntitySearchOne";
import {RawEntityQuery}          from "../../../lingo/query/facade/EntityQuery";
import {IUtils}                  from "../../../lingo/utils/Utils";
import {EntityQuery}             from "../facade/EntityQuery";
import {EntityLookup}            from "./EntityLookup";

/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearchOne<Entity, IESP>, EntitySearchOne<Entity, IESP>>
	implements IEntitySearchOne<Entity, IESP> {

	constructor(
		protected dbEntity: DbEntity,
		protected dbFacade: IDatabaseFacade,
		private utils: IUtils,
	) {
		super();
	}

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<Entity> {
		let entityQuery: EntityQuery<IESP> = this.utils.Entity.getEntityQuery(rawGraphQuery);
		const cacheForUpdate               = this.cleanNextCallState();

		return this.dbFacade.entity.searchOne(
			this.dbEntity, entityQuery, QueryResultType.ENTITY_GRAPH, cacheForUpdate);
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<Entity> {
		let entityQuery: EntityQuery<IESP> = this.utils.Entity.getEntityQuery(rawTreeQuery);
		const cacheForUpdate               = this.cleanNextCallState();

		return this.dbFacade.entity.searchOne(
			this.dbEntity, entityQuery, QueryResultType.ENTITY_TREE, cacheForUpdate);
	}

}