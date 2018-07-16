import { and, IAirportDatabase } from "@airport/air-control";
import {IUtils}                            from "@airport/air-control";
import {
	MonthlySyncLogDatabaseId,
	MonthlySyncLogDate,
	MonthlySyncLogRepositoryId,
	MonthlySyncLogSynced
} from "../ddl/MonthlySyncLog";
import { BaseMonthlySyncLogDao } from "../generated/baseDaos";
import { QMonthlySyncLog } from "../generated/qmonthlysynclog";
import { Q } from "../generated/qSchema";

export interface IMonthlySyncLogDao {

	findAllForDatabase(
		databaseId: MonthlySyncLogDatabaseId,
		synced: MonthlySyncLogSynced,
		callback: (
			syncSyncLogRows: [MonthlySyncLogRepositoryId, MonthlySyncLogDate][]
		) => void,
	): Promise<void>;

	updateSyncStatus(
		databaseId: MonthlySyncLogDatabaseId,
		repositoryIds: MonthlySyncLogRepositoryId[],
		synced: MonthlySyncLogSynced,
	): Promise<void>;

}

export class MonthlySyncLogDao
	extends BaseMonthlySyncLogDao
	implements IMonthlySyncLogDao {

	constructor(
		private airportDb: IAirportDatabase,
		utils: IUtils
	) {
		super(utils);
	}

	async findAllForDatabase(
		databaseId: MonthlySyncLogDatabaseId,
		synced: MonthlySyncLogSynced,
		callback: (
			syncSyncLogRows: [MonthlySyncLogRepositoryId, MonthlySyncLogDate][]
		) => void,
	): Promise<void> {
		let dsl: QMonthlySyncLog;
		await this.airportDb.find.sheet({
			from: [
				dsl = Q.MonthlySyncLog
			],
			select: [
				dsl.repositoryId,
				dsl.month
			],
			where: and(
				dsl.databaseId.equals(databaseId),
				dsl.synced.equals(synced)
			)
		}, 1000, (
			syncSyncLogRows: [MonthlySyncLogRepositoryId, MonthlySyncLogDate][]
		) => {
			callback(syncSyncLogRows);
		});
	}

	async updateSyncStatus(
		databaseId: MonthlySyncLogDatabaseId,
		repositoryIds: MonthlySyncLogRepositoryId[],
		synced: MonthlySyncLogSynced,
	): Promise<void> {
		let dsl: QMonthlySyncLog;

		await this.db.updateWhere({
			update: dsl = Q.MonthlySyncLog,
			set: {
				synced
			},
			where: and(
				dsl.databaseId.equals(databaseId),
				dsl.repositoryId.in(repositoryIds)
			)
		});
	}

}