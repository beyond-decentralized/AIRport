import {
	Column,
	DbString,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
}                        from "@airport/air-control";
import {AgtRepositoryId} from "@airport/arrivals-n-departures";
import {
	DailyArchiveLog,
	DailyArchiveLogDate,
	Repository,
}                        from "@airport/guideway";

export type DailyArchiveRepositoryId = AgtRepositoryId;
export type DailyArchiveDate = DailyArchiveLogDate;
export type DailyArchiveRepositoryData = string;

export type DailyArchiveValues =
	[DailyArchiveRepositoryId, DailyArchiveDate, DailyArchiveRepositoryData];

@Entity()
@Table({name: "DAILY_ARCHIVES"})
export class DailyArchive {

	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: Repository;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "REPOSITORY_ID"},
		{name: "DATE_NUMBER"}
	])
	dailyArchiveLog: DailyArchiveLog;

	@Column({name: "REPOSITORY_DATA"})
	@DbString()
	repositoryData: DailyArchiveRepositoryData;

}