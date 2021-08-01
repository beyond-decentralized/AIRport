import {
	DATABASE_FACADE,
	Delete,
	IDatabaseFacade,
	IEntityContext,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFunctionWrapper,
	InsertColumnValues,
	InsertValues,
	IQEntity,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
	UpdateColumns,
	UpdateProperties,
} from '@airport/air-control'
import {
	container,
	DI,
	IContext
} from '@airport/di'
import {
	DbEntity,
	EntityRelationType,
	ISaveResult,
	PortableQuery,
	SQLDataType,
	TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control'
import {
	EntityState,
	ENTITY_STATE_MANAGER,
	IEntityStateManager
} from '@airport/pressurization'
import {
	DistributionStrategy,
	PlatformType
} from '@airport/terminal-map'

/**
 * Created by Papa on 5/23/2016.
 */
export class DatabaseFacade
	implements IDatabaseFacade {

	name: string

	async addRepository(
		name: string,
		url: string = null,
		platform: PlatformType = PlatformType.GOOGLE_DOCS,
		platformConfig: string = null,
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
		context: IContext
	): Promise<number> {
		// TODO: figure out how addRepository will work
		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.addRepository(
			name, url, platform, platformConfig, distributionStrategy, context)
	}

	async insertColumnValues<IQE extends IQEntity<any>>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IContext
	): Promise<number> {
		if (!rawInsertColumnValues) {
			return 0
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const insertColumnValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertColumnValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValues(portableQuery, context)
	}

	async insertValues<IQE extends IQEntity<any>>(
		rawInsertValues: RawInsertValues<IQE> | { (...args: any[]): RawInsertValues<IQE> },
		context: IContext
	): Promise<number> {
		if (!rawInsertValues) {
			return 0
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValues(portableQuery, context)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity<any>>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertColumnValues) {
			return []
		}
		if (rawInsertColumnValues instanceof Function) {
			rawInsertColumnValues = rawInsertColumnValues()
		}
		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValuesGetIds(portableQuery, context)
	}

	async insertValuesGenerateIds<IQE extends IQEntity<any>>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		context: IContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		if (!rawInsertValues) {
			return []
		}
		if (rawInsertValues instanceof Function) {
			rawInsertValues = rawInsertValues()
		}
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.insertValuesGetIds(portableQuery, context)
	}

	async deleteWhere<IQE extends IQEntity<any>>(
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
		context: IContext
	): Promise<number> {
		if (!rawDelete) {
			return 0
		}
		if (rawDelete instanceof Function) {
			rawDelete = rawDelete()
		}
		let deleteWhere: Delete<IQE> = new Delete(rawDelete)

		let portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			deleteWhere, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.deleteWhere(portableQuery, context)
	}

	async save<E>(
		entity: E,
		dbEntity: DbEntity,
		context: IEntityContext,
	): Promise<ISaveResult> {
		if (!entity) {
			return null
		}
		const [entityStateManager, transactionalConnector]
			= await container(this).get(ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR)

		this.setOperationState(entity, dbEntity, entityStateManager, new Set())
		const saveResult = await transactionalConnector.save(entity, context)
		
		this.updateOriginalValuesAfterSave(entity, dbEntity,
			saveResult, entityStateManager);
		this.removeDeletedEntities(entity, dbEntity, saveResult,
			entityStateManager, new Set())

		return saveResult
	}

	private setOperationState<E, T = E | E[]>(
		entity: T,
		dbEntity: DbEntity,
		entityStateManager: IEntityStateManager,
		processedEntities: Set<any>
	): void {
		if (entity instanceof Array) {
			for (var i = 0; i < entity.length; i++) {
				this.setOperationState(entity[i], dbEntity,
					entityStateManager, processedEntities)
			}
		} else {
			if (processedEntities.has(entity)) {
				return
			}
			processedEntities.add(entity)
			const originalValuesObject: any = entityStateManager
				.getOriginalValues(entity)

			let entityState: EntityState = entity[entityStateManager.getStateFieldName()]
			if (!entity['id']) {
				if (entityState === EntityState.DELETE) {
					throw new Error(
						'Entity is marked for deletion but does not have an "id" property')
				} else {
					entityState = EntityState.CREATE
				}
			}
			for (const dbProperty of dbEntity.properties) {
				const property = entity[dbProperty.name]
				if (dbProperty.relation) {
					this.setOperationState(property, dbProperty.relation[0].relationEntity,
						entityStateManager, processedEntities);
				} else {
					if (entityState) {
						continue
					}
					const originalValue = originalValuesObject[dbProperty.name]
					let propertyValue
					switch (dbProperty.propertyColumns[0].column.type) {
						case SQLDataType.DATE:
							propertyValue = (property as Date).toISOString()
							break;
						case SQLDataType.JSON:
							propertyValue = JSON.stringify(property)
							break;
						default:
							break;
					}
					if (propertyValue != originalValue) {
						entityState = EntityState.UPDATE
					}
				}
			}
			if (!entityState || entityStateManager.isDeleted(entity)) {
				entityState = EntityState.PARENT_ID
			}
			entity[entityStateManager.getStateFieldName()] = entityState
		}
	}

	updateOriginalValuesAfterSave<E, T = E | E[]>(
        entity: T,
		dbEntity: DbEntity,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
    ): any {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.updateOriginalValuesAfterSave(entity[i], dbEntity,
					saveResult, entityStateManager)
            }
        } else {
            let operationUniqueId = entityStateManager.getOperationUniqueId(entity)
            let createdRecordId = saveResult.created[operationUniqueId]
            if (createdRecordId) {
                entity['id'] = createdRecordId
            } else {
                let isDeleted = !!saveResult.deleted[operationUniqueId]
                if (isDeleted) {
                    entityStateManager.setIsDeleted(true, entity)
                }
            }
            let originalValue
            const entityState = serializedEntity[entityStateManager.getStateFieldName()]
            switch (entityState) {
                case EntityState.RESULT_DATE:
                    originalValue = {
                        value: (entity as any).toISOString()
                    }
                    originalValue[entityStateManager.getStateFieldName()] = entityState
                    return originalValue;
                case EntityState.RESULT_JSON:
                case EntityState.RESULT_JSON_ARRAY:
                    originalValue = {
                        value: JSON.stringify(entity)
                    }
                    originalValue[entityStateManager.getStateFieldName()] = entityState
                    return originalValue;
                case EntityState.STUB:
                    break;
                case EntityState.RESULT:
                    originalValue = {}
                    for (const propertyName in entity) {
                        const serializedProperty = serializedEntity[propertyName]
                        const property = entity[propertyName]
                        if (!(serializedProperty instanceof Object)) {
                            originalValue[propertyName] = property
                        } else {
                            const originalValue = this.doUpdateOriginalValuesAfterSave(
                                serializedProperty, property, saveResult, entityStateManager)
                            if (originalValue) {
                                originalValue[propertyName] = originalValue
                            }
                        }
                    }
                    break;
            }
            entityStateManager.setOriginalValues(originalValue, entity);
        }
	}

	private removeDeletedEntities<E, T = E | E[]>(
		entity: T,
		dbEntity: DbEntity,
		saveResult: ISaveResult,
		entityStateManager: IEntityStateManager,
		processedEntities: Set<any>
	): boolean {
		if (entity instanceof Array) {
			for (let i = entity.length - 1; i >= 0; i--) {
				if (this.removeDeletedEntities(
					entity[i], dbEntity, saveResult, entityStateManager, processedEntities)) {
					(entity as unknown as E[]).splice(i, 1)
				}
			}
			return !(entity as unknown as E[]).length
		} else {
			if (processedEntities.has(entity)) {
				return entityStateManager.isDeleted(entity)
			}
			processedEntities.add(entity)
			for (const dbRelation of dbEntity.relations) {
				const dbRelationProperty = dbRelation.property
				const property = entity[dbRelationProperty.name];
				if (!property) {
					continue
				}
				switch (dbRelation.relationType) {
					case EntityRelationType.MANY_TO_ONE:
						if (this.removeDeletedEntities(property, dbRelation.relationEntity,
							saveResult, entityStateManager, processedEntities)) {
							entity[dbRelationProperty.name] = null
						}
						break;
					case EntityRelationType.ONE_TO_MANY:
						this.removeDeletedEntities(property, dbRelation.relationEntity,
							saveResult, entityStateManager, processedEntities)
						break;
				}
			}
			return entityStateManager.isDeleted(entity)
		}
		return false
	}

	/**
	 * Updates an entity with a where clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity<any>>(
		rawUpdate: RawUpdateColumns<IEUC, IQE>
			| {
				(...args: any[]): RawUpdateColumns<IEUC, IQE>
			},
		context: IContext
	): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}

		let updateColumns: UpdateColumns<any, IQE> = new UpdateColumns(rawUpdate)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			updateColumns, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.updateValues(portableQuery, context)
	}

	async updateWhere<IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity<any>>(
			rawUpdate: RawUpdate<IEUP, IQE> | {
				(...args: any[]): RawUpdate<IEUP, IQE>
			},
			context: IContext
		): Promise<number> {
		if (!rawUpdate) {
			return 0
		}
		if (rawUpdate instanceof Function) {
			rawUpdate = rawUpdate()
		}
		let update: UpdateProperties<any, IQE> = new UpdateProperties(rawUpdate)
		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			update, null, context)

		const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
		return await transactionalConnector.updateValues(portableQuery, context)
	}

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF> {
		return <IFunctionWrapper<QF>><any>new FunctionWrapper<QF>(queryFunction)
	}

}

DI.set(DATABASE_FACADE, DatabaseFacade)

export class FunctionWrapper<QF extends Function>
	implements IFunctionWrapper<any> {

	constructor(queryFunction: QF) {
		throw new Error('Not Implemented')
	}

	find(...params: any[]): any {

	}
}
