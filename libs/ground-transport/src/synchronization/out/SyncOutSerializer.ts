import {
	AgtRepositoryId,
	DataTransferMessageFromTM,
	MessageFromTM,
	MessageFromTMContentType,
	RepositoryUpdateRequest,
	TerminalCredentials
}                            from '@airport/arrivals-n-departures'
import {DI}                  from '@airport/di'
import {
	CascadeOverwrite,
	ensureChildArray
}                            from '@airport/ground-control'
import {
	IRepository,
	REPO_TRANS_HISTORY_DAO,
	RepositoryId,
	RepositoryTransactionHistoryId
}                            from '@airport/holding-pattern'
import {
	IRepositoryTransactionBlock,
	ISharingMessage,
	ISharingMessageRepoTransBlock,
	ISharingNode,
	ISharingNodeTerminal,
	REPO_TRANS_BLOCK_DAO,
	RepositoryTransactionBlockData,
	SHARING_MESSAGE_DAO,
	SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO,
	SharingNodeId
}                            from '@airport/moving-walkway'
import {transactional}       from '@airport/tower'
import {ITerminal}           from '@airport/travel-document-checkpoint'
import {stringify}           from 'zipson/lib'
import {SYNC_OUT_SERIALIZER} from '../../diTokens'

export interface ISyncOutSerializer {

	serializeMessages(
		sharingNodeDbMap: Map<SharingNodeId, ISharingNodeTerminal>,
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		repoMapBySharingNodeAndRepoIds: Map<SharingNodeId, Map<RepositoryId,
			[IRepository, AgtRepositoryId]>>,
		repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>,
		repoTransHistoryIds: Set<RepositoryTransactionHistoryId>,
		terminal: ITerminal
	): Promise<Map<SharingNodeId, MessageFromTM>>;

}

export class SyncOutSerializer
	implements ISyncOutSerializer {

	async serializeMessages(
		sharingNodeDbMap: Map<SharingNodeId, ISharingNodeTerminal>,
		sharingNodeMap: Map<SharingNodeId, ISharingNode>,
		repoMapBySharingNodeAndRepoIds: Map<SharingNodeId, Map<RepositoryId,
			[IRepository, AgtRepositoryId]>>,
		repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>,
		repoTransHistoryIds: Set<RepositoryTransactionHistoryId>,
		terminal: ITerminal
	): Promise<Map<SharingNodeId, MessageFromTM>> {
		const [repoTransBlockDao,
			      repoTransBlockRepoTransHistoryDao,
			      sharingMessageDao,
			      sharingMessageRepoTransBlockDao
		      ]                                             = await DI.get(REPO_TRANS_BLOCK_DAO,
			// TODO: is this what needs to be injected
			REPO_TRANS_HISTORY_DAO,
			SHARING_MESSAGE_DAO,
			SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO)
		const messageMap: Map<SharingNodeId, MessageFromTM> = new Map()

		const lastSyncAttemptTimestamp                                                      = new Date()
		const repositoryTransactionBlocks: IRepositoryTransactionBlock[]                    = []
		const repoTransBlocksByRepositoryId: Map<RepositoryId, IRepositoryTransactionBlock> = new Map()

		let allTransLogRepoTransHistories: IRepoTransBlockRepoTransHistory[] = []
		for (const [repositoryId, messageData] of repoTransBlockDataByRepoId) {
			const repositoryTransactionBlockContents = stringify(messageData)

			const repoTransBlockRepoTransHistories: IRepoTransBlockRepoTransHistory[] = []

			const repositoryTransactionBlock: IRepositoryTransactionBlock = {
				lastSyncAttemptTimestamp,
				repository: {
					id: repositoryId
				},
				source: {
					name: terminal.name,
					secondId: terminal.secondId,
					owner: {
						uniqueId: terminal.owner.uniqueId
					}
				},
				contents: repositoryTransactionBlockContents,
				repoTransBlockRepoTransHistories,
			}

			ensureChildArray(repoTransBlocksByRepositoryId, repositoryId)
				.push(repositoryTransactionBlock)

			for (const repositoryTransactionHistory of messageData.repoTransHistories) {
				repoTransBlockRepoTransHistories.push({
					repositoryTransactionHistory,
					repositoryTransactionBlock
				})
			}
			allTransLogRepoTransHistories
				= allTransLogRepoTransHistories.concat(repoTransBlockRepoTransHistories)

			repositoryTransactionBlocks.push(repositoryTransactionBlock)
		}

		await transactional(async () => {
			await repoTransBlockDao.bulkCreate(repositoryTransactionBlocks,
				CascadeOverwrite.DEFAULT, false)
			await repoTransBlockRepoTransHistoryDao.bulkCreate(
				allTransLogRepoTransHistories, CascadeOverwrite.DEFAULT, false)

			const sharingMessages: ISharingMessage[]                             = []
			const sharingMessageRepoTransBlocks: ISharingMessageRepoTransBlock[] = []

			for (const [sharingNodeId, repositoryMapById] of repoMapBySharingNodeAndRepoIds) {
				const repositoryUpdateRequests: RepositoryUpdateRequest[]
					                                       = []
				const sharingNodeDb                      = sharingNodeDbMap.get(sharingNodeId)
				const terminalCredentials: TerminalCredentials
					                                       = {
					terminalId: sharingNodeDb.agtTerminalId,
					terminalPassword: sharingNodeDb.agtTerminalPassword
				}
				// FIXME: add sync ACKS
				const message: DataTransferMessageFromTM = {
					protocolVersion: 0,
					contentType: MessageFromTMContentType.DATA_TRANSFER,
					terminalCredentials,
					tmSharingMessageId: null,
					repositoryUpdateRequests,
					terminalSyncAcks: []
				}
				messageMap.set(sharingNodeId, message)

				const sharingMessage: ISharingMessage = {
					sharingNode: sharingNodeMap.get(sharingNodeId)
				}
				sharingMessages.push(sharingMessage)
				for (const [repositoryId, repositoryAndAgtRepositoryId] of repositoryMapById) {
					const repositoryTransactionBlock = repoTransBlocksByRepositoryId.get(repositoryId)

					repositoryUpdateRequests.push({
							agtRepositoryId: repositoryAndAgtRepositoryId[1],
							tmRepositoryTransactionBlockId: repositoryTransactionBlock.id,
							repositoryTransactionBlockContents: repositoryTransactionBlock.contents
						}
					)

					const sharingMessageRepoTransBlock: ISharingMessageRepoTransBlock = {
						sharingMessage,
						repositoryTransactionBlock,
					}
					sharingMessageRepoTransBlocks.push(sharingMessageRepoTransBlock)
				}
			}

			await sharingMessageDao.bulkCreate(sharingMessages,
				CascadeOverwrite.DEFAULT, false)

			for (const sharingMessage of sharingMessages) {
				messageMap.get(sharingMessage.sharingNode.id)[2] = sharingMessage.id
			}

			await sharingMessageRepoTransBlockDao.bulkCreate(
				sharingMessageRepoTransBlocks, CascadeOverwrite.DEFAULT,
				false
			)
		})

		// await this.repositoryTransactionHistoryDao.updateSyncStatusHistory(
		// 	SyncStatus.SYNCHRONIZING, Array.from(repoTransHistoryIds)
		// );

		return messageMap
	}


}

DI.set(SYNC_OUT_SERIALIZER, SyncOutSerializer)
