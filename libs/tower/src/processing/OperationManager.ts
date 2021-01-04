import {
	and,
	Delete,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	InsertColumnValues,
	InsertValues,
	IQEntity,
	IQOperableFieldInternal,
	IUpdateCache,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	UpdateColumns,
	UpdateProperties,
	valuesEqual
}                          from '@airport/air-control'
import {
	DbColumn,
	DbEntity,
	EntityRelationType,
	JSONValueOperation,
	PortableQuery
}                          from '@airport/ground-control'
import {ITransaction}      from '../ITransaction'
import {IOperationContext} from './OperationContext'

/**
 * Created by Papa on 11/15/2016.
 */

export interface IOperationManager {

}

export abstract class OperationManager
	implements IOperationManager {

	protected abstract getOriginalRecord<T>(
		dbEntity: DbEntity,
		entity: T,
		updateCache: IUpdateCache
	): Promise<any>;

	/**
	 * Transactional context must have been started by the time this method is called.
	 *
	 * @param qEntity
	 * @param entity
	 */
	protected async performSave<E, EntityCascadeGraph>(
		entities: E | E[],
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>,
	): Promise<number> {
		const verifiedTree = context.ioc.cascadeGraphVerifier.verify(entities, context)
		const entityGraph  = context.ioc.entityGraphReconstructor
			.restoreEntityGraph(verifiedTree, context)
		context.ioc.structuralEntityValidator.validate(entityGraph, [], context)
		const operations         = context.ioc.dependencyGraphResolver.getOperationsInOrder(entityGraph, context)
		let totalNumberOfChanges = 0
		const rootDbEntity       = context.dbEntity
		for (const operation of operations) {
			context.dbEntity = operation.dbEntity
			if (operation.isCreate) {
				totalNumberOfChanges += await this.internalCreate(operation.entities, transaction, context)
			} else if (operation.isDelete) {
				// TODO: add support for multiple records
				totalNumberOfChanges += await this.internalDelete(operation.entities, transaction, context)
			} else {
				// TODO: re-think though how change detection will work
				// TODO: add support for multiple records
				totalNumberOfChanges += await this.internalUpdate(operation.entities, null, transaction, context)
			}
		}
		context.dbEntity = rootDbEntity

		return totalNumberOfChanges
	}

	protected async internalCreate<E, EntityCascadeGraph>(
		entities: E[],
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>,
		ensureGeneratedValues?: boolean
	): Promise<number> {
		const qEntity = context.ioc.airDb.qSchemas
			[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name]

		let rawInsert: RawInsertValues<any> = {
			insertInto: qEntity,
			columns: context.ioc.metadataUtils.getAllNonGeneratedColumns(qEntity),
			values: []
		}
		let columnIndexesInValues           = []

		rawInsert.columns.forEach((
			qField: IQOperableFieldInternal<any, any, any, any>,
			index
		) => {
			columnIndexesInValues[qField.dbColumn.index] = index
		})

		for (const entity of entities) {
			let valuesFragment: any = []

			for (const dbProperty of context.dbEntity.properties) {
				let newValue: any = entity[dbProperty.name]
				if (newValue === undefined) {
					newValue = null
				}
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation = dbProperty.relation[0]
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
								dbColumn: DbColumn,
								columnValue: any,
								propertyNameChains: string[][],
							) => {
								if (dbColumn.isGenerated) {
									return
								}
								valuesFragment[columnIndexesInValues[dbColumn.index]]
									= columnValue === undefined ? null : columnValue
							}, false)
							break
						case EntityRelationType.ONE_TO_MANY:
							break
						default:
							throw new Error(
								`Unknown relationType '${dbRelation.relationType}' 
						for '${context.dbEntity.name}.${dbProperty.name}'.`)
					}
				} else {
					let column = dbProperty.propertyColumns[0].column
					if (!column.isGenerated) {
						valuesFragment[columnIndexesInValues[column.index]] = newValue
					}
				}
			}
			rawInsert.values.push(valuesFragment)
		}

		let numberOfAffectedRecords = 0

		if (rawInsert.values.length) {
			const generatedColumns = context.dbEntity.columns.filter(
				column => column.isGenerated)
			if (generatedColumns.length && ensureGeneratedValues) {
				const idsAndGeneratedValues = await this.internalInsertValuesGetIds(
					rawInsert, transaction, context)
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
						rawInsert, transaction, context, ensureGeneratedValues)
			}
		}

		return numberOfAffectedRecords
	}

	/**
	 * On an update operation, can a nested create contain an update?
	 * Via:
	 *  OneToMany:
	 *    Yes, if the child entity is itself in the update cache
	 *  ManyToOne:
	 *    Cascades do not travel across ManyToOne
	 */
	protected async internalUpdate<E, EntityCascadeGraph>(
		entity: E,
		originalEntity: E,
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {
		const qEntity                                =
			      context.ioc.airDb.qSchemas[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name]
		const setFragment: any                       = {}
		const idWhereFragments: JSONValueOperation[] = []
		let numUpdates                               = 0

		for (const dbProperty of context.dbEntity.properties) {
			const updatedValue = entity[dbProperty.name]
			if (!dbProperty.relation || !dbProperty.relation.length) {
				const dbColumn      = dbProperty.propertyColumns[0].column
				const originalValue = originalEntity[dbColumn.name]
				if (dbProperty.isId) {
					// For an id property, the value is guaranteed to be the same (and not empty) -
					// cannot entity-update id fields
					idWhereFragments.push((<any>qEntity)[dbProperty.name].equals(updatedValue))
				} else if (!valuesEqual(originalValue, updatedValue)) {
					setFragment[dbColumn.name] = updatedValue
					numUpdates++
				}
			} else {
				const dbRelation = dbProperty.relation[0]
				switch (dbRelation.relationType) {
					case EntityRelationType.MANY_TO_ONE:
						context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
							dbColumn: DbColumn,
							value: any,
							propertyNameChains: string[][],
						) => {
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
						break
					case EntityRelationType.ONE_TO_MANY:
						break
					default:
						throw new Error(
							`Unknown relationType '${dbRelation.relationType}' 
						for '${context.dbEntity.name}.${dbProperty.name}'.`)
				}
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

			numberOfAffectedRecords = await this.internalUpdateWhere(update, transaction, context)
		}

		return numberOfAffectedRecords
	}

	protected async internalDelete<E, EntityCascadeGraph>(
		entity: E,
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {

		const dbEntity                               = context.dbEntity
		const qEntity                                =
			      context.ioc.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name]
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
				if (dbProperty.isId) {
					// For an id property, the value is guaranteed to be the same (and not empty) -
					// cannot entity-update id fields
					idWhereFragments.push((<any>qEntity)[propertyName].equals(deletedValue))
				}
			} else {
				switch (dbRelation.relationType) {
					case EntityRelationType.MANY_TO_ONE:
						context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, dbEntity, (
							dbColumn: DbColumn,
							value: any,
							propertyNameChains: string[][]
						) => {
							if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
								let idQProperty = qEntity
								for (const propertyNameLink of propertyNameChains[0]) {
									idQProperty = idQProperty[propertyNameLink]
								}
								// For an id property, the value is guaranteed to be the same (and not
								// empty) - cannot entity-update id fields
								idWhereFragments.push(idQProperty.equals(value))
							}
						}, false)
						break
					case EntityRelationType.ONE_TO_MANY:
						break
					default:
						throw new Error(
							`Unknown relationType '${dbRelation.relationType}' 
						for '${dbEntity.name}.${dbProperty.name}'.`)
				}
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
		return await this.internalDeleteWhere(deleteWhere, transaction, context)
	}

	protected async internalInsertColumnValues<IQE extends IQEntity<any>>(
		rawInsertColumnValues: RawInsertColumnValues<IQE>,
		transaction: ITransaction,
		context: IOperationContext<any, any>
	): Promise<number> {
		const insertColumnValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertColumnValues, null, context)

		return await context.ioc.transactionalServer.insertValues(portableQuery, transaction, context)
	}

	protected async internalInsertValues<E, EntityCascadeGraph, IQE extends IQEntity<any>>(
		rawInsertValues: RawInsertValues<IQE>,
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>,
		ensureGeneratedValues?: boolean
	): Promise<number> {
		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		return await context.ioc.transactionalServer.insertValues(portableQuery, transaction, context, ensureGeneratedValues)
	}

	protected async internalInsertColumnValuesGenerateIds<IQE extends IQEntity<any>>(
		rawInsertColumnValues: RawInsertColumnValues<IQE>,
		transaction: ITransaction,
		context: IOperationContext<any, any>
	): Promise<number[] | string[] | number[][] | string[][]> {

		const insertValues: InsertColumnValues<IQE> = new InsertColumnValues(rawInsertColumnValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		return await context.ioc.transactionalServer.insertValuesGetIds(portableQuery, transaction, context)
	}

	protected async internalInsertValuesGetIds<E, EntityCascadeGraph, IQE extends IQEntity<any>>(
		rawInsertValues: RawInsertValues<IQE>,
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>
	): Promise<number[] | string[] | number[][] | string[][]> {

		const insertValues: InsertValues<IQE> = new InsertValues(rawInsertValues)

		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			insertValues, null, context)

		return await context.ioc.transactionalServer.insertValuesGetIds(portableQuery, transaction, context)
	}

	protected async internalUpdateColumnsWhere<E, EntityCascadeGraph, IEUC extends IEntityUpdateColumns,
		IQE extends IQEntity<any>>(
		updateColumns: UpdateColumns<IEUC, IQE>,
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {
		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			updateColumns, null, context)

		return await context.ioc.transactionalServer.updateValues(portableQuery, transaction, context)
	}

	protected async internalUpdateWhere<E, EntityCascadeGraph, IEUP extends IEntityUpdateProperties,
		IQE extends IQEntity<any>>(
		update: UpdateProperties<IEUP, IQE>,
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {
		const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			update, null, context)

		return await context.ioc.transactionalServer.updateValues(portableQuery, transaction, context)
	}

	protected async internalDeleteWhere<E, EntityCascadeGraph, IQE extends IQEntity<any>>(
		aDelete: Delete<IQE>,
		transaction: ITransaction,
		context: IOperationContext<E, EntityCascadeGraph>
	): Promise<number> {
		let portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			aDelete, null, context)

		return await context.ioc.transactionalServer.deleteWhere(portableQuery, transaction, context)
	}

}
