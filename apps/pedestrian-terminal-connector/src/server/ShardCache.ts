import { IShard, IShardDao, ShardId } from "@airport/airport-code";

export interface IShardCache {

	shardMap: Map<ShardId, IShard>;

	reloadShards( //
	): Promise<void>;

}

export class ShardCache
	implements IShardCache {

	shardMap: Map<ShardId, IShard> = new Map();

	constructor(
		private shardDao: IShardDao
	) {
	}

	async reloadShards( //
	): Promise<void> {
		const shards = await this.shardDao.findAllShards();
		this.shardMap.clear();
		for (const shard of shards) {
			this.shardMap.set(shard.id, shard);
		}
	}

}