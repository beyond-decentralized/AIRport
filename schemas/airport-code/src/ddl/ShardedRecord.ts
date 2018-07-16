import { Id, JoinColumn, ManyToOne, MappedSuperclass } from "@airport/air-control";
import { Shard } from "./Shard";

/**
 * Pretty much every AGT record should be sharded by location and should extend this class.
 */
@MappedSuperclass()
export class ShardedRecord {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "SHARD_ID"})
	shard: Shard;

}