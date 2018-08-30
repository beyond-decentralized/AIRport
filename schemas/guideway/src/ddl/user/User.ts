import {
	Column,
	DbBoolean,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                                      from "@airport/air-control";
import {AgtRepositoryTransactionBlock} from "../synchronization/AgtRepositoryTransactionBlock";
import {Terminal}                      from "../terminal/Terminal";
import {SecurityAnswer}                from "./security/SecurityAnswer";
import {UserRepository}                from "./UserRepository";

export type UserId = number;
export type UserHash = string;
export type UserEmail = string;
export type UserIsInvitation = boolean;

@Entity()
@Table({name: "AGT_USERS"})
export class User {

	@Id()
	@GeneratedValue()
	id: UserId;

	@Column({name: 'HASH', nullable: false})
	@DbString()
	hash: UserHash;

	@Column({name: 'EMAIL', nullable: false})
	email: UserEmail;

	@Column({name: "IS_INVITATION", nullable: false})
	@DbBoolean()
	isInvitation: UserIsInvitation;

	@OneToMany()
	securityAnswers: SecurityAnswer[];

	@OneToMany()
	userRepositories: UserRepository[];

	@OneToMany()
	terminals: Terminal[];

	@OneToMany()
	repositoryTransactionBlocks: AgtRepositoryTransactionBlock[];

}