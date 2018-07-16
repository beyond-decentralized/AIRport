import {
	IUtils,
	UtilsToken
}                                            from "@airport/air-control";
import {AirportDatabaseToken}                from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase}                    from "@airport/air-control/lib/lingo/AirportDatabase";
import {
	RepoTransBlockSyncOutcomeType,
	TmRepositoryTransactionBlockId
}                                            from "@airport/arrivals-n-departures";
import {Inject}                              from "typedi/decorators/Inject";
import {Service}                             from "typedi/decorators/Service";
import {
	BaseRepoTransBlockResponseStageDao,
	Q,
	QRepoTransBlockResponseStage
}                                            from "../../generated/generated";
import {RepoTransBlockResponseStageDaoToken} from "../../InjectionTokens";

export type RepoTransBlockResponseStageValues = [
	TmRepositoryTransactionBlockId,
	// AgtSyncRecordId,
	RepoTransBlockSyncOutcomeType
	];

export interface IRepoTransBlockResponseStageDao {

	insertValues(
		values: RepoTransBlockResponseStageValues[]
	): Promise<number>;

	delete( //
	): Promise<number>;

}

@Service(RepoTransBlockResponseStageDaoToken)
export class RepoTransBlockResponseStageDao
	extends BaseRepoTransBlockResponseStageDao
	implements IRepoTransBlockResponseStageDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		repoTransBlockResponseStageDao,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async insertValues(
		values: RepoTransBlockResponseStageValues[]
	): Promise<number> {

		const dbEntity = Q.db.currentVersion.entityMapByName.RepoTransBlockResponseStage;

		let smrs: QRepoTransBlockResponseStage;

		return await
			this.airportDb.db.insertValues(dbEntity, {
				insertInto: smrs = Q.RepoTransBlockResponseStage,
				columns: [
					smrs.id,
					// smrs.agtSyncRecordId,
					smrs.syncOutcomeType
				],
				values
			});
	}

	async delete( //
	): Promise<number> {
		return await
			this.db.deleteWhere({
				deleteFrom: Q.RepoTransBlockResponseStage
			});
	}

}