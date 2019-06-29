import {AIR_DB}             from '@airport/air-control'
import {
	ISequenceGenerator,
	SEQUENCE_GENERATOR
}                           from '@airport/check-in'
import {DI}                 from '@airport/di'
import {
	ChangeType,
	DbEntity,
	JsonInsertValues,
	PortableQuery,
	repositoryEntity,
	STORE_DRIVER
}                           from '@airport/ground-control'
import {
	IActor,
	IOperationHistory,
	IOperationHistoryDuo,
	IRecordHistoryDuo,
	IRecordHistoryNewValueDuo,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDuo,
	OPER_HISTORY_DUO,
	REC_HIST_NEW_VALUE_DUO,
	REC_HISTORY_DUO,
	REPO_TRANS_HISTORY_DUO
}                           from '@airport/holding-pattern'
import {
	DistributionStrategy,
	ITransactionManager,
	PlatformType,
	TRANSACTION_MANAGER
}                           from '@airport/terminal-map'
import {IRepositoryManager} from '../core/repository/RepositoryManager'
import {
	HISTORY_MANAGER,
	INSERT_MANAGER,
	OFFLINE_DELTA_STORE,
	REPOSITORY_MANAGER
}                           from '../diTokens'
import {IHistoryManager}    from './HistoryManager'

export type RecordId = number;

export interface IInsertManager {

	insertValues(
		portableQuery: PortableQuery,
		actor: IActor,
		ensureGeneratedValues?: boolean
	): Promise<number>;

	insertValuesGetIds(
		portableQuery: PortableQuery,
		actor: IActor,
	): Promise<RecordId[]>;

	addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
	): Promise<number>;

}

export class InsertManager
	implements IInsertManager {

	// get currentTransHistory(): ITransactionHistory {
	// 	return this.transManager.currentTransHistory
	// }

	async insertValues(
		portableQuery: PortableQuery,
		actor: IActor,
		ensureGeneratedValues?: boolean
	): Promise<number> {
		return <number>await this.internalInsertValues(
			portableQuery, actor, false, ensureGeneratedValues)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		actor: IActor
	): Promise<RecordId[]> {
		return <RecordId[]>await this.internalInsertValues(
			portableQuery, actor, true)
	}

	private async internalInsertValues(
		portableQuery: PortableQuery,
		actor: IActor,
		getIds: boolean                = false,
		ensureGeneratedValues: boolean = true
	): Promise<number | RecordId[]> {
		// TODO: remove unused dependencies after testing
		const [
			      airDb,
			      storeDriver,
			      sequenceGenerator,
			      historyManager,
			      offlineDataStore,
			      operHistoryDuo,
			      recHistoryDuo,
			      recHistoryNewValueDuo,
			      repositoryManager,
			      repoTransHistoryDuo,
			      transactionManager
		      ] = await DI.get(AIR_DB, STORE_DRIVER,
			SEQUENCE_GENERATOR, HISTORY_MANAGER,
			OFFLINE_DELTA_STORE, OPER_HISTORY_DUO,
			REC_HISTORY_DUO, REC_HIST_NEW_VALUE_DUO, REPOSITORY_MANAGER,
			REPO_TRANS_HISTORY_DUO, TRANSACTION_MANAGER)

		const dbEntity = airDb.schemas[portableQuery.schemaIndex]
			.currentVersion.entities[portableQuery.tableIndex]

		if (dbEntity.isRepositoryEntity) {
			this.ensureRepositoryEntityIdValues(actor, dbEntity,
				<JsonInsertValues>portableQuery.jsonQuery)
		}

		let ids
		if (ensureGeneratedValues) {
			ids = await this.ensureGeneratedValues(dbEntity,
				<JsonInsertValues>portableQuery.jsonQuery, sequenceGenerator)
		}


		if (!dbEntity.isLocal) {
			await this.addInsertHistory(dbEntity, portableQuery, actor,
				historyManager, operHistoryDuo, recHistoryDuo,
				recHistoryNewValueDuo, repositoryManager,
				repoTransHistoryDuo, transactionManager)
		}

		const numberOfInsertedRecords = await storeDriver.insertValues(portableQuery)

		return getIds ? ids : numberOfInsertedRecords
	}

	addRepository(
		name: string,
		url: string                                = null,
		platform: PlatformType                     = PlatformType.GOOGLE_DOCS,
		platformConfig: string                     = null,
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_DISTIBUTED_PUSH,
	): Promise<number> {
		return DI.get(REPOSITORY_MANAGER, TRANSACTION_MANAGER).then(([
			                                                             repoManager, transManager
		                                                             ]) =>
			repoManager.createRepository(
				name, distributionStrategy, transManager.storeType,
				platform, platformConfig, 'id')
		).then(
			repository => repository.id)
	}

	private async ensureGeneratedValues(
		dbEntity: DbEntity,
		jsonInsertValues: JsonInsertValues,
		seqGenerator: ISequenceGenerator
	): Promise<number[]> {
		let ids: number[] = null

		const values    = jsonInsertValues.V
		const idColumns = dbEntity.idColumns

		for (const idColumn of idColumns) {
			if (idColumn.isGenerated) {
				continue
			}
			for (const entityValues of values) {
				let idValue = entityValues[idColumn.index]
				if (!idValue && idValue !== 0) {
					throw `No value provided on insert for @Id '${dbEntity.name}.${idColumn.name}'.`
				}
			}
		}

		// if (dbEntity.isRepositoryEntity) {
		// 	const repositoryColumn  = dbEntity.columnMap[repositoryEntity.FOREIGN_KEY]
		// 	const repositoryIdIndex = repositoryColumn.index
		// 	for (const entityValues of values) {
		// 		const repositoryId = entityValues[repositoryIdIndex]
		// 		if (!repositoryId && repositoryId !== 0) {
		// 			throw `@Column({ name: 'REPOSITORY_ID'}) value is not specified on insert for
		// 			'${dbEntity.name}.${repositoryColumn.name}'.`
		// 		}
		// 	}
		// }

		const generatedColumns = dbEntity.columns.filter(
			dbColumn => dbColumn.isGenerated
		)
		if (!generatedColumns.length) {
			if (idColumns.length === 1) {
				const idColumn = idColumns[0]
				ids            = values.map(
					entityValues => entityValues[idColumn.index])
			}
			return ids
		}

		for (const entityValues of values) {
			generatedColumns.forEach((generatedColumn) => {
				const generatedValue = entityValues[generatedColumn.index]
				if (generatedValue || generatedValue === 0) {
					// Allowing negative integers for temporary identification
					// within the circular dependency management lookup
					if (generatedValue >= 0) {
						throw `Already provided value '${entityValues[generatedColumn.index]}'
					on insert for @GeneratedValue '${dbEntity.name}.${generatedColumn.name}'.
					You cannot explicitly provide values for @GeneratedValue columns'.`
					}
				}
			})
		}

		const numSequencesNeeded      = generatedColumns.map(
			_ => values.length)
		const generatedSequenceValues = await seqGenerator.generateSequenceNumbers(
			generatedColumns, numSequencesNeeded)

		generatedColumns.forEach((
			dbColumn,
			generatedColumnIndex
		) => {
			const generatedColumnSequenceValues = generatedSequenceValues[generatedColumnIndex]
			values.forEach((
				entityValues,
				index
			) => {
				entityValues[dbColumn.index] = generatedColumnSequenceValues[index]
			})

			if (dbEntity.idColumnMap[dbColumn.name]) {
				ids = values.map(
					entityValues => entityValues[dbColumn.index])
			}
		})

		return ids
	}

	private ensureRepositoryEntityIdValues(
		actor: IActor,
		dbEntity: DbEntity,
		jsonInsertValues: JsonInsertValues
	): void {
		// const actorRecordIds: RepositoryEntityActorRecordId[] = []
		const actorIdColumn = dbEntity.idColumnMap['ACTOR_ID']
		// const actorRecordIdColumn                             =
		// dbEntity.idColumnMap['ACTOR_RECORD_ID']
		const repositoryIdColumn = dbEntity.idColumnMap['REPOSITORY_ID']

		for (const entityValues of jsonInsertValues.V) {
			if (entityValues[actorIdColumn.index] || entityValues[actorIdColumn.index] === 0) {
				throw `Already provided value '${entityValues[actorIdColumn.index]}'
				on insert for @Id '${dbEntity.name}.${actorIdColumn.name}'.
				You cannot explicitly provide a value for ACTOR_ID on Repository row inserts.`
			}
			// if (entityValues[actorRecordIdColumn.index] ||
			// entityValues[actorRecordIdColumn.index] === 0) { throw `Already provided value
			// '${entityValues[actorRecordIdColumn.index]}' on insert for @Id @GeneratedValue
			// '${dbEntity.name}.${actorRecordIdColumn.name}'. You cannot explicitly provide
			// values for generated ids.` }
			if (!entityValues[repositoryIdColumn.index]) {
				throw `Did not provide a positive integer value 
				(instead provided '${entityValues[repositoryIdColumn.index]}')
				 on insert for @Id '${dbEntity.name}.${repositoryIdColumn.name}'.
				 You must explicitly provide a value for REPOSITORY_ID on Repository row inserts.`
			}

			entityValues[actorIdColumn.index] = actor.id
			// const actorRecordId               = this.idGenerator.generateEntityId(dbEntity)
			// actorRecordIds.push(actorRecordId)
			// entityValues[actorRecordIdColumn.index] = actorRecordId
		}

		// return actorRecordIds
	}

	/**
	 *
	 * All repository records must have ids when inserted.  Currently AP doesn't support
	 * inserting from select and in the values provided id's must either be explicitly
	 * specified or already provided. For all repository entities all ids must be
	 * auto-generated.
	 *
	 * @param {DbEntity} dbEntity
	 * @param {PortableQuery} portableQuery
	 * @returns {Promise<void>}
	 */
	private async addInsertHistory(
		dbEntity: DbEntity,
		portableQuery: PortableQuery,
		actor: IActor,
		histManager: IHistoryManager,
		operHistoryDuo: IOperationHistoryDuo,
		recHistoryDuo: IRecordHistoryDuo,
		recHistoryNewValueDuo: IRecordHistoryNewValueDuo,
		repoManager: IRepositoryManager,
		repoTransHistoryDuo: IRepositoryTransactionHistoryDuo,
		transManager: ITransactionManager
	): Promise<void> {
		const jsonInsertValues = <JsonInsertValues>portableQuery.jsonQuery

		let operationsByRepo: IOperationHistory[]               = []
		let repoTransHistories: IRepositoryTransactionHistory[] = []

		const repositoryIdIndex  = dbEntity.columnMap[repositoryEntity.REPOSITORY_ID].index
		const actorIdIndex       = dbEntity.columnMap[repositoryEntity.ACTOR_ID].index
		const actorRecordIdIndex = dbEntity.columnMap[repositoryEntity.ACTOR_RECORD_ID].index

		let repositoryIdColumnNumber
		let actorIdColumnNumber
		let actorRecordIdColumnNumber
		for (const columnNumber in jsonInsertValues.C) {
			const columnIndex = jsonInsertValues.C[columnNumber]
			switch (columnIndex) {
				case repositoryIdIndex:
					repositoryIdColumnNumber = columnNumber
					break
				case actorIdIndex:
					actorIdColumnNumber = columnNumber
					break
				case actorRecordIdIndex:
					actorRecordIdColumnNumber = columnNumber
					break
			}
		}

		// Rows may belong to different repositories
		for (const row of jsonInsertValues.V) {
			const repositoryId   = row[repositoryIdColumnNumber]
			const repo           = await repoManager.getRepository(repositoryId)
			let repoTransHistory = repoTransHistories[repositoryId]
			if (!repoTransHistory) {
				repoTransHistory = await histManager
					.getNewRepoTransHistory(transManager.currentTransHistory, repo, actor)
			}

			let operationHistory = operationsByRepo[repositoryId]
			if (!operationHistory) {
				operationHistory               = repoTransHistoryDuo.startOperation(
					repoTransHistory, ChangeType.INSERT_VALUES, dbEntity,
					operHistoryDuo)
				operationsByRepo[repositoryId] = operationHistory
			}

			const actorRecordId = row[actorRecordIdColumnNumber]
			const recordHistory = operHistoryDuo.startRecordHistory(
				operationHistory, actorRecordId, recHistoryDuo)

			for (const columnNumber in jsonInsertValues.C) {
				if (columnNumber === repositoryIdColumnNumber
					|| columnNumber === actorIdColumnNumber
					|| columnNumber === actorRecordIdColumnNumber) {
					continue
				}
				const columnIndex = jsonInsertValues.C[columnNumber]
				const dbColumn    = dbEntity.columns[columnIndex]
				const newValue    = row[columnNumber]
				recHistoryDuo.addNewValue(recordHistory, dbColumn, newValue,
					recHistoryNewValueDuo)
			}
		}

		// for (const repositoryId in operationsByRepo) {
		// 	const repoTransHistory = await
		// 		this.currentTransHistory.getRepositoryTransaction(
		// 			repositoryId, null, null, null, repoTransHistoryDuo);
		// 	repoTransHistory.endGroupMutation(operationsByRepo[repositoryId]);
		// }
	}

}

DI.set(INSERT_MANAGER, InsertManager)
