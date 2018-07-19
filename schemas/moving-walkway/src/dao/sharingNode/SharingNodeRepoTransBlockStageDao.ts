import {AirportDatabaseToken, UtilsToken} from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase} from "@airport/air-control/lib/lingo/AirportDatabase";
import {IUtils} from "@airport/air-control/lib/lingo/utils/Utils";
import {
	RepoTransBlockSyncOutcomeType,
	TmRepositoryTransactionBlockId
} from "@airport/arrivals-n-departures";
import {Inject} from "typedi/decorators/Inject";
import {Service} from "typedi/decorators/Service";
import {SharingNodeId} from "../../ddl/ddl";
import {
	BaseSharingNodeRepoTransBlockStageDao,
	IBaseSharingNodeRepoTransBlockStageDao,
	Q,
	QSharingNodeRepoTransBlockStage
} from "../../generated/generated";
import {SharingNodeRepoTransBlockStageDaoToken} from "../../InjectionTokens";

export type SharingNodeRepoTransBlockStageValues = [
	SharingNodeId,
	TmRepositoryTransactionBlockId,
	RepoTransBlockSyncOutcomeType
	];

export interface ISharingNodeRepoTransBlockStageDao
	extends IBaseSharingNodeRepoTransBlockStageDao {

	insertValues(
		values: SharingNodeRepoTransBlockStageValues[]
	): Promise<number>;

	delete( //
	): Promise<number>;

}

@Service(SharingNodeRepoTransBlockStageDaoToken)
export class SharingNodeRepoTransBlockStageDao
	extends BaseSharingNodeRepoTransBlockStageDao
	implements ISharingNodeRepoTransBlockStageDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async insertValues(
		values: SharingNodeRepoTransBlockStageValues[]
	): Promise<number> {
		const dbEntity = Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlockStage;

		let snrtbs: QSharingNodeRepoTransBlockStage;

		return await this.airportDb.db.insertValues(dbEntity, {
			insertInto: snrtbs = Q.SharingNodeRepoTransBlockStage,
			columns: [
				snrtbs.sharingNodeId,
				snrtbs.repositoryTransactionBlockId,
				// snrtbs.syncStatus,
				snrtbs.syncOutcomeType
			],
			values
		});
	}

	async delete( //
	): Promise<number> {
		return await this.db.deleteWhere({
			deleteFrom: Q.SharingNodeRepoTransBlockStage
		});
	}

}