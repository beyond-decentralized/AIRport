/*,
import {
	IUtils,
	UTILS
}                                            from "@airport/air-control";
import {AIR_DB}                from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase}                    from "@airport/air-control/lib/lingo/AirportDatabase";
import {
	AgtTerminalSyncLogId,
	AgtSyncRecordAddDatetime
	TmSharingMessageId
}                                            from "@airport/arrivals-n-departures";
import {Inject}                              from "typedi/query/Inject";
import {Service}                             from "typedi/query/Service";
import {
	BaseSharingMessageResponseStageDao,
	Q,
	QSharingMessageResponseStage
}                                            from "../../generated/generated";
import {SharingMessageResponseStageDaoToken} from "../../InjectionTokens";

export type SharingMessageResponseStageValues = [
	TmSharingMessageId,
	AgtTerminalSyncLogId,
	// SyncStatus,
	AgtSyncRecordAddDatetime
	];

export interface ISharingMessageResponseStageDao {

	insertValues(
		values: SharingMessageResponseStageValues[]
	): Promise<number>;

	delete( //
	): Promise<number>;

}

@Service(SharingMessageResponseStageDaoToken)
export class SharingMessageResponseStageDao
	extends BaseSharingMessageResponseStageDao
	implements ISharingMessageResponseStageDao {

	constructor(
		@Inject(AIR_DB)
		private airDb: IAirportDatabase,
		@Inject(UTILS)
			utils: IUtils
	) {
		super(utils);
	}

	async insertValues(
		values: SharingMessageResponseStageValues[]
	): Promise<number> {
		const dbEntity = Q.db.currentVersion.entityMapByName.SharingMessageResponseStage;

		let smrs: QSharingMessageResponseStage;

		return await this.airDb.db.insertValues({
			insertInto: smrs = Q.SharingMessageResponseStage,
			columns: [
				smrs.id,
				smrs.agtTerminalSyncLogId,
				// smrs.syncStatus,
				smrs.syncTimestamp
			],
			values
		}, {
			dbEntity
		});
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			deleteFrom: Q.SharingMessageResponseStage
		});
	}

}*/
