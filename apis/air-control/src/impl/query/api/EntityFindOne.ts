import {DI}                      from '@airport/di'
import {
	DbEntity,
	QueryResultType
}                                from '@airport/ground-control'
import {ENTITY_UTILS}            from '../../../diTokens'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IDatabaseFacade}         from '../../../lingo/core/repository/DatabaseFacade'
import {IEntityFindOne}          from '../../../lingo/query/api/EntityFindOne'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {EntityQuery}             from '../facade/EntityQuery'
import {EntityLookup}            from './EntityLookup'

/**
 * Created by Papa on 11/12/2016.
 */

export class EntityFindOne<Entity, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntityFindOne<Entity, IESP>, EntityFindOne<Entity, IESP>>
	implements IEntityFindOne<Entity, IESP> {

	constructor(
		protected dbEntity: DbEntity,
		protected dbFacade: IDatabaseFacade
	) {
		super()
	}

	async graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<Entity> {
		const entityQuery: EntityQuery<IESP> = (await DI.get(ENTITY_UTILS)).getEntityQuery(rawGraphQuery)
		const cacheForUpdate                 = this.cleanNextCallState()

		return await this.dbFacade.entity.findOne<Entity>(
			this.dbEntity, entityQuery, QueryResultType.ENTITY_GRAPH, cacheForUpdate)
	}

	async tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<Entity> {
		const entityQuery: EntityQuery<IESP> = (await DI.get(ENTITY_UTILS)).getEntityQuery(rawTreeQuery)
		const cacheForUpdate                 = this.cleanNextCallState()

		return await this.dbFacade.entity.findOne<Entity>(
			this.dbEntity, entityQuery, QueryResultType.ENTITY_TREE, cacheForUpdate)
	}

}
