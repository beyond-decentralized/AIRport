import {
	AIRPORT_DATABASE,
	and,
	distinct,
	IQMetadataUtils,
	Q_METADATA_UTILS,
	Y
}                                    from '@airport/air-control'
import {AgtRepositoryId}             from '@airport/arrivals-n-departures'
import {container, DI}                          from '@airport/di'
import {
	ensureChildJsMap,
	ensureChildJsSet
}                                    from '@airport/ground-control'
import {
	IRecordHistory,
	IRecordHistoryNewValueDao,
	IRecordHistoryOldValueDao,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDao,
	QRepository,
	QRepositoryTransactionHistory,
	REC_HIST_NEW_VALUE_DAO,
	REC_HIST_OLD_VALUE_DAO,
	RecordHistoryId,
	REPO_TRANS_HISTORY_DAO,
	Repository_Id,
	RepositoryTransactionHistory_Id
}                                    from '@airport/holding-pattern'
import {SharingNode_Id}               from '../../ddl/ddl'
import {SHARING_NODE_REPOSITORY_DAO} from '../../tokens'
import {
	BaseSharingNodeRepositoryDao,
	ISharingNodeRepository,
	Q,
	QSharingNodeRepository,
}                                    from '../../generated/generated'

export interface ISharingNodeRepositoryDao {

	findRepositoryMapBySharingNodeAndRepositoryIds(
		repositoryIds: Repository_Id[],
		sharingNodeIds: SharingNode_Id[]
	): Promise<Map<SharingNode_Id, Map<Repository_Id,
		ISharingNodeRepository>>>;

	findBySharingNodeAndAgtRepositoryIds(
		sharingNodeIds: SharingNode_Id[],
		agtRepositoryIds: AgtRepositoryId[],
	): Promise<Map<SharingNode_Id, Map<AgtRepositoryId, Repository_Id>>>;

	findNewRepoTransHistoriesForSharingNodes(
		sharingNodeIds: SharingNode_Id[]
	): Promise<[Map<Repository_Id, Set<SharingNode_Id>>,
		IRepositoryTransactionHistory[]]>;

}

export class SharingNodeRepositoryDao
	extends BaseSharingNodeRepositoryDao
	implements ISharingNodeRepositoryDao {

	async findRepositoryMapBySharingNodeAndRepositoryIds(
		repositoryIds: Repository_Id[],
		sharingNodeIds: SharingNode_Id[]
	): Promise<Map<SharingNode_Id, Map<Repository_Id, ISharingNodeRepository>>> {
		const repositoriesBySharingNodeIds: Map<SharingNode_Id, Map<Repository_Id,
			ISharingNodeRepository>> = new Map()

		let snr: QSharingNodeRepository
		let r: QRepository
		const id = Y

		const sharingNodeRepos = await this.db.find.tree({
			select: {
				agtRepositoryId: Y,
				repository: {
					id,
					ownerActor: {
						id
					},
					createdAt: Y,
					uuId: Y,
				},
				sharingNode: {
					id,
				},
			},
			from: [
				snr = Q.SharingNodeRepository,
				r = snr.repository.innerJoin()
			],
			where: and(
				snr.repository.id.in(repositoryIds),
				snr.sharingNode.id.in(sharingNodeIds)
			)
		})

		sharingNodeRepos.forEach(
			sharingNodeRepo => {
				ensureChildJsMap(repositoriesBySharingNodeIds, sharingNodeRepo.sharingNode.id)
					.set(sharingNodeRepo.repository.id, sharingNodeRepo)
			})

		return repositoriesBySharingNodeIds
	}

	async findBySharingNodeAndAgtRepositoryIds(
		sharingNodeIds: SharingNode_Id[],
		agtRepositoryIds: AgtRepositoryId[],
	): Promise<Map<SharingNode_Id, Map<AgtRepositoryId, Repository_Id>>> {
		const repositoryIdsBySharingNodeAndAgtRepositoryIds
			      : Map<SharingNode_Id, Map<AgtRepositoryId, Repository_Id>>
			      = new Map()

		let snr: QSharingNodeRepository
		const id = Y

		const sharingNodeRepos = await this.db.find.tree({
			select: {
				agtRepositoryId: Y,
				repository: {
					id,
				},
				sharingNode: {
					id,
				},
			},
			from: [
				snr = Q.SharingNodeRepository,
			],
			where: and(
				snr.sharingNode.id.in(sharingNodeIds),
				snr.agtRepositoryId.in(agtRepositoryIds),
			)
		})

		sharingNodeRepos.forEach(
			sharingNodeRepo => {
				ensureChildJsMap(repositoryIdsBySharingNodeAndAgtRepositoryIds,
					sharingNodeRepo.sharingNode.id)
					.set(
						sharingNodeRepo.agtRepositoryId,
						sharingNodeRepo.repository.id)
			})

		return repositoryIdsBySharingNodeAndAgtRepositoryIds
	}

	async findNewRepoTransHistoriesForSharingNodes(
		sharingNodeIds: SharingNode_Id[]
	): Promise<[Map<Repository_Id, Set<SharingNode_Id>>,
		IRepositoryTransactionHistory[]]> {
		const sharingNodeIdMapByRepositoryId
			      : Map<Repository_Id, Set<SharingNode_Id>> = new Map()

		const airDb = await container(this).get(AIRPORT_DATABASE)

		let snr: QSharingNodeRepository = Q.SharingNodeRepository
		let r: QRepository
		let rth: QRepositoryTransactionHistory

		// const dbEntity = this.qMetadataUtils.getDbEntity(snr);
		const sharingNodeIdsWithRepoTransHistoryIds = await airDb.find.sheet({
			from: [
				snr,
				r = snr.repository.innerJoin(),
				rth = r.repositoryTransactionHistory.innerJoin(),
			],
			select: distinct([
				snr.sharingNode.id,
				r.id,
				rth.id
			]),
			where: and(
				snr.sharingNode.id.in(sharingNodeIds),
				rth.blockId.isNull()
			)
		})

		const repositoryTransactionHistoryIdSet: Set<RepositoryTransactionHistory_Id> = new Set()
		for (const sharingNodeIdWithRepoTransHistoryId of sharingNodeIdsWithRepoTransHistoryIds) {
			const sharingNodeId: SharingNode_Id = sharingNodeIdWithRepoTransHistoryId[0]
			const repositoryId: Repository_Id   = sharingNodeIdWithRepoTransHistoryId[1]
			ensureChildJsSet(sharingNodeIdMapByRepositoryId,
				repositoryId)
				.add(sharingNodeId)
			repositoryTransactionHistoryIdSet.add(sharingNodeIdWithRepoTransHistoryId[2])
		}

		const [recHistNewValueDao, recHistOldValueDao,
			      repoTransHistoryDao] = await container(this).get(
			REC_HIST_NEW_VALUE_DAO, REC_HIST_OLD_VALUE_DAO,
			REPO_TRANS_HISTORY_DAO)
		const repositoryTransactionHistories = await repoTransHistoryDao
			.findWhereIdsIn(Array.from(repositoryTransactionHistoryIdSet))

		const recordHistoryIds: RecordHistoryId[]                        = []
		const recordHistoryIdSet: Set<RecordHistoryId>                   = new Set()
		const recordHistoryMapById: Map<RecordHistoryId, IRecordHistory> = new Map()

		for (const repoTransHistory of repositoryTransactionHistories) {
			for (const operationHistory of repoTransHistory.operationHistory) {
				for (const recordHistory of operationHistory.recordHistory) {
					recordHistory.newValues = []
					recordHistory.oldValues = []
					const recordHistoryId   = recordHistory.id
					recordHistoryIdSet.add(recordHistoryId)
					recordHistoryMapById.set(recordHistoryId, recordHistory)
				}
			}
		}

		const oldValues
			      = await recHistOldValueDao.findByRecordHistoryIdIn(recordHistoryIds)
		for (const oldValue of oldValues) {
			const recordHistoryId = oldValue.recordHistory.id
			recordHistoryMapById.get(recordHistoryId).oldValues.push(oldValue)
		}

		const newValues
			      = await recHistNewValueDao.findByRecordHistoryIdIn(recordHistoryIds)
		for (const newValue of newValues) {
			const recordHistoryId = newValue.recordHistory.id
			recordHistoryMapById.get(recordHistoryId).newValues.push(newValue)
		}

		return [sharingNodeIdMapByRepositoryId, repositoryTransactionHistories]
	}

}

DI.set(SHARING_NODE_REPOSITORY_DAO, SharingNodeRepositoryDao)
