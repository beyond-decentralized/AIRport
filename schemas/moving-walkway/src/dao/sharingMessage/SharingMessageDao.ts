import {AIR_DB}              from '@airport/air-control'
import {TmSharingMessageId}  from '@airport/arrivals-n-departures'
import {DI}                  from '@airport/di'
import {ensureChildArray}    from '@airport/ground-control'
import {
	IRecordHistoryNewValueDao,
	IRecordHistoryOldValueDao,
	IRepositoryTransactionHistoryDao,
	REC_HIST_NEW_VALUE_DAO,
	REC_HIST_OLD_VALUE_DAO,
	REPO_TRANS_HISTORY_DAO
}                            from '@airport/holding-pattern'
import {SharingNodeId}       from '../../ddl/ddl'
import {SHARING_MESSAGE_DAO} from '../../diTokens'
import {
	BaseSharingMessageDao,
	IBaseSharingMessageDao,
	Q,
	QSharingMessage,
}                            from '../../generated/generated'

export interface ISharingMessageDao
	extends IBaseSharingMessageDao {
	/*
		updateSyncStatusByAgtSharingMessageIds(
			syncStatus: SyncStatus,
			agtTerminalSyncLogIds: AgtSharingMessageId[]
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

export class SharingMessageDao
	extends BaseSharingMessageDao
	implements ISharingMessageDao {

	private repoTransHistoryDao: IRepositoryTransactionHistoryDao
	private recHistNewValueDao: IRecordHistoryNewValueDao
	private recHistOldValueDao: IRecordHistoryOldValueDao

	constructor() {
		super()

		DI.get((
			repositoryTransactionHistoryDao,
			recordHistoryNewValueDao,
			recordHistoryOldValueDao
		) => {
			this.repoTransHistoryDao = repositoryTransactionHistoryDao
			this.recHistNewValueDao  = recordHistoryNewValueDao
			this.recHistOldValueDao  = recordHistoryOldValueDao
		}, REPO_TRANS_HISTORY_DAO, REC_HIST_NEW_VALUE_DAO, REC_HIST_OLD_VALUE_DAO)


	}

	/*
	async updateSyncStatusByAgtSharingMessageIds(
		messageSyncStatus: MessageSyncStatus,
		agtTerminalSyncLogIds: AgtSharingMessageId[]
	): Promise<void> {
		let sm: QSharingMessage;
		await this.db.updateWhere({
			update: sm = Q.SharingMessage,
			set: {
				messageSyncStatus
			},
			where: sm.agtTerminalSyncLogId.in(agtTerminalSyncLogIds)
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
					agtTerminalSyncLogId: field({
						from: [
							smrs1 = Q.SharingMessageResponseStage
						],
						select: smrs1.agtTerminalSyncLogId,
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
			      = new Map()

		const airDb = await DI.get(AIR_DB)

		let sm: QSharingMessage
		const data = await airDb.find.sheet({
			from: [
				sm = Q.SharingMessage
			],
			select: [
				sm.sharingNode.id,
				sm.id
			],
			where: sm.sharingNode.id.in(sharingNodeIds)
		})

		for (const record of data) {
			ensureChildArray(sharingMessageIdsBySharingNodeId, record[0])
				.push(record[1])
		}

		return sharingMessageIdsBySharingNodeId
	}

}

DI.set(SHARING_MESSAGE_DAO, SharingMessageDao)
