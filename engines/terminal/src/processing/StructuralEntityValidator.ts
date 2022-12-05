import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbColumn,
	DbEntity,
	DbProperty,
	EntityRelationType,
	EntityState,
	IEntityStateManager,
	IRepository,
	SQLDataType
} from '@airport/ground-control'
import { IAirEntity } from '@airport/holding-pattern/dist/app/bundle'
import { IApplicationUtils } from '@airport/tarmaq-query'
import {
	IMissingRepositoryRecord,
	IOperationContext,
	IStructuralEntityValidator,
	ITransactionContext
} from '@airport/terminal-map'

@Injected()
export class StructuralEntityValidator
	implements IStructuralEntityValidator {

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	entityStateManager: IEntityStateManager

	validate<E>(
		records: E[],
		operatedOnEntityIndicator: boolean[],
		missingRepositoryRecords: IMissingRepositoryRecord[],
		topLevelObjectRepositories: IRepository[],
		context: IOperationContext & ITransactionContext,
		depth = 1,
		fromOneToMany = false,
		parentRelationProperty: DbProperty = null,
		rootRelationRecord = null,
		parentRelationRecord = null
	): void {

		const dbEntity = context.dbEntity
		if (!dbEntity.idColumns.length) {
			throw new Error(
				`Cannot run 'save' for entity '${dbEntity.name}' with no @Id(s).
					Please use non-entity operations (like 'insert' or 'updateWhere') instead.`)
		}

		let haveRootRelationRecord = !!rootRelationRecord

		const levelObjectRepositoryMapByGUID: Map<string, IRepository> = new Map()

		for (const record of records) {
			if (!haveRootRelationRecord) {
				rootRelationRecord = record
			}
			const {
				isCreate,
				isParentSchemaId,
				isPassThrough,
				isStub
			} = this.entityStateManager.getEntityStateTypeAsFlags(record, dbEntity)

			if (isParentSchemaId) {
				// No processing is needed (already covered by id check)
				continue
			}

			const operationUniqueId = this.entityStateManager.getOperationUniqueId(record)
			const entityOperatedOn = !!operatedOnEntityIndicator[operationUniqueId]
			if (entityOperatedOn) {
				continue
			}
			operatedOnEntityIndicator[operationUniqueId] = true

			let newRepositoryNeeded = false;

			for (const dbProperty of dbEntity.properties) {
				let propertyValue: any = record[dbProperty.name]
				if (propertyValue === undefined && !isStub) {
					propertyValue = null
					record[dbProperty.name] = propertyValue
				}
				/*
				 * It is possible for the @Id's of an entity to be in
				 * a @ManyToOne, so we need to check
				 */
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation = dbProperty.relation[0]
					let relatedEntities = null
					let relationIsOneToMany = false
					let isRelationNullable = true
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							// Id columns are for the parent (currently processed) entity and must be
							// checked as part of this entity
							if (dbProperty.isId) {
								let isMissingRepositoryProperty = false;
								this.applicationUtils.forEachColumnOfRelation(dbRelation, record, (
									dbColumn: DbColumn,
									columnValue: any,
									_propertyNameChains: string[][],
								) => {
									if (dbColumn.notNull) {
										isRelationNullable = false
									}
									if (this.isRepositoryColumnAndNewRepositoryNeed(
										dbEntity, dbProperty, dbColumn,
										isCreate, record, columnValue, context)) {
										isMissingRepositoryProperty = true
									} else if (this.applicationUtils.isRepositoryId(dbColumn.name)) {
										const repository = record[dbProperty.name]
										if (!repository._localId || !repository.GUID) {
											throw new Error(`Repository must have a _localId and GUID assigned:
hence, it must an existing repository that exists locally.`)
										}
										if (!levelObjectRepositoryMapByGUID.has(repository.GUID)) {
											levelObjectRepositoryMapByGUID.set(repository.GUID, repository)
											if (depth == 1) {
												topLevelObjectRepositories.push(repository)
											}
										}
									}
								}, false)
								if (isMissingRepositoryProperty) {
									// TODO: document that creating a new repository will automatically
									// populate it in all objects passed to save that don't have a
									// repository record reference
									// TODO: document that if no new repository record is created
									// then a top level object must have a repository record reference.
									// Then all nested records without a repository record reference
									// will have that repository assigned
									if (!context.rootTransaction.newRepository) {
										newRepositoryNeeded = true
										missingRepositoryRecords.push({
											record,
											repositoryPropertyName: dbProperty.name
										})
									} else {
										record[dbProperty.name] = context.rootTransaction.newRepository
									}
								}
							}
							if (fromOneToMany) {
								const parentOneToManyElems = parentRelationProperty.relation[0].oneToManyElems
								const parentMappedBy = parentOneToManyElems ? parentOneToManyElems.mappedBy : null
								const mappedBy = dbRelation.manyToOneElems ? dbRelation.manyToOneElems.mappedBy : null
								// NOTE: 'actor' or the 'repository' properties may be automatically populated
								// in the entity by this.validateRelationColumn
								if (parentMappedBy === dbProperty.name
									|| mappedBy === parentRelationProperty.name) {
									// Always fix to the parent record
									record[dbProperty.name] = parentRelationRecord
									// if (!propertyValue && !entity[dbProperty.name]) {
									// 	// The @ManyToOne side of the relationship is missing, add it
									// 	entity[dbProperty.name] = parentRelationEntity
									// }
								}
							}
							if (propertyValue) {
								relatedEntities = [propertyValue]
							} else if (!isRelationNullable) {
								throw new Error(`Non-nullable relation ${dbEntity.name}.${dbProperty.name} does not have value assigned`)
							} else {
								console.warn(`Probably OK: Nullable @ManyToOne ${dbEntity.name}.${dbProperty.name} does not have anything assigned.`)
							}

							break
						case EntityRelationType.ONE_TO_MANY:
							relationIsOneToMany = true
							relatedEntities = propertyValue
							break
						default:
							throw new Error(`Unexpected relation type ${dbRelation.relationType}
for ${dbEntity.name}.${dbProperty.name}`)
					} // switch dbRelation.relationType
					if (relatedEntities && relatedEntities.length) {
						const previousDbEntity = context.dbEntity
						context.dbEntity = dbRelation.relationEntity
						this.validate(relatedEntities, operatedOnEntityIndicator,
							missingRepositoryRecords, topLevelObjectRepositories, context, depth + 1,
							relationIsOneToMany, dbProperty, rootRelationRecord, record)
						context.dbEntity = previousDbEntity
					}
				} // if (dbProperty.relation // else its not a relation property
				else {
					const dbColumn = dbProperty.propertyColumns[0].column
					if (dbProperty.isId) {
						const isIdColumnEmpty = this.applicationUtils.isIdEmpty(propertyValue)
						this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
					} else {
						if (isStub || isParentSchemaId) {
							if (propertyValue !== undefined) {
								throw new Error(`Unexpected non-@Id value Stub|ParentSchemaId|Deleted record.
Property: ${dbEntity.name}.${dbProperty.name}, with "${this.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`)
							}
						}
					}
					this.ensureNonRelationalValue(dbProperty, dbColumn, propertyValue)
				} // else (dbProperty.relation
			} // for (const dbProperty of dbEntity.properties)

			if (!isPassThrough && !isStub && !isParentSchemaId) {
				this.ensureRepositoryValidity(record, rootRelationRecord, parentRelationRecord, dbEntity,
					parentRelationProperty, isCreate, fromOneToMany, newRepositoryNeeded, context)
			}
		} // for (const record of records)
	}

	private ensureRepositoryValidity(
		record,
		rootRelationRecord,
		parentRelationRecord,
		dbEntity: DbEntity,
		parentRelationProperty: DbProperty,
		isCreate: boolean,
		fromOneToMany: boolean,
		newRepositoryNeeded: boolean,
		context: IOperationContext
	): void {
		if (!dbEntity.isAirEntity) {
			return
		}
		if (!parentRelationRecord) {
			const originalValues = this.entityStateManager.getOriginalValues(record)
			if (newRepositoryNeeded && originalValues && originalValues.repository
				&& originalValues.actor && originalValues._actorRecordId) {
				const airEntity = record as unknown as IAirEntity
				airEntity.originalRepository = originalValues.repository
				this.entityStateManager.markAsStub(airEntity.originalRepository)
				airEntity.originalActor = originalValues.actor
				this.entityStateManager.markAsStub(airEntity.originalActor)
				airEntity.originalActorRecordId = originalValues._actorRecordId
			}
			return
		}
		// If a new repository is created for this record
		if (newRepositoryNeeded) {
			// 			throw new Error(`Error creating a new repository in a nested record:
			// In Entity: ${dbEntity.name}
			// That is a child of ${parentRelationProperty.entity.name} via ${parentRelationProperty.entity.name}.${parentRelationProperty.name}
			// ->
			// When creating a new repository the top level record should be of the newly created repository.
			// `)
			// no further checks needed
			return
		}
		// One to many get traversed as well, if it's in the input graph/tree
		// it is assumed to be part of the same repository
		// if (fromOneToMany) {
		// 	return
		// }

		let airEntity = record as unknown as IAirEntity
		// If the repositories of parent record and child record match
		if (rootRelationRecord.repository._localId === airEntity.repository._localId) {
			// no further checks needed
			return
		}

		if (isCreate) {
			throw new Error(`A newly created ${dbEntity.name} via ${dbEntity.name} record for repository _localId ${airEntity.repository._localId} (GUID: ${airEntity.repository.GUID})
is being assigned to repository _localId ${airEntity.repository._localId} (GUID: ${airEntity.repository.GUID})
	This is because it is being referenced via ${parentRelationProperty.entity.name}.${parentRelationProperty.name},
	from a record of repository _localId ${airEntity.repository._localId} (GUID: ${airEntity.repository.GUID})
	
	If you are manually creating a copy of a record in another repository, there is no need,
	AIRport automatically copies all records refrenced via @ManyToOne()s into the created/modified
	repository.

	Otherwise, did you mean to set this record's repository to the same one as the referencing record?`)
		}

		// If it doesn't then it is a reference to another repository - switch
		// the record to the parent repository and set the originalRepositoryValue
		airEntity.originalRepository = airEntity.repository
		airEntity.repository = rootRelationRecord.repository

		// Aslo set originalActor and originalActorRecordId to look up the original record
		airEntity.originalActor = airEntity.actor
		airEntity.originalActorRecordId = airEntity._actorRecordId

		// reset 'actor' and clear '_actorRecordId' to prevents unique constraint
		// violation if multiple databases flip to the same exact record (independently)
		airEntity.actor = context.actor
		delete airEntity._actorRecordId

		// Flip the state of this record to EntityState.CREATE this record now
		// has to be created in the referencing repository
		airEntity[this.entityStateManager.getStateFieldName()] = EntityState.CREATE

		// NOTE: If the child record is not provided and it's an optional
		// @ManyToOne() it will be treated as if no record is there.  That is
		// probaby the only correct way to handle it and a warning is
		// shown to the user in this case
	}

	protected isRepositoryColumnAndNewRepositoryNeed<E>(
		dbEntity: DbEntity,
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		isCreate: boolean,
		entity: E,
		columnValue: any,
		context: IOperationContext,
	): boolean {
		if (!dbColumn.idIndex && dbColumn.idIndex !== 0) {
			return
		}
		const isIdColumnEmpty = this.applicationUtils.isIdEmpty(columnValue)

		if (!dbEntity.isAirEntity) {
			this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
			return false
		}

		if (!isIdColumnEmpty) {
			if (isCreate) {
				if (this.applicationUtils.isActorId(dbColumn.name)) {
					throw new Error(`Actor cannot be passed in for create Operations`)
				}
			}
			return false
		}
		if (!isCreate) {
			throw new Error(`Ids must be populated in entities for non-Create operations`)
		}
		if (this.applicationUtils.isRepositoryId(dbColumn.name)) {
			// Repository was not provided - use context's 'newRepository'
			return true
		} else if (this.applicationUtils.isActorId(dbColumn.name)) {
			// Use context's 'actor'
			entity[dbProperty.name] = context.actor
			return false
		} else if (this.applicationUtils.isActorRecordId(dbColumn.name)) {
			return false
		}

		throw new Error(`Unexpected @Id column '${dbColumn.name}' in a AirEntity.`)
	}

	protected ensureIdValue(
		dbEntity: DbEntity,
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		isCreate: boolean,
		isIdColumnEmpty: boolean
	): void {
		if (dbColumn.isGenerated) {
			if (isCreate && !isIdColumnEmpty) {
				throw new Error(
					`@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name},
column:  ${dbColumn.name}
must NOT have a value for entity Insert operation.`)
			} else if (!isCreate && isIdColumnEmpty) {
				throw new Error(
					`@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name} 
column:  ${dbColumn.name}
must have a value for entity non-Insert operations.`)
			}
		} else if (isIdColumnEmpty) {
			throw new Error(
				`non-@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name},
column:  ${dbColumn.name}
must always have a value for all entity operations.`)
		}
	}

	protected ensureNonRelationalValue(
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

	protected throwUnexpectedProperty(
		dbProperty: DbProperty,
		dbColumn: DbColumn,
		value: any
	) {
		throw new Error(
			`Unexpected property value '${value.toString()}' in property '${dbProperty.entity.name}.${dbProperty.name}'
		(column: '${dbColumn.name}').`)
	}

}
