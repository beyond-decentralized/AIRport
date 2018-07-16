import {Id, JoinColumn, ManyToOne, MappedSuperclass} from "@airport/air-control";
import {Shard, ShardId} from "@airport/airport-code";

export type OriginalShardId = ShardId;

/**
 * Pretty much every AGT record should be sharded by location and should extend this class.
 */
@MappedSuperclass()
export class ShardedRecord {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "SHARD_ID"})
	shard: Shard;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "ORIGINAL_SHARD_ID", referencedColumnName: "SHARD_ID"})
	originalShard: Shard;

}