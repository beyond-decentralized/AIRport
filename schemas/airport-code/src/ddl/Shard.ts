import { Column, DbNumber, DbString, Entity, GeneratedValue } from "@airport/air-control";
import { Id } from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";

export type ShardAddress = string;
export type ShardDescription = string;
export type ShardId = number;
export type ShardSecret = string;

@Entity()
export class Shard {

	@Id()
	@Column({name: "SHARD_ID"})
	@DbNumber()
	@GeneratedValue()
	id: ShardId;

	@DbString()
	description: ShardDescription;

	@DbString()
	secret: ShardSecret;

	@DbString()
	address: ShardAddress;

}