import {
	getSysWideOpId,
	IAirportDatabase,
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
	ensureChildArray,
	ensureChildJsMap,
	EntityRelationType,
	IRootTransaction,
	JsonDelete,
	JsonEntityQuery,
	PortableQuery,
	QueryResultType,
	airEntity,
	ISequenceGenerator,
} from '@airport/ground-control'
import {
	IActor,
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRepositoryTransactionHistoryDuo,
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index' // default import is reserved
// for Applications
import {
	IApplicationUtils,
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
	historyManager: IHistoryManager

	@Inject()
	operationHistoryDuo: IOperationHistoryDuo

	@Inject()
	recordHistoryDuo: IRecordHistoryDuo

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	sequenceGenerator: ISequenceGenerator

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
			.entities[portableQuery.tableIndex]

		const deleteCommand = transaction.deleteWhere(portableQuery, context)
		if (dbEntity.isLocal || transaction.isSync) {
			return await deleteCommand
		}

		const selectCascadeTree: any = this.getCascadeSubTree(
			dbEntity)
		const jsonDelete = <JsonDelete>portableQuery.jsonQuery
		const jsonSelect: JsonEntityQuery<any> = {
			S: selectCascadeTree,
			F: [jsonDelete.DF],
			W: jsonDelete.W,
		}
		const portableSelect = {
			applicationIndex: portableQuery.applicationIndex,
			tableIndex: portableQuery.tableIndex,
			jsonQuery: jsonSelect,
			queryResultType: QueryResultType.ENTITY_TREE,
			parameterMap: portableQuery.parameterMap,
			// values: portableQuery.values,
		}
		const treesToDelete = await transaction
			.find<any, Array<any>>(portableSelect, {}, context)

		const recordsToDelete: RecordsToDelete = new Map()
		const repositoryIdSet = new Set<number>()
		for (const treeToDelete of treesToDelete) {
			this.recordRepositoryIds(treeToDelete, dbEntity,
				recordsToDelete, repositoryIdSet, this.applicationUtils)
		}

		await this.recordTreeToDelete(recordsToDelete, actor,
			transaction, rootTransaction, context)

		return await deleteCommand
	}

	private recordRepositoryIds(
		treeToDelete: any,
		dbEntity: DbEntity,
		recordsToDelete: RecordsToDelete,
		repositoryIdSet: Set<number>,
		applicationUtils: IApplicationUtils
	): void {
		const repositoryId = treeToDelete.repository._localId
		repositoryIdSet.add(repositoryId)

		const recordsToDeleteForApplication
			= ensureChildJsMap(recordsToDelete, dbEntity.applicationVersion.application.index)
		const recordsToDeleteForTable
			= ensureChildJsMap(recordsToDeleteForApplication, dbEntity.index)
		const recordsToDeleteForRepository
			= ensureChildArray(recordsToDeleteForTable, repositoryId)

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
										recordsToDelete, repositoryIdSet, applicationUtils)
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
					systemWideOperationId = await getSysWideOpId(this.airportDatabase, this.sequenceGenerator)
				}

				for (const [repositoryId, entityRecordsToDeleteForRepo] of entityRecordsToDelete) {
					const repositoryTransactionHistory = await this.historyManager.getNewRepositoryTransactionHistory(
						transaction.transactionHistory, repositoryId, context
					)

					const operationHistory = this.repositoryTransactionHistoryDuo.startOperation(
						repositoryTransactionHistory, systemWideOperationId,
						ChangeType.DELETE_ROWS, dbEntity, actor,
						rootTransaction)

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
												case airEntity.ACTOR_LID:
												case airEntity.REPOSITORY_LID:
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
