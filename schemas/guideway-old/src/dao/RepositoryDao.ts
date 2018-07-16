import {and, distinct, IAirportDatabase, Y} from "@airport/air-control";
import {ShardId} from "@airport/airport-code";
import {BaseRepositoryDao} from "../generated/baseDaos";
import {Q} from "../generated/qSchema";
import {QDatabaseRepositoryVerificationStage} from "../generated/user/qdatabaserepositoryverificationstage";
import {
	DatabaseRepositoryVerificationStageRunId,
	DatabaseRepositoryVerificationStageServerId
} from "../ddl/user/DatabaseRepositoryVerificationStage";
import {QRepository} from "../generated/repository/qrepository";
import {QRepositoryDatabase} from "../generated/repository/qrepositorydatabase";
import {RepositoryDatabaseShardId} from "../ddl/repository/RepositoryDatabase";
import {DatabaseId, DatabaseOriginalShardId} from "../ddl/ddl";

// RepositoryOriginalShardId | RepositoryId
export type RepositoryKey = string;

export interface IRepositoryDao {

}

export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

	constructor(
		private airportDb: IAirportDatabase,
	) {
		super();
	}

	/**
	 * Finds Repository Shards for given Databases
	 * via matching records in Database Repository Verification Stage.
	 * @returns {Promise<void>}
	 */
	async findRepositoriesForDatabase(
		shardId: ShardId,
		serverId: DatabaseRepositoryVerificationStageServerId,
		verificationRunId: DatabaseRepositoryVerificationStageRunId,
	): Promise<Map<RepositoryKey, RepositoryDatabaseShardId>> {
		const resultMapByDbKey: Map<RepositoryKey, RepositoryDatabaseShardId> = new Map();

		let r: QRepository,
			rd: QRepositoryDatabase,
			drvs: QDatabaseRepositoryVerificationStage;
		const id = Y;
		const results = await this.airportDb.find.sheet({
			from: [
				r = Q.Repository,
				drvs = r.databaseVerificationStage.innerJoin(),
				rd = drvs.repositoryDatabase.leftJoin()
			],
			select: distinct([
				r.originalShard.id,
				r.id,
				rd.databaseShard.id
			]),
			where: and(
				// Ensure that the query goes to the right shard
				r.shard.id.equals(shardId),
				drvs.shard.id.equals(shardId),
				rd.shard.id.equals(shardId),
				// Now join
				drvs.serverId.equals(serverId),
				drvs.runId.equals(verificationRunId),
				// For the repos that are in the current shard
				r.currentShard.id.equals(shardId)
			)
		});

		for (const result of results) {
			resultMapByDbKey.set(getDatabaseKey(result.originalShard.id, result.id), result);
		}

		return resultMapByDbKey;
	}

	export function getDatabaseKey(
		databaseOriginalShardId: DatabaseOriginalShardId,
		databaseId: DatabaseId
	): string {
		return databaseOriginalShardId + '|' + databaseId;
	}

}