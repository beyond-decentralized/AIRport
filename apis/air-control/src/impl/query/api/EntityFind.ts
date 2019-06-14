import {
	DbEntity,
	QueryResultType
}                                from "@airport/ground-control";
import {IEntitySelectProperties} from "../../../lingo/core/entity/Entity";
import {IDatabaseFacade}         from "../../../lingo/core/repository/DatabaseFacade";
import {IEntityFind}             from "../../../lingo/query/api/EntityFind";
import {RawEntityQuery}          from "../../../lingo/query/facade/EntityQuery";
import {MappedEntityArray}       from "../../../lingo/query/MappedEntityArray";
import {IUtils}                  from "../../../lingo/utils/Utils";
import {EntityQuery}             from "../facade/EntityQuery";
import {EntityLookup}            from "./EntityLookup";

/**
 * Created by Papa on 11/12/2016.
 */

export class EntityFind<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntityFind<Entity, Array<Entity>, IESP>, EntityFind<Entity, MappedEntityArray<Entity>, IESP>>
	implements IEntityFind<Entity, EntityArray, IESP> {

	constructor(
		protected dbEntity: DbEntity,
		protected dbFacade: IDatabaseFacade,
	) {
		super();
	}

	async graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<EntityArray> {
		const entityQuery: EntityQuery<IESP> = (await this.DI.get(this.UTILS)).Entity.getEntityQuery(rawGraphQuery);
		const cacheForUpdate                 = this.cleanNextCallState();

		return await this.dbFacade.entity.find<Entity, EntityArray>(
			this.dbEntity, entityQuery,
			this.getQueryResultType(QueryResultType.ENTITY_GRAPH), cacheForUpdate);
	}

	async tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<EntityArray> {
		const entityQuery: EntityQuery<IESP> = (await this.DI.get(this.UTILS)).Entity.getEntityQuery(rawTreeQuery);
		const cacheForUpdate                 = this.cleanNextCallState();

		return await this.dbFacade.entity.find<Entity, EntityArray>(
			this.dbEntity, entityQuery,
			this.getQueryResultType(QueryResultType.ENTITY_TREE), cacheForUpdate);
	}

}
