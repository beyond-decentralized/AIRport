import {
	and,
	Delete,
	InsertValues,
	IQOperableFieldInternal,
	or,
	RawDelete,
	RawInsertValues,
	UpdateProperties,
	valuesEqual
} from '@airport/air-control'
import { container, DI } from '@airport/di'
import {
	DbColumn,
	EntityRelationType,
	ENTITY_STATE_MANAGER,
	ISaveResult,
	JSONValueOperation,
	PortableQuery
} from '@airport/ground-control'
import { IActor } from '@airport/holding-pattern'
import {
	IOperationContext,
	IOperationManager,
	ITransaction
} from '@airport/terminal-map'
import { IocOperationContext } from '..'
import { OPERATION_MANAGER } from '../tokens'

/**
 * Created by Papa on 11/15/2016.
 */
export class OperationManager
	implements IOperationManager {

	/**
	 * Transactional context must have been started by the time this method is called.
	 *
	 * @param qEntity
	 * @param entity
	 */
	async performSave<E>(
		entities: E | E[],
		actor: IActor,
		transaction: ITransaction,
		context: IOperationContext,
	): Promise<ISaveResult> {
		let entityGraph
		if (context.internal) {
			if (entities instanceof Array) {
				entityGraph = entities
			} else {
				entityGraph = [entities]
			}
		} else {
			const verifiedTree = context.ioc.cascadeGraphVerifier
				.verify(entities, context)
			entityGraph = context.ioc.entityGraphReconstructor
				.restoreEntityGraph(verifiedTree, context)
		}
		context.ioc.structuralEntityValidator.validate(entityGraph, [], context)

		const operations = context.ioc.dependencyGraphResolver
			.getOperationsInOrder(entityGraph, context)
		const rootDbEntity = context.dbEntity
		const saveResult: ISaveResult = {
			created: {},
			updated: {},
			deleted: {}
		}
		for (const operation of operations) {
			context.dbEntity = operation.dbEntity
			if (operation.isCreate) {
				await this.internalCreate(
					operation.entities, actor, transaction, saveResult, context, true)
			} else if (operation.isDelete) {
				await this.internalDelete(
					operation.entities, actor, transaction, saveResult, context)
			} else {
				await this.internalUpdate(
					operation.entities, actor, transaction, saveResult, context)
			}
		}
		context.dbEntity = rootDbEntity

		return saveResult
	}

	protected async internalCreate<E>(
		entities: E[],
		actor: IActor,
		transaction: ITransaction,
		saveResult: ISaveResult,
		context: IOperationContext,
		ensureGeneratedValues?: boolean
	): Promise<void> {
		const qEntity = context.ioc.airDb.qSchemas
		[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name]

		let rawInsert: RawInsertValues<any> = {
			insertInto: qEntity,
			columns: context.ioc.metadataUtils.getAllNonGeneratedColumns(qEntity),
			values: []
		}
		let columnIndexesInValues = []

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

		const insertValues: InsertValues<any> = new InsertValues(rawInsert)

		if (rawInsert.values.length) {
			const generatedColumns = context.dbEntity.columns.filter(
				column => column.isGenerated)
			if (generatedColumns.length && ensureGeneratedValues) {
				const portableQuery: PortableQuery = context.ioc.queryFacade
					.getPortableQuery(insertValues, null, context)
				const idsAndGeneratedValues = await context.ioc.insertManager
					.insertValuesGetIds(portableQuery, actor, transaction, context)
				for (let i = 0; i < entities.length; i++) {
					const entity = entities[i]
					const entitySaveResult = {}
					saveResult.created[
						context.ioc.entityStateManager.getOperationUniqueId(entity)
					] = entitySaveResult
					for (const generatedColumn of generatedColumns) {
						// Return index for generated column values is: DbColumn.index
						const generatedPropertyName = generatedColumn.propertyColumns[0].property.name
						const generatedPropertyValue = idsAndGeneratedValues[i][generatedColumn.index]
						entity[generatedPropertyName] = generatedPropertyValue
						entitySaveResult[generatedPropertyName] = generatedPropertyValue
					}
				}
			} else {
				const portableQuery: PortableQuery = context.ioc.queryFacade
					.getPortableQuery(insertValues, null, context)
				await context.ioc.insertManager.insertValues(
					portableQuery, actor, transaction, context, ensureGeneratedValues)
				for (let i = 0; i < entities.length; i++) {
					const entity = entities[i]
					saveResult.created[
						context.ioc.entityStateManager.getOperationUniqueId(entity)
					] = true
				}
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
	protected async internalUpdate<E>(
		entities: E[],
		actor: IActor,
		transaction: ITransaction,
		saveResult: ISaveResult,
		context: IOperationContext
	): Promise<void> {
		const entityStateManager = await container(this).get(ENTITY_STATE_MANAGER)
		const qEntity = context.ioc.airDb.qSchemas
		[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name]

		for (const entity of entities) {
			const setFragment: any = {}
			const idWhereFragments: JSONValueOperation[] = []
			let runUpdate = false
			const originalEntity = entityStateManager.getOriginalValues(entity)
			if (!originalEntity) {
				continue
			}
			for (const dbProperty of context.dbEntity.properties) {
				const updatedValue = entity[dbProperty.name]
				if (!dbProperty.relation || !dbProperty.relation.length) {
					const originalValue = originalEntity[dbProperty.name]
					if (dbProperty.isId) {
						// For an id property, the value is guaranteed to be the same (and not empty) -
						// cannot entity-update id fields
						idWhereFragments.push((<any>qEntity)[dbProperty.name]
							.equals(updatedValue))
					} else if (!valuesEqual(originalValue, updatedValue)) {
						setFragment[dbProperty.name] = updatedValue
						saveResult.updated[
							context.ioc.entityStateManager.getOperationUniqueId(entity)
						] = true
						runUpdate = true
					}
				} else {
					const dbRelation = dbProperty.relation[0]
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							let propertyOriginalValue = originalEntity[dbProperty.name]
							context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (
								_dbColumn: DbColumn,
								value: any,
								propertyNameChains: string[][],
							) => {
								let originalColumnValue = propertyOriginalValue
								let columnValue = value
								let valuePropertyNameChain = value
								for (const childPropertyName of propertyNameChains[0]) {
									if (originalColumnValue instanceof Object
										&& originalColumnValue[childPropertyName]) {
										originalColumnValue = originalColumnValue[childPropertyName]
									} else {
										originalColumnValue = null
									}
									if (columnValue instanceof Object
										&& columnValue[childPropertyName]) {
										columnValue = columnValue[childPropertyName]
										valuePropertyNameChain.push(childPropertyName)
									} else {
										columnValue = null
									}
								}
								if (dbProperty.isId) {
									let idQProperty = qEntity
									for (const propertyNameLink of propertyNameChains[0]) {
										idQProperty = idQProperty[propertyNameLink]
									}
									// For an id property, the value is guaranteed to be the same (and not
									// empty) - cannot entity-update id fields
									idWhereFragments.push(idQProperty.equals(value))
								} else if (!valuesEqual(originalColumnValue, columnValue)) {
									let currentSetFragment = setFragment
									for (let i = 0; i < valuePropertyNameChain.length - 1; i++) {
										const childPropertyName = valuePropertyNameChain[i]
										if (!currentSetFragment[childPropertyName]) {
											currentSetFragment[childPropertyName] = {}
										}
										currentSetFragment = currentSetFragment[childPropertyName]
									}
									currentSetFragment[valuePropertyNameChain.length - 1] = columnValue
									saveResult.updated[
										context.ioc.entityStateManager.getOperationUniqueId(entity)
									] = true
									runUpdate = true
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

			if (runUpdate) {
				let whereFragment
				if (idWhereFragments.length > 1) {
					whereFragment = and(...idWhereFragments)
				} else {
					whereFragment = idWhereFragments[0]
				}
				const rawUpdate = {
					update: qEntity,
					set: setFragment,
					where: whereFragment
				}
				const update: UpdateProperties<any, any> = new UpdateProperties(rawUpdate)
				const portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
					update, null, context)

				await context.ioc.updateManager.updateValues(
					portableQuery, actor, transaction, context);

			}
		}
	}

	protected async internalDelete<E>(
		entities: E[],
		actor: IActor,
		transaction: ITransaction,
		saveResult: ISaveResult,
		context: IOperationContext
	): Promise<void> {

		const dbEntity = context.dbEntity
		const qEntity =
			context.ioc.airDb.qSchemas
			[dbEntity.schemaVersion.schema.index][dbEntity.name]
		const idWhereFragments: JSONValueOperation[] = []
		const valuesMapByColumn: any[] = []
		let entityIdWhereClauses = []
		for (const entity of entities) {
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

			if (idWhereFragments.length > 1) {
				entityIdWhereClauses.push(and(...idWhereFragments))
			} else {
				entityIdWhereClauses.push(idWhereFragments[0])
			}
			saveResult.deleted[
				context.ioc.entityStateManager.getOperationUniqueId(entity)
			] = true
		}

		let where
		if (entityIdWhereClauses.length === 1) {
			where = entityIdWhereClauses[0]
		} else {
			where = or(...entityIdWhereClauses)
		}

		let rawDelete: RawDelete<any> = {
			deleteFrom: qEntity,
			where
		}
		let deleteWhere: Delete<any> = new Delete(rawDelete)
		let portableQuery: PortableQuery = context.ioc.queryFacade.getPortableQuery(
			deleteWhere, null, context)
		await context.ioc.deleteManager.deleteWhere(portableQuery, actor,
			transaction, context)
	}

}
DI.set(OPERATION_MANAGER, OperationManager)
