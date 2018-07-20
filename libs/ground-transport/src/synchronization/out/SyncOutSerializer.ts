import {Service} from "typedi";
import {SyncOutSerializerToken} from "../../../../apps/terminal/src/InjectionTokens";
import {
	IRepositoryTransactionBlock,
	IRepoTransBlockRepoTransHistory,
	ISharingMessage,
	ISharingMessageRepoTransBlock,
	ISharingNode,
	ISharingNodeDatabase,
	RepositoryTransactionBlockData,
	SharingNodeId
} from "@airport/moving-walkway";
import {
	IDatabase,
	IRepository,
	RepositoryId,
	RepositoryTransactionHistoryId
} from "@airport/holding-pattern";
import {Transactional} from "@airport/tower";
import {
	AgtRepositoryId,
	DatabaseInfo,
	MessageFromClient,
	MessageFromClientOperation,
	RepositoryUpdateRequest
} from "@airport/ground-control";
import {SyncStatus} from "@airport/terminal-map";

export interface ISyncOutSerializer {

	serializeMessages(
		sharingNodeDbMap: Map<SharingNodeId, ISharingNodeDatabase>,
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		repoMapBySharingNodeAndRepoIds: Map<SharingNodeId, Map<RepositoryId,
			[IRepository, AgtRepositoryId]>>,
		repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>,
		repoTransHistoryIds: Set<RepositoryTransactionHistoryId>,
		database: IDatabase
	): Promise<Map<SharingNodeId, MessageFromClient>>;

}

@Service(SyncOutSerializerToken)
export class SyncOutSerializer
	implements ISyncOutSerializer {

	@Transactional()
	async serializeMessages(
		sharingNodeDbMap: Map<SharingNodeId, ISharingNodeDatabase>,
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		repoMapBySharingNodeAndRepoIds: Map<SharingNodeId, Map<RepositoryId,
			[IRepository, AgtRepositoryId]>>,
		repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>,
		repoTransHistoryIds: Set<RepositoryTransactionHistoryId>,
		database: IDatabase
	): Promise<Map<SharingNodeId, MessageFromClient>> {
		const messageMap: Map<SharingNodeId, MessageFromClient> = new Map();

		const lastSyncAttemptTimestamp = new Date();
		const repositoryTransactionBlocks: IRepositoryTransactionBlock[] = [];
		const repoTransBlocksByRepositoryId: Map<RepositoryId, IRepositoryTransactionBlock> = new Map();

		let allTransLogRepoTransHistories: IRepoTransBlockRepoTransHistory[] = [];
		for (const [repositoryId, messageData] of repoTransBlockDataByRepoId) {
			const repositoryTransactionBlockContents = stringify(messageData);

			const repoTransBlockRepoTransHistories: IRepoTransBlockRepoTransHistory[] = [];

			const repositoryTransactionBlock: IRepositoryTransactionBlock = {
				lastSyncAttemptTimestamp,
				repository: {
					id: repositoryId
				},
				source: {
					name: database.name,
					secondId: database.secondId,
					owner: {
						uniqueId: database.owner.uniqueId
					}
				},
				contents: repositoryTransactionBlockContents,
				repoTransBlockRepoTransHistories,
			};

			this.utils.ensureChildArray(repoTransBlocksByRepositoryId, repositoryId)
				.push(repositoryTransactionBlock);

			for (const repositoryTransactionHistory of messageData.repoTransHistories) {
				repoTransBlockRepoTransHistories.push({
					repositoryTransactionHistory,
					repositoryTransactionBlock
				});
			}
			allTransLogRepoTransHistories
				= allTransLogRepoTransHistories.concat(repoTransBlockRepoTransHistories);

			repositoryTransactionBlocks.push(repositoryTransactionBlock);
		}

		await this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
		await this.repoTransBlockRepoTransHistoryDao
			.bulkCreate(allTransLogRepoTransHistories, false, false);

		const sharingMessages: ISharingMessage[] = [];
		const sharingMessageRepoTransBlocks: ISharingMessageRepoTransBlock[] = [];

		for (const [sharingNodeId, repositoryMapById] of repoMapBySharingNodeAndRepoIds) {
			const repositoryUpdateRequests: RepositoryUpdateRequest[] = [];
			const sharingNodeDb = sharingNodeDbMap.get(sharingNodeId);
			const databaseInfo: DatabaseInfo
				= [sharingNodeDb.agtDatabaseId, sharingNodeDb.agtDatabaseHash];
			// FIXME: add sync ACKS
			const message: MessageFromClient = [
				MessageFromClientOperation.ADD_DATA, databaseInfo, null, repositoryUpdateRequests, null];
			messageMap.set(sharingNodeId, message);

			const sharingMessage: ISharingMessage = {
				syncStatus: SyncStatus.SYNC_PENDING,
				transmissionRetryCount: 0,
				sharingNode: sharingNodeMap.get(sharingNodeId)
			};
			sharingMessages.push(sharingMessage);
			for (const [repositoryId, repositoryAndAgtRepositoryId] of repositoryMapById) {
				const repositoryTransactionBlock = repoTransBlocksByRepositoryId.get(repositoryId);

				repositoryUpdateRequests.push([repositoryAndAgtRepositoryId[1],
					repositoryTransactionBlock.id, repositoryTransactionBlock.repositoryTransactionBlockContents]);

				const sharingMessageRepoTransBlock: ISharingMessageRepoTransBlock = {
					sharingMessage,
					repositoryTransactionBlock,
				};
				sharingMessageRepoTransBlocks.push(sharingMessageRepoTransBlock);
			}
		}

		await this.sharingMessageDao.bulkCreate(sharingMessages, false, false);

		for (const sharingMessage of sharingMessages) {
			messageMap.get(sharingMessage.sharingNode.id)[2] = sharingMessage.id;
		}

		await this.sharingMessageRepoTransBlockDao.bulkCreate(
			sharingMessageRepoTransBlocks, false, false
		);

		// await this.repositoryTransactionHistoryDao.updateSyncStatusHistory(
		// 	SyncStatus.SYNCHRONIZING, Array.from(repoTransHistoryIds)
		// );

		return messageMap;
	}


}