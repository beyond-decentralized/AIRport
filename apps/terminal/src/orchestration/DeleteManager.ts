import {
	AIR_DB,
	IAirportDatabase,
	IUtils,
	MappedEntityArray,
	UTILS,
	Y
}                           from '@airport/air-control'
import {
	DI
}                           from '@airport/di'
import {
	CascadeType,
	ChangeType,
	DbColumn,
	DbEntity,
	DbProperty,
	EntityId,
	EntityRelationType,
	IStoreDriver,
	JsonDelete,
	JsonEntityQuery,
	PortableQuery,
	QueryResultType,
	SchemaIndex,
	STORE_DRIVER
}                           from '@airport/ground-control'
import {
	IActor,
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRepository,
	IRepositoryTransactionHistoryDuo,
	OPER_HISTORY_DUO,
	REC_HISTORY_DUO,
	REPO_TRANS_HISTORY_DUO,
	RepositoryEntity,
	RepositoryId
}                           from '@airport/holding-pattern'
import {
	ITransactionManager,
	TRANSACTION_MANAGER
}                           from '@airport/terminal-map'
import {IRepositoryManager} from '../core/repository/RepositoryManager'
import {IOfflineDeltaStore} from '../data/OfflineDeltaStore'
import {
	DELETE_MANAGER,
	HISTORY_MANAGER,
	OFFLINE_DELTA_STORE,
	REPOSITORY_MANAGER
}                           from '../diTokens'
import {IHistoryManager}    from './HistoryManager'

export interface IDeleteManager {

	deleteWhere(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<number>;

}

type RecordsToDelete =
	Map<SchemaIndex, Map<EntityId, Map<RepositoryId, RepositoryEntity[]>>>;

export class DeleteManager
	implements IDeleteManager {

	private airDb: IAirportDatabase
	private dataStore: IStoreDriver
	private historyManager: IHistoryManager
	private offlineDataStore: IOfflineDeltaStore
	private operHistoryDuo: Promise<IOperationHistoryDuo>
	private recHistoryDuo: Promise<IRecordHistoryDuo>
	private repoManager: IRepositoryManager
	private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>
	// private transHistoryDuo: Promise<ITransactionHistoryDuo>
	private transManager: ITransactionManager
	private utils: IUtils

	constructor() {
		DI.get((
			airportDatabase,
			dataStore,
			historyManager,
			offlineDataStore,
			repositoryManager,
			transactionManager,
			utils
			) => {
				this.airDb            = airportDatabase
				this.dataStore        = dataStore
				this.historyManager   = historyManager
				this.offlineDataStore = offlineDataStore
				this.repoManager      = repositoryManager
				this.transManager     = transactionManager
				this.utils            = utils
			}, AIR_DB, STORE_DRIVER,
			HISTORY_MANAGER, OFFLINE_DELTA_STORE,
			REPOSITORY_MANAGER, TRANSACTION_MANAGER,
			UTILS)
		this.operHistoryDuo      = DI.getP(OPER_HISTORY_DUO,)
		this.recHistoryDuo       = DI.getP(REC_HISTORY_DUO)
		this.repoTransHistoryDuo = DI.getP(REPO_TRANS_HISTORY_DUO)
		// this.transHistoryDuo     = DI.getP(TRANS_HISTORY_DUO)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<number> {
		const dbEntity = this.airDb
			.schemas[portableQuery.schemaIndex].currentVersion.entities[portableQuery.tableIndex]

		const deleteCommand = this.dataStore.deleteWhere(portableQuery)
		if (dbEntity.isLocal) {
			return await deleteCommand
		}

		const selectCascadeTree: any           = this.getCascadeSubTree(dbEntity)
		const jsonDelete                       = <JsonDelete>portableQuery.jsonQuery
		const jsonSelect: JsonEntityQuery<any> = {
			S: selectCascadeTree,
			F: [jsonDelete.DF],
			W: jsonDelete.W,
		}
		const portableSelect                   = {
			schemaIndex: portableQuery.schemaIndex,
			tableIndex: portableQuery.tableIndex,
			jsonQuery: jsonSelect,
			queryResultType: QueryResultType.ENTITY_TREE,
			parameterMap: portableQuery.parameterMap,
			// values: portableQuery.values,
		}
		const treesToDelete                    = await this.dataStore.find<any, Array<any>>(portableSelect)

		const recordsToDelete: RecordsToDelete = new Map()
		const repositoryIdSet                  = new Set<number>()
		for (const treeToDelete of treesToDelete) {
			await this.recordRepositoryIds(treeToDelete, dbEntity, recordsToDelete, repositoryIdSet)
		}

		const repositoryIds                                = Array.from(repositoryIdSet)
		const repositories: MappedEntityArray<IRepository> =
			      await this.repoManager.findReposWithDetailsByIds(...repositoryIds)

		await this.recordTreeToDelete(recordsToDelete, repositories, actor)

		return await deleteCommand
	}

	private recordRepositoryIds(
		treeToDelete: any,
		dbEntity: DbEntity,
		recordsToDelete: RecordsToDelete,
		repositoryIdSet: Set<number>
	): void {
		const repositoryId = treeToDelete.repository.id
		repositoryIdSet.add(repositoryId)

		const recordsToDeleteForSchema
			      = this.utils.ensureChildJsMap(recordsToDelete, dbEntity.schemaVersion.schema.index)
		const recordsToDeleteForTable
			      = this.utils.ensureChildJsMap(recordsToDeleteForSchema, dbEntity.index)
		const recordsToDeleteForRepository
			      = this.utils.ensureChildArray(recordsToDeleteForTable, repositoryId)


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
						this.utils.Schema.forEachColumnOfRelation(
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
						switch (dbRelation.oneToManyElems.cascade) {
							case CascadeType.ALL:
							case CascadeType.REMOVE:
								let childTrees = treeToDelete[dbRelation.property.name]
								if (childTrees && childTrees.length) {
									const childDbEntity = dbRelation.relationEntity
									childTrees.forEach(
										childTree => {
											this.recordRepositoryIds(childTree, childDbEntity, recordsToDelete, repositoryIdSet)
										})
								}
								break
						}
						break
					default:
						throw `Unknown relation type: '${dbRelation.relationType}' on '${dbEntity.name}.${dbRelation.property.name}'.`
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
		// 	throw `Values cannot be undefined, please use null.`;
		// }
		if (foundValues[dbColumn.name] === undefined) {
			foundValues[dbColumn.name] = value
			return false
		}
		if (!this.utils.valuesEqual(foundValues[dbColumn.name], value)) {
			throw `Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.name]} !== ${value}`
		}
		return true
	}


	private async recordTreeToDelete(
		recordsToDelete: RecordsToDelete,
		repositories: MappedEntityArray<IRepository>,
		actor: IActor,
	): Promise<void> {

		const operHistoryDuo      = await this.operHistoryDuo
		const recHistoryDuo       = await this.recHistoryDuo
		const repoTransHistoryDuo = await this.repoTransHistoryDuo

		for (const [schemaIndex, schemaRecordsToDelete] of recordsToDelete) {
			for (const [entityIndex, entityRecordsToDelete] of schemaRecordsToDelete) {
				const dbEntity = this.airDb.schemas[schemaIndex].currentVersion.entities[entityIndex]
				for (const [repositoryId, entityRecordsToDeleteForRepo] of entityRecordsToDelete) {
					const repository = repositories.get(repositoryId)

					const repoTransHistory = await this.historyManager.getNewRepoTransHistory(
						this.transManager.currentTransHistory, repository, actor
					)

					const operationHistory = repoTransHistoryDuo.startOperation(
						repoTransHistory, ChangeType.DELETE_ROWS, dbEntity)


					for (const recordToDelete of entityRecordsToDeleteForRepo) {
						const recordHistory = operHistoryDuo.startRecordHistory(
							operationHistory, recordToDelete.actorRecordId)
						for (const dbProperty of dbEntity.properties) {
							if (dbProperty.relation && dbProperty.relation.length) {
								const dbRelation = dbProperty.relation[0]
								switch (dbRelation.relationType) {
									case EntityRelationType.MANY_TO_ONE:
										this.utils.Schema.forEachColumnOfRelation(
											dbRelation, recordToDelete, (
												dbColumn: DbColumn,
												value: any,
												propertyNameChains: string[][]
											) => {
												recHistoryDuo.addOldValue(recordHistory, dbColumn, value)
											})
										break
									case EntityRelationType.ONE_TO_MANY:
										// One-To-Many do not contain any columns in source entity
										break
									default:
										throw `Unknown relation type: '${dbRelation.relationType}'
										on '${dbEntity.name}.${dbProperty.name}'.`
								}
							} else {
								const dbColumn = dbProperty.propertyColumns[0].column
								recHistoryDuo
									.addOldValue(recordHistory, dbColumn, recordToDelete[dbProperty.name])
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
						switch (dbRelation.oneToManyElems.cascade) {
							case CascadeType.ALL:
							case CascadeType.REMOVE:
								break
							default:
								continue
						}
						const subTree                 = {}
						selectClause[dbProperty.name] = subTree
						this.getCascadeSubTree(dbRelation.relationEntity, subTree)
						break
					case EntityRelationType.MANY_TO_ONE:
						this.utils.Schema.addRelationToEntitySelectClause(dbRelation, selectClause)
						break
					default:
						throw `Unknown relation type: '${dbRelation.relationType}' on '${dbEntity.name}.${dbProperty.name}'.`
				}
			} else {
				selectClause[dbProperty.name] = Y
			}
		}

		return selectClause
	}

}

DI.set(DELETE_MANAGER, DeleteManager)
