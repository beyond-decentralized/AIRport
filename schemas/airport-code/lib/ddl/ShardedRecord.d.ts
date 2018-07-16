import { Shard } from "./Shard";
/**
 * Pretty much every AGT record should be sharded by location and should extend this class.
 */
export declare class ShardedRecord {
    shard: Shard;
}
