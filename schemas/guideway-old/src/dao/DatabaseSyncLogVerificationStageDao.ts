import {IAirportDatabase} from "@airport/air-control";
import {ShardId} from "@airport/airport-code/lib/ddl/Shard";
import {DatabaseSyncLogId} from "../ddl/syncronization/DatabaseSyncLog";
import {DatabaseId} from "../ddl/user/Database";
import {
	BaseDatabaseSyncLogVerificationStageDao,
	IBaseDatabaseSyncLogVerificationStageDao
} from "../generated/baseDaos";
import {Q} from "../generated/qSchema";
import {QDatabaseSyncLogVerificationStage} from "../generated/syncronization/qdatabasesynclogverificationstage";
import {
	DatabaseOriginalShardId,
	DatabaseSyncLogOriginalShardId,
	DatabaseSyncLogVerificationStageRunId
} from "../ddl/ddl";
import {DatabaseSyncLogVerificationStageServerId} from "../";

export type InsertDatabaseSyncLogVerificationStage = [
	ShardId, DatabaseSyncLogVerificationStageServerId, DatabaseSyncLogVerificationStageRunId,
	DatabaseSyncLogOriginalShardId, DatabaseSyncLogId,
	DatabaseOriginalShardId, DatabaseId];

export interface IDatabaseSyncLogVerificationStageDao
	extends IBaseDatabaseSyncLogVerificationStageDao {

	insertValues(
		values: InsertDatabaseSyncLogVerificationStage[]
	): Promise<void>;

	deleteForServer(
		serverId: DatabaseSyncLogVerificationStageServerId
	): Promise<void>;

}

export class DatabaseSyncLogVerificationStageDao
	extends BaseDatabaseSyncLogVerificationStageDao
	implements IDatabaseSyncLogVerificationStageDao {

	constructor(
		private airportDb: IAirportDatabase,
	) {
		super();
	}

	async insertValues(
		values: InsertDatabaseSyncLogVerificationStage[]
	): Promise<void> {
		const dbEntity = Q.db.entityMapByName['DatabaseSyncLogVerificationStage'];
		let dslvs: QDatabaseSyncLogVerificationStage;
		await this.airportDb.db.insertValues(dbEntity, {
			insertInto: dslvs = Q.DatabaseSyncLogVerificationStage,
			columns: [
				dslvs.shard.id,
				dslvs.serverId,
				dslvs.runId,
				dslvs.databaseSyncLog.originalShard.id,
				dslvs.databaseSyncLog.id,
				dslvs.database.originalShard.id,
				dslvs.database.id,
			],
			values: values
		});
	}

	async deleteForServer(
		serverId: DatabaseSyncLogVerificationStageServerId
	): Promise<void> {
		let dslvs: QDatabaseSyncLogVerificationStage;
		await this.db.deleteWhere({
			deleteFrom: dslvs = Q.DatabaseSyncLogVerificationStage,
			where: dslvs.serverId.equals(serverId)
		});
	}

}