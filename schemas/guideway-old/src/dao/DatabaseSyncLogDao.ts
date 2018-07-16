import {and, exists, IAirportDatabase} from "@airport/air-control";
import {DatabaseSyncLogId, SyncedDatabaseId} from "../ddl/syncronization/DatabaseSyncLog";
import {DatabaseSyncLogState} from "../ddl/syncronization/DatabaseSyncLogState";
import {DatabaseId, DatabaseOriginalShardId} from "../ddl/user/Database";
import {BaseDatabaseSyncLogDao, IBaseDatabaseSyncLogDao} from "../generated/baseDaos";
import {Q} from "../generated/qSchema";
import {QDatabaseSyncLog} from "../generated/syncronization/qdatabasesynclog";
import {QDatabaseSyncLogVerificationStage} from "../generated/syncronization/qdatabasesynclogverificationstage";
import {SyncLogSyncRecordAddDatetime} from "../ddl/syncronization/SyncLog";
import {RepositoryId} from "../ddl/repository/Repository";
import {DatabaseSyncLogVerificationStageRunId} from "../ddl/syncronization/DatabaseSyncLogVerificationStage";
import {ShardId} from "@airport/airport-code";
import {OriginalShardId} from "../ddl/ShardedRecord";
import {DatabaseKey, getDatabaseKey} from "./DatabaseDao";
import {DatabaseSyncLogVerificationStageServerId} from "../";

export type InsertDatabaseSyncLog = [
	ShardId, OriginalShardId, DatabaseOriginalShardId, SyncedDatabaseId, DatabaseSyncLogState
	]

export interface IDatabaseSyncLogDao
	extends IBaseDatabaseSyncLogDao {

	insertValues(
		values: InsertDatabaseSyncLog[]
	): Promise<Map<DatabaseKey, DatabaseSyncLogId>>;

	updateToAckedForServer(
		shardId: ShardId,
		serverId: DatabaseSyncLogVerificationStageServerId,
		runId: DatabaseSyncLogVerificationStageRunId,
	): Promise<void>;

}

export class DatabaseSyncLogDao
	extends BaseDatabaseSyncLogDao
	implements IDatabaseSyncLogDao {

	constructor(
		private airportDb: IAirportDatabase,
	) {
		super();
	}

	async insertValues(
		values: InsertDatabaseSyncLog[]
	): Promise<Map<DatabaseKey, DatabaseSyncLogId>> {
		const dbSyncLogIdsByDatabaseId: Map<DatabaseKey, DatabaseSyncLogId> = new Map();

		const dbEntity = Q.db.entityMapByName.DatabaseSyncLog;
		let dsl: QDatabaseSyncLog;
		const dbSyncLogIds = await this.airportDb.db.insertValuesGenerateIds(dbEntity, {
			insertInto: dsl = Q.DatabaseSyncLog,
			columns: [
				dsl.shard.id,
				dsl.originalShard.id,
				dsl.database.originalShard.id,
				dsl.database.id,
				dsl.state,
			],
			values
		});

		for (let i = 0; i < dbSyncLogIds.length; i++) {
			const insertedRecord: InsertDatabaseSyncLog = values[i];
			dbSyncLogIdsByDatabaseId.set(getDatabaseKey(insertedRecord[2], insertedRecord[3]), dbSyncLogIds[0]);
		}

		return dbSyncLogIdsByDatabaseId;
	}

	async updateToAckedForServer(
		shardId: ShardId,
		serverId: DatabaseSyncLogVerificationStageServerId,
		runId: DatabaseSyncLogVerificationStageRunId,
	): Promise<void> {
		let dsl: QDatabaseSyncLog,
			dslvs: QDatabaseSyncLogVerificationStage;
		// TODO: verify the query works as required
		await this.db.updateWhere({
			update: dsl = Q.DatabaseSyncLog,
			set: {
				state: DatabaseSyncLogState.RECORDS_ACKED_BY_DATABASE
			},
			where: and(
				// Include shard id to route query to the correct shard
				dsl.shard.id.equals(shardId),
				exists({
					from: [dslvs = Q.DatabaseSyncLogVerificationStage],
					select: [
						dslvs.shard.id,
						dslvs.database.id,
						dslvs.database.originalShard.id
					],
					where: and(
						// Include shard id to route query to the correct shard
						dslvs.shard.id.equals(shardId),
						dsl.shard.id.equals(dslvs.shard.id),
						// Join the records
						dsl.originalShard.id.equals(dslvs.databaseSyncLog.originalShard.id),
						dsl.id.equals(dslvs.databaseSyncLog.id),
						// For the current run
						dslvs.serverId.equals(serverId),
						dslvs.runId.equals(runId)
					)
				}))
		});
	}

	/**
	 * DatabaseSyncLog records are eventually aggregated into DailyDatabaseSyncLog records,
	 * which represent sync status of a given repository for all records of a given repository
	 * on a given day.
	 *
	 * Databases always sync to their Shard, and the Shard has all of the records needed by
	 * all databases in that shard.  This is because during sync record creation the Shards
	 * owning the repository create those records in all Shards that have databases pointing
	 * to those repositories.  Hence, deleting DbSLs never has to cross shard boundaries
	 *
	 * Deleting DatabaseSyncLog records can be done in two ways.  First, it can be done
	 * on the bases of DbSLs not having any SyncLogs tied to them, this operation would still
	 * have to make queries to other nodes to find out which DbSL ids are not present.  This
	 * is not desired given that SyncLogs will be split be repository ids.
	 *
	 * A different version of this query is to delete DbSLs at the same time as SyncLogs,
	 * using foreign key constraints.  This query would provide the repository ids and should
	 * be quite a bit faster, given that it should go to targeted nodes for deletion of child
	 * SyncLog records.  Additional state management is not required for this version, since
	 * the query can also provide explicit SyncLogIds to be deleted as well (in theory).
	 *
	 * The second option can also only delete only DbSLs and leave SyncLogs alone, since they
	 * can just be dropped with the daily partition.
	 *
	 * Both ways can take in DatabaseIds, which makes it easy to split the query if the
	 * DatabaseSyncLog is split between nodes by database ids.
	 *
	 * TODO: inspect query plan
	 *
	 */
	async deleteForRepositoryIdsOnDate(
		fromDateInclusive: SyncLogSyncRecordAddDatetime,
		toDateExclusive: SyncLogSyncRecordAddDatetime,
		databaseIds: DatabaseId[],
		repositoryIds: RepositoryId[],
	): Promise<void> {

	}

}