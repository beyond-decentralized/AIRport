import {and, IAirportDatabase} from "@airport/air-control";
import {ShardId} from "@airport/airport-code";
import {
	DatabaseVerificationStageRunId,
	DatabaseVerificationStageServerId,
} from "../ddl/user/DatabaseVerificationStage";
import {
	BaseDatabaseVerificationStageDao,
	QDatabaseVerificationStage
} from "../generated/generated";
import {Q} from "../generated/qSchema";
import {DatabaseId} from "../index";
import {OriginalShardId} from "../ddl/ShardedRecord";

export type InsertDatabaseVerificationStage = [
	// Shard id of the database to run the query in
	DatabaseVerificationStageServerId, DatabaseVerificationStageRunId, ShardId,
	// Original Shard Id of Database
	OriginalShardId, DatabaseId
	];

export interface IDatabaseVerificationStageDao {

	insertValues(
		values: InsertDatabaseVerificationStage[]
	): Promise<number>;

	deleteForServerRun(
		shardId: ShardId,
		serverId: DatabaseVerificationStageServerId,
		runId: DatabaseVerificationStageRunId
	): Promise<void>;

}

export class DatabaseVerificationStageDao
	extends BaseDatabaseVerificationStageDao
	implements IDatabaseVerificationStageDao {

	constructor(
		private airportDb: IAirportDatabase,
	) {
		super();
	}

	async insertValues(
		values: InsertDatabaseVerificationStage[]
	): Promise<number> {
		const dbEntity = Q.db.entityMapByName.DatabaseSyncLogVerificationStage;
		let dvs: QDatabaseVerificationStage;
		return await this.airportDb.db.insertValues(dbEntity, {
			insertInto: dvs = Q.DatabaseVerificationStage,
			columns: [
				dvs.serverId,
				dvs.runId,
				dvs.shard.id,
				dvs.database.originalShard.id,
				dvs.database.id,
			],
			values: values
		});
	}

	async deleteForServerRun(
		shardId: ShardId,
		serverId: DatabaseVerificationStageServerId,
		runId: DatabaseVerificationStageRunId
	): Promise<void> {
		let dvs: QDatabaseVerificationStage;
		await this.db.deleteWhere({
			deleteFrom: dvs = Q.DatabaseVerificationStage,
			where: and(
				dvs.shard.id.equals(shardId),
				dvs.serverId.equals(serverId),
				dvs.runId.equals(runId)
			)
		})
		;
	}
}