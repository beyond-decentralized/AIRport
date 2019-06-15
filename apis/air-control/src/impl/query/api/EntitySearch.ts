import {DI}                      from '@airport/di'
import {
	DbEntity,
	QueryResultType
}                                from '@airport/ground-control'
import {
	IObservable,
	Observable
}                                from '@airport/observe'
import {ENTITY_UTILS}            from '../../../diTokens'
import {IEntitySelectProperties} from '../../../lingo/core/entity/Entity'
import {IDatabaseFacade}         from '../../../lingo/core/repository/DatabaseFacade'
import {IEntitySearch}           from '../../../lingo/query/api/EntitySearch'
import {RawEntityQuery}          from '../../../lingo/query/facade/EntityQuery'
import {MappedEntityArray}       from '../../../lingo/query/MappedEntityArray'
import {EntityQuery}             from '../facade/EntityQuery'
import {EntityLookup}            from './EntityLookup'

/**
 * Created by Papa on 11/12/2016.
 */

export class EntitySearch<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>
	extends EntityLookup<EntitySearch<Entity, Array<Entity>, IESP>, EntitySearch<Entity, MappedEntityArray<Entity>, IESP>>
	implements IEntitySearch<Entity, EntityArray, IESP> {

	constructor(
		protected dbEntity: DbEntity,
		protected dbFacade: IDatabaseFacade
	) {
		super()
	}

	graph(
		rawGraphQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<EntityArray> {
		return Observable.from(this.doSearch(rawGraphQuery, QueryResultType.ENTITY_TREE))
	}

	tree(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> }
	): IObservable<EntityArray> {
		return Observable.from(this.doSearch(rawTreeQuery, QueryResultType.ENTITY_TREE))
	}

	private async doSearch(
		rawTreeQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType
	): Promise<IObservable<EntityArray>> {
		let entityQuery: EntityQuery<IESP> = (await DI.get(ENTITY_UTILS)).getEntityQuery(rawTreeQuery)
		const cacheForUpdate               = this.cleanNextCallState()

		return this.dbFacade.entity.search(
			this.dbEntity, entityQuery, queryResultType, cacheForUpdate)

	}

}
