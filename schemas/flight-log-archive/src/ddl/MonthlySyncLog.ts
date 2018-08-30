import { Column, DbBoolean, DbDate, DbNumber, Entity, Id, Table } from "@airport/air-control";
import { DatabaseId, RepositoryId } from "./CommonTypes";

export type MonthlySyncLogRepositoryId = RepositoryId;
export type MonthlySyncLogDate = number;
export type MonthlySyncLogDatabaseId = DatabaseId;
export type MonthlySyncLogSynced = boolean;

@Entity()
@Table({name: "MONTHLY_SYNC_LOG"})
// TODO: split between nodes by databaseId
export class MonthlySyncLog {

	@Id()
	@Column({name: "DATABASE_ID", nullable: false})
	@DbNumber()
	databaseId: MonthlySyncLogDatabaseId;

	@Id()
	@Column({name: "DATE", nullable: false})
	@DbDate()
	month: MonthlySyncLogDate;

	@Id()
	@Column({name: "REPOSITORY_ID", nullable: false})
	@DbNumber()
	repositoryId: MonthlySyncLogRepositoryId;

	@Column({name: "SYNCED", nullable: false})
	@DbBoolean()
	synced: MonthlySyncLogSynced;

}