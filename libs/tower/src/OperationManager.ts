import {
	and,
	Delete,
	EntityIdData,
	IAirportDatabase,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFieldUtils,
	InsertColumnValues,
	InsertValues,
	IQEntity,
	IQMetadataUtils,
	IQueryFacade,
	IQueryUtils,
	ISchemaUtils,
	isStub,
	IUpdateCache,
	QUERY_FACADE,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	UpdateColumns,
	UpdateProperties,
	UpdateRecord,
	valuesEqual
}           from '@airport/air-control'
import {DI} from '@airport/di'
import {
	CascadeOverwrite,
	CascadeType,
	CRUDOperation,
	DbColumn,
	DbEntity,
	DbProperty,
	DbRelation,
	ensureChildArray,
	ensureChildMap,
	EntityRelationType,
	ITransactionalConnector,
	JSONValueOperation,
	PortableQuery,
	SQLDataType,
	TRANS_CONNECTOR
}           from '@airport/ground-control'

/**
 * Created by Papa on 11/15/2016.
 */

export interface ResultWithCascade {
	recordChanged?: boolean;
	numberOfAffectedRecords: number;
	cascadeRecords: CascadeRecord[];
}

export interface CascadeRecord {
	relation: DbRelation;
	manyEntities: any[];
}

export interface IOperationManager {

	throwUnexpectedProperty(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	);

}

export abstract class OperationManager
	implements IOperationManager {

	// higherOrderOpsYieldLength: number = 100
	// transactionInProgress: boolean    = false

	throwUnexpectedProperty(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	) {
		throw new Error(
			`Unexpected property value '${value.toString()}' in property '${dbProperty.entity.name}.${dbProperty.name}'
		(column: '${dbColumn.name}').`)
	}

	protected warn(message: string) {
		console.log(message)
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 *
	 * @param qEntity
	 * @param entity
	 */
	protected async performCreate<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entity: E,
		createdEntityMap: { [entityId: string]: any }[][],
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		metadataUtils: IQMetadataUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		idData?: EntityIdData,
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT
	): Promise<number> {
		let result = await this.internalCreate(dbEntity, [entity],
			createdEntityMap, !idData,
			airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils,
			transConnector, cascadeOverwrite)

		await this.cascadeOnPersist(result.cascadeRecords, dbEntity,
			createdEntityMap, airDb, fieldUtils, metadataUtils,
			queryFacade, queryUtils, schemaUtils, transConnector,
			updateCache, cascadeOverwrite)

		return result.numberOfAffectedRecords
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 *
	 * @param qEntity
	 * @param entity
	 */
	protected async performBulkCreate<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entities: E[],
		createdEntityMap: { [entityId: string]: any }[][],
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		metadataUtils: IQMetadataUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		checkIfProcessed: boolean                               = true,
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT,
		ensureGeneratedValues: boolean                          = true // For internal use only
	): Promise<number> {
		let result = await this.internalCreate(dbEntity, entities,
			createdEntityMap, checkIfProcessed,
			airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils,
			transConnector, cascadeOverwrite, ensureGeneratedValues)
		await this.cascadeOnPersist(result.cascadeRecords, dbEntity,
			createdEntityMap, airDb, fieldUtils, metadataUtils,
			queryFacade, queryUtils, schemaUtils, transConnector,
			updateCache, cascadeOverwrite)

		return result.numberOfAffectedRecords
	}

	protected async internalInsertColumnValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): Promise<number> {
		const [transConnector, queryFacade] = await DI.get(TRANS_CONNECTOR, QUERY_FACADE)

		const insertColumnValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = queryFacade.getPortableQuery(
			dbEntity, insertColumnValues, null, queryUtils, fieldUtils)

		return await transConnector.insertValues(portableQuery)
	}

	protected async internalInsertValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		ensureGeneratedValues?: boolean
	): Promise<number> {
		const [transConnector, queryFacade] = await DI.get(TRANS_CONNECTOR, QUERY_FACADE)

		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = queryFacade.getPortableQuery(
			dbEntity, insertValues, null, queryUtils, fieldUtils)

		return await transConnector.insertValues(portableQuery, undefined, ensureGeneratedValues)
	}

	protected async internalInsertColumnValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): Promise<number[] | string[] | number[][] | string[][]> {
		const [transConnector, queryFacade] = await DI.get(TRANS_CONNECTOR, QUERY_FACADE)

		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = queryFacade.getPortableQuery(
			dbEntity, insertValues, null, queryUtils, fieldUtils)

		return await transConnector.insertValuesGetIds(portableQuery)
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 *
	 * @param qEntity
	 * @param entity
	 */
	protected async performUpdate<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entity: E,
		updatedEntityMap: { [entityId: string]: any } [][],
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		metadataUtils: IQMetadataUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		originalValue?: E,
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT
	): Promise<number> {
		if (!originalValue) {
			let [isProcessed, entityIdData] = this.isProcessed(
				entity, updatedEntityMap, dbEntity, schemaUtils)
			if (isProcessed === true) {
				return 0
			}
			if (!entityIdData.idKey) {
				throw new Error(
					`Cannot update ${dbEntity.name}, not all @Id(s) are set.`)
			}
			originalValue = await this.getOriginalRecord(
				dbEntity, entityIdData.idKey, updateCache)
			// if (!originalValue) {
			// 	throw new Error(`Cannot update ${dbEntity.name}, entity not found.`)
			// }
		}
		let result = await this.internalUpdate(
			dbEntity, entity, originalValue, airDb,
			fieldUtils, queryFacade, queryUtils,
			schemaUtils, transConnector, updateCache, cascadeOverwrite)
		await this.cascadeOnPersist(result.cascadeRecords, dbEntity,
			updatedEntityMap, airDb, fieldUtils, metadataUtils,
			queryFacade, queryUtils, schemaUtils, transConnector,
			updateCache, cascadeOverwrite)

		return result.numberOfAffectedRecords
	}

	protected async internalInsertValuesGetIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE>,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		transConnector: ITransactionalConnector
	): Promise<number[] | string[] | number[][] | string[][]> {

		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = queryFacade.getPortableQuery(
			dbEntity, insertValues, null, queryUtils, fieldUtils)

		return await transConnector.insertValuesGetIds(portableQuery)
	}

	protected abstract async getOriginalRecord(
		dbEntity: DbEntity,
		idKey: string,
		updateCache: IUpdateCache
	): Promise<any>;

	/*
	protected abstract async getOriginalValues(
		entitiesToUpdate: UpdateRecord[],
		dbEntity: DbEntity,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache
	): Promise<MappedEntityArray<any>>;
*/

	/*
	protected getIdsWhereClause(
		entitiesToUpdate: UpdateRecord[],
		qEntity: IQEntity
	): JSONBaseOperation {
		let idsWhereClause: JSONBaseOperation
		if (entitiesToUpdate[0].idData.idColumnValueData.length > 1) {
			let idsWhereClauseFragments = entitiesToUpdate.map((entityToUpdate) => {
				let singleIdWhereClauseFragments: JSONValueOperation[] = entityToUpdate.idData.idColumnValueData.map((
					referencedData: {
						idColumn: DbColumn,
						idValue: number | string,
						propertyNameChains: string[][],
					}) => {
					let currentQObject: any = qEntity
					for (const propertyName of referencedData.propertyNameChains[0]) {
						currentQObject = currentQObject[propertyName]
					}
					return currentQObject.equals(referencedData.idValue)
				})
				return and(...singleIdWhereClauseFragments)
			})
			if (entitiesToUpdate.length > 1) {
				idsWhereClause = or(...idsWhereClauseFragments)
			} else {
				return idsWhereClauseFragments[0]
			}
		} else {
			let idsWhereClauseFragments = entitiesToUpdate.map((entityToUpdate) => {
				return entityToUpdate.idData.idColumnValueData[0].idValue
			})
			let currentQObject: any     = qEntity
			for (const propertyName of entitiesToUpdate[0].idData.idColumnValueData[0].propertyNameChains[0]) {
				currentQObject = currentQObject[propertyName]
			}
			if (entitiesToUpdate.length > 1) {
				idsWhereClause = currentQObject.in(idsWhereClauseFragments)
			} else {
				idsWhereClause = currentQObject.equals(idsWhereClauseFragments[0])
			}
		}

		return idsWhereClause
	}
*/

	protected async internalUpdateColumnsWhere<IEUC extends IEntityUpdateColumns,
		IQE extends IQEntity>(
		dbEntity: DbEntity,
		updateColumns: UpdateColumns<IEUC, IQE>,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		transConnector: ITransactionalConnector
	): Promise<number> {
		const portableQuery: PortableQuery = queryFacade.getPortableQuery(
			dbEntity, updateColumns, null, queryUtils, fieldUtils)

		return await transConnector.updateValues(portableQuery)
	}

	protected async internalUpdateWhere<E, IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
		dbEntity: DbEntity,
		update: UpdateProperties<IEUP, IQE>,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		transConnector: ITransactionalConnector
	): Promise<number> {
		const portableQuery: PortableQuery = queryFacade.getPortableQuery(
			dbEntity, update, null, queryUtils, fieldUtils)

		return await transConnector.updateValues(portableQuery)
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 * @param qEntity
	 * @param entity
	 */
	protected async performDelete<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entity: E,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector
	): Promise<number> {
		return await this.internalDelete(
			dbEntity, entity, airDb, fieldUtils,
			queryFacade, queryUtils, schemaUtils, transConnector)

		// Delete cascading is done on the server - there is no new information
		// to pull for this from the client
	}

	protected async internalDeleteWhere<E, IQE extends IQEntity>(
		dbEntity: DbEntity,
		aDelete: Delete<IQE>,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		transConnector: ITransactionalConnector
	): Promise<number> {
		let portableQuery: PortableQuery = queryFacade.getPortableQuery(
			dbEntity, aDelete, null, queryUtils, fieldUtils)

		return await transConnector.deleteWhere(portableQuery)
	}

	private async internalCreate<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entities: E[],
		createdEntityMap: { [entityId: string]: any }[][],
		checkIfProcessed: boolean,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		metadataUtils: IQMetadataUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph,
		ensureGeneratedValues?: boolean
	): Promise<ResultWithCascade> {
		const qEntity = airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]

		let rawInsert: RawInsertValues<any> = {
			insertInto: qEntity,
			columns: metadataUtils.getAllNonGeneratedColumns(qEntity),
			values: []
		}
		let cascadeRecords: CascadeRecord[] = []

		for (const entity of entities) {
			if (checkIfProcessed && this.isProcessed(
				entity, createdEntityMap, dbEntity, schemaUtils)[0] === true) {
				continue
			}
			let foundValues         = []
			let valuesFragment: any = []

			for (const dbProperty of dbEntity.properties) {
				let newValue: any = entity[dbProperty.name]
				if (newValue === undefined) {
					newValue = null
				}
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation = dbProperty.relation[0]
					this.assertRelationValueIsAnObject(newValue, dbProperty)
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							this.assertManyToOneNotArray(newValue)
							schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
								dbColumn: DbColumn,
								columnValue: any,
								propertyNameChains: string[][],
							) => {
								if (dbProperty.isId) {
									if (schemaUtils.isIdEmpty(columnValue)) {
										throw new Error(
											`non-@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name} 
											must have a value for 'create' operations.`)
									}
								}
								if (schemaUtils.isRepositoryId(dbColumn.name)) {
									if (schemaUtils.isEmpty(columnValue)) {
										throw new Error(`Repository Id must be specified on an insert`)
									}
								}
								this.columnProcessed(dbProperty, foundValues, dbColumn, columnValue)
								if (dbColumn.isGenerated && dbProperty.isId && columnValue < 0) {
									// Do not insert negative integers for temporary identification
									// within the circular dependency management lookup
									return
								}
								valuesFragment[dbColumn.index] = columnValue === undefined ? null : columnValue
							}, false)
							// Cascading on manyToOne is not currently implemented, nothing else needs
							// to be done
							continue
						case EntityRelationType.ONE_TO_MANY:
							this.checkCascade(newValue, cascadeOverwrite, dbProperty,
								dbRelation, schemaUtils, CRUDOperation.CREATE, cascadeRecords)
							break
					}
				} else {
					let column = dbProperty.propertyColumns[0].column
					this.ensureNonRelationalValue(dbProperty, column, newValue)
					if (schemaUtils.isRepositoryId(column.name)
						&& schemaUtils.isEmpty(newValue)) {
						throw new Error(`Repository Id must be specified on an insert`)
					}
					let addValue = true
					if (column.isGenerated && (newValue !== undefined && newValue !== null)) {
						// Allowing negative integers for temporary identification
						// within the circular dependency management lookup
						if (!dbProperty.isId || newValue >= 0) {
							throw new Error(`@GeneratedValue() "${dbEntity.name}.${dbProperty.name}" 
							cannot have a value for 'create' operations.`)
						}
						addValue = false
					}
					if (dbProperty.isId) {
						if (!column.isGenerated && schemaUtils.isIdEmpty(newValue)) {
							throw new Error(
								`non-@GeneratedValue() @Id() "${dbEntity.name}.${dbProperty.name}" 
							must have a value for 'create' operations.`)
						}
					}
					if (addValue) {
						this.columnProcessed(dbProperty, foundValues, column, newValue)
						valuesFragment[column.index] = newValue
					}
				}
			}
			rawInsert.values.push(valuesFragment)
		}

		let numberOfAffectedRecords = 0


		if (rawInsert.values.length) {
			const generatedColumns = dbEntity.columns.filter(
				column => column.isGenerated)
			if (generatedColumns.length && ensureGeneratedValues) {
				const idsAndGeneratedValues = await this.internalInsertValuesGetIds(
					dbEntity, rawInsert, fieldUtils, queryFacade, queryUtils,
					transConnector)
				for (let i = 0; i < entities.length; i++) {
					for (const generatedColumn of generatedColumns) {
						// Return index for generated column values is: DbColumn.index
						entities[i][generatedColumn.propertyColumns[0].property.name]
							= idsAndGeneratedValues[i][generatedColumn.index]
					}
				}
				numberOfAffectedRecords = idsAndGeneratedValues.length
			} else {
				numberOfAffectedRecords = await
					this.internalInsertValues(
						dbEntity, rawInsert, queryUtils, fieldUtils, ensureGeneratedValues)
			}
		}

		return {
			cascadeRecords,
			numberOfAffectedRecords,
		}
	}

	private checkCascade<EntityCascadeGraph>(
		value: any,
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph,
		dbProperty: DbProperty,
		dbRelation: DbRelation,
		schemaUtils: ISchemaUtils,
		crudOperation: CRUDOperation,
		cascadeRecords: CascadeRecord[]
	): boolean {
		this.assertOneToManyIsArray(value)

		if (cascadeOverwrite instanceof Object) {
			if (!cascadeOverwrite[dbProperty.name]) {
				return false
			}
		} else {
			switch (cascadeOverwrite) {
				case CascadeOverwrite.NEVER:
					return false
				// If no overwrite was provided
				case CascadeOverwrite.DEFAULT:
					if (!schemaUtils.doCascade(dbRelation, crudOperation)) {
						return false
					}
					break
			}
		}

		cascadeRecords.push({
			relation: dbRelation,
			manyEntities: value,
		})

		return true
	}

	/*
	 Values for the same column could be repeated in different places in the object graph.
	 For example, if the same column is mapped to two different @ManyToOne relations.
	 In this case, when persisting an entity we need to make sure that all values for the
	 entity in question are being persisted.
	 */
	private columnProcessed(
		dbProperty: DbProperty,
		foundValues: any[],
		dbColumn: DbColumn,
		value: any,
	): boolean {
		// if (value === undefined) {
		// 	throw new Error(`Values cannot be undefined, please use null.`);
		// }
		if (foundValues[dbColumn.index] === undefined) {
			foundValues[dbColumn.index] = value
			return false
		}
		if (!valuesEqual(foundValues[dbColumn.index], value)) {
			throw new Error(
				`Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.index]} !== ${value}`)
		}
		return true
	}

	private async cascadeOnPersist<EntityCascadeGraph>(
		cascadeRecords: CascadeRecord[],
		parentDbEntity: DbEntity,
		alreadyModifiedEntityMap: { [idKey: string]: any }[][],
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		metadataUtils: IQMetadataUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT
	): Promise<void> {
		if (!cascadeRecords.length
			|| cascadeOverwrite === CascadeOverwrite.NEVER) {
			return
		}
		for (const cascadeRecord of cascadeRecords) {
			if (!cascadeRecord.relation.oneToManyElems) {
				continue
			}

			switch (cascadeRecord.relation.oneToManyElems.cascade) {
				case CascadeType.ALL:
				case CascadeType.PERSIST:
					break
				// Do not cascade if its for REMOVE only
				default:
					continue
			}
			const entitiesWithIds: UpdateRecord[] = []
			// const entitiesWithIdMap: { [idKey: string]: UpdateRecord } = {}
			const entitiesWithoutIds: any[]       = []
			const dbEntity                        = cascadeRecord.relation.relationEntity
			if (cascadeRecord.manyEntities) {
				for (const manyEntity of cascadeRecord.manyEntities) {
					const [isProcessed, entityIdData] = this.isProcessed(manyEntity,
						alreadyModifiedEntityMap, dbEntity, schemaUtils)
					if (isProcessed === true) {
						return
					}
					const record: UpdateRecord = {
						newValue: manyEntity,
						originalValue: null,
						idData: entityIdData
					}
					if (entityIdData.idKey) {
						entitiesWithIds.push(record)
						// entitiesWithIdMap[entityIdData.idKey] = record
					} else {
						entitiesWithoutIds.push(record)
					}
				}
			}
			if (entitiesWithIds.length) {
				// entitiesWithIds.map(entityWithId)
				// updateCache.getEntityUpdateCache()
				// const originalValues = await this.getOriginalValues(
				// 	entitiesWithIds, dbEntity, airDb, fieldUtils,
				// 	queryFacade, queryUtils, schemaUtils,
				// 	transConnector, updateCache)
				// for (const idKey in originalValues.dataMap) {
				// 	entitiesWithIdMap[idKey].originalValue = originalValues.dataMap[idKey]
				// }
				for (let i = 0; i < entitiesWithIds.length; i++) {
					let entityToOperateOn = entitiesWithIds[i]
					let originalValue     = updateCache.getEntityUpdateCache(entityToOperateOn)
					if (!originalValue) {
						if (entityToOperateOn.idData.idColumnValueData.length == 1) {
							// Entity with a single Id always has the @Id generated
							// hence, it must have since been deleted, skip it
							return
						}
						// Don't know if the entity has been deleted or is a brand new one, create it
						// TODO: figure out if the entity has been deleted and if it has, throw an
						// exception?
						await
							this.performCreate(dbEntity, entityToOperateOn.newValue,
								alreadyModifiedEntityMap, airDb, fieldUtils, metadataUtils,
								queryFacade, queryUtils, schemaUtils, transConnector,
								updateCache, entityToOperateOn.idData, cascadeOverwrite)
					} else {
						await
							this.performUpdate(dbEntity, entityToOperateOn.newValue,
								alreadyModifiedEntityMap, airDb, fieldUtils, metadataUtils,
								queryFacade, queryUtils, schemaUtils, transConnector,
								updateCache, entityToOperateOn.originalValue, cascadeOverwrite)
					}
				}
			}
			for (let i = 0; i < entitiesWithoutIds.length; i++) {
				let entityToCreate = entitiesWithoutIds[i]
				await
					this.performCreate(dbEntity, entityToCreate,
						alreadyModifiedEntityMap, airDb, fieldUtils, metadataUtils,
						queryFacade, queryUtils, schemaUtils, transConnector,
						updateCache, entityToCreate.idData, cascadeOverwrite)
			}
		}
	}

	/**
	 * On an update operation, can a nested create contain an update?
	 * Via:
	 *  OneToMany:
	 *    Yes, if the child entity is itself in the update cache
	 *  ManyToOne:
	 *    Cascades do not travel across ManyToOne
	 */
	private async internalUpdate<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entity: E,
		originalEntity: E,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph
	): Promise<ResultWithCascade> {
		const qEntity                                =
			      airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
		const cascadeRecords: CascadeRecord[]        = []
		const setFragment: any                       = {}
		const idWhereFragments: JSONValueOperation[] = []
		let numUpdates                               = 0
		const valuesMapByColumn: any[]               = []

		for (const dbProperty of dbEntity.properties) {
			const updatedValue = entity[dbProperty.name]
			if (!dbProperty.relation || !dbProperty.relation.length) {
				const dbColumn = dbProperty.propertyColumns[0].column
				this.ensureNonRelationalValue(dbProperty, dbColumn, updatedValue)
				if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, updatedValue)) {
					continue
				}
				const originalValue = originalEntity[dbColumn.name]
				if (dbProperty.isId) {
					// For an id property, the value is guaranteed to be the same (and not empty) -
					// cannot entity-update id fields
					idWhereFragments.push((<any>qEntity)[dbProperty.name].equals(updatedValue))
				} else if (!valuesEqual(originalValue, updatedValue)) {
					setFragment[dbColumn.name] = updatedValue
					numUpdates++
				}
				continue
			}
			// It's a relation property
			this.assertRelationValueIsAnObject(updatedValue, dbProperty)
			const dbRelation = dbProperty.relation[0]
			switch (dbRelation.relationType) {
				case EntityRelationType.MANY_TO_ONE:
					this.assertManyToOneNotArray(updatedValue)
					schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
						dbColumn: DbColumn,
						value: any,
						propertyNameChains: string[][],
					) => {
						if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, value)) {
							return
						}
						let originalValue = originalEntity[dbColumn.name]
						if (dbProperty.isId) {
							let idQProperty = qEntity
							for (const propertyNameLink of propertyNameChains[0]) {
								idQProperty = idQProperty[propertyNameLink]
							}
							// For an id property, the value is guaranteed to be the same (and not
							// empty) - cannot entity-update id fields
							idWhereFragments.push(idQProperty.equals(value))
						} else if (!valuesEqual(originalValue, value)) {
							setFragment[dbColumn.name] = value
							numUpdates++
						}
					}, dbProperty.isId)
					// Cascading on manyToOne is not currently implemented, nothing else needs to
					// be done
					continue
				case EntityRelationType.ONE_TO_MANY:
					this.checkCascade(updatedValue, cascadeOverwrite, dbProperty,
						dbRelation, schemaUtils, CRUDOperation.UPDATE, cascadeRecords)
					break
			}
		}

		let numberOfAffectedRecords = 0
		if (numUpdates) {
			let whereFragment
			if (idWhereFragments.length > 1) {
				whereFragment = and(...idWhereFragments)
			} else {
				whereFragment = idWhereFragments[0]
			}
			let rawUpdate                          = {
				update: qEntity,
				set: setFragment,
				where: whereFragment
			}
			let update: UpdateProperties<any, any> =
				    new UpdateProperties(rawUpdate)

			numberOfAffectedRecords = await this.internalUpdateWhere(
				dbEntity, update, fieldUtils, queryFacade, queryUtils,
				transConnector)
		}
		return {
			recordChanged: !!numUpdates,
			numberOfAffectedRecords: numberOfAffectedRecords,
			cascadeRecords: cascadeRecords
		}
	}

	private ensureNonRelationalValue(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	) {
		if (value === undefined || value === null) {
			return
		}
		switch (dbColumn.type) {
			case SQLDataType.ANY:
				break
			case SQLDataType.BOOLEAN:
				if (typeof value !== 'boolean') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.DATE:
				if (typeof value !== 'object' || !(value instanceof Date)) {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.JSON:
				if (typeof value !== 'object' || value instanceof Date) {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.NUMBER:
				if (typeof value !== 'number') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
			case SQLDataType.STRING:
				if (typeof value !== 'string') {
					this.throwUnexpectedProperty(dbProperty, dbColumn, value)
				}
				break
		}
	}

	private assertRelationValueIsAnObject(
		relationValue: any,
		dbProperty: DbProperty,
	): void {
		if (relationValue !== null && relationValue !== undefined &&
			(typeof relationValue != 'object' || relationValue instanceof Date)
		) {
			throw new Error(
				`Unexpected value in relation property: ${dbProperty.name}, 
				of entity ${dbProperty.entity.name}`)
		}
	}

	private assertManyToOneNotArray(relationValue: any
	): void {
		if (relationValue instanceof Array) {
			throw new Error(`@ManyToOne relation cannot be an array`)
		}
	}

	private assertOneToManyIsArray(relationValue: any
	): void {
		if (relationValue !== null
			&& relationValue !== undefined
			&& !(relationValue instanceof Array)) {
			throw new Error(`@OneToMany relation must be an array`)
		}
	}

	private isProcessed<E>(
		entity: E,
		// This is a per-operation map (for a single update or create or delete with cascades)
		operatedOnEntityMap: { [entityId: string]: any }[][],
		dbEntity: DbEntity,
		schemaUtils: ISchemaUtils
	): [boolean, EntityIdData] {
		if (isStub(entity)) {
			return [true, null]
		}

		if (!dbEntity.idColumns.length) {
			throw new Error(
				`Cannot run 'create'|'bulkCreate'|'update' for entity '${dbEntity.name}' with no @Id(s).
			Please use 'insert'|'updateWhere' instead.`)
		}

		const entityIdData: EntityIdData = {
			idColumnValueData: [],
			idKey: null
		}

		// Attempt to get the id, allowing for non-ided entities,
		// fail if (part of) an id is empty.
		const idKey        = schemaUtils.getIdKey(entity, dbEntity,
			false, (
				idColumn: DbColumn,
				idValue: number | string,
				propertyNameChains: string[][],
			) => {
				entityIdData.idColumnValueData.push({
					idColumn,
					idValue,
					propertyNameChains,
				})
			})
		entityIdData.idKey = idKey
		if (!idKey) {
			return [false, entityIdData]
		}

		const mapForSchema            = ensureChildArray(
			operatedOnEntityMap, dbEntity.schemaVersion.schema.index)
		const mapForEntityType        = ensureChildMap(mapForSchema, dbEntity.index)
		const alreadyOperatedOnEntity = mapForEntityType[idKey]

		if (!alreadyOperatedOnEntity) {
			mapForEntityType[idKey] = entity
			return [false, entityIdData]
		}

		if (alreadyOperatedOnEntity === entity) {
			// The Update operation for this entity was already recorded, nothing to do
			return [true, null]
		}

		// If it's new entity, not in cache
		let hasNonIdProperties = false
		for (let propertyName in entity) {
			if (!dbEntity.idColumnMap[propertyName]
				&& entity.hasOwnProperty(propertyName)) {
				hasNonIdProperties = true
				break
			}
		}
		// If there is at least one non-id property set, then it's not an id-stub
		if (hasNonIdProperties) {
			throw new Error(
				`More than one non-id-stub instance of '${dbEntity.name}' 
				with @Id(s) value '${entityIdData.idKey}' during mutation operation`)
		}

		// The Update operation for this entity was already recorded, nothing to do
		return [true, null]
	}

	private async internalDelete(
		dbEntity: DbEntity,
		entity: any,
		airDb: IAirportDatabase,
		fieldUtils: IFieldUtils,
		queryFacade: IQueryFacade,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector
	): Promise<number> {

		const qEntity                                =
			      airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
		const idWhereFragments: JSONValueOperation[] = []
		const valuesMapByColumn: any[]               = []
		for (let propertyName in entity) {
			if (!entity.hasOwnProperty(propertyName)) {
				continue
			}
			const dbProperty = dbEntity.propertyMap[propertyName]
			// Skip transient fields
			if (!dbProperty) {
				continue
			}
			const deletedValue = entity[propertyName]

			let dbRelation
			if (dbProperty.relation && dbProperty.relation.length) {
				dbRelation = dbProperty.relation[0]
			}
			if (!dbRelation) {
				// If the property is not a transient field and not a relation
				const dbColumn = dbProperty.propertyColumns[0].column
				this.ensureNonRelationalValue(dbProperty, dbColumn, deletedValue)
				if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, deletedValue)) {
					continue
				}
				if (dbProperty.isId) {
					// For an id property, the value is guaranteed to be the same (and not empty) -
					// cannot entity-update id fields
					idWhereFragments.push((<any>qEntity)[propertyName].equals(deletedValue))
				}
				continue
			}

			this.assertRelationValueIsAnObject(deletedValue, dbProperty)
			switch (dbRelation.relationType) {
				case EntityRelationType.MANY_TO_ONE:
					this.assertManyToOneNotArray(deletedValue)
					schemaUtils.forEachColumnOfRelation(dbRelation, dbEntity, (
						dbColumn: DbColumn,
						value: any,
						propertyNameChains: string[][]
					) => {
						if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
							if (schemaUtils.isIdEmpty(value)) {
								throw new Error(`Required Id value is missing in:
								'${dbEntity.name}.${propertyNameChains.join('.')}'`)
							}
							let idQProperty = qEntity
							for (const propertyNameLink of propertyNameChains[0]) {
								idQProperty = idQProperty[propertyNameLink]
							}
							// For an id property, the value is guaranteed to be the same (and not
							// empty) - cannot entity-update id fields
							idWhereFragments.push(idQProperty.equals(value))
						}
						this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, value)
					}, false)
					// Cascading on manyToOne is not currently implemented, nothing else needs to
					// be done
					break
				case EntityRelationType.ONE_TO_MANY:
					// Delete cascading is done on the server - there is no new information
					// to pull for this from the client
					break
				default:
					throw new Error(
						`Unknown relationType '${dbRelation.relationType}' 
						for '${dbEntity.name}.${dbProperty.name}'.`)
			}
		}

		let idWhereClause
		if (idWhereFragments.length > 1) {
			idWhereClause = and(...idWhereFragments)
		} else {
			idWhereClause = idWhereFragments[0]
		}

		let rawDelete: RawDelete<any> = {
			deleteFrom: qEntity,
			where: idWhereClause
		}
		let deleteWhere: Delete<any>  = new Delete(rawDelete)
		return await this.internalDeleteWhere(dbEntity, deleteWhere,
			fieldUtils, queryFacade, queryUtils, transConnector)
	}

}
