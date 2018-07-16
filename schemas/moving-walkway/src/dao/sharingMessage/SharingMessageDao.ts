import {
	AirportDatabaseToken,
	and,
	distinct,
	field,
	IAirportDatabase,
	IUtils,
	UtilsToken
} from "@airport/air-control";
import {AgtSharingMessageId, TmSharingMessageId} from "@airport/arrivals-n-departures";
import {
	IRecordHistoryNewValueDao,
	IRecordHistoryOldValueDao,
	IRepositoryTransactionHistoryDao,
	RecordHistoryNewValueDaoToken,
	RecordHistoryOldValueDaoToken,
	RepositoryTransactionHistoryDaoToken
} from "@airport/holding-pattern";
import {Service} from "typedi";
import {Inject} from "typedi/decorators/Inject";
import {MissingRecordId, MissingRecordStatus, SharingNodeId} from "../../ddl/ddl";
import {
	BaseSharingMessageDao,
	IBaseSharingMessageDao,
	ISharingMessage,
	Q,
	QMissingRecord,
	QSharingMessage,
} from "../../generated/generated";
import {SharingMessageDaoToken} from "../../InjectionTokens";

export interface ISharingMessageDao
	extends IBaseSharingMessageDao {
/*
	updateSyncStatusByAgtSharingMessageIds(
		syncStatus: SyncStatus,
		agtDatabaseSyncLogIds: AgtSharingMessageId[]
	): Promise<void>;

	updateSyncStatusByIds(
		tmSharingMessageIds: TmSharingMessageId[]
	): Promise<void>;
*/

	// updateFromResponseStage( //
	// ): Promise<number>;

	findAllSyncedSharingMessageIdsForSharingNodes(
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, TmSharingMessageId[]>>;

}

@Service(SharingMessageDaoToken)
export class SharingMessageDao
	extends BaseSharingMessageDao
	implements ISharingMessageDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(RepositoryTransactionHistoryDaoToken)
		private repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao,
		@Inject(RecordHistoryNewValueDaoToken)
		private recordHistoryNewValueDao: IRecordHistoryNewValueDao,
		@Inject(RecordHistoryOldValueDaoToken)
		private recordHistoryOldValueDao: IRecordHistoryOldValueDao,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	/*
	async updateSyncStatusByAgtSharingMessageIds(
		messageSyncStatus: MessageSyncStatus,
		agtDatabaseSyncLogIds: AgtSharingMessageId[]
	): Promise<void> {
		let sm: QSharingMessage;
		await this.db.updateWhere({
			update: sm = Q.SharingMessage,
			set: {
				messageSyncStatus
			},
			where: sm.agtDatabaseSyncLogId.in(agtDatabaseSyncLogIds)
		});
	}
*/
/*
	async updateFromResponseStage( //
	): Promise<number> {
		let sm: QSharingMessage;
		let smrs1: QSharingMessageResponseStage;
		let smrs2: QSharingMessageResponseStage;
		return await this.db.updateWhere({
			update: sm = Q.SharingMessage,
			set: {
				agtDatabaseSyncLogId: field({
					from: [
						smrs1 = Q.SharingMessageResponseStage
					],
					select: smrs1.agtDatabaseSyncLogId,
					where: smrs1.id.equals(sm.id)
				}),
				syncStatus: SyncStatus.SYNCHRONIZED,
				syncTimestamp: field({
					from: [
						smrs2 = Q.SharingMessageResponseStage
					],
					select: smrs2.syncTimestamp,
					where: smrs2.id.equals(sm.id)
				})
			}
		});
	}*/

	async findAllSyncedSharingMessageIdsForSharingNodes(
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, TmSharingMessageId[]>> {
		const sharingMessageIdsBySharingNodeId: Map<SharingNodeId, TmSharingMessageId[]>
			= new Map();

		let sm: QSharingMessage;
		const data = await this.airportDb.find.sheet({
			from: [
				sm = Q.SharingMessage
			],
			select: [
				sm.sharingNode.id,
				sm.id
			],
			where: sm.sharingNode.id.in(sharingNodeIds)
		});

		for (const record of data) {
			this.utils.ensureChildArray(sharingMessageIdsBySharingNodeId, record[0])
				.push(record[1]);
		}

		return sharingMessageIdsBySharingNodeId;
	}

}