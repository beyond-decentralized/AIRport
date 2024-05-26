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
	SQLDataType,
	IEntityStateAsFlags,
	DbRelation
} from '@airport/ground-control'
import {
	IOperationContext,
	IStructuralEntityValidator,
	ITransactionContext
} from '@airport/terminal-map'
// import {
// 	ICrossRepositoryRelationManager
// } from '@airport/layover'

@Injected()
export class StructuralEntityValidator
	implements IStructuralEntityValidator {

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	crossRepositoryRelationManager: any // ICrossRepositoryRelationManager

	@Inject()
	dictionary: Dictionary

	@Inject()
	entityStateManager: IEntityStateManager

	validate<E extends IAirEntity>(
		records: E[],
		operatedOnEntityIndicator: boolean[],
		topLevelObjectRepositories: IRepository[],
		context: IOperationContext & ITransactionContext,
		depth = 1,
		fromOneToMany = false,
		parentRelationProperty: DbProperty = null,
		rootRelationRecord = null,
		parentRelationRecord = null,
		isAncestorRecordBeingCreated = false,
		isAncestorRecordBeingCopied = false,
		isParentRecordBeingCreated = false
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
			const entityStateFlags = this.entityStateManager.getEntityStateTypeAsFlags(record, dbEntity)

			const {
				isCreate,
				isFromAnotherApp,
				isStub
			} = entityStateFlags

			// if (isACopy) {
			// 	// Copied entities (from other repositories) do not change once
			// 	//created and can only have references to other copied entities
			// 	continue
			// }

			const operationUniqueId = this.entityStateManager.getOperationUniqueId(record)
			const entityAlreadyOperatedOn = operatedOnEntityIndicator[operationUniqueId]
			if (entityAlreadyOperatedOn) {
				continue
			}
			operatedOnEntityIndicator[operationUniqueId] = true;

			if (!isStub) {
				this.ensureCopiedState(
					fromOneToMany,
					rootRelationRecord,
					parentRelationRecord,
					isAncestorRecordBeingCreated,
					dbEntity,
					record,
					parentRelationProperty,
					entityStateFlags)
			}

			for (const dbProperty of dbEntity.properties) {
				let propertyValue: any = record[dbProperty.name]
				if (propertyValue === undefined
					&& !this.entityStateManager.isPassThrough(record)) {
					if (dbEntity.isAirEntity && (isCreate
						|| isParentRecordBeingCreated)
						&& this.applicationUtils.isPropertyRequiredForCreateOperation(dbProperty)) {
						throw new Error(`Have unspecified value for "${dbEntity.name}.${dbProperty.name}" property 
in an object that is being Created during a DAO.save operation
(or an object referenced in a @ManyToOne() relation of a Created object):
${this.getIdErrorMessage(dbEntity, record)}

Property ${dbEntity.name}

Please either specify property values or set to null.`)
					}
				}
				if (propertyValue === undefined && !isStub) {
					propertyValue = null
					record[dbProperty.name] = propertyValue
				}
				/*
				 * It is possible for the @Id's of an entity to be in
				 * a @ManyToOne, so we need to check
				 */
				if (dbProperty.relation && dbProperty.relation.length) {
					this.processRelation(
						operatedOnEntityIndicator,
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
						isAncestorRecordBeingCreated,
						isAncestorRecordBeingCopied,
						entityStateFlags,
						dbProperty,
						propertyValue
					)
				} else if (!isFromAnotherApp) {
					const dbColumn = dbProperty.propertyColumns[0].column
					if (dbProperty.isId) {
						const isIdColumnEmpty = this.applicationUtils.isIdEmpty(propertyValue)
						this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty)
					} else {
						if (isStub) {
							if (propertyValue !== undefined) {
								throw new Error(`Unexpected non-@Id value Stub|ParentSchemaId|Deleted record.
Property: ${dbEntity.name}.${dbProperty.name}, with "${this.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`)
							}
						}
					}
					this.ensureNonRelationalValue(dbProperty, dbColumn, propertyValue)
				}
			}
		}
	}

	private processRelation<E extends IAirEntity>(
		operatedOnEntityIndicator: boolean[],
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
		isAncestorRecordBeingCreated: boolean,
		isAncestorRecordBeingCopied: boolean,
		entityStateFlags: IEntityStateAsFlags,
		dbProperty: DbProperty,
		propertyValue: any
	): void {
		const {
			isCreate,
			isFromAnotherApp
		} = entityStateFlags

		const dbRelation = dbProperty.relation[0]
		let relatedEntities = null
		let relationIsOneToMany = false
		let isRelationNullable = true
		switch (dbRelation.relationType) {
			case EntityRelationType.MANY_TO_ONE: {
				// Other App entities are only traversed for generating copy objects
				if (isFromAnotherApp) {
					if (propertyValue) {
						relatedEntities = [propertyValue]
					}
					break
				}
				// Id columns are for the parent (currently processed) entity and 
				// must be xchecked as part of this entity
				if (dbProperty.isId) {
					isRelationNullable = this.processIdPropertyRelation(
						dbEntity,
						dbProperty,
						dbRelation,
						record,
						objectLevelRepositoryMapByGUID,
						isCreate,
						depth,
						topLevelObjectRepositories,
						context
					)
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
			}
			case EntityRelationType.ONE_TO_MANY: {
				relationIsOneToMany = true
				// Other App entities are only traversed for generating copy objects
				// Copy objects are not created via @OneToMany() relations
				if (!isFromAnotherApp && !isAncestorRecordBeingCopied) {
					relatedEntities = propertyValue
				}
				break
			}
			default: {
				throw new Error(`Unexpected relation type ${dbRelation.relationType}
for ${dbEntity.name}.${dbProperty.name}`)
			}
		} // switch dbRelation.relationType
		if (relatedEntities && relatedEntities.length) {
			const previousDbEntity = context.dbEntity
			context.dbEntity = dbRelation.relationEntity

			this.validate(
				relatedEntities, 
				operatedOnEntityIndicator,
				topLevelObjectRepositories, 
				context,
				depth + 1,
				relationIsOneToMany,
				dbProperty,
				rootRelationRecord, record,
				isAncestorRecordBeingCreated || isCreate, 
				isAncestorRecordBeingCopied || record.toBeCopied,
				isCreate)
			context.dbEntity = previousDbEntity
		}
	}

	private processIdPropertyRelation<E extends IAirEntity>(
		dbEntity: DbEntity,
		dbProperty: DbProperty,
		dbRelation: DbRelation,
		record: E,
		objectLevelRepositoryMapByGUID: Map<string, IRepository>,
		isCreate: boolean,
		depth: number,
		topLevelObjectRepositories: IRepository[],
		context: IOperationContext & ITransactionContext
	): boolean {
		let isRelationNullable = true
		this.applicationUtils.forEachColumnOfRelation(dbRelation, record, (
			dbColumn: DbColumn,
			columnValue: any,
			_propertyNameChains: string[][],
		) => {
			if (dbColumn.notNull) {
				isRelationNullable = false
			}
			if (this.isRepositoryColumn(
				dbEntity, dbProperty, dbColumn,
				isCreate, record, columnValue, context)) {
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

		return isRelationNullable
	}


	/*
	If there is a creation operation directly above the subgraph
	that has only pass-through records or records from other apps,
	then those records need to be Copied into this repository. Ex:
	creating an object graph:

	EntityA1
		b1: EntityB1

	First must call the B1 app to create the EntityB1 entity referenced
	in the b1 property. Once that's created that entity can be used in
	EntityA1 (during it's subsequent creation).  The b1 entity can
	belong to another repository, and if it does it needs to be copied
	in.

	Pass through entities (not created or updated) might also have
	to be copied into the Repository in which the records are being
	created IF they belong to another repository.
	*/
	private ensureCopiedState(
		fromOneToMany: boolean,
		rootRelationRecord: IAirEntity,
		parentRelationRecord: IAirEntity,
		isAncestorRecordBeingCreated: boolean,
		dbEntity: DbEntity,
		record: IAirEntity,
		parentRelationProperty: DbProperty,
		entityStateFlags: IEntityStateAsFlags
	): void {
		record.toBeCopied = false

		if (!dbEntity.isAirEntity) {
			return
		}

		const airEntity = record as unknown as IAirEntity
		// If there is no relationship yet between the parent and child records
		if (!parentRelationRecord) {
			// This is the root record in the passed in object graph
			// NOTE: it's child records (both from @ManyToOne & @OneToMany)
			// will be checked subsequently (with possible cross-Repository
			// relations added)
			return
		}

		// If the repositories of root record passed into the save operation and
		// the repository of the child record match
		if (rootRelationRecord.repository._localId === airEntity.repository._localId) {
			// no further checks needed, Repository is the same
			// across parent and child records
			return
		}

		if (entityStateFlags.isCreate
			|| entityStateFlags.isUpdate
			|| entityStateFlags.isDelete) {
			throw new Error(`
A created/updated/deleted ${this.getIdErrorMessage(
				dbEntity, airEntity, parentRelationProperty, parentRelationRecord
			)}
		
Did you mean to set this record's Repository to be the same one
as the Repository of the referencing (parent) record?
		`)
		}

		if (fromOneToMany) {
			// Entities in @OneToMany relations are not copied
			return
		}

		if (isAncestorRecordBeingCreated) {
			// Record will be copied into the Repository of the parent record
			airEntity.toBeCopied = true
		}
	}

	private getIdErrorMessage<T extends IAirEntity>(
		dbEntity: DbEntity,
		airEntity: T,
		parentRelationProperty?: DbProperty,
		parentRelationRecord?: IAirEntity
	): string {
		let suffix = '';
		if (parentRelationProperty) {
			suffix = `
It is being referenced via:
			${parentRelationProperty.entity.name}.${parentRelationProperty.name},
		from a record of ${this.getRepositoryId(parentRelationRecord.repository)}`
		}
		return `'${dbEntity.name}' record
is assigned to ${this.getRepositoryId(airEntity.repository)}${suffix}`
	}

	private getRepositoryId(
		repository: IRepository
	): string {
		if (!repository) {
			return `unspecified Repository`
		}

		return `Repository with _localId ${repository._localId}
		(GUID: ${repository.GUID})`
	}

	protected isRepositoryColumn<E>(
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
					throw new Error(`Actor cannot be passed in for Create Operations`)
				}
			}
			return false
		}
		if (!isCreate) {
			throw new Error(`Ids must be populated in entities for non-Create operations`)
		}
		if (this.applicationUtils.isRepositoryId(dbColumn.name)) {
			throw new Error(`Repository must be populated in entities for non-Create operations`)
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
