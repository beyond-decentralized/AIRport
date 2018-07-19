import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                   from "@airport/air-control";
import {Repository} from "../repository/Repository";

export type MonthlyArchiveLogMonth = number;
export type MonthlyArchiveLogNumberOfChanges = number;

@Entity()
@Table({name: "MONTHLY_ARCHIVE_LOG"})
// TODO: partition on each node by date
export class MonthlyArchiveLog {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: Repository;

	@Id()
	@Column({name: "MONTH_NUMBER"})
	@DbNumber()
	monthNumber: MonthlyArchiveLogMonth;

	@Column({name: "NUMBER_OF_CHANGES"})
	@DbNumber()
	numberOfChanges: MonthlyArchiveLogNumberOfChanges;

	@Column({name: "DAYS_WITH_CHANGES", columnDefinition: "BOOL[]"})
	daysWithChanges: any;

}