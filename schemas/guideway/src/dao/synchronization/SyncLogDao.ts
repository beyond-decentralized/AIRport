import {
	AirportDatabaseToken,
	and,
	IAirportDatabase,
	IUtils,
	max,
	min,
	tree
}                        from "@airport/air-control";
import {UtilsToken}      from "@airport/air-control/lib/InjectionTokens";
import {
	AgtRepositoryId,
	AgtSharingMessageId,
	TerminalId,
}                     from "@airport/arrivals-n-departures";
import {
	Inject,
	Service
}                     from "typedi";
import {
	AgtRepositoryTransactionBlockAddDatetime,
	AgtRepositoryTransactionBlockId,
	AgtSharingMessageAcknowledged
}                     from "../../ddl/ddl";
import {
	BaseSyncLogDao,
	IBaseSyncLogDao,
	Q,
	QAgtRepositoryTransactionBlock,
	QAgtSharingMessage,
	QSyncLog
}                     from "../../generated/generated";
import {SYNC_LOG_DAO} from "../../diTokens";

export type SyncedTerminalRepository = [TerminalId, AgtRepositoryId];
export type TerminalSyncStatus = [TerminalId, AgtRepositoryId, AgtSharingMessageAcknowledged];

export type InsertSyncLog = [
	AgtRepositoryTransactionBlockId,
	// AgtAgtRepositoryTransactionBlockAddDatetime,
	AgtSharingMessageId
	];

export interface ISyncLogDao
	extends IBaseSyncLogDao {

	insertValues(
		values: InsertSyncLog[]
	): Promise<void>;

	selectSyncedTerminalRepositories(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExlusive: AgtRepositoryTransactionBlockAddDatetime,
		repositoryIds: AgtRepositoryId[],
	): Promise<SyncedTerminalRepository[]>;

	selectTmSyncStatusForAgtRepositoryIds(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExlusive: AgtRepositoryTransactionBlockAddDatetime,
		repositoryIds: AgtRepositoryId[],
	): Promise<TerminalSyncStatus[]>;

}

@Service(SYNC_LOG_DAO)
export class SyncLogDao
	extends BaseSyncLogDao
	implements ISyncLogDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async insertValues(
		values: InsertSyncLog[]
	): Promise<void> {
		const dbEntity = Q.db.currentVersion.entityMapByName.RealtimeSyncLog;
		let sl: QSyncLog;

		await this.airportDb.db.insertValues(dbEntity, {
			insertInto: sl = Q.SyncLog,
			columns: [
				sl.repositoryTransactionBlock.id,
				// sl.repositoryTransactionBlockAddDatetime,
				sl.sharingMessage.id,
			],
			values
		});
	}

	async selectSyncedTerminalRepositories(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExlusive: AgtRepositoryTransactionBlockAddDatetime,
		repositoryIds: AgtRepositoryId[],
	): Promise<SyncedTerminalRepository[]> {
		const syncedTerminalRepositories: SyncedTerminalRepository[] = [];

		const dbSyncStatuses = await this.selectTmSyncStatusForAgtRepositoryIds(
			fromDateInclusive,
			toDateExlusive,
			repositoryIds
		);

		for (const dbSyncStatus of dbSyncStatuses) {
			if (dbSyncStatus[2] === AgtSharingMessageAcknowledged.ACKNOWLEDGED) {
				syncedTerminalRepositories.push([dbSyncStatus[0], dbSyncStatus[1]]);
			}
		}

		return syncedTerminalRepositories;
	}

	/**
	 * This query is input into insert of DailySyncLog records.
	 *
	 * Cursor consideration:  ORDER BY and Cursor may not work well together.  Cursor is not
	 * as big of a need here, since the query is limited by repository ids and is only run
	 * by the archival process.
	 *
	 * @param {AgtAgtRepositoryTransactionBlockAddDatetime} fromDateInclusive
	 * @param {AgtAgtRepositoryTransactionBlockAddDatetime} toDateExlusive
	 * @param {AgtRepositoryId[]} repositoryIds
	 * @returns {Promise<TerminalSyncStatus[]>}
	 */
	async selectTmSyncStatusForAgtRepositoryIds(
		fromDateInclusive: AgtRepositoryTransactionBlockAddDatetime,
		toDateExlusive: AgtRepositoryTransactionBlockAddDatetime,
		repositoryIds: AgtRepositoryId[],
	): Promise<TerminalSyncStatus[]> {
		let sl: QSyncLog,
		    sm: QAgtSharingMessage,
		    rtb: QAgtRepositoryTransactionBlock;

		// AgtRepositoryTransactionBlock Sub-Query
		const smrtb = tree({
			from: [
				sl = Q.SyncLog,
				sm = sl.sharingMessage.innerJoin(),
				rtb = sl.repositoryTransactionBlock.innerJoin()
			],
			select: {
				repositoryTransactionBlockId: rtb.id,
				terminalId: sm.terminal.id,
				repositoryId: rtb.repository.id,
				maxAcked: max(sm.acknowledged),
			},
			where: and(
				// sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),
				// sl.repositoryTransactionBlockAddDatetime.lessThan(toDateExlusive),

				rtb.addDatetime.greaterThanOrEquals(fromDateInclusive),
				rtb.addDatetime.lessThan(toDateExlusive),
				rtb.repository.id.in(repositoryIds)
			),
			groupBy: [
				rtb.id,
				sm.terminal.id,
				rtb.repository.id
			],
			orderBy: [
				rtb.repository.id.asc(),
				sm.terminal.id.asc(),
			]
		});

		return <TerminalSyncStatus[]>await this.airportDb.find.sheet({
			from: [
				smrtb
			],
			select: [
				smrtb.terminalId,
				smrtb.repositoryId,
				min(smrtb.maxAcked)
			],
			groupBy: [
				smrtb.terminalId,
				smrtb.repositoryId
			]
		});

	}

}