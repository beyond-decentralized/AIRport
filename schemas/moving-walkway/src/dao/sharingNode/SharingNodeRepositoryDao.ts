import {
	AirportDatabaseToken,
	and,
	distinct,
	IAirportDatabase,
	IQMetadataUtils,
	IUtils,
	UtilsToken,
	Y
}                                      from "@airport/air-control";
import {QMetadataUtilsToken}                from "@airport/air-control";
import {AgtRepositoryId}               from "@airport/arrivals-n-departures";
import {
	IRecordHistory,
	IRecordHistoryNewValueDao,
	IRecordHistoryOldValueDao,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDao,
	QRepository,
	QRepositoryTransactionHistory,
	RecordHistoryId,
	RecordHistoryNewValueDaoToken,
	RecordHistoryOldValueDaoToken,
	RepositoryId,
	RepositoryTransactionHistoryDaoToken,
	RepositoryTransactionHistoryId
}                                      from "@airport/holding-pattern";
import {
	Inject,
	Service
}                                      from "typedi";
import {SharingNodeId}                 from "../../ddl/ddl";
import {
	BaseSharingNodeRepositoryDao,
	ISharingNodeRepository,
	Q,
	QSharingNodeRepository,
}                                      from "../../generated/generated";
import {SharingNodeRepositoryDaoToken} from "../../InjectionTokens";

export interface ISharingNodeRepositoryDao {

	findRepositoryMapBySharingNodeAndRepositoryIds(
		repositoryIds: RepositoryId[],
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, Map<RepositoryId,
		ISharingNodeRepository>>>;

	findBySharingNodeAndAgtRepositoryIds(
		sharingNodeIds: SharingNodeId[],
		agtRepositoryIds: AgtRepositoryId[],
	): Promise<Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>>;

	findNewRepoTransHistoriesForSharingNodes(
		sharingNodeIds: SharingNodeId[]
	): Promise<[Map<RepositoryId, Set<SharingNodeId>>,
		IRepositoryTransactionHistory[]]>;

}

@Service(SharingNodeRepositoryDaoToken)
export class SharingNodeRepositoryDao
	extends BaseSharingNodeRepositoryDao
	implements ISharingNodeRepositoryDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(QMetadataUtilsToken)
		private qMetadataUtils: IQMetadataUtils,
		@Inject(RepositoryTransactionHistoryDaoToken)
		private repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao,
		@Inject(RecordHistoryNewValueDaoToken)
		private recordHistoryNewValueDao: IRecordHistoryNewValueDao,
		@Inject(RecordHistoryOldValueDaoToken)
		private recordHistoryOldValueDao: IRecordHistoryOldValueDao,
		@Inject(UtilsToken)
			utils: IUtils,
	) {
		super(utils);
	}

	async findRepositoryMapBySharingNodeAndRepositoryIds(
		repositoryIds: RepositoryId[],
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, Map<RepositoryId, ISharingNodeRepository>>> {
		const repositoriesBySharingNodeIds: Map<SharingNodeId, Map<RepositoryId,
			ISharingNodeRepository>> = new Map();

		let snr: QSharingNodeRepository;
		let r: QRepository;
		const id = Y;

		const sharingNodeRepos = await this.db.find.tree({
			select: {
				agtRepositoryId: Y,
				repository: {
					id,
					ownerActor: {
						id
					},
					orderedId: Y,
					randomId: Y,
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
		});

		sharingNodeRepos.forEach(
			sharingNodeRepo => {
				this.utils.ensureChildJsMap(repositoriesBySharingNodeIds, sharingNodeRepo.sharingNode.id)
					.set(sharingNodeRepo.repository.id, sharingNodeRepo);
			});

		return repositoriesBySharingNodeIds;
	}

	async findBySharingNodeAndAgtRepositoryIds(
		sharingNodeIds: SharingNodeId[],
		agtRepositoryIds: AgtRepositoryId[],
	): Promise<Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>> {
		const repositoryIdsBySharingNodeAndAgtRepositoryIds
			: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>
			= new Map();

		let snr: QSharingNodeRepository;
		const id = Y;

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
		});

		sharingNodeRepos.forEach(
			sharingNodeRepo => {
				this.utils.ensureChildJsMap(repositoryIdsBySharingNodeAndAgtRepositoryIds,
					sharingNodeRepo.sharingNode.id)
					.set(
						sharingNodeRepo.agtRepositoryId,
						sharingNodeRepo.repository.id);
			});

		return repositoryIdsBySharingNodeAndAgtRepositoryIds;
	}

	async findNewRepoTransHistoriesForSharingNodes(
		sharingNodeIds: SharingNodeId[]
	): Promise<[Map<RepositoryId, Set<SharingNodeId>>,
		IRepositoryTransactionHistory[]]> {
		const sharingNodeIdMapByRepositoryId
			: Map<RepositoryId, Set<SharingNodeId>> = new Map();

		let snr: QSharingNodeRepository = Q.SharingNodeRepository;
		let r: QRepository;
		let rth: QRepositoryTransactionHistory;

		// const dbEntity = this.qMetadataUtils.getDbEntity(snr);
		const sharingNodeIdsWithRepoTransHistoryIds = await this.airportDb.find.sheet({
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
		});

		const repositoryTransactionHistoryIdSet: Set<RepositoryTransactionHistoryId> = new Set();
		for (const sharingNodeIdWithRepoTransHistoryId of sharingNodeIdsWithRepoTransHistoryIds) {
			const sharingNodeId: SharingNodeId = sharingNodeIdWithRepoTransHistoryId[0]
			const repositoryId: RepositoryId = sharingNodeIdWithRepoTransHistoryId[1];
			this.utils.ensureChildJsSet(sharingNodeIdMapByRepositoryId,
				repositoryId)
				.add(sharingNodeId);
			repositoryTransactionHistoryIdSet.add(sharingNodeIdWithRepoTransHistoryId[2]);
		}

		const repositoryTransactionHistories = await this.repositoryTransactionHistoryDao
			.findWhereIdsIn(Array.from(repositoryTransactionHistoryIdSet));

		const recordHistoryIds: RecordHistoryId[] = [];
		const recordHistoryIdSet: Set<RecordHistoryId> = new Set();
		const recordHistoryMapById: Map<RecordHistoryId, IRecordHistory> = new Map();

		for (const repoTransHistory of repositoryTransactionHistories) {
			for (const operationHistory of repoTransHistory.operationHistory) {
				for (const recordHistory of operationHistory.recordHistory) {
					recordHistory.newValues = [];
					recordHistory.oldValues = [];
					const recordHistoryId = recordHistory.id;
					recordHistoryIdSet.add(recordHistoryId);
					recordHistoryMapById.set(recordHistoryId, recordHistory);
				}
			}
		}

		const oldValues
			= await this.recordHistoryOldValueDao.findByRecordHistoryIdIn(recordHistoryIds);
		for (const oldValue of oldValues) {
			const recordHistoryId = oldValue.recordHistory.id;
			recordHistoryMapById.get(recordHistoryId).oldValues.push(oldValue);
		}

		const newValues
			= await this.recordHistoryNewValueDao.findByRecordHistoryIdIn(recordHistoryIds);
		for (const newValue of newValues) {
			const recordHistoryId = newValue.recordHistory.id;
			recordHistoryMapById.get(recordHistoryId).newValues.push(newValue);
		}

		return [sharingNodeIdMapByRepositoryId, repositoryTransactionHistories];
	}

}