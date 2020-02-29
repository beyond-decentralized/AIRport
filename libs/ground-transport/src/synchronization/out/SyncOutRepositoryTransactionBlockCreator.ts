import {container, DI}                                from '@airport/di'
import {
	CascadeOverwrite,
	ensureChildArray,
	ensureChildJsSet,
	SchemaIndex,
	SchemaVersionId
}                                          from '@airport/ground-control'
import {
	ACTOR_DAO,
	ActorId,
	IActorDao,
	IRepository,
	IRepositoryDao,
	IRepositoryTransactionHistory,
	REPOSITORY_DAO,
	RepositoryId,
	RepositoryTransactionHistoryId
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
	SharingNodeId
}                                          from '@airport/moving-walkway'
import {
	ISchema,
	ISchemaDao,
	SCHEMA_DAO
}                                          from '@airport/traffic-pattern'
import {ITerminal}                         from '@airport/travel-document-checkpoint'
import {SYNC_OUT_REPO_TRANS_BLOCK_CREATOR} from '../../tokens'

export interface ISyncOutRepositoryTransactionBlockCreator {

	createNewBlocks(
		sharingNodeIds: SharingNodeId[],
		terminal: ITerminal
	): Promise<Map<SharingNodeId, IRepositoryTransactionBlock[]>>;

}

export class SyncOutRepositoryTransactionBlockCreator
	implements ISyncOutRepositoryTransactionBlockCreator {

	// Get new repository transaction histories not yet in RepoTransBlocks
	async createNewBlocks(
		sharingNodeIds: SharingNodeId[],
		terminal: ITerminal
	): Promise<Map<SharingNodeId, IRepositoryTransactionBlock[]>> {
		const [actorDao, repositoryDao, repositoryTransactionBlockDao,
			      repositoryTransactionHistoryUpdateStageDao, schemaDao,
			      sharingNodeRepositoryDao] = await container(this).get(ACTOR_DAO, REPOSITORY_DAO,
			REPO_TRANS_BLOCK_DAO, REPO_TRANS_HISTORY_UPDATE_STAGE_DAO, SCHEMA_DAO,
			SHARING_NODE_REPOSITORY_DAO)

		const [sharingNodeIdMapByRepositoryId,
			      repoTransHistoriesToSync] = await sharingNodeRepositoryDao
			.findNewRepoTransHistoriesForSharingNodes(sharingNodeIds)

		const repositoryIdSet: Set<RepositoryId>                      = new Set<RepositoryId>()
		const actorIdSet: Set<ActorId>                                = new Set<ActorId>()
		const repositoryIdsByActorId: Map<ActorId, Set<RepositoryId>> = new Map()
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
		                                                              = new Map()

		const schemaVersionIds: Set<SchemaIndex> = new Set()

		const schemaVersionIdSetsByRepository: Map<RepositoryId, Set<SchemaVersionId>> = new Map()

		const repositoryTransactionHistoryIds: Set<RepositoryTransactionHistoryId> = new Set()

		this.gatherIdsForBlockCreation(
			repoTransHistoriesToSync, repositoryTransactionHistoryIds, repositoryIdSet,
			repoTransHistoryMapByRepositoryId, schemaVersionIds, schemaVersionIdSetsByRepository,
			actorIdSet, repositoryIdsByActorId)

		const repositoryTransactionBlocks = await this.createNewBlocksAndSetRepoTransHistoryBlockIds(
			schemaVersionIds, schemaVersionIdSetsByRepository, terminal, repositoryIdSet,
			actorIdSet, repositoryIdsByActorId, repoTransHistoryMapByRepositoryId,
			actorDao, repositoryDao, repositoryTransactionBlockDao,
			repositoryTransactionHistoryUpdateStageDao, schemaDao)

		return this.groupRepoTransBlocksBySharingNode(
			repositoryTransactionBlocks,
			sharingNodeIdMapByRepositoryId
		)
	}

	/*    Every history record is recorded as corresponding schema version.
	 * Where does schema get used?
	 *    OperationHistory - records which schema and version was used for a particular
	 *        operation
	 *    RepositorySchema - records which schemas are used in a repository
	 * Are previous versions of schemas needed?
	 *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, schema
	 *    upgrades generate their own (not-syncable) transaction history
	 *
	 * So, we need all of the versions used by transaction history records. */
	private gatherIdsForBlockCreation(
		repoTransHistoriesToSync: IRepositoryTransactionHistory[],
		repositoryTransactionHistoryIds: Set<RepositoryTransactionHistoryId>,
		repositoryIdSet: Set<RepositoryId>,
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>,
		schemaVersionIds: Set<SchemaIndex>,
		schemaVersionIdSetsByRepository: Map<RepositoryId, Set<SchemaVersionId>>,
		actorIdSet: Set<ActorId>,
		repositoryIdsByActorId: Map<ActorId, Set<RepositoryId>>
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

				this.gatherHistoryIds(repoTransHistory, schemaVersionIds, schemaVersionIdSetsByRepository,
					actorIdSet, repositoryIdsByActorId)
			})
	}

	private gatherHistoryIds(
		repoTransHistory: IRepositoryTransactionHistory,
		schemaVersionIds: Set<SchemaIndex>,
		schemaVersionIdSetsByRepository: Map<RepositoryId, Set<SchemaVersionId>>,
		actorIdSet: Set<ActorId>,
		repositoryIdsByActorId: Map<ActorId, Set<RepositoryId>>
	): void {
		const repoTransHistoryActorId = repoTransHistory.actor.id
		actorIdSet.add(repoTransHistoryActorId)

		const repositoryId = repoTransHistory.repository.id

		let repositoryIdsForActorId
			    = ensureChildJsSet(repositoryIdsByActorId, repoTransHistoryActorId)
		repositoryIdsForActorId.add(repositoryId)

		const schemaVersionIdSetForRepo = ensureChildJsSet(
			schemaVersionIdSetsByRepository, repositoryId)

		repoTransHistory.operationHistory.forEach(
			operationHistory => {

				const schemaVersionId = operationHistory.entity.schemaVersion.id
				schemaVersionIds.add(schemaVersionId)
				schemaVersionIdSetForRepo.add(schemaVersionId)

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

	/*    Every history record is recorded as corresponding schema version.
	 * Where does schema get used?
	 *    OperationHistory - records which schema and version was used for a particular
	 *        operation
	 *    RepositorySchema - records which schemas are used in a repository
	 * Are previous versions of schemas needed?
	 *    Receiving outdated RepoTransBlocks - transaction history does not get upgraded, schema
	 *    upgrades generate their own (not-syncable) transaction history
	 *
	 * So, we need all of the versions used by transaction history records. */
	private async createNewBlocksAndSetRepoTransHistoryBlockIds(
		schemaVersionIds: Set<SchemaIndex>,
		schemaVersionIdSetsByRepository: Map<RepositoryId, Set<SchemaVersionId>>,
		terminal: ITerminal,
		repositoryIdSet: Set<RepositoryId>,
		actorIdSet: Set<ActorId>,
		repositoryIdsByActorId: Map<ActorId, Set<RepositoryId>>,
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>,
		actorDao: IActorDao,
		repositoryDao: IRepositoryDao,
		repositoryTransactionBlockDao: IRepositoryTransactionBlockDao,
		repositoryTransactionHistoryUpdateStageDao: IRepositoryTransactionHistoryUpdateStageDao,
		schemaDao: ISchemaDao
	): Promise<IRepositoryTransactionBlock[]> {
		const schemasByRepositoryIdMap = await this.findSchemasByRepositoryMap(
			schemaVersionIds,
			schemaVersionIdSetsByRepository,
			schemaDao
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
				repositoryTransactionHistories, schemasByRepositoryIdMap, repoTransBlockDataByRepoId,
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

	private async findSchemasByRepositoryMap(
		schemaVersionIds: Set<SchemaIndex>,
		schemaVersionIdSetsByRepository: Map<RepositoryId, Set<SchemaVersionId>>,
		schemaDao: ISchemaDao
	): Promise<Map<RepositoryId, ISchema[]>> {
		const schemasByRepositoryIdMap: Map<RepositoryId, ISchema[]>
			      = new Map()

		const schemaMapByVersionId = await schemaDao
			.findMapByVersionIds(Array.from(schemaVersionIds))
		for (const [repositoryId, schemaVersionIdSetForRepo] of schemaVersionIdSetsByRepository) {
			const schemasForRepository = ensureChildArray(
				schemasByRepositoryIdMap, repositoryId)
			for (const schemaVersionId of schemaVersionIdSetForRepo) {
				schemasForRepository.push(schemaMapByVersionId.get(schemaVersionId))
			}
		}

		return schemasByRepositoryIdMap
	}

	private createRepositoryTransactionBlockAndStageData(
		repositoryMapById: Map<RepositoryId, IRepository>,
		actorIdSet: Set<ActorId>,
		repositoryId: RepositoryId,
		repositoryIdsByActorId: Map<ActorId, Set<RepositoryId>>,
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		schemasByRepositoryIdMap: Map<RepositoryId, ISchema[]>,
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
				name: terminal.name,
				secondId: terminal.secondId,
				owner: {
					uniqueId: terminal.owner.uniqueId
				}
			},
			actors: [],
			repository: repositoryMapById.get(repositoryId),
			repoTransHistories: repositoryTransactionHistories,
			schemas: schemasByRepositoryIdMap.get(repositoryId),
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
		actorIdSet: Set<ActorId>,
		repositoryIdsByActorId: Map<ActorId, Set<RepositoryId>>,
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
			repositoryTransactionBlocks, CascadeOverwrite.DEFAULT, false)
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
		sharingNodeIdMapByRepositoryId: Map<RepositoryId, Set<SharingNodeId>>
	): Map<SharingNodeId, IRepositoryTransactionBlock[]> {
		const reposTransHistoryBlockMapBySharingNodeId
			      : Map<SharingNodeId, IRepositoryTransactionBlock[]> = new Map()

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

DI.set(SYNC_OUT_REPO_TRANS_BLOCK_CREATOR, SyncOutRepositoryTransactionBlockCreator)
