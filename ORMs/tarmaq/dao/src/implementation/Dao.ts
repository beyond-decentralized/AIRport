import {
	QApplication,
	AirEntityId
} from '@airport/aviation-communication';
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ApplicationEntity_LocalId as DbEntityId,
	IEntityStateManager,
	IAirEntity,
	ISaveResult,
	IUpdateCacheManager
} from '@airport/ground-control';

import { IEntityContext } from '@airport/tarmaq-entity';
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	RawEntityQuery,
	Y
} from '@airport/tarmaq-query';
import { Observable } from 'rxjs';
import { IDao } from '../definition/Dao';
import { IDatabaseFacade } from '../definition/IDatabaseFacade';
import { IEntityDatabaseFacade } from '../definition/IEntityDatabaseFacade';
import { ILookup } from '../definition/query/Lookup';
import { EntityDatabaseFacade } from './EntityDatabaseFacade';
import { doEnsureContext } from './query/Lookup';

/**
 * Created by Papa on 8/26/2017.
 */
@Injected()
export abstract class Dao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	QE extends IQEntity>
	implements IDao<Entity, EntitySelect, EntityCreate,
	EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId,
	EntityCascadeGraph, QE> {

	static BaseSave<EntitySelect extends IEntitySelectProperties>(
		config: EntitySelect
	): PropertyDecorator {
		return function (
			target: any,
			propertyKey: string
		) {
			// No runtime logic required.
		};
	}

	@Inject()
	databaseFacade: IDatabaseFacade

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	lookup: ILookup

	@Inject()
	updateCacheManager: IUpdateCacheManager

	db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId,
		EntityCascadeGraph, QE>;

	constructor(
		dbEntityId: DbEntityId,
		Q: QApplication,
		private internal = false
	) {
		const dbEntity = Q.__dbApplication__.currentVersion[0]
			.applicationVersion.entities[dbEntityId];
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		this.db = new EntityDatabaseFacade<Entity,
			EntitySelect, EntityCreate,
			EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId,
			EntityCascadeGraph, QE>(
				dbEntity, Q, this);
	}

	mapById(
		entities: (Entity & IAirEntity)[]
	): Map<string, Entity> {
		const map = new Map()
		for (const entity of entities) {
			map.set(entity.id, entity)
		}

		return map
	}

	async count(
		context?: IContext,
	): Promise<number> {
		throw new Error(`Not Implemented`);
	}

	exists(
		entityId: ApplicationEntity_LocalId,
		context?: IContext,
	): Promise<boolean> {
		throw new Error(`Not Implemented`);
	}

	async findAll(
		entityIds?: ApplicationEntity_LocalId[],
		context?: IContext,
		cacheForUpdate: boolean = false,
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`);
		}
		return await this.db.find.graph({
			SELECT: <any>{},
			FROM: [this.db.FROM],
		}, context);
	}

	async findAllAsTrees(
		entityIds?: ApplicationEntity_LocalId[],
		context?: IContext,
		cacheForUpdate: boolean = false,
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`);
		}
		return await this.db.find.tree({
			SELECT: <any>{},
			FROM: [this.db.FROM],
		}, context);
	}

	async findOne(
		AirEntityId: Entity | AirEntityId | string,
		forUpdate: boolean = false,
		context?: IContext
	): Promise<Entity> {
		if (!this.db.dbEntity.isAirEntity) {
			throw new Error(`Dao.findOne can only be called for Repository Entities.`)
		}
		const idObject: AirEntityId = AirEntityId as AirEntityId

		let q
		return await this.db.findOne.graph({
			SELECT: <any>{
				'*': Y
			},
			FROM: [
				q = this.db.FROM
			],
			WHERE: q.equals(idObject),
			FOR_UPDATE: forUpdate
		}, context)
	}

	async save<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo,
		context?: IContext,
	): Promise<ISaveResult> {
		return await this.db.save(<EntityCreate>entity,
			this.ensureContext(context));
	}

	markForDeletion<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityIdInfo: EntityInfo,
		context?: IContext,
	): void {
		if (entityIdInfo instanceof Array) {
			for (const anEntity of entityIdInfo) {
				this.entityStateManager.markForDeletion(anEntity);
			}
		} else {
			this.entityStateManager.markForDeletion(entityIdInfo);
		}
	}

	protected _repositoryId() {
		return {
			actor: {
				_localId: Y
			},
			_actorRecordId: Y,
			ageSuitability: Y,
			repository: {
				_localId: Y
			}
		}
	}

	/**
	 * The Promise based API for all Entity 'find' (find many) queries.
	 */
	protected async _find(
		rawGraphQuery: RawEntityQuery<EntitySelect>
			| { (...args: any[]): RawEntityQuery<EntitySelect> },
		ctx?: IContext
	): Promise<Array<Entity>> {
		return await this.db.find.graph(rawGraphQuery, ctx)
	}

	/**
	 * The Promise based API for all Entity 'findOne' that also
	 * ensures that the record is unique.  If multiple records
	 * are found the ones with older createdAt values are deleted.
	 */
	protected async _findUnique<E extends IAirEntity & Entity>(
		rawGraphQuery: RawEntityQuery<EntitySelect>
			| { (...args: any[]): RawEntityQuery<EntitySelect> },
		ctx?: IContext
	): Promise<E> {
		const records: E[] = await this.db.find.graph(rawGraphQuery, ctx) as E[]

		if (!records.length) {
			return null
		}

		if (records.length > 1) {
			// Remove older agreement records
			records.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			for (let i = 1; i < records.length; i++) {
				this.markForDeletion(records[i] as any)
			}
			await this.save(records as any)
		}

		return records[0];
	}

	/**
	 * The Promise based API for all Entity 'findOne' queries.
	 */
	protected async _findOne(
		rawGraphQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> },
		ctx?: IContext
	): Promise<Entity> {
		return await this.db.findOne.graph(rawGraphQuery, ctx)
	}

	/**
	 * The Observable based API for all Entity 'searchOne' (searchOne many) queries.
	 */
	protected _search(
		rawGraphQuery: RawEntityQuery<EntitySelect>
			| { (...args: any[]): RawEntityQuery<EntitySelect> },
		ctx?: IContext
	): Observable<Array<Entity>> {
		throw new Error('Not implemented')
	}

	/**
	 * The Observable based API for all Entity 'searchOne' queries.
	 */
	protected _searchOne(
		rawGraphQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> },
		ctx?: IContext
	): Observable<Entity> {
		throw new Error('Not implemented')
	}

	private ensureContext(
		context: IContext,
	): IEntityContext {
		return doEnsureContext(context) as IEntityContext;
	}
}
