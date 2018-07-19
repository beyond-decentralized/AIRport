import {field} from "@airport/air-control";
import {and} from "@airport/air-control/lib/impl/core/operation/LogicalOperation";
import {AirportDatabaseToken, UtilsToken} from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase} from "@airport/air-control/lib/lingo/AirportDatabase";
import {IUtils} from "@airport/air-control/lib/lingo/utils/Utils";
import {
	RepoTransBlockSyncOutcomeType,
	TmRepositoryTransactionBlockId
} from "@airport/arrivals-n-departures";
import {BlockSyncStatus} from "@airport/ground-control";
import {Inject} from "typedi/decorators/Inject";
import {Service} from "typedi/decorators/Service";
import {SharingNodeId} from "../../ddl/ddl";
import {SharingMessageSyncTimestamp} from "../../ddl/sharingMessage/SharingMessage";
import {DataOrigin} from "../../ddl/values/DataOrigin";
import {
	BaseSharingNodeRepoTransBlockDao,
	IBaseSharingNodeRepoTransBlockDao,
	ISharingNodeRepoTransBlock,
	Q,
	QSharingNodeRepoTransBlock,
	QSharingNodeRepoTransBlockStage,
} from "../../generated/generated";
import {SharingNodeRepoTransBlockDaoToken} from "../../InjectionTokens";

export type SharingNodeRepoTransBlockValues = [
	SharingNodeId,
	TmRepositoryTransactionBlockId,
	SharingMessageSyncTimestamp,
	RepoTransBlockSyncOutcomeType,
	DataOrigin,
	BlockSyncStatus
	];


export interface RepoTransBlocksForSharingNodes {
	repositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId>;
	repoTransBlocksBySharingNodeId
		: Map<SharingNodeId, TmRepositoryTransactionBlockId[]>;
}

export interface ISharingNodeRepoTransBlockDao
	extends IBaseSharingNodeRepoTransBlockDao {

	findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(
		sharingNodeIds: SharingNodeId[],
		repoTransBlockIds: TmRepositoryTransactionBlockId[]
	): Promise<Map<SharingNodeId,
		Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>>;

	updateFromResponseStage( //
	): Promise<number>;

	updateBlockSyncStatus(
		sharingNodeIds: SharingNodeId[],
		repoTransBlockIds: TmRepositoryTransactionBlockId[],
		existingBlockSyncStatus: BlockSyncStatus,
		newBlockSyncStatus: BlockSyncStatus
	): Promise<void>;

	insertValues(
		values: SharingNodeRepoTransBlockValues[]
	): Promise<number>;

	getForSharingNodeIdsAndBlockStatus(
		sharingNodeIds: SharingNodeId[],
		blockSyncStatus: BlockSyncStatus
	): Promise<RepoTransBlocksForSharingNodes>;

}

@Service(SharingNodeRepoTransBlockDaoToken)
export class SharingNodeRepoTransBlockDao
	extends BaseSharingNodeRepoTransBlockDao
	implements ISharingNodeRepoTransBlockDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(
		sharingNodeIds: SharingNodeId[],
		repoTransBlockIds: TmRepositoryTransactionBlockId[]
	): Promise<Map<SharingNodeId,
		Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>> {
		const mapBySharingNodeId: Map<SharingNodeId,
			Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>> = new Map();

		let snrtb: QSharingNodeRepoTransBlock;
		const records = await this.db.find.tree({
			select: {},
			from: [
				snrtb = Q.SharingNodeRepoTransBlock
			],
			where: and(
				snrtb.sharingNode.id.in(sharingNodeIds),
				snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds)
			)
		});

		for (const record of records) {
			this.utils.ensureChildJsMap(mapBySharingNodeId, record.sharingNode.id)
				.set(record.repositoryTransactionBlock.id, record);
		}

		return mapBySharingNodeId;
	}

	async updateFromResponseStage( //
	): Promise<number> {
		let snrtb: QSharingNodeRepoTransBlock;
		let snrtbs: QSharingNodeRepoTransBlockStage;
		return await this.db.updateWhere({
			update: snrtb = Q.SharingNodeRepoTransBlock,
			set: {
				syncOutcomeType: field({
					from: [
						snrtbs = Q.SharingNodeRepoTransBlockStage
					],
					select: snrtbs.syncOutcomeType,
					where: and(
						snrtbs.sharingNodeId.equals(snrtb.sharingNode.id),
						snrtbs.repositoryTransactionBlockId.equals(snrtb.repositoryTransactionBlock.id)
					)
				})
			}
		});
	}

	async updateBlockSyncStatus(
		sharingNodeIds: SharingNodeId[],
		repoTransBlockIds: TmRepositoryTransactionBlockId[],
		existingBlockSyncStatus: BlockSyncStatus,
		newBlockSyncStatus: BlockSyncStatus
	): Promise<void> {
		let snrtb: QSharingNodeRepoTransBlock;
		await this.db.updateWhere({
			update: snrtb = Q.SharingNodeRepoTransBlock,
			set: {
				blockSyncStatus: newBlockSyncStatus
			},
			where: and(
				snrtb.blockSyncStatus.equals(existingBlockSyncStatus),
				snrtb.sharingNode.id.in(sharingNodeIds),
				snrtb.repositoryTransactionBlock.id.in(repoTransBlockIds)
			)
		});
	}

	async insertValues(
		values: SharingNodeRepoTransBlockValues[]
	): Promise<number> {
		const dbEntity = Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlock;

		let snrtb: QSharingNodeRepoTransBlock;

		return await this.airportDb.db.insertValues(dbEntity, {
			insertInto: snrtb = Q.SharingNodeRepoTransBlock,
			columns: [
				snrtb.sharingNode.id,
				snrtb.repositoryTransactionBlock.id,
				snrtb.syncTimestamp,
				snrtb.syncOutcomeType,
				snrtb.origin,
				snrtb.blockSyncStatus
			],
			values
		});

	}

	async getForSharingNodeIdsAndBlockStatus(
		sharingNodeIds: SharingNodeId[],
		blockSyncStatus: BlockSyncStatus
	): Promise<RepoTransBlocksForSharingNodes> {
		const repoTransBlocksBySharingNodeId
			: Map<SharingNodeId, TmRepositoryTransactionBlockId[]> = new Map();
		const repositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId> = new Set();

		let snrtb: QSharingNodeRepoTransBlock;

		const records = await this.airportDb.find.sheet({
				from: [
					snrtb = Q.SharingNodeRepoTransBlock,
				],
				select: [
					snrtb.sharingNode.id,
					snrtb.repositoryTransactionBlock.id
				],
				where: and(
					snrtb.blockSyncStatus.equals(blockSyncStatus),
					snrtb.sharingNode.id.in(sharingNodeIds)
				)
			})
		;

		for (const record of records) {
			const sharingNodeRepoTransBlockId = record[1];
			this.utils.ensureChildArray(repoTransBlocksBySharingNodeId, record[0])
				.push(sharingNodeRepoTransBlockId);
			repositoryTransactionBlockIds.add(sharingNodeRepoTransBlockId);
		}

		return {
			repositoryTransactionBlockIds,
			repoTransBlocksBySharingNodeId
		};
	}

}