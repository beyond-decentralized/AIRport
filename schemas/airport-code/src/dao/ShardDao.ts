import { ShardId } from "../ddl/Shard";
import { BaseShardDao, IBaseShardDao, } from "../generated/baseDaos";
import { Q } from "../generated/qSchema";
import { IShard, QShard } from "../generated/qshard";

export interface IShardDao
	extends IBaseShardDao {

	findShards(
		shardIds: ShardId[]
	): Promise<IShard[]>;

	findAllShards( //
	): Promise<IShard[]>;

}

export class ShardDao
	extends BaseShardDao
	implements IShardDao {

	async findShards(
		shardIds: ShardId[]
	): Promise<IShard[]> {
		let s: QShard;
		return await this.db.find.tree({
			select: {},
			from: [
				s = Q.Shard
			],
			where:
				s.id.in(shardIds)
		});
	}

	async findAllShards( //
	): Promise<IShard[]> {
		return await this.db.find.tree({
			select: {},
			from: [
				Q.Shard
			]
		});
	}

}