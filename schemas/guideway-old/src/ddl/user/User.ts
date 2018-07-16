import {
	Column,
	DbBoolean,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
} from "@airport/air-control";
import {ShardedRecord} from "../ShardedRecord";
import {SyncRecord} from "../syncronization/SyncRecord";
import {Database} from "./Database";
import {SecurityAnswer} from "./security/SecurityAnswer";
import {UserRepository} from "./UserRepository";
import {ShardId} from "@airport/airport-code";

export type UserId = number;
export type UserHash = string;
export type UserEmail = string;
export type UserIsInvitation = boolean;
export type UserOriginalShardId = ShardId;
export type UserShardId = ShardId;

@Entity()
@Table({name: "USERS"})
export class User extends ShardedRecord {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: UserId;

	@DbString()
	hash: UserHash;

	email: UserEmail;

	@Column({name: "IS_INVITATION"})
	@DbBoolean()
	isInvitation: UserIsInvitation;

	@OneToMany()
	securityAnswers: SecurityAnswer[];

	@OneToMany()
	userRepositories: UserRepository[];

	@OneToMany()
	databases: Database[];

	@OneToMany()
	syncRecords: SyncRecord[];

}