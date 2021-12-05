import {
	AIRPORT_DATABASE,
	IAirportDatabase,
	IApplicationUtils,
	APPLICATION_UTILS,
	valuesEqual,
	Y
} from '@airport/air-control'
import {
	getSysWideOpId,
	ISequenceGenerator,
	SEQUENCE_GENERATOR
} from '@airport/check-in'
import {
	container,
	DI
} from '@airport/di';
import {
	ChangeType,
	DbColumn,
	DbEntity,
	DbProperty,
	ensureChildArray,
	ensureChildJsMap,
	EntityRelationType,
	JsonDelete,
	JsonEntityQuery,
	PortableQuery,
	QueryResultType,
	repositoryEntity,
} from '@airport/ground-control'
import {
	IActor,
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRecordHistoryOldValueDuo,
	IRepositoryTransactionHistoryDuo,
	OPERATION_HISTORY_DUO,
	RECORD_HISTORY_OLD_VALUE_DUO,
	RECORD_HISTORY_DUO,
	REPOSITORY_TRANSACTION_HISTORY_DUO,
	Actor_Id,
} from '@airport/holding-pattern'
import {
	IDeleteManager,
	IHistoryManager,
	IOperationContext,
	ITransaction,
	RecordsToDelete
} from '@airport/terminal-map'
import {
	DELETE_MANAGER,
	HISTORY_MANAGER,
} from '../tokens'

export class DeleteManager
	implements IDeleteManager {

	async deleteWhere(
		portableQuery: PortableQuery,
		actor: IActor,
		transaction: ITransaction,
		context?: IOperationContext,
	): Promise<number> {
		const [
			airDb,
			historyManager,
			operHistoryDuo,
			recHistoryDuo,
			recHistoryOldValueDuo,
			repoTransHistoryDuo,
			applicationUtils,
			sequenceGenerator
		] = await container(this)
			.get(AIRPORT_DATABASE, HISTORY_MANAGER, OPERATION_HISTORY_DUO,
				RECORD_HISTORY_DUO, RECORD_HISTORY_OLD_VALUE_DUO, REPOSITORY_TRANSACTION_HISTORY_DUO,
				APPLICATION_UTILS, SEQUENCE_GENERATOR)

		const dbEntity = airDb
			.applications[portableQuery.applicationIndex].currentVersion[0].applicationVersion
			.entities[portableQuery.tableIndex]

		const deleteCommand = transaction.deleteWhere(portableQuery, context)
		if (dbEntity.isLocal || transaction.isSync) {
			return await deleteCommand
		}

		const selectCascadeTree: any = this.getCascadeSubTree(
			dbEntity, applicationUtils)
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
				recordsToDelete, repositoryIdSet, applicationUtils)
		}

		await this.recordTreeToDelete(recordsToDelete, actor,
			airDb, historyManager, operHistoryDuo, recHistoryDuo,
			recHistoryOldValueDuo, repoTransHistoryDuo, applicationUtils,
			sequenceGenerator, transaction, context)

		return await deleteCommand
	}

	private recordRepositoryIds(
		treeToDelete: any,
		dbEntity: DbEntity,
		recordsToDelete: RecordsToDelete,
		repositoryIdSet: Set<number>,
		applicationUtils: IApplicationUtils
	): void {
		const repositoryId = treeToDelete.repository.id
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
		if (!valuesEqual(foundValues[dbColumn.name], value)) {
			throw new Error(
				`Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.name]} !== ${value}`)
		}
		return true
	}

	private async recordTreeToDelete(
		recordsToDelete: RecordsToDelete,
		actor: IActor,
		airDb: IAirportDatabase,
		historyManager: IHistoryManager,
		operHistoryDuo: IOperationHistoryDuo,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryOldValueDuo: IRecordHistoryOldValueDuo,
		repoTransHistoryDuo: IRepositoryTransactionHistoryDuo,
		applicationUtils: IApplicationUtils,
		sequenceGenerator: ISequenceGenerator,
		transaction: ITransaction,
		context: IOperationContext
	): Promise<void> {
		let systemWideOperationId
		for (const [applicationIndex, applicationRecordsToDelete] of recordsToDelete) {
			for (const [entityIndex, entityRecordsToDelete] of applicationRecordsToDelete) {
				const dbEntity = airDb.applications[applicationIndex].currentVersion[0]
					.applicationVersion.entities[entityIndex]

				if (!systemWideOperationId) {
					systemWideOperationId = await getSysWideOpId(airDb, sequenceGenerator)
				}

				for (const [repositoryId, entityRecordsToDeleteForRepo] of entityRecordsToDelete) {
					const repoTransHistory = await historyManager.getNewRepositoryTransactionHistory(
						transaction.transHistory, repositoryId, actor, context
					)

					const operationHistory = repoTransHistoryDuo.startOperation(
						repoTransHistory, systemWideOperationId,
						ChangeType.DELETE_ROWS, dbEntity,
						operHistoryDuo)

					for (const recordToDelete of entityRecordsToDeleteForRepo) {
						const recordHistory = operHistoryDuo.startRecordHistory(
							operationHistory, recordToDelete.actorRecordId,
							recHistoryDuo)
						let actorId: Actor_Id
						for (const dbProperty of dbEntity.properties) {
							if (dbProperty.relation && dbProperty.relation.length) {
								const dbRelation = dbProperty.relation[0]
								switch (dbRelation.relationType) {
									case EntityRelationType.MANY_TO_ONE:
										applicationUtils.forEachColumnOfRelation(
											dbRelation, recordToDelete, (
												dbColumn: DbColumn,
												value: any,
												propertyNameChains: string[][]
											) => {
											switch (dbColumn.name) {
												// Do not add Actor or Repository the are recorded
												// at record history level
												case repositoryEntity.ACTOR_ID:
												case repositoryEntity.REPOSITORY_ID:
													break;
												default:
													recHistoryDuo.addOldValue(recordHistory, dbColumn,
														value, recHistoryOldValueDuo)
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
								recHistoryDuo
									.addOldValue(recordHistory, dbColumn,
										recordToDelete[dbProperty.name],
										recHistoryOldValueDuo)
							}
						}
						if (actorId !== repoTransHistory.actor.id) {
							recordHistory.actor = {
								id: actorId
							}
						}
					}
				}
			}
		}
	}

	private getCascadeSubTree(
		dbEntity: DbEntity,
		applicationUtils: IApplicationUtils,
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
						this.getCascadeSubTree(dbRelation.relationEntity, applicationUtils, subTree)
						break
					case EntityRelationType.MANY_TO_ONE:
						applicationUtils.addRelationToEntitySelectClause(dbRelation, selectClause)
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

DI.set(DELETE_MANAGER, DeleteManager)
