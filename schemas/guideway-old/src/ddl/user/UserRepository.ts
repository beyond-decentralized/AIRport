import {
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
} from "@airport/air-control";
import { Shard } from "@airport/airport-code";
import { ShardedRecord } from "../ShardedRecord";
import { Repository } from "../repository/Repository";
import { UserRepositoryPermission } from "./Permission";
import { User } from "./User";

@Entity()
@Table({name: "USER_REPOSITORIES"})
export class UserRepository extends ShardedRecord {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "REPOSITORY_SHARD_ID", referencedColumnName: "SHARD_ID"},
		{name: 'REPOSITORY_ID', referencedColumnName: 'ID'}
	])
	repository: Repository;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_SHARD_ID", referencedColumnName: "SHARD_ID"})
	repositoryShard: Shard;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SHARD_ID"},
		{name: 'USER_ID', referencedColumnName: 'ID'}
	])
	user: User;

	@DbNumber()
	permission: UserRepositoryPermission;

}