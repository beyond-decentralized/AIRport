import {
	AirEntityId,
	IAirEntityUtils
} from '@airport/aviation-communication'
import {
	Inject,
	Injected,
	IOC
} from '@airport/direction-indicator'
import {
	DbColumn,
	DbEntity,
	Dictionary,
	IAirEntity,
	IApplicationUtils,
	JSONBaseOperation,
	JSONValueOperation,
	OperationCategory,
	Repository_GUID,
	Repository_LocalId,
	SqlOperator
} from '@airport/ground-control'
import {
	AND,
	ENTITY_UTILS,
	IdKeysByIdColumnIndex,
	IEntityIdProperties,
	IEntityUtils,
	IFieldColumnAliases,
	IFieldUtils,
	IQAirEntity,
	IQBooleanField,
	IQDateField,
	IQEntity,
	IQEntityInternal,
	IQEntityUtils,
	IQFieldInternal,
	IQNumberField,
	IQStringField,
	IQueryUtils,
	IQUntypedField,
	IRelationManager,
	JSONLogicalOperation,
	JSONRawValueOperation,
	OR,
	QEntity,
	QEntityConstructor,
	QExistsFunction,
	QOperableField,
	RawFieldQuery,
	RepositorySheetSelectInfo,
	wrapPrimitive
} from '@airport/tarmaq-query'
import { IAirportDatabase, QAppInternal } from '../../definition/AirportDatabase'

@Injected()
export class QueryUtils
	implements IQueryUtils {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	entityUtils: IEntityUtils

	@Inject()
	fieldUtils: IFieldUtils

	@Inject()
	qEntityUtils: IQEntityUtils

	@Inject()
	relationManager: IRelationManager

	@Inject()
	airEntityUtils: IAirEntityUtils

	equals<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entityOrId: Entity | IQAirEntity
			// | IQAirEntityRelation<Entity, IQ>
			| AirEntityId | string,
		toObject: IQ // | IQRelation<IQ>
	): JSONLogicalOperation {
		if (!entityOrId) {
			throw new Error(`null entity/Id is passed into 'equals' method`)
		}
		const {
			qActor,
			qRepository
		} = this.entityUtils.ensureRepositoryAndActorJoin(toObject as any as IQEntityInternal)
		if (entityOrId instanceof QEntity) {
			const relationIdEntities = this.entityUtils
				.ensureRepositoryAndActorJoin(entityOrId as any as IQEntityInternal)

			return AND(
				qRepository.GUID.equals(relationIdEntities.qRepository.repository.GUID),
				qActor.GUID.equals(relationIdEntities.qActor.actor.GUID),
				(toObject as any)._actorRecordId.equals((entityOrId as any)._actorRecordId)
			)
		} else {
			let entityId = this.validateEntityId(entityOrId as AirEntityId)

			return AND(
				qRepository.GUID.equals(entityId.repository.GUID),
				qActor.GUID.equals(entityId.actor.GUID),
				(toObject as any)._actorRecordId.equals(entityId._actorRecordId)
			)
		}
	}

	in<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entitiesOrIds: (Entity | AirEntityId | string)[],
		toObject: IQ // | IQRelation<IQ>
	): JSONLogicalOperation {
		if (!entitiesOrIds || !entitiesOrIds.length) {
			throw new Error(`null entity/Id array is passed into 'IN' method`)
		}
		let entityIds = entitiesOrIds.map(entityOrId =>
			this.validateEntityId(entityOrId as AirEntityId))

		const {
			qActor,
			qRepository
		} = this.entityUtils.ensureRepositoryAndActorJoin(toObject as any as IQEntityInternal)

		const equalOperations = []
		for (const entityId of entityIds) {
			equalOperations.push(AND(
				qRepository.GUID.equals(entityId.repository.GUID),
				qActor.GUID.equals(entityId.actor.GUID),
				(toObject as any)._actorRecordId.equals(entityId._actorRecordId)))
		}

		return OR(...equalOperations)
	}

	equalsInternal<IQ extends IQEntity>(
		entityId: string | number,
		toObject: IQ // | IQRelation<IQ>
	): JSONBaseOperation {
		const columnField = this.getGetSingleColumnRelationField(
			toObject)

		return columnField.equals(entityId)
	}

	inInternal<IQ extends IQEntity>(
		entityIds: (string | number)[],
		toObject: IQ // | IQRelation<IQ>
	): JSONBaseOperation {
		if (!entityIds || !entityIds.length) {
			throw new Error(`null or empty Id array is passed into 'IN' method`)
		}

		const columnField = this.getGetSingleColumnRelationField(
			toObject)

		return columnField.IN(entityIds as any)
	}

	getGetSingleColumnRelationField<Entity, IQ extends IQEntity>(
		toObject: IQ // | IQRelation<IQ>
	): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField {
		const qEntity: IQEntityInternal = toObject as any

		if (qEntity.__driver__.dbRelation.manyRelationColumns.length > 1) {
			throw new Error(`
Currently IN operation on internal (non AirEntity) entities
is supported only for single columm relations
			`)
		}

		qEntity.__driver__.dbRelation.property

		const relationColumn = qEntity.__driver__.dbRelation.manyRelationColumns[0]

		return this.qEntityUtils.getColumnQField(
			qEntity.__driver__.dbEntity,
			qEntity.__driver__.dbRelation.property,
			qEntity,
			relationColumn.manyColumn
		)
	}

	private validateEntityId(
		entityId: AirEntityId
	) {
		if (typeof entityId === 'string') {
			return this.airEntityUtils.parseEGUID(entityId)
		} else {
			if (!entityId.repository
				|| !entityId.repository.GUID
				|| typeof entityId.repository.GUID !== 'string'
				|| !entityId.actor
				|| !entityId.actor.GUID
				|| typeof entityId.actor.GUID !== 'number'
				|| !entityId._actorRecordId
				|| typeof entityId._actorRecordId !== 'number') {
				throw new Error(`Passed in AirEntity does not have
				the necessary fields to query by id.  Expecting:
					interface AnInterface extends AirEntity {
						repository: {
							GUID: string
						},
						actor: {
							GUID: string
						},
						_actorRecordId: number
					}
					`)
			}
			return entityId
		}
	}

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>
	): JSONBaseOperation {
		if (!whereClause) {
			return null
		}
		let operation: JSONBaseOperation = whereClause
		let jsonOperation: JSONBaseOperation = {
			c: operation.c,
			o: operation.o
		}
		switch (operation.c) {
			case OperationCategory.LOGICAL:
				let logicalOperation = <JSONLogicalOperation>operation
				let jsonLogicalOperation = <JSONLogicalOperation>jsonOperation
				switch (operation.o) {
					case SqlOperator.NOT:
						jsonLogicalOperation.v = this.whereClauseToJSON(
							<JSONBaseOperation>logicalOperation.v, columnAliases,
							trackedRepoGUIDSet, trackedRepoLocalIdSet)
						break
					case SqlOperator.AND:
					case SqlOperator.OR:
						jsonLogicalOperation.v = (<JSONBaseOperation[]>logicalOperation.v).map((value) =>
							this.whereClauseToJSON(value, columnAliases,
								trackedRepoGUIDSet, trackedRepoLocalIdSet)
						)
						break
					default:
						throw new Error(`Unsupported logical operation '${operation.o}'`)
				}
				break
			case OperationCategory.FUNCTION:
				// TODO: verify that cast of Q object is valid
				let functionOperation: QExistsFunction<any> = <QExistsFunction<any>><any>operation
				let query = functionOperation.getQuery()
				let jsonQuery = IOC.getSync(ENTITY_UTILS).getTreeQuery(
					query, columnAliases.entityAliases).toJSON(this,
						this.fieldUtils, this.relationManager)
				jsonOperation = functionOperation.toJSON(jsonQuery)
				break
			case OperationCategory.BOOLEAN:
			case OperationCategory.DATE:
			case OperationCategory.NUMBER:
			case OperationCategory.STRING:
			case OperationCategory.UNTYPED:
				let valueOperation: JSONRawValueOperation<any> = <JSONRawValueOperation<any>>operation
				// All Non logical or exists operations are value operations (equals, IS_NULL, LIKE,
				// etc.)
				let jsonValueOperation: JSONValueOperation = <JSONValueOperation>jsonOperation
				jsonValueOperation.l = this.convertLRValue(
					valueOperation.l, columnAliases,
					trackedRepoGUIDSet, trackedRepoLocalIdSet)
				if (operation.o === SqlOperator.IS_NOT_NULL
					|| operation.o === SqlOperator.IS_NULL) {
					break
				}
				let rValue = valueOperation.r
				if (rValue instanceof Array) {
					jsonValueOperation.r = rValue.map((anRValue) => {
						return this.convertLRValue(anRValue, columnAliases,
							trackedRepoGUIDSet, trackedRepoLocalIdSet)
					})
				} else {
					jsonValueOperation.r = this.convertLRValue(rValue, columnAliases,
						trackedRepoGUIDSet, trackedRepoLocalIdSet)
				}
				for (const trackedRepoGUID of valueOperation.trackedRepoGUIDs) {
					trackedRepoGUIDSet.add(trackedRepoGUID)
				}
				for (const trackedRepoLocalId of valueOperation.trackedRepoLocalIds) {
					trackedRepoLocalIdSet.add(trackedRepoLocalId)
				}
				break
		}

		return jsonOperation
	}

	getQEntityConstructor<IQE extends IQEntity>(
		dbEntity: DbEntity
	): QEntityConstructor<IQE> {
		return (<QAppInternal>this.airportDatabase.qApplications[dbEntity.applicationVersion.application.index])
			.__qConstructors__[dbEntity.index]
	}

	getIdKey(
		entityObject: IEntityIdProperties,
		dbEntity: DbEntity,
		failOnNoId: boolean = true,
		// noIdValueCallback: {
		// 	(
		// 		relationColumn: DbColumn,
		// 		value: any,
		// 		propertyNameChains: string[][],
		// 	): boolean;
		// } = null,
		idValueCallback?: {
			(
				relationColumn: DbColumn,
				value: any,
				propertyNameChains: string[][],
			): void;
		}
	): string {
		const keys = this.getIdKeyInfo(entityObject, dbEntity, failOnNoId, idValueCallback)
		return keys.arrayByIdColumnIndex.join('|')
	}

	getIdKeyInfo(
		entityObject: IEntityIdProperties,
		dbEntity: DbEntity,
		failOnNoId: boolean = true,
		idValueCallback?: {
			(
				relationColumn: DbColumn,
				value: any,
				propertyNameChains: string[][],
			): void;
		}
	): IdKeysByIdColumnIndex {
		if (!dbEntity.idColumns.length) {
			if (failOnNoId) {
				throw new Error(`@Id is not defined on entity '${dbEntity.name}'.`)
			}
			return null
		}

		const idKeys = {
			arrayByIdColumnIndex: [],
			mapByIdColumnName: {}
		}
		for (const dbColumn of dbEntity.idColumns) {

			const [propertyNameChains, idValue] =
				this.applicationUtils.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn,
					entityObject, true, failOnNoId)

			idValueCallback && idValueCallback(dbColumn, idValue, propertyNameChains)

			idKeys.arrayByIdColumnIndex.push(idValue)
			idKeys.mapByIdColumnName[dbColumn.name] = idValue
		}

		return idKeys
	}

	getSheetSelectFromSetClause(
		dbEntity: DbEntity,
		qEntity: IQEntity,
		setClause: any,
		errorPrefix: string
	): RepositorySheetSelectInfo {
		const selectClause: IQFieldInternal<any>[] = []
		let actorIdColumnIndex: number
		let actorRecordIdColumnIndex: number
		let repositoryIdColumnIndex: number
		let systemWideOperationIdColumn: DbColumn

		for (const columnIndex in dbEntity.columns) {
			const dbColumn = dbEntity.columns[columnIndex]
			let dbProperty
			const isIdColumn = dbColumn.propertyColumns.some(
				propertyColumn => {
					dbProperty = propertyColumn.property
					return dbProperty.isId
				})

			let nonIdColumnSet = false
			if (isIdColumn) {
				if (setClause[dbColumn.name]) {
					throw new Error(errorPrefix + `Cannot update @Id column '${dbColumn.name}' 
of property '${dbEntity.name}.${dbProperty.name}'.`)
				}
				this.addColumnToSheetSelect(dbColumn, qEntity, selectClause)
			} else if (setClause[dbColumn.name]) {
				nonIdColumnSet = true
				this.addColumnToSheetSelect(dbColumn, qEntity, selectClause)
				// } else {
				// entitySelectClause[dbColumn.index] = null;
			}

			const inQueryColumnIndex = selectClause.length - 1

			const AirEntity = this.dictionary.AirEntity

			switch (dbColumn.name) {
				case AirEntity.columns.ACTOR_LID:
					actorIdColumnIndex = inQueryColumnIndex
					break
				case AirEntity.columns.ACTOR_RECORD_ID:
					actorRecordIdColumnIndex = inQueryColumnIndex
					break
				case AirEntity.columns.REPOSITORY_LID:
					repositoryIdColumnIndex = inQueryColumnIndex
					break
				case AirEntity.columns.SYSTEM_WIDE_OPERATION_LID:
					if (nonIdColumnSet) {
						throw new Error(errorPrefix +
							`Cannot update 'systemWideOperationId' of Repository Entities.`)
					}
					systemWideOperationIdColumn = dbColumn
					break
			}
		}

		return {
			actorIdColumnIndex,
			actorRecordIdColumnIndex,
			repositoryIdColumnIndex,
			selectClause,
			systemWideOperationIdColumn
		}
	}

	private addColumnToSheetSelect(
		dbColumn: DbColumn,
		qEntity: IQEntity,
		entitySelectClause: IQFieldInternal<any>[],
	) {
		if (this.applicationUtils.isManyRelationColumn(dbColumn)) {
			const columnPaths = this.applicationUtils.getColumnPaths(dbColumn, [])
			const firstColumnPath = columnPaths[0]
			let relationColumn = qEntity[firstColumnPath[0]]
			firstColumnPath.reduce((
				last,
				current
			) => {
				relationColumn = relationColumn[current]
				return current
			})
			entitySelectClause.push(relationColumn)
		} else {
			entitySelectClause.push(qEntity[dbColumn.propertyColumns[0].property.name])
		}
	}

	/*
		private addColumnToEntitySelect(
			dbColumn: DbColumn,
			entitySelectClause: any,
		) {
			const dbRelation = dbColumn.relation;
			if (dbRelation) {
				let selectClauseFragment = entitySelectClause;
				let lastSelectClauseFragment;
				let sourceColumn = dbColumn;
				let lastPropertyName;
				do {
					lastPropertyName = sourceColumn.property.name;
					lastSelectClauseFragment = selectClauseFragment;
					if (!lastSelectClauseFragment[lastPropertyName]) {
						selectClauseFragment = {};
						lastSelectClauseFragment[lastPropertyName] = selectClauseFragment;
					} else {
						selectClauseFragment = lastSelectClauseFragment[lastPropertyName];
					}
					const relationColumn = sourceColumn.relation.relationColumns.filter(
						relationColumn => relationColumn.ownColumn.index === sourceColumn.index)[0];
					sourceColumn = relationColumn.relationColumn;
				} while (sourceColumn.relation);
				lastSelectClauseFragment[lastPropertyName] = null;
			} else {
				entitySelectClause[dbColumn.property.name] = null;
			}
		}
	*/

	private convertLRValue(
		value,
		columnAliases: IFieldColumnAliases<any>,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>
	): any {
		value = wrapPrimitive(value)
		switch (typeof value) {
			case 'undefined':
				throw new Error(`'undefined' is not a valid L or R value`)
			default:
				if (value instanceof QOperableField) {
					return value.toJSON(columnAliases, false,
						trackedRepoGUIDSet, trackedRepoLocalIdSet,
						this, this.fieldUtils, this.relationManager)
				} // Must be a Field Query
				else {
					let rawFieldQuery: RawFieldQuery<any> = value
					return this.fieldUtils.getFieldQueryJson(
						rawFieldQuery, columnAliases.entityAliases,
						trackedRepoGUIDSet, trackedRepoLocalIdSet, this)
				}
		}
	}
}
