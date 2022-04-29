import {
	and,
	Delete,
	IAirportDatabase,
	IApplicationUtils,
	InsertValues,
	IQMetadataUtils,
	IQOperableFieldInternal,
	IQueryFacade,
	or,
	RawDelete,
	RawInsertValues,
	UpdateProperties,
	valuesEqual
} from '@airport/air-control'
import {
	DbColumn,
	EntityRelationType,
	IEntityStateManager,
	IRootTransaction,
	ISaveActor,
	ISaveRepository,
	ISaveResult,
	JSONValueOperation,
	PortableQuery
} from '@airport/ground-control'
import { IActor } from '@airport/holding-pattern'
import {
	ICascadeGraphVerifier,
	IDeleteManager,
	IDependencyGraphResolver,
	IEntityGraphReconstructor,
	IInsertManager,
	IOperationContext,
	IOperationManager,
	IStructuralEntityValidator,
	ITransaction,
	IUpdateManager
} from '@airport/terminal-map'

/**
 * Created by Papa on 11/15/2016.
 */
export class OperationManager
	implements IOperationManager {

	airportDatabase: IAirportDatabase
	applicationUtils: IApplicationUtils
	cascadeGraphVerifier: ICascadeGraphVerifier
	deleteManager: IDeleteManager
	dependencyGraphResolver: IDependencyGraphResolver
	entityGraphReconstructor: IEntityGraphReconstructor
	entityStateManager: IEntityStateManager
	insertManager: IInsertManager
	qMetadataUtils: IQMetadataUtils
	queryFacade: IQueryFacade
	structuralEntityValidator: IStructuralEntityValidator
	updateManager: IUpdateManager

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
		rootTransaction: IRootTransaction,
		context: IOperationContext,
	): Promise<ISaveResult> {
		let entityGraph
		context.isSaveOperation = true
		if (context.internal) {
			if (entities instanceof Array) {
				entityGraph = entities
			} else {
				entityGraph = [entities]
			}
		} else {
			const verifiedTree = this.cascadeGraphVerifier
				.verify(entities, context)
			entityGraph = this.entityGraphReconstructor
				.restoreEntityGraph(verifiedTree, context)
		}
		await this.structuralEntityValidator.validate(entityGraph, [], context)

		const operations = this.dependencyGraphResolver
			.getOperationsInOrder(entityGraph, context)
		const rootDbEntity = context.dbEntity
		let saveActor: ISaveActor = {
			id: actor.id,
			uuId: actor.uuId,
			user: actor.user ? {
				id: actor.user.id
			} : null
		}
		let newRepository: ISaveRepository
		if (context.newRepository) {
			newRepository = {
				id: context.newRepository.id,
				createdAt: context.newRepository.createdAt,
				uuId: context.newRepository.uuId,
				ageSuitability: context.newRepository.ageSuitability,
				source: context.newRepository.source,
				ownerActor: {
					id: actor.id,
					uuId: actor.uuId,
					user: actor.user ? {
						id: actor.user.id
					} : null
				}
			}
		}
		const saveResult: ISaveResult = {
			actor: saveActor,
			created: {},
			newRepository,
			deleted: {},
			updated: {},
		}
		for (const operation of operations) {
			context.dbEntity = operation.dbEntity
			if (operation.isCreate) {
				await this.internalCreate(
					operation.entities, actor, transaction, rootTransaction, saveResult, context, true)
			} else if (operation.isDelete) {
				await this.internalDelete(
					operation.entities, actor, transaction, rootTransaction, saveResult, context)
			} else {
				await this.internalUpdate(
					operation.entities, actor, transaction, rootTransaction, saveResult, context)
			}
		}
		context.dbEntity = rootDbEntity

		return saveResult
	}

	protected async internalCreate<E>(
		entities: E[],
		actor: IActor,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		saveResult: ISaveResult,
		context: IOperationContext,
		ensureGeneratedValues?: boolean
	): Promise<void> {
		const qEntity = this.airportDatabase.qApplications
		[context.dbEntity.applicationVersion.application.index][context.dbEntity.name]

		let rawInsert: RawInsertValues<any> = {
			insertInto: qEntity,
			columns: this.qMetadataUtils.getAllInsertableColumns(qEntity),
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
							this.applicationUtils.forEachColumnOfRelation(dbRelation, entity, (
								dbColumn: DbColumn,
								columnValue: any,
								_propertyNameChains: string[][],
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
				const portableQuery: PortableQuery = this.queryFacade
					.getPortableQuery(insertValues, null, context)
				const idsAndGeneratedValues = await this.insertManager
					.insertValuesGetIds(portableQuery, actor, transaction, rootTransaction, context)
				for (let i = 0; i < entities.length; i++) {
					const entity = entities[i]
					const entitySaveResult = {}
					saveResult.created[
						this.entityStateManager.getOperationUniqueId(entity)
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
				const portableQuery: PortableQuery = this.queryFacade
					.getPortableQuery(insertValues, null, context)
				await this.insertManager.insertValues(
					portableQuery, actor, transaction, rootTransaction, context, ensureGeneratedValues)
				for (let i = 0; i < entities.length; i++) {
					const entity = entities[i]
					saveResult.created[
						this.entityStateManager.getOperationUniqueId(entity)
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
		rootTransaction: IRootTransaction,
		saveResult: ISaveResult,
		context: IOperationContext
	): Promise<void> {
		const qEntity = this.airportDatabase.qApplications
		[context.dbEntity.applicationVersion.application.index][context.dbEntity.name]

		for (const entity of entities) {
			const setFragment: any = {}
			const idWhereFragments: JSONValueOperation[] = []
			let runUpdate = false
			const originalEntity = this.entityStateManager.getOriginalValues(entity)
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
							this.entityStateManager.getOperationUniqueId(entity)
						] = true
						runUpdate = true
					}
				} else {
					const dbRelation = dbProperty.relation[0]
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							let propertyOriginalValue = originalEntity[dbProperty.name]
							this.applicationUtils.forEachColumnOfRelation(dbRelation, entity, (
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
										this.entityStateManager.getOperationUniqueId(entity)
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
				const portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
					update, null, context)

				await this.updateManager.updateValues(
					portableQuery, actor, transaction, rootTransaction, context);

			}
		}
	}

	protected async internalDelete<E>(
		entities: E[],
		actor: IActor,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		saveResult: ISaveResult,
		context: IOperationContext
	): Promise<void> {

		const dbEntity = context.dbEntity
		const qEntity =
			this.airportDatabase.qApplications
			[dbEntity.applicationVersion.application.index][dbEntity.name]
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
							this.applicationUtils.forEachColumnOfRelation(dbRelation, dbEntity, (
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
				this.entityStateManager.getOperationUniqueId(entity)
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
		let portableQuery: PortableQuery = this.queryFacade.getPortableQuery(
			deleteWhere, null, context)
		await this.deleteManager.deleteWhere(portableQuery, actor,
			transaction, rootTransaction, context)
	}

}
