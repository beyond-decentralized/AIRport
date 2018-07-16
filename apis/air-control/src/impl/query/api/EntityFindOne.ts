import {
	DbEntity,
	QueryResultType
}                                from "@airport/ground-control";
import {IEntitySelectProperties} from "../../../lingo/core/entity/Entity";
import {IDatabaseFacade}         from "../../../lingo/core/repository/DatabaseFacade";
import {IEntityFindOne}          from "../../../lingo/query/api/EntityFindOne";
import {RawEntityQuery}          from "../../../lingo/query/facade/EntityQuery";
import {IUtils}                  from "../../../lingo/utils/Utils";
import {EntityQuery}             from "../facade/EntityQuery";
import {EntityLookup}            from "./EntityLookup";

/**
 * Created by Papa on 11/12/2016.
 */

export class EntityFindOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntityFindOne<Entity, IESP>, EntityFindOne<Entity, IESP>>
	implements IEntityFindOne<Entity, IESP> {

	constructor(
		protected dbEntity: DbEntity,
		protected dbFacade: IDatabaseFacade,
		private utils: IUtils,
	) {
		super();
	}

	async graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<Entity> {
		const entityQuery: EntityQuery<IESP> = this.utils.Entity.getEntityQuery(rawGraphQuery);
		const cacheForUpdate                 = this.cleanNextCallState();

		return await this.dbFacade.entity.findOne<Entity>(
			this.dbEntity, entityQuery, QueryResultType.ENTITY_GRAPH, cacheForUpdate);
	}

	async tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<Entity> {
		const entityQuery: EntityQuery<IESP> = this.utils.Entity.getEntityQuery(rawTreeQuery);
		const cacheForUpdate                 = this.cleanNextCallState();

		return await this.dbFacade.entity.findOne<Entity>(
			this.dbEntity, entityQuery, QueryResultType.ENTITY_TREE, cacheForUpdate);
	}

}