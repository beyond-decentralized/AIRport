import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                        from "@airport/air-control";
import {AgtRepositoryId} from "@airport/arrivals-n-departures";
import {Repository}      from "../repository/Repository";

export type DailyArchiveLogDate = number;
export type DailyArchiveLogNumberOfChanges = number;

export type DailyArchiveLogValues = [
	AgtRepositoryId,
	DailyArchiveLogDate,
	DailyArchiveLogNumberOfChanges
	];

@Entity()
@Table({name: "DAILY_ARCHIVE_LOG"})
// TODO: partition on each node by date
export class DailyArchiveLog {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: Repository;

	@Id()
	@Column({name: "DATE_NUMBER"})
	@DbNumber()
	dateNumber: DailyArchiveLogDate;

	@Column({name: "NUMBER_OF_CHANGES"})
	@DbNumber()
	numberOfChanges: DailyArchiveLogNumberOfChanges;

}