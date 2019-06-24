import {
	Column,
	DbNumber,
	Entity,
	Id,
	Table
} from "@airport/air-control";
import {
	DatabaseId,
	RepositoryId
} from "./CommonTypes";

export type DailySyncLogDatabaseId = DatabaseId;
export type DailySyncLogRepositoryId = RepositoryId;
// 0 is not synced, 1 is synced, allows for MAX(synced) queries, vs boolean
export type DailySyncLogSynced = number;
export type DailySyncLogDateNumber = number;

export type DailySyncLogValues = [
	DailySyncLogDatabaseId,
	DailySyncLogRepositoryId,
	// DailySyncLogSynced,
	DailySyncLogDateNumber
	];

// export type DailySyncLogDatabaseDateRepositoryKey = string;

/**
 * Sync log is used to determine which archive records a terminal still has not synced.
 *
 * With Citus we can partition the table across boxes by a particular field.
 *
 * That presents two searchOne scenarios:
 *
 * 1) Find all SyncLogs for a terminal that have not been synced yet.
 * Here if we partition by the databaseId then all of the data for a given
 * terminal will be on a single node.
 *
 * 2) Find all daily archives for a given repository: here we need to partition
 * by repositoryId and then all records for  given repository will be on a given
 * node.   The second case is probably going to be more common and will also have
 * the chance of making some nodes run hot because some repositories may be more
 * popular than others (though that might even itself out via randomness of
 * distribution of repositories).
 *
 * So, perhaps what we need is two separate schemas.  One for SyncLogs (daily and monthly),
 * partitioned by the terminal id.  And one for Archives, partitioned by repositoryId.
 *
 * There are other NewSql systems out there that automate data partitioning.  Using those
 * would allow to efficiently join between DailySyncLogs and Daily Archives, but how
 * imporant are these joins?  The main use cases are:
 *
 * Database joins an existing repository - here sync logs are not involved, only the archives
 * are needed.  This scenario is expected to be very frequent
 *
 * Database was offline for a long time and needs get get all of the changes for all of the
 * repositories it has.  This scenario is expected to be less frequent.
 *
 * With these expectations in mind, having an additional round trip to retrieve all
 * repository/days that have not been synced may not be as big of a deal.  So, we can focus on
 * archiving Sync Logs and Archives separately, with the assumption that they could be
 * explicitly partitioned by the keys described above.  Once technologies like CockroachDb and
 * TiDB become mainstream, then this can be rethought.  But for now Citus (or a fallback to
 * Cassandra) seem like a safer choice.
 *
 */
@Entity()
@Table({name: "DAILY_SYNC_LOG"})
export class DailySyncLog {

	@Id()
	@Column({name: "DATABASE_ID", nullable: false})
	@DbNumber()
	databaseId: DailySyncLogDatabaseId;

	@Id()
	@Column({name: "DATE_NUMBER", nullable: false})
	@DbNumber()
	date: DailySyncLogDateNumber;

	@Id()
	@Column({name: "REPOSITORY_ID", nullable: false})
	@DbNumber()
	repositoryId: DailySyncLogRepositoryId;

	// @ManyToOne()
	// @JoinColumns([
	// 	{name: "REPOSITORY_ID"},
	// 	{name: "DATE"}
	// ])
	// dailySyncLogs: DailySyncLog[];

	// @Column({name: "IS_SYNCED"})
	// @DbBoolean()
	// synced: DailySyncLogSynced;

}
