import {
	and,
	IAirportDatabase,
	IUtils,
	JSONLogicalOperation,
	or
}                            from "@airport/air-control";
import {
	DailyArchiveDate,
	DailyArchiveRepositoryData,
	DailyArchiveRepositoryId,
	DailyArchiveValues
}                            from "../ddl/DailyArchive";
import {BaseDailyArchiveDao} from "../generated/baseDaos";
import {QDailyArchive}       from "../generated/qdailyarchive";
import {Q}                   from "../generated/qSchema";

export type FlatDailyArchive =
	[DailyArchiveRepositoryId, DailyArchiveDate, DailyArchiveRepositoryData];

export interface IDailyArchiveDao {

	findForRepositoryIdsOnDates(
		repositoryIds: DailyArchiveRepositoryId[],
		dates: DailyArchiveDate[][],
	): Promise<FlatDailyArchive[]>;

	addRecords(
		dailyArchiveDtos: DailyArchiveValues[]
	): Promise<void>;

}

export class DailyArchiveDao
	extends BaseDailyArchiveDao
	implements IDailyArchiveDao {

	constructor(
		private airportDb: IAirportDatabase,
		utils: IUtils
	) {
		super(utils);
	}

	async addRecords(
		values: DailyArchiveValues[]
	): Promise<void> {
		const dbEntity = Q.db.currentVersion.entityMapByName.DailyArchive;
		let da: QDailyArchive;
		await this.airportDb.db.insertValues(dbEntity, {
			insertInto: da = Q.DailyArchive,
			columns: [
				da.repository.id,
				da.dailyArchiveLog.dateNumber,
				da.repositoryData
			],
			values
		});
	}

	async findForRepositoryIdsOnDates(
		repositoryIds: DailyArchiveRepositoryId[],
		dates: DailyArchiveDate[][],
	): Promise<FlatDailyArchive[]> {
		const whereClauseFragments: JSONLogicalOperation[] = [];
		let i = -1;
		let dsl: QDailyArchive = Q.DailyArchive;
		for (const repositoryId of repositoryIds) {
			const repositoryDates = dates[++i];
			whereClauseFragments.push(
				and(
					dsl.repository.id.equals(repositoryId),
					dsl.dailyArchiveLog.dateNumber.in(repositoryDates)
				));
		}
		return <FlatDailyArchive[]> await this.airportDb.find.sheet({
			from: [
				dsl
			],
			select: [
				dsl.repository.id,
				dsl.dailyArchiveLog.dateNumber,
				dsl.repositoryData
			],
			where: or(
				...whereClauseFragments
			)
		});
	}

}