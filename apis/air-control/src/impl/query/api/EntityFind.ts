import {DI}                      from '@airport/di'
import {
	DbEntity,
	QueryResultType
}                                from '@airport/ground-control'
import {
	ENTITY_MANAGER,
	ENTITY_UTILS
} from '../../../diTokens'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IDatabaseFacade}         from '../../../lingo/core/repository/DatabaseFacade'
import {IEntityFind}             from '../../../lingo/query/api/EntityFind'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {MappedEntityArray}       from '../../../lingo/query/MappedEntityArray'
import {EntityQuery}             from '../facade/EntityQuery'
import {EntityLookup}            from './EntityLookup'

/**
 * Created by Papa on 11/12/2016.
 */

export class EntityFind<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntityFind<Entity, Array<Entity>, IESP>, EntityFind<Entity, MappedEntityArray<Entity>, IESP>>
	implements IEntityFind<Entity, EntityArray, IESP> {

	constructor(
		protected dbEntity: DbEntity
	) {
		super()
	}

	async graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<EntityArray> {
		const [entityUtils, dbFacade] = await DI.get(ENTITY_UTILS, ENTITY_MANAGER)
		const entityQuery             = entityUtils.getEntityQuery(rawGraphQuery)
		const cacheForUpdate                 = this.cleanNextCallState()

		return await dbFacade.entity.find<Entity, EntityArray>(
			this.dbEntity, entityQuery,
			this.getQueryResultType(QueryResultType.ENTITY_GRAPH), cacheForUpdate)
	}

	async tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): Promise<EntityArray> {
		const [entityUtils, dbFacade] = await DI.get(ENTITY_UTILS, ENTITY_MANAGER)
		const entityQuery             = entityUtils.getEntityQuery(rawTreeQuery)
		const cacheForUpdate                 = this.cleanNextCallState()

		return await dbFacade.entity.find<Entity, EntityArray>(
			this.dbEntity, entityQuery,
			this.getQueryResultType(QueryResultType.ENTITY_TREE), cacheForUpdate)
	}

}
