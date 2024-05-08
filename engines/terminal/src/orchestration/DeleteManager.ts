import {
	IAirportDatabase,
	DbSystemWideOperationIdUtils,
	IUtils
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ChangeType,
	DbColumn,
	DbEntity,
	DbProperty,
	Dictionary,
	EntityRelationType,
	IActor,
	IApplicationUtils,
	IDatastructureUtils,
	IRootTransaction,
	QueryDelete,
	QueryEntity,
	PortableQuery,
	QueryResultType,
	Repository_LocalId,
} from '@airport/ground-control'
import {
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRepositoryTransactionHistoryDuo,
} from '@airport/holding-pattern/dist/app/bundle' // default import is reserved
// for Applications
import {
	Y
} from '@airport/tarmaq-query'
import {
	IDeleteManager,
	IHistoryManager,
	IOperationContext,
	ITransaction,
	RecordsToDelete
} from '@airport/terminal-map'

@Injected()
export class DeleteManager
	implements IDeleteManager {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	historyManager: IHistoryManager

	@Inject()
	operationHistoryDuo: IOperationHistoryDuo

	@Inject()
	recordHistoryDuo: IRecordHistoryDuo

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	systemWideOperationIdUtils: DbSystemWideOperationIdUtils

	@Inject()
	utils: IUtils

	async deleteWhere(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context?: IOperationContext,
	): Promise<number> {
		const dbEntity = this.airportDatabase
			.applications[portableQuery.applicationIndex].currentVersion[0].applicationVersion
			.entities[portableQuery.entityIndex]

		const deleteCommand = transaction.deleteWhere(portableQuery, context)
		if (dbEntity.isLocal || transaction.isRepositorySync) {
			return await deleteCommand
		}

		const selectCascadeTree: any = this.getCascadeSubTree(
			dbEntity)
		const queryDelete = <QueryDelete>portableQuery.query
		const queryEntity: QueryEntity<any> = {
			SELECT: selectCascadeTree,
			FROM: [queryDelete.DELETE_FROM],
			WHERE: queryDelete.WHERE,
		}
		const portableSelect = {
			applicationIndex: portableQuery.applicationIndex,
			entityIndex: portableQuery.entityIndex,
			query: queryEntity,
			queryResultType: QueryResultType.ENTITY_TREE,
			parameterMap: portableQuery.parameterMap,
			// values: portableQuery.values,
		}
		const treesToDelete = await transaction
			.find<any, Array<any>>(portableSelect, {}, context)

		const recordsToDelete: RecordsToDelete = new Map()
		const repositoryLidSet = new Set<Repository_LocalId>()
		for (const treeToDelete of treesToDelete) {
			this.recordRepositoryIds(treeToDelete, dbEntity,
				recordsToDelete, repositoryLidSet, this.applicationUtils)
		}

		await this.recordTreeToDelete(recordsToDelete, actor,
			transaction, rootTransaction, context)

		return await deleteCommand
	}

	private recordRepositoryIds(
		treeToDelete: any,
		dbEntity: DbEntity,
		recordsToDelete: RecordsToDelete,
		repositoryLidSet: Set<number>,
		applicationUtils: IApplicationUtils
	): void {
		const repositoryLid = treeToDelete.repository._localId
		repositoryLidSet.add(repositoryLid)

		const recordsToDeleteForApplication
			= this.datastructureUtils.ensureChildJsMap(
				recordsToDelete, dbEntity.applicationVersion.application.index)
		const recordsToDeleteForTable
			= this.datastructureUtils.ensureChildJsMap(
				recordsToDeleteForApplication, dbEntity.index)
		const recordsToDeleteForRepository
			= this.datastructureUtils.ensureChildArray(
				recordsToDeleteForTable, repositoryLid)

		const recordToDelete = {}
		// FIXME: implement
		recordsToDeleteForRepository.push(recordToDelete as any)

		for (const dbProperty of dbEntity.properties) {
			if (dbProperty.relation && dbProperty.relation.length) {
				if (!treeToDelete[dbProperty.name]) {
					continue
				}
				const dbRelation = dbProperty.relation[0]
				switch (dbRelation.relationType) {
					case EntityRelationType.MANY_TO_ONE:
						applicationUtils.forEachColumnOfRelation(
							dbRelation,
							treeToDelete,
							(
								dbColumn: DbColumn,
								value: any,
								propertyNameChains: string[][]
							) => {
								this.columnProcessed(dbProperty, recordToDelete, dbColumn, value)
							}, false)
						break
					case EntityRelationType.ONE_TO_MANY:
						if (!dbRelation.oneToManyElems) {
							continue
						}
						let childTrees = treeToDelete[dbRelation.property.name]
						if (childTrees && childTrees.length) {
							const childDbEntity = dbRelation.relationEntity
							childTrees.forEach(
								childTree => {
									this.recordRepositoryIds(childTree, childDbEntity,
										recordsToDelete, repositoryLidSet, applicationUtils)
								})
						}
						break
					default:
						throw new Error(
							`Unknown relation type: '${dbRelation.relationType}' 
							on '${dbEntity.name}.${dbRelation.property.name}'.`)
				}
			} else {
				const value = treeToDelete[dbProperty.name]
				if (value === null || value === undefined) {
					continue
				}
				this.columnProcessed(dbProperty, recordToDelete, dbProperty.propertyColumns[0].column, value)
			}
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
		foundValues: { [columnName: string]: any },
		dbColumn: DbColumn,
		value: any,
	): boolean {
		// if (value === undefined) {
		// 	throw new Error(`Values cannot be undefined, please use null.`_;
		// }
		if (foundValues[dbColumn.name] === undefined) {
			foundValues[dbColumn.name] = value
			return false
		}
		if (!this.utils.valuesEqual(foundValues[dbColumn.name], value)) {
			throw new Error(
				`Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.name]} !== ${value}`)
		}
		return true
	}

	private async recordTreeToDelete(
		recordsToDelete: RecordsToDelete,
		actor: IActor,
		transaction: ITransaction,
		rootTransaction: IRootTransaction,
		context: IOperationContext
	): Promise<void> {
		let systemWideOperationId
		for (const [applicationIndex, applicationRecordsToDelete] of recordsToDelete) {
			for (const [entityIndex, entityRecordsToDelete] of applicationRecordsToDelete) {
				const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
					.applicationVersion.entities[entityIndex]

				if (!systemWideOperationId) {
					systemWideOperationId = await this.systemWideOperationIdUtils.getSysWideOpId()
				}

				for (const [repositoryLid, entityRecordsToDeleteForRepo] of entityRecordsToDelete) {
					const repositoryTransactionHistory = await this.historyManager.getRepositoryTransactionHistory(
						transaction.transactionHistory, repositoryLid, context
					)

					const operationHistory = this.repositoryTransactionHistoryDuo.startOperation(
						repositoryTransactionHistory, systemWideOperationId,
						ChangeType.DELETE_ROWS, dbEntity, actor,
						rootTransaction)

					if (dbEntity.isLocal) {
						if (transaction.transactionHistory) {
							transaction.transactionHistory.allModifiedColumnsMap
								.ensureEntity(dbEntity, true)
						}
					}

					for (const recordToDelete of entityRecordsToDeleteForRepo) {
						const recordHistory = this.operationHistoryDuo.startRecordHistory(
							operationHistory, recordToDelete.actor._localId,
							recordToDelete._actorRecordId)
						for (const dbProperty of dbEntity.properties) {
							if (dbProperty.relation && dbProperty.relation.length) {
								const dbRelation = dbProperty.relation[0]
								switch (dbRelation.relationType) {
									case EntityRelationType.MANY_TO_ONE:
										this.applicationUtils.forEachColumnOfRelation(
											dbRelation, recordToDelete, (
												dbColumn: DbColumn,
												value: any,
												propertyNameChains: string[][]
											) => {
											switch (dbColumn.name) {
												// Do not add Actor or Repository the are recorded
												// at record history level
												case this.dictionary.AirEntityId.columns.ACTOR_LID:
												case this.dictionary.AirEntityId.columns.REPOSITORY_LID:
													break;
												default:
													this.recordHistoryDuo.addOldValue(recordHistory, dbColumn,
														value)
											}
										})
										break
									case EntityRelationType.ONE_TO_MANY:
										// One-To-Many do not contain any columns in source entity
										break
									default:
										throw new Error(`Unknown relation type: '${dbRelation.relationType}'
										on '${dbEntity.name}.${dbProperty.name}'.`)
								}
							} else {
								const dbColumn = dbProperty.propertyColumns[0].column
								this.recordHistoryDuo
									.addOldValue(recordHistory, dbColumn,
										recordToDelete[dbProperty.name])
							}
						}
					}
				}
			}
		}
	}

	private getCascadeSubTree(
		dbEntity: DbEntity,
		selectClause: any = {}
	): any {
		for (const dbProperty of dbEntity.properties) {
			let dbRelation
			if (dbProperty.relation && dbProperty.relation.length) {
				dbRelation = dbProperty.relation[0]
			}
			if (dbRelation) {
				switch (dbRelation.relationType) {
					case EntityRelationType.ONE_TO_MANY:
						if (!dbRelation.oneToManyElems) {
							continue
						}
						const subTree = {}
						selectClause[dbProperty.name] = subTree
						this.getCascadeSubTree(dbRelation.relationEntity, subTree)
						break
					case EntityRelationType.MANY_TO_ONE:
						this.applicationUtils.addRelationToEntitySelectClause(dbRelation, selectClause)
						break
					default:
						throw new Error(
							`Unknown relation type: '${dbRelation.relationType}' 
							on '${dbEntity.name}.${dbProperty.name}'.`)
				}
			} else {
				selectClause[dbProperty.name] = Y
			}
		}

		return selectClause
	}

}
