import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IApplicationNameUtils,
	DbColumn,
	DbEntity,
	DbProperty,
	Dictionary,
	EntityRelationType,
	IAirEntity,
	IApplicationUtils,
	IEntityStateManager,
	IRepository,
	SQLDataType
} from '@airport/ground-control'
import {
	IMissingRepositoryRecord,
	IOperationContext,
	IStructuralEntityValidator,
	ITransactionContext
} from '@airport/terminal-map'
import {
	ICrossRepositoryRelationManager
} from '@airport/holding-pattern/dist/app/bundle'

@Injected()
export class StructuralEntityValidator
	implements IStructuralEntityValidator {

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	crossRepositoryRelationManager: ICrossRepositoryRelationManager

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	entityStateManager: IEntityStateManager

	validate<E extends IAirEntity | any>(
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

		const objectLevelRepositoryMapByGUID: Map<string, IRepository> = new Map()

		for (const record of records) {
			if (!haveRootRelationRecord) {
				rootRelationRecord = record
			}
			const {
				isCreate,
				isFromAnotherApp,
				isPassThrough,
				isStub
			} = this.entityStateManager.getEntityStateTypeAsFlags(record, dbEntity)

			if (isFromAnotherApp) {
				// No processing is needed (already covered by id check)
				continue
			}

			const operationUniqueId = this.entityStateManager.getOperationUniqueId(record)
			const entityAlreadyOperatedOn = operatedOnEntityIndicator[operationUniqueId]
			if (entityAlreadyOperatedOn) {
				continue
			}
			operatedOnEntityIndicator[operationUniqueId] = true;

			(record as IAirEntity).toBeCopied = false
			let repositoryAssignmentFromParentNeeded = false

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
					repositoryAssignmentFromParentNeeded = this.processRelation(
						operatedOnEntityIndicator,
						missingRepositoryRecords,
						topLevelObjectRepositories,
						context,
						depth,
						fromOneToMany,
						parentRelationProperty,
						rootRelationRecord,
						parentRelationRecord,
						dbEntity,
						objectLevelRepositoryMapByGUID,
						record,
						isCreate,
						dbProperty,
						propertyValue
					)
				} else {
					const dbColumn = dbProperty.propertyColumns[0].column
					if (dbProperty.isId) {
						const isIdColumnEmpty = this.applicationUtils.isIdEmpty(propertyValue)
						this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
					} else {
						if (isStub || isFromAnotherApp) {
							if (propertyValue !== undefined) {
								throw new Error(`Unexpected non-@Id value Stub|ParentSchemaId|Deleted record.
Property: ${dbEntity.name}.${dbProperty.name}, with "${this.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`)
							}
						}
					}
					this.ensureNonRelationalValue(dbProperty, dbColumn, propertyValue)
				}
			}

			if (!isPassThrough && !isStub && !isFromAnotherApp) {
				this.ensureRepositoryValidity(
					record as IAirEntity,
					rootRelationRecord,
					parentRelationRecord,
					dbEntity,
					parentRelationProperty,
					isCreate,
					repositoryAssignmentFromParentNeeded)
			}
		} // for (const record of records)
	}

	private processRelation<E extends IAirEntity | any>(
		operatedOnEntityIndicator: boolean[],
		missingRepositoryRecords: IMissingRepositoryRecord[],
		topLevelObjectRepositories: IRepository[],
		context: IOperationContext & ITransactionContext,
		depth: number,
		fromOneToMany: boolean,
		parentRelationProperty: DbProperty,
		rootRelationRecord,
		parentRelationRecord,
		dbEntity: DbEntity,
		objectLevelRepositoryMapByGUID: Map<string, IRepository>,
		record: E,
		isCreate: boolean,
		dbProperty: DbProperty,
		propertyValue: any
	): boolean {
		let repositoryAssignmentFromParentNeeded = false

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
							if (!objectLevelRepositoryMapByGUID.has(repository.GUID)) {
								objectLevelRepositoryMapByGUID.set(repository.GUID, repository)
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
							repositoryAssignmentFromParentNeeded = true
							missingRepositoryRecords.push({
								record,
								repositoryPropertyName: dbProperty.name
							})
						} else {
							record[dbProperty.name] = context.rootTransaction.newRepository
						}
					}
				} // if (dbProperty.isId) {

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
				const isActorProperty = this.dictionary.isActor(dbRelation.relationEntity)
				if (propertyValue) {
					if (isCreate && isActorProperty) {
						throw new Error(`.actor property must not be populated for new objects`)
					}
					relatedEntities = [propertyValue]
				} else if (!isRelationNullable) {
					// Actor properties must be null when passed in
					if (!isCreate && !isActorProperty) {
						throw new Error(`Non-nullable relation ${dbEntity.name}.${dbProperty.name} does not have value assigned`)
					}
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

		return repositoryAssignmentFromParentNeeded
	}

	private ensureRepositoryValidity(
		record: IAirEntity,
		rootRelationRecord: IAirEntity,
		parentRelationRecord: IAirEntity,
		dbEntity: DbEntity,
		parentRelationProperty: DbProperty,
		isCreate: boolean,
		repositoryAssignmentFromParentNeeded: boolean
	): void {
		if (!dbEntity.isAirEntity) {
			return
		}

		const airEntity = record as unknown as IAirEntity
		// If there is no relationship yet between the parent and child records
		if (!parentRelationRecord) {
			if (repositoryAssignmentFromParentNeeded) {
				throw new Error(`
Invalid condition - entity that is root in the passed
in object graph does not have a repository assigned
`)
			}
			// This is the root record in the passed in object graph
			// NOTE: it's child records (both from @ManyToOne & @OneToMany)
			// will be checked subsequently (with possible cross-Repository
			// relations added)
			return
		}

		// If a repository from the parent record is assigned to this record
		if (repositoryAssignmentFromParentNeeded) {
			// no further checks needed, current record isn't getting assigned to a
			// different (or new) Repository so it will be assigned to the
			// Repository of the parent record

			// Since the repository will be same as that of the parent, it's
			// not a cross-Repository scenario
			return
		}

		// If the repositories of root record passed into the save operation and
		// the repository of the child record match
		if (rootRelationRecord.repository._localId === airEntity.repository._localId) {
			// no further checks needed, Repository is the same
			// across parent and child records
			return
		}


		if (isCreate) {
			throw new Error(`
A newly created '${dbEntity.name}' record
is being assigned to Repository _localId ${airEntity.repository._localId}
	(GUID: ${airEntity.repository.GUID})
This is because it is being referenced via:
	${parentRelationProperty.entity.name}.${parentRelationProperty.name},
from a record of Repository _localId ${parentRelationRecord.repository._localId}
	(GUID: ${parentRelationRecord.repository.GUID})
		
Did you mean to set this record's Repository to be the same one
as the Repository of the referencing (parent) record?
		`)
		}


		// Record will be copied into the Repository of the parent record
		airEntity.toBeCopied = true
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
				if (this.applicationUtils.isActorLid(dbColumn.name)) {
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
		} else if (this.applicationUtils.isActorLid(dbColumn.name)) {
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
