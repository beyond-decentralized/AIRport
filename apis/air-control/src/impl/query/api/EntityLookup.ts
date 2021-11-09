import { DI } from '@airport/di'
import {
	DbEntity,
	ENTITY_STATE_MANAGER,
	QueryResultType
} from '@airport/ground-control'
import { IEntityContext } from '../../../lingo/core/EntityContext'
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity'
import { IEntityLookup } from '../../../lingo/query/api/EntityLookup'
import { RawEntityQuery } from '../../../lingo/query/facade/EntityQuery'
import {
	REPOSITORY_LOADER,
	SCHEMA_UTILS,
	UPDATE_CACHE_MANAGER
} from '../../../tokens'
import { LookupProxy } from './Lookup'

export interface IEntityLookupInternal<Child, MappedChild,
	IESP extends IEntitySelectProperties>
	extends IEntityLookup<Child, MappedChild> {

	entityLookup(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		context: IEntityContext
	): Promise<any>

	setMap(
		MappedChildClass: new (
			dbEntity: DbEntity,
			mapResults: boolean
		) => MappedChild,
		isMapped: boolean
	): MappedChild

	setNoCache(
		ChildClass: new (
			dbEntity: DbEntity,
			mapResults: boolean
		) => Child
	): Child

}

export abstract class EntityLookup<Child, MappedChild,
	IESP extends IEntitySelectProperties>
	extends LookupProxy
	implements IEntityLookupInternal<Child, MappedChild, IESP> {

	static mapResults = false

	constructor(
		protected dbEntity: DbEntity,
		protected mapResults = EntityLookup.mapResults,
		protected repositorySource: string = null,
		protected repositoryUuid: string = null,
	) {
		super()
	}

	abstract map(
		isMapped?: boolean
	): MappedChild

	setMap(
		MappedChildClass: new (
			dbEntity: DbEntity,
			mapResults: boolean
		) => MappedChild,
		isMapped = true
	): MappedChild {
		return new MappedChildClass(this.dbEntity, isMapped)
	}

	setNoCache(
		ChildClass: new (
			dbEntity: DbEntity,
			mapResults: boolean
		) => Child
	): Child {
		return new ChildClass(this.dbEntity, this.mapResults)
	}

	async entityLookup(
		rawEntityQuery: RawEntityQuery<IESP> | { (...args: any[]): RawEntityQuery<IESP> },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		context: IEntityContext
	): Promise<any> {
		context.dbEntity = this.dbEntity
		if (this.repositorySource && this.repositoryUuid) {
			const repositoryLoader = await DI.db().get(REPOSITORY_LOADER)
			await repositoryLoader.loadRepository(this.repositorySource, this.repositoryUuid)
		}
		const result = await this.lookup(rawEntityQuery, queryResultType,
			search, one, null, context, this.mapResults)
		const [entityStateManager, schemaUtils, updateCacheManager] =
			await DI.db().get(ENTITY_STATE_MANAGER, SCHEMA_UTILS, UPDATE_CACHE_MANAGER)
		if (search) {
			throw new Error(`Search operations are not yet supported`);
		} else {
			updateCacheManager.saveOriginalValues(
				result, context.dbEntity, entityStateManager, schemaUtils)
		}
		return result
	}

}
