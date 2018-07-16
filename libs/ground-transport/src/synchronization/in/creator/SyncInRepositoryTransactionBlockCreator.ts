import {RepoTransBlockSyncOutcomeType}                from "@airport/ground-control";
import {
	ActorId,
	IActor,
	IRepositoryTransactionHistory,
	RepositoryId,
	RepositoryTransactionType
}                                                     from "@airport/holding-pattern";
import {
	IRepositoryTransactionBlock,
	IRepoTransBlockRepoTransHistory,
	ISharingMessage,
	ISharingMessageRepoTransBlock
}                                                     from "@airport/moving-walkway";
import {TransactionType}                              from "@airport/terminal-map";
import {Service}                                      from "typedi";
import {SyncInRepositoryTransactionBlockCreatorToken} from "../../../InjectionTokens";
import {IDataToTM}                                    from "../SyncInUtils";

export interface ISyncInRepositoryTransactionBlockCreator {

}

@Service(SyncInRepositoryTransactionBlockCreatorToken)
export class SyncInRepositoryTransactionBlockCreator
	implements ISyncInRepositoryTransactionBlockCreator {

	private async recordSharingMessageToHistoryRecords(
		sharingMessages: ISharingMessage[],
		existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[],
		dataMessages: IDataToTM[],
		actorMapById: Map<ActorId, IActor>
	): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>> {
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
			= await this.getRepoTransHistoryMapByRepoId(dataMessages,
			existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);

		const repositoryTransactionBlocks: IRepositoryTransactionBlock[] = [];
		const sharingMessageRepoTransBlocks: ISharingMessageRepoTransBlock[] = [];
		const repoTransBlockRepoTransHistories: IRepoTransBlockRepoTransHistory[] = [];

		const transactionHistory = this.transactionManager.currentTransHistory;
		transactionHistory.transactionType = TransactionType.REMOTE_SYNC;

		// split messages by repository and record actor information
		for (let i = 0; i < dataMessages.length; i++) {
			const sharingMessage = sharingMessages[i];
			const dataMessage = dataMessages[i];
			const data = dataMessage.data;
			const repositoryTransactionBlock: IRepositoryTransactionBlock = {
				repository: data.repository,
				syncOutcomeType: RepoTransBlockSyncOutcomeType.SYNC_SUCCESSFUL
			};
			repositoryTransactionBlocks.push(repositoryTransactionBlock);
			sharingMessageRepoTransBlocks.push({
				sharingMessage,
				repositoryTransactionBlock
			});
			transactionHistory.repositoryTransactionHistories
				= transactionHistory.repositoryTransactionHistories.concat(data.repoTransHistories);
			data.repoTransHistories.forEach((
				repositoryTransactionHistory
			) => {
				repositoryTransactionHistory.repositoryTransactionType = RepositoryTransactionType.REMOTE;
				repoTransBlockRepoTransHistories.push({
					repositoryTransactionHistory,
					repositoryTransactionBlock
				});
				transactionHistory.allOperationHistory = transactionHistory
					.allOperationHistory.concat(repositoryTransactionHistory.operationHistory);
				repositoryTransactionHistory.operationHistory.forEach((
					operationHistory
				) => {
					transactionHistory.allRecordHistory = transactionHistory
						.allRecordHistory.concat(operationHistory.recordHistory);
					operationHistory.recordHistory.forEach((
						recordHistory
					) => {
						transactionHistory.allRecordHistoryNewValues = transactionHistory
							.allRecordHistoryNewValues.concat(recordHistory.newValues);
						transactionHistory.allRecordHistoryOldValues = transactionHistory
							.allRecordHistoryOldValues.concat(recordHistory.oldValues);
					});
				});

			});
		}

		await this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
		await this.sharingMessageRepoTransBlockDao.bulkCreate(
			sharingMessageRepoTransBlocks, false, false);
		await this.repoTransBlockRepoTransHistoryDao.bulkCreate(
			repoTransBlockRepoTransHistories, false, false);

		return repoTransHistoryMapByRepositoryId;
	}


}