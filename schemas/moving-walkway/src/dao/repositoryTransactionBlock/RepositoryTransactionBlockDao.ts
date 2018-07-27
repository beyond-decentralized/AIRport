import {
	and,
	distinct,
	field,
	IUtils,
	not,
	UtilsToken
}                                       from "@airport/air-control";
import {TmRepositoryTransactionBlockId} from "@airport/arrivals-n-departures";
import {
	Inject,
	Service
}                                       from "typedi";
import {
	MissingRecordId,
	MissingRecordStatus
}                                       from "../../ddl/ddl";
import {IRepositoryTransactionBlockDmo} from "../../dmo/repositoryTransactionBlock/RepositoryTransactionBlockDmo";
import {
	BaseRepositoryTransactionBlockDao,
	IBaseRepositoryTransactionBlockDao,
	IRepositoryTransactionBlock,
	ISharingMessage,
	Q,
	QMissingRecord,
	QMissingRecordRepoTransBlock,
	QRepositoryTransactionBlock,
	QRepoTransBlockResponseStage,
} from "../../generated/generated";
import {
	RepositoryTransactionBlockDaoToken,
	RepositoryTransactionBlockDmoToken
}                                       from "../../InjectionTokens";

export interface IRepositoryTransactionBlockDao
	extends IBaseRepositoryTransactionBlockDao {

	updateFromResponseStage( //
	): Promise<number>;

	findWithMissingRecordIdsAndNoMissingRecordsWithStatus(
		missingRecordIds: MissingRecordId[],
		status: MissingRecordStatus
	): Promise<IRepositoryTransactionBlock[]>;

	clearContentsWhereIdsIn(
		repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]
	): Promise<void>;

}

@Service(RepositoryTransactionBlockDaoToken)
export class RepositoryTransactionBlockDao
	extends BaseRepositoryTransactionBlockDao
	implements IRepositoryTransactionBlockDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils,
		@Inject(RepositoryTransactionBlockDmoToken)
		private dmo: IRepositoryTransactionBlockDmo
	) {
		super(utils);
	}

	async updateFromResponseStage( //
	): Promise<number> {
		let rtb: QRepositoryTransactionBlock;
		// let rtbrs1: QRepoTransBlockResponseStage;
		let rtbrs2: QRepoTransBlockResponseStage;
		return await this.db.updateWhere({
			update: rtb = Q.RepositoryTransactionBlock,
			set: {
				// agtSyncRecordId: field({
				// 	from: [
				// 		rtbrs1 = Q.RepoTransBlockResponseStage
				// 	],
				// 	select: rtbrs1.agtSyncRecordId,
				// 	where: rtbrs1.id.equals(rtb.id)
				// }),
				syncOutcomeType: field({
					from: [
						rtbrs2 = Q.RepoTransBlockResponseStage
					],
					select: rtbrs2.syncOutcomeType,
					where: rtbrs2.id.equals(rtb.id)
				})
			}
		});
	}

	async findWithMissingRecordIdsAndNoMissingRecordsWithStatus(
		missingRecordIds: MissingRecordId[],
		status: MissingRecordStatus
	): Promise<IRepositoryTransactionBlock[]> {
		let rtb: QRepositoryTransactionBlock,
			mrrtb: QMissingRecordRepoTransBlock,
			mr: QMissingRecord;
		return await this.db.find.tree({
			select: distinct({}),
			from: [
				rtb = Q.RepositoryTransactionBlock,
				mrrtb = rtb.missingRecordRepoTransBlocks.innerJoin(),
				mr = mrrtb.missingRecord.innerJoin()
			],
			where: and(
				mr.id.in(missingRecordIds),
				not(mr.status.equals(status))
			)
		});
	}

	async clearContentsWhereIdsIn(
		repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]
	): Promise<void> {
		const rtb: QRepositoryTransactionBlock = Q.QRepositoryTransactionBlock;
		await this.db.updateWhere({
			update: rtb,
			set: {
				contents: null
			},
			where: rtb.id.in(repositoryTransactionBlockIds)
		});
	}

}
