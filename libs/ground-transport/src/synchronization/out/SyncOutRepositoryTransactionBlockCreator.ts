import {container, DI}                                from '@airport/di'
import {
	ensureChildArray,
	ensureChildJsSet,
	ApplicationIndex,
	ApplicationVersionId
}                                          from '@airport/ground-control'
import {
	ACTOR_DAO,
	Actor_Id,
	IActorDao,
	IRepository,
	IRepositoryDao,
	IRepositoryTransactionHistory,
	REPOSITORY_DAO,
	RepositoryId,
	RepositoryTransactionHistory_Id
}                                          from '@airport/holding-pattern'
import {
	DataOrigin,
	IRepositoryTransactionBlock,
	IRepositoryTransactionBlockDao,
	IRepositoryTransactionHistoryUpdateStageDao,
	REPO_TRANS_BLOCK_DAO,
	REPO_TRANS_HISTORY_UPDATE_STAGE_DAO,
	RepositoryTransactionBlockData,
	RepositoryTransactionHistoryUpdateStageValues,
	SHARING_NODE_REPOSITORY_DAO,
	SharingNode_Id
}                                          from '@airport/moving-walkway'
import {
	IApplication,
	IApplicationDao,
	SCHEMA_DAO
}                                          from '@airport/airspace'
import {ITerminal}                         from '@airport/travel-document-checkpoint'
import {SYNC_OUT_REPOSITORY_TRANSACTION_BLOCK_CREATOR} from '../../tokens'

export interface ISyncOutRepositoryTransactionBlockCreator {

	createNewBlocks(
		sharingNodeIds: SharingNode_Id[],
		terminal: ITerminal
	): Promise<Map<SharingNode_Id, IRepositoryTransactionBlock[]>>;

}

export class SyncOutRepositoryTransactionBlockCreator
	implements ISyncOutRepositoryTransactionBlockCreator {

	// Get new repository transaction histories not yet in RepoTransBlocks
	async createNewBlocks(
		sharingNodeIds: SharingNode_Id[],
		terminal: ITerminal
	): Promise<Map<SharingNode_Id, IRepositoryTransactionBlock[]>> {
		const [actorDao, repositoryDao, repositoryTransactionBlockDao,
			      repositoryTransactionHistoryUpdateStageDao, applicationDao,
			      sharingNodeRepositoryDao] = await container(this).get(ACTOR_DAO, REPOSITORY_DAO,
			REPO_TRANS_BLOCK_DAO, REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, SCHEMA_DAO,
			SHARING_NODE_REPOSITORY_DAO)

		const [sharingNodeIdMapByRepositoryId,
			      repoTransHistoriesToSync] = await sharingNodeRepositoryDao
			.findNewRepoTransHistoriesForSharingNodes(sharingNodeIds)

		const repositoryIdSet: Set<RepositoryId>                      = new Set<RepositoryId>()
		const actorIdSet: Set<Actor_Id>                                = new Set<Actor_Id>()
		const repositoryIdsByActorId: Map<Actor_Id, Set<RepositoryId>> = new Map()
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
		                                                              = new Map()

		const applicationVersionIds: Set<ApplicationIndex> = new Set()

		const applicationVersionIdSetsByRepository: Map<RepositoryId, Set<ApplicationVersionId>> = new Map()

		const repositoryTransactionHistoryIds: Set<RepositoryTransactionHistory_Id> = new Set()

		this.gatherIdsForBlockCreation(
			repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet,
			repoTransHistoryMapByRepositoryId, applicationVersionIds, applicationVersionIdSetsByRepository,
			actorIdSet, repositoryIdsByActorId)

		const repositoryTransactionBlocks = await this.createNewBlocksAndSetRepoTransHistoryBlockIds(
			applicationVersionIds, applicationVersionIdSetsByRepository, terminal, repositoryIdSet,
			actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId,
			actorDao, repositoryDao, repositoryTransactionBlockDao,
			repositoryTransactionHistoryUpdateStageDao, applicationDao)

		return this.groupRepoTransBlocksBySharingNode(
			repositoryTransactionBlocks,
			sharingNodeIdMapByRepositoryId
		)
	}

	/*    Every history record is recorded as corresponding application version.
	 * Where does application get used?
	 *    OperationHistory - records which application and version was used for a particular
	 *        operation
	 *    RepositoryApplication - records which applications are used in a repository
	 * Are previous versions of applications needed?
	 *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, application
	 *    upgrades generate their own (not-syncable) transaction history
	 *
	 * So, we need all of the versions used by transaction history records. */
	private gatherIdsForBlockCreation(
		repoTransHistoriesToSync: IRepositoryTransactionHistory[],
		repositoryTransactionHistoryIds: Set<RepositoryTransactionHistory_Id>,
		repositoryIdSet: Set<RepositoryId>,
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>,
		applicationVersionIds: Set<ApplicationIndex>,
		applicationVersionIdSetsByRepository: Map<RepositoryId, Set<ApplicationVersionId>>,
		actorIdSet: Set<Actor_Id>,
		repositoryIdsByActorId: Map<Actor_Id, Set<RepositoryId>>
	) {
		repoTransHistoriesToSync.forEach(
			repoTransHistory => {

				// serialize saveTimestamp
				repoTransHistory.saveTimestamp = <any>repoTransHistory.saveTimestamp.getTime()

				repositoryTransactionHistoryIds.add(repoTransHistory.id)
				const repositoryId = repoTransHistory.repository.id
				repositoryIdSet.add(repoTransHistory.repository.id)

				const repoTransHistoriesForRepositoryId
					      = ensureChildArray(repoTransHistoryMapByRepositoryId, repositoryId)
				repoTransHistoriesForRepositoryId.push(repoTransHistory)

				this.gatherHistoryIds(repoTransHistory, applicationVersionIds, applicationVersionIdSetsByRepository,
					actorIdSet, repositoryIdsByActorId)
			})
	}

	private gatherHistoryIds(
		repoTransHistory: IRepositoryTransactionHistory,
		applicationVersionIds: Set<ApplicationIndex>,
		applicationVersionIdSetsByRepository: Map<RepositoryId, Set<ApplicationVersionId>>,
		actorIdSet: Set<Actor_Id>,
		repositoryIdsByActorId: Map<Actor_Id, Set<RepositoryId>>
	): void {
		const repoTransHistoryActorId = repoTransHistory.actor.id
		actorIdSet.add(repoTransHistoryActorId)

		const repositoryId = repoTransHistory.repository.id

		let repositoryIdsForActorId
			    = ensureChildJsSet(repositoryIdsByActorId, repoTransHistoryActorId)
		repositoryIdsForActorId.add(repositoryId)

		const applicationVersionIdSetForRepo = ensureChildJsSet(
			applicationVersionIdSetsByRepository, repositoryId)

		repoTransHistory.operationHistory.forEach(
			operationHistory => {

				const applicationVersionId = operationHistory.entity.applicationVersion.id
				applicationVersionIds.add(applicationVersionId)
				applicationVersionIdSetForRepo.add(applicationVersionId)

				operationHistory.recordHistory.forEach(
					recordHistory => {
						const recordHistoryActorId = recordHistory.actor.id
						actorIdSet.add(recordHistoryActorId)

						repositoryIdsForActorId
							= ensureChildJsSet(repositoryIdsByActorId, recordHistoryActorId)
						repositoryIdsForActorId.add(repositoryId)
						// actorIdsForRepositoryId.add(recordHistoryActorId);
					})
			})
	}

	/*    Every history record is recorded as corresponding application version.
	 * Where does application get used?
	 *    OperationHistory - records which application and version was used for a particular
	 *        operation
	 *    RepositoryApplication - records which applications are used in a repository
	 * Are previous versions of applications needed?
	 *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, application
	 *    upgrades generate their own (not-syncable) transaction history
	 *
	 * So, we need all of the versions used by transaction history records. */
	private async createNewBlocksAndSetRepoTransHistoryBlockIds(
		applicationVersionIds: Set<ApplicationIndex>,
		applicationVersionIdSetsByRepository: Map<RepositoryId, Set<ApplicationVersionId>>,
		terminal: ITerminal,
		repositoryIdSet: Set<RepositoryId>,
		actorIdSet: Set<Actor_Id>,
		repositoryIdsByActorId: Map<Actor_Id, Set<RepositoryId>>,
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>,
		actorDao: IActorDao,
		repositoryDao: IRepositoryDao,
		repositoryTransactionBlockDao: IRepositoryTransactionBlockDao,
		repositoryTransactionHistoryUpdateStageDao: IRepositoryTransactionHistoryUpdateStageDao,
		applicationDao: IApplicationDao
	): Promise<IRepositoryTransactionBlock[]> {
		const applicationsByRepositoryIdMap = await this.findApplicationsByRepositoryMap(
			applicationVersionIds,
			applicationVersionIdSetsByRepository,
			applicationDao
		)

		const repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>
			      = new Map()

		const repositoryMapById = await repositoryDao.findReposWithGlobalIds(
			Array.from(repositoryIdSet))

		const repositoryTransactionBlocks: IRepositoryTransactionBlock[] = []
		const repoTransBlocksByRepositoryId: Map<RepositoryId, IRepositoryTransactionBlock>
		                                                                 = new Map()

		const repoTransHistoryUpdateStageValuesByBlock: Map<IRepositoryTransactionBlock,
			RepositoryTransactionHistoryUpdateStageValues[]>                                       = new Map()
		const repoTransHistoryUpdateStageValues: RepositoryTransactionHistoryUpdateStageValues[] = []

		for (const [repositoryId, repositoryTransactionHistories]
			of repoTransHistoryMapByRepositoryId) {
			this.createRepositoryTransactionBlockAndStageData(
				repositoryMapById, actorIdSet, repositoryId, repositoryIdsByActorId,
				repositoryTransactionHistories, applicationsByRepositoryIdMap, repoTransBlockDataByRepoId,
				terminal, repositoryTransactionBlocks, repoTransBlocksByRepositoryId,
				repoTransHistoryUpdateStageValues, repoTransHistoryUpdateStageValuesByBlock)
		}

		await this.finishPopulatingRepositoryTransactionBlockData(
			actorIdSet,
			repositoryIdsByActorId,
			repoTransBlockDataByRepoId,
			repoTransBlocksByRepositoryId,
			repositoryTransactionBlocks,
			actorDao,
			repositoryTransactionBlockDao
		)

		await this.setRepositoryTransactionBlockBlockIds(
			repoTransHistoryUpdateStageValuesByBlock,
			repoTransHistoryUpdateStageValues,
			repositoryTransactionHistoryUpdateStageDao)

		return repositoryTransactionBlocks
	}

	private async findApplicationsByRepositoryMap(
		applicationVersionIds: Set<ApplicationIndex>,
		applicationVersionIdSetsByRepository: Map<RepositoryId, Set<ApplicationVersionId>>,
		applicationDao: IApplicationDao
	): Promise<Map<RepositoryId, IApplication[]>> {
		const applicationsByRepositoryIdMap: Map<RepositoryId, IApplication[]>
			      = new Map()

		const applicationMapByVersionId = await applicationDao
			.findMapByVersionIds(Array.from(applicationVersionIds))
		for (const [repositoryId, applicationVersionIdSetForRepo] of applicationVersionIdSetsByRepository) {
			const applicationsForRepository = ensureChildArray(
				applicationsByRepositoryIdMap, repositoryId)
			for (const applicationVersionId of applicationVersionIdSetForRepo) {
				applicationsForRepository.push(applicationMapByVersionId.get(applicationVersionId))
			}
		}

		return applicationsByRepositoryIdMap
	}

	private createRepositoryTransactionBlockAndStageData(
		repositoryMapById: Map<RepositoryId, IRepository>,
		actorIdSet: Set<Actor_Id>,
		repositoryId: RepositoryId,
		repositoryIdsByActorId: Map<Actor_Id, Set<RepositoryId>>,
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		applicationsByRepositoryIdMap: Map<RepositoryId, IApplication[]>,
		repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>,
		terminal: ITerminal,
		repositoryTransactionBlocks: IRepositoryTransactionBlock[],
		repoTransBlocksByRepositoryId: Map<RepositoryId, IRepositoryTransactionBlock>,
		repoTransHistoryUpdateStageValues: RepositoryTransactionHistoryUpdateStageValues[],
		repoTransHistoryUpdateStageValuesByBlock: Map<IRepositoryTransactionBlock,
			RepositoryTransactionHistoryUpdateStageValues[]>
	): IRepositoryTransactionBlock {
		const repository             = repositoryMapById.get(repositoryId)
		const repositoryOwnerActorId = repository.ownerActor.id
		actorIdSet.add(repositoryOwnerActorId)

		let repositoryIdsForActorId
			    = ensureChildJsSet(repositoryIdsByActorId, repositoryOwnerActorId)
		repositoryIdsForActorId.add(repositoryId)

		const repoTransBlockData: RepositoryTransactionBlockData = {
			terminal: {
				id: terminal.id,
				uuId: terminal.uuId,
				owner: {
					uniqueId: terminal.owner.uniqueId
				}
			},
			actors: [],
			repository: repositoryMapById.get(repositoryId),
			repoTransHistories: repositoryTransactionHistories,
			applications: applicationsByRepositoryIdMap.get(repositoryId),
		}
		repoTransBlockDataByRepoId.set(repositoryId, repoTransBlockData)

		const repositoryTransactionBlock: IRepositoryTransactionBlock = {
			source: terminal,
			repository,
			origin: DataOrigin.LOCAL
		}
		repositoryTransactionBlocks.push(repositoryTransactionBlock)
		repoTransBlocksByRepositoryId.set(repositoryId, repositoryTransactionBlock)

		this.createRepoTransHistoryUpdateStageValuesForBlock(
			repositoryTransactionHistories,
			repoTransHistoryUpdateStageValues,
			repoTransHistoryUpdateStageValuesByBlock,
			repositoryTransactionBlock
		)

		return repositoryTransactionBlock
	}

	private createRepoTransHistoryUpdateStageValuesForBlock(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repoTransHistoryUpdateStageValues: RepositoryTransactionHistoryUpdateStageValues[],
		repoTransHistoryUpdateStageValuesByBlock: Map<IRepositoryTransactionBlock,
			RepositoryTransactionHistoryUpdateStageValues[]>,
		repositoryTransactionBlock: IRepositoryTransactionBlock
	): void {
		const repoTransHistoryUpdateStageValuesForBlock:
			      RepositoryTransactionHistoryUpdateStageValues[] = []

		for (const repositoryTransactionHistory of repositoryTransactionHistories) {
			const repoTransHistoryUpdateStageRecordValues
				      : RepositoryTransactionHistoryUpdateStageValues = [
				repositoryTransactionHistory.id,
				null
			]
			repoTransHistoryUpdateStageValuesForBlock.push(repoTransHistoryUpdateStageRecordValues)
			repoTransHistoryUpdateStageValues.push(repoTransHistoryUpdateStageRecordValues)
		}
		repoTransHistoryUpdateStageValuesByBlock.set(repositoryTransactionBlock,
			repoTransHistoryUpdateStageValuesForBlock)
	}

	private async finishPopulatingRepositoryTransactionBlockData(
		actorIdSet: Set<Actor_Id>,
		repositoryIdsByActorId: Map<Actor_Id, Set<RepositoryId>>,
		repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>,
		repoTransBlocksByRepositoryId: Map<RepositoryId, IRepositoryTransactionBlock>,
		repositoryTransactionBlocks: IRepositoryTransactionBlock[],
		actorDao: IActorDao,
		repositoryTransactionBlockDao: IRepositoryTransactionBlockDao
	): Promise<void> {
		const actors = await
			actorDao.findWithDetailsAndGlobalIdsByIds(Array.from(actorIdSet))

		for (const actor of actors) {
			const repositoryIdsForActorId = repositoryIdsByActorId.get(actor.id)
			for (const repositoryId of repositoryIdsForActorId) {
				const repoTransBlockData = repoTransBlockDataByRepoId.get(repositoryId)
				repoTransBlockData.actors.push(actor)
			}
		}

		for (const [repositoryId, repositoryTransactionBlock] of repoTransBlocksByRepositoryId) {
			const repoTransBlockData            = repoTransBlockDataByRepoId.get(repositoryId)
			repositoryTransactionBlock.contents = JSON.stringify(repoTransBlockData)
		}

		await (await repositoryTransactionBlockDao).bulkCreate(
			repositoryTransactionBlocks, false)
	}

	private async setRepositoryTransactionBlockBlockIds(
		repoTransHistoryUpdateStageValuesByBlock: Map<IRepositoryTransactionBlock,
			RepositoryTransactionHistoryUpdateStageValues[]>,
		repoTransHistoryUpdateStageValues: RepositoryTransactionHistoryUpdateStageValues[],
		repositoryTransactionHistoryUpdateStageDao: IRepositoryTransactionHistoryUpdateStageDao
	): Promise<void> {
		for (const [repositoryTransactionBlock, repoTransHistoryUpdateStageValuesForBlock]
			of repoTransHistoryUpdateStageValuesByBlock) {
			repoTransHistoryUpdateStageValuesForBlock.forEach(
				repoTransHistoryUpdateStageValuesRecord =>
					repoTransHistoryUpdateStageValuesRecord[1] = repositoryTransactionBlock.id
			)
		}
		await repositoryTransactionHistoryUpdateStageDao
			.insertValues(repoTransHistoryUpdateStageValues)

		await repositoryTransactionHistoryUpdateStageDao.updateRepositoryTransactionHistory()
		await repositoryTransactionHistoryUpdateStageDao.delete()
	}

	private groupRepoTransBlocksBySharingNode(
		repositoryTransactionBlocks: IRepositoryTransactionBlock[],
		sharingNodeIdMapByRepositoryId: Map<RepositoryId, Set<SharingNode_Id>>
	): Map<SharingNode_Id, IRepositoryTransactionBlock[]> {
		const reposTransHistoryBlockMapBySharingNodeId
			      : Map<SharingNode_Id, IRepositoryTransactionBlock[]> = new Map()

		for (const repositoryTransactionBlock of repositoryTransactionBlocks) {
			const repositoryId     = repositoryTransactionBlock.repository.id
			const sharingNodeIdSet = sharingNodeIdMapByRepositoryId.get(repositoryId)
			for (const sharingNodeId of sharingNodeIdSet) {
				ensureChildArray(reposTransHistoryBlockMapBySharingNodeId, sharingNodeId)
					.push(repositoryTransactionBlock)
			}
		}

		return reposTransHistoryBlockMapBySharingNodeId

	}

}

DI.set(SYNC_OUT_REPOSITORY_TRANSACTION_BLOCK_CREATOR, SyncOutRepositoryTransactionBlockCreator)
