import {RepoTransBlockSyncOutcomeType}    from '@airport/arrivals-n-departures'
import {DI}                               from '@airport/di'
import {TransactionType}                  from '@airport/ground-control'
import {
	ActorId,
	IActor,
	IRepositoryTransactionHistory,
	RepositoryId,
	RepositoryTransactionType
}                                         from '@airport/holding-pattern'
import {
	IMissingRecordRepoTransBlock,
	IMissingRecordRepoTransBlockDao,
	IRepositoryTransactionBlock,
	IRepositoryTransactionBlockDao,
	ISharingMessage,
	ISharingMessageRepoTransBlockDao,
	MISSING_RECORD_REPO_TRANS_BLOCK_DAO,
	REPO_TRANS_BLOCK_DAO,
	SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO,
	SharingMessageRepoTransBlockECreateProperties
}                                         from '@airport/moving-walkway'
import {stringify}                        from 'zipson/lib'
import {SYNC_IN_REPO_TRANS_BLOCK_CREATOR} from '../../../diTokens'
import {IMissingRecordDataToTM}           from '../checker/SyncInDataChecker'
import {IDataToTM}                        from '../SyncInUtils'

export interface ISyncInRepositoryTransactionBlockCreator {

	createRepositoryTransBlocks(
		dataMessagesWithIncompatibleSchemas: IDataToTM[],
		dataMessagesWithIncompatibleData: IDataToTM[],
		dataMessagesToBeUpgraded: IDataToTM[],
		dataMessagesWithCompatibleSchemasAndData: IDataToTM[],
		dataMessagesWithInvalidData: IDataToTM[]
	): Promise<IDataToTM[]>;

	createMissingRecordRepoTransBlocks(
		missingRecordDataToTMs: IMissingRecordDataToTM[]
	): Promise<void>;

	createSharingMessageRepoTransBlocks(
		allDataToTM: IDataToTM[]
	): Promise<void>;

	createSharingNodeRepoTransBlocks(
		allDataToTM: IDataToTM[]
	): Promise<void>;
}

export class SyncInRepositoryTransactionBlockCreator
	implements ISyncInRepositoryTransactionBlockCreator {

	private repositoryTransactionBlockDao: IRepositoryTransactionBlockDao
	private missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao
	private sharingMessageRepoTransBlockDao: ISharingMessageRepoTransBlockDao

	constructor() {
		DI.get((
			repositoryTransactionBlockDao,
			missingRecordRepoTransBlockDao,
			sharingMessageRepoTransBlockDao
			) => {
				this.repositoryTransactionBlockDao   = repositoryTransactionBlockDao
				this.missingRecordRepoTransBlockDao  = missingRecordRepoTransBlockDao
				this.sharingMessageRepoTransBlockDao = sharingMessageRepoTransBlockDao
			}, REPO_TRANS_BLOCK_DAO, MISSING_RECORD_REPO_TRANS_BLOCK_DAO,
			SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO)
	}


	async createRepositoryTransBlocks(
		dataMessagesWithIncompatibleSchemas: IDataToTM[],
		dataMessagesWithIncompatibleData: IDataToTM[],
		dataMessagesToBeUpgraded: IDataToTM[],
		dataMessagesWithCompatibleSchemasAndData: IDataToTM[],
		dataMessagesWithInvalidData: IDataToTM[],
	): Promise<IDataToTM[]> {
		let allRepositoryTransactionBlocks: IRepositoryTransactionBlock[] = []

		const repoTransBlocksNeedingSchemaChanges = this.createRepositoryTransactionBlocks(
			dataMessagesWithIncompatibleSchemas,
			RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_SCHEMA_CHANGES,
			true
		)
		allRepositoryTransactionBlocks            = allRepositoryTransactionBlocks.concat(
			repoTransBlocksNeedingSchemaChanges
		)

		const repoTransBlocksNeedingDataUpgrades = this.createRepositoryTransactionBlocks(
			dataMessagesToBeUpgraded,
			RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_DATA_UPGRADES,
			true
		)
		allRepositoryTransactionBlocks           = allRepositoryTransactionBlocks.concat(
			repoTransBlocksNeedingDataUpgrades
		)

		const repoTransBlocksNeedingAdditionalData = this.createRepositoryTransactionBlocks(
			dataMessagesWithIncompatibleData,
			RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_ADDITIONAL_DATA,
			true
		)
		allRepositoryTransactionBlocks             = allRepositoryTransactionBlocks.concat(
			repoTransBlocksNeedingAdditionalData
		)

		const repoTransBlocksWithInvalidData = this.createRepositoryTransactionBlocks(
			dataMessagesWithInvalidData,
			RepoTransBlockSyncOutcomeType.SYNC_TO_TM_INVALID_DATA
		)
		allRepositoryTransactionBlocks       = allRepositoryTransactionBlocks.concat(
			repoTransBlocksWithInvalidData
		)

		const repoTransBlocksWithValidDataAndSchemas = this.createRepositoryTransactionBlocks(
			dataMessagesWithCompatibleSchemasAndData,
			RepoTransBlockSyncOutcomeType.SYNC_TO_TM_SUCCESSFUL
		)
		allRepositoryTransactionBlocks               = allRepositoryTransactionBlocks.concat(
			repoTransBlocksWithValidDataAndSchemas
		)

		await this.repositoryTransactionBlockDao.bulkCreate(
			allRepositoryTransactionBlocks, false, false)


		let allDataToTM: IDataToTM[] = []
		allDataToTM                  = allDataToTM.concat(dataMessagesWithIncompatibleSchemas)
		allDataToTM                  = allDataToTM.concat(dataMessagesWithIncompatibleData)
		allDataToTM                  = allDataToTM.concat(dataMessagesToBeUpgraded)
		allDataToTM                  = allDataToTM.concat(dataMessagesWithCompatibleSchemasAndData)
		allDataToTM                  = allDataToTM.concat(dataMessagesWithInvalidData)

		return allDataToTM
	}

	private createRepositoryTransactionBlocks(
		dataMessages: IDataToTM[],
		syncOutcomeType: RepoTransBlockSyncOutcomeType,
		recordContents = false
	): IRepositoryTransactionBlock[] {
		const repositoryTransactionBlocks: IRepositoryTransactionBlock[] = []

		for (const dataMessage of dataMessages) {
			const data                                                    = dataMessage.data
			const repositoryTransactionBlock: IRepositoryTransactionBlock = {
				contents: recordContents ? stringify(data) : null,
				hash: null, // TODO: implement RTB hashing
				repository: data.repository,
				source: data.terminal,
				syncOutcomeType,
			}
			dataMessage.repositoryTransactionBlock                        = repositoryTransactionBlock
			repositoryTransactionBlocks.push(repositoryTransactionBlock)
		}

		return repositoryTransactionBlocks
	}

	async createMissingRecordRepoTransBlocks(
		missingRecordDataToTMs: IMissingRecordDataToTM[]
	): Promise<void> {
		const missingRecordRepoTransBlocks: IMissingRecordRepoTransBlock[]
			      = missingRecordDataToTMs.map(
			missingRecordDataToTM => ({
				missingRecord: missingRecordDataToTM.missingRecord,
				repositoryTransactionBlock: missingRecordDataToTM
					.dataMessage.repositoryTransactionBlock
			}))
		if (missingRecordRepoTransBlocks.length) {
			await this.missingRecordRepoTransBlockDao.bulkCreate(
				missingRecordRepoTransBlocks, false, false)
		}
	}

	async createSharingMessageRepoTransBlocks(
		allDataToTM: IDataToTM[]
	): Promise<void> {
		const sharingMessageRepoTransBlocks: SharingMessageRepoTransBlockECreateProperties[]
			      = allDataToTM.map(
			dataToTM => ({
				sharingMessage: dataToTM.sharingMessage,
				repositoryTransactionBlock: dataToTM.repositoryTransactionBlock
			})) as SharingMessageRepoTransBlockECreateProperties[]
		await this.sharingMessageRepoTransBlockDao.bulkCreate(
			sharingMessageRepoTransBlocks, false, false)
	}

	private async recordSharingMessageToHistoryRecords(
		sharingMessages: ISharingMessage[],
		existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[],
		dataMessages: IDataToTM[],
		actorMapById: Map<ActorId, IActor>
	): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>> {
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
			      = await this.getRepoTransHistoryMapByRepoId(dataMessages,
			existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById)

		const repositoryTransactionBlocks: IRepositoryTransactionBlock[]                     = []
		const sharingMessageRepoTransBlocks: SharingMessageRepoTransBlockECreateProperties[] = []
		// const repoTransBlockRepoTransHistories: IRepoTransBlockRepoTransHistory[] = [];

		const transactionHistory           = this.transactionManager.currentTransHistory
		transactionHistory.transactionType = TransactionType.REMOTE_SYNC

		// split messages by repository and record actor information
		for (let i = 0; i < dataMessages.length; i++) {
			const sharingMessage                                          = sharingMessages[i]
			const dataMessage                                             = dataMessages[i]
			const data                                                    = dataMessage.data
			const repositoryTransactionBlock: IRepositoryTransactionBlock = {
				repository: data.repository,
				syncOutcomeType: RepoTransBlockSyncOutcomeType.SYNC_SUCCESSFUL
			}
			repositoryTransactionBlocks.push(repositoryTransactionBlock)
			sharingMessageRepoTransBlocks.push({
				sharingMessage,
				repositoryTransactionBlock
			})
			transactionHistory.repositoryTransactionHistories
				= transactionHistory.repositoryTransactionHistories.concat(data.repoTransHistories)
			data.repoTransHistories.forEach((
				repositoryTransactionHistory
			) => {
				repositoryTransactionHistory.repositoryTransactionType = RepositoryTransactionType.REMOTE
				repoTransBlockRepoTransHistories.push({
					repositoryTransactionHistory,
					repositoryTransactionBlock
				})
				transactionHistory.allOperationHistory = transactionHistory
					.allOperationHistory.concat(repositoryTransactionHistory.operationHistory)
				repositoryTransactionHistory.operationHistory.forEach((
					operationHistory
				) => {
					transactionHistory.allRecordHistory = transactionHistory
						.allRecordHistory.concat(operationHistory.recordHistory)
					operationHistory.recordHistory.forEach((
						recordHistory
					) => {
						transactionHistory.allRecordHistoryNewValues = transactionHistory
							.allRecordHistoryNewValues.concat(recordHistory.newValues)
						transactionHistory.allRecordHistoryOldValues = transactionHistory
							.allRecordHistoryOldValues.concat(recordHistory.oldValues)
					})
				})

			})
		}

		await this.repositoryTransactionBlockDao.bulkCreate(
			repositoryTransactionBlocks, false, false)
		await this.sharingMessageRepoTransBlockDao.bulkCreate(
			sharingMessageRepoTransBlocks, false, false)
		// await this.repoTransBlockRepoTransHistoryDao.bulkCreate(
		// 	repoTransBlockRepoTransHistories, false, false);

		return repoTransHistoryMapByRepositoryId
	}

	createSharingNodeRepoTransBlocks(
		allDataToTM: IDataToTM[]
	): Promise<void> {
		throw `Not Implemented`
	}


}

DI.get(SYNC_IN_REPO_TRANS_BLOCK_CREATOR, SyncInRepositoryTransactionBlockCreator)
