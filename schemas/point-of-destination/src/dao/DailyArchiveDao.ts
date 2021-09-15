import {
	AIRPORT_DATABASE,
	and,
	JSONLogicalOperation,
	or
} from '@airport/air-control'
import { container, DI } from '@airport/di'
import {
	DailyArchiveDate,
	DailyArchiveRepositoryData,
	DailyArchiveRepositoryId,
	DailyArchiveValues
} from '../ddl/DailyArchive'
import { DAILY_ARCHIVE_DAO } from '../tokens'
import { BaseDailyArchiveDao } from '../generated/baseDaos'
import { QDailyArchive } from '../generated/qdailyarchive'
import { Q } from '../generated/qSchema'

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

	async addRecords(
		values: DailyArchiveValues[]
	): Promise<void> {
		const airDb = await container(this).get(AIRPORT_DATABASE)

		const dbEntity = Q.db.currentVersion[0].schemaVersion
			.entityMapByName.DailyArchive
		let da: QDailyArchive
		await airDb.insertValues({
			insertInto: da = Q.DailyArchive,
			columns: [
				da.repository.id,
				da.dailyArchiveLog.dateNumber,
				da.repositoryData
			],
			values
		}, {
			dbEntity
		})
	}

	async findForRepositoryIdsOnDates(
		repositoryIds: DailyArchiveRepositoryId[],
		dates: DailyArchiveDate[][],
	): Promise<FlatDailyArchive[]> {
		const airDb = await container(this).get(AIRPORT_DATABASE)

		const whereClauseFragments: JSONLogicalOperation[] = []
		let i = -1
		let dsl: QDailyArchive = Q.DailyArchive
		for (const repositoryId of repositoryIds) {
			const repositoryDates = dates[++i]
			whereClauseFragments.push(
				and(
					dsl.repository.id.equals(repositoryId),
					dsl.dailyArchiveLog.dateNumber.in(repositoryDates)
				))
		}
		return <FlatDailyArchive[]>await airDb.find.sheet({
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
		})
	}

}

DI.set(DAILY_ARCHIVE_DAO, DailyArchiveDao)
