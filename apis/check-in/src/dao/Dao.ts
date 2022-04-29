import {
	doEnsureContext,
	IAirportDatabase,
	IDao,
	IEntityCascadeGraph,
	IEntityContext,
	IEntityCreateProperties,
	IEntityDatabaseFacade,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	IUpdateCacheManager,
	QApplication,
	Y
} from '@airport/air-control';
import {
	IContext
} from '@airport/direction-indicator';
import {
	EntityId as DbEntityId,
	IEntityStateManager,
	ISaveResult
} from '@airport/ground-control';
import { EntityDatabaseFacade } from '../EntityDatabaseFacade';
import { DaoStub } from './DaoStub';

/**
 * Created by Papa on 8/26/2017.
 */
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

	airportDatabase: IAirportDatabase
	entityStateManager: IEntityStateManager
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
				dbEntity, Q, this.updateCacheManager);
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

	protected repositoryId() {
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

	findById(
		entityId: EntityId,
		context?: IContext,
		cacheForUpdate: boolean = false,
	): Promise<Entity> {
		throw new Error(`Not implemented`);
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

	private ensureContext(
		context: IContext,
	): IEntityContext {
		return doEnsureContext(context) as IEntityContext;
	}
}
