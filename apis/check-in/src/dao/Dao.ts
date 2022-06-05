import {
	and,
	doEnsureContext,
	IAirportDatabase,
	IDao,
	IDatabaseFacade,
	IEntityCascadeGraph,
	IEntityContext,
	IEntityCreateProperties,
	IEntityDatabaseFacade,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	ILookup,
	IQEntity,
	IUpdateCacheManager,
	RawEntityQuery,
	Y
} from '@airport/air-traffic-control';
import {
	QApplication,
	RepositoryEntityId,
	REPOSITORY_ENTITY_UTILS
} from '@airport/aviation-communication';
import {
	IContext,
	Inject,
	Injected,
	IOC
} from '@airport/direction-indicator'
import {
	EntityId as DbEntityId,
	IEntityStateManager,
	ISaveResult
} from '@airport/ground-control';
import { Observable } from 'rxjs';
import { EntityDatabaseFacade } from '../EntityDatabaseFacade';
import { DaoStub } from './DaoStub';

/**
 * Created by Papa on 8/26/2017.
 */
@Injected()
export abstract class Dao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	QE extends IQEntity>
	implements IDao<Entity, EntitySelect, EntityCreate,
	EntityUpdateColumns, EntityUpdateProperties, EntityId,
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
	airportDatabase: IAirportDatabase

	@Inject()
	databaseFacade: IDatabaseFacade

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	lookup: ILookup

	@Inject()
	updateCacheManager: IUpdateCacheManager

	db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId,
		EntityCascadeGraph, QE>;

	stub = new DaoStub<Entity, EntityCreate>();

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
			EntityUpdateColumns, EntityUpdateProperties, EntityId,
			EntityCascadeGraph, QE>(
				dbEntity, Q, this);
	}

	async count(
		context?: IContext,
	): Promise<number> {
		throw new Error(`Not Implemented`);
	}

	exists(
		entityId: EntityId,
		context?: IContext,
	): Promise<boolean> {
		throw new Error(`Not Implemented`);
	}

	async findAll(
		entityIds?: EntityId[],
		context?: IContext,
		cacheForUpdate: boolean = false,
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`);
		}
		return await this.db.find.graph({
			select: <any>{},
			from: [this.db.from],
		}, context);
	}

	async findAllAsTrees(
		entityIds?: EntityId[],
		context?: IContext,
		cacheForUpdate: boolean = false,
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`);
		}
		return await this.db.find.tree({
			select: <any>{},
			from: [this.db.from],
		}, context);
	}

	async findById(
		repositoryEntityId: RepositoryEntityId | string,
		context?: IContext,
		cacheForUpdate: boolean = false,
	): Promise<Entity> {
		if (typeof repositoryEntityId === 'string') {
			repositoryEntityId = IOC.getSync(REPOSITORY_ENTITY_UTILS)
				.parseId(repositoryEntityId)
		}
		if (!this.db.dbEntity.isRepositoryEntity) {
			throw new Error(`Dao.findById can only be called for Repository Entities.`)
		}
		if (!repositoryEntityId.repository
			|| !repositoryEntityId.repository.id
			|| typeof repositoryEntityId.repository.id !== 'number'
			|| !repositoryEntityId.actor
			|| !repositoryEntityId.actor.id
			|| typeof repositoryEntityId.actor.id !== 'number'
			|| !repositoryEntityId.actorRecordId
			|| typeof repositoryEntityId.actorRecordId !== 'number') {
			throw new Error(`Invalid Repository Entity Id.  Expecting:
				interface RepositoryEntityId {
					repository: {
						id: number
					},
					actor: {
						id: number
					},
					actorRecordId: number
				}
				`)
		}
		let q
		return await this.db.findOne.graph({
			select: <any>{},
			from: [q = this.db.from],
			where: and(
				q.repository.id.equals(repositoryEntityId.repository.id),
				q.actor.id.equals(repositoryEntityId.actor.id),
				q.actorRecordId.equals(repositoryEntityId.actorRecordId),
			)
		}, context)
	}

	async findByUuId(
		repositoryEntityUuId: RepositoryEntityId | string,
		context?: IContext
	): Promise<Entity> {
		if (typeof repositoryEntityUuId === 'string') {
			repositoryEntityUuId = IOC.getSync(REPOSITORY_ENTITY_UTILS)
				.parseUuId(repositoryEntityUuId)
		}
		if (!this.db.dbEntity.isRepositoryEntity) {
			throw new Error(`Dao.findByUuId can only be called for Repository Entities.`)
		}
		const idObject: RepositoryEntityId = repositoryEntityUuId as RepositoryEntityId
		if (!idObject.repository
			|| !idObject.repository.uuId
			|| typeof idObject.repository.uuId !== 'string'
			|| !idObject.actor
			|| !idObject.actor.uuId
			|| typeof idObject.actor.uuId !== 'number'
			|| !idObject.actorRecordId
			|| typeof idObject.actorRecordId !== 'number') {
			throw new Error(`Invalid Repository Entity Id.  Expecting:
				interface RepositoryEntityId {
					repository: {
						uuId: string
					},
					actor: {
						uuId: string
					},
					actorRecordId: number
				}
				`)
		}
		let q, r, a
		return await this.db.findOne.graph({
			select: <any>{},
			from: [
				q = this.db.from,
				r = q.repository.leftJoin(),
				a = q.actor.leftJoin()
			],
			where: and(
				r.uuId.equals(idObject.repository.uuId),
				a.uuId.equals(idObject.actor.uuId),
				q.actorRecordId.equals(idObject.actorRecordId),
			)
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
				id: Y,
				uuId: Y
			},
			actorRecordId: Y,
			ageSuitability: Y,
			repository: {
				id: Y,
				uuId: Y
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
