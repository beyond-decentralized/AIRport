import { ShardId } from "../ddl/Shard";
import { BaseShardDao, IBaseShardDao } from "../generated/baseDaos";
import { IShard } from "../generated/qshard";
export interface IShardDao extends IBaseShardDao {
    findShards(shardIds: ShardId[]): Promise<IShard[]>;
    findAllShards(): Promise<IShard[]>;
}
export declare class ShardDao extends BaseShardDao implements IShardDao {
    findShards(shardIds: ShardId[]): Promise<IShard[]>;
    findAllShards(): Promise<IShard[]>;
}
