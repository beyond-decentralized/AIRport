import {
	AIR_DB,
	and,
	Delete,
	EntityIdData,
	IAirportDatabase,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	InsertColumnValues,
	InsertValues,
	IQEntity,
	IQueryFacade,
	IUtils,
	MappedEntityArray,
	markAsStub,
	or,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	UpdateColumns,
	UpdateProperties,
	UpdateRecord,
	UTILS
}                     from '@airport/air-control'
import {DI}           from '@airport/di'
import {
	CascadeType,
	CRUDOperation,
	DbColumn,
	DbEntity,
	DbProperty,
	DbRelation,
	EntityRelationType,
	ITransactionalConnector,
	JSONBaseOperation,
	JSONValueOperation,
	PortableQuery,
	SQLDataType,
	TRANS_CONNECTOR
}                     from '@airport/ground-control'
import {IUpdateCache} from './core/data/UpdateCache'
import {
	QUERY_FACADE,
	UPDATE_CACHE
}                     from './diTokens'

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

	protected airDb: IAirportDatabase
	public entity: IQueryFacade
	higherOrderOpsYieldLength: number = 100
	public transConnector: ITransactionalConnector
	transactionInProgress: boolean    = false
	public updateCache: IUpdateCache
	public utils: IUtils

	constructor() {
		DI.get((
			airportDatabase,
			queryFacade,
			transConnector,
			updateCache,
			utils
		) => {
			this.airDb          = airportDatabase
			this.entity         = queryFacade
			this.transConnector = transConnector as ITransactionalConnector
			this.updateCache    = updateCache
			this.utils          = utils
		}, AIR_DB, QUERY_FACADE, TRANS_CONNECTOR, UPDATE_CACHE, UTILS)
	}

	throwUnexpectedProperty(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	) {
		throw `Unexpected property value '${value.toString()}' in property '${dbProperty.entity.name}.${dbProperty.name}'
		(column: '${dbColumn.name}').`
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
	protected async performCreate<E>(
		dbEntity: DbEntity,
		entity: E,
		createdEntityMap: { [entityId: string]: any }[][],
		idData?: EntityIdData,
		cascadeAlways = false,
	): Promise<number> {
		let result = await this.internalCreate(dbEntity, [entity],
			createdEntityMap, !idData, cascadeAlways)

		await this.cascadeOnPersist(result.cascadeRecords, dbEntity,
			createdEntityMap, cascadeAlways)

		return result.numberOfAffectedRecords
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 *
	 * @param qEntity
	 * @param entity
	 */
	protected async performBulkCreate<E>(
		dbEntity: DbEntity,
		entities: E[],
		createdEntityMap: { [entityId: string]: any }[][],
		checkIfProcessed: boolean      = true,
		cascadeAlways: boolean         = false,
		ensureGeneratedValues: boolean = true // For internal use only
	): Promise<number> {
		let result = await this.internalCreate(dbEntity, entities,
			createdEntityMap, checkIfProcessed, cascadeAlways, ensureGeneratedValues)
		await this.cascadeOnPersist(result.cascadeRecords, dbEntity,
			createdEntityMap, cascadeAlways)

		return result.numberOfAffectedRecords
	}

	private async internalCreate<E>(
		dbEntity: DbEntity,
		entities: E[],
		createdEntityMap: { [entityId: string]: any }[][],
		checkIfProcessed: boolean,
		cascadeAlways = false,
		ensureGeneratedValues?: boolean
	): Promise<ResultWithCascade> {
		const qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]

		let rawInsert: RawInsertValues<any> = {
			insertInto: qEntity,
			columns: this.utils.Metadata.getAllColumns(qEntity),
			values: []
		}
		let cascadeRecords: CascadeRecord[] = []

		for (const entity of entities) {
			if (checkIfProcessed && this.isProcessed(entity, createdEntityMap, dbEntity)[0] === true) {
				return
			}
			let foundValues         = []
			let valuesFragment: any = []

			for (const dbProperty of dbEntity.properties) {
				const newValue: any = entity[dbProperty.name]
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation = dbProperty.relation[0]
					this.assertRelationValueIsAnObject(newValue, dbProperty)
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							this.assertManyToOneNotArray(newValue)
							this.utils.Schema.forEachColumnOfRelation(dbRelation, entity, (
								dbColumn: DbColumn,
								columnValue: any,
								propertyNameChains: string[][],
							) => {
								if (dbProperty.isId) {
									if (this.utils.Schema.isIdEmpty(columnValue)) {
										throw `non-@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name} must have a value for 'create' operations.`
									}
								}
								if (this.utils.Schema.isRepositoryId(dbColumn.name)) {
									if (this.utils.Schema.isEmpty(columnValue)) {
										throw `Repository Id must be specified on an insert`
									}
								}
								this.columnProcessed(dbProperty, foundValues, dbColumn, columnValue)
								valuesFragment[dbColumn.index] = columnValue
							}, false)
							// Cascading on manyToOne is not currently implemented, nothing else needs
							// to be done
							continue
						case EntityRelationType.ONE_TO_MANY:
							this.assertOneToManyIsArray(newValue)
							if (!cascadeAlways && !this.utils.Schema.doCascade(dbRelation, CRUDOperation.CREATE)) {
								continue
							}

							cascadeRecords.push({
								relation: dbRelation,
								manyEntities: newValue,
							})
							break
					}
				} else {
					let column = dbProperty.propertyColumns[0].column
					this.ensureNonRelationalValue(dbProperty, column, newValue)
					if (this.utils.Schema.isRepositoryId(column.name)
						&& this.utils.Schema.isEmpty(newValue)) {
						throw `Repository Id must be specified on an insert`
					}
					if (column.isGenerated && (newValue !== undefined && newValue !== null)) {
						throw `@GeneratedValue() "${dbEntity.name}.${dbProperty.name}" cannot have a value for 'create' operations.`
					}
					if (dbProperty.isId) {
						if (!column.isGenerated && this.utils.Schema.isIdEmpty(newValue)) {
							throw `non-@GeneratedValue() @Id() "${dbEntity.name}.${dbProperty.name}" must have a value for 'create' operations.`
						}
					}
					this.columnProcessed(dbProperty, foundValues, column, newValue)
					valuesFragment[column.index] = newValue
				}
			}
			rawInsert.values.push(valuesFragment)
		}

		let numberOfAffectedRecords = 0


		if (rawInsert.values.length) {
			const generatedProperty = this.getGeneratedProperty(dbEntity)
			if (generatedProperty && ensureGeneratedValues) {
				const generatedIds = await this.internalInsertValuesGetIds(dbEntity, rawInsert)
				for (let i = 0; i < entities.length; i++) {
					const entity                   = entities[i]
					entity[generatedProperty.name] = generatedIds[i]
					numberOfAffectedRecords        = generatedIds.length
				}
			} else {
				numberOfAffectedRecords = await
					this.internalInsertValues(dbEntity, rawInsert, ensureGeneratedValues)
			}
		}

		return {
			cascadeRecords: cascadeRecords,
			numberOfAffectedRecords: numberOfAffectedRecords,
		}
	}

	private getGeneratedProperty(
		dbEntity: DbEntity
	): DbProperty | null {
		const generatedColumns = dbEntity.idColumns.filter(
			dbColumn => dbColumn.isGenerated
		)
		switch (generatedColumns.length) {
			case 0:
				return null
			case 1:
				return generatedColumns[0].propertyColumns[0].property
			default:
				throw `Multiple @GeneratedValue() columns are not supported,
				entity: ${dbEntity.schemaVersion.schema.name}.${dbEntity.name}
				(schema version: ${dbEntity.schemaVersion.versionString}`
		}
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
		// 	throw `Values cannot be undefined, please use null.`;
		// }
		if (foundValues[dbColumn.index] === undefined) {
			foundValues[dbColumn.index] = value
			return false
		}
		if (!this.utils.valuesEqual(foundValues[dbColumn.index], value)) {
			throw `Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.index]} !== ${value}`
		}
		return true
	}

	protected async internalInsertColumnValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE>
	): Promise<number> {
		const insertColumnValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = this.entity.getPortableQuery(dbEntity, insertColumnValues, null)

		return await this.transConnector.insertValues(portableQuery)
	}

	protected async internalInsertValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE>,
		ensureGeneratedValues?: boolean
	): Promise<number> {
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null)

		return await this.transConnector.insertValues(portableQuery, undefined, ensureGeneratedValues)
	}

	protected async internalInsertColumnValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertColumnValues: RawInsertColumnValues<IQE>
	): Promise<number[] | string[]> {
		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null)

		return await this.transConnector.insertValuesGetIds(portableQuery)
	}

	protected async internalInsertValuesGetIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE>
	): Promise<number[] | string[]> {
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null)

		return await this.transConnector.insertValuesGetIds(portableQuery)
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 *
	 * @param qEntity
	 * @param entity
	 */
	protected async performUpdate<E>(
		dbEntity: DbEntity,
		entity: E,
		updatedEntityMap: { [entityId: string]: any } [][],
		originalValue ?: E,
		cascadeAlways = false,
	): Promise<number> {
		if (!originalValue) {
			let [isProcessed, entityIdData] = this.isProcessed(entity, updatedEntityMap, dbEntity)
			if (isProcessed === true) {
				return 0
			}
			if (!entityIdData.idKey) {
				throw `Cannot update ${dbEntity.name}, not all @Id(s) are set.`
			}
			let originalValue = await this.getOriginalRecord(dbEntity, entityIdData.idKey)
			if (!originalValue) {
				throw `Cannot update ${dbEntity.name}, entity not found.`
			}
		}
		let result = await this.internalUpdate(dbEntity, entity, originalValue, cascadeAlways)
		await this.cascadeOnPersist(result.cascadeRecords, dbEntity, updatedEntityMap, cascadeAlways)

		return result.numberOfAffectedRecords
	}

	private async cascadeOnPersist(
		cascadeRecords: CascadeRecord[],
		parentDbEntity: DbEntity,
		alreadyModifiedEntityMap: { [idKey: string]: any }[][],
		cascadeAlways: boolean = false,
	): Promise<void> {
		if (!cascadeRecords.length) {
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
			const entitiesWithIds: UpdateRecord[]                      = []
			const entitiesWithIdMap: { [idKey: string]: UpdateRecord } = {}
			const entitiesWithoutIds: any[]                            = []
			const dbEntity                                             = cascadeRecord.relation.relationEntity
			for (const manyEntity of cascadeRecord.manyEntities) {
				const [isProcessed, entityIdData] = this.isProcessed(manyEntity,
					alreadyModifiedEntityMap, dbEntity)
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
					entitiesWithIdMap[entityIdData.idKey] = record
				} else {
					entitiesWithoutIds.push(record)
				}
			}
			if (entitiesWithIds.length) {
				const originalValues = await this.getOriginalValues(entitiesWithIds, dbEntity)
				for (const idKey in originalValues.dataMap) {
					entitiesWithIdMap[idKey].originalValue = originalValues.dataMap[idKey]
				}
				for (let i = 0; i < entitiesWithIds.length; i++) {
					let entityToUpdate = entitiesWithIds[i]
					if (!entityToUpdate.originalValue) {
						if (entityToUpdate.idData.idColumnValueData.length == 1) {
							// Entity with a single Id always has the @Id generated
							// hence, it must have since been deleted, skip it
							return
						}
						// Don't know if the entity has been deleted or is a brand new one, create it
						// TODO: figure out if the entity has been deleted and if it has, throw an
						// exception?
						await
							this.performCreate(dbEntity, entityToUpdate.newValue,
								alreadyModifiedEntityMap, entityToUpdate.idData, cascadeAlways)
					} else {
						await
							this.performUpdate(dbEntity, entityToUpdate.newValue,
								alreadyModifiedEntityMap, entityToUpdate.originalValue, cascadeAlways)
					}
				}
			}
			for (let i = 0; i < entitiesWithoutIds.length; i++) {
				let entityToCreate = entitiesWithoutIds[i]
				await
					this.performCreate(dbEntity, entityToCreate,
						alreadyModifiedEntityMap, entityToCreate.idData, cascadeAlways)
			}
		}
	}

	protected abstract async getOriginalRecord(
		dbEntity: DbEntity,
		idKey: string,
	): Promise<any>;

	protected abstract async getOriginalValues(
		entitiesToUpdate: UpdateRecord[],
		dbEntity: DbEntity,
	): Promise<MappedEntityArray<any>>;

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
				idsWhereClause = currentQObject.in(...idsWhereClauseFragments)
			} else {
				idsWhereClause = currentQObject.equals(idsWhereClauseFragments[0])
			}
		}

		return idsWhereClause
	}

	/**
	 * On an update operation, can a nested create contain an update?
	 * Via:
	 *  OneToMany:
	 *    Yes, if the child entity is itself in the update cache
	 *  ManyToOne:
	 *    Cascades do not travel across ManyToOne
	 */
	private async internalUpdate<E>(
		dbEntity: DbEntity,
		entity: E,
		originalEntity: E,
		cascadeAlways = false
	): Promise<ResultWithCascade> {
		const qEntity                                = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
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
				} else if (!this.utils.valuesEqual(originalValue, updatedValue)) {
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
					this.utils.Schema.forEachColumnOfRelation(dbRelation, entity, (
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
						} else if (!this.utils.valuesEqual(originalValue, value)) {
							setFragment[dbColumn.name] = value
							numUpdates++
						}
					}, dbProperty.isId)
					// Cascading on manyToOne is not currently implemented, nothing else needs to
					// be done
					continue
				case EntityRelationType.ONE_TO_MANY:
					this.assertOneToManyIsArray(updatedValue)
					if (!cascadeAlways && !this.utils.Schema.doCascade(dbRelation, CRUDOperation.UPDATE)) {
						continue
					}
					cascadeRecords.push({
						relation: dbRelation,
						manyEntities: updatedValue,
					})
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
			let update: UpdateProperties<any, any> = new UpdateProperties(rawUpdate, this.utils)

			numberOfAffectedRecords = await this.internalUpdateWhere(dbEntity, update)
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
			throw `Unexpected value in relation property: ${dbProperty.name}, of entity ${dbProperty.entity.name}`
		}
	}

	private assertManyToOneNotArray(relationValue: any
	): void {
		if (relationValue instanceof Array) {
			throw `@ManyToOne relation cannot be an array`
		}
	}

	private assertOneToManyIsArray(relationValue: any
	): void {
		if (relationValue !== null
			&& relationValue !== undefined
			&& !(relationValue instanceof Array)) {
			throw `@OneToMany relation must be an array`
		}
	}

	protected async internalUpdateColumnsWhere<IEUC extends IEntityUpdateColumns,
		IQE extends IQEntity>(
		dbEntity: DbEntity,
		updateColumns: UpdateColumns<IEUC, IQE>
	): Promise<number> {
		const portableQuery: PortableQuery = this.entity.getPortableQuery(
			dbEntity, updateColumns, null)

		return await this.transConnector.updateValues(portableQuery)
	}

	protected async internalUpdateWhere<E, IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity>(
		dbEntity: DbEntity,
		update: UpdateProperties<IEUP, IQE>
	): Promise<number> {
		const portableQuery: PortableQuery = this.entity.getPortableQuery(
			dbEntity, update, null)

		return await this.transConnector.updateValues(portableQuery)
	}

	/**
	 * Transactional context must have been started by the time this method is called.
	 * @param qEntity
	 * @param entity
	 */
	protected async performDelete<E>(
		dbEntity: DbEntity,
		entity: E,
	): Promise<number> {
		return await this.internalDelete(dbEntity, entity)
	}

	private isProcessed<E>(
		entity: E,
		// This is a per-operation map (for a single update or create or delete with cascades)
		operatedOnEntityMap: { [entityId: string]: any }[][],
		dbEntity: DbEntity,
	): [boolean, EntityIdData] {
		if (markAsStub(entity)) {
			return [true, null]
		}

		if (!dbEntity.idColumns.length) {
			throw `Cannot run 'create'|'bulkCreate'|'update' for entity '${dbEntity.name}' with no @Id(s).
			Please use 'insert'|'updateWhere' instead.`
		}

		const entityIdData: EntityIdData = {
			idColumnValueData: [],
			idKey: null
		}

		// Attempt to get the id, allowing for non-ided entities,
		// fail if (part of) an id is empty.
		const idKey        = this.utils.Schema.getIdKey(entity, dbEntity,
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

		const mapForSchema            = this.utils.ensureChildArray(
			operatedOnEntityMap, dbEntity.schemaVersion.schema.index)
		const mapForEntityType        = this.utils.ensureChildMap(mapForSchema, dbEntity.index)
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
			throw `More than one non-id-stub instance of '${dbEntity.name}' with @Id(s) value '${entityIdData.idKey}' during mutation operation`
		}

		// The Update operation for this entity was already recorded, nothing to do
		return [true, null]
	}

	protected async internalDeleteWhere<E, IQE extends IQEntity>(
		dbEntity: DbEntity,
		aDelete: Delete<IQE>,
	): Promise<number> {
		let portableQuery: PortableQuery = this.entity.getPortableQuery(dbEntity, aDelete, null)

		return await this.transConnector.deleteWhere(portableQuery)
	}

	private async internalDelete(
		dbEntity: DbEntity,
		entity: any,
	): Promise<number> {
		const qEntity                                = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
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
					this.utils.Schema.forEachColumnOfRelation(dbRelation, dbEntity, (
						dbColumn: DbColumn,
						value: any,
						propertyNameChains: string[][]
					) => {
						if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
							if (this.utils.Schema.isIdEmpty(value)) {
								throw `Required Id value is missing in:
								'${dbEntity.name}.${propertyNameChains.join('.')}'`
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
					// One-to-Manys do not contain values for the object being deleted
					break
				default:
					throw `Unknown relationType '${dbRelation.relationType}' for '${dbEntity.name}.${dbProperty.name}'.`
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
		let deleteWhere: Delete<any>  = new Delete(rawDelete, this.utils)
		return await this.internalDeleteWhere(dbEntity, deleteWhere)
	}

}
